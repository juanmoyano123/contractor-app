import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { memberInvitations, users } from '@/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { generateToken, isValidEmail, isValidPhone } from '@/lib/utils'
import type { CsvImportRow, CsvValidationResult, CsvImportSummary } from '@/lib/types'

/**
 * POST /api/admin/import
 * Import members from CSV data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tenantId, rows, sendInvitations = false } = body

    if (!tenantId || !rows || !Array.isArray(rows)) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID and rows array are required' },
        { status: 400 }
      )
    }

    // Validate rows
    const validationResults: CsvValidationResult[] = []
    const validRows: CsvImportRow[] = []
    const emails = new Set<string>()
    let duplicates = 0

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const errors: string[] = []

      // Required fields
      if (!row.email) errors.push('Email is required')
      if (!row.firstName) errors.push('First name is required')
      if (!row.lastName) errors.push('Last name is required')
      if (!row.companyName) errors.push('Company name is required')

      // Validate email format
      if (row.email && !isValidEmail(row.email)) {
        errors.push('Invalid email format')
      }

      // Validate phone format
      if (row.phone && !isValidPhone(row.phone)) {
        errors.push('Invalid phone format')
      }

      // Check for duplicate emails in CSV
      if (row.email) {
        const lowerEmail = row.email.toLowerCase()
        if (emails.has(lowerEmail)) {
          errors.push('Duplicate email in CSV')
          duplicates++
        } else {
          emails.add(lowerEmail)
        }
      }

      validationResults.push({
        valid: errors.length === 0,
        row: i + 1,
        errors,
        data: errors.length === 0 ? row : undefined,
      })

      if (errors.length === 0) {
        validRows.push(row)
      }
    }

    // Check for existing users in database
    const existingEmails = new Set<string>()
    if (validRows.length > 0) {
      const emailList = validRows.map((r) => r.email.toLowerCase())
      const existingUsers = await db
        .select({ email: users.email })
        .from(users)
        .where(
          and(
            eq(users.tenantId, tenantId),
            sql`LOWER(${users.email}) IN (${sql.join(
              emailList.map((e) => sql`${e}`),
              sql`, `
            )})`
          )
        )

      existingUsers.forEach((u) => existingEmails.add(u.email.toLowerCase()))

      // Mark existing users as duplicates
      validationResults.forEach((result) => {
        if (result.valid && result.data && existingEmails.has(result.data.email.toLowerCase())) {
          result.valid = false
          result.errors.push('User already exists in system')
          result.data = undefined
          duplicates++
        }
      })
    }

    // Create summary
    const summary: CsvImportSummary = {
      totalRows: rows.length,
      validRows: validationResults.filter((r) => r.valid).length,
      invalidRows: validationResults.filter((r) => !r.valid).length,
      duplicates,
      results: validationResults,
    }

    // If not sending invitations, just return validation results
    if (!sendInvitations) {
      return NextResponse.json({
        success: true,
        data: summary,
      })
    }

    // Create invitations for valid rows
    const batchId = `import_${Date.now()}`
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30-day expiration

    const invitationsToCreate = validationResults
      .filter((r) => r.valid && r.data)
      .map((r) => ({
        tenantId,
        email: r.data!.email.toLowerCase(),
        firstName: r.data!.firstName,
        lastName: r.data!.lastName,
        companyName: r.data!.companyName,
        phone: r.data!.phone || null,
        tradeName: r.data!.trade || null,
        invitationToken: generateToken(32),
        status: 'pending' as const,
        expiresAt,
        importBatchId: batchId,
      }))

    if (invitationsToCreate.length > 0) {
      await db.insert(memberInvitations).values(invitationsToCreate)
    }

    // TODO: Trigger email sending via background job
    // In production, this would queue emails via SendGrid

    return NextResponse.json({
      success: true,
      data: {
        ...summary,
        importBatchId: batchId,
        invitationsCreated: invitationsToCreate.length,
      },
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/import
 * Get import status and invitation stats
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const batchId = searchParams.get('batchId')

    if (!tenantId) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    // Get invitation stats
    const stats = await db
      .select({
        status: memberInvitations.status,
        count: sql<number>`COUNT(*)`,
      })
      .from(memberInvitations)
      .where(
        batchId
          ? and(
              eq(memberInvitations.tenantId, tenantId),
              eq(memberInvitations.importBatchId, batchId)
            )
          : eq(memberInvitations.tenantId, tenantId)
      )
      .groupBy(memberInvitations.status)

    const statsByStatus = stats.reduce((acc, s) => {
      acc[s.status] = s.count
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: {
        pending: statsByStatus.pending || 0,
        sent: statsByStatus.sent || 0,
        opened: statsByStatus.opened || 0,
        clicked: statsByStatus.clicked || 0,
        accepted: statsByStatus.accepted || 0,
        expired: statsByStatus.expired || 0,
        total: Object.values(statsByStatus).reduce((a, b) => a + b, 0),
      },
    })
  } catch (error) {
    console.error('Get import stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
