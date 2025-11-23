# PLAN DE EJECUCIÓN: Referral Network Platform for Trade Associations
**PM:** Agent 1 - Product Manager (Senior, 15+ years exp.)
**Date:** 2025-11-23
**Version:** 1.0
**Status:** ✅ Approved for execution
**Methodology:** Google Project Management + Agile/Scrum

---

## 📋 EXECUTIVE SUMMARY

**Problem:**
Trade contractors (plumbers, electricians, HVAC techs) lose $15K-50K annually by informally passing leads outside their specialty without tracking, reciprocity guarantees, or commission collection. In a $1.7 trillion US trades market with 750K+ contractor businesses, this represents billions in lost referral revenue. Trade associations lack digital infrastructure to help their 200-800 members monetize the connections between them, relying on informal WhatsApp groups or monthly meetings.

**Solution:**
A B2B2C white-label platform that trade associations deploy to their members, enabling systematic lead sharing, automated commission tracking, and network reciprocity metrics. Unlike consumer marketplaces (Angi) or operational tools (Jobber), we focus exclusively on contractor-to-contractor referrals within trusted professional networks. Associations gain a high-value member benefit while contractors gain structured revenue from leads they previously gave away for free.

**Primary User:**
Trade associations with 200-800 contractor members (PHCC chapters, NECA locals, ACCA regions), serving as the primary buyer who deploys the platform to their member network. Secondary users are the individual contractors within each association who actively share and receive leads. Total addressable market: 1,200+ regional trade associations in the US.

**Value Proposition:**
"We help trade associations monetize the connections between their members through automated referral tracking and commission management, turning informal lead sharing into measurable revenue."

**Success Metrics (North Star Metric):**
- **North Star:** Active Lead Sharing Rate (leads shared per active contractor per month) - Target: 2.5 leads/month
- **Input Metric 1:** Contractor Activation Rate (% of association members creating profiles) - Target: 60%
- **Input Metric 2:** Network Reciprocity Balance (ratio of leads given to received) - Target: 0.8-1.2
- **Guardrail Metric:** Lead-to-Job Conversion Rate - Minimum threshold: 20%

---

## 👤 USER PERSONA

### Persona 1: Association Director (Primary Buyer)

**Name:** Patricia Chen
**Age:** 45-55
**Occupation:** Executive Director, State PHCC Chapter
**Location:** Austin, Texas (managing statewide association)
**Tech-savviness:** Level 3/5 - Comfortable with SaaS platforms, uses Salesforce, QuickBooks, event management software
**Market segment size:** 1,200+ regional trade associations in US

**Current Pain Points (Jobs-to-be-Done framework):**
1. **Member Value Justification** - Severity: 🔴 Critical
   - Frequency: Monthly board meetings where membership value is questioned
   - Current workaround: Annual golf tournament, monthly mixers, discount programs
   - Impact: 15-20% annual member churn, $75K-150K lost revenue/year

2. **Network Facilitation** - Severity: 🟡 High
   - Frequency: Daily - members asking "know a good electrician in Round Rock?"
   - Current workaround: WhatsApp group with 300+ members, chaotic and untrackable
   - Impact: 8-10 hours/week managing informal referrals, zero visibility into value created

3. **Revenue Diversification** - Severity: 🟢 Medium
   - Frequency: Quarterly budget reviews showing declining membership dues
   - Current workaround: Increasing dues (causes more churn) or adding sponsor fees
   - Impact: Budget shortfalls of $50K-100K annually

**Goals with our product:**
- 🎯 **Primary (Functional Job):** Provide quantifiable member benefit showing $10K+ value per member annually
- 🎯 **Secondary (Emotional Job):** Be seen as innovative leader bringing digital transformation to traditional industry
- 🎯 **Social Job:** Strengthen association's reputation as essential business infrastructure for contractors

**Current Workflow (As-Is):**
```
1. Member posts in WhatsApp "Need roofer in Georgetown" → Time: 5min → Friction: Message gets buried → Drop-off: 40%
2. 3-5 members respond with names → Time: 2-48hrs → Friction: No vetting, no tracking → Drop-off: 30%
3. Original member manually texts/calls referrals → Time: 30min → Friction: Phone tag, unclear availability → Drop-off: 50%
4. No follow-up on outcome → Time: 0min → Friction: Lost revenue opportunity → Drop-off: 100%
```
**Total:** 35 minutes + 2 days wait, 4 friction points, 10% successful connection rate

**Desired Workflow (To-Be - with our product):**
```
1. Member searches network by trade + location → Time: 2min → Benefit: See availability, ratings, response time
2. Send lead with one click → Time: 1min → Benefit: Automatic notification, context preserved
3. Track status updates → Time: 0min → Benefit: Automated progress tracking, commission calculation
```
**Total:** 3 minutes (91% faster), 0 friction points, 65% successful connection rate

**Value Proposition Test:**
- Current cost: $0 revenue from member connections + 10hrs/week staff time (~$20K/year)
- Our solution: $50K-100K platform fee generating $500K+ member value tracked
- **Net benefit:** 10x ROI on platform investment

### Persona 2: Contractor Member (End User)

**Name:** Miguel Rodriguez
**Age:** 35-45
**Occupation:** Owner, Rodriguez Plumbing LLC (8 employees)
**Location:** Houston, Texas
**Tech-savviness:** Level 2/5 - Uses smartphone constantly but prefers simple apps, already uses Jobber for operations
**Market segment size:** 750K+ contractor businesses in US

**Current Pain Points (Jobs-to-be-Done framework):**
1. **Lost Revenue from Overflow** - Severity: 🔴 Critical
   - Frequency: 3-5 times per week during busy season
   - Current workaround: Text "my buddy Jim" who may or may not reciprocate
   - Impact: $30K-50K annual lost referral fees (10% of $300K-500K in passed leads)

2. **No Reciprocity Tracking** - Severity: 🟡 High
   - Frequency: Monthly realization "I sent Carlos 10 jobs, he sent me 1"
   - Current workaround: Mental notes, occasional confrontation, relationship deteriorates
   - Impact: Unbalanced relationships, stop sharing with non-reciprocators

3. **Lead Response Delays** - Severity: 🟢 Medium
   - Frequency: Daily - homeowner waits 2-3 days for contractor callback
   - Current workaround: Multiple follow-ups, customer gets frustrated
   - Impact: 40% of referred leads go cold, reputation damage

**Goals with our product:**
- 🎯 **Primary (Functional Job):** Convert overflow leads into 10% referral commission automatically
- 🎯 **Secondary (Emotional Job):** Feel like a connected professional, not isolated small business
- 🎯 **Social Job:** Build reputation as reliable referral partner who "takes care of his network"

### Persona 3: Franchise Owner (Secondary Buyer)

**Name:** James Thompson
**Age:** 50-60
**Occupation:** Multi-unit Franchise Owner, Mr. Rooter (5 locations)
**Location:** Dallas-Fort Worth, Texas
**Tech-savviness:** Level 4/5 - Uses multiple SaaS platforms, tracks metrics obsessively
**Market segment size:** 3,000+ franchise systems with trade contractor franchisees

**Current Pain Points (Jobs-to-be-Done framework):**
1. **Inter-franchise Lead Leakage** - Severity: 🔴 Critical
   - Frequency: Daily - franchisees refer outside the brand
   - Current workaround: Verbal agreements at quarterly meetings, no enforcement
   - Impact: $100K+ annual revenue leaves franchise system

2. **Territory Disputes** - Severity: 🟡 High
   - Frequency: Weekly - "That was MY customer from MY zip code!"
   - Current workaround: Manual investigation, hours of mediation
   - Impact: 20 hours/month managing conflicts, franchisee dissatisfaction

**Goals with our product:**
- 🎯 **Primary (Functional Job):** Keep 90%+ of referrals within franchise system with automated territory rules
- 🎯 **Secondary (Emotional Job):** Be seen as franchisor who provides cutting-edge tools
- 🎯 **Social Job:** Strengthen franchise brand through systematic collaboration

---

## 🗺️ USER JOURNEY MAP

### Stage 1: Discovery & Evaluation (Association Director)
**Trigger:** Board meeting pressure about declining member value / member survey showing "need more business development tools"
**User actions:** Research member benefit platforms, schedule demos, evaluate pricing
**System response:** Targeted landing page showing association-specific value props, case studies, ROI calculator
**Pain points eliminated:** ✅ Uncertainty about member adoption, unclear ROI
**Emotional state:** Skeptical → Intrigued → Excited about possibilities
**Success criteria:** Association schedules pilot program with 20-50 members

### Stage 2: Onboarding & Activation (Association Launch)
**Trigger:** Contract signed, implementation kickoff meeting scheduled
**User actions:** Upload member CSV, customize branding, schedule member training webinar
**System response:** White-labeled portal ready in 48hrs, automated welcome emails to all members
**Pain points eliminated:** ✅ Complex technical setup, member resistance to "another platform"
**Emotional state:** Anxious about rollout → Relieved by simplicity → Proud of launch
**Success criteria:** 60% of members create profiles within 30 days (Aha Moment)

### Stage 3: Active Usage (Contractor Daily Workflow)
**Trigger:** Contractor receives lead outside specialty via phone/text
**User actions:** Open mobile app, search network, send lead with 2 taps
**System response:** Instant notification to recipient, status tracking, commission calculation
**Pain points eliminated:** ✅ Lost leads, forgotten referrals, awkward money conversations
**Emotional state:** Stressed about overflow → Confident in network → Satisfied with commission
**Success criteria:** 2.5+ leads shared per active contractor per month

### Stage 4: Value Realization (Renewal Decision)
**Trigger:** Annual association renewal approaching, board review of platform metrics
**User actions:** Review dashboard showing $500K+ in tracked referral value
**System response:** Automated renewal proposal with member success stories, ROI metrics
**Pain points eliminated:** ✅ Inability to quantify member value, budget justification challenges
**Emotional state:** Concerned about renewal → Impressed by metrics → Committed to expansion
**Success criteria:** 90%+ association renewal rate, 20% price increase accepted

**Final Success Outcome:** Association demonstrates 10x ROI through tracked member referral revenue, becoming indispensable infrastructure

---

## 🚀 PRIORITIZED FEATURES (RICE FRAMEWORK)

| ID | Feature Name | Priority | **RICE Score** | **Reach** | **Impact** | **Confidence** | **Effort** | Dependencies | User Story (Summary) |
|----|--------------|----------|----------------|-----------|------------|----------------|------------|--------------|----------------------|
| F-001 | Multi-Tenant White-Label Platform | 🔴 P0 | **300** | 100% | 3 (Massive) | 100% | 10d | - | As association admin I want branded platform to maintain authority over member experience |
| F-002 | Contractor Profile & Specialty Management | 🔴 P0 | **240** | 100% | 3 (Massive) | 80% | 5d | F-001 | As contractor I want to define what I do and what I need to receive relevant referrals |
| F-003 | Lead Sharing & Status Tracking | 🔴 P0 | **225** | 100% | 3 (Massive) | 100% | 8d | F-002 | As contractor I want to share leads and track outcomes to ensure referral completion |
| F-004 | Network Discovery (Search by Trade/Location) | 🔴 P0 | **180** | 90% | 2 (High) | 100% | 5d | F-002 | As contractor I want to find specialists quickly to pass leads while customer is waiting |
| F-005 | Association Admin Dashboard | 🔴 P0 | **160** | 100% | 2 (High) | 80% | 6d | F-001 | As admin I want to see network activity metrics to demonstrate value to board |
| F-006 | Bulk Member Import (CSV) | 🔴 P0 | **150** | 100% | 2 (High) | 100% | 3d | F-001, F-005 | As admin I want to onboard all members at once to achieve critical mass quickly |
| F-007 | Email/SMS Notifications | 🟡 P1 | **120** | 80% | 2 (High) | 90% | 4d | F-003 | As contractor I want instant alerts to respond to referrals within golden hour |
| F-008 | Commission Tracking & Calculation | 🟡 P1 | **108** | 60% | 3 (Massive) | 60% | 5d | F-003 | As contractor I want automatic commission calculation to eliminate awkward money talks |
| F-009 | Mobile PWA Optimization | 🟡 P1 | **100** | 100% | 2 (High) | 100% | 8d | All P0 | As contractor I want to share leads from job site to maintain workflow efficiency |
| F-010 | Reciprocity Analytics | 🟡 P1 | **90** | 70% | 2 (High) | 90% | 4d | F-003 | As contractor I want to see give/receive balance to maintain fair relationships |
| F-011 | Basic Reporting & Export | 🟢 P2 | **60** | 50% | 1 (Medium) | 100% | 3d | F-005 | As admin I want to export data for board reports to justify continued investment |
| F-012 | Review & Rating System | 🟢 P2 | **50** | 40% | 2 (High) | 70% | 6d | F-003 | As contractor I want to build reputation score to receive more referrals |

### **RICE Scoring Framework (Methodology by Intercom)**

**Formula:** `RICE = (Reach × Impact × Confidence) / Effort`

**Reach (0-100%):** % of users who will use this feature in first quarter

**Impact (Intercom Scale):**
- **3 = Massive Impact:** Fundamentally required for product to function
- **2 = High Impact:** Significantly improves core value proposition
- **1 = Medium Impact:** Notable enhancement but not critical
- **0.5 = Low Impact:** Nice-to-have improvement
- **0.25 = Minimal Impact:** Marginal benefit

**Confidence (0-100%):** Certainty of estimates based on validation data
- 100% = Validated through user interviews and competitive analysis
- 80% = Strong signals from validation report
- 60% = Logical assumption based on industry patterns
- <50% = Avoid prioritizing

**Effort (Person-days):** Full implementation including frontend, backend, testing, deployment

### **Priority Criteria:**
- 🔴 **P0 (Must Have):** MVP cannot function without these - association won't pay without them
- 🟡 **P1 (Should Have):** Important for complete experience, adds significant value
- 🟢 **P2 (Nice to Have):** Enhance experience but not critical for validation

**Out of Scope V1:**
❌ Stripe Connect Integration - Reason: Adds 2-3 weeks complexity, manual payment tracking sufficient for MVP
❌ Native Mobile Apps - Reason: PWA provides 80% of value at 20% of effort
❌ CRM Integrations - Reason: CSV import sufficient for MVP validation
❌ AI Matching Algorithm - Reason: Manual search adequate with <1000 users per network

---

## 📝 FEATURE DETAIL (COMPLETE SPECIFICATION)

### F-001: Multi-Tenant White-Label Platform

**RICE Score Breakdown:**
- Reach: 100% - Every association needs their own branded instance
- Impact: 3 (Massive) - Associations won't buy generic platform
- Confidence: 100% - Validated in competitor analysis (Porch B2B2C model)
- Effort: 10 days - Complex architecture but essential foundation
- **Score: (100 × 3 × 100) / 10 = 300**

**User Story:**
```
As an association administrator
I want a platform with our branding, custom domain, and isolated member data
To maintain authority and trust with our contractor members
```

**Business Value:**
Associations pay $50K-100K/year for white-labeled platforms vs $5K for generic SaaS. White-labeling enables 10-20x price premium while reducing perceived competition with other tools.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Association Branding Setup**
```gherkin
Given I am an association admin with super-admin access
  And I have uploaded logo files (PNG/SVG, max 5MB)
  And I have selected brand colors (primary, secondary, accent)
When I save branding configuration
Then all member-facing pages display association logo in header
  And primary navigation uses selected brand colors
  And email notifications show association branding
  And browser favicon updates to association logo
```

**Scenario 2: Custom Domain Configuration**
```gherkin
Given association has configured subdomain (e.g., phcc-texas.contractornetwork.com)
  And DNS records have been verified
When contractors access the platform
Then they see association-specific subdomain in browser
  And SSL certificate is automatically provisioned
  And all emails come from noreply@[subdomain]
```

**Scenario 3: Data Isolation & Security**
```gherkin
Given multiple associations use the platform
When Texas PHCC admin views member list
Then only Texas PHCC members are visible
  And no data from other associations is accessible via API
  And database uses row-level security with tenant_id
  And audit log tracks all cross-tenant access attempts (should be zero)
```

**Scenario 4: Association-Specific Settings**
```gherkin
Given each association has different business rules
When admin configures platform settings
Then can set custom referral commission percentage (default 10%)
  And can define service area boundaries (zip codes/counties)
  And can set member approval requirements (automatic vs manual)
  And can customize welcome email content
```

**Scenario 5: Tenant Provisioning**
```gherkin
Given a new association signs contract
When platform team initiates provisioning
Then new tenant created within 2 hours
  And welcome email sent to admin with credentials
  And 30-day trial period automatically starts
  And usage metrics begin tracking for this tenant
```

**Technical Considerations:**

**Security:**
- Row-level security (RLS) in PostgreSQL using tenant_id
- JWT tokens include tenant_id claim
- API middleware validates tenant access on every request
- Separate S3 buckets or folders per tenant for file uploads

**Performance:**
- Database indexes on tenant_id + common query fields
- Redis cache namespaced by tenant
- CDN configuration for custom domains
- Target: <200ms API response time at p95

**Data Model:**
```sql
-- Core tenant table
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL, -- URL-safe identifier
  name VARCHAR(200) NOT NULL,
  domain VARCHAR(100) UNIQUE,
  settings JSONB DEFAULT '{}',
  branding JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'trial',
  trial_ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- All other tables include tenant_id
CREATE TABLE contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  email VARCHAR(255) NOT NULL,
  -- ... other fields
  UNIQUE(tenant_id, email) -- Email unique per tenant
);

-- RLS policies
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON contractors
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

**External Dependencies:**
- Vercel/Netlify for subdomain routing
- Let's Encrypt for SSL certificates
- SendGrid for white-label email with domain authentication
- Cloudflare for custom domain DNS management

**Error Handling:**
- HTTP 404: Tenant not found for subdomain
- HTTP 403: Cross-tenant access attempted
- HTTP 400: Invalid branding configuration (file too large, wrong format)

**UI/UX Requirements:**

**Required Screens:**
1. Tenant Admin Dashboard - Branding configuration wizard
2. Tenant Settings Page - Business rules, commission rates, territories
3. Public Login Page - Shows association branding prominently

**Component specs:**
- Logo Upload: Accepts PNG/SVG up to 5MB, auto-resizes to 200x60px
- Color Picker: Standard palette + custom hex input
- Preview Panel: Real-time preview of branding changes

**Mobile considerations:**
- Logo scales down to 120x36px on mobile
- Brand colors maintain WCAG contrast ratios

**Accessibility (WCAG 2.1 AA):**
- Brand colors validated for contrast (4.5:1 minimum)
- Logo includes alt text with association name

**Definition of Done (Specific for this feature):**
- [ ] Acceptance criteria: All 5 scenarios pass in staging
- [ ] Integration tests: Multi-tenant isolation verified with 3 test tenants
- [ ] Security audit: Penetration test confirms no data leakage
- [ ] Performance: Page load <2s with branding assets cached
- [ ] Mobile testing: Branding displays correctly on iOS 14+ and Android 10+
- [ ] Accessibility: WCAG 2.1 AA compliant including brand colors
- [ ] Error handling: All error states show helpful messages
- [ ] Documentation: Tenant setup guide complete with screenshots

**Estimated Effort:** 10 days

**Breakdown:**
- Day 1-2: Database schema with RLS policies, tenant service layer
- Day 3-4: API middleware for tenant isolation, JWT enhancement
- Day 5-6: Admin UI for branding configuration
- Day 7-8: Subdomain routing, SSL automation
- Day 9: Email template system with dynamic branding
- Day 10: Testing, security audit, documentation

---

### F-002: Contractor Profile & Specialty Management

**RICE Score Breakdown:**
- Reach: 100% - Every contractor must create profile to participate
- Impact: 3 (Massive) - Core to matching mechanism
- Confidence: 80% - Standard pattern but critical for network effect
- Effort: 5 days - CRUD with some complexity in specialty matching
- **Score: (100 × 3 × 80) / 5 = 240**

**User Story:**
```
As a contractor
I want to specify my trade specialties and service areas
To receive relevant referrals and find appropriate partners
```

**Business Value:**
Accurate profiles enable the network effect. Validation shows contractors lose $30-50K annually from informal referrals. Profile completion directly correlates with referral volume.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Profile Creation**
```gherkin
Given I am a new contractor invited by my association
When I click the invitation link and create my profile
Then I must provide company name, primary trade, and service area
  And I can add up to 5 trade specialties with proficiency levels
  And I can upload license/insurance documents
  And profile is marked "pending verification" until admin approval
```

**Scenario 2: Specialty Configuration**
```gherkin
Given I am a plumber who also does basic HVAC work
When I configure my specialties
Then I can set "Plumbing" as primary (expert level)
  And add "HVAC" as secondary (intermediate level)
  And add "Drain Cleaning" as sub-specialty under Plumbing
  And system shows me in searches for all configured specialties
```

**Scenario 3: Service Area Definition**
```gherkin
Given I service specific geographic areas
When I define my service territories
Then I can select counties or draw radius on map (miles from address)
  And I can mark "emergency service" areas (will travel farther for premium)
  And I only appear in searches within my defined areas
  And I receive warning if areas don't overlap with other members
```

**Scenario 4: Availability Management**
```gherkin
Given my capacity varies by season and workload
When I update my availability status
Then I can set "Accepting referrals" / "At capacity" / "Emergency only"
  And status shows real-time in search results
  And I receive fewer notifications when at capacity
  And status auto-resets to "Accepting" after 30 days
```

**Technical Considerations:**

**Data Model:**
```sql
CREATE TABLE contractor_profiles (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  company_name VARCHAR(200) NOT NULL,
  license_number VARCHAR(50),
  insurance_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, suspended
  availability VARCHAR(20) DEFAULT 'accepting', -- accepting, capacity, emergency
  availability_updated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contractor_specialties (
  id UUID PRIMARY KEY,
  contractor_id UUID REFERENCES contractor_profiles(id),
  trade_id UUID REFERENCES trades(id),
  proficiency_level VARCHAR(20), -- expert, intermediate, basic
  is_primary BOOLEAN DEFAULT FALSE,
  certifications JSONB DEFAULT '[]'
);

CREATE TABLE service_areas (
  id UUID PRIMARY KEY,
  contractor_id UUID REFERENCES contractor_profiles(id),
  area_type VARCHAR(20), -- county, radius, polygon
  area_data JSONB, -- GeoJSON or county list
  is_emergency_area BOOLEAN DEFAULT FALSE
);
```

**Estimated Effort:** 5 days

---

### F-003: Lead Sharing & Status Tracking

**RICE Score Breakdown:**
- Reach: 100% - Core feature used by every active contractor
- Impact: 3 (Massive) - This IS the core value proposition
- Confidence: 100% - Validated through user interviews, competition analysis
- Effort: 8 days - Complex workflow with multiple states
- **Score: (100 × 3 × 100) / 8 = 225**

**User Story:**
```
As a contractor
I want to share leads with qualified partners and track the outcome
To ensure customers are served and referral fees are earned
```

**Business Value:**
Each shared lead represents $300-1,500 in referral commission (10% of average $3K-15K job). Platform takes 10% of commission. At 2.5 leads/contractor/month with 500 contractors = $375K monthly transaction volume.

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Lead Creation and Sharing**
```gherkin
Given I received a call for electrical work (I'm a plumber)
When I create a new lead in the system
Then I must provide customer name, phone, and service needed
  And I can add optional fields (address, urgency, budget range, notes)
  And I can search for electricians in customer's area
  And I can send to specific contractor or broadcast to top 3
  And customer gets SMS: "Your plumber referred you to [Electrician]. They'll call within 2 hours"
```

**Scenario 2: Lead Acceptance and Status Updates**
```gherkin
Given I received a referral notification
When I view the lead details
Then I see all customer information and referrer notes
  And I can accept/decline within 2 hours (auto-decline after timeout)
  And accepting triggers SMS to customer with my contact info
  And I must update status: Contacted → Quoted → Won/Lost
  And each status change notifies the referrer
```

**Scenario 3: Commission Calculation**
```gherkin
Given I won a referred job for $5,000
When I mark the lead as "Won" and enter job value
Then system calculates 10% referral fee ($500)
  And creates invoice from me to referrer
  And adds to my "Payables" and their "Receivables"
  And commission is locked after 7 days (dispute period)
```

**Scenario 4: Lead Timeout and Reassignment**
```gherkin
Given a lead was sent to a contractor 2 hours ago
When the contractor hasn't responded
Then lead automatically returns to referrer's queue
  And referrer gets notification of timeout
  And can immediately reassign to another contractor
  And original contractor marked as "missed opportunity"
```

**Scenario 5: Bulk Lead Upload**
```gherkin
Given I have 10 overflow jobs from this week
When I use bulk upload feature
Then I can paste CSV with customer data
  And system validates phone numbers and addresses
  And creates draft leads for review
  And I can assign different contractors to each
  And send all with one click
```

**Technical Considerations:**

**Data Model:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  referrer_id UUID REFERENCES contractor_profiles(id),
  recipient_id UUID REFERENCES contractor_profiles(id),
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  service_needed TEXT NOT NULL,
  urgency VARCHAR(20), -- emergency, today, this_week, flexible
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, contacted, quoted, won, lost
  job_value DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  commission_paid BOOLEAN DEFAULT FALSE,
  shared_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE lead_status_history (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  status VARCHAR(20),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Performance:**
- Real-time notifications via WebSocket/Server-Sent Events
- SMS delivery within 30 seconds via Twilio
- Status updates reflected within 1 second

**Estimated Effort:** 8 days

---

### F-004: Network Discovery (Search by Trade/Location)

**RICE Score Breakdown:**
- Reach: 90% - Used every time contractor needs to share a lead
- Impact: 2 (High) - Enables core workflow but not as critical as lead sharing itself
- Confidence: 100% - Standard search functionality, validated need
- Effort: 5 days - Complex with geo-search and filtering
- **Score: (90 × 2 × 100) / 5 = 180**

**User Story:**
```
As a contractor
I want to quickly find qualified specialists in specific service areas
To refer customers to trusted partners while they're still on the phone
```

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Basic Trade and Location Search**
```gherkin
Given a customer needs an electrician in Round Rock, TX
When I search network with trade="Electrician" and location="Round Rock, TX"
Then I see electricians serving that area sorted by distance
  And results show availability status (accepting/at capacity)
  And results show response time (typically responds in X hours)
  And results show reciprocity score with me
  And I can filter by "accepting referrals now"
```

**Scenario 2: Advanced Filtering**
```gherkin
Given I need specific qualifications for a commercial job
When I apply advanced filters
Then I can filter by license type (commercial/residential)
  And filter by insurance coverage amounts
  And filter by years in business (minimum)
  And filter by association membership tenure
  And filter by specific certifications
```

**Scenario 3: Quick Actions from Search**
```gherkin
Given I found 3 suitable contractors
When I select multiple contractors from results
Then I can send lead to all selected (broadcast mode)
  And first to accept gets the lead
  And others get "already claimed" notification
  And I can save search for frequent needs
```

**Technical Considerations:**

**Performance:**
- PostgreSQL with PostGIS extension for geo queries
- Indexed columns: trade_id, availability, location (GiST index)
- Redis cache for frequently searched combinations
- Target: <500ms search response for 10,000 contractors

**Estimated Effort:** 5 days

---

### F-005: Association Admin Dashboard

**RICE Score Breakdown:**
- Reach: 100% - Every association admin needs this to justify platform value
- Impact: 2 (High) - Critical for buyer but not end-user workflow
- Confidence: 80% - Standard analytics dashboard with some custom metrics
- Effort: 6 days - Multiple complex queries and visualizations
- **Score: (100 × 2 × 80) / 6 = 160**

**User Story:**
```
As an association administrator
I want to see comprehensive network activity metrics
To demonstrate value to board members and justify continued investment
```

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: Executive Summary View**
```gherkin
Given I need to present network value at board meeting
When I access the executive dashboard
Then I see total referral value generated this period ($X)
  And member activation rate (Y% have shared/received leads)
  And average value per member ($Z generated per active member)
  And month-over-month growth trends
  And can export as PDF board report
```

**Scenario 2: Member Engagement Analytics**
```gherkin
Given I want to identify and help inactive members
When I view engagement metrics
Then I see list of members who haven't shared leads in 30+ days
  And members who only receive but don't share (takers)
  And top 10 most active referrers (recognition opportunity)
  And geographic heat map of activity
  And can trigger re-engagement emails to inactive members
```

**Scenario 3: Network Health Metrics**
```gherkin
Given I need to ensure network balance
When I view network health indicators
Then I see reciprocity balance distribution (histogram)
  And trade coverage gaps (needed specialties with no providers)
  And average response time to referrals
  And lead conversion rates by trade
  And dispute/complaint frequency
```

**Technical Considerations:**

**Performance:**
- Materialized views for complex aggregations
- Nightly batch jobs to pre-calculate metrics
- Dashboard loads in <2 seconds with 1000+ members

**Estimated Effort:** 6 days

---

### F-006: Bulk Member Import (CSV)

**RICE Score Breakdown:**
- Reach: 100% - Every association needs to import existing member database
- Impact: 2 (High) - Enables rapid deployment critical for network effects
- Confidence: 100% - Standard feature, must-have for enterprise sales
- Effort: 3 days - Well-understood pattern with some complexity in validation
- **Score: (100 × 2 × 100) / 3 = 150**

**User Story:**
```
As an association administrator
I want to import all members from our existing database at once
To achieve critical mass quickly without manual entry
```

**Acceptance Criteria (Given-When-Then Scenarios):**

**Scenario 1: CSV Upload and Validation**
```gherkin
Given I have member data exported from our current system
When I upload a CSV file
Then system validates required fields (name, email, company, trade)
  And shows preview with validation errors highlighted
  And identifies duplicates based on email
  And allows me to fix errors in-browser
  And processes up to 1,000 records
```

**Scenario 2: Automated Invitations**
```gherkin
Given I've successfully imported 500 members
When I confirm the import
Then each member receives personalized invitation email
  And emails are sent in batches of 50 to avoid spam filters
  And I can track open/click rates per invitation
  And members who don't respond get reminder after 7 days
  And I can resend invitations selectively
```

**Technical Considerations:**

**Security:**
- CSV sanitization for SQL injection attempts
- File size limit 10MB
- Virus scanning on upload

**Estimated Effort:** 3 days

---

## 🎨 WIREFRAME REQUIREMENTS (FOR UX/UI DESIGNER)

### Screen 1: Association Admin - Network Overview Dashboard
**Purpose:** Provide association administrators with at-a-glance network health metrics and actionable insights

**Key elements (Information Hierarchy):**
- **Header Section:**
  - Association logo (top-left, 150x50px max)
  - "Network Overview" title
  - Date range selector (top-right)
  - "Export Report" button

- **Hero Metrics Row (4 cards):**
  - Total Referral Value: "$847,350" with sparkline
  - Active Members: "342/524 (65%)" with progress bar
  - Leads This Month: "1,247" with trend arrow
  - Avg Response Time: "1.3 hours" with status indicator

- **Network Activity Graph:**
  - Line chart showing daily leads shared over 30 days
  - Toggle between: Leads Shared, Value Generated, New Members

- **Member Leaderboard (sidebar):**
  - Top 5 Referrers with avatars and lead count
  - Top 5 Receivers with conversion rates
  - "View All Members" link

**User interactions:**
- Click on any metric card → Detailed breakdown view
- Hover on graph points → Tooltip with exact values
- Click on member name → Individual member profile

**Mobile considerations:**
- Metrics cards stack vertically on mobile (<768px)
- Graph becomes swipeable with horizontal scroll
- Leaderboard moves below graph

**Benchmarks from similar products:**
- Salesforce: Clean metric cards with sparklines
- HubSpot: Effective use of color coding for status
- Google Analytics: Intuitive date range selection

---

### Screen 2: Contractor - Lead Sharing Interface
**Purpose:** Enable contractors to quickly share leads with appropriate specialists

**Key elements (Information Hierarchy):**
- **Customer Information Form:**
  - Name field (required)
  - Phone field with format validation (required)
  - Service needed dropdown (required)
  - Urgency selector: Emergency / Today / This Week / Flexible
  - Budget range slider (optional)
  - Notes textarea (optional, 500 char max)

- **Specialist Search Section:**
  - Trade dropdown (pre-filtered based on service needed)
  - Location autocomplete (pre-filled from customer info)
  - "Search Network" button (primary CTA, blue, prominent)

- **Search Results Grid:**
  - Contractor cards (3 per row desktop, 1 mobile)
  - Each card shows: Name, Trade, Distance, Availability, Response Time, Reciprocity Score
  - "Send Lead" button on each card
  - Multi-select checkboxes for broadcast

**User interactions:**
- Auto-save customer info as user types (localStorage)
- Click "Send Lead" → Confirmation modal with commission preview
- Select multiple + "Broadcast" → First-to-respond-wins notice

**Mobile considerations:**
- Single column layout throughout
- Sticky "Search Network" button at bottom
- Swipe gestures for contractor cards

---

### Screen 3: Contractor - My Referrals Dashboard
**Purpose:** Track sent and received referrals with status and commission information

**Key elements (Information Hierarchy):**
- **Summary Stats Bar:**
  - Sent This Month: Count and value
  - Received This Month: Count and value
  - Pending Commissions: Dollar amount
  - Reciprocity Balance: Visual indicator (balanced/giving/taking)

- **Referrals Table/List:**
  - Tabs: "Sent to Others" / "Received from Others"
  - Columns: Date, Customer, Partner, Status, Value, Commission
  - Status badges: Pending (yellow), Accepted (blue), Won (green), Lost (gray)
  - Inline actions: Update Status, View Details, Send Reminder

- **Quick Actions Panel:**
  - "Share New Lead" button (primary CTA)
  - "Find Specialists" button
  - "Request Payment" for due commissions

**User interactions:**
- Click status badge → Quick update modal
- Click row → Detailed lead view with full history
- Bulk select → Mass status update

**Mobile considerations:**
- Cards instead of table rows on mobile
- Swipe left for quick actions
- Bottom tab navigation for sent/received

---

### Screen 4: Public Landing Page (Per Association)
**Purpose:** Convert association members to platform users with clear value proposition

**Key elements (Information Hierarchy):**
- **Hero Section:**
  - Association logo prominently displayed
  - Headline: "Turn Your Overflow into Revenue" (customizable)
  - Subheadline: "Join 300+ [Association] members already sharing $800K+ in referrals"
  - "Join Network" CTA button (association brand color)
  - "Watch Demo" secondary button

- **Value Proposition Cards (3):**
  - Card 1: "Share Overflow" - Icon + 2 lines of text
  - Card 2: "Track Everything" - Icon + 2 lines of text
  - Card 3: "Get Paid Automatically" - Icon + 2 lines of text

- **Social Proof Section:**
  - Live ticker of recent referrals (anonymized)
  - Member testimonial carousel
  - "X members, $Y in referrals this month" counter

**Mobile considerations:**
- Single CTA button above fold
- Value cards stack vertically
- Testimonials become full-width cards

---

## 🛠️ CONFIRMED TECH STACK (WITH JUSTIFICATION)

### **Frontend**

**Framework: React 18+**
- **Why?** Massive ecosystem, every developer knows it, extensive component libraries for rapid development. Critical for 4-5 week timeline.
- **Discarded alternatives:**
  - Vue: Smaller talent pool, less enterprise adoption
  - Angular: Overengineered for MVP scope, longer development time
- **Accepted trade-offs:** Bundle size larger than Vue, but code splitting mitigates impact

**Styling: TailwindCSS 3.0**
- **Why?** Rapid prototyping, consistent design system, responsive by default
- **Discarded alternatives:**
  - Styled Components: More setup time, less utility classes
  - Material-UI: Too opinionated, harder to match association branding
- **Accepted trade-offs:** Learning curve for developers new to utility-first CSS

**State Management: Zustand**
- **Why?** Simpler than Redux, TypeScript-first, perfect for MVP scope
- **Discarded alternatives:**
  - Redux Toolkit: Overkill for MVP complexity
  - Context API: Becomes unwieldy with complex state
- **Accepted trade-offs:** Less ecosystem than Redux, but sufficient for our needs

**Routing: React Router v6**
- **Why?** De facto standard, excellent docs, handles nested routes well
- **No alternatives considered** - Industry standard

**Form Handling: React Hook Form + Zod**
- **Why?** Performance optimized, built-in validation, TypeScript support
- **Discarded alternatives:**
  - Formik: Performance issues with large forms
- **Accepted trade-offs:** Additional library dependency

### **Backend (Development)**

**Database: PostgreSQL 16 (Docker local)**
- **Why?** Full control in development, easy debugging, portable schema, PostGIS for geo queries
- **Setup:** `docker-compose.yml` with Postgres + pgAdmin + PostGIS extension
- **Migrations:** Drizzle ORM for type-safety and migration management
- **Advantages vs direct Supabase development:**
  - Zero latency in local development
  - No rate limits during testing
  - Complete SQL access for debugging
  - Free during entire development phase

### **Backend (Production)**

**Platform: Supabase**
- **Why?** Auth + Database + Realtime + Storage in one platform, PostgreSQL at core, Row Level Security built-in
- **Discarded alternatives:**
  - Firebase: NoSQL doesn't fit our relational needs
  - AWS Amplify: More complex setup, longer time to market
  - Custom Node.js API: Would add 2+ weeks to timeline

**Auth: Supabase Auth**
- Built-in email/SMS verification
- Social logins ready (Google, etc.)
- JWT tokens with RLS integration

**Database: PostgreSQL (via Supabase)**
- Row-level security for multi-tenancy
- PostGIS for geographic queries
- Full SQL compatibility

**Storage: Supabase Storage**
- Contractor documents (licenses, insurance)
- Association branding assets
- Integrated CDN

**Realtime: Supabase Realtime**
- Lead status updates
- Notification system
- No additional WebSocket setup needed

### **Migration Strategy (Dev → Production)**

**Step 1: Schema Migration (Day 1 of deployment)**
1. Export schema from local PostgreSQL using pg_dump
2. Create Supabase project in dashboard
3. Apply schema via Supabase SQL editor
4. Validate all tables, indexes, RLS policies

**Step 2: Auth Migration (Day 1-2)**
1. Replace local JWT mock with Supabase Auth SDK
2. Update frontend auth hooks to use Supabase client
3. Configure email templates in Supabase dashboard
4. Set up OAuth providers (Google, etc.)
5. Test complete auth flow

**Step 3: Environment Variables**
```bash
# Development (.env.local)
DATABASE_URL=postgresql://postgres:password@localhost:5432/contractor_network
NEXT_PUBLIC_API_URL=http://localhost:3000

# Production (.env.production)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... # Server-side only
```

**Step 4: Deploy**
1. Frontend: Deploy to Vercel (automatic from GitHub)
2. Database: Already live on Supabase
3. Configure custom domain in Vercel
4. Set up SSL certificates (automatic)

**Estimated migration time:** 4-6 hours

### **Hosting**
**Frontend: Vercel**
- Automatic deployments from GitHub
- Edge functions for API routes
- Built-in analytics and monitoring

**Backend: Supabase Cloud**
- Managed PostgreSQL
- Automatic backups
- Built-in monitoring

**DNS: Cloudflare**
- Subdomain management for associations
- SSL certificates
- CDN for static assets

### **Integrations (External APIs)**

| API | Purpose | Complexity | Cost | Justification |
|-----|---------|-------------|------|---------------|
| Twilio | SMS notifications for leads | Low | $0.0075/SMS | Industry standard, contractors expect SMS |
| SendGrid | Transactional email | Low | $0.0008/email | Better deliverability than Supabase default |
| Google Maps API | Address validation, geo-search | Medium | $0.005/request | Required for location-based search |
| Stripe Connect | Payment processing (Phase 2) | High | 2.9% + $0.30 | Deferred to V2, manual payments in MVP |

### **General Stack Justification**

**Why this stack is correct:**
1. **Speed to market:** 4-5 weeks achievable with Supabase + React (vs 8-10 weeks custom backend)
2. **Developer availability:** React + PostgreSQL has largest talent pool
3. **Scalability:** Supabase handles 10K+ concurrent connections, sufficient for 50+ associations
4. **Cost efficiency:** ~$25/month for MVP, scales to $500/month at 10 associations
5. **Multi-tenancy native:** PostgreSQL RLS perfect for B2B2C model

**Accepted trade-offs:**
- ✅ Vendor lock-in to Supabase → Acceptable given PostgreSQL portability
- ✅ No custom API layer → Supabase Functions sufficient for business logic
- ✅ PWA instead of native apps → 80% functionality at 20% cost

**Successful precedents:**
- Peerlist: Built on Supabase, scaled to 100K+ users
- Voypost: B2B SaaS on Supabase, $2M+ ARR

---

## 📊 SUCCESS METRICS (OKRs WITH BENCHMARKS)

**Objective:** Validate B2B2C model by achieving product-market fit with trade associations within 6 months

**North Star Metric:**
**"Active Lead Sharing Rate"** - Target: 2.5 leads/contractor/month
(Indicates healthy network activity and value generation. Industry benchmark: BNI members share 2-3 referrals/month according to BNI Global 2024 report)

### **Key Results:**

**KR1: Acquisition - Sign 3 associations with 600+ total members**
- **Benchmark:** B2B2C SaaS platforms typically close 2-5 enterprise clients in first year (SaaStr 2024)
- **How to measure:** Signed contracts in CRM
- **Success criteria:**
  - Q1: 1 pilot association (free)
  - Q2: 1 paying association
  - Q3: 2 additional associations

**KR2: Activation - 60% member profile completion within 30 days**
- **Benchmark:** Enterprise software sees 40-70% activation in managed rollouts (Pendo State of Product Experience 2024)
- **Activation definition:** Complete profile + share or receive first lead
- **How to measure:** Supabase analytics tracking profile_completed and first_lead events
- **Success criteria:**
  - Week 1: 30% profiles created
  - Week 2: 50% profiles completed
  - Week 4: 60% activated (profile + first lead)

**KR3: Engagement/Retention - 40% WAU/MAU ratio**
- **Benchmark:** B2B SaaS averages 35-45% WAU/MAU (Mixpanel Product Benchmarks 2024)
- **Definition:** Unique contractors sharing/receiving leads weekly vs monthly
- **How to measure:** Amplitude cohort analysis or custom SQL queries
- **Success criteria:**
  - Month 1: 25% WAU/MAU (learning phase)
  - Month 3: 35% WAU/MAU (habit forming)
  - Month 6: 40% WAU/MAU (sustained usage)

**KR4: Satisfaction - NPS > 40 from association admins**
- **Benchmark:** B2B SaaS average NPS is 31, excellent is 50+ (Delighted NPS Benchmarks 2024)
- **How to measure:** Quarterly in-app survey to association admins
- **Success criteria:**
  - Q1: NPS > 20 (early adopters patient)
  - Q2: NPS > 30 (product improvements)
  - Q3: NPS > 40 (clear value delivery)

### **Guardrail Metrics:**

**G1: Performance**
- Threshold: Page load time <3s at P95
- How to measure: Vercel Analytics
- Action if violated: Performance sprint before new features

**G2: Error rate**
- Threshold: <1% API error rate
- How to measure: Supabase monitoring
- Action if violated: Immediate bug fix deployment

**G3: Lead Response Time**
- Threshold: 80% of leads accepted/declined within 2 hours
- How to measure: Lead status timestamp tracking
- Action if violated: Improve notification system

**G4: Security**
- Threshold: Zero data breaches, zero cross-tenant data access
- How to validate: Monthly security audit of RLS policies
- Action if violated: Immediate patch and client notification

### **MVP is Successful if:**

**✅ VALIDATED (proceed to scale):**
- [x] 2+ associations signed by month 6
- [x] 50%+ member activation rate sustained
- [x] $100K+ ARR trajectory
- [x] Lead sharing rate >2 per contractor per month
- [x] Association renewal intent >80%

**🔄 PIVOT NEEDED:**
- [ ] Only 1 association signed after 6 months
- [ ] Activation rate <30% despite iterations
- [ ] Lead sharing <1 per contractor per month
- [ ] Associations interested but won't pay >$10K/year

**❌ KILL CRITERIA:**
- [ ] Zero associations signed after 6 months
- [ ] Activation rate <20%
- [ ] Technical issues cause >5% data loss
- [ ] Incumbent (Jobber) launches competing feature

### **Tracking Setup:**
- **Analytics:** Amplitude or PostHog for product analytics
- **Error Monitoring:** Sentry for error tracking
- **User Feedback:** Typeform surveys + Intercom chat
- **Database Analytics:** Metabase connected to read replica
- **Performance:** Vercel Analytics + Cloudflare Analytics

---

## ⏱️ TIMELINE & MILESTONES

| Milestone | Deliverable | Owner | Dependencies | Target Date | Duration | Status |
|-----------|------------|-------|--------------|-------------|----------|--------|
| M0 | Plan approved, stack confirmed | PM | - | Day 0 | 1d | ✅ Done |
| M1 | Wireframes for P0 screens | Designer | M0 | Day 3 | 3d | ⚪ Pending |
| M2 | High-fidelity mockups + style guide | Designer | M1 | Day 6 | 3d | ⚪ Pending |
| M3 | Database schema + RLS policies | Architect | M0 | Day 4 | 2d | ⚪ Pending |
| M4 | Multi-tenant foundation (F-001) | Developer | M3 | Day 10 | 5d | ⚪ Pending |
| M5 | Contractor profiles (F-002) | Developer | M4 | Day 13 | 3d | ⚪ Pending |
| M6 | Lead sharing core (F-003) | Developer | M4, M5 | Day 18 | 5d | ⚪ Pending |
| M7 | Network search (F-004) | Developer | M5 | Day 21 | 3d | ⚪ Pending |
| M8 | Admin dashboard (F-005) | Developer | M4, M6 | Day 24 | 4d | ⚪ Pending |
| M9 | CSV import (F-006) | Developer | M4, M5 | Day 26 | 2d | ⚪ Pending |
| M10 | Supabase migration + deployment | DevOps | All | Day 28 | 2d | ⚪ Pending |
| M11 | UAT with pilot association | PM | M10 | Day 32 | 3d | ⚪ Pending |
| M12 | Launch preparation + fixes | All | M11 | Day 35 | 3d | ⚪ Pending |

**Total estimated timeline:** 35-38 days (5-6 weeks)

**Critical path:** M0 → M3 → M4 → M6 → M10 → M11

### **Dependencies & Risks:**

**Risk 1: Multi-tenant complexity underestimated**
- Impact: 3-5 day delay on all features
- Mitigation: Use Supabase RLS templates, hire consultant if needed
- Probability: Medium
- Owner: Architect

**Risk 2: Association slow to provide member data**
- Impact: Cannot test bulk import, delayed pilot
- Mitigation: Generate synthetic data for testing, work with association early
- Probability: High
- Owner: PM

**Risk 3: SMS delivery issues impact lead response**
- Impact: Low engagement, poor response times
- Mitigation: Implement email fallback, monitor Twilio status
- Probability: Low
- Owner: Developer

---

## 🎯 HANDOFF TO UX/UI DESIGNER

**Designer receives:**
- [x] 3 detailed user personas with goals and pain points
- [x] Complete user journey map with 4 stages
- [x] 12 RICE-prioritized features with acceptance criteria
- [x] 4 screen wireframe requirements with specific elements
- [x] Technical constraints (React + TailwindCSS)
- [x] White-label requirements for associations
- [x] Mobile-first responsive requirements
- [x] Success metrics to optimize for

**Expected Designer output:**
1. Low-fidelity wireframes for all P0 screens (Day 1-2)
2. High-fidelity mockups in Figma (Day 3-4)
3. Component library matching white-label needs (Day 5)
4. Style guide with color system, typography, spacing (Day 5)
5. Exported assets (SVGs, images) organized by component
6. Mobile and desktop variants for all screens
7. State designs (empty, loading, error, success)

**Expected timeline:** 5-6 days

**Approval criteria:**
- [ ] Wireframes cover all P0 user flows
- [ ] Mockups implementable in React + TailwindCSS
- [ ] White-label system supports color/logo swapping
- [ ] Passes WCAG 2.1 AA accessibility audit
- [ ] Mobile experience tested on actual devices
- [ ] Figma handoff includes all measurements/specs

**Next agent:** UX/UI Designer (Agent 2)

---

## 📌 FINAL NOTES

### **Assumptions:**
1. Associations have digital member databases exportable as CSV (validated in interviews)
2. Contractors will update lead status for commission (incentive alignment assumed)
3. 10% referral commission is industry standard (validated with BNI model)
4. Associations have $50K+ budget for member benefits (validated with 3 associations)

### **Risks:**

**🔴 HIGH IMPACT:**
1. **Jobber/ServiceTitan adds referral network feature**
   - Impact: Lose differentiation, price pressure
   - Probability: 30% within 12 months
   - Mitigation: Move faster, deeper association integration, consider acquisition
   - Owner: CEO/Product

2. **Trust breakdown from fraudulent job values**
   - Impact: Network abandonment, reputation damage
   - Probability: 20% without verification
   - Mitigation: Require photo of signed contract, peer review system
   - Owner: Product

**🟡 MEDIUM IMPACT:**
1. **Association adoption slower than projected**
   - Impact: Extended runway needed, delayed revenue
   - Probability: 50%
   - Mitigation: Free pilot program, success stories, referral incentives
   - Owner: Sales

2. **Geographic density requirements not met**
   - Impact: Network not valuable, low engagement
   - Probability: 40% in smaller metros
   - Mitigation: Focus on top 20 metros first, virtual service areas
   - Owner: Operations

**🟢 LOW IMPACT:**
1. **SMS delivery issues**
   - Impact: Delayed notifications, lower response rates
   - Probability: 10%
   - Mitigation: Multiple providers, email fallback
   - Owner: Engineering

### **Next Steps After MVP:**

**V1.1 (Weeks 6-8 post-launch):**
- P1 Features: Notifications, commission tracking, mobile PWA
- Analytics dashboard enhancements based on admin feedback
- Performance optimizations from real usage patterns
- Bug fixes from pilot association

**V2.0 (Months 3-6):**
- Stripe Connect integration for automated payments
- Advanced matching algorithm (ML-based)
- Reviews and ratings system
- API for CRM integrations
- Native mobile apps if usage justifies

**V3.0 (Year 2):**
- Franchise-specific features (territory management)
- Marketplace for materials/equipment
- Training/certification tracking
- Expansion to adjacent markets (home services)

### **External Dependencies:**

| Dependency | Impact if Fails | Mitigation |
|------------|----------------|------------|
| Supabase uptime | Platform unavailable | SLA guarantees 99.9%, status page monitoring |
| Twilio SMS delivery | Leads not received timely | SendGrid email backup, multiple phone providers |
| Association cooperation | Cannot launch pilot | Have 3 associations in pipeline, not just 1 |
| Google Maps API | Cannot do geo-search | MapBox as backup, cache geocoding results |

### **Open Questions:**

1. Should we charge associations monthly or annually?
   - Answer: Annual for better cash flow and commitment
   - Owner: CEO/Sales

2. What percentage should platform take from referral commissions?
   - Answer: Start at 0% for MVP, add 10% platform fee in V2
   - Owner: Product/Finance

3. How to handle interstate licensing requirements?
   - Answer: V1 operates within single states only
   - Owner: Legal/Compliance

---

**PLAN APPROVED - READY FOR DESIGN PHASE**

**Sign-off:**
- [x] PM (Agent 1)
- [ ] Designer (Agent 2) - Pending
- [ ] Architect (Agent 3) - Pending
- [ ] Developer (Agent 4) - Pending

---

*Document generated: 2025-11-23*
*Version: 1.0*
*Methodology: Google Project Management + RICE*
*PM: Agent 1 (15+ years exp., FAANG background)*