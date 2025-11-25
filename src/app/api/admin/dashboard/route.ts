import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { leads, contractorProfiles, users } from '@/db/schema'
import { eq, and, sql, gte, count, sum, avg } from 'drizzle-orm'

/**
 * GET /api/admin/dashboard
 * Get dashboard metrics for association admin
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    if (!tenantId) {
      return NextResponse.json(
        { success: false, error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    // Default date range: last 30 days
    const fromDate = dateFrom
      ? new Date(dateFrom)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const toDate = dateTo ? new Date(dateTo) : new Date()

    // Get total referral value this period
    const valueResult = await db
      .select({
        total: sum(leads.jobValue),
        count: count(),
      })
      .from(leads)
      .where(
        and(
          eq(leads.tenantId, tenantId),
          eq(leads.status, 'won'),
          gte(leads.completedAt, fromDate)
        )
      )

    const totalReferralValue = parseFloat(valueResult[0]?.total || '0')
    const wonLeadsCount = valueResult[0]?.count || 0

    // Get member counts
    const memberResult = await db
      .select({
        total: count(),
        active: sql<number>`COUNT(CASE WHEN ${contractorProfiles.status} = 'active' THEN 1 END)`,
      })
      .from(contractorProfiles)
      .where(eq(contractorProfiles.tenantId, tenantId))

    const totalMembers = memberResult[0]?.total || 0
    const activeMembers = memberResult[0]?.active || 0

    // Get leads this month
    const thisMonthStart = new Date()
    thisMonthStart.setDate(1)
    thisMonthStart.setHours(0, 0, 0, 0)

    const leadsThisMonth = await db
      .select({ count: count() })
      .from(leads)
      .where(
        and(
          eq(leads.tenantId, tenantId),
          gte(leads.sharedAt, thisMonthStart)
        )
      )

    // Get average response time
    const avgResponseResult = await db
      .select({
        avg: avg(leads.responseTimeMinutes),
      })
      .from(leads)
      .where(
        and(
          eq(leads.tenantId, tenantId),
          sql`${leads.responseTimeMinutes} IS NOT NULL`
        )
      )

    const avgResponseTime = Math.round(parseFloat(avgResponseResult[0]?.avg || '0'))

    // Get lead conversion rate
    const allLeadsResult = await db
      .select({ count: count() })
      .from(leads)
      .where(
        and(
          eq(leads.tenantId, tenantId),
          gte(leads.sharedAt, fromDate)
        )
      )

    const totalLeads = allLeadsResult[0]?.count || 0
    const conversionRate = totalLeads > 0 ? (wonLeadsCount / totalLeads) * 100 : 0

    // Get previous period for comparison
    const periodLength = toDate.getTime() - fromDate.getTime()
    const prevFromDate = new Date(fromDate.getTime() - periodLength)
    const prevToDate = new Date(fromDate.getTime())

    const prevValueResult = await db
      .select({ total: sum(leads.jobValue) })
      .from(leads)
      .where(
        and(
          eq(leads.tenantId, tenantId),
          eq(leads.status, 'won'),
          gte(leads.completedAt, prevFromDate),
          sql`${leads.completedAt} < ${prevToDate}`
        )
      )

    const prevValue = parseFloat(prevValueResult[0]?.total || '0')
    const monthOverMonthGrowth =
      prevValue > 0 ? ((totalReferralValue - prevValue) / prevValue) * 100 : 0

    // Get top referrers
    const topReferrers = await db
      .select({
        contractorId: leads.referrerId,
        companyName: contractorProfiles.companyName,
        firstName: users.firstName,
        lastName: users.lastName,
        count: count(),
        value: sum(leads.jobValue),
      })
      .from(leads)
      .innerJoin(contractorProfiles, eq(leads.referrerId, contractorProfiles.id))
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(
        and(
          eq(leads.tenantId, tenantId),
          gte(leads.sharedAt, fromDate)
        )
      )
      .groupBy(leads.referrerId, contractorProfiles.companyName, users.firstName, users.lastName)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(5)

    // Get top receivers
    const topReceivers = await db
      .select({
        contractorId: leads.recipientId,
        companyName: contractorProfiles.companyName,
        firstName: users.firstName,
        lastName: users.lastName,
        count: count(),
        value: sum(leads.jobValue),
      })
      .from(leads)
      .innerJoin(contractorProfiles, eq(leads.recipientId, contractorProfiles.id))
      .innerJoin(users, eq(contractorProfiles.userId, users.id))
      .where(
        and(
          eq(leads.tenantId, tenantId),
          eq(leads.status, 'won'),
          gte(leads.sharedAt, fromDate),
          sql`${leads.recipientId} IS NOT NULL`
        )
      )
      .groupBy(leads.recipientId, contractorProfiles.companyName, users.firstName, users.lastName)
      .orderBy(sql`SUM(${leads.jobValue}) DESC`)
      .limit(5)

    // Get daily lead activity for chart
    const dailyActivity = await db
      .select({
        date: sql<string>`DATE(${leads.sharedAt})`,
        count: count(),
      })
      .from(leads)
      .where(
        and(
          eq(leads.tenantId, tenantId),
          gte(leads.sharedAt, fromDate)
        )
      )
      .groupBy(sql`DATE(${leads.sharedAt})`)
      .orderBy(sql`DATE(${leads.sharedAt})`)

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          totalReferralValue,
          activeMembers,
          totalMembers,
          activationRate: totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0,
          leadsThisMonth: leadsThisMonth[0]?.count || 0,
          avgResponseTime,
          leadConversionRate: conversionRate,
          monthOverMonthGrowth,
        },
        leaderboards: {
          topReferrers: topReferrers.map((r) => ({
            contractorId: r.contractorId,
            companyName: r.companyName,
            firstName: r.firstName,
            lastName: r.lastName,
            count: r.count,
            value: parseFloat(r.value || '0'),
          })),
          topReceivers: topReceivers.map((r) => ({
            contractorId: r.contractorId,
            companyName: r.companyName,
            firstName: r.firstName,
            lastName: r.lastName,
            count: r.count,
            value: parseFloat(r.value || '0'),
          })),
        },
        charts: {
          dailyActivity: dailyActivity.map((d) => ({
            date: d.date,
            count: d.count,
          })),
        },
        dateRange: {
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        },
      },
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
