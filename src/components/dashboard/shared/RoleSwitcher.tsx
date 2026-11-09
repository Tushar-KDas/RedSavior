"use client";

import React from "react";
import { UserRole } from "@/types";
import { ROLES_CONFIG } from "@/lib/auth/roles-config";
import { ShieldAlert, Eye, ChevronDown } from "lucide-react";

interface RoleSwitcherProps {
  currentRole: UserRole;
  userRoles: UserRole[];
  isSuperAdmin: boolean;
  previewRole: UserRole | null;
  onSwitchRole: (role: UserRole) => void;
}

const ALL_ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "DISTRICT_ADMIN",
  "UPAZILA_COORDINATOR",
  "ORGANIZATION_ADMIN",
  "HOSPITAL_ADMIN",
  "BLOOD_BANK_ADMIN",
  "VOLUNTEER",
  "DONOR",
  "RECIPIENT",
  "NORMAL_USER",
];

export function RoleSwitcher({
  currentRole,
  userRoles,
  isSuperAdmin,
  previewRole,
  onSwitchRole,
}: RoleSwitcherProps) {
  // If user is super admin, they can preview all 11 roles
  const selectableRoles = isSuperAdmin ? ALL_ROLES : userRoles;
  const activeRole = previewRole || currentRole;

  if (selectableRoles.length <= 1 && !isSuperAdmin) {
    // Normal user with single assigned role: render non-interactive badge
    const config = ROLES_CONFIG[activeRole];
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-gray-200">
        <span className="text-[10px] text-gray-400">ROLE:</span>
        <span className="text-white font-extrabold uppercase tracking-wider">
          {config?.badgeLabel || activeRole.replace("_", " ")}
        </span>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1 shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
          {previewRole ? "PREVIEW:" : "ROLE:"}
        </span>
        <select
          value={activeRole}
          onChange={(e) => onSwitchRole(e.target.value as UserRole)}
          aria-label="Select role dashboard"
          className="text-xs font-bold bg-transparent text-white focus:outline-none focus:ring-0 cursor-pointer pr-1"
        >
          {selectableRoles.map((role) => (
            <option key={role} value={role} className="bg-slate-900 text-white py-1">
              {role.replace(/_/g, " ")} {role === "SUPER_ADMIN" ? "★" : ""}
            </option>
          ))}
        </select>
      </div>

      {isSuperAdmin && (
        <span
          title="Super Admin Preview Privilege Enabled"
          className="hidden md:inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-800"
        >
          <Eye className="w-3 h-3 text-red-400" />
          <span>Full 11-Role Access</span>
        </span>
      )}
    </div>
  );
}
