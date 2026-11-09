# RedSavior Role-Based Access Control (RBAC) Permission Matrix

**Platform:** RedSavior — Bangladesh Nationwide Blood Donation Platform  
**Specification Version:** 2.0 (Enterprise Architecture)  
**Database Tables:** `roles`, `permissions`, `role_permissions`, `user_roles`, `role_scopes`  

---

## 1. Supported User Roles (11 Personas)

| Code | Role Name | Hierarchy Level | Target User / Scope |
| :--- | :--- | :---: | :--- |
| `SUPER_ADMIN` | Super Administrator | 1 | Nationwide Platform Executive & System Architect |
| `ADMIN` | System Administrator | 10 | Platform Operations & Moderation Manager |
| `DISTRICT_ADMIN` | District Administrator | 20 | District Operations (Scoped to assigned District) |
| `UPAZILA_COORDINATOR` | Upazila Coordinator | 30 | Upazila Operations (Scoped to assigned Upazila) |
| `ORGANIZATION_ADMIN` | Organization Administrator | 40 | Blood Donation Clubs, Volunteer Organizations |
| `HOSPITAL_ADMIN` | Hospital Administrator | 50 | Accredited Medical Centers & Transfusion Units |
| `BLOOD_BANK_ADMIN` | Blood Bank Administrator | 60 | Certified Blood Banks, Component Storage |
| `VOLUNTEER` | Verified Volunteer | 70 | Field Workers, Camp Volunteers, Dispatch Responders |
| `DONOR` | Voluntary Blood Donor | 80 | Registered & Verified Blood Donors |
| `RECIPIENT` | Blood Recipient / Patient | 90 | Patients, Families, Emergency Requisitioners |
| `NORMAL_USER` | Registered User | 100 | General Public, Community Members |

---

## 2. Comprehensive Permission Matrix

The table below maps all system capabilities to the 11 roles.
- **ALL**: Unrestricted nationwide access.
- **SCOPE**: Access strictly confined to the user's assigned scope (District, Upazila, Organization, Hospital, Blood Bank).
- **OWN**: Access strictly confined to records owned by the authenticated user (`auth.uid() = user_id`).
- **NO**: Access denied.

| Permission Code | Permission Description | SUPER_ADMIN | ADMIN | DISTRICT_ADMIN | UPAZILA_COORD | ORG_ADMIN | HOSPITAL_ADMIN | BLOOD_BANK_ADMIN | VOLUNTEER | DONOR | RECIPIENT | NORMAL_USER |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **User & Profile Management** |
| `users.read` | View user listings | ALL | ALL | SCOPE | SCOPE | SCOPE | NO | NO | NO | NO | NO | NO |
| `users.create` | Create new users | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `users.update` | Update user info | ALL | ALL | SCOPE | NO | SCOPE | NO | NO | NO | OWN | OWN | OWN |
| `users.suspend` | Suspend abusive users | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `users.delete` | Hard delete users | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |
| **Donor Management** |
| `donors.read` | View donor profiles | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | PUBLIC | PUBLIC | PUBLIC |
| `donors.verify` | Approve donor verification | ALL | ALL | SCOPE | SCOPE | NO | NO | NO | NO | NO | NO | NO |
| `donors.update` | Edit donor details | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | OWN | NO | NO |
| `donors.toggle_availability` | Toggle donor availability | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | OWN | NO | NO |
| `donors.suspend` | Suspend donor privileges | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| **Donations & Transfusions** |
| `donations.read` | View donation history | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | NO | OWN | NO | NO |
| `donations.verify` | Verify completed donation | ALL | ALL | SCOPE | SCOPE | NO | SCOPE | SCOPE | NO | NO | NO | NO |
| `donations.reject` | Reject invalid donation log | ALL | ALL | SCOPE | NO | NO | SCOPE | SCOPE | NO | NO | NO | NO |
| `donations.log_transfusion` | Log patient transfusion | ALL | ALL | NO | NO | NO | SCOPE | NO | NO | NO | NO | NO |
| **Blood Requests & Requisitions** |
| `requests.read` | View blood requests | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | ALL | OWN | PUBLIC |
| `requests.create` | Submit emergency request | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | NO | OWN | OWN |
| `requests.update` | Edit existing request | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | NO | NO | NO | OWN | OWN |
| `requests.manage` | Cancel / Close requests | ALL | ALL | SCOPE | SCOPE | NO | SCOPE | NO | NO | NO | OWN | OWN |
| `requests.assign` | Assign volunteer / donor | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | NO | NO | NO | NO | NO |
| `requests.broadcast_sos` | Broadcast critical SOS | ALL | ALL | SCOPE | SCOPE | NO | SCOPE | NO | NO | NO | NO | NO |
| **Hospitals & Medical Facilities** |
| `hospitals.read` | View hospitals directory | ALL | ALL | SCOPE | SCOPE | ALL | SCOPE | ALL | ALL | ALL | ALL | ALL |
| `hospitals.verify` | Verify hospital accreditation | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `hospitals.manage` | Manage hospital details | ALL | ALL | SCOPE | NO | NO | SCOPE | NO | NO | NO | NO | NO |
| **Blood Banks & Inventory** |
| `bloodbanks.read` | View blood banks | ALL | ALL | SCOPE | SCOPE | ALL | ALL | SCOPE | ALL | ALL | ALL | ALL |
| `bloodbanks.verify` | Verify blood bank license | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `bloodbanks.manage` | Manage blood bank details | ALL | ALL | SCOPE | NO | NO | NO | SCOPE | NO | NO | NO | NO |
| `bloodbanks.inventory` | Live inventory adjustments | ALL | NO | NO | NO | NO | NO | SCOPE | NO | NO | NO | NO |
| `bloodbanks.dispatch` | Dispatch blood units | ALL | NO | NO | NO | NO | NO | SCOPE | NO | NO | NO | NO |
| **Organizations & Clubs** |
| `organizations.read` | View organizations | ALL | ALL | SCOPE | SCOPE | SCOPE | ALL | ALL | ALL | ALL | ALL | ALL |
| `organizations.verify` | Approve club registration | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `organizations.manage` | Manage club activities | ALL | ALL | SCOPE | NO | SCOPE | NO | NO | NO | NO | NO | NO |
| **Volunteers & Field Tasks** |
| `volunteers.read` | View volunteer roster | ALL | ALL | SCOPE | SCOPE | SCOPE | NO | NO | SCOPE | NO | NO | NO |
| `volunteers.verify` | Verify volunteer badges | ALL | ALL | SCOPE | SCOPE | SCOPE | NO | NO | NO | NO | NO | NO |
| `volunteers.assign_task` | Dispatch field tasks | ALL | ALL | SCOPE | SCOPE | SCOPE | NO | NO | NO | NO | NO | NO |
| `volunteers.execute_task` | Mark task completed | NO | NO | NO | SCOPE | NO | NO | NO | OWN | NO | NO | NO |
| **Campaigns & Drives** |
| `campaigns.read` | View blood donation camps | ALL | ALL | SCOPE | SCOPE | SCOPE | ALL | ALL | ALL | ALL | ALL | ALL |
| `campaigns.create` | Create donation camp | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | NO | NO | NO | NO |
| `campaigns.manage` | Update camp logistics | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | NO | NO | NO | NO |
| **Digital ID Cards & QR Verification** |
| `idcards.read` | View digital ID card | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | OWN | OWN | NO | NO |
| `idcards.issue` | Issue / Re-issue ID card | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `idcards.verify_qr` | Scan & verify QR cryptotoken | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL |
| **Roles & RBAC Delegation** |
| `roles.read` | View role assignments | ALL | ALL | SCOPE | NO | NO | NO | NO | NO | NO | NO | NO |
| `roles.assign` | Assign roles to users | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |
| `roles.manage` | Edit permissions | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |
| **Analytics, System & Audit** |
| `analytics.read` | View analytical charts | ALL | ALL | SCOPE | SCOPE | SCOPE | SCOPE | SCOPE | NO | OWN | NO | NO |
| `audit.read` | View tamper-evident logs | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |
| `settings.read` | View system settings | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |
| `settings.manage` | Edit platform configuration | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |
| `database.manage` | Supabase Cloud config & SQL | ALL | NO | NO | NO | NO | NO | NO | NO | NO | NO | NO |

---

## 3. Scope Resolution Rules

When a user has a role with `SCOPE` visibility:
1. **`DISTRICT_ADMIN`:** Filters applied: `district_id = scope.district_id`.
2. **`UPAZILA_COORDINATOR`:** Filters applied: `district_id = scope.district_id AND upazila_id = scope.upazila_id`.
3. **`ORGANIZATION_ADMIN`:** Filters applied: `organization_id = scope.organization_id`.
4. **`HOSPITAL_ADMIN`:** Filters applied: `hospital_id = scope.facility_id`.
5. **`BLOOD_BANK_ADMIN`:** Filters applied: `blood_bank_id = scope.facility_id`.
6. **`DONOR` / `RECIPIENT` / `NORMAL_USER`:** Filter applied: `user_id = auth.uid()`.

---

## 4. Enforcement Layers

1. **Client UI Layer (`src/lib/auth/permissions.ts`):** Dynamically hides/shows navigation items, buttons, and views based on evaluated permissions.
2. **Dashboard Dispatcher Layer (`src/app/dashboard/page.tsx`):** Strictly verifies that `currentRole` is an authorized role belonging to the authenticated user. If a Super Admin enters preview mode, it runs in a read-only sandboxed state.
3. **API & Route Guard Layer (`src/app/api/...`):** Verifies the session JWT and database role before processing sensitive mutations.
4. **PostgreSQL RLS Layer:** Database-level Row Level Security policies guarantee data isolation even in the event of direct API calls.
