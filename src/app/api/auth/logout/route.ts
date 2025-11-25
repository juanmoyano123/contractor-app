import { NextResponse } from 'next/server'

/**
 * POST /api/auth/logout
 * Clear user session
 */
export async function POST() {
  // In production with Supabase, this would call supabase.auth.signOut()
  // For MVP, we just return success since session is client-side
  return NextResponse.json({ success: true })
}
