/**
 * Shared TypeScript types for the application
 */

// Tenant branding configuration
export interface TenantBranding {
  logo?: string
  logoLight?: string // For dark backgrounds
  favicon?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily?: string
}

// Tenant settings configuration
export interface TenantSettings {
  commissionRate: number // Default 10%
  autoDeclineHours: number // Default 2
  disputePeriodDays: number // Default 7
  memberApproval: 'automatic' | 'manual'
  serviceAreaRestriction: boolean
  allowBroadcastLeads: boolean
  maxBroadcastRecipients: number
  welcomeEmailSubject?: string
  welcomeEmailBody?: string
}

// Default tenant settings
export const defaultTenantSettings: TenantSettings = {
  commissionRate: 10,
  autoDeclineHours: 2,
  disputePeriodDays: 7,
  memberApproval: 'manual',
  serviceAreaRestriction: true,
  allowBroadcastLeads: true,
  maxBroadcastRecipients: 5,
}

// Default tenant branding
export const defaultTenantBranding: TenantBranding = {
  primaryColor: '#2563eb', // Blue
  secondaryColor: '#1e40af',
  accentColor: '#f59e0b', // Amber
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Lead search filters
export interface LeadFilters {
  status?: string[]
  urgency?: string[]
  dateFrom?: string
  dateTo?: string
  minValue?: number
  maxValue?: number
}

// Contractor search filters
export interface ContractorSearchFilters {
  tradeId?: string
  tradeName?: string
  location?: string
  zipCode?: string
  lat?: number
  lng?: number
  radiusMiles?: number
  availability?: string[]
  minReciprocityScore?: number
  hasLicense?: boolean
  hasInsurance?: boolean
}

// Dashboard metrics
export interface DashboardMetrics {
  totalReferralValue: number
  activeMembers: number
  totalMembers: number
  leadsThisMonth: number
  avgResponseTime: number // in minutes
  leadConversionRate: number
  monthOverMonthGrowth: number
}

// Leaderboard entry
export interface LeaderboardEntry {
  contractorId: string
  companyName: string
  firstName: string
  lastName: string
  count: number
  value: number
}

// Network health metrics
export interface NetworkHealthMetrics {
  reciprocityBalance: number
  tradeGaps: string[] // Trades with no providers
  avgResponseTime: number
  leadConversionRate: number
  disputeRate: number
}

// CSV Import types
export interface CsvImportRow {
  email: string
  firstName: string
  lastName: string
  companyName: string
  phone?: string
  trade?: string
}

export interface CsvValidationResult {
  valid: boolean
  row: number
  errors: string[]
  data?: CsvImportRow
}

export interface CsvImportSummary {
  totalRows: number
  validRows: number
  invalidRows: number
  duplicates: number
  results: CsvValidationResult[]
}

// Session/Auth types
export interface SessionUser {
  id: string
  tenantId: string
  email: string
  firstName: string
  lastName: string
  role: 'super_admin' | 'association_admin' | 'contractor'
  contractorProfileId?: string
}

export interface AuthSession {
  user: SessionUser
  tenantSlug: string
  tenantName: string
  branding: TenantBranding
  expiresAt: number
}
