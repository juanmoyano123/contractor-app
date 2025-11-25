'use client'

import { useState, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '@/components/ui'
import { parseCSV, isValidEmail, isValidPhone } from '@/lib/utils'

interface ImportRow {
  email: string
  firstName: string
  lastName: string
  companyName: string
  phone?: string
  trade?: string
}

interface ValidationResult {
  row: number
  valid: boolean
  errors: string[]
  data?: ImportRow
}

export default function AdminImportPage() {
  const [step, setStep] = useState<'upload' | 'preview' | 'sending' | 'complete'>('upload')
  const [csvData, setCsvData] = useState<string[][]>([])
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [isSending, setIsSending] = useState(false)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const rows = parseCSV(text)
      setCsvData(rows)

      // Validate rows (skip header)
      const results: ValidationResult[] = []
      for (let i = 1; i < rows.length; i++) {
        const [email, firstName, lastName, companyName, phone, trade] = rows[i]
        const errors: string[] = []

        if (!email) errors.push('Email is required')
        else if (!isValidEmail(email)) errors.push('Invalid email format')

        if (!firstName) errors.push('First name is required')
        if (!lastName) errors.push('Last name is required')
        if (!companyName) errors.push('Company name is required')
        if (phone && !isValidPhone(phone)) errors.push('Invalid phone format')

        results.push({
          row: i,
          valid: errors.length === 0,
          errors,
          data: errors.length === 0 ? { email, firstName, lastName, companyName, phone, trade } : undefined,
        })
      }

      setValidationResults(results)
      setStep('preview')
    }
    reader.readAsText(file)
  }, [])

  const validCount = validationResults.filter((r) => r.valid).length
  const invalidCount = validationResults.filter((r) => !r.valid).length

  const handleSendInvitations = async () => {
    setIsSending(true)
    setStep('sending')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)
    setStep('complete')
  }

  const resetImport = () => {
    setCsvData([])
    setValidationResults([])
    setStep('upload')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Import Members</h1>
        <p className="text-gray-600 mt-1">Bulk import members from a CSV file</p>
      </div>

      {/* Progress */}
      <div className="flex items-center space-x-4">
        {['Upload', 'Preview', 'Send'].map((s, i) => {
          const stepNames = ['upload', 'preview', 'sending']
          const currentIndex = stepNames.indexOf(step === 'complete' ? 'sending' : step)
          return (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= currentIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step === 'complete' && i === 2 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">{s}</span>
              {i < 2 && <div className="w-16 h-0.5 bg-gray-200 ml-4" />}
            </div>
          )
        })}
      </div>

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-4 text-sm text-gray-600">
                Drag and drop your CSV file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button className="mt-4" onClick={() => document.getElementById('csv-upload')?.click()}>
                  Choose File
                </Button>
              </label>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">CSV Format Requirements</h4>
              <p className="text-sm text-gray-600 mb-2">Your CSV should have the following columns:</p>
              <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                email, first_name, last_name, company_name, phone, trade
              </code>
              <div className="mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Download sample CSV template
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Preview */}
      {step === 'preview' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Review Import Data</CardTitle>
              <div className="flex gap-4">
                <Badge variant="success">{validCount} valid</Badge>
                {invalidCount > 0 && <Badge variant="error">{invalidCount} invalid</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b">
                    <th className="pb-3 pr-4">Row</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Company</th>
                    <th className="pb-3 pr-4">Phone</th>
                    <th className="pb-3">Trade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {validationResults.map((result, i) => (
                    <tr key={i} className={result.valid ? '' : 'bg-red-50'}>
                      <td className="py-2 pr-4">{result.row}</td>
                      <td className="py-2 pr-4">
                        {result.valid ? (
                          <Badge variant="success">Valid</Badge>
                        ) : (
                          <Badge variant="error">Error</Badge>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {csvData[result.row]?.[0] || '-'}
                        {result.errors.some((e) => e.includes('email')) && (
                          <p className="text-xs text-red-600">Invalid email</p>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {csvData[result.row]?.[1]} {csvData[result.row]?.[2]}
                      </td>
                      <td className="py-2 pr-4">{csvData[result.row]?.[3] || '-'}</td>
                      <td className="py-2 pr-4">{csvData[result.row]?.[4] || '-'}</td>
                      <td className="py-2">{csvData[result.row]?.[5] || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={resetImport}>
                Start Over
              </Button>
              <Button onClick={handleSendInvitations} disabled={validCount === 0}>
                Send {validCount} Invitation{validCount !== 1 ? 's' : ''}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Sending */}
      {step === 'sending' && (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Sending Invitations...</h3>
              <p className="mt-2 text-gray-500">
                Please wait while we send invitations to {validCount} members.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Complete */}
      {step === 'complete' && (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Invitations Sent!</h3>
              <p className="mt-2 text-gray-500">
                Successfully sent {validCount} invitation{validCount !== 1 ? 's' : ''}.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Members will receive an email with instructions to join.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button variant="outline" onClick={resetImport}>
                  Import More
                </Button>
                <Button onClick={() => window.location.href = '/admin/members'}>
                  View Members
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
