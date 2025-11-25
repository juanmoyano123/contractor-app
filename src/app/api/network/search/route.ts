import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { contractorProfiles, contractorSpecialties, serviceAreas, users, trades } from '@/db/schema'
import { eq, and, sql, or, gte, lte } from 'drizzle-orm'

/**
 * GET /api/network/search
 * Search contractors by trade, location, and other filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const tradeId = searchParams.get('tradeId')
    const tradeName = searchParams.get('tradeName')
    const zipCode = searchParams.get('zipCode')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radiusMiles = parseInt(searchParams.get('radiusMiles') || '25')
    const availability = searchParams.get('availability')
    const hasLicense = searchParams.get('hasLicense')
    const hasInsurance = searchParams.get('hasInsurance')
    const excludeContractorId = searchParams.get('excludeContractorId') // Exclude self from results
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!tenantId) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    if (!tradeId && !tradeName) {
      return NextResponse.json(
        { success: false, error: 'Trade ID or name is required' },
        { status: 400 }
      )
    }

    // Find trade ID if only name provided
    let searchTradeId = tradeId
    if (!searchTradeId && tradeName) {
      const tradeResult = await db
        .select({ id: trades.id })
        .from(trades)
        .where(sql`LOWER(${trades.name}) LIKE LOWER(${'%' + tradeName + '%'})`)
        .limit(1)

      if (tradeResult.length > 0) {
        searchTradeId = tradeResult[0].id
      }
    }

    // Base conditions
    const conditions = [
      eq(contractorProfiles.tenantId, tenantId),
      eq(contractorProfiles.status, 'active'),
    ]

    // Availability filter
    if (availability) {
      conditions.push(eq(contractorProfiles.availability, availability as any))
    } else {
      // Default: exclude "at_capacity" contractors
      conditions.push(
        or(
          eq(contractorProfiles.availability, 'accepting'),
          eq(contractorProfiles.availability, 'emergency_only')
        )!
      )
    }

    // License/insurance filters
    if (hasLicense === 'true') {
      conditions.push(eq(contractorProfiles.licenseVerified, true))
    }
    if (hasInsurance === 'true') {
      conditions.push(eq(contractorProfiles.insuranceVerified, true))
    }

    // Exclude specific contractor
    if (excludeContractorId) {
      conditions.push(sql`${contractorProfiles.id} != ${excludeContractorId}`)
    }

    // Get contractors matching base criteria
    let contractors = await db
      .select({
        profile: contractorProfiles,
        user: {
          firstName: users.firstName,
          lastName: users.lastName,
        },
      })
      .from(contractorProfiles)
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(and(...conditions))
      .limit(100) // Get more initially, then filter by trade/location

    // Filter by trade specialty
    if (searchTradeId) {
      const contractorIds = contractors.map((c) => c.profile.id)
      if (contractorIds.length > 0) {
        const specialtiesResult = await db
          .select({ contractorId: contractorSpecialties.contractorId })
          .from(contractorSpecialties)
          .where(
            and(
              eq(contractorSpecialties.tradeId, searchTradeId),
              sql`${contractorSpecialties.contractorId} IN (${sql.join(
                contractorIds.map((id) => sql`${id}`),
                sql`, `
              )})`
            )
          )

        const matchingIds = new Set(specialtiesResult.map((s) => s.contractorId))
        contractors = contractors.filter((c) => matchingIds.has(c.profile.id))
      }
    }

    // Get specialties for remaining contractors
    const contractorIds = contractors.map((c) => c.profile.id)
    let specialtiesMap: Record<string, any[]> = {}

    if (contractorIds.length > 0) {
      const specialties = await db
        .select({
          contractorId: contractorSpecialties.contractorId,
          tradeName: trades.name,
          proficiencyLevel: contractorSpecialties.proficiencyLevel,
          isPrimary: contractorSpecialties.isPrimary,
        })
        .from(contractorSpecialties)
        .innerJoin(trades, eq(contractorSpecialties.tradeId, trades.id))
        .where(
          sql`${contractorSpecialties.contractorId} IN (${sql.join(
            contractorIds.map((id) => sql`${id}`),
            sql`, `
          )})`
        )

      specialtiesMap = specialties.reduce((acc, s) => {
        if (!acc[s.contractorId]) acc[s.contractorId] = []
        acc[s.contractorId].push(s)
        return acc
      }, {} as Record<string, any[]>)
    }

    // TODO: Add geo-filtering using PostGIS when lat/lng provided
    // For MVP, return all matching contractors sorted by response time

    // Format results
    const results = contractors
      .map((c) => ({
        ...c.profile,
        user: c.user,
        specialties: specialtiesMap[c.profile.id] || [],
        // In production, calculate actual distance using PostGIS
        distance: lat && lng ? Math.random() * radiusMiles : null,
      }))
      .sort((a, b) => {
        // Sort by availability (accepting first), then by response time
        if (a.availability !== b.availability) {
          return a.availability === 'accepting' ? -1 : 1
        }
        return (a.averageResponseTime || 999) - (b.averageResponseTime || 999)
      })
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      data: {
        items: results,
        total: results.length,
        filters: {
          tradeId: searchTradeId,
          zipCode,
          radiusMiles,
        },
      },
    })
  } catch (error) {
    console.error('Network search error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
