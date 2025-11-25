import { pgTable, uuid, varchar, timestamp, boolean, text, jsonb, decimal, integer, pgEnum } from 'drizzle-orm/pg-core'
import { tenants } from './tenants'
import { users } from './users'
import { trades } from './trades'

/**
 * Contractor status enum
 */
export const contractorStatusEnum = pgEnum('contractor_status', ['pending', 'active', 'suspended', 'inactive'])

/**
 * Contractor availability enum
 */
export const contractorAvailabilityEnum = pgEnum('contractor_availability', ['accepting', 'at_capacity', 'emergency_only'])

/**
 * Proficiency level enum
 */
export const proficiencyLevelEnum = pgEnum('proficiency_level', ['expert', 'intermediate', 'basic'])

/**
 * Service area type enum
 */
export const serviceAreaTypeEnum = pgEnum('service_area_type', ['county', 'radius', 'polygon', 'zip_codes'])

/**
 * Contractor profiles table - Company/contractor business information
 */
export const contractorProfiles = pgTable('contractor_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // Company Information
  companyName: varchar('company_name', { length: 200 }).notNull(),
  companyPhone: varchar('company_phone', { length: 20 }),
  companyEmail: varchar('company_email', { length: 255 }),
  website: varchar('website', { length: 255 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 20 }),

  // Business Details
  yearsInBusiness: integer('years_in_business'),
  employeeCount: integer('employee_count'),

  // License & Insurance
  licenseNumber: varchar('license_number', { length: 100 }),
  licenseType: varchar('license_type', { length: 50 }), // commercial, residential, both
  licenseVerified: boolean('license_verified').default(false),
  licenseExpiresAt: timestamp('license_expires_at'),
  insuranceVerified: boolean('insurance_verified').default(false),
  insuranceCoverageAmount: decimal('insurance_coverage_amount', { precision: 12, scale: 2 }),
  insuranceExpiresAt: timestamp('insurance_expires_at'),

  // Documents (stored as URLs/paths)
  licenseDocumentUrl: varchar('license_document_url', { length: 500 }),
  insuranceDocumentUrl: varchar('insurance_document_url', { length: 500 }),

  // Profile Status
  status: contractorStatusEnum('status').notNull().default('pending'),
  availability: contractorAvailabilityEnum('availability').notNull().default('accepting'),
  availabilityUpdatedAt: timestamp('availability_updated_at'),

  // Profile completeness and verification
  profileCompleteness: integer('profile_completeness').default(0), // 0-100%
  verifiedAt: timestamp('verified_at'),
  verifiedBy: uuid('verified_by'),

  // Stats (denormalized for performance)
  totalLeadsSent: integer('total_leads_sent').default(0),
  totalLeadsReceived: integer('total_leads_received').default(0),
  totalEarnings: decimal('total_earnings', { precision: 12, scale: 2 }).default('0'),
  averageResponseTime: integer('average_response_time'), // in minutes
  reciprocityScore: decimal('reciprocity_score', { precision: 5, scale: 2 }).default('1.00'), // ratio of sent/received

  // Bio/Description
  bio: text('bio'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

/**
 * Contractor specialties table - What trades/services each contractor offers
 */
export const contractorSpecialties = pgTable('contractor_specialties', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractorId: uuid('contractor_id').notNull().references(() => contractorProfiles.id, { onDelete: 'cascade' }),
  tradeId: uuid('trade_id').notNull().references(() => trades.id, { onDelete: 'cascade' }),
  proficiencyLevel: proficiencyLevelEnum('proficiency_level').notNull().default('intermediate'),
  isPrimary: boolean('is_primary').default(false), // Primary trade specialty
  certifications: jsonb('certifications').default([]), // Array of certification names
  yearsExperience: integer('years_experience'),
  createdAt: timestamp('created_at').defaultNow(),
})

/**
 * Service areas table - Geographic areas each contractor serves
 */
export const serviceAreas = pgTable('service_areas', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractorId: uuid('contractor_id').notNull().references(() => contractorProfiles.id, { onDelete: 'cascade' }),
  areaType: serviceAreaTypeEnum('area_type').notNull(),

  // For different area types:
  // - county: areaData contains county names
  // - radius: centerLat, centerLng, radiusMiles
  // - polygon: areaData contains GeoJSON
  // - zip_codes: areaData contains array of zip codes
  areaData: jsonb('area_data').notNull(),
  centerLat: decimal('center_lat', { precision: 10, scale: 7 }),
  centerLng: decimal('center_lng', { precision: 10, scale: 7 }),
  radiusMiles: integer('radius_miles'),

  isEmergencyArea: boolean('is_emergency_area').default(false), // Will travel farther for premium
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export type ContractorProfile = typeof contractorProfiles.$inferSelect
export type NewContractorProfile = typeof contractorProfiles.$inferInsert
export type ContractorSpecialty = typeof contractorSpecialties.$inferSelect
export type NewContractorSpecialty = typeof contractorSpecialties.$inferInsert
export type ServiceArea = typeof serviceAreas.$inferSelect
export type NewServiceArea = typeof serviceAreas.$inferInsert
