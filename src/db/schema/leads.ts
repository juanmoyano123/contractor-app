import { pgTable, uuid, varchar, timestamp, boolean, text, decimal, pgEnum, integer } from 'drizzle-orm/pg-core'
import { tenants } from './tenants'
import { contractorProfiles } from './contractors'
import { users } from './users'

/**
 * Lead urgency enum
 */
export const leadUrgencyEnum = pgEnum('lead_urgency', ['emergency', 'today', 'this_week', 'flexible'])

/**
 * Lead status enum - Workflow states
 */
export const leadStatusEnum = pgEnum('lead_status', [
  'pending',      // Just created, waiting for acceptance
  'accepted',     // Recipient accepted the lead
  'declined',     // Recipient declined
  'expired',      // Auto-declined after timeout
  'contacted',    // Recipient contacted the customer
  'quoted',       // Quote sent to customer
  'won',          // Job won
  'lost',         // Job lost to competition/customer declined
  'cancelled'     // Lead cancelled by referrer
])

/**
 * Commission status enum
 */
export const commissionStatusEnum = pgEnum('commission_status', ['pending', 'calculated', 'disputed', 'paid'])

/**
 * Leads table - Core lead/referral tracking
 */
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  // Referrer (who shared the lead)
  referrerId: uuid('referrer_id').notNull().references(() => contractorProfiles.id),

  // Recipient (who received the lead) - can be null for broadcast leads
  recipientId: uuid('recipient_id').references(() => contractorProfiles.id),

  // Customer Information
  customerName: varchar('customer_name', { length: 200 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }),
  customerAddress: text('customer_address'),
  customerCity: varchar('customer_city', { length: 100 }),
  customerState: varchar('customer_state', { length: 50 }),
  customerZipCode: varchar('customer_zip_code', { length: 20 }),

  // Lead Details
  serviceNeeded: text('service_needed').notNull(),
  urgency: leadUrgencyEnum('urgency').notNull().default('this_week'),
  budgetMin: decimal('budget_min', { precision: 10, scale: 2 }),
  budgetMax: decimal('budget_max', { precision: 10, scale: 2 }),
  notes: text('notes'),

  // Lead workflow
  status: leadStatusEnum('status').notNull().default('pending'),
  isBroadcast: boolean('is_broadcast').default(false), // Sent to multiple contractors

  // Timestamps for workflow tracking
  sharedAt: timestamp('shared_at').defaultNow(),
  acceptedAt: timestamp('accepted_at'),
  contactedAt: timestamp('contacted_at'),
  quotedAt: timestamp('quoted_at'),
  completedAt: timestamp('completed_at'),
  expiresAt: timestamp('expires_at'), // Auto-decline deadline (default: 2 hours after shared)

  // Job outcome
  jobValue: decimal('job_value', { precision: 12, scale: 2 }),

  // Commission tracking
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).default('10.00'), // Default 10%
  commissionAmount: decimal('commission_amount', { precision: 10, scale: 2 }),
  commissionStatus: commissionStatusEnum('commission_status').default('pending'),
  commissionLockedAt: timestamp('commission_locked_at'), // After 7-day dispute period
  commissionPaidAt: timestamp('commission_paid_at'),

  // Response tracking
  responseTimeMinutes: integer('response_time_minutes'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

/**
 * Lead recipients table - For broadcast leads (multiple potential recipients)
 */
export const leadRecipients = pgTable('lead_recipients', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  contractorId: uuid('contractor_id').notNull().references(() => contractorProfiles.id),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, accepted, declined, expired
  notifiedAt: timestamp('notified_at'),
  respondedAt: timestamp('responded_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

/**
 * Lead status history table - Track all status changes
 */
export const leadStatusHistory = pgTable('lead_status_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  previousStatus: leadStatusEnum('previous_status'),
  newStatus: leadStatusEnum('new_status').notNull(),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
export type LeadRecipient = typeof leadRecipients.$inferSelect
export type NewLeadRecipient = typeof leadRecipients.$inferInsert
export type LeadStatusHistory = typeof leadStatusHistory.$inferSelect
export type NewLeadStatusHistory = typeof leadStatusHistory.$inferInsert
