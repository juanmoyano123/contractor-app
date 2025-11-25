import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { leads, leadStatusHistory, leadRecipients, contractorProfiles } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { calculateCommission } from '@/lib/utils'

interface RouteParams {
  params: Promise<{ leadId: string }>
}

/**
 * GET /api/leads/[leadId]
 * Get lead details with full history
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { leadId } = await params

    // Get lead with referrer and recipient info
    const leadResults = await db
      .select()
      .from(leads)
      .where(eq(leads.id, leadId))
      .limit(1)

    if (leadResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    const lead = leadResults[0]

    // Get referrer info
    const referrerResult = await db
      .select({
        id: contractorProfiles.id,
        companyName: contractorProfiles.companyName,
      })
      .from(contractorProfiles)
      .where(eq(contractorProfiles.id, lead.referrerId))
      .limit(1)

    // Get recipient info
    let recipient = null
    if (lead.recipientId) {
      const recipientResult = await db
        .select({
          id: contractorProfiles.id,
          companyName: contractorProfiles.companyName,
        })
        .from(contractorProfiles)
        .where(eq(contractorProfiles.id, lead.recipientId))
        .limit(1)
      recipient = recipientResult[0] || null
    }

    // Get status history
    const history = await db
      .select()
      .from(leadStatusHistory)
      .where(eq(leadStatusHistory.leadId, leadId))
      .orderBy(leadStatusHistory.createdAt)

    // Get broadcast recipients if applicable
    let broadcastRecipients: any[] = []
    if (lead.isBroadcast) {
      broadcastRecipients = await db
        .select({
          id: leadRecipients.id,
          contractorId: leadRecipients.contractorId,
          companyName: contractorProfiles.companyName,
          status: leadRecipients.status,
          respondedAt: leadRecipients.respondedAt,
        })
        .from(leadRecipients)
        .innerJoin(contractorProfiles, eq(leadRecipients.contractorId, contractorProfiles.id))
        .where(eq(leadRecipients.leadId, leadId))
    }

    return NextResponse.json({
      success: true,
      data: {
        ...lead,
        referrer: referrerResult[0] || null,
        recipient,
        statusHistory: history,
        broadcastRecipients,
      },
    })
  } catch (error) {
    console.error('Get lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/leads/[leadId]
 * Update lead status or details
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { leadId } = await params
    const body = await request.json()
    const { status, jobValue, notes, userId } = body

    // Get current lead
    const currentLead = await db
      .select()
      .from(leads)
      .where(eq(leads.id, leadId))
      .limit(1)

    if (currentLead.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    const lead = currentLead[0]
    const updates: Record<string, unknown> = { updatedAt: new Date() }

    // Handle status change
    if (status && status !== lead.status) {
      updates.status = status

      // Set timestamps based on status
      switch (status) {
        case 'accepted':
          updates.acceptedAt = new Date()
          // Calculate response time
          if (lead.sharedAt) {
            const responseTime = Math.floor(
              (Date.now() - new Date(lead.sharedAt).getTime()) / 60000
            )
            updates.responseTimeMinutes = responseTime
          }
          break
        case 'contacted':
          updates.contactedAt = new Date()
          break
        case 'quoted':
          updates.quotedAt = new Date()
          break
        case 'won':
        case 'lost':
          updates.completedAt = new Date()
          break
      }

      // Create status history entry
      await db.insert(leadStatusHistory).values({
        leadId,
        previousStatus: lead.status,
        newStatus: status,
        notes,
        createdBy: userId,
      })
    }

    // Handle job value update (for won leads)
    if (jobValue !== undefined) {
      updates.jobValue = jobValue
      const rate = parseFloat(lead.commissionRate?.toString() || '10')
      updates.commissionAmount = calculateCommission(parseFloat(jobValue), rate)
      updates.commissionStatus = 'calculated'

      // Set commission lock date (7 days from now)
      const lockDate = new Date()
      lockDate.setDate(lockDate.getDate() + 7)
      updates.commissionLockedAt = lockDate
    }

    // Update lead
    const updatedResults = await db
      .update(leads)
      .set(updates)
      .where(eq(leads.id, leadId))
      .returning()

    // Update contractor stats if lead was completed
    if (status === 'won' && lead.referrerId && lead.recipientId) {
      // Update referrer's sent count and earnings
      await db.execute(sql`
        UPDATE contractor_profiles
        SET
          total_leads_sent = total_leads_sent + 1,
          total_earnings = total_earnings + ${updates.commissionAmount || 0}
        WHERE id = ${lead.referrerId}
      `)

      // Update recipient's received count
      await db.execute(sql`
        UPDATE contractor_profiles
        SET total_leads_received = total_leads_received + 1
        WHERE id = ${lead.recipientId}
      `)
    }

    return NextResponse.json({
      success: true,
      data: updatedResults[0],
    })
  } catch (error) {
    console.error('Update lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
