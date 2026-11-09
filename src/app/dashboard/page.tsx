"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { UserRole, BloodGroup, DonorProfile, BloodRequest, UserProfile } from "@/types";
import { DIVISIONS, DISTRICTS } from "@/data/bangladesh-geo";
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
import {
  LayoutDashboard,
  Users,
  Droplet,
  Heart,
  Building2,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Search,
  Bell,
  Globe,
  LogOut,
  CheckCircle,
  Clock,
  Award,
  Settings,
  ShieldAlert,
  FileText,
  UserCheck,
  ChevronRight,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  QrCode,
  CheckCircle2,
  Sparkles,
  Filter,
  Check,
  XCircle,
  Lock,
  RefreshCw,
  Star,
  Hospital as HospitalIcon,
  Shield,
  Eye,
} from "lucide-react";

// Line Chart Data
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

// Donut Chart Data
const BLOOD_DISTRIBUTION = [
  { name: "O+", value: 37.5, color: "#E50914" },
  { name: "A+", value: 28.2, color: "#3B82F6" },
  { name: "B+", value: 16.8, color: "#10B981" },
  { name: "AB+", value: 7.1, color: "#F59E0B" },
  { name: "Others", value: 10.4, color: "#8B5CF6" },
];

// District distribution from Reference 2
const DISTRICT_DISTRIBUTION = [
  { name: "Dhaka", percent: 28.5, color: "bg-red-500" },
  { name: "Chattogram", percent: 18.2, color: "bg-blue-500" },
  { name: "Rajshahi", percent: 12.7, color: "bg-emerald-500" },
  { name: "Khulna", percent: 12.1, color: "bg-amber-500" },
  { name: "Sylhet", percent: 9.8, color: "bg-purple-500" },
  { name: "Others", percent: 18.7, color: "bg-teal-500" },
];

// Top rated donors from Reference 2
const TOP_RATED_DONORS = [
  {
    name: "Md. Rahman",
    rating: 5.0,
    donations: 25,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    bloodGroup: "O+",
  },
  {
    name: "Ayesha Akter",
    rating: 4.9,
    donations: 20,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    bloodGroup: "A+",
  },
  {
    name: "Tanvir Hasan",
    rating: 4.9,
    donations: 18,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bloodGroup: "B+",
  },
];

export default function DashboardPage() {
  const { user, currentRole, switchRole, logout } = useAuth();
  const { locale, toggleLanguage } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Tab State
  const [userRoleFilter, setUserRoleFilter] = useState<string>("ALL");
  const [donorBloodFilter, setDonorBloodFilter] = useState<string>("ALL");
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const metrics = mockDb.getMetrics();
  const donors = mockDb.getDonors();
  const requests = mockDb.getRequests();
  const idCards = mockDb.getIdCards();
  const hospitals = mockDb.getHospitals();
  const organizations = mockDb.getOrganizations();

  const allRoles: UserRole[] = [
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

  const handleVerifyDonor = (donorId: string) => {
    mockDb.verifyDonor(donorId);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col lg:flex-row font-sans">
      {/* =========================================================================
          LEFT SIDEBAR (Matches User Reference Screenshots Exactly)
          Dark Navy Background: #0B1120 / #0F172A
          ========================================================================= */}
      <aside className="w-full lg:w-64 bg-[#0B1120] text-gray-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 shadow-xl">
        <div>
          {/* Logo */}
          <div className="p-4 border-b border-slate-800/80">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-12 w-48 bg-white/5 p-1 rounded-xl">
                <Image
                  src="/brand/logo.png"
                  alt="RedSavior"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          {/* Admin Profile Header */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-red-500 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                alt="Admin"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B1120] rounded-full" />
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-white text-sm truncate">
                {user?.fullName || "Admin"}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-gray-400">Online</span>
              </div>
              <div className="mt-1">
                <span className="text-[9px] font-black uppercase tracking-wider bg-[#E50914] text-white px-2 py-0.5 rounded-full">
                  {currentRole.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition ${
                activeTab === "dashboard"
                  ? "bg-[#E50914] text-white shadow-md shadow-red-900/30"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "users"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </button>

            <button
              onClick={() => setActiveTab("donors")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "donors"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Donor Management</span>
            </button>

            <button
              onClick={() => setActiveTab("donations")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "donations"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Droplet className="w-4 h-4" />
              <span>Donation Management</span>
            </button>

            <button
              onClick={() => setActiveTab("requests")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "requests"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Blood Request Management</span>
            </button>

            <button
              onClick={() => setActiveTab("locations")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "locations"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Location Management</span>
            </button>

            <button
              onClick={() => setActiveTab("id-cards")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "id-cards"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>ID Card Management</span>
            </button>

            <button
              onClick={() => setActiveTab("hospitals")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "hospitals"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Hospital & Blood Bank</span>
            </button>

            <button
              onClick={() => setActiveTab("campaigns")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "campaigns"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Campaign Management</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "security"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Security Center</span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                activeTab === "audit"
                  ? "bg-[#E50914] text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Audit Logs</span>
            </button>
          </nav>
        </div>

        {/* Bottom Slogan & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded-xl text-xs">
            <Heart className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
            <div>
              <div className="font-bold text-white text-[11px]">Together</div>
              <div className="text-[10px] text-gray-400">We Can Save Lives</div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-slate-800/50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN DASHBOARD BODY
          ========================================================================= */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Top Operational Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, donors, requests..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E50914]"
            />
          </div>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            {/* Live System Indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E50914] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
              <span>Live System</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
                <Bell className="w-5 h-5" />
              </button>
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E50914] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              <Globe className="w-3.5 h-3.5 text-[#E50914]" />
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* 11-Role Multi-Role Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase hidden md:inline">
                Role:
              </span>
              <select
                value={currentRole}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              >
                {allRoles.map((r) => (
                  <option key={r} value={r}>
                    {r.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 space-y-6 flex-grow">
          {/* =========================================================================
              TAB: DASHBOARD OVERVIEW (Matches Ref 1 & 2)
              ========================================================================= */}
          {activeTab === "dashboard" && (
            <>
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-[#E50914] flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                      Admin Dashboard
                    </h1>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Welcome back, {user?.fullName || "Super Admin"}! Here&apos;s what&apos;s happening with RedSavior platform today.
                  </p>
                </div>

                <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E50914]" />
                  <span>{currentTime || "Saturday, April 26, 2025 • 10:45 AM"}</span>
                </div>
              </div>

              {/* 6 Primary Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* 1. Total Users */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-4 text-white shadow-lg shadow-red-600/20 space-y-2 hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center justify-between">
                    <Users className="w-5 h-5 opacity-90" />
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ↑ 12.5%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] text-red-100 font-medium">Total Users</div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight">
                      {metrics.totalUsers.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 2. Registered Donors */}
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-4 text-white shadow-lg shadow-emerald-600/20 space-y-2 hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center justify-between">
                    <Droplet className="w-5 h-5 opacity-90 fill-white" />
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ↑ 14.2%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-100 font-medium">Registered Donors</div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight">
                      {metrics.registeredDonors.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 3. Verified Donors */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 text-white shadow-lg shadow-blue-600/20 space-y-2 hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center justify-between">
                    <ShieldCheck className="w-5 h-5 opacity-90" />
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ↑ 13.8%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] text-blue-100 font-medium">Verified Donors</div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight">
                      {metrics.verifiedDonors.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 4. Total Donations */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-4 text-white shadow-lg shadow-purple-600/20 space-y-2 hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center justify-between">
                    <Award className="w-5 h-5 opacity-90" />
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ↑ 16.7%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] text-purple-100 font-medium">Total Donations</div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight">
                      {metrics.totalDonations.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 5. Blood Requests */}
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow-lg shadow-amber-500/20 space-y-2 hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="w-5 h-5 opacity-90" />
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ↑ 11.3%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] text-amber-100 font-medium">Blood Requests</div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight">
                      {metrics.activeBloodRequests.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 6. Hospitals & Blood Banks */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-4 text-white shadow-lg shadow-teal-600/20 space-y-2 hover:-translate-y-1 transition duration-200">
                  <div className="flex items-center justify-between">
                    <Building2 className="w-5 h-5 opacity-90" />
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                      ↑ 8.9%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] text-teal-100 font-medium">Hospitals & Banks</div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight">
                      {metrics.hospitalsAndBanks.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Map + Donation Stats + Donut Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Bangladesh Map Card (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#E50914]" />
                      <h3 className="font-bold text-gray-900 text-sm">Bangladesh Donation Map</h3>
                    </div>
                    <Link
                      href="/donors/map"
                      className="text-xs font-bold text-[#E50914] hover:underline"
                    >
                      View Full Map →
                    </Link>
                  </div>

                  <div className="relative h-60 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                    <Image
                      src="/brand/ref_admin_1.jpg"
                      alt="Admin Map"
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 p-4 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                        <span className="flex items-center gap-1 bg-red-600/90 text-white px-2 py-0.5 rounded-md font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Donors
                        </span>
                        <span className="flex items-center gap-1 bg-emerald-600/90 text-white px-2 py-0.5 rounded-md font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Hospitals
                        </span>
                        <span className="flex items-center gap-1 bg-blue-600/90 text-white px-2 py-0.5 rounded-md font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Blood Banks
                        </span>
                      </div>

                      <div className="text-center my-auto">
                        <div className="text-lg font-black text-white">64 Districts Active</div>
                        <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                          ✓ PostGIS Real-time Sync
                        </div>
                      </div>

                      <div className="text-right">
                        <Link
                          href="/donors/map"
                          className="inline-block px-3 py-1 bg-[#E50914] text-white rounded-lg text-xs font-bold hover:bg-[#B80012] transition"
                        >
                          Explore GIS Layer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donation Statistics Line Chart (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#E50914]" />
                      <h3 className="font-bold text-gray-900 text-sm">Donation Statistics</h3>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-[10px] font-bold">
                      {["1M", "3M", "6M", "1Y"].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setSelectedTimeframe(tf)}
                          className={`px-2 py-0.5 rounded-md transition ${
                            selectedTimeframe === tf
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#E50914]" />
                      <span className="text-gray-600 font-medium">Donations</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                      <span className="text-gray-600 font-medium">Donors</span>
                    </span>
                  </div>

                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={DONATION_STATISTICS}>
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0F172A",
                            border: "none",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="donations"
                          stroke="#E50914"
                          strokeWidth={3}
                          dot={{ r: 3, fill: "#E50914" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="donors"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 2, fill: "#3B82F6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Blood Group Distribution Donut (3 cols) */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
                    <h3 className="font-bold text-gray-900 text-sm">Blood Group Share</h3>
                  </div>

                  <div className="h-44 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={BLOOD_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={68}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {BLOOD_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center">
                      <div className="text-xs font-black text-gray-900">125,780</div>
                      <div className="text-[9px] text-gray-400 font-bold">Total</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1 border-t border-gray-100">
                    {BLOOD_DISTRIBUTION.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-bold text-gray-700">{item.name}</span>
                        </span>
                        <span className="text-gray-500 font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reference 2 Matrix Row: District-wise + Top Rated Donors + Role Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* District Distribution Bars (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#E50914]" />
                      <h3 className="font-bold text-gray-900 text-sm">District-wise Donor Distribution</h3>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">View Details →</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {DISTRICT_DISTRIBUTION.map((d) => (
                      <div key={d.name} className="space-y-1">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-gray-700">{d.name}</span>
                          <span className="font-bold text-gray-900">{d.percent}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`${d.color} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${d.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Rated Donors (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <h3 className="font-bold text-gray-900 text-sm">Top Rated Lifesavers</h3>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">View All →</span>
                  </div>

                  <div className="space-y-3">
                    {TOP_RATED_DONORS.map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <Image src={d.avatar} alt={d.name} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900">{d.name}</div>
                            <div className="text-[10px] text-gray-500 flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-red-100 text-[#E50914] font-bold">
                                {d.bloodGroup}
                              </span>
                              <span>{d.donations} Donations</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg text-amber-700 text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{d.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Management Matrix (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <h3 className="font-bold text-gray-900 text-sm">Role Management</h3>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">Manage →</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
                      <div className="text-[10px] text-red-700 font-medium">Donors</div>
                      <div className="text-lg font-black text-red-900">98,750</div>
                    </div>
                    <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                      <div className="text-[10px] text-blue-700 font-medium">Volunteers</div>
                      <div className="text-lg font-black text-blue-900">12,450</div>
                    </div>
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                      <div className="text-[10px] text-amber-700 font-medium">Organizations</div>
                      <div className="text-lg font-black text-amber-900">2,840</div>
                    </div>
                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                      <div className="text-[10px] text-purple-700 font-medium">Hospitals</div>
                      <div className="text-lg font-black text-purple-900">425</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
                    <span className="text-gray-300">Total System Administrators</span>
                    <span className="font-bold text-emerald-400">1,250</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Activity + Pending Approvals + System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Activity Feed (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#E50914]" />
                      <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">View All →</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                      <div className="w-7 h-7 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 leading-tight">
                          New request for B+ at DMCH
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">2 min ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 leading-tight">
                          Donor registration: Rahim Ahmed
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">5 min ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 leading-tight">
                          Donation verified: 2 units at CMCH
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">8 min ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 leading-tight">
                          New organization: Life Care Foundation
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">10 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Approvals Queue (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <h3 className="font-bold text-gray-900 text-sm">Pending Approvals</h3>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">View All →</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Donation Record Verification</span>
                      <span className="font-bold bg-red-100 text-[#E50914] px-2 py-0.5 rounded-full">
                        23
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Hospital Facility Verification</span>
                      <span className="font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        5
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Organization Approval</span>
                      <span className="font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        8
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Volunteer Approval</span>
                      <span className="font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                        12
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">ID Card Physical Reissue</span>
                      <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        18
                      </span>
                    </div>
                  </div>
                </div>

                {/* System Health & Overview (4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-emerald-600" />
                      <h3 className="font-bold text-gray-900 text-sm">System Overview</h3>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      All Systems Operational
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Database (PostgreSQL / Supabase)</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">API & Edge Services</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">PostGIS Geocoding Service</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">SMS & Notification Gateway</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                      </span>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-gray-600">
                        <span>Performance Uptime</span>
                        <span className="font-bold text-gray-900">98.7%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[98.7%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Banner Card from Reference 1 */}
              <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tight">Donate Blood. Save Lives.</h2>
                  <p className="text-sm text-red-100 max-w-xl">
                    Every 2 seconds, someone in Bangladesh needs blood. Join our nationwide network of verified voluntary lifesavers today.
                  </p>
                </div>
                <Link
                  href="/donors/register"
                  className="px-6 py-3 bg-white text-[#E50914] font-black rounded-xl hover:bg-gray-100 shadow-md transition flex items-center gap-2 flex-shrink-0"
                >
                  <span>Donate Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}

          {/* =========================================================================
              TAB: USER MANAGEMENT
              ========================================================================= */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">User Management</h2>
                  <p className="text-xs text-gray-500">
                    Manage 245,780+ registered accounts, assign administrative privileges, and monitor account statuses.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="ALL">All Roles</option>
                    {allRoles.map((r) => (
                      <option key={r} value={r}>
                        {r.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">User Profile</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Assigned Roles</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockDb.getUsers().map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50 transition">
                        <td className="p-3 flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                            <Image
                              src={u.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                              alt={u.fullName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{u.fullName}</div>
                            <div className="text-[10px] text-gray-400">ID: {u.id}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>{u.email}</div>
                          <div className="text-[10px] text-gray-400">{u.phone}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {u.roles.map((r) => (
                              <span
                                key={r}
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800"
                              >
                                {r.replace("_", " ")}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          {u.isSuspended ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                              Suspended
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              mockDb.toggleUserSuspension(u.id);
                              setRefreshKey((k) => k + 1);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              u.isSuspended
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-red-50 text-[#E50914] hover:bg-red-100"
                            }`}
                          >
                            {u.isSuspended ? "Activate" : "Suspend"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: DONOR MANAGEMENT
              ========================================================================= */}
          {activeTab === "donors" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Donor Management</h2>
                  <p className="text-xs text-gray-500">
                    Verify voluntary donors, validate donation history, and monitor medical eligibility.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={donorBloodFilter}
                    onChange={(e) => setDonorBloodFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="ALL">All Blood Groups</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Donor ID & Name</th>
                      <th className="p-3">Blood Group</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Donations</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {donors
                      .filter((d) =>
                        donorBloodFilter === "ALL" ? true : d.bloodGroup === donorBloodFilter
                      )
                      .map((d) => (
                        <tr key={d.id} className="hover:bg-gray-50 transition">
                          <td className="p-3 flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                              <Image
                                src={d.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"}
                                alt={d.fullName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{d.fullName}</div>
                              <div className="text-[10px] text-gray-400 font-mono">{d.humanReadableId}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-[#E50914]">
                              {d.bloodGroup}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-gray-800">{d.divisionId}</div>
                            <div className="text-[10px] text-gray-400 capitalize">{d.districtId}</div>
                          </td>
                          <td className="p-3 font-bold text-gray-900">
                            {d.totalVerifiedDonations} times
                          </td>
                          <td className="p-3">
                            {d.isVerified ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1 w-max">
                                <CheckCircle className="w-3 h-3" /> Verified
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-max">
                                <Clock className="w-3 h-3" /> Unverified
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {!d.isVerified ? (
                              <button
                                onClick={() => handleVerifyDonor(d.id)}
                                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
                              >
                                Verify Now
                              </button>
                            ) : (
                              <Link
                                href={`/donors/${d.id}`}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition inline-block"
                              >
                                View Profile
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: BLOOD REQUEST MANAGEMENT
              ========================================================================= */}
          {activeTab === "requests" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Blood Request Management</h2>
                  <p className="text-xs text-gray-500">
                    Live nationwide hospital requisitions, patient triage, and donor match dispatch.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={requestStatusFilter}
                    onChange={(e) => setRequestStatusFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="searching">Searching Donors</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Hospital & Patient</th>
                      <th className="p-3">Group & Units</th>
                      <th className="p-3">Urgency</th>
                      <th className="p-3">Required Time</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requests
                      .filter((r) =>
                        requestStatusFilter === "ALL" ? true : r.status === requestStatusFilter
                      )
                      .map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50 transition">
                          <td className="p-3">
                            <div className="font-bold text-gray-900">{r.hospitalName}</div>
                            <div className="text-[10px] text-gray-400">
                              Patient: {r.patientName} • {r.medicalReason}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-[#E50914]">
                              {r.bloodGroup}
                            </span>
                            <span className="ml-2 font-bold text-gray-700">{r.unitsNeeded} Units</span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                r.urgency === "critical_emergency"
                                  ? "bg-red-600 text-white animate-pulse"
                                  : r.urgency === "urgent"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {r.urgency === "critical_emergency" ? "Emergency" : r.urgency}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-gray-700">
                            {r.requiredDate} • {r.requiredTime || "Anytime"}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                r.status === "completed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : r.status === "published" || r.status === "searching"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <Link
                              href={`/requests/${r.id}`}
                              className="px-3 py-1 bg-[#E50914] text-white rounded-lg text-xs font-bold hover:bg-[#B80012] transition inline-block"
                            >
                              View & Dispatch
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: ID CARD MANAGEMENT
              ========================================================================= */}
          {activeTab === "id-cards" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">ID Card Management</h2>
                  <p className="text-xs text-gray-500">
                    Monitor cryptographic digital ID cards, QR tokens, and verification status.
                  </p>
                </div>
                <Link
                  href="/id-card"
                  className="px-4 py-2 bg-[#E50914] text-white rounded-xl text-xs font-bold hover:bg-[#B80012] transition"
                >
                  Generate New Card
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Card ID</th>
                      <th className="p-3">Holder Name</th>
                      <th className="p-3">Blood Group</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Issue Date</th>
                      <th className="p-3">Authenticity</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {idCards.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition">
                        <td className="p-3 font-mono font-bold text-gray-900">{c.displayId}</td>
                        <td className="p-3 font-semibold text-gray-800">{c.holderName}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-black bg-red-100 text-[#E50914]">
                            {c.bloodGroup}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-gray-600">{c.role}</td>
                        <td className="p-3 text-gray-500">{c.issueDate}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                            <ShieldCheck className="w-3 h-3" /> Cryptographically Signed
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Link
                            href={`/verify-id/${c.qrToken}`}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-bold hover:bg-gray-200 transition inline-block"
                          >
                            Verify Online
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: SECURITY CENTER
              ========================================================================= */}
          {activeTab === "security" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-black text-gray-900">Platform Security Center</h2>
                <p className="text-xs text-gray-500">
                  Compliance, database policies, role-based controls, and intrusion defenses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Row Level Security (RLS)</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-900">22 / 22 Tables</div>
                  <p className="text-[11px] text-emerald-700">
                    All tables enforce PostgreSQL RLS policies ensuring non-administrative users cannot bypass privacy barriers.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <span>Cryptographic QR Tokens</span>
                  </div>
                  <div className="text-2xl font-black text-blue-900">100% Protected</div>
                  <p className="text-[11px] text-blue-700">
                    Digital cards store non-sequential SHA-256 tokens; personal health data is never exposed in barcodes.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                  <div className="flex items-center gap-2 text-purple-800 font-bold text-sm">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span>Role-Based Access Control</span>
                  </div>
                  <div className="text-2xl font-black text-purple-900">11 RBAC Roles</div>
                  <p className="text-[11px] text-purple-700">
                    Granular permissions from Super Admin to Upazila Coordinator and Voluntary Lifesaver.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: AUDIT LOGS
              ========================================================================= */}
          {activeTab === "audit" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-black text-gray-900">Platform Audit Trail</h2>
                <p className="text-xs text-gray-500">
                  Immutable security audit logging with client fingerprints and timestamped events.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  {
                    action: "DONOR_VERIFIED",
                    actor: "admin@redsavior.org",
                    target: "dnr-001 (Rahim Ahmed)",
                    ip: "103.145.24.18 (Dhaka, BD)",
                    time: "10 mins ago",
                  },
                  {
                    action: "ID_CARD_SCANNED",
                    actor: "Public Web Visitor",
                    target: "RS-DNR-000125",
                    ip: "119.30.38.102 (Chattogram, BD)",
                    time: "24 mins ago",
                  },
                  {
                    action: "BLOOD_REQUEST_CREATED",
                    actor: "dmch.admin@redsavior.org",
                    target: "req-001 (B+ at DMCH)",
                    ip: "103.145.24.20 (Dhaka, BD)",
                    time: "1 hour ago",
                  },
                  {
                    action: "ADMIN_LOGIN_SUCCESS",
                    actor: "admin@redsavior.org",
                    target: "SUPER_ADMIN Session",
                    ip: "103.145.24.18 (Dhaka, BD)",
                    time: "3 hours ago",
                  },
                ].map((log, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-gray-100 font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[10px]">
                        {log.action}
                      </span>
                      <span className="text-gray-800 font-bold">{log.actor}</span>
                      <span className="text-gray-400 text-[11px]">→ {log.target}</span>
                    </div>
                    <div className="text-gray-500 text-[11px] flex items-center gap-3">
                      <span>{log.ip}</span>
                      <span className="text-[#E50914] font-bold">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              BOTTOM BAR: NATIONWIDE IMPACT FOOTPRINT
              ========================================================================= */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇧🇩</span>
              <div>
                <div className="font-extrabold text-gray-900">Our Impact in Bangladesh</div>
                <div className="text-[11px] text-gray-500">A healthier Bangladesh, a kinder society</div>
              </div>
            </div>

            <div className="flex items-center gap-8 text-center font-bold">
              <div>
                <div className="text-sm text-gray-900">8</div>
                <div className="text-[10px] text-gray-400 font-normal">Divisions</div>
              </div>
              <div>
                <div className="text-sm text-gray-900">64</div>
                <div className="text-[10px] text-gray-400 font-normal">Districts</div>
              </div>
              <div>
                <div className="text-sm text-[#E50914]">125K+</div>
                <div className="text-[10px] text-gray-400 font-normal">Lives Touched</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative h-8 w-28">
                <Image
                  src="/brand/logo.png"
                  alt="RedSavior"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
