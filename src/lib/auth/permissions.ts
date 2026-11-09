import { UserProfile, UserRole } from "@/types";

export type PermissionCode =
  | "users.read"
  | "users.create"
  | "users.update"
  | "users.suspend"
  | "users.delete"
  | "donors.read"
  | "donors.verify"
  | "donors.update"
  | "donors.toggle_availability"
  | "donors.suspend"
  | "donations.read"
  | "donations.verify"
  | "donations.reject"
  | "donations.log_transfusion"
  | "requests.read"
  | "requests.create"
  | "requests.update"
  | "requests.manage"
  | "requests.assign"
  | "requests.broadcast_sos"
  | "hospitals.read"
  | "hospitals.verify"
  | "hospitals.manage"
  | "bloodbanks.read"
  | "bloodbanks.verify"
  | "bloodbanks.manage"
  | "bloodbanks.inventory"
  | "bloodbanks.dispatch"
  | "organizations.read"
  | "organizations.verify"
  | "organizations.manage"
  | "volunteers.read"
  | "volunteers.verify"
  | "volunteers.assign_task"
  | "volunteers.execute_task"
  | "campaigns.read"
  | "campaigns.create"
  | "campaigns.manage"
  | "idcards.read"
  | "idcards.issue"
  | "idcards.verify_qr"
  | "roles.read"
  | "roles.assign"
  | "roles.manage"
  | "analytics.read"
  | "audit.read"
  | "settings.read"
  | "settings.manage"
  | "database.manage";

export interface RoleScope {
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  organizationId?: string;
  facilityId?: string;
}

// Master Role Permission Definitions
export const ROLE_PERMISSIONS: Record<UserRole, PermissionCode[]> = {
  SUPER_ADMIN: [
    "users.read", "users.create", "users.update", "users.suspend", "users.delete",
    "donors.read", "donors.verify", "donors.update", "donors.toggle_availability", "donors.suspend",
    "donations.read", "donations.verify", "donations.reject", "donations.log_transfusion",
    "requests.read", "requests.create", "requests.update", "requests.manage", "requests.assign", "requests.broadcast_sos",
    "hospitals.read", "hospitals.verify", "hospitals.manage",
    "bloodbanks.read", "bloodbanks.verify", "bloodbanks.manage", "bloodbanks.inventory", "bloodbanks.dispatch",
    "organizations.read", "organizations.verify", "organizations.manage",
    "volunteers.read", "volunteers.verify", "volunteers.assign_task", "volunteers.execute_task",
    "campaigns.read", "campaigns.create", "campaigns.manage",
    "idcards.read", "idcards.issue", "idcards.verify_qr",
    "roles.read", "roles.assign", "roles.manage",
    "analytics.read", "audit.read", "settings.read", "settings.manage", "database.manage",
  ],
  ADMIN: [
    "users.read", "users.create", "users.update", "users.suspend",
    "donors.read", "donors.verify", "donors.update",
    "donations.read", "donations.verify", "donations.reject",
    "requests.read", "requests.create", "requests.update", "requests.manage", "requests.assign",
    "hospitals.read", "hospitals.verify", "hospitals.manage",
    "bloodbanks.read", "bloodbanks.verify",
    "organizations.read", "organizations.verify",
    "volunteers.read", "volunteers.verify",
    "campaigns.read", "campaigns.create", "campaigns.manage",
    "idcards.read", "idcards.issue", "idcards.verify_qr",
    "roles.read",
    "analytics.read",
  ],
  DISTRICT_ADMIN: [
    "users.read", "users.create", "users.update", "users.suspend",
    "donors.read", "donors.verify", "donors.update",
    "donations.read", "donations.verify", "donations.reject",
    "requests.read", "requests.create", "requests.update", "requests.manage", "requests.assign", "requests.broadcast_sos",
    "hospitals.read", "hospitals.manage",
    "bloodbanks.read", "bloodbanks.manage",
    "organizations.read",
    "volunteers.read", "volunteers.verify", "volunteers.assign_task",
    "campaigns.read", "campaigns.create", "campaigns.manage",
    "idcards.read", "idcards.issue", "idcards.verify_qr",
    "analytics.read",
  ],
  UPAZILA_COORDINATOR: [
    "users.read",
    "donors.read", "donors.verify",
    "donations.read", "donations.verify",
    "requests.read", "requests.create", "requests.update", "requests.manage", "requests.assign",
    "hospitals.read",
    "bloodbanks.read",
    "organizations.read",
    "volunteers.read", "volunteers.verify", "volunteers.assign_task", "volunteers.execute_task",
    "campaigns.read", "campaigns.create", "campaigns.manage",
    "idcards.read", "idcards.verify_qr",
    "analytics.read",
  ],
  ORGANIZATION_ADMIN: [
    "users.read", "users.update",
    "donors.read",
    "donations.read",
    "requests.read", "requests.create", "requests.update", "requests.assign",
    "hospitals.read",
    "bloodbanks.read",
    "organizations.read", "organizations.manage",
    "volunteers.read", "volunteers.verify", "volunteers.assign_task",
    "campaigns.read", "campaigns.create", "campaigns.manage",
    "idcards.read", "idcards.verify_qr",
    "analytics.read",
  ],
  HOSPITAL_ADMIN: [
    "donors.read",
    "donations.read", "donations.verify", "donations.reject", "donations.log_transfusion",
    "requests.read", "requests.create", "requests.update", "requests.manage", "requests.broadcast_sos",
    "hospitals.read", "hospitals.manage",
    "bloodbanks.read",
    "campaigns.read",
    "idcards.verify_qr",
    "analytics.read",
  ],
  BLOOD_BANK_ADMIN: [
    "donors.read",
    "donations.read", "donations.verify", "donations.reject",
    "requests.read", "requests.create",
    "hospitals.read",
    "bloodbanks.read", "bloodbanks.manage", "bloodbanks.inventory", "bloodbanks.dispatch",
    "campaigns.read",
    "idcards.verify_qr",
    "analytics.read",
  ],
  VOLUNTEER: [
    "donors.read",
    "requests.read", "requests.create",
    "hospitals.read",
    "bloodbanks.read",
    "organizations.read",
    "volunteers.execute_task",
    "campaigns.read",
    "idcards.read", "idcards.verify_qr",
  ],
  DONOR: [
    "users.update",
    "donors.read", "donors.update", "donors.toggle_availability",
    "donations.read",
    "requests.read",
    "hospitals.read",
    "bloodbanks.read",
    "campaigns.read",
    "idcards.read", "idcards.verify_qr",
    "analytics.read",
  ],
  RECIPIENT: [
    "users.update",
    "donors.read",
    "requests.read", "requests.create", "requests.update", "requests.manage",
    "hospitals.read",
    "bloodbanks.read",
    "campaigns.read",
    "idcards.verify_qr",
  ],
  NORMAL_USER: [
    "users.update",
    "donors.read",
    "requests.read", "requests.create", "requests.update",
    "hospitals.read",
    "bloodbanks.read",
    "campaigns.read",
    "idcards.verify_qr",
  ],
};

/**
 * Checks whether a given role has a specific permission
 */
export function hasPermission(
  role: UserRole,
  permission: PermissionCode
): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}

/**
 * Check whether a user profile has access to a permission under their active role
 */
export function canUserPerform(
  user: UserProfile | null,
  activeRole: UserRole,
  permission: PermissionCode
): boolean {
  if (!user) return false;
  // If user is not authorized for activeRole and it's not a super admin, deny
  if (!user.roles.includes(activeRole) && !user.roles.includes("SUPER_ADMIN")) {
    return false;
  }
  return hasPermission(activeRole, permission);
}

/**
 * Validates whether an action is within the geographic or organizational scope
 */
export function isWithinScope(
  scope: RoleScope | undefined,
  target: {
    divisionId?: string;
    districtId?: string;
    upazilaId?: string;
    organizationId?: string;
    facilityId?: string;
  }
): boolean {
  if (!scope) return true; // Unscoped / Nationwide

  if (scope.districtId && target.districtId && scope.districtId !== target.districtId) {
    return false;
  }
  if (scope.upazilaId && target.upazilaId && scope.upazilaId !== target.upazilaId) {
    return false;
  }
  if (scope.organizationId && target.organizationId && scope.organizationId !== target.organizationId) {
    return false;
  }
  if (scope.facilityId && target.facilityId && scope.facilityId !== target.facilityId) {
    return false;
  }
  return true;
}
