import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users, tenants, contractorProfiles } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import type { AuthSession, TenantBranding } from '@/lib/types'

/**
 * POST /api/auth/login
 * Authenticate user and create session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, tenantSlug } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const userResults = await db
      .select({
        user: users,
        tenant: tenants,
      })
      .from(users)
      .innerJoin(tenants, eq(users.tenantId, tenants.id))
      .where(eq(users.email, email.toLowerCase()))
      .limit(1)

    if (userResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const { user, tenant } = userResults[0]

    // In production, verify password hash here
    // For MVP/development, we skip password verification
    // TODO: Implement proper password verification with bcrypt

    // Get contractor profile if user is a contractor
    let contractorProfileId: string | undefined
    if (user.role === 'contractor') {
      const profileResults = await db
        .select({ id: contractorProfiles.id })
        .from(contractorProfiles)
        .where(eq(contractorProfiles.userId, user.id))
        .limit(1)

      if (profileResults.length > 0) {
        contractorProfileId = profileResults[0].id
      }
    }

    // Create session
    const session: AuthSession = {
      user: {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        contractorProfileId,
      },
      tenantSlug: tenant.slug,
      tenantName: tenant.name,
      branding: (tenant.branding as TenantBranding) || {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        accentColor: '#f59e0b',
      },
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    }

    // Update last login time
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id))

    return NextResponse.json({
      success: true,
      session,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
