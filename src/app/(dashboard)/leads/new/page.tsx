'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Badge } from '@/components/ui'
import { formatPhone } from '@/lib/utils'

const leadSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  customerAddress: z.string().optional(),
  customerCity: z.string().optional(),
  customerZipCode: z.string().optional(),
  serviceNeeded: z.string().min(5, 'Please describe the service needed'),
  urgency: z.enum(['emergency', 'today', 'this_week', 'flexible']),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  notes: z.string().optional(),
})

type LeadForm = z.infer<typeof leadSchema>

// Mock search results
const mockSearchResults = [
  { id: '1', companyName: 'ABC Electric', firstName: 'John', lastName: 'Doe', availability: 'accepting', avgResponseTime: 25, reciprocityScore: 1.2, distance: 5.2 },
  { id: '2', companyName: 'Quick Spark Electrical', firstName: 'Mike', lastName: 'Smith', availability: 'accepting', avgResponseTime: 45, reciprocityScore: 0.9, distance: 8.1 },
  { id: '3', companyName: 'PowerPro Services', firstName: 'Sarah', lastName: 'Johnson', availability: 'emergency_only', avgResponseTime: 30, reciprocityScore: 1.5, distance: 12.3 },
]

export default function NewLeadPage() {
  const router = useRouter()
  const [step, setStep] = useState<'customer' | 'search' | 'confirm'>('customer')
  const [searchTrade, setSearchTrade] = useState('')
  const [selectedContractors, setSelectedContractors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      urgency: 'this_week',
    },
  })

  const formData = watch()

  function onCustomerSubmit(data: LeadForm) {
    setStep('search')
  }

  function handleContractorSelect(id: string) {
    setSelectedContractors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  async function handleSendLead() {
    if (selectedContractors.length === 0) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push('/leads?success=1')
  }

  const getAvailabilityColor = (availability: string) => {
    const colors: Record<string, 'success' | 'warning' | 'error'> = {
      accepting: 'success',
      at_capacity: 'warning',
      emergency_only: 'error',
    }
    return colors[availability] || 'default'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress steps */}
      <div className="flex items-center justify-center space-x-4">
        {['customer', 'search', 'confirm'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s
                  ? 'bg-blue-600 text-white'
                  : i < ['customer', 'search', 'confirm'].indexOf(step)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            {i < 2 && <div className="w-16 h-0.5 bg-gray-200 ml-2" />}
          </div>
        ))}
      </div>

      {/* Step 1: Customer Info */}
      {step === 'customer' && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onCustomerSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Customer Name *"
                  placeholder="John Smith"
                  error={errors.customerName?.message}
                  {...register('customerName')}
                />
                <Input
                  label="Phone Number *"
                  placeholder="(512) 555-0100"
                  error={errors.customerPhone?.message}
                  {...register('customerPhone')}
                />
              </div>

              <Input
                label="Email (optional)"
                type="email"
                placeholder="customer@example.com"
                error={errors.customerEmail?.message}
                {...register('customerEmail')}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Address (optional)"
                    placeholder="123 Main St"
                    {...register('customerAddress')}
                  />
                </div>
                <Input
                  label="ZIP Code"
                  placeholder="78701"
                  {...register('customerZipCode')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Needed *
                </label>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe what the customer needs..."
                  {...register('serviceNeeded')}
                />
                {errors.serviceNeeded && (
                  <p className="mt-1 text-sm text-red-600">{errors.serviceNeeded.message}</p>
                )}
              </div>

              <Select
                label="Urgency *"
                options={[
                  { value: 'emergency', label: 'Emergency - ASAP' },
                  { value: 'today', label: 'Today' },
                  { value: 'this_week', label: 'This Week' },
                  { value: 'flexible', label: 'Flexible' },
                ]}
                {...register('urgency')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Budget Min (optional)"
                  type="number"
                  placeholder="500"
                  {...register('budgetMin')}
                />
                <Input
                  label="Budget Max (optional)"
                  type="number"
                  placeholder="2000"
                  {...register('budgetMax')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes for Recipient (optional)
                </label>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Any additional context..."
                  {...register('notes')}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Continue to Find Specialist</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Search & Select */}
      {step === 'search' && (
        <Card>
          <CardHeader>
            <CardTitle>Find a Specialist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search filters */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Select
                  label="Trade/Specialty"
                  value={searchTrade}
                  onChange={(e) => setSearchTrade(e.target.value)}
                  options={[
                    { value: '', label: 'Select a trade...' },
                    { value: 'electrical', label: 'Electrical' },
                    { value: 'plumbing', label: 'Plumbing' },
                    { value: 'hvac', label: 'HVAC' },
                    { value: 'roofing', label: 'Roofing' },
                  ]}
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Location"
                  placeholder="ZIP code or city"
                  defaultValue={formData.customerZipCode}
                />
              </div>
            </div>

            {/* Search results */}
            <div className="space-y-3 mt-6">
              <h4 className="text-sm font-medium text-gray-700">
                {mockSearchResults.length} contractors found
              </h4>
              {mockSearchResults.map((contractor) => (
                <div
                  key={contractor.id}
                  onClick={() => handleContractorSelect(contractor.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedContractors.includes(contractor.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedContractors.includes(contractor.id)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{contractor.companyName}</p>
                        <p className="text-sm text-gray-500">
                          {contractor.firstName} {contractor.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <Badge variant={getAvailabilityColor(contractor.availability)}>
                        {contractor.availability.replace('_', ' ')}
                      </Badge>
                      <span className="text-gray-500">{contractor.distance} mi</span>
                      <span className="text-gray-500">~{contractor.avgResponseTime}min response</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedContractors.length > 1 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                Broadcasting to multiple contractors - first to accept gets the lead
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('customer')}>
                Back
              </Button>
              <Button
                onClick={() => setStep('confirm')}
                disabled={selectedContractors.length === 0}
              >
                Continue ({selectedContractors.length} selected)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirm */}
      {step === 'confirm' && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm & Send Lead</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Customer</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>{' '}
                  <span className="text-gray-900">{formData.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Phone:</span>{' '}
                  <span className="text-gray-900">{formatPhone(formData.customerPhone)}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Service:</span>{' '}
                  <span className="text-gray-900">{formData.serviceNeeded}</span>
                </div>
              </div>
            </div>

            {/* Selected contractors */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Sending to {selectedContractors.length} contractor(s)
              </h4>
              <div className="space-y-2">
                {mockSearchResults
                  .filter((c) => selectedContractors.includes(c.id))
                  .map((contractor) => (
                    <div
                      key={contractor.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{contractor.companyName}</span>
                      <Badge variant={getAvailabilityColor(contractor.availability)}>
                        {contractor.availability.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>

            {/* Commission info */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Commission:</strong> You&apos;ll earn 10% of the job value when this lead converts to a completed job.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('search')}>
                Back
              </Button>
              <Button onClick={handleSendLead} isLoading={isSubmitting}>
                Send Lead
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
