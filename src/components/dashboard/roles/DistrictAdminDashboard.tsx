"use client";

import React, { useState } from "react";
import {
  Users,
  MapPin,
  Activity,
  Droplet,
  Building2,
  Calendar,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Radio,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DistrictAdminDashboardProps {
  districtName?: string;
  onNavigateTab: (tabId: string) => void;
}

const UPAZILA_DONOR_DATA = [
  { upazila: "Mirpur", donors: 7130, requests: 3 },
  { upazila: "Dhanmondi", donors: 5600, requests: 2 },
  { upazila: "Uttara", donors: 4840, requests: 1 },
  { upazila: "Mohammadpur", donors: 4080, requests: 2 },
  { upazila: "Gulshan", donors: 3830, requests: 0 },
];

const DISTRICT_BLOOD_DATA = [
  { name: "O+", value: 38, color: "#E50914" },
  { name: "A+", value: 27, color: "#3B82F6" },
  { name: "B+", value: 18, color: "#10B981" },
  { name: "AB+", value: 8, color: "#F59E0B" },
  { name: "Negative Groups", value: 9, color: "#8B5CF6" },
];

const LOCAL_URGENT_REQUESTS = [
  {
    id: "req-dhk-01",
    patient: "Kamrul Islam",
    hospital: "Dhaka Medical College Hospital (DMCH)",
    bloodGroup: "O+",
    units: 2,
    urgency: "CRITICAL",
    upazila: "Dhanmondi",
    time: "25 mins ago",
  },
  {
    id: "req-dhk-02",
    patient: "Nazma Begum",
    hospital: "National Institute of Neurosciences",
    bloodGroup: "B+",
    units: 1,
    urgency: "URGENT",
    upazila: "Agargaon",
    time: "1 hour ago",
  },
];

export function DistrictAdminDashboard({
  districtName = "Dhaka District",
  onNavigateTab,
}: DistrictAdminDashboardProps) {
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcastAlert = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header with District Scope Badge */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {districtName} Command Dashboard
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>District Scoped</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Voluntary blood coordination, upazila oversight, and hospital logistics in {districtName}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBroadcastAlert}
            disabled={broadcastSent}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-white transition shadow-sm ${
              broadcastSent
                ? "bg-emerald-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{broadcastSent ? "✓ Emergency SOS Sent to 1,240 Donors!" : "Broadcast District Alert"}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* District Donors */}
        <div
          onClick={() => onNavigateTab("district-donors")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>District Donors</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">25,480</div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
            <span>21,720 Verified</span>
            <span className="text-emerald-600 font-bold">85% Verified</span>
          </div>
        </div>

        {/* Active Emergency Requests */}
        <div
          onClick={() => onNavigateTab("district-requests")}
          className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>District Blood Requests</span>
            <Activity className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">8</div>
          <p className="text-[11px] text-red-700/80 mt-1">2 Critical in DMCH & Neurosciences</p>
        </div>

        {/* Local Hospitals */}
        <div
          onClick={() => onNavigateTab("local-hospitals")}
          className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold uppercase">
            <span>Connected Hospitals</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-900 mt-2">48</div>
          <p className="text-[11px] text-blue-700/80 mt-1">Medical Colleges & Transfusion Centers</p>
        </div>

        {/* Local Organizations */}
        <div
          onClick={() => onNavigateTab("local-orgs")}
          className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>District Blood Clubs</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">16</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Active voluntary organizations</p>
        </div>
      </div>

      {/* Row 2: Upazila Breakdown + Local Blood Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Upazila-wise Distribution */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Upazila-wise Donor Strength
              </h3>
              <p className="text-[10px] text-gray-400">Registered lifesavers in major upazilas/zones</p>
            </div>
            <span className="text-[11px] font-bold text-indigo-600">5 Upazilas</span>
          </div>

          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UPAZILA_DONOR_DATA} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                <YAxis dataKey="upazila" type="category" tick={{ fontSize: 11 }} stroke="#64748B" width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="donors" fill="#4F46E5" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Blood Group Distribution */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                District Blood Group Stock
              </h3>
              <p className="text-[10px] text-gray-400">Available voluntary donors ready to respond</p>
            </div>

            <div className="h-40 mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DISTRICT_BLOOD_DATA}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {DISTRICT_BLOOD_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-black text-slate-900">25,480</span>
                <span className="text-[9px] text-gray-400">Donors</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-gray-100">
            {DISTRICT_BLOOD_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Active District Urgent Requests */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-600" />
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Urgent Patient Requisitions in {districtName}
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab("district-requests")}
            className="text-[11px] font-bold text-[#E50914] hover:underline flex items-center gap-1"
          >
            <span>View All ({LOCAL_URGENT_REQUESTS.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {LOCAL_URGENT_REQUESTS.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50/80 transition flex items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">{req.patient}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                    {req.bloodGroup} · {req.units} Units
                  </span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                    {req.urgency}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  {req.hospital} ({req.upazila})
                </p>
                <span className="text-[10px] text-gray-500 mt-0.5 block">{req.time}</span>
              </div>

              <button
                onClick={() => onNavigateTab("district-requests")}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex-shrink-0"
              >
                Dispatch Donors
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
