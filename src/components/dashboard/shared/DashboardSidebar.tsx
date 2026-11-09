"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserProfile, UserRole } from "@/types";
import { ROLES_CONFIG } from "@/lib/auth/roles-config";
import { DashboardIcon } from "./DashboardIcon";
import { LogOut, Globe, X, ExternalLink } from "lucide-react";

interface DashboardSidebarProps {
  user: UserProfile | null;
  activeRole: UserRole;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export function DashboardSidebar({
  user,
  activeRole,
  activeTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
  onLogout,
}: DashboardSidebarProps) {
  const roleConfig = ROLES_CONFIG[activeRole] || ROLES_CONFIG.SUPER_ADMIN;
  const items = roleConfig.sidebarItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B1120] text-gray-300 flex flex-col justify-between border-r border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Scrollable Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          {/* Logo & Mobile Close */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-11 w-44 bg-white/5 p-1 rounded-xl">
                <Image
                  src="/brand/logo.png"
                  alt="RedSavior"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Header */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-red-500 flex-shrink-0">
              <Image
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={user?.fullName || "User"}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B1120] rounded-full" />
            </div>
            <div className="overflow-hidden flex-1">
              <div className="font-bold text-white text-sm truncate">
                {user?.fullName || "Rahim Ahmed"}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-gray-400">Online</span>
              </div>
              <div className="mt-1">
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${roleConfig.badgeBg} ${roleConfig.badgeText}`}>
                  {roleConfig.badgeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Section Label */}
          <div className="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
            {roleConfig.portalName}
          </div>

          {/* Dynamic Navigation Items */}
          <nav className="p-3 space-y-1 text-xs">
            {items.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition text-left ${
                    isActive
                      ? "bg-[#E50914] text-white shadow-md shadow-red-900/30 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <DashboardIcon name={item.iconName} className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white text-[#E50914]"
                          : item.badgeColor
                          ? `${item.badgeColor} text-white`
                          : "bg-slate-800 text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Footer Area */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070B14] space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Globe className="w-4 h-4 text-red-500" />
            <span>Public Website</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
