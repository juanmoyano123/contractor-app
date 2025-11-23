# Contractor Referral Network Platform

> Multi-tenant white-label B2B2C platform for trade associations to enable systematic contractor referral networks

## 📋 Project Overview

This platform helps trade associations monetize the connections between their members through automated referral tracking and commission management, turning informal lead sharing into measurable revenue.

**Target Market:** Trade associations with 200-800 contractor members (PHCC chapters, NECA locals, ACCA regions)

**Value Proposition:** "$30K-50K annual referral revenue per contractor through systematic lead sharing"

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Styling:** TailwindCSS 3.0
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Language:** TypeScript

### Backend (Development)
- **Database:** PostgreSQL 16 + PostGIS (Docker)
- **ORM:** Drizzle ORM
- **Migrations:** Drizzle Kit

### Backend (Production - Future)
- **Platform:** Supabase (Auth + Database + Realtime + Storage)
- **Hosting:** Vercel (Frontend) + Cloudflare (DNS)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start PostgreSQL with Docker:**
```bash
npm run docker:up
```

3. **Generate database schema:**
```bash
npm run db:push
```

4. **Start development server:**
```bash
npm run dev
```

5. **Open your browser:**
```
http://localhost:3000
```

### Database Management

- **PgAdmin:** http://localhost:5050
  - Email: `admin@contractor.local`
  - Password: `admin`

- **Drizzle Studio:**
```bash
npm run db:studio
```

## 📁 Project Structure

```
contractor-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── db/                  # Database schema and migrations
│   │   ├── schema/          # Drizzle schema definitions
│   │   └── migrations/      # SQL migrations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── store/               # Zustand state stores
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── plan.md                  # Detailed project plan (RICE framework)
├── idea.md                  # Original product idea
└── reporte-validacion.md    # Market validation report
```

## 🎯 Development Phases

### Phase 0: Setup (Current) ✅
- [x] Project structure
- [x] Docker PostgreSQL
- [x] Base configuration (Next.js, TypeScript, Tailwind)
- [x] Drizzle ORM setup

### Phase 1: Multi-Tenant Foundation (M4)
- [ ] Complete tenant schema with RLS
- [ ] White-label branding system
- [ ] Subdomain routing
- [ ] Admin tenant management

### Phase 2: Core Features (M5-M7)
- [ ] Contractor profiles
- [ ] Lead sharing & tracking
- [ ] Network search

### Phase 3: Admin & Import (M8-M9)
- [ ] Association admin dashboard
- [ ] CSV bulk import

### Phase 4: Deployment (M10-M12)
- [ ] Supabase migration
- [ ] Production deployment
- [ ] UAT with pilot association

## 📊 Success Metrics

**North Star Metric:** Active Lead Sharing Rate - Target: **2.5 leads/contractor/month**

**Key Results:**
- 60% member activation within 30 days
- 40% WAU/MAU ratio
- NPS > 40 from association admins

## 🔐 Environment Variables

Copy `.env.local` and configure:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/contractor_network
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📚 Documentation

- [Detailed Project Plan](./plan.md) - Complete feature specifications (RICE framework)
- [Product Idea](./idea.md) - Original concept document
- [Validation Report](./reporte-validacion.md) - Market research findings

## 🤝 Contributing

This is a private project currently in MVP development.

## 📄 License

Private - All rights reserved

---

**Status:** Phase 0 Complete ✅ | Timeline: 35-38 days to MVP | Version: 0.1.0
