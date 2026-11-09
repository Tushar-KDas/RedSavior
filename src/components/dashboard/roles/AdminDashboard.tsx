"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  UserCheck,
  Droplet,
  Activity,
  Building2,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  Bell,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface AdminDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

const DAILY_VERIFICATIONS = [
  { day: "Mon", donors: 24, donations: 42 },
  { day: "Tue", donors: 38, donations: 56 },
  { day: "Wed", donors: 45, donations: 61 },
  { day: "Thu", donors: 31, donations: 49 },
  { day: "Fri", donors: 52, donations: 78 },
  { day: "Sat", donors: 60, donations: 88 },
  { day: "Sun", donors: 48, donations: 70 },
];

const PENDING_APPLICATIONS = [
  {
    id: "app-01",
    name: "Dr. Nayeem Islam",
    phone: "+8801712-345678",
    bloodGroup: "O+",
    area: "Mirpur, Dhaka",
    date: "10 mins ago",
    type: "Donor Application",
  },
  {
    id: "app-02",
    name: "Sadia Sultana",
    phone: "+8801819-876543",
    bloodGroup: "B+",
    area: "Agrabad, Chattogram",
    date: "25 mins ago",
    type: "Donor Application",
  },
  {
    id: "app-03",
    name: "Central Specialized Hospital",
    phone: "+8801911-223344",
    bloodGroup: "-",
    area: "Dhanmondi, Dhaka",
    date: "1 hour ago",
    type: "Hospital Verification",
  },
  {
    id: "app-04",
    name: "Lions Club Blood Initiative",
    phone: "+8801611-998877",
    bloodGroup: "-",
    area: "Sylhet Sadar",
    date: "2 hours ago",
    type: "Organization Approval",
  },
];

export function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const [applications, setApplications] = useState(PENDING_APPLICATIONS);
  const [processedMsg, setProcessedMsg] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setProcessedMsg(`✓ Approved ${name} successfully.`);
    setTimeout(() => setProcessedMsg(null), 3000);
  };

  const handleReject = (id: string, name: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setProcessedMsg(`Rejected application for ${name}.`);
    setTimeout(() => setProcessedMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Administration Operations Dashboard
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
              Operations Scope
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Operational verification queue, complaint moderation, and platform triage.
          </p>
        </div>

        {processedMsg && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
            {processedMsg}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Managed Donors */}
        <div
          onClick={() => onNavigateTab("donors")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Managed Donors</span>
            <Users className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">89,420</div>
          <p className="text-[11px] text-gray-400 mt-1">Across 64 operational districts</p>
        </div>

        {/* Pending Donor Verifications */}
        <div
          onClick={() => onNavigateTab("donors")}
          className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase">
            <span>Pending Donor Verifications</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-900 mt-2">14</div>
          <p className="text-[11px] text-amber-700/80 mt-1">Awaiting NID/Medical check</p>
        </div>

        {/* Pending Donation Logs */}
        <div
          onClick={() => onNavigateTab("donations")}
          className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold uppercase">
            <span>Donation Logs to Verify</span>
            <Droplet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-900 mt-2">8</div>
          <p className="text-[11px] text-blue-700/80 mt-1">Submitted by hospital staff</p>
        </div>

        {/* Active Emergency Requests */}
        <div
          onClick={() => onNavigateTab("requests")}
          className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>Active Blood Requests</span>
            <Activity className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">42</div>
          <p className="text-[11px] text-red-700/80 mt-1">2 Marked Critical Emergency</p>
        </div>
      </div>

      {/* Row 2: Verification Activity Chart + Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Verification Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Daily Verification Activity
              </h3>
              <p className="text-[10px] text-gray-400">Past 7 days approvals (Donors vs Donations)</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Donors
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Donations
              </span>
            </div>
          </div>

          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DAILY_VERIFICATIONS}>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="donors" fill="#F43F5E" radius={[6, 6, 0, 0]} />
                <Bar dataKey="donations" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Action Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Priority Verification Queue
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {applications.length} Pending
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {applications.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-500">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  All operational verification items have been processed!
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-xl border border-gray-100 bg-slate-50/70 hover:bg-white transition flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {app.name}
                        </span>
                        {app.bloodGroup !== "-" && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-red-100 text-red-600">
                            {app.bloodGroup}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {app.type} · {app.area}
                      </p>
                      <span className="text-[9px] text-gray-400">{app.date}</span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleApprove(app.id, app.name)}
                        title="Approve"
                        className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(app.id, app.name)}
                        title="Reject"
                        className="p-1.5 rounded-lg bg-gray-200 text-gray-600 hover:bg-rose-500 hover:text-white transition"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <button
              onClick={() => onNavigateTab("complaints")}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Review 2 Complaints</span>
            </button>
            <button
              onClick={() => onNavigateTab("donors")}
              className="text-[#E50914] font-bold hover:underline flex items-center gap-1"
            >
              <span>Full Queue</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
