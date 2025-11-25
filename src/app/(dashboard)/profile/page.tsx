'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Badge } from '@/components/ui'
import { useAuth } from '@/lib/auth-context'

const profileSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  companyPhone: z.string().optional(),
  companyEmail: z.string().email().optional().or(z.literal('')),
  website: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  yearsInBusiness: z.string().optional(),
  employeeCount: z.string().optional(),
  licenseNumber: z.string().optional(),
  bio: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

// Mock data
const mockProfile = {
  companyName: 'Rodriguez Plumbing LLC',
  companyPhone: '(512) 555-0100',
  companyEmail: 'info@rodriguez-plumbing.com',
  website: 'www.rodriguez-plumbing.com',
  address: '123 Main St',
  city: 'Austin',
  state: 'TX',
  zipCode: '78701',
  yearsInBusiness: '15',
  employeeCount: '8',
  licenseNumber: 'TX-PLB-12345',
  bio: 'Family-owned plumbing company serving Austin since 2009. Specializing in residential and commercial plumbing services.',
  availability: 'accepting',
  specialties: [
    { name: 'Plumbing - General', proficiency: 'expert', isPrimary: true },
    { name: 'Water Heater Installation', proficiency: 'expert', isPrimary: false },
    { name: 'Drain Cleaning', proficiency: 'intermediate', isPrimary: false },
  ],
  stats: {
    leadsShared: 45,
    leadsReceived: 38,
    totalEarnings: 12500,
    avgResponseTime: 28,
    reciprocityScore: 1.18,
  },
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [availability, setAvailability] = useState(mockProfile.availability)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockProfile,
  })

  async function onSubmit(data: ProfileForm) {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your company information and preferences</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{mockProfile.stats.leadsShared}</p>
            <p className="text-xs text-gray-500">Leads Shared</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{mockProfile.stats.leadsReceived}</p>
            <p className="text-xs text-gray-500">Leads Received</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-gray-900">${mockProfile.stats.totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{mockProfile.stats.avgResponseTime}m</p>
            <p className="text-xs text-gray-500">Avg Response</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className={`text-2xl font-bold ${mockProfile.stats.reciprocityScore >= 1 ? 'text-green-600' : 'text-yellow-600'}`}>
              {mockProfile.stats.reciprocityScore.toFixed(2)}x
            </p>
            <p className="text-xs text-gray-500">Reciprocity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main profile form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Company Name"
                  disabled={!isEditing}
                  error={errors.companyName?.message}
                  {...register('companyName')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    disabled={!isEditing}
                    {...register('companyPhone')}
                  />
                  <Input
                    label="Email"
                    type="email"
                    disabled={!isEditing}
                    {...register('companyEmail')}
                  />
                </div>

                <Input
                  label="Website"
                  disabled={!isEditing}
                  {...register('website')}
                />

                <Input
                  label="Address"
                  disabled={!isEditing}
                  {...register('address')}
                />

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="City"
                    disabled={!isEditing}
                    {...register('city')}
                  />
                  <Input
                    label="State"
                    disabled={!isEditing}
                    {...register('state')}
                  />
                  <Input
                    label="ZIP Code"
                    disabled={!isEditing}
                    {...register('zipCode')}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Years in Business"
                    type="number"
                    disabled={!isEditing}
                    {...register('yearsInBusiness')}
                  />
                  <Input
                    label="Number of Employees"
                    type="number"
                    disabled={!isEditing}
                    {...register('employeeCount')}
                  />
                </div>

                <Input
                  label="License Number"
                  disabled={!isEditing}
                  {...register('licenseNumber')}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-50"
                    rows={3}
                    disabled={!isEditing}
                    {...register('bio')}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isSaving}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['accepting', 'at_capacity', 'emergency_only'].map((status) => (
                  <label
                    key={status}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      availability === status
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={status}
                      checked={availability === status}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="sr-only"
                    />
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {status.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {status === 'accepting' && 'Open to receiving referrals'}
                        {status === 'at_capacity' && 'Temporarily not accepting'}
                        {status === 'emergency_only' && 'Only urgent jobs'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Specialties</CardTitle>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProfile.specialties.map((specialty, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{specialty.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{specialty.proficiency}</p>
                    </div>
                    {specialty.isPrimary && (
                      <Badge variant="info">Primary</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
