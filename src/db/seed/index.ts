import { seedTrades } from './trades'

/**
 * Run all seed functions
 */
async function main() {
  console.log('Starting database seed...')

  await seedTrades()

  console.log('Database seed complete!')
  process.exit(0)
}

main().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
