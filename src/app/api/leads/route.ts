import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { leads, leadStatusHistory, leadRecipients, contractorProfiles, users, tenants } from '@/db/schema'
import { eq, and, desc, sql, or } from 'drizzle-orm'

/**
 * GET /api/leads
 * List leads for a contractor or tenant
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const contractorId = searchParams.get('contractorId')
    const type = searchParams.get('type') // 'sent' | 'received' | 'all'
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    if (!tenantId) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    // Build conditions
    const conditions = [eq(leads.tenantId, tenantId)]

    if (contractorId && type === 'sent') {
      conditions.push(eq(leads.referrerId, contractorId))
    } else if (contractorId && type === 'received') {
      conditions.push(eq(leads.recipientId, contractorId))
    } else if (contractorId) {
      conditions.push(
        or(eq(leads.referrerId, contractorId), eq(leads.recipientId, contractorId))!
      )
    }

    if (status) {
      conditions.push(eq(leads.status, status as any))
    }

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(leads)
      .where(and(...conditions))

    const total = countResult[0]?.count || 0

    // Get leads with referrer and recipient info
    const leadResults = await db
      .select({
        lead: leads,
        referrer: {
          id: contractorProfiles.id,
          companyName: contractorProfiles.companyName,
        },
      })
      .from(leads)
      .leftJoin(contractorProfiles, eq(leads.referrerId, contractorProfiles.id))
      .where(and(...conditions))
      .orderBy(desc(leads.sharedAt))
      .limit(limit)
      .offset(offset)

    // Get recipient info for each lead
    const leadsWithRecipients = await Promise.all(
      leadResults.map(async (result) => {
        let recipient = null
        if (result.lead.recipientId) {
          const recipientResult = await db
            .select({
              id: contractorProfiles.id,
              companyName: contractorProfiles.companyName,
            })
            .from(contractorProfiles)
            .where(eq(contractorProfiles.id, result.lead.recipientId))
            .limit(1)
          recipient = recipientResult[0] || null
        }

        return {
          ...result.lead,
          referrer: result.referrer,
          recipient,
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        items: leadsWithRecipients,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('List leads error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/leads
 * Create a new lead
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tenantId,
      referrerId,
      recipientId,
      recipientIds, // For broadcast leads
      customerName,
      customerPhone,
      serviceNeeded,
      ...leadData
    } = body

    if (!tenantId || !referrerId || !customerName || !customerPhone || !serviceNeeded) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get tenant settings for commission rate and auto-decline hours
    const tenantResult = await db
      .select()
      .from(tenants)
      .where(eq(tenants.id, tenantId))
      .limit(1)

    const tenant = tenantResult[0]
    const settings = (tenant?.settings as any) || {}
    const commissionRate = settings.commissionRate || 10
    const autoDeclineHours = settings.autoDeclineHours || 2

    // Calculate expiration time
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + autoDeclineHours)

    // Determine if this is a broadcast lead
    const isBroadcast = recipientIds && recipientIds.length > 1

    // Create the lead
    const newLeadResults = await db
      .insert(leads)
      .values({
        tenantId,
        referrerId,
        recipientId: isBroadcast ? null : recipientId,
        customerName,
        customerPhone,
        serviceNeeded,
        commissionRate,
        expiresAt,
        isBroadcast,
        ...leadData,
      })
      .returning()

    const newLead = newLeadResults[0]

    // Create lead recipients for broadcast leads
    if (isBroadcast && recipientIds) {
      await db.insert(leadRecipients).values(
        recipientIds.map((contractorId: string) => ({
          leadId: newLead.id,
          contractorId,
          notifiedAt: new Date(),
        }))
      )
    }

    // Create initial status history entry
    await db.insert(leadStatusHistory).values({
      leadId: newLead.id,
      newStatus: 'pending',
      notes: 'Lead created',
    })

    // TODO: Send SMS/email notifications to recipient(s)
    // This would integrate with Twilio/SendGrid in production

    return NextResponse.json({
      success: true,
      data: newLead,
    })
  } catch (error) {
    console.error('Create lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
