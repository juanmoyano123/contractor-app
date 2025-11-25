'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/lib/auth-context'
import { AppLayout } from '@/components/layout'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  )
}
