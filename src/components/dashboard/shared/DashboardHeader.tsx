"use client";

import React from "react";
import { UserProfile, UserRole } from "@/types";
import { RoleSwitcher } from "./RoleSwitcher";
import { ROLES_CONFIG } from "@/lib/auth/roles-config";
import {
  Menu,
  Search,
  Bell,
  Globe,
  Radio,
  Eye,
  XCircle,
  Calendar,
} from "lucide-react";

interface DashboardHeaderProps {
  user: UserProfile | null;
  currentRole: UserRole;
  userRoles: UserRole[];
  isSuperAdmin: boolean;
  previewRole: UserRole | null;
  onSwitchRole: (role: UserRole) => void;
  onExitPreview: () => void;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locale: string;
  onToggleLanguage: () => void;
}

export function DashboardHeader({
  user,
  currentRole,
  userRoles,
  isSuperAdmin,
  previewRole,
  onSwitchRole,
  onExitPreview,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  locale,
  onToggleLanguage,
}: DashboardHeaderProps) {
  const activeRole = previewRole || currentRole;
  const config = ROLES_CONFIG[activeRole] || ROLES_CONFIG.SUPER_ADMIN;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200/90 shadow-sm">
      {/* Super Admin Preview Alert Bar */}
      {previewRole && isSuperAdmin && (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 animate-pulse" />
            <span>
              <strong>SUPER ADMIN PREVIEW:</strong> Viewing active dashboard layout for{" "}
              <span className="underline uppercase tracking-wide">{config.title}</span> ({activeRole}).
            </span>
          </div>
          <button
            onClick={onExitPreview}
            className="flex items-center gap-1 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-extrabold hover:bg-slate-100 transition shadow-sm"
          >
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Exit Preview</span>
          </button>
        </div>
      )}

      {/* Main Header Row */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 text-gray-600 hover:text-slate-900 rounded-xl hover:bg-gray-100"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search donors, requests, hospitals, upazilas..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Live System Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-800">Live System</span>
          </div>

          {/* Notifications Bell */}
          <button
            title="Notifications"
            className="relative p-2 text-gray-600 hover:text-slate-900 rounded-xl hover:bg-gray-100 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            title="Toggle Language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            <Globe className="w-3.5 h-3.5 text-[#E50914]" />
            <span>{locale === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Role Switcher Dropdown */}
          <RoleSwitcher
            currentRole={currentRole}
            userRoles={userRoles}
            isSuperAdmin={isSuperAdmin}
            previewRole={previewRole}
            onSwitchRole={onSwitchRole}
          />
        </div>
      </div>
    </header>
  );
}
