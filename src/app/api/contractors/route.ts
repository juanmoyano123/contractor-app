import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { contractorProfiles, contractorSpecialties, serviceAreas, users, trades } from '@/db/schema'
import { eq, and, ilike, sql } from 'drizzle-orm'

/**
 * GET /api/contractors
 * List contractors for a tenant with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const tradeId = searchParams.get('tradeId')
    const availability = searchParams.get('availability')
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

    if (availability) {
      conditions.push(eq(contractorProfiles.availability, availability as any))
    }

    if (search) {
      conditions.push(
        sql`(${contractorProfiles.companyName} ILIKE ${'%' + search + '%'} OR ${users.firstName} ILIKE ${'%' + search + '%'} OR ${users.lastName} ILIKE ${'%' + search + '%'})`
      )
    }

    const whereClause = and(...conditions)

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contractorProfiles)
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(whereClause)

    const total = countResult[0]?.count || 0

    // Get paginated results
    const results = await db
      .select({
        profile: contractorProfiles,
        user: {
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
      })
      .from(contractorProfiles)
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(whereClause)
      .limit(limit)
      .offset(offset)

    // Get specialties for each contractor
    const contractorIds = results.map((r) => r.profile.id)
    let specialtiesMap: Record<string, any[]> = {}

    if (contractorIds.length > 0) {
      const specialties = await db
        .select({
          contractorId: contractorSpecialties.contractorId,
          tradeId: contractorSpecialties.tradeId,
          tradeName: trades.name,
          proficiencyLevel: contractorSpecialties.proficiencyLevel,
          isPrimary: contractorSpecialties.isPrimary,
        })
        .from(contractorSpecialties)
        .innerJoin(trades, eq(contractorSpecialties.tradeId, trades.id))
        .where(sql`${contractorSpecialties.contractorId} IN ${contractorIds}`)

      specialtiesMap = specialties.reduce((acc, s) => {
        if (!acc[s.contractorId]) acc[s.contractorId] = []
        acc[s.contractorId].push(s)
        return acc
      }, {} as Record<string, any[]>)
    }

    // Format response
    const contractors = results.map((r) => ({
      ...r.profile,
      user: r.user,
      specialties: specialtiesMap[r.profile.id] || [],
    }))

    return NextResponse.json({
      success: true,
      data: {
        items: contractors,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('List contractors error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/contractors
 * Create a new contractor profile
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tenantId, userId, companyName, ...profileData } = body

    if (!tenantId || !userId || !companyName) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID, User ID, and Company Name are required' },
        { status: 400 }
      )
    }

    // Check if profile already exists
    const existing = await db
      .select()
      .from(contractorProfiles)
      .where(eq(contractorProfiles.userId, userId))
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Profile already exists for this user' },
        { status: 400 }
      )
    }

    const newProfileResults = await db
      .insert(contractorProfiles)
      .values({
        tenantId,
        userId,
        companyName,
        ...profileData,
      })
      .returning()

    return NextResponse.json({
      success: true,
      data: newProfileResults[0],
    })
  } catch (error) {
    console.error('Create contractor error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
