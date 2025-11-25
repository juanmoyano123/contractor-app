import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users, tenants, memberInvitations, contractorProfiles } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

/**
 * POST /api/auth/register
 * Register a new user (via invitation)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invitationToken, email, password, firstName, lastName, companyName, phone } = body

    // Validate required fields
    if (!invitationToken || !email || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find and validate invitation
    const invitationResults = await db
      .select()
      .from(memberInvitations)
      .where(
        and(
          eq(memberInvitations.invitationToken, invitationToken),
          eq(memberInvitations.email, email.toLowerCase())
        )
      )
      .limit(1)

    if (invitationResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired invitation' },
        { status: 400 }
      )
    }

    const invitation = invitationResults[0]

    if (invitation.status === 'accepted') {
      return NextResponse.json(
        { success: false, error: 'Invitation already used' },
        { status: 400 }
      )
    }

    if (invitation.expiresAt && new Date(invitation.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Invitation has expired' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.tenantId, invitation.tenantId),
          eq(users.email, email.toLowerCase())
        )
      )
      .limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create user
    const newUserResults = await db
      .insert(users)
      .values({
        tenantId: invitation.tenantId,
        email: email.toLowerCase(),
        firstName,
        lastName,
        phone,
        role: 'contractor',
        emailVerified: true, // Verified via invitation
      })
      .returning()

    const newUser = newUserResults[0]

    // Create contractor profile
    await db.insert(contractorProfiles).values({
      tenantId: invitation.tenantId,
      userId: newUser.id,
      companyName: companyName || `${firstName} ${lastName}`,
      companyPhone: phone,
      companyEmail: email,
      status: 'pending', // Needs admin approval
    })

    // Update invitation status
    await db
      .update(memberInvitations)
      .set({
        status: 'accepted',
        acceptedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(memberInvitations.id, invitation.id))

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Awaiting admin approval.',
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
