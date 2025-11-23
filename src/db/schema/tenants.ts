import { pgTable, uuid, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core'

/**
 * Tenants table - Each association gets their own tenant
 * This is the foundation for multi-tenant architecture
 */
export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 50 }).notNull().unique(), // URL-safe identifier
  name: varchar('name', { length: 200 }).notNull(),
  domain: varchar('domain', { length: 100 }).unique(),
  settings: jsonb('settings').default({}),
  branding: jsonb('branding').default({}),
  status: varchar('status', { length: 20 }).default('trial'), // trial, active, suspended
  trialEndsAt: timestamp('trial_ends_at'),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Tenant = typeof tenants.$inferSelect
export type NewTenant = typeof tenants.$inferInsert
