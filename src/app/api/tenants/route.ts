import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { tenants } from '@/db/schema'
import { eq } from 'drizzle-orm'

/**
 * GET /api/tenants
 * Get tenant by slug (for public pages)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    const tenantResults = await db
      .select()
      .from(tenants)
      .where(eq(tenants.slug, slug))
      .limit(1)

    if (tenantResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tenant not found' },
        { status: 404 }
      )
    }

    const tenant = tenantResults[0]

    // Don't return sensitive settings to public
    return NextResponse.json({
      success: true,
      data: {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
        branding: tenant.branding,
        status: tenant.status,
      },
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
 * POST /api/tenants
 * Create a new tenant (super admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, domain, settings, branding } = body

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await db
      .select()
      .from(tenants)
      .where(eq(tenants.slug, slug))
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      )
    }

    // Create tenant with 30-day trial
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 30)

    const newTenantResults = await db
      .insert(tenants)
      .values({
        name,
        slug,
        domain,
        settings: settings || {},
        branding: branding || {},
        status: 'trial',
        trialEndsAt,
      })
      .returning()

    return NextResponse.json({
      success: true,
      data: newTenantResults[0],
    })
  } catch (error) {
    console.error('Create tenant error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
