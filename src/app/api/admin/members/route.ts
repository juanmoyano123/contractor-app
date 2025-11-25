import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { contractorProfiles, users, memberInvitations } from '@/db/schema'
import { eq, and, desc, sql, count } from 'drizzle-orm'

/**
 * GET /api/admin/members
 * List all members for admin management
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
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
    const conditions = [eq(contractorProfiles.tenantId, tenantId)]

    if (status) {
      conditions.push(eq(contractorProfiles.status, status as any))
    }

    if (search) {
      conditions.push(
        sql`(${contractorProfiles.companyName} ILIKE ${'%' + search + '%'} OR ${users.firstName} ILIKE ${'%' + search + '%'} OR ${users.lastName} ILIKE ${'%' + search + '%'} OR ${users.email} ILIKE ${'%' + search + '%'})`
      )
    }

    // Get total count
    const countResult = await db
      .select({ count: count() })
      .from(contractorProfiles)
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(and(...conditions))

    const total = countResult[0]?.count || 0

    // Get members
    const members = await db
      .select({
        profile: contractorProfiles,
        user: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          phone: users.phone,
          lastLoginAt: users.lastLoginAt,
        },
      })
      .from(contractorProfiles)
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(contractorProfiles.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json({
      success: true,
      data: {
        items: members.map((m) => ({
          ...m.profile,
          user: m.user,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('List members error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/members
 * Bulk update member statuses (approve, suspend, etc.)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberIds, action, tenantId } = body

    if (!tenantId || !memberIds || !action) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID, member IDs, and action are required' },
        { status: 400 }
      )
    }

    let newStatus: string
    switch (action) {
      case 'approve':
        newStatus = 'active'
        break
      case 'suspend':
        newStatus = 'suspended'
        break
      case 'reactivate':
        newStatus = 'active'
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update all members
    await db
      .update(contractorProfiles)
      .set({
        status: newStatus as any,
        verifiedAt: action === 'approve' ? new Date() : undefined,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(contractorProfiles.tenantId, tenantId),
          sql`${contractorProfiles.id} IN (${sql.join(
            memberIds.map((id: string) => sql`${id}`),
            sql`, `
          )})`
        )
      )

    return NextResponse.json({
      success: true,
      message: `${memberIds.length} member(s) ${action}d successfully`,
    })
  } catch (error) {
    console.error('Bulk update members error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
