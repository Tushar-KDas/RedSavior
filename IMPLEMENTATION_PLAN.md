# RedSavior — Nationwide Blood Donation Platform
## Comprehensive Master Implementation Plan

### 1. Executive Architecture & Mission
RedSavior is a production-grade, nationwide blood donation platform engineered for Bangladesh. It connects donors, patients, hospitals, blood banks, volunteers, and humanitarian organizations across all 8 divisions, 64 districts, and 495+ upazilas.

### 2. Implementation Phases & Roadmap

#### Phase 1: Project Setup, Environment & Brand Assets
- [x] Environment inspection (Node v24, npm v11, Git).
- [ ] Install core dependencies: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Lucide React, Zod, React Hook Form, Leaflet, Recharts, jsPDF, QRCode, @supabase/ssr, @supabase/supabase-js.
- [ ] Ingest brand assets: Official RedSavior logo, reference compositions.
- [ ] Configure Tailwind design tokens: `#E50914` primary red, `#B80012` deep red, `#0F172A` navy sidebar, neutrals.
- [ ] Configure TypeScript, Next.js, PostCSS.

#### Phase 2: Architecture, Layout & Bilingual Localization (Bangla & English)
- [ ] Bilingual dictionary (`src/lib/i18n/` supporting `bn` Bangla and `en` English).
- [ ] Language state provider with persistent preference and zero layout shift.
- [ ] Root Layout with Hind Siliguri and Inter font compatibility.
- [ ] Top announcement bar with emergency contacts, location, humanitarian slogan.
- [ ] Main public responsive header with navigation dropdowns, language switcher, auth buttons.
- [ ] Professional humanitarian footer with dynamic year, quick links, ID card verification QR scanner link, and newsletter.

#### Phase 3: Supabase Database Architecture & Geographic Foundation
- [ ] Comprehensive database schema (`supabase/migrations/001_initial_schema.sql`):
  - RBAC: `roles`, `permissions`, `role_permissions`, `user_roles`, `role_scopes`.
  - Geographic hierarchy: `geo_divisions`, `geo_districts`, `geo_upazilas` covering all 8 divisions and 64 districts of Bangladesh with Bangla and English names.
  - Profiles & Donors: `profiles`, `donor_profiles`, `donor_availability`, `donor_consents`.
  - Blood Requests: `blood_requests`, `request_responses`, `request_status_history`.
  - Donations: `donation_records`, `donation_verifications`, `donation_evidence`, `certificates`.
  - ID Cards & QR: `id_cards`, `qr_tokens`, `qr_verification_events`.
  - Reviews: `ratings`, `review_entitlements`, `review_reports`.
  - Facilities: `hospitals`, `blood_banks`, `blood_inventory`, `organizations`, `volunteers`, `campaigns`.
  - Notifications & Audit: `notifications`, `audit_logs`, `system_settings`.
- [ ] Robust Row-Level Security (RLS) policies.
- [ ] Comprehensive Bangladesh geographic seed data (`supabase/seed/bangladesh_geo.sql`).
- [ ] Resilient Supabase client layer with graceful fallback for offline/development mode.

#### Phase 4: Authentication, Security & RBAC System
- [ ] Supabase Auth integration (email/password, session persistence, secure cookies).
- [ ] RBAC engine supporting 11 roles:
  1. `SUPER_ADMIN`
  2. `ADMIN`
  3. `DISTRICT_ADMIN`
  4. `UPAZILA_COORDINATOR`
  5. `ORGANIZATION_ADMIN`
  6. `HOSPITAL_ADMIN`
  7. `BLOOD_BANK_ADMIN`
  8. `VOLUNTEER`
  9. `DONOR`
  10. `RECIPIENT`
  11. `NORMAL_USER`
- [ ] Server-side authorization utilities, permission checks, and scope filters.
- [ ] Auth pages: Login, Register, Forgot Password, Reset Password, Verify Email, Unauthorized.
- [ ] Role switcher for users possessing multiple authorized roles.

#### Phase 5: Public Homepage & Discovery Modules
- [ ] Pixel-accurate Homepage matching user reference image:
  - Top announcement bar.
  - Header with official logo.
  - Hero section with headline "Donate Blood. Save Lives.", call to actions, and hero visual.
  - Cascading Quick Donor Search card (Blood Group, Division, District, Upazila).
  - Impact Statistics Strip (Database-backed real metrics).
  - How RedSavior Works (5 clear steps).
  - Our Nationwide Network interactive Bangladesh map with district-wise counts.
  - Emergency Blood Request banner.
  - Featured Donors cards with verified badges.
  - Recent Blood Requests feed with urgency indicators.
  - "Together We Can Save Lives" awareness banner.
  - Professional footer.
- [ ] Find Blood Donors page with cascading location selectors, radius/distance, blood compatibility filter, availability status.
- [ ] Donor Public Profile (strictly privacy-guarded: no private phone exposure without consent, verified badges, donation count, review ratings).

#### Phase 6: Digital Donor ID Card & Cryptographic QR Verification
- [ ] Dynamic Digital Identity Card generator with role-specific visual templates (Donor vs Admin vs Volunteer).
- [ ] Features RedSavior logo, photo, human-readable ID (e.g., `RS-DNR-000125`), blood group, membership date, and cryptographic verification QR code.
- [ ] PDF download, PNG export, printable view, and share link.
- [ ] Public QR verification endpoint (`/verify-id/[token]`):
  - Non-sequential secure token hash lookup.
  - Shows verified status, donor name, blood group, role, verified donation count.
  - Explicit disclaimer: identity confirmation only, not clinical eligibility.
  - Rate-limited and protected against enumeration.

#### Phase 7: Donation Lifecycle, History, Certificates & Availability Engine
- [ ] Complete donation lifecycle: `DRAFT` -> `SUBMITTED` -> `PENDING_VERIFICATION` -> `VERIFIED` -> `REJECTED`.
- [ ] Facility verification portal for approved hospitals and blood banks.
- [ ] Transactional safe updates of verified donation counts with audit trails.
- [ ] Certificate generation engine (downloadable PDF certificate of appreciation).
- [ ] Availability engine: separation of contact availability, temporary unavailability, and configurable administrative reminder thresholds (never guaranteeing clinical clearance).

#### Phase 8: Blood Request & Emergency Response Workflow
- [ ] Create blood request form with validation (patient info, blood group, units, hospital, urgency level, required date/time).
- [ ] Request directory with filters (division, district, blood group, urgency).
- [ ] Request details page with response workflow:
  - Consented donors can respond ("Accept", "Decline", "Ask info").
  - Contact details masked until mutual confirmation.
  - Emergency fast-path workflow.
- [ ] Real-time in-app notification dispatch on new emergency requests.

#### Phase 9: Facilities, Organizations, Volunteers & Campaigns
- [ ] Hospital directory & verified facility profiles.
- [ ] Blood Bank directory & stock/inventory management module.
- [ ] Organization directory, profile, and community impact records.
- [ ] Volunteer management & task coordination.
- [ ] Donation Camps & awareness events directory with RSVP and attendance logging.

#### Phase 10: Ratings, Reviews, Safety & Moderation
- [ ] Verified interaction-based review entitlement (only after verified donation/request).
- [ ] Multi-criteria rating: Reliability, Communication, Punctuality, Cooperation.
- [ ] Anti-fraud, anti-harassment safeguards, abuse reporting, and admin moderation queue.

#### Phase 11: Comprehensive Role-Based Dashboards & Admin Suite
- [ ] Super Admin Dashboard matching user reference images:
  - Dark navy sidebar (`#0F172A`) with active red indicators.
  - Top stats cards (Total Users, Registered Donors, Verified Donors, Total Donations, Blood Requests, Hospitals & Blood Banks).
  - Bangladesh Donation Map with markers.
  - Donation statistics chart (1M, 3M, 6M, 1Y).
  - Blood Group Distribution donut chart.
  - Recent activity feed.
  - Pending Approvals queue.
  - District-wise distribution map and stats.
  - System Overview health checks.
  - Role management breakdown.
  - Top rated donors list.
- [ ] Admin Dashboard (verification queues, moderation, reports).
- [ ] District Admin & Upazila Coordinator Dashboards (scoped geographic management).
- [ ] Hospital & Blood Bank Admin Dashboards (inventory, requests, verification).
- [ ] Organization Admin Dashboard (team, campaigns, members).
- [ ] Volunteer Dashboard (assigned requests, camp tasks).
- [ ] Donor Dashboard (profile, ID card, donation history, requests, certificates, availability settings).
- [ ] Recipient Dashboard (my requests, responses, reviews).
- [ ] Normal User Dashboard (profile, donor application).

#### Phase 12: Content Pages, CMS, Educational Hub & SEO
- [ ] Educational articles & Blood Donation Awareness guides in Bangla and English.
- [ ] About RedSavior, Mission & Vision, How It Works, FAQ, Help Center, Contact Us.
- [ ] Legal & Policy pages: Privacy Policy, Terms & Conditions, Community Guidelines.
- [ ] SEO metadata, OpenGraph, dynamic sitemap, robots.txt.

#### Phase 13: Security Hardening, Anti-Fraud & Automated Testing
- [ ] Row-Level Security policy verification.
- [ ] Input sanitization, XSS protection, rate limiting headers.
- [ ] Unit and integration test suites testing authorization, donor search, availability rules, and QR token verification.

#### Phase 14: Verification, Documentation & Production Readiness
- [ ] Full build verification (`npm run build`).
- [ ] Comprehensive documentation: README.md, SETUP_GUIDE.md, DEPLOYMENT_GUIDE.md, SECURITY.md, API docs.
