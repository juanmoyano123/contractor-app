'use client'

import { useState } from 'react'
import { Card, CardContent, Button, Input, Select, Badge } from '@/components/ui'
import { getAvailabilityColor } from '@/lib/utils'

// Mock data
const mockContractors = [
  { id: '1', companyName: 'Rodriguez Plumbing LLC', firstName: 'Miguel', lastName: 'Rodriguez', trade: 'Plumbing', availability: 'accepting', avgResponseTime: 25, reciprocityScore: 1.2, distance: 5.2, yearsInBusiness: 15, licenseVerified: true, insuranceVerified: true },
  { id: '2', companyName: 'ABC Electric', firstName: 'John', lastName: 'Doe', trade: 'Electrical', availability: 'accepting', avgResponseTime: 45, reciprocityScore: 0.9, distance: 8.1, yearsInBusiness: 8, licenseVerified: true, insuranceVerified: true },
  { id: '3', companyName: 'Cool Air HVAC', firstName: 'Sarah', lastName: 'Johnson', trade: 'HVAC', availability: 'at_capacity', avgResponseTime: 30, reciprocityScore: 1.5, distance: 12.3, yearsInBusiness: 12, licenseVerified: true, insuranceVerified: false },
  { id: '4', companyName: 'Top Roofing Co', firstName: 'Chris', lastName: 'Wilson', trade: 'Roofing', availability: 'accepting', avgResponseTime: 60, reciprocityScore: 0.8, distance: 15.7, yearsInBusiness: 20, licenseVerified: true, insuranceVerified: true },
  { id: '5', companyName: 'Quick Spark Services', firstName: 'Mike', lastName: 'Smith', trade: 'Electrical', availability: 'emergency_only', avgResponseTime: 15, reciprocityScore: 1.1, distance: 3.2, yearsInBusiness: 5, licenseVerified: true, insuranceVerified: true },
]

const trades = [
  { value: '', label: 'All Trades' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'general', label: 'General Contractor' },
]

export default function NetworkPage() {
  const [selectedTrade, setSelectedTrade] = useState('')
  const [location, setLocation] = useState('')
  const [availability, setAvailability] = useState('')
  const [searchResults, setSearchResults] = useState(mockContractors)

  function handleSearch() {
    let results = mockContractors
    if (selectedTrade) {
      results = results.filter((c) => c.trade.toLowerCase() === selectedTrade)
    }
    if (availability) {
      results = results.filter((c) => c.availability === availability)
    }
    setSearchResults(results)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Specialists</h1>
        <p className="text-gray-600 mt-1">Search your network for contractors by trade and location</p>
      </div>

      {/* Search filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Trade/Specialty"
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              options={trades}
            />
            <Input
              label="Location"
              placeholder="ZIP code or city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Select
              label="Availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              options={[
                { value: '', label: 'Any' },
                { value: 'accepting', label: 'Accepting Referrals' },
                { value: 'emergency_only', label: 'Emergency Only' },
              ]}
            />
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full">
                Search Network
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            {searchResults.length} contractors found
          </h2>
          <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option>Sort by: Distance</option>
            <option>Sort by: Response Time</option>
            <option>Sort by: Reciprocity Score</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {searchResults.map((contractor) => (
            <Card key={contractor.id} className="hover:border-blue-300 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">
                        {contractor.companyName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{contractor.companyName}</h3>
                      <p className="text-sm text-gray-500">
                        {contractor.firstName} {contractor.lastName}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="info">{contractor.trade}</Badge>
                        <Badge variant={getAvailabilityColor(contractor.availability) as any}>
                          {contractor.availability.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Distance</p>
                    <p className="font-medium">{contractor.distance} mi</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Response</p>
                    <p className="font-medium">{contractor.avgResponseTime} min</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Reciprocity</p>
                    <p className={`font-medium ${contractor.reciprocityScore >= 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {contractor.reciprocityScore.toFixed(1)}x
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                  <span>{contractor.yearsInBusiness} years in business</span>
                  {contractor.licenseVerified && (
                    <span className="flex items-center gap-1 text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Licensed
                    </span>
                  )}
                  {contractor.insuranceVerified && (
                    <span className="flex items-center gap-1 text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Insured
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    Send Lead
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
