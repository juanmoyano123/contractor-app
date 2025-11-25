'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from '@/components/ui'
import { formatCurrency, formatRelativeTime, getLeadStatusColor } from '@/lib/utils'

// Mock data
const mockLeads = [
  { id: '1', customerName: 'John Smith', customerPhone: '(512) 555-0101', serviceNeeded: 'Water heater replacement', status: 'pending', urgency: 'today', sharedAt: new Date(Date.now() - 30 * 60 * 1000), type: 'received', partner: 'ABC Electric' },
  { id: '2', customerName: 'Sarah Johnson', customerPhone: '(512) 555-0102', serviceNeeded: 'Electrical panel upgrade', status: 'accepted', urgency: 'this_week', sharedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'sent', partner: 'Mike\'s Plumbing' },
  { id: '3', customerName: 'Mike Brown', customerPhone: '(512) 555-0103', serviceNeeded: 'AC repair - not cooling', status: 'contacted', urgency: 'emergency', sharedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), type: 'sent', partner: 'Cool Air HVAC' },
  { id: '4', customerName: 'Emily Davis', customerPhone: '(512) 555-0104', serviceNeeded: 'Drain cleaning', status: 'quoted', urgency: 'flexible', sharedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'received', partner: 'Rodriguez Plumbing', quoteAmount: 350 },
  { id: '5', customerName: 'Chris Wilson', customerPhone: '(512) 555-0105', serviceNeeded: 'Roof leak repair', status: 'won', urgency: 'today', sharedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'sent', partner: 'Top Roofing', jobValue: 4500, commission: 450 },
  { id: '6', customerName: 'Lisa Anderson', customerPhone: '(512) 555-0106', serviceNeeded: 'Generator installation', status: 'lost', urgency: 'this_week', sharedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), type: 'received', partner: 'PowerGen Electric' },
]

export default function LeadsPage() {
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filteredLeads = mockLeads.filter((lead) => {
    if (filter !== 'all' && lead.type !== filter) return false
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false
    if (search && !lead.customerName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const getUrgencyBadge = (urgency: string) => {
    const variants: Record<string, 'error' | 'warning' | 'info' | 'default'> = {
      emergency: 'error',
      today: 'warning',
      this_week: 'info',
      flexible: 'default',
    }
    const labels: Record<string, string> = {
      emergency: 'Emergency',
      today: 'Today',
      this_week: 'This Week',
      flexible: 'Flexible',
    }
    return <Badge variant={variants[urgency]}>{labels[urgency]}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Leads</h1>
          <p className="text-gray-600 mt-1">Track your sent and received referrals</p>
        </div>
        <Link href="/leads/new">
          <Button>Share New Lead</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Type filter */}
            <div className="flex rounded-lg border border-gray-200 p-1">
              {['all', 'sent', 'received'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === type
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            {/* Search */}
            <div className="flex-1">
              <Input
                placeholder="Search by customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads list */}
      <Card>
        <CardContent className="pt-6">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or share a new lead.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Customer</th>
                    <th className="pb-3 pr-4">Service</th>
                    <th className="pb-3 pr-4">Partner</th>
                    <th className="pb-3 pr-4">Urgency</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Value</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="py-4 pr-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${lead.type === 'sent' ? 'bg-blue-100' : 'bg-green-100'}`}>
                            {lead.type === 'sent' ? (
                              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{lead.customerName}</p>
                            <p className="text-sm text-gray-500">{lead.customerPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900 max-w-xs truncate">{lead.serviceNeeded}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{lead.partner}</p>
                      </td>
                      <td className="py-4 pr-4">{getUrgencyBadge(lead.urgency)}</td>
                      <td className="py-4 pr-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getLeadStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        {lead.jobValue ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900">{formatCurrency(lead.jobValue)}</p>
                            {lead.commission && (
                              <p className="text-xs text-green-600">+{formatCurrency(lead.commission)}</p>
                            )}
                          </div>
                        ) : lead.quoteAmount ? (
                          <p className="text-sm text-gray-500">Quote: {formatCurrency(lead.quoteAmount)}</p>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-500">{formatRelativeTime(lead.sharedAt)}</p>
                      </td>
                      <td className="py-4">
                        <Link href={`/leads/${lead.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
