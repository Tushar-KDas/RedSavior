# RedSavior Role-Based Dashboard Architecture Audit (ROLE_DASHBOARD_AUDIT)

**Project:** RedSavior — Bangladesh Nationwide Blood Donation Platform  
**Live Production URL:** https://redsavior.vercel.app/  
**Supabase Cloud Project:** `https://ppxthfygkspveylehgxr.supabase.co`  
**Date:** November 2026  
**Auditor:** Principal Full-Stack & RBAC Security Engineer  

---

## 1. Executive Summary

RedSavior has been architected to serve a nationwide blood distribution and donor matching network across all 8 administrative divisions, 64 districts, and 495+ upazilas of Bangladesh. The platform specifies **11 distinct user personas**:

1. `SUPER_ADMIN` — Complete nationwide platform administration & system configuration.
2. `ADMIN` — Daily operational moderation, verification, and complaints management.
3. `DISTRICT_ADMIN` — District-scoped management confined to an assigned administrative district.
4. `UPAZILA_COORDINATOR` — Local upazila coordination, field tasks, and urgent local requests.
5. `ORGANIZATION_ADMIN` — Voluntary club/NGO management, member rosters, and blood donation drives.
6. `HOSPITAL_ADMIN` — Accredited medical facility emergency requisitions and transfusion records.
7. `BLOOD_BANK_ADMIN` — Real-time component inventory, cross-match screening, and dispatches.
8. `VOLUNTEER` — Verified field responder, camp duties, emergency donor follow-ups.
9. `DONOR` — Voluntary lifesaver personal portal: digital ID card, donation timeline, availability toggle.
10. `RECIPIENT` — Patient/family portal: requisition status tracking, matched donors, hospital SOS.
11. `NORMAL_USER` — Registered community member: donor application CTA, search, and directory.

### The Critical Issue
Inspection of `src/app/dashboard/page.tsx` revealed that regardless of which role was selected in the topbar dropdown, the exact same Super Admin layout, nationwide analytics cards, district distribution graphs, admin sidebar, and management modules were rendered. 

---

## 2. Root Cause Analysis

### A. Monolithic Architecture Without Role Dispatcher
In `src/app/dashboard/page.tsx` (1,684 lines), page rendering was conditioned exclusively on a local state variable `activeTab` (`dashboard`, `users`, `donors`, `requests`, `locations`, `id-cards`, `security`, `audit`, `database`). 
```tsx
// Current flawed logic in src/app/dashboard/page.tsx
{activeTab === "dashboard" && (
  <div>
    {/* Renders Super Admin Overview Cards unconditionally */}
    {/* Renders Nationwide Bangladesh Map */}
    {/* Renders Nationwide Line & Donut Charts */}
  </div>
)}
```
The component never inspected `currentRole` to decide **which dashboard view** to mount.

### B. Hardcoded Super Admin Sidebar Navigation
The sidebar navigation links (lines 316–435) hardcoded links to Super Admin management screens:
- Admin Dashboard
- User Management
- Donor Management
- Blood Request Management
- Location Management
- ID Card Management
- Hospital & Blood Bank
- Campaign Management
- Security Center
- Audit Logs
- Database (Supabase)

Neither District Admins, Hospital Admins, Blood Banks, Volunteers, Donors, nor Patients received role-specific sidebar items.

### C. Client-Side Privilege Escalation via Role Dropdown
In `src/app/dashboard/page.tsx`:
```tsx
<select
  value={currentRole}
  onChange={(e) => switchRole(e.target.value as UserRole)}
  className="..."
>
  {allRoles.map((r) => (
    <option key={r} value={r}>{r.replace("_", " ")}</option>
  ))}
</select>
```
Any authenticated or guest user could select `SUPER_ADMIN` in the client UI and immediately view administrative panels, database configuration interfaces, and nationwide logs. Although `AuthContext` had a check `user.roles.includes(newRole)`, default seed users and client states bypassed strict database-backed token claims.

### D. Missing Scope Isolation
In the existing codebase, queries to `mockDb.getDonors()`, `mockDb.getRequests()`, and Supabase endpoints fetched global records without evaluating scope boundaries:
- A `DISTRICT_ADMIN` of Sylhet should only view records where `district_id = 'sylhet'`.
- A `HOSPITAL_ADMIN` of DMCH should only view requisitions for `hospital_id = dmch_id`.
- A `BLOOD_BANK_ADMIN` should only view inventory for their own blood bank facility.
- A `DONOR` should only view their personal donation history and local requests matching their blood group.

### E. Lack of 11 Dedicated Role Dashboard Components
The system completely lacked modular components for the 11 roles. There were no views for:
- Blood bank inventory matrix (Whole Blood, RBC, Platelets, Plasma across 8 groups).
- Donor personal availability toggle and digital ID card preview.
- Recipient emergency requisition step tracker.
- Volunteer emergency dispatch response cards.
- Hospital emergency requisition creation and doctor transfusion verification.

---

## 3. Existing Project Preservation Assessment

The existing platform contains 32 working Next.js routes and extensive production assets that **must not be broken or deleted**:
1. `/` (Public Homepage with Hero, Live Blood Counter, Interactive Map, Testimonials)
2. `/donors` (Donor Search by Division, District, Upazila, Blood Group)
3. `/donors/directory` (Administrative Nationwide Directory)
4. `/donors/map` (PostGIS-ready interactive map)
5. `/donors/register` (Donor Registration Wizard with Health Eligibility)
6. `/donors/[id]` (Donor Profile Details)
7. `/requests` (Live Emergency Blood Board)
8. `/requests/create` (Requisition Posting Wizard)
9. `/requests/[id]` (Requisition Detail & Donor Response)
10. `/hospitals` (Verified Hospital Directory)
11. `/blood-banks` (Blood Bank Facilities)
12. `/organizations` (Voluntary Clubs & NGOs)
13. `/campaigns` (Nationwide Donation Drives)
14. `/id-card` (Cryptographic ID Card Generator)
15. `/verify-id` & `/verify-id/[token]` (QR Code Cryptographic Verification)
16. `/about`, `/about/mission`, `/how-it-works`, `/faq`, `/contact`, `/terms`, `/privacy`, `/community-guidelines`, `/help`, `/articles`, `/awareness`
17. `/login`, `/register`, `/forgot-password`, `/unauthorized`
18. `/dashboard` (The core portal under refactoring)

**Zero-Regression Guarantee:** All public pages, donor search filters, registration forms, QR verification flows, and existing Super Admin tabs will remain 100% operational.

---

## 4. Supabase Cloud Integration Status

- **Supabase Cloud URL:** `https://ppxthfygkspveylehgxr.supabase.co` (Verified HTTP 200)
- **Database Schema:** 26 tables deployed including `geo_divisions`, `geo_districts`, `geo_upazilas`, `roles`, `permissions`, `role_permissions`, `user_roles`, `role_scopes`, `profiles`, `donor_profiles`, `donor_availability`, `hospitals`, `blood_banks`, `blood_inventory`, `blood_requests`, `id_cards`, `audit_logs`.
- **RBAC Tables:** `roles` table contains all 11 valid role codes.
- **Node.js Environment Note:** Node.js v24 on Windows requires `--use-system-ca` for outbound TLS handshakes to Supabase cloud domains.

---

## 5. Architectural Remediation Strategy

To resolve the root causes completely, the following architecture will be implemented:
1. **RBAC Engine (`src/lib/auth/permissions.ts`):** Centralized permission resolver enforcing granular permissions and scope checks.
2. **Role Metadata & Nav Registry (`src/lib/auth/roles-config.ts`):** Canonical definitions of all 11 roles, titles, badges, and exact sidebar navigation configurations.
3. **Role-Aware Dashboard Shell (`src/components/dashboard/shared/`):**
   - Dynamic sidebar rendering role-specific items.
   - Authorized Role Switcher (Users can only switch among roles explicitly assigned in `user.roles`).
   - Super Admin Preview Mode: Allows Super Admin to inspect any role dashboard in a read-only mode with a prominent banner.
4. **11 Modular Role Dashboard Views (`src/components/dashboard/roles/`):**
   - Dedicated components with role-tailored KPI cards, charts, action buttons, and scopes.
5. **Preservation of Existing Super Admin Modules:** User Management, Donor Verification, Blood Request Moderation, Location Setup, ID Card Generator, Security Center, Audit Logs, and Supabase Database Status remain directly accessible under Super Admin and operational Admin roles.
