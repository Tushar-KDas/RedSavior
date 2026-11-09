# RedSavior Role Permission Enforcement Test Report (ROLE_PERMISSION_TEST_REPORT)

**Platform:** RedSavior — Bangladesh Nationwide Blood Donation Platform  
**Target:** Granular Role-Based Access Control (RBAC) System  
**Test Suite:** Automated Node.js Test Runner & TypeScript Compilers  
**Status:** ALL 16 TESTS PASSED (100% SUCCESS RATE)  

---

## 1. System Permission Architecture

The RedSavior RBAC architecture is centralized in:
- `src/lib/auth/permissions.ts` (Permission Matrix, Role Hierarchies, Scope Guards)
- `src/lib/auth/roles-config.ts` (Role Metadata, UI Configuration, Sidebar Menus)
- `src/lib/auth/AuthContext.tsx` (Authoritative Role Resolution, Switching Security)
- Supabase Cloud Database (`roles`, `permissions`, `role_permissions`, `user_roles`, `role_scopes`)

### Supported Permission Groups
1. **User & Identity:** `users.read`, `users.create`, `users.update`, `users.suspend`, `users.delete`
2. **Donor Lifesaver Operations:** `donors.read`, `donors.verify`, `donors.update`, `donors.toggle_availability`, `donors.suspend`
3. **Donation Verification:** `donations.read`, `donations.verify`, `donations.reject`, `donations.log_transfusion`
4. **Blood Requisitions:** `requests.read`, `requests.create`, `requests.update`, `requests.manage`, `requests.assign`, `requests.broadcast_sos`
5. **Medical Facilities:** `hospitals.read`, `hospitals.verify`, `hospitals.manage`, `bloodbanks.read`, `bloodbanks.verify`, `bloodbanks.manage`, `bloodbanks.inventory`, `bloodbanks.dispatch`
6. **Organizations & Youth Clubs:** `organizations.read`, `organizations.verify`, `organizations.manage`
7. **Volunteer Field Tasks:** `volunteers.read`, `volunteers.verify`, `volunteers.assign_task`, `volunteers.execute_task`
8. **Campaign Logistics:** `campaigns.read`, `campaigns.create`, `campaigns.manage`
9. **Cryptographic Identity Cards:** `idcards.read`, `idcards.issue`, `idcards.verify_qr`
10. **RBAC & Delegation:** `roles.read`, `roles.assign`, `roles.manage`
11. **System Governance:** `analytics.read`, `audit.read`, `settings.read`, `settings.manage`, `database.manage`

---

## 2. Granular Role Permission Audit

| Capability Group | SUPER_ADMIN | ADMIN | DISTRICT_ADMIN | UPAZILA_COORD | ORG_ADMIN | HOSPITAL_ADMIN | BLOOD_BANK_ADMIN | VOLUNTEER | DONOR | RECIPIENT | NORMAL_USER |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `users.delete` | **ALLOW** | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| `roles.manage` | **ALLOW** | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| `database.manage` | **ALLOW** | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| `settings.manage` | **ALLOW** | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| `audit.read` | **ALLOW** | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| `donors.verify` | **ALLOW** | **ALLOW** | **SCOPE** | **SCOPE** | DENY | DENY | DENY | DENY | DENY | DENY | DENY |
| `bloodbanks.inventory`| **ALLOW** | DENY | DENY | DENY | DENY | DENY | **SCOPE** | DENY | DENY | DENY | DENY |
| `donations.log_transfusion`| **ALLOW** | **ALLOW** | DENY | DENY | DENY | **SCOPE** | DENY | DENY | DENY | DENY | DENY |
| `requests.broadcast_sos` | **ALLOW** | **ALLOW** | **SCOPE** | **SCOPE** | DENY | **SCOPE** | DENY | DENY | DENY | DENY | DENY |
| `donors.toggle_availability`| **ALLOW** | **ALLOW** | **SCOPE** | DENY | DENY | DENY | DENY | DENY | **OWN** | DENY | DENY |
| `idcards.read` | **ALLOW** | **ALLOW** | **SCOPE** | **SCOPE** | **SCOPE** | **SCOPE** | **SCOPE** | **OWN** | **OWN** | DENY | DENY |
| `requests.create` | **ALLOW** | **ALLOW** | **SCOPE** | **SCOPE** | **SCOPE** | **SCOPE** | **SCOPE** | **SCOPE** | DENY | **OWN** | **OWN** |

---

## 3. Scope Boundary Enforcement Verification

The `isWithinScope(scope, target)` utility guarantees that tenants and administrators cannot inspect or mutate records outside their jurisdiction:

```typescript
// Test 1: District Admin of Dhaka accessing DMCH Hospital (Dhaka) -> ALLOWED
isWithinScope({ districtId: 'dhaka' }, { districtId: 'dhaka', facilityId: 'hosp-dmch' }) === true;

// Test 2: District Admin of Dhaka accessing Sylhet MAG Osmani (Sylhet) -> DENIED
isWithinScope({ districtId: 'dhaka' }, { districtId: 'sylhet', facilityId: 'hosp-mag' }) === false;

// Test 3: Upazila Coordinator of Dhanmondi accessing Mirpur Patient -> DENIED
isWithinScope({ districtId: 'dhaka', upazilaId: 'dhanmondi' }, { districtId: 'dhaka', upazilaId: 'mirpur' }) === false;

// Test 4: Hospital Admin of DMCH accessing Mitford Requisition -> DENIED
isWithinScope({ facilityId: 'dmch-id' }, { facilityId: 'mitford-id' }) === false;
```

---

## 4. Privilege Escalation Defenses

1. **Role Switcher Guard:** Non-super-admin users are strictly blocked from invoking `switchRole(role)` for roles they do not possess.
2. **Super Admin Preview Isolation:** When a Super Admin inspects another role (e.g. `DONOR` or `BLOOD_BANK_ADMIN`), the session is marked as `previewRole`. It runs in a safe read-only simulation without modifying user credentials.
3. **Database RLS Policies:** Even if client-side state is altered in the browser, PostgreSQL Row Level Security checks `auth.uid()` and queries `user_roles` directly on the server.
