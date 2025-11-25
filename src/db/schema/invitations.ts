import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { tenants } from './tenants'

/**
 * Invitation status enum
 */
export const invitationStatusEnum = pgEnum('invitation_status', ['pending', 'sent', 'opened', 'clicked', 'accepted', 'expired'])

/**
 * Member invitations table - Track bulk import invitations
 */
export const memberInvitations = pgTable('member_invitations', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  // Invited member info
  email: varchar('email', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  companyName: varchar('company_name', { length: 200 }),
  phone: varchar('phone', { length: 20 }),
  tradeName: varchar('trade_name', { length: 100 }), // From CSV import

  // Invitation tracking
  invitationToken: varchar('invitation_token', { length: 100 }).notNull().unique(),
  status: invitationStatusEnum('status').notNull().default('pending'),

  // Email tracking
  sentAt: timestamp('sent_at'),
  openedAt: timestamp('opened_at'),
  clickedAt: timestamp('clicked_at'),
  acceptedAt: timestamp('accepted_at'),
  expiresAt: timestamp('expires_at'),

  // Reminder tracking
  reminderSentAt: timestamp('reminder_sent_at'),
  reminderCount: varchar('reminder_count', { length: 10 }).default('0'),

  // Import batch reference
  importBatchId: varchar('import_batch_id', { length: 100 }),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type MemberInvitation = typeof memberInvitations.$inferSelect
export type NewMemberInvitation = typeof memberInvitations.$inferInsert
