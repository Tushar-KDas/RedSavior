# RedSavior Role-Based Dashboard Implementation Plan (ROLE_DASHBOARD_IMPLEMENTATION_PLAN)

**Project:** RedSavior — Bangladesh Nationwide Blood Donation Platform  
**Target Architecture:** 11 Fully Isolated, Role-Specific Dashboards with Server-Grade RBAC  
**Design Standard:** RedSavior High-Fidelity UI System (Dark Navy Sidebar `#0B1120`, Active Red Accent `#E50914`, Crisp White Cards, Slate-50 Background, Recharts, Lucide Icons)  

---

## 1. Architectural Strategy

The unified dashboard issue will be permanently solved using a **Modular Role Dispatcher Pattern**:

```
                       src/app/dashboard/page.tsx
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
       Authenticated User Check        Super Admin Role Switcher
       (Authoritative RBAC Guard)      (Preview Mode for 11 Roles)
                  │                               │
                  └───────────────┬───────────────┘
                                  ▼
               src/components/dashboard/shared/DashboardLayout.tsx
               - Role-Specific Sidebar (Custom navigation per role)
               - Role-Specific Header (Notifications, Role Badge, Switcher)
               - Responsive Mobile Drawer & Breadcrumbs
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   role === "SUPER_ADMIN"                           role === "ADMIN"
   SuperAdminDashboard.tsx                          AdminDashboard.tsx
         │                                                 │
   role === "DISTRICT_ADMIN"                        role === "UPAZILA_COORDINATOR"
   DistrictAdminDashboard.tsx                       UpazilaCoordinatorDashboard.tsx
         │                                                 │
   role === "ORGANIZATION_ADMIN"                    role === "HOSPITAL_ADMIN"
   OrganizationAdminDashboard.tsx                   HospitalAdminDashboard.tsx
         │                                                 │
   role === "BLOOD_BANK_ADMIN"                      role === "VOLUNTEER"
   BloodBankAdminDashboard.tsx                      VolunteerDashboard.tsx
         │                                                 │
   role === "DONOR"                                 role === "RECIPIENT"
   DonorDashboard.tsx                               RecipientDashboard.tsx
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  ▼
                        role === "NORMAL_USER"
                        NormalUserDashboard.tsx
```

---

## 2. Directory & Component Architecture

### A. Core Permission & Configuration Files
1. `src/lib/auth/permissions.ts`: Centralized RBAC evaluator (`hasPermission(user, permission, context)`), role hierarchy definitions, and scope resolvers.
2. `src/lib/auth/roles-config.ts`: Master metadata for all 11 roles including role titles, badges, colors, and exact sidebar navigation items.

### B. Shared Dashboard Shell (`src/components/dashboard/shared/`)
1. `DashboardLayout.tsx`: The primary shell rendering the dark navy sidebar (`#0B1120`), role-specific nav links, user profile block, top header with search, notifications, and authorized role switcher.
2. `RoleSwitcher.tsx`: Secure role switcher component.
   - For regular users: Only displays roles explicitly listed in `user.roles`.
   - For Super Admins: Displays all 11 roles with an active preview toggle, rendering an unmistakable `[SUPER ADMIN PREVIEW MODE]` banner when inspecting another role.
3. `StatCard.tsx`: Standardized metric card supporting icons, trend indicators, gradients, and sub-labels.

### C. 11 Dedicated Role Dashboard Components (`src/components/dashboard/roles/`)
1. **`SuperAdminDashboard.tsx`**:
   - 29 sidebar modules.
   - 6 Key KPI Cards: Total Users, Total Donors, Verified Donors, Total Donations, Blood Requests, Facilities.
   - Nationwide Donation Statistics Line Chart (Jan–Dec).
   - Blood Group Distribution Donut Chart.
   - 64 Districts Breakdown Bar Chart.
   - PostGIS Geospatial Overview Card.
   - System Health, Security Alerts, and Supabase Live Cloud Status.
   - Preserves all existing Super Admin tabs: `users`, `donors`, `requests`, `locations`, `id-cards`, `security`, `audit`, `database`.

2. **`AdminDashboard.tsx`**:
   - 15 sidebar modules.
   - Operations KPIs: Total Managed Donors, Pending Verifications, Active Blood Requisitions, Pending Hospital/Club Approvals, Pending Complaints.
   - Daily Verification Statistics Bar Chart.
   - Operational Action Center: Quick Approve/Reject donors, Review complaints.

3. **`DistrictAdminDashboard.tsx`**:
   - 13 sidebar modules.
   - Scoped strictly to the assigned district (e.g., Dhaka or Chattogram).
   - KPIs: District Total Donors, Verified Donors, District Blood Requests, Local Hospitals, Pending Local Approvals.
   - Upazila-wise Donor Breakdown chart.
   - Local Blood Group Share donut chart.
   - Quick action: Verify District Donor, Dispatch District Alert.

4. **`UpazilaCoordinatorDashboard.tsx`**:
   - 11 sidebar modules.
   - Scoped strictly to the assigned Upazila (e.g., Dhanmondi or Mirpur).
   - KPIs: Local Donors, Active Available Donors, Today's Urgent Requests, Local Volunteers, Active Donation Camps.
   - Urgent Blood Requisition Alert Feed.
   - Volunteer Team Quick Contact list.

5. **`OrganizationAdminDashboard.tsx`**:
   - 14 sidebar modules.
   - Scoped strictly to the user's voluntary blood club or NGO (e.g., Sandhani, Quantum, Red Crescent).
   - KPIs: Total Organization Donors, Camps Organized, Blood Units Mobilized, Active Volunteers, Upcoming Camps.
   - Blood Donation Drive Calendar & Camp Management.
   - Volunteer Roster & Certificate Issuance counter.

6. **`HospitalAdminDashboard.tsx`**:
   - 12 sidebar modules.
   - Scoped strictly to the assigned medical facility (e.g., Dhaka Medical College Hospital).
   - KPIs: Active Blood Requisitions, Critical Emergency Requests, Incoming Donors, Completed Transfusions, Nearby Donors.
   - Fast Action Buttons: "Create Emergency Request", "Verify Transfusion", "Call Emergency Donor".
   - Doctor / Staff Transfusion Log register.

7. **`BloodBankAdminDashboard.tsx`**:
   - 14 sidebar modules.
   - Scoped strictly to the assigned blood bank facility.
   - KPIs: Total Units in Stock, Critical Low Groups (< 5 units), Expiring in 48h, Today's Collections, Dispatched Units.
   - **Interactive 8x4 Component Matrix**: Whole Blood, RBC, Platelets, and Plasma across all 8 blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-) with stock level warnings and quick update modal.
   - Expiring Units Warning Log.

8. **`VolunteerDashboard.tsx`**:
   - 11 sidebar modules.
   - Field worker portal.
   - KPIs: Assigned Field Tasks, Pending Emergency Dispatches, Completed Missions, Volunteer Service Hours & Reward Points.
   - Active Emergency Dispatch Cards with patient location, hospital phone, and donor coordinates.
   - Camp Duty Roster with check-in button.

9. **`DonorDashboard.tsx`**:
   - 14 sidebar modules.
   - Personal Lifesaver Portal.
   - KPIs: Total Verified Donations, Lives Impacted Count, Next Eligible Donation Countdown, Donor Rating (5.0★).
   - **Interactive Availability Toggle** (Active & Available / On Vacation / Medical Rest).
   - **Digital ID Card Interactive Preview** with QR token and flip animation.
   - Urgent Blood Requests Near Me matching the donor's blood group and district.
   - Personal Donation Timeline & Certificate Download CTA.

10. **`RecipientDashboard.tsx`**:
    - 11 sidebar modules.
    - Patient and Family Portal.
    - KPIs: Active Requisitions, Matching Donors Count, Responding Donors, Verified Hospital Status.
    - **Live Requisition Progress Tracker**: 5-step interactive timeline (`Request Submitted` → `Finding Donors` → `Donor Responded` → `At Hospital` → `Transfusion Done`).
    - Contact Matched Donors (Direct Phone Call / WhatsApp link).
    - Emergency SOS broadcast trigger.

11. **`NormalUserDashboard.tsx`**:
    - 11 sidebar modules.
    - General Community Member Portal.
    - Prominent Hero Banner: "Become a Verified Lifesaver" with eligibility checklist and 1-click application.
    - Quick Action: "Request Blood for a Patient", "Search Donors in Your District".
    - Saved Donors list and Nearby Verified Hospitals.
    - Educational Guide: Blood Donation Facts & Health Benefits.

---

## 3. Implementation Phases

### Phase 1: Planning & Audit (Complete)
- `ROLE_DASHBOARD_AUDIT.md`
- `ROLE_PERMISSION_MATRIX.md`
- `ROLE_DASHBOARD_IMPLEMENTATION_PLAN.md`

### Phase 2: RBAC Engine & Navigation Config
- Build `src/lib/auth/permissions.ts` and `src/lib/auth/roles-config.ts`.
- Ensure all 11 roles have exact sidebar lists matching specifications.

### Phase 3: Shared Dashboard Shell & Switcher
- Create `src/components/dashboard/shared/DashboardLayout.tsx` and `RoleSwitcher.tsx`.
- Support seamless role switching for multi-role users and Super Admin Preview Mode.

### Phase 4: Construct All 11 Role Dashboards
- Create all 11 component files in `src/components/dashboard/roles/`.
- Wire each view to real data from `mockDb` and Supabase cloud tables.
- Build interactive sub-views (e.g., Blood Bank Matrix, Availability Toggle, ID Card Preview, Emergency Requisition Tracker).

### Phase 5: Refactor `src/app/dashboard/page.tsx`
- Replace the monolithic structure with the dynamic role dispatcher.
- Preserve all existing Super Admin management tabs (`users`, `donors`, `requests`, `locations`, `id-cards`, `security`, `audit`, `database`).

### Phase 6: Automated Testing & Verification
- Implement unit tests covering permissions, role isolation, and scope boundaries in `tests/unit/rbac-dashboards.test.mjs`.
- Execute tests and full `npm run build` to verify zero TypeScript errors.

### Phase 7: Test Reports & Git Sync
- Generate `ROLE_DASHBOARD_TEST_REPORT.md`, `ROLE_PERMISSION_TEST_REPORT.md`, and `ROLE_SECURITY_TEST_REPORT.md`.
- Commit and push to GitHub `main` for automated Vercel deployment.
