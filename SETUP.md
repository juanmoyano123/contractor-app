# 🚀 Setup Instructions

## Phase 0: Environment Setup - COMPLETED ✅

### What Was Done

1. ✅ **Project Structure Created**
   - Next.js 15 with App Router
   - TypeScript configuration
   - TailwindCSS 3.0 setup
   - Zustand for state management
   - React Hook Form + Zod for forms

2. ✅ **Database Configuration**
   - Docker Compose file for PostgreSQL 16 + PostGIS
   - Drizzle ORM setup
   - Initial tenant schema created
   - Migration system configured

3. ✅ **Development Tools**
   - ESLint configuration
   - Environment variables template
   - Git ignore file
   - Documentation (README.md)

### Next Steps for Local Development

#### 1. Start PostgreSQL (Run on your local machine)

```bash
# Make sure Docker Desktop is running, then:
npm run docker:up

# Verify containers are running:
docker ps
```

You should see:
- `contractor_network_db` (PostgreSQL)
- `contractor_network_pgadmin` (Database admin tool)

#### 2. Push Database Schema

```bash
# Generate and push the initial schema to PostgreSQL
npm run db:push
```

#### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 4. Access Database Tools

- **PgAdmin**: http://localhost:5050
  - Email: `admin@contractor.local`
  - Password: `admin`

- **Drizzle Studio**:
  ```bash
  npm run db:studio
  ```

### Project Status

```
Phase 0: Setup          ✅ COMPLETED
Phase 1: Multi-Tenant   ⚪ PENDING
Phase 2: Core Features  ⚪ PENDING
Phase 3: Admin Tools    ⚪ PENDING
Phase 4: Deployment     ⚪ PENDING
```

### Available Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run docker:up    # Start PostgreSQL containers
npm run docker:down  # Stop PostgreSQL containers

npm run db:push      # Push schema changes to database
npm run db:generate  # Generate migration files
npm run db:studio    # Open Drizzle Studio (database GUI)
```

### Troubleshooting

**Issue:** Docker containers won't start
```bash
# Check if Docker Desktop is running
docker --version

# Stop any existing containers
docker-compose down

# Remove volumes and restart
docker-compose down -v
npm run docker:up
```

**Issue:** Port 5432 already in use
```bash
# Find what's using the port
lsof -i :5432

# Stop local PostgreSQL if installed
sudo service postgresql stop  # Linux
brew services stop postgresql  # macOS
```

**Issue:** Database connection fails
```bash
# Verify .env.local exists and has correct URL
cat .env.local

# Should contain:
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/contractor_network
```

### What's Next?

Ready to start **Phase 1: Multi-Tenant Foundation (M4)**

This includes:
- Complete database schema with Row-Level Security (RLS)
- White-label branding system
- Tenant management UI
- Subdomain routing configuration

See `plan.md` for detailed specifications.

---

**Last Updated:** 2025-11-23
**Phase:** 0 - Setup Complete ✅
**Next Milestone:** M3 - Database schema + RLS policies
