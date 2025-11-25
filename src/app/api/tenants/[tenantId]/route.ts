import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { tenants } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface RouteParams {
  params: Promise<{ tenantId: string }>
}

/**
 * GET /api/tenants/[tenantId]
 * Get tenant details (for authenticated users)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { tenantId } = await params

    const tenantResults = await db
      .select()
      .from(tenants)
      .where(eq(tenants.id, tenantId))
      .limit(1)

    if (tenantResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tenant not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: tenantResults[0],
    })
  } catch (error) {
    console.error('Get tenant error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/tenants/[tenantId]
 * Update tenant settings/branding (admin only)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { tenantId } = await params
    const body = await request.json()
    const { name, domain, settings, branding, status } = body

    // Build update object
    const updates: Record<string, unknown> = {}
    if (name !== undefined) updates.name = name
    if (domain !== undefined) updates.domain = domain
    if (settings !== undefined) updates.settings = settings
    if (branding !== undefined) updates.branding = branding
    if (status !== undefined) updates.status = status

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No updates provided' },
        { status: 400 }
      )
    }

    const updatedResults = await db
      .update(tenants)
      .set(updates)
      .where(eq(tenants.id, tenantId))
      .returning()

    if (updatedResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tenant not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedResults[0],
    })
  } catch (error) {
    console.error('Update tenant error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
