import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { trades } from '@/db/schema'
import { eq, asc, and, SQL } from 'drizzle-orm'

/**
 * GET /api/trades
 * List all available trades/specialties
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const activeOnly = searchParams.get('activeOnly') !== 'false'

    // Build conditions
    const conditions: SQL[] = []

    if (activeOnly) {
      conditions.push(eq(trades.isActive, true))
    }

    if (category) {
      conditions.push(eq(trades.category, category))
    }

    // Execute query
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined
    const results = await db
      .select()
      .from(trades)
      .where(whereClause)
      .orderBy(asc(trades.sortOrder), asc(trades.name))

    // Group by category
    const byCategory: Record<string, typeof results> = {}
    results.forEach((trade) => {
      if (!byCategory[trade.category]) {
        byCategory[trade.category] = []
      }
      byCategory[trade.category].push(trade)
    })

    return NextResponse.json({
      success: true,
      data: {
        items: results,
        byCategory,
        categories: Object.keys(byCategory).sort(),
      },
    })
  } catch (error) {
    console.error('List trades error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
