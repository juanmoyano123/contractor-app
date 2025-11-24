# Trades Network Platform - Design System & Style Guide

**Version:** 1.0
**Date:** 2025-11-23
**Status:** Design Phase Complete - Ready for Development Handoff

---

## 📋 Project Overview

This is a comprehensive design system for the **Trades Network Platform**, a B2B2C white-label SaaS that enables trade associations to provide referral networking infrastructure to their contractor members.

**Business Model:** Sell to trade associations (PHCC, NECA, ACCA) who deploy the platform to 200-800 contractor members.

**Key Users:**
1. **Association Administrators** (Patricia Chen) - Manage members, view network analytics
2. **Contractor Members** (Miguel Rodriguez) - Share and receive leads within trusted network
3. **Franchise Owners** (James Thompson) - Manage inter-franchise referrals

---

## 🎯 Design System Components

### Completed Deliverables

#### 1. Research & Analysis
- **[competitive-analysis.md](/research/competitive-analysis.md)** - In-depth analysis of 5 key competitors
  - Angi: Consumer marketplace (trust signals, contractor profiles)
  - Jobber: SaaS for contractors (dashboard design, clean UI)
  - Buildertrend: Construction PM (complex data handling)
  - Porch: B2B2C platform (dual-persona navigation, white-label)
  - ServiceTitan: Enterprise SaaS (sophisticated design systems)

- **[design-decisions.md](/research/design-decisions.md)** - Every major design decision documented with:
  - Competitive precedent
  - Rationale and trade-offs
  - User impact
  - Implementation notes

#### 2. Design Tokens
- **[design-tokens.css](/design-tokens.css)** - Complete token system
  - Color palette (primary blue #1B5ABE, secondary teal #007589)
  - Typography (Inter font family, 12px-48px scale)
  - Spacing (8px base unit system)
  - Shadows, borders, transitions
  - White-label customization variables

#### 3. Wireframes (Low-Fidelity)
- **[01-association-admin-dashboard.html](/wireframes/01-association-admin-dashboard.html)**
  - Hero metrics (4-card grid)
  - Network activity graph
  - Member leaderboards
  - Recent activity table

- **[02-contractor-network-directory.html](/wireframes/02-contractor-network-directory.html)**
  - Search and filter sidebar
  - Contractor card grid
  - Availability status indicators
  - Reciprocity balance display

- **[03-lead-sharing-flow.html](/wireframes/03-lead-sharing-flow.html)**
  - Multi-step wizard (3 steps)
  - Customer information form
  - Contractor selection (single or broadcast mode)
  - Review and confirmation

- **[04-contractor-profile.html](/wireframes/04-contractor-profile.html)**
  - Profile header with trust badges
  - Stats dashboard
  - **Reciprocity tracking visualization** (unique feature)
  - Service details and certifications

#### 4. Component Styles
- **[mockups/styles.css](/mockups/styles.css)** - Production-ready CSS
  - Complete component library
  - Buttons (primary, secondary, ghost, sizes)
  - Cards (standard, metric, hover states)
  - Forms (inputs, selects, validation states)
  - Tables (responsive, sortable)
  - Badges (status-specific colors)
  - Avatars (multiple sizes)
  - Navigation (header, sidebar)
  - Utilities (flex, grid, spacing)

---

## 🎨 Design System Foundations

### Color Palette

**Primary (Professional Blue):**
```
--color-primary-500: #1B5ABE  /* Main brand color */
--color-primary-600: #14438E  /* Hover/active states */
```

**Justification:** Validated by Jobber, ServiceTitan, Porch as trust-building color for contractor B2B platforms.

**Secondary (Teal):**
```
--color-secondary-500: #007589  /* Construction industry association */
```

**Justification:** Buildertrend uses teal for construction/trades branding.

**Semantic Colors:**
```
Success: #18A761 (Green)
Warning: #F59E0B (Amber)
Error:   #E24F4F (Red)
Info:    #0265DC (Bright Blue)
```

### Typography

**Font Family:** Inter (Google Fonts)
- **Headings:** Inter 700-800 (Bold-Extrabold)
- **Body:** Inter 400-600 (Regular-Semibold)

**Scale:**
```
H1: 32px-44px
H2: 24px-32px
H3: 20px-24px
Body: 16px (minimum for readability)
Small: 14px
Tiny: 12px
```

**Justification:** Inter is the modern SaaS standard (GitHub, Stripe), open-source, excellent mobile readability.

### Spacing System

**Base Unit:** 8px

**Scale:**
```
xs:   8px  (--spacing-2)
sm:   16px (--spacing-4)
md:   24px (--spacing-6)
lg:   32px (--spacing-8)
xl:   40px (--spacing-10)
xxl:  48px (--spacing-12)
```

**Justification:** Universal across Jobber, ServiceTitan, Porch (Material Design standard).

### Component Patterns

**Buttons:**
- Height: 40px (md), 48px (lg)
- Padding: 12px 24px
- Border radius: 6px
- Hover: translateY(-1px) + shadow

**Cards:**
- Border radius: 8px
- Padding: 24px
- Shadow: 0 4px 6px rgba(0,0,0,0.07)
- Hover: Increase shadow + subtle scale

**Badges:**
- Border radius: 9999px (fully rounded pill)
- Padding: 4px 12px
- Font size: 14px
- Color-coded by status

---

## 🚀 Key Design Innovations

### 1. Reciprocity Tracking (Unique Feature)

**Problem:** Contractors informally refer leads but have no visibility into balance ("I sent you 10 leads, you sent me 2").

**Solution:** Visual reciprocity dashboard showing:
- Leads Given vs Received (numerical + progress bar)
- Balance status: Green (balanced), Orange (I owe), Red (they owe me)
- Recent exchange history with dates and values

**Competitive Advantage:** NO other platform (Angi, Jobber, Porch) has contractor-to-contractor reciprocity tracking.

**Justification:** Inspired by BNI's offline manual tracking system ($500-800/year membership validates demand).

### 2. Broadcast Lead Mode

**Problem:** Urgent jobs need fast response, but selecting one contractor risks slow reply.

**Solution:** Send lead to top 3 contractors simultaneously - first to accept wins.

**Competitive Advantage:** Novel feature (Uber/Lyft dispatch model applied to contractor referrals).

### 3. White-Label Architecture

**Problem:** Associations demand their branding (logo, colors) to maintain authority.

**Solution:** CSS custom properties allow runtime color swapping:

```css
[data-tenant="texas-phcc"] {
  --color-primary-500: #C8102E; /* Their brand red */
}
```

**Business Impact:** Enables 10-20x pricing premium ($50K-100K/year vs $5K for generic SaaS).

**Justification:** Porch's multi-brand positioning (ISN, HireAHelper) validated this approach.

---

## 📱 Mobile-First Responsive Design

### Breakpoints

```css
Mobile:     320px - 767px
Tablet:     768px - 1023px
Desktop:    1024px - 1439px
Large:      1440px+
```

### Key Mobile Patterns

1. **Touch Targets:** Minimum 44px × 44px (iOS guideline)
2. **Sticky CTAs:** Primary actions fixed to bottom of screen
3. **Swipe Gestures:** Swipe left on contractor card for quick "Send Lead"
4. **Bottom Sheet Filters:** Replace sidebar filters on mobile
5. **Card Stacking:** Grid layouts become single column

**Justification:** Miguel (contractor persona) works from truck 80% of day - mobile is not optional.

---

## 🔒 Trust-Building Design Elements

### From Competitive Analysis (Angi + Porch)

1. **Verification Badges**
   - "Verified Member" (PHCC membership confirmed)
   - "Licensed" (State license verified)
   - "Insured" (Insurance certificate on file)

2. **Response Time Indicators**
   - "Responds within 1.2 hours"
   - Better than X% of network

3. **Conversion Rate Metrics**
   - "82% of received leads converted to jobs"
   - Builds confidence in referral quality

4. **Reciprocity Balance**
   - Visual fairness indicator
   - Reduces skepticism about one-sided relationships

5. **Association Tenure**
   - "Member since 2018 (7 years)"
   - Establishes credibility

---

## 🛠️ Developer Handoff

### Tech Stack Alignment

**Frontend:**
- React 18+ with TailwindCSS
- Import `design-tokens.css` as base layer
- Use token variables throughout components

**Backend:**
- Supabase (PostgreSQL with RLS for multi-tenancy)
- Design supports real-time status updates
- Row-level security aligns with white-label architecture

**Hosting:**
- Vercel (frontend)
- Cloudflare (custom domains for associations)

### Implementation Priority

**Week 1-2: Foundation**
- [ ] Set up design token system with white-label support
- [ ] Implement header/navigation components
- [ ] Build button, card, badge components
- [ ] Create form input components

**Week 3-4: Core Screens**
- [ ] Association Admin Dashboard
  - Metric cards with trend indicators
  - Network activity graph (Chart.js or Recharts)
  - Member leaderboards
- [ ] Contractor Network Directory
  - Search/filter functionality
  - Contractor card grid
  - Pagination component

**Week 5-6: Lead Sharing**
- [ ] Multi-step lead sharing form
- [ ] Contractor selection (single + broadcast mode)
- [ ] Review and confirmation page
- [ ] SMS/Email notification triggers

**Week 7-8: Profiles & Polish**
- [ ] Contractor profile pages
- [ ] Reciprocity tracking visualization
- [ ] Responsive mobile optimization
- [ ] Loading/empty/error states

### Code Examples

**Using Design Tokens:**
```jsx
// Button component using tokens
<button
  className="btn btn-primary"
  style={{
    backgroundColor: 'var(--color-primary-500)',
    padding: 'var(--spacing-button-padding-y) var(--spacing-button-padding-x)',
    borderRadius: 'var(--button-border-radius)'
  }}
>
  Send Lead
</button>
```

**White-Label Implementation:**
```jsx
// Set tenant-specific colors
<div data-tenant="texas-phcc">
  {/* All primary colors now use Texas PHCC red */}
</div>
```

---

## 📊 Design Validation & Testing

### Success Metrics

**User Experience:**
1. **Time to share first lead:** Target <3 minutes (current informal: 35 minutes)
2. **Profile completion rate:** Target 60% within 30 days
3. **Mobile usage rate:** Expect 70%+ (field workers)
4. **Admin dashboard time:** Target 2-3 minutes (board prep)

**Business Impact:**
1. **Lead sharing rate:** Target 2.5 leads/contractor/month
2. **Association activation:** 60% of members create profiles
3. **Reciprocity balance:** 80% of active contractors maintain 0.8-1.2 ratio

### Recommended A/B Tests

1. **Reciprocity Visualization:**
   - A: Horizontal bar chart
   - B: Balance scale icon

2. **Lead Card Layout:**
   - A: Horizontal layout (current)
   - B: Vertical layout

3. **CTA Button Copy:**
   - A: "Send Lead"
   - B: "Share Lead"
   - C: "Refer Lead"

---

## 📁 File Structure

```
/contractor-app-style-guide/
├── README.md (this file)
├── design-tokens.css (complete token system)
├── /research/
│   ├── competitive-analysis.md (5 competitors analyzed)
│   └── design-decisions.md (every decision justified)
├── /wireframes/
│   ├── wireframes.css (low-fidelity styles)
│   ├── 01-association-admin-dashboard.html
│   ├── 02-contractor-network-directory.html
│   ├── 03-lead-sharing-flow.html
│   └── 04-contractor-profile.html
├── /mockups/
│   └── styles.css (production-ready component styles)
├── /components/ (pending - Phase 2)
└── /assets/ (placeholder images - Phase 2)
```

---

## ⏭️ Next Steps

### Immediate (This Week)

1. **Review Session** with Product Manager and Lead Developer
   - Walk through design decisions document
   - Validate technical feasibility
   - Prioritize feature implementation order

2. **Stakeholder Review** with association partner (pilot)
   - Show wireframes and mockups
   - Validate white-label approach
   - Get feedback on admin dashboard metrics

### Short-Term (Weeks 1-2)

1. **Convert to Interactive Prototype**
   - Use Figma or React Storybook
   - Add click-through interactions
   - Test with 5 contractors + 2 admins

2. **Begin Development**
   - Set up design token system
   - Implement core components
   - Build admin dashboard (highest value screen)

### Medium-Term (Months 2-3)

1. **Build Remaining Screens**
   - Empty states (no leads yet, no members)
   - Error states (404, 500, permission denied)
   - Loading states (skeleton screens)
   - Onboarding flow (first-time user)

2. **Email Templates**
   - Lead notification emails
   - Weekly digest emails
   - Commission reminder emails

---

## 🎓 Design System Usage

### For Designers

**Adding New Components:**
1. Use existing design tokens (never hardcode colors/spacing)
2. Document decision in design-decisions.md
3. Provide competitive precedent if novel pattern
4. Create both mobile and desktop variants

**Customizing for Associations:**
1. Only modify primary/secondary colors
2. Swap logo in header
3. All other tokens remain consistent

### For Developers

**Implementing Components:**
1. Reference `design-tokens.css` for all values
2. Use token variables, not raw values
3. Follow BEM or similar naming convention
4. Ensure mobile-responsive (test at 375px)

**White-Label Deployments:**
1. Add `data-tenant` attribute to root element
2. Override CSS custom properties for colors
3. Serve association logo from CDN
4. Update email templates with association branding

---

## 📞 Questions & Support

### Design Decisions

**Q: Why blue instead of orange (Angi)?**
**A:** Blue conveys professionalism for B2B buyers (association directors). Orange is consumer-focused.

**Q: Why Inter font instead of Sofia Pro (Jobber)?**
**A:** Inter is open-source (no licensing costs), optimized for UI, single family handles headings and body.

**Q: Why 8px spacing instead of 4px or 10px?**
**A:** Universal SaaS standard (Jobber, ServiceTitan, Porch). Aligns with design tooling (Figma 8px grid).

**Q: Why sidebar nav for admin instead of top nav?**
**A:** Admins have many sections (members, leads, billing, settings). Sidebar provides persistent access like Buildertrend/Jobber.

### Technical Implementation

**Q: How do I implement white-label colors?**
**A:** Add `data-tenant="texas-phcc"` to root, override CSS custom properties.

**Q: Which component library should I use?**
**A:** Build custom using our design tokens. If needed: Radix UI (headless) + our styles.

**Q: How to handle real-time updates (lead status)?**
**A:** Supabase Realtime subscriptions. Design already supports dynamic badge updates.

---

## ✅ Design System Status

| Component | Status | Priority | Notes |
|-----------|--------|----------|-------|
| Design Tokens | ✅ Complete | P0 | White-label ready |
| Wireframes (4 screens) | ✅ Complete | P0 | Semantic HTML |
| Component Styles | ✅ Complete | P0 | Production CSS |
| Competitive Analysis | ✅ Complete | P0 | 5 competitors |
| Design Decisions | ✅ Complete | P0 | Fully documented |
| High-Fidelity Mockups | 🟡 Partial | P1 | Styles ready, need HTML |
| Component Library | ⚪ Pending | P1 | 8 components planned |
| Interactive Style Guide | ⚪ Pending | P1 | HTML documentation |
| Empty/Error States | ⚪ Pending | P2 | Future iteration |
| Email Templates | ⚪ Pending | P2 | Sendgrid integration |
| Onboarding Flow | ⚪ Pending | P2 | First-time UX |

---

## 📜 Version History

**v1.0 (2025-11-23)** - Initial Design System
- Complete competitive analysis (Angi, Jobber, Buildertrend, Porch, ServiceTitan)
- Design tokens system with white-label support
- 4 key screen wireframes (admin dashboard, network directory, lead sharing, contractor profile)
- Production-ready component styles
- Comprehensive design decisions documentation

**Next:** v1.1 - Interactive prototype + user testing

---

## 👥 Credits

**Design System Created By:** UX/UI Researcher & Designer Agent
**Based On Research From:** Plan.md (Product Manager) + reporte-validacion.md (Validator)
**Competitive Analysis:** Angi, Jobber, Buildertrend, Porch, ServiceTitan
**Methodology:** Google Ventures Design Sprint + Atomic Design

---

**Last Updated:** 2025-11-23
**Status:** ✅ Ready for Developer Handoff
**Approvals Pending:** Product Manager, Lead Developer, Association Stakeholder
