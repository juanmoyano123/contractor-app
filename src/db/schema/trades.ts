import { pgTable, uuid, varchar, timestamp, boolean, integer, text } from 'drizzle-orm/pg-core'

/**
 * Trades table - Catalog of all available trades/specialties
 * This is a global table, not tenant-specific
 */
export const trades = pgTable('trades', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(), // URL-safe identifier
  category: varchar('category', { length: 100 }).notNull(), // e.g., "Plumbing", "Electrical", "HVAC"
  description: text('description'),
  icon: varchar('icon', { length: 50 }), // Icon identifier for UI
  parentId: uuid('parent_id'), // For sub-specialties (e.g., "Drain Cleaning" under "Plumbing")
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Trade = typeof trades.$inferSelect
export type NewTrade = typeof trades.$inferInsert
