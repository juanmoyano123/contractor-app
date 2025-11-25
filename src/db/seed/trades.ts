import { db } from '../index'
import { trades } from '../schema'

/**
 * Seed data for trades/specialties
 * Based on common trade categories in the US contractor market
 */
export const tradesSeedData = [
  // Plumbing Category
  { name: 'Plumbing - General', slug: 'plumbing-general', category: 'Plumbing', description: 'General plumbing services', icon: 'wrench', sortOrder: 1 },
  { name: 'Drain Cleaning', slug: 'drain-cleaning', category: 'Plumbing', description: 'Drain cleaning and unclogging services', icon: 'drain', sortOrder: 2 },
  { name: 'Water Heater Installation', slug: 'water-heater', category: 'Plumbing', description: 'Water heater installation and repair', icon: 'water-heater', sortOrder: 3 },
  { name: 'Pipe Repair & Replacement', slug: 'pipe-repair', category: 'Plumbing', description: 'Pipe repair and replacement services', icon: 'pipe', sortOrder: 4 },
  { name: 'Sewer Line Services', slug: 'sewer-line', category: 'Plumbing', description: 'Sewer line inspection, repair, and replacement', icon: 'sewer', sortOrder: 5 },
  { name: 'Gas Line Services', slug: 'gas-line', category: 'Plumbing', description: 'Gas line installation and repair', icon: 'gas', sortOrder: 6 },

  // Electrical Category
  { name: 'Electrical - General', slug: 'electrical-general', category: 'Electrical', description: 'General electrical services', icon: 'bolt', sortOrder: 10 },
  { name: 'Panel Upgrades', slug: 'panel-upgrades', category: 'Electrical', description: 'Electrical panel upgrades and replacements', icon: 'panel', sortOrder: 11 },
  { name: 'Wiring & Rewiring', slug: 'wiring', category: 'Electrical', description: 'Home and commercial wiring services', icon: 'wire', sortOrder: 12 },
  { name: 'Lighting Installation', slug: 'lighting', category: 'Electrical', description: 'Indoor and outdoor lighting installation', icon: 'lightbulb', sortOrder: 13 },
  { name: 'EV Charger Installation', slug: 'ev-charger', category: 'Electrical', description: 'Electric vehicle charger installation', icon: 'ev', sortOrder: 14 },
  { name: 'Generator Installation', slug: 'generator', category: 'Electrical', description: 'Backup generator installation', icon: 'generator', sortOrder: 15 },

  // HVAC Category
  { name: 'HVAC - General', slug: 'hvac-general', category: 'HVAC', description: 'General HVAC services', icon: 'hvac', sortOrder: 20 },
  { name: 'AC Installation & Repair', slug: 'ac-services', category: 'HVAC', description: 'Air conditioning installation and repair', icon: 'snowflake', sortOrder: 21 },
  { name: 'Heating Installation & Repair', slug: 'heating-services', category: 'HVAC', description: 'Heating system installation and repair', icon: 'fire', sortOrder: 22 },
  { name: 'Ductwork', slug: 'ductwork', category: 'HVAC', description: 'Duct installation, repair, and cleaning', icon: 'duct', sortOrder: 23 },
  { name: 'Heat Pump Services', slug: 'heat-pump', category: 'HVAC', description: 'Heat pump installation and repair', icon: 'heat-pump', sortOrder: 24 },
  { name: 'Indoor Air Quality', slug: 'air-quality', category: 'HVAC', description: 'Air purification and ventilation', icon: 'air', sortOrder: 25 },

  // Roofing Category
  { name: 'Roofing - General', slug: 'roofing-general', category: 'Roofing', description: 'General roofing services', icon: 'roof', sortOrder: 30 },
  { name: 'Roof Repair', slug: 'roof-repair', category: 'Roofing', description: 'Roof repair and maintenance', icon: 'roof-repair', sortOrder: 31 },
  { name: 'Roof Replacement', slug: 'roof-replacement', category: 'Roofing', description: 'Complete roof replacement', icon: 'roof-new', sortOrder: 32 },
  { name: 'Gutter Services', slug: 'gutters', category: 'Roofing', description: 'Gutter installation and repair', icon: 'gutter', sortOrder: 33 },

  // General Construction
  { name: 'General Contractor', slug: 'general-contractor', category: 'Construction', description: 'General construction and remodeling', icon: 'hammer', sortOrder: 40 },
  { name: 'Carpentry', slug: 'carpentry', category: 'Construction', description: 'Carpentry and woodworking', icon: 'saw', sortOrder: 41 },
  { name: 'Concrete & Masonry', slug: 'concrete-masonry', category: 'Construction', description: 'Concrete and masonry work', icon: 'brick', sortOrder: 42 },
  { name: 'Drywall', slug: 'drywall', category: 'Construction', description: 'Drywall installation and repair', icon: 'wall', sortOrder: 43 },
  { name: 'Painting', slug: 'painting', category: 'Construction', description: 'Interior and exterior painting', icon: 'paint', sortOrder: 44 },
  { name: 'Flooring', slug: 'flooring', category: 'Construction', description: 'Flooring installation', icon: 'floor', sortOrder: 45 },

  // Specialty Services
  { name: 'Landscaping', slug: 'landscaping', category: 'Exterior', description: 'Landscaping and lawn care', icon: 'tree', sortOrder: 50 },
  { name: 'Fencing', slug: 'fencing', category: 'Exterior', description: 'Fence installation and repair', icon: 'fence', sortOrder: 51 },
  { name: 'Pool Services', slug: 'pool', category: 'Exterior', description: 'Pool installation and maintenance', icon: 'pool', sortOrder: 52 },
  { name: 'Pest Control', slug: 'pest-control', category: 'Specialty', description: 'Pest control services', icon: 'bug', sortOrder: 53 },
  { name: 'Home Security', slug: 'security', category: 'Specialty', description: 'Security system installation', icon: 'shield', sortOrder: 54 },
  { name: 'Solar Installation', slug: 'solar', category: 'Specialty', description: 'Solar panel installation', icon: 'sun', sortOrder: 55 },
]

/**
 * Seed the trades table with initial data
 */
export async function seedTrades() {
  console.log('Seeding trades...')

  for (const trade of tradesSeedData) {
    await db.insert(trades).values(trade).onConflictDoNothing()
  }

  console.log(`Seeded ${tradesSeedData.length} trades`)
}
