"use client";

import React from "react";
import {
  Heart,
  Users,
  Calendar,
  Droplet,
  Award,
  Building2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

interface OrganizationAdminDashboardProps {
  organizationName?: string;
  onNavigateTab: (tabId: string) => void;
}

const UPCOMING_CAMPS = [
  {
    id: "camp-01",
    title: "Sandhani Annual Youth Blood Drive",
    venue: "Dhaka University Teacher-Student Centre (TSC)",
    date: "November 25, 2026",
    target: "250 Units",
    status: "Upcoming",
  },
  {
    id: "camp-02",
    title: "Winter Emergency Blood Camp",
    venue: "BUET Central Cafeteria Grounds",
    date: "December 05, 2026",
    target: "180 Units",
    status: "Planning",
  },
];

const TOP_VOLUNTEERS = [
  { name: "Tanvir Hasan", role: "Drive Coordinator", points: "450 pts", drives: 12 },
  { name: "Sadia Rahman", role: "Medical Triage Lead", points: "380 pts", drives: 9 },
  { name: "Mahfuzur Rahman", role: "Field Logistics", points: "320 pts", drives: 8 },
];

export function OrganizationAdminDashboard({
  organizationName = "Sandhani Central Blood Club",
  onNavigateTab,
}: OrganizationAdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {organizationName} Portal
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span>Affiliated Organization</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Mobilize youth volunteers, organize blood donation camps, and track community impact.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab("drives")}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Scaffold New Blood Camp</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Club Donors */}
        <div
          onClick={() => onNavigateTab("members")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Member Donors</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">1,480</div>
          <p className="text-[11px] text-gray-400 mt-1">Affiliated regular lifesavers</p>
        </div>

        {/* Blood Units Mobilized */}
        <div
          onClick={() => onNavigateTab("donation-history")}
          className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>Units Mobilized</span>
            <Droplet className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">4,850</div>
          <p className="text-[11px] text-red-700/80 mt-1">Directly supplied to hospitals</p>
        </div>

        {/* Total Camps Held */}
        <div
          onClick={() => onNavigateTab("drives")}
          className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold uppercase">
            <span>Donation Drives Held</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-900 mt-2">32</div>
          <p className="text-[11px] text-blue-700/80 mt-1">2 Scheduled for next month</p>
        </div>

        {/* Volunteer Corps */}
        <div
          onClick={() => onNavigateTab("volunteer-team")}
          className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Active Volunteers</span>
            <Heart className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">125</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Youth leaders & organizers</p>
        </div>
      </div>

      {/* Row 2: Upcoming Camps & Volunteer Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Camps Schedule */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Scheduled Blood Drives & Camps
              </h3>
              <p className="text-[10px] text-gray-400">Manage venue logistics and donor outreach</p>
            </div>
            <button
              onClick={() => onNavigateTab("drives")}
              className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {UPCOMING_CAMPS.map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-xl border border-gray-200/80 bg-slate-50/60 hover:bg-white transition flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {camp.status}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{camp.title}</h4>
                  <p className="text-[11px] text-gray-500">{camp.venue}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                    <span>Date: {camp.date}</span>
                    <span>Target: {camp.target}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab("drives")}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex-shrink-0"
                >
                  Roster & Equipment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Honor Roll */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Volunteer Youth Leaders
              </h3>
              <Award className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-3 mt-3">
              {TOP_VOLUNTEERS.map((v) => (
                <div key={v.name} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-slate-50/70">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{v.name}</h5>
                    <p className="text-[10px] text-gray-500">{v.role} · {v.drives} Drives</p>
                  </div>
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                    {v.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => onNavigateTab("certificates")}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Issue Volunteer Certificates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
