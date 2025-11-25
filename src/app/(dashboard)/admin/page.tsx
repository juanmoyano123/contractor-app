'use client'

import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

// Mock data
const metrics = {
  totalReferralValue: 847350,
  activeMembers: 342,
  totalMembers: 524,
  leadsThisMonth: 1247,
  avgResponseTime: 78, // minutes
  leadConversionRate: 32,
  monthOverMonthGrowth: 18.5,
}

const topReferrers = [
  { name: 'Rodriguez Plumbing', count: 45, value: 67500 },
  { name: 'ABC Electric', count: 38, value: 52000 },
  { name: 'Cool Air HVAC', count: 32, value: 48000 },
  { name: 'Top Roofing', count: 28, value: 41000 },
  { name: 'Quick Spark', count: 25, value: 35000 },
]

const topReceivers = [
  { name: 'PowerPro Services', count: 52, value: 78000 },
  { name: 'Mike\'s Plumbing', count: 41, value: 61500 },
  { name: 'Elite Electrical', count: 35, value: 52500 },
  { name: 'Premier HVAC', count: 29, value: 43500 },
  { name: 'Solid Roofing', count: 24, value: 36000 },
]

const recentActivity = [
  { type: 'lead', message: 'Rodriguez Plumbing shared a lead with ABC Electric', time: '5 min ago' },
  { type: 'won', message: 'Quick Spark won a job worth $3,500', time: '15 min ago' },
  { type: 'member', message: 'New member: Thompson Electric joined', time: '1 hour ago' },
  { type: 'lead', message: 'Cool Air HVAC received 3 new leads', time: '2 hours ago' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Network Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor your association&apos;s referral network performance</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Referral Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(metrics.totalReferralValue)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600">+{metrics.monthOverMonthGrowth}%</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.activeMembers}/{metrics.totalMembers}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(metrics.activeMembers / metrics.totalMembers) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((metrics.activeMembers / metrics.totalMembers) * 100)}% activation
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Leads This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.leadsThisMonth}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ~{Math.round(metrics.leadsThisMonth / metrics.activeMembers * 10) / 10} per active member
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Math.floor(metrics.avgResponseTime / 60)}h {metrics.avgResponseTime % 60}m
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {metrics.leadConversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity chart placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Network Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Daily leads chart - last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${
                    activity.type === 'lead' ? 'bg-blue-100' :
                    activity.type === 'won' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'lead' ? 'bg-blue-600' :
                      activity.type === 'won' ? 'bg-green-600' : 'bg-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReferrers.map((referrer, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      i === 0 ? 'bg-yellow-100 text-yellow-700' :
                      i === 1 ? 'bg-gray-100 text-gray-700' :
                      i === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="font-medium text-gray-900">{referrer.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{referrer.count} leads</p>
                    <p className="text-sm text-gray-500">{formatCurrency(referrer.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Receivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReceivers.map((receiver, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      i === 0 ? 'bg-yellow-100 text-yellow-700' :
                      i === 1 ? 'bg-gray-100 text-gray-700' :
                      i === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="font-medium text-gray-900">{receiver.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{receiver.count} leads</p>
                    <p className="text-sm text-gray-500">{formatCurrency(receiver.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
