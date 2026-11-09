"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Droplet,
  Heart,
  Building2,
  Activity,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Database,
  ExternalLink,
  Lock,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface SuperAdminDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

const DONATION_STATISTICS = [
  { month: "Jan", donations: 22000, donors: 12000 },
  { month: "Feb", donations: 28000, donors: 15000 },
  { month: "Mar", donations: 35000, donors: 21000 },
  { month: "Apr", donations: 48000, donors: 29000 },
  { month: "May", donations: 56000, donors: 33000 },
  { month: "Jun", donations: 54000, donors: 31000 },
  { month: "Jul", donations: 68000, donors: 42000 },
  { month: "Aug", donations: 75000, donors: 46000 },
  { month: "Sep", donations: 82000, donors: 53000 },
  { month: "Oct", donations: 91000, donors: 58000 },
  { month: "Nov", donations: 104000, donors: 65000 },
  { month: "Dec", donations: 125780, donors: 76350 },
];

const BLOOD_DISTRIBUTION = [
  { name: "O+", value: 37.5, color: "#E50914" },
  { name: "A+", value: 28.2, color: "#3B82F6" },
  { name: "B+", value: 16.8, color: "#10B981" },
  { name: "AB+", value: 7.1, color: "#F59E0B" },
  { name: "Others", value: 10.4, color: "#8B5CF6" },
];

const DISTRICT_DISTRIBUTION = [
  { name: "Dhaka", percent: 28.5, color: "bg-red-500" },
  { name: "Chattogram", percent: 18.2, color: "bg-blue-500" },
  { name: "Rajshahi", percent: 12.7, color: "bg-emerald-500" },
  { name: "Khulna", percent: 12.1, color: "bg-amber-500" },
  { name: "Sylhet", percent: 9.8, color: "bg-purple-500" },
  { name: "Others", percent: 18.7, color: "bg-teal-500" },
];

const TOP_RATED_DONORS = [
  {
    name: "Md. Rahim Ahmed",
    rating: 5.0,
    donations: 25,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    bloodGroup: "O+",
    area: "Dhanmondi, Dhaka",
  },
  {
    name: "Ayesha Akter",
    rating: 4.9,
    donations: 20,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    bloodGroup: "A+",
    area: "Mirpur, Dhaka",
  },
  {
    name: "Tanvir Hasan",
    rating: 4.9,
    donations: 18,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bloodGroup: "B+",
    area: "Kotwali, Chattogram",
  },
];

export function SuperAdminDashboard({ onNavigateTab }: SuperAdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Super Admin Command Center
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-[#E50914] border border-red-200">
              Nationwide Scope
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time platform telemetry across 8 divisions, 64 districts, and 495+ upazilas of Bangladesh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab("database")}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Cloud Status</span>
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Users */}
        <div
          onClick={() => onNavigateTab("users")}
          className="cursor-pointer bg-gradient-to-br from-[#E50914] to-red-700 text-white p-5 rounded-2xl shadow-lg shadow-red-500/15 hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-100 uppercase tracking-wider">
              Total Users
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              +12.5%
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black mt-2">245,780</div>
          <div className="mt-2 text-[10px] text-red-100 flex items-center justify-between">
            <span>Nationwide registered</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 2: Registered Donors */}
        <div
          onClick={() => onNavigateTab("donors")}
          className="cursor-pointer bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-lg shadow-emerald-500/15 hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
              Registered Donors
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              +14.7%
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black mt-2">89,420</div>
          <div className="mt-2 text-[10px] text-emerald-100 flex items-center justify-between">
            <span>8 Divisions Active</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 3: Verified Donors */}
        <div
          onClick={() => onNavigateTab("donors")}
          className="cursor-pointer bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-lg shadow-blue-500/15 hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
              Verified Donors
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              +12.8%
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black mt-2">76,350</div>
          <div className="mt-2 text-[10px] text-blue-100 flex items-center justify-between">
            <span>85.4% Verification Rate</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 4: Total Donations */}
        <div
          onClick={() => onNavigateTab("donations")}
          className="cursor-pointer bg-gradient-to-br from-purple-600 to-violet-700 text-white p-5 rounded-2xl shadow-lg shadow-purple-500/15 hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-100 uppercase tracking-wider">
              Total Donations
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              +16.7%
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black mt-2">125,780</div>
          <div className="mt-2 text-[10px] text-purple-100 flex items-center justify-between">
            <span>Completed units</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 5: Blood Requests */}
        <div
          onClick={() => onNavigateTab("requests")}
          className="cursor-pointer bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-2xl shadow-lg shadow-amber-500/15 hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-100 uppercase tracking-wider">
              Blood Requests
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              +11.2%
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black mt-2">8,543</div>
          <div className="mt-2 text-[10px] text-amber-100 flex items-center justify-between">
            <span>2 Critical Emergency</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 6: Hospitals & Banks */}
        <div
          onClick={() => onNavigateTab("hospitals")}
          className="cursor-pointer bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-5 rounded-2xl shadow-lg shadow-teal-500/15 hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-100 uppercase tracking-wider">
              Facilities
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
              64 Districts
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-black mt-2">320</div>
          <div className="mt-2 text-[10px] text-teal-100 flex items-center justify-between">
            <span>Hospitals & Blood Banks</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Row 2: Map Card + Donation Statistics Line Chart + Blood Group Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bangladesh PostGIS Map Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E50914]" />
                <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  Bangladesh Donation Map
                </h3>
              </div>
              <Link
                href="/donors/map"
                className="text-[11px] font-bold text-[#E50914] hover:underline flex items-center gap-1"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="relative mt-4 h-48 rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#E50914_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="relative z-10">
                <span className="text-3xl font-black text-white">64 Districts</span>
                <p className="text-xs text-emerald-400 font-bold mt-1 flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>PostGIS Real-Time Sync</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-2 max-w-xs">
                  Covering 495+ Upazilas, 320 Medical Facilities, and 89,420+ ready voluntary lifesavers.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">GIS Coordinate System</span>
            <span className="font-bold text-slate-800">EPSG:4326 (WGS 84)</span>
          </div>
        </div>

        {/* Nationwide Donation Statistics Line Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Donation Statistics
              </h3>
              <p className="text-[10px] text-gray-400">Monthly units donated vs donor registrations</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-[#E50914]">
                <span className="w-2 h-2 rounded-full bg-[#E50914]" /> Donations
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Donors
              </span>
            </div>
          </div>

          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DONATION_STATISTICS}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94A3B8" />
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
                <Line type="monotone" dataKey="donations" stroke="#E50914" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="donors" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Group Share Donut Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Blood Group Share
              </h3>
              <p className="text-[10px] text-gray-400">Distribution among ready donors</p>
            </div>

            <div className="h-40 mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={BLOOD_DISTRIBUTION}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {BLOOD_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-black text-slate-900">125,780</span>
                <span className="text-[9px] text-gray-400">Total Units</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-gray-100">
            {BLOOD_DISTRIBUTION.map((item) => (
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

      {/* Row 3: District Distribution + Top Rated Donors + Quick Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* District-wise Distribution */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              District-wise Donor Distribution
            </h3>
            <span className="text-[10px] font-bold text-gray-400">Top Administrative Regions</span>
          </div>

          <div className="space-y-3.5 mt-4">
            {DISTRICT_DISTRIBUTION.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>{d.name}</span>
                  <span>{d.percent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`${d.color} h-2 rounded-full transition-all`} style={{ width: `${d.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Lifesavers */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Top Rated Lifesavers
            </h3>
            <button onClick={() => onNavigateTab("donors")} className="text-[11px] font-bold text-[#E50914] hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3 mt-3">
            {TOP_RATED_DONORS.map((donor) => (
              <div key={donor.name} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-gray-100/60">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-red-200">
                    <Image src={donor.avatar} alt={donor.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{donor.name}</h4>
                    <p className="text-[10px] text-gray-500">{donor.area}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-red-100 text-[#E50914]">
                        {donor.bloodGroup}
                      </span>
                      <span className="text-[10px] text-gray-400">· {donor.donations} donations</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{donor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Distribution & Fast Nav */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                System Governance
              </h3>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="space-y-2 mt-3">
              <div
                onClick={() => onNavigateTab("donors")}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between cursor-pointer hover:bg-red-50 hover:border-red-200 transition"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900">Donors</span>
                  <p className="text-[10px] text-gray-500">Voluntary verified pool</p>
                </div>
                <span className="text-xs font-black text-slate-900">89,420</span>
              </div>

              <div
                onClick={() => onNavigateTab("volunteers")}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900">Volunteers</span>
                  <p className="text-[10px] text-gray-500">Rapid response field team</p>
                </div>
                <span className="text-xs font-black text-slate-900">12,450</span>
              </div>

              <div
                onClick={() => onNavigateTab("admins")}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900">Admins</span>
                  <p className="text-[10px] text-gray-500">District & Upazila leads</p>
                </div>
                <span className="text-xs font-black text-slate-900">64</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => onNavigateTab("security")}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition"
            >
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>Security Center & RLS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
