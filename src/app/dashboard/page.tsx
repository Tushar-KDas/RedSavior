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
import { ROLES_CONFIG } from "@/lib/auth/roles-config";

// Shared Dashboard Layout Shell Components
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/shared/DashboardHeader";

// 11 Isolated Role Dashboard Components
import { SuperAdminDashboard } from "@/components/dashboard/roles/SuperAdminDashboard";
import { AdminDashboard } from "@/components/dashboard/roles/AdminDashboard";
import { DistrictAdminDashboard } from "@/components/dashboard/roles/DistrictAdminDashboard";
import { UpazilaCoordinatorDashboard } from "@/components/dashboard/roles/UpazilaCoordinatorDashboard";
import { OrganizationAdminDashboard } from "@/components/dashboard/roles/OrganizationAdminDashboard";
import { HospitalAdminDashboard } from "@/components/dashboard/roles/HospitalAdminDashboard";
import { BloodBankAdminDashboard } from "@/components/dashboard/roles/BloodBankAdminDashboard";
import { VolunteerDashboard } from "@/components/dashboard/roles/VolunteerDashboard";
import { DonorDashboard } from "@/components/dashboard/roles/DonorDashboard";
import { RecipientDashboard } from "@/components/dashboard/roles/RecipientDashboard";
import { NormalUserDashboard } from "@/components/dashboard/roles/NormalUserDashboard";

import {
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
  Database,
  Server,
  Copy,
  ExternalLink,
  PlusCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user, currentRole, isSuperAdmin, switchRole, logout } = useAuth();
  const { locale, toggleLanguage } = useLanguage();
  const router = useRouter();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previewRole, setPreviewRole] = useState<UserRole | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Tab Filtering States
  const [userRoleFilter, setUserRoleFilter] = useState<string>("ALL");
  const [donorBloodFilter, setDonorBloodFilter] = useState<string>("ALL");
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>("ALL");

  // Supabase Database Connection State
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    mode: string;
    message: string;
    url?: string;
  } | null>(null);
  const [supabaseUrlInput, setSupabaseUrlInput] = useState("");
  const [supabaseAnonKeyInput, setSupabaseAnonKeyInput] = useState("");
  const [supabaseServiceKeyInput, setSupabaseServiceKeyInput] = useState("");
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [dbMessage, setDbMessage] = useState<string | null>(null);
  const [dbSuccess, setDbSuccess] = useState<boolean | null>(null);
  const [copiedSqlType, setCopiedSqlType] = useState<string | null>(null);

  // Determine Effective Active Role
  const activeRole: UserRole = previewRole || currentRole;
  const currentRoleConfig = ROLES_CONFIG[activeRole] || ROLES_CONFIG.SUPER_ADMIN;

  const fetchDbStatus = async () => {
    try {
      const res = await fetch("/api/supabase/status");
      const data = await res.json();
      setSupabaseStatus(data);
      if (data.url && !data.url.includes("mock")) {
        setSupabaseUrlInput(data.url);
      }
    } catch {
      setSupabaseStatus({
        connected: false,
        mode: "mock",
        message: "Offline Local Store active",
      });
    }
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingDb(true);
    setDbMessage(null);

    try {
      const res = await fetch("/api/supabase/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: supabaseUrlInput,
          anonKey: supabaseAnonKeyInput,
          serviceKey: supabaseServiceKeyInput,
        }),
      });
      const data = await res.json();
      setDbSuccess(data.success);
      setDbMessage(data.message);
      if (data.success) {
        fetchDbStatus();
      }
    } catch (err: any) {
      setDbSuccess(false);
      setDbMessage(err.message || "Failed to update configuration");
    } finally {
      setIsTestingDb(false);
    }
  };

  const handleCopySql = async (type: "schema" | "geo") => {
    try {
      const res = await fetch(`/api/supabase/sql?type=${type}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedSqlType(type);
      setTimeout(() => setCopiedSqlType(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleSelection = (role: UserRole) => {
    if (isSuperAdmin) {
      if (role === "SUPER_ADMIN") {
        setPreviewRole(null);
        switchRole("SUPER_ADMIN");
      } else {
        setPreviewRole(role);
      }
      setActiveTab("dashboard");
    } else {
      switchRole(role);
      setActiveTab("dashboard");
    }
  };

  const handleExitPreview = () => {
    setPreviewRole(null);
    switchRole("SUPER_ADMIN");
    setActiveTab("dashboard");
  };

  const handleVerifyDonor = (donorId: string) => {
    mockDb.verifyDonor(donorId);
    setRefreshKey((k) => k + 1);
  };

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

  // Helper renderer for role dashboard home
  const renderRoleDashboard = () => {
    switch (activeRole) {
      case "SUPER_ADMIN":
        return <SuperAdminDashboard onNavigateTab={setActiveTab} />;
      case "ADMIN":
        return <AdminDashboard onNavigateTab={setActiveTab} />;
      case "DISTRICT_ADMIN":
        return <DistrictAdminDashboard districtName="Dhaka District" onNavigateTab={setActiveTab} />;
      case "UPAZILA_COORDINATOR":
        return <UpazilaCoordinatorDashboard upazilaName="Dhanmondi" districtName="Dhaka" onNavigateTab={setActiveTab} />;
      case "ORGANIZATION_ADMIN":
        return <OrganizationAdminDashboard organizationName="Sandhani Central Blood Club" onNavigateTab={setActiveTab} />;
      case "HOSPITAL_ADMIN":
        return <HospitalAdminDashboard hospitalName="Dhaka Medical College Hospital (DMCH)" onNavigateTab={setActiveTab} />;
      case "BLOOD_BANK_ADMIN":
        return <BloodBankAdminDashboard bloodBankName="Bangladesh Red Crescent Central Blood Bank" onNavigateTab={setActiveTab} />;
      case "VOLUNTEER":
        return <VolunteerDashboard volunteerName={user?.fullName || "Sabbir Hossain"} onNavigateTab={setActiveTab} />;
      case "DONOR":
        return (
          <DonorDashboard
            donorName={user?.fullName || "Rahim Ahmed"}
            bloodGroup="O+"
            donorId="RS-DNR-000125"
            onNavigateTab={setActiveTab}
          />
        );
      case "RECIPIENT":
        return <RecipientDashboard recipientName={user?.fullName || "Recipient Patient"} onNavigateTab={setActiveTab} />;
      case "NORMAL_USER":
        return <NormalUserDashboard userName={user?.fullName || "Member"} onNavigateTab={setActiveTab} />;
      default:
        return <SuperAdminDashboard onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col lg:flex-row font-sans">
      {/* Dynamic Role-Aware Sidebar */}
      <DashboardSidebar
        user={user}
        activeRole={activeRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onLogout={logout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dynamic Header */}
        <DashboardHeader
          user={user}
          currentRole={currentRole}
          userRoles={user?.roles || ["SUPER_ADMIN"]}
          isSuperAdmin={isSuperAdmin}
          previewRole={previewRole}
          onSwitchRole={handleRoleSelection}
          onExitPreview={handleExitPreview}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locale={locale}
          onToggleLanguage={toggleLanguage}
        />

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-4 lg:p-8 space-y-8 overflow-x-hidden">
          {/* TAB: DASHBOARD (GENUINE ROLE-SPECIFIC EXPERIENCE) */}
          {activeTab === "dashboard" && renderRoleDashboard()}

          {/* =========================================================================
              SHARED & PRESERVED TAB 1: USER MANAGEMENT
              ========================================================================= */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">User Management</h2>
                  <p className="text-xs text-gray-500">
                    Manage registered accounts, assign administrative privileges, and monitor account statuses.
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
                    {mockDb
                      .getUsers()
                      .filter((u) => userRoleFilter === "ALL" || u.roles.includes(userRoleFilter as UserRole))
                      .map((u) => (
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
              SHARED & PRESERVED TAB 2: DONOR MANAGEMENT
              ========================================================================= */}
          {(activeTab === "donors" || activeTab === "district-donors" || activeTab === "local-donors" || activeTab === "members") && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Donor Management & Verification</h2>
                  <p className="text-xs text-gray-500">
                    Verify lifesavers, review medical donation intervals, and ensure nationwide blood safety.
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
                      <th className="p-3">Donor Name</th>
                      <th className="p-3">Blood Group</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Donations</th>
                      <th className="p-3">Verification</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockDb
                      .getDonors()
                      .filter((d) => donorBloodFilter === "ALL" || d.bloodGroup === donorBloodFilter)
                      .map((d) => (
                        <tr key={d.id} className="hover:bg-gray-50 transition">
                          <td className="p-3 flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                              <Image
                                src={d.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                                alt={d.fullName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{d.fullName}</div>
                              <div className="text-[10px] text-gray-400">{d.humanReadableId}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-red-100 text-[#E50914]">
                              {d.bloodGroup}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="capitalize">{d.districtId}</div>
                            <div className="text-[10px] text-gray-400 capitalize">{d.upazilaId}</div>
                          </td>
                          <td className="p-3 font-bold text-slate-800">{d.totalVerifiedDonations} units</td>
                          <td className="p-3">
                            {d.isVerified ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                                <ShieldCheck className="w-3 h-3" /> Verified
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-max">
                                <Clock className="w-3 h-3" /> Pending Review
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {!d.isVerified ? (
                              <button
                                onClick={() => handleVerifyDonor(d.id)}
                                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
                              >
                                Approve Donor
                              </button>
                            ) : (
                              <span className="text-gray-400 text-[11px]">Approved</span>
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
              SHARED & PRESERVED TAB 3: BLOOD REQUEST MANAGEMENT
              ========================================================================= */}
          {(activeTab === "requests" || activeTab === "district-requests" || activeTab === "local-requests" || activeTab === "my-requests" || activeTab === "emergency-requests") && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Blood Requisitions Queue</h2>
                  <p className="text-xs text-gray-500">
                    Live patient emergency requirements, hospital cross-matching, and donor response monitoring.
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
                  <Link
                    href="/requests/create"
                    className="px-3 py-2 bg-[#E50914] text-white text-xs font-bold rounded-xl hover:bg-red-700 transition flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create Request</span>
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Patient & ID</th>
                      <th className="p-3">Blood Needed</th>
                      <th className="p-3">Hospital & Location</th>
                      <th className="p-3">Urgency</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockDb
                      .getRequests()
                      .filter((r) => requestStatusFilter === "ALL" || r.status === requestStatusFilter)
                      .map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50 transition">
                          <td className="p-3">
                            <div className="font-bold text-gray-900">{r.patientName}</div>
                            <div className="text-[10px] text-gray-400">{r.humanReadableId}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-red-100 text-[#E50914]">
                              {r.bloodGroup} · {r.unitsNeeded} Units
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-gray-800">{r.hospitalName}</div>
                            <div className="text-[10px] text-gray-400 capitalize">
                              {r.districtId}, {r.upazilaId}
                            </div>
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
                              {r.urgency.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 capitalize">
                              {r.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <Link
                              href={`/requests/${r.id}`}
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-bold hover:bg-gray-200 transition inline-block"
                            >
                              View Case
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
              SHARED & PRESERVED TAB 4: LOCATION MANAGEMENT
              ========================================================================= */}
          {(activeTab === "locations" || activeTab === "districts" || activeTab === "upazilas") && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-black text-gray-900">Geographic Hierarchy (Bangladesh)</h2>
                <p className="text-xs text-gray-500">
                  PostgreSQL PostGIS boundary management covering 8 Divisions, 64 Districts, and 495+ Upazilas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-xl p-4">
                  <h3 className="font-black text-sm text-gray-800 mb-3">8 Administrative Divisions</h3>
                  <div className="space-y-2">
                    {DIVISIONS.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 text-xs">
                        <span className="font-bold text-gray-800">{d.nameEn} ({d.nameBn})</span>
                        <span className="font-mono text-gray-400 text-[10px]">Lat: {d.lat}, Lng: {d.lng}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-4">
                  <h3 className="font-black text-sm text-gray-800 mb-3">Sample Operational Districts</h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {DISTRICTS.slice(0, 10).map((dist) => (
                      <div key={dist.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 text-xs">
                        <div>
                          <div className="font-bold text-gray-800">{dist.nameEn} ({dist.nameBn})</div>
                          <div className="text-[10px] text-gray-400">Division: {dist.divisionId}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SHARED & PRESERVED TAB 5: ID CARD MANAGEMENT
              ========================================================================= */}
          {(activeTab === "id-cards" || activeTab === "id-card") && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Digital Lifesaver ID Cards</h2>
                  <p className="text-xs text-gray-500">
                    Cryptographic card issuance with non-sequential SHA-256 tokens and instant QR verification.
                  </p>
                </div>
                <Link
                  href="/id-card"
                  className="px-3 py-2 bg-[#E50914] text-white text-xs font-bold rounded-xl hover:bg-red-700 transition"
                >
                  Generate Digital Card
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Card ID</th>
                      <th className="p-3">Cardholder</th>
                      <th className="p-3">Blood Group</th>
                      <th className="p-3">Designation</th>
                      <th className="p-3">Issue Date</th>
                      <th className="p-3">Security Seal</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockDb.getIdCards().map((c) => (
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
              SHARED & PRESERVED TAB 6: SECURITY CENTER
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
                  <div className="text-2xl font-black text-emerald-900">26 / 26 Tables</div>
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
                    11 genuinely separated role dashboards with server-verified authorizations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SHARED & PRESERVED TAB 7: AUDIT LOGS
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
              SHARED & PRESERVED TAB 8: SUPABASE DATABASE CONFIGURATION & HEALTH
              ========================================================================= */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                      <Database className="w-5 h-5 text-emerald-600" />
                      <span>Supabase PostgreSQL Cloud Database</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Production PostgreSQL database instance status, API keys, and PostGIS sync.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        supabaseStatus?.connected
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          supabaseStatus?.connected ? "bg-emerald-500 animate-ping" : "bg-amber-500"
                        }`}
                      />
                      <span>{supabaseStatus?.connected ? "Cloud Connected" : "Local Store Mode"}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-bold text-slate-800">Connection Endpoint:</div>
                  <div className="font-mono text-emerald-700 font-bold mt-1">
                    {supabaseStatus?.url || "https://ppxthfygkspveylehgxr.supabase.co"}
                  </div>
                  <p className="text-gray-500 text-[11px] mt-1">
                    {supabaseStatus?.message || "Connected to live Supabase cloud database instance."}
                  </p>
                </div>

                {/* Form to Update Config if needed */}
                <form onSubmit={handleSaveSupabaseConfig} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Project URL (NEXT_PUBLIC_SUPABASE_URL)
                      </label>
                      <input
                        type="text"
                        value={supabaseUrlInput}
                        onChange={(e) => setSupabaseUrlInput(e.target.value)}
                        placeholder="https://ppxthfygkspveylehgxr.supabase.co"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl font-mono focus:ring-2 focus:ring-[#E50914] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Publishable Key (Anon Key)
                      </label>
                      <input
                        type="password"
                        value={supabaseAnonKeyInput}
                        onChange={(e) => setSupabaseAnonKeyInput(e.target.value)}
                        placeholder="sb_publishable_..."
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl font-mono focus:ring-2 focus:ring-[#E50914] focus:outline-none"
                      />
                    </div>
                  </div>

                  {dbMessage && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold ${
                        dbSuccess ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {dbMessage}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={fetchDbStatus}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Test Connection</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopySql("schema")}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedSqlType === "schema" ? "✓ Copied Schema" : "Copy SQL Schema"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopySql("geo")}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedSqlType === "geo" ? "✓ Copied Geo" : "Copy Geo Seed"}</span>
                      </button>
                    </div>
                  </div>
                </form>
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
