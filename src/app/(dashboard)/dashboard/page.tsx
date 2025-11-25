'use client'

import { useAuth } from '@/lib/auth-context'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import Link from 'next/link'

// Mock data for dashboard
const recentLeads = [
  { id: '1', customerName: 'John Smith', serviceNeeded: 'Water heater replacement', status: 'pending', sharedAt: new Date(Date.now() - 30 * 60 * 1000), type: 'received' },
  { id: '2', customerName: 'Sarah Johnson', serviceNeeded: 'Electrical panel upgrade', status: 'accepted', sharedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'sent' },
  { id: '3', customerName: 'Mike Brown', serviceNeeded: 'AC repair', status: 'won', sharedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'sent', value: 3500 },
]

const stats = {
  leadsShared: 12,
  leadsReceived: 8,
  pendingCommissions: 1250,
  totalEarnings: 4500,
}

export default function DashboardPage() {
  const { user } = useAuth()

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'warning' | 'info' | 'success' | 'error' | 'default'> = {
      pending: 'warning',
      accepted: 'info',
      contacted: 'info',
      quoted: 'info',
      won: 'success',
      lost: 'error',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your referral network.
          </p>
        </div>
        <Link href="/leads/new">
          <Button>Share New Lead</Button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Leads Shared</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.leadsShared}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Leads Received</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.leadsReceived}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Commissions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(stats.pendingCommissions)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">2 invoices awaiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+$850 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/leads" className="text-sm text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-200">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${lead.type === 'sent' ? 'bg-blue-100' : 'bg-green-100'}`}>
                    {lead.type === 'sent' ? (
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{lead.customerName}</p>
                    <p className="text-sm text-gray-500">{lead.serviceNeeded}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {lead.value && (
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(lead.value)}
                    </span>
                  )}
                  {getStatusBadge(lead.status)}
                  <span className="text-sm text-gray-500">
                    {formatRelativeTime(lead.sharedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/leads/new">
          <Card className="hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900">Share a Lead</h3>
                <p className="text-sm text-gray-500 mt-1">Got overflow work? Pass it to a trusted partner.</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/network">
          <Card className="hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex p-3 bg-green-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900">Find Specialists</h3>
                <p className="text-sm text-gray-500 mt-1">Search for contractors by trade and location.</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex p-3 bg-purple-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900">Update Profile</h3>
                <p className="text-sm text-gray-500 mt-1">Keep your specialties and availability current.</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
