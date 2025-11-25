'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '@/components/ui'
import { formatDate, formatRelativeTime } from '@/lib/utils'

// Mock data
const mockMembers = [
  { id: '1', companyName: 'Rodriguez Plumbing LLC', firstName: 'Miguel', lastName: 'Rodriguez', email: 'miguel@rodriguez-plumbing.com', phone: '(512) 555-0100', status: 'active', trade: 'Plumbing', createdAt: new Date('2024-01-15'), lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: '2', companyName: 'ABC Electric', firstName: 'John', lastName: 'Doe', email: 'john@abc-electric.com', phone: '(512) 555-0101', status: 'active', trade: 'Electrical', createdAt: new Date('2024-02-20'), lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: '3', companyName: 'Cool Air HVAC', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@coolair.com', phone: '(512) 555-0102', status: 'pending', trade: 'HVAC', createdAt: new Date('2024-11-20'), lastLogin: null },
  { id: '4', companyName: 'Top Roofing Co', firstName: 'Chris', lastName: 'Wilson', email: 'chris@toproofing.com', phone: '(512) 555-0103', status: 'active', trade: 'Roofing', createdAt: new Date('2024-03-10'), lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { id: '5', companyName: 'Quick Spark Services', firstName: 'Mike', lastName: 'Smith', email: 'mike@quickspark.com', phone: '(512) 555-0104', status: 'suspended', trade: 'Electrical', createdAt: new Date('2024-04-05'), lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
]

export default function AdminMembersPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const filteredMembers = mockMembers.filter((member) => {
    if (statusFilter !== 'all' && member.status !== statusFilter) return false
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        member.companyName.toLowerCase().includes(searchLower) ||
        member.firstName.toLowerCase().includes(searchLower) ||
        member.lastName.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  const toggleSelectMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map((m) => m.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
      active: 'success',
      pending: 'warning',
      suspended: 'error',
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-1">Manage your association members</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/import">
            <Button variant="outline">Import Members</Button>
          </Link>
          <Button>Invite Member</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{mockMembers.length}</p>
            <p className="text-sm text-gray-500">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-green-600">{mockMembers.filter((m) => m.status === 'active').length}</p>
            <p className="text-sm text-gray-500">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-yellow-600">{mockMembers.filter((m) => m.status === 'pending').length}</p>
            <p className="text-sm text-gray-500">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-red-600">{mockMembers.filter((m) => m.status === 'suspended').length}</p>
            <p className="text-sm text-gray-500">Suspended</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex rounded-lg border border-gray-200 p-1">
              {['all', 'active', 'pending', 'suspended'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex-1">
              <Input
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Bulk actions */}
          {selectedMembers.length > 0 && (
            <div className="mt-4 flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">
                {selectedMembers.length} member(s) selected
              </span>
              <Button size="sm" variant="outline">Approve</Button>
              <Button size="sm" variant="outline">Suspend</Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedMembers([])}>
                Clear Selection
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Members table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="pb-3 pr-4">Member</th>
                  <th className="pb-3 pr-4">Contact</th>
                  <th className="pb-3 pr-4">Trade</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Joined</th>
                  <th className="pb-3 pr-4">Last Active</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="py-4 pr-4">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleSelectMember(member.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <div>
                        <p className="font-medium text-gray-900">{member.companyName}</p>
                        <p className="text-sm text-gray-500">
                          {member.firstName} {member.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div>
                        <p className="text-sm text-gray-900">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge>{member.trade}</Badge>
                    </td>
                    <td className="py-4 pr-4">{getStatusBadge(member.status)}</td>
                    <td className="py-4 pr-4">
                      <p className="text-sm text-gray-500">{formatDate(member.createdAt)}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-sm text-gray-500">
                        {member.lastLogin ? formatRelativeTime(member.lastLogin) : 'Never'}
                      </p>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        {member.status === 'pending' && (
                          <Button size="sm">Approve</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
