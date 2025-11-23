import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/contractor_network'

// For query purposes
const queryClient = postgres(connectionString)
export const db = drizzle(queryClient)
