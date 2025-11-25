import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { contractorProfiles, contractorSpecialties, serviceAreas, users, trades } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

interface RouteParams {
  params: Promise<{ contractorId: string }>
}

/**
 * GET /api/contractors/[contractorId]
 * Get contractor profile with all details
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { contractorId } = await params

    // Get profile with user info
    const profileResults = await db
      .select({
        profile: contractorProfiles,
        user: {
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          phone: users.phone,
        },
      })
      .from(contractorProfiles)
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(eq(contractorProfiles.id, contractorId))
      .limit(1)

    if (profileResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Contractor not found' },
        { status: 404 }
      )
    }

    const { profile, user } = profileResults[0]

    // Get specialties
    const specialties = await db
      .select({
        id: contractorSpecialties.id,
        tradeId: contractorSpecialties.tradeId,
        tradeName: trades.name,
        tradeCategory: trades.category,
        proficiencyLevel: contractorSpecialties.proficiencyLevel,
        isPrimary: contractorSpecialties.isPrimary,
        certifications: contractorSpecialties.certifications,
        yearsExperience: contractorSpecialties.yearsExperience,
      })
      .from(contractorSpecialties)
      .innerJoin(trades, eq(contractorSpecialties.tradeId, trades.id))
      .where(eq(contractorSpecialties.contractorId, contractorId))

    // Get service areas
    const areas = await db
      .select()
      .from(serviceAreas)
      .where(eq(serviceAreas.contractorId, contractorId))

    return NextResponse.json({
      success: true,
      data: {
        ...profile,
        user,
        specialties,
        serviceAreas: areas,
      },
    })
  } catch (error) {
    console.error('Get contractor error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/contractors/[contractorId]
 * Update contractor profile
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { contractorId } = await params
    const body = await request.json()

    // Separate profile updates from related data
    const { specialties, serviceAreas: areas, ...profileUpdates } = body

    // Update profile
    if (Object.keys(profileUpdates).length > 0) {
      profileUpdates.updatedAt = new Date()
      await db
        .update(contractorProfiles)
        .set(profileUpdates)
        .where(eq(contractorProfiles.id, contractorId))
    }

    // Update specialties if provided
    if (specialties !== undefined) {
      // Delete existing specialties
      await db
        .delete(contractorSpecialties)
        .where(eq(contractorSpecialties.contractorId, contractorId))

      // Insert new specialties
      if (specialties.length > 0) {
        await db.insert(contractorSpecialties).values(
          specialties.map((s: any) => ({
            contractorId,
            tradeId: s.tradeId,
            proficiencyLevel: s.proficiencyLevel || 'intermediate',
            isPrimary: s.isPrimary || false,
            certifications: s.certifications || [],
            yearsExperience: s.yearsExperience,
          }))
        )
      }
    }

    // Update service areas if provided
    if (areas !== undefined) {
      // Delete existing areas
      await db
        .delete(serviceAreas)
        .where(eq(serviceAreas.contractorId, contractorId))

      // Insert new areas
      if (areas.length > 0) {
        await db.insert(serviceAreas).values(
          areas.map((a: any) => ({
            contractorId,
            areaType: a.areaType,
            areaData: a.areaData,
            centerLat: a.centerLat,
            centerLng: a.centerLng,
            radiusMiles: a.radiusMiles,
            isEmergencyArea: a.isEmergencyArea || false,
          }))
        )
      }
    }

    // Return updated profile
    const updatedProfile = await db
      .select()
      .from(contractorProfiles)
      .where(eq(contractorProfiles.id, contractorId))
      .limit(1)

    return NextResponse.json({
      success: true,
      data: updatedProfile[0],
    })
  } catch (error) {
    console.error('Update contractor error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
