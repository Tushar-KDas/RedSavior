"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ROLE_PERMISSIONS, PermissionCode } from "@/lib/auth/permissions";
import { ROLES_CONFIG } from "@/lib/auth/roles-config";
import { UserRole } from "@/types";
import {
  Shield,
  KeyRound,
  FileText,
  AlertTriangle,
  Star,
  Bell,
  TrendingUp,
  Settings,
  Server,
  HelpCircle,
  CheckCircle,
  XCircle,
  Radio,
  Download,
  Lock,
  PlusCircle,
  Phone,
  Droplet,
  Send,
} from "lucide-react";

interface AdministrationAndGovernanceModuleProps {
  activeTab: string;
}

const SAMPLE_DONATIONS = [
  { id: "don-01", donor: "Rahim Ahmed (O+)", hospital: "Dhaka Medical College Hospital (DMCH)", date: "Today 11:30 AM", units: 1, type: "Whole Blood", certCode: "RS-CERT-9082", status: "Verified" },
  { id: "don-02", donor: "Tanvir Hasan (B+)", hospital: "Chattogram Medical College Hospital (CMCH)", date: "Yesterday 4:15 PM", units: 1, type: "Packed RBC", certCode: "RS-CERT-9081", status: "Verified" },
  { id: "don-03", donor: "Ayesha Akter (A+)", hospital: "Sir Salimullah Medical College (Mitford)", date: "2 days ago", units: 1, type: "Whole Blood", certCode: "RS-CERT-9079", status: "Pending Doctor Verification" },
];

const SAMPLE_COMPLAINTS = [
  { id: "cmp-01", complainant: "Dr. Nazmul (DMCH)", subject: "Donor did not show up after emergency confirmation", urgency: "High", date: "2 hours ago", status: "Investigating" },
  { id: "cmp-02", complainant: "Kazi Farhan (Recipient)", subject: "Hospital counter demanded extra testing fee", urgency: "Urgent", date: "5 hours ago", status: "Escalated to DGHS" },
  { id: "cmp-03", complainant: "Mst. Salma (Volunteer)", subject: "Blood bank storage refrigerator temperature fluctuation", urgency: "Critical", date: "Yesterday", status: "Resolved" },
];

const SAMPLE_REVIEWS = [
  { id: "rev-01", donor: "Rahim Ahmed", rating: 5, reviewer: "Kamrul Islam", text: "Came immediately within 30 minutes to DMCH ICU. Saved my mother's life! May Allah bless him.", status: "Approved" },
  { id: "rev-02", donor: "Ayesha Akter", rating: 5, reviewer: "Fatema Begum", text: "Very polite, came on time for surgery transfusion. Highly recommended lifesaver.", status: "Approved" },
  { id: "rev-03", donor: "Tanvir Hasan", rating: 4, reviewer: "Sabbir Hossain", text: "Prompt response. Smooth donation process at CMCH.", status: "Pending Moderation" },
];

export function AdministrationAndGovernanceModule({
  activeTab,
}: AdministrationAndGovernanceModuleProps) {
  const [announcementText, setAnnouncementText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setBroadcastSent(true);
    setAnnouncementText("");
    setTimeout(() => setBroadcastSent(false), 3500);
  };

  // Determine section based on activeTab
  const isRolesView = ["roles-permissions"].includes(activeTab);
  const isDonationsView = [
    "donations",
    "donation-mgmt",
    "donation-activities",
    "donation-history",
    "transfusion-records",
  ].includes(activeTab);
  const isComplaintsView = ["complaints"].includes(activeTab);
  const isReviewsView = ["ratings-reviews"].includes(activeTab);
  const isNotificationsView = [
    "notifications-mgmt",
    "notifications",
    "announcements",
    "media",
  ].includes(activeTab);
  const isReportsView = ["analytics", "reports", "local-reports"].includes(activeTab);
  const isBackupView = ["backup", "system-config"].includes(activeTab);
  const isSupportView = ["support"].includes(activeTab);
  const isSettingsView = ["settings"].includes(activeTab);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-6">
      {/* SECTION 1: Role & Permission Management (RBAC MATRIX) */}
      {isRolesView && (
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-red-600" />
              <span>Role-Based Access Control (RBAC) Permission Matrix</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Active permission resolution across all 11 RedSavior personas and PostgreSQL RLS security definers.
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-3">Role Code</th>
                  <th className="p-3">Portal Title</th>
                  <th className="p-3">Hierarchy</th>
                  <th className="p-3">Sidebar Menus</th>
                  <th className="p-3">Permissions Granted</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(Object.keys(ROLES_CONFIG) as UserRole[]).map((role) => {
                  const config = ROLES_CONFIG[role];
                  const perms = ROLE_PERMISSIONS[role] || [];

                  return (
                    <tr key={role} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-mono font-bold text-slate-900">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${config.badgeBg} ${config.badgeText}`}>
                          {role}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-800">{config.title}</td>
                      <td className="p-3 font-mono text-gray-500">
                        {role === "SUPER_ADMIN" ? "Level 1 (Highest)" : "Level Scoped"}
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {config.sidebarItems.length} Modules
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-700">{perms.length} Permissions</span>
                        <div className="text-[10px] text-gray-400 truncate max-w-xs mt-0.5">
                          {perms.slice(0, 4).join(", ")}...
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Active & Enforced
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: Donation Verification & Transfusions */}
      {isDonationsView && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
                <span>Donation Verification & Transfusion Ledger</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Clinical donation logs, doctor verification stamps, and cryptographic certificate codes.
              </p>
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
              Verify Pending Logs
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-3.5">Donor & Group</th>
                  <th className="p-3.5">Hospital / Facility</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Units & Component</th>
                  <th className="p-3.5">Certificate Code</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SAMPLE_DONATIONS.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 font-bold text-slate-900">{d.donor}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{d.hospital}</td>
                    <td className="p-3.5 text-gray-500">{d.date}</td>
                    <td className="p-3.5 font-bold text-slate-800">{d.units} Unit ({d.type})</td>
                    <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">{d.certCode}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === "Verified" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button className="px-3 py-1 rounded-lg border text-xs font-bold hover:bg-slate-50">
                        View Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: Complaints Desk */}
      {isComplaintsView && (
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Patient & Volunteer Complaint Tickets</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Active incident reporting, hospital service feedback, and disciplinary follow-ups.
            </p>
          </div>

          <div className="space-y-3">
            {SAMPLE_COMPLAINTS.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl border border-gray-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{c.subject}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      c.urgency === "Critical" ? "bg-red-600 text-white" : c.urgency === "Urgent" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {c.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Filed by: <strong>{c.complainant}</strong> · {c.date} · Status: <span className="text-indigo-600 font-bold">{c.status}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
                    Resolve Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Ratings & Reviews Moderation */}
      {isReviewsView && (
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Rating & Review Moderation Queue</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Verify feedback authenticity, approve positive testimonials, and prevent spam ratings.
            </p>
          </div>

          <div className="space-y-3">
            {SAMPLE_REVIEWS.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl border border-gray-200/80 bg-slate-50/60 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">For Donor: {r.donor}</span>
                    <span className="flex items-center text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md">
                      {"★".repeat(r.rating)} ({r.rating}.0)
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic mt-1.5">&ldquo;{r.text}&rdquo;</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">Reviewer: {r.reviewer}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-gray-200 text-gray-600 hover:bg-rose-500 hover:text-white">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: Notification Management & Emergency Broadcast */}
      {isNotificationsView && (
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-600" />
              <span>Notification Center & Emergency Broadcast System</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Dispatch push notifications, nationwide SMS broadcasts, and critical emergency sirens.
            </p>
          </div>

          {broadcastSent && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Emergency Broadcast dispatched successfully to 89,420+ registered donors and volunteers!</span>
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <label className="text-xs font-bold text-slate-800 block">
              Compose Emergency Broadcast (SMS & In-App Notification)
            </label>
            <textarea
              rows={3}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. URGENT: Critical blood requisition for 4 units O- at DMCH Burn Unit. Ready donors please check app..."
              className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E50914] focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500">
                Target: All 64 Districts · Broadcast Gateway: Active
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Nationwide Alert</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 6: Analytics & Export Reports */}
      {isReportsView && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Platform Reports & Analytical Telemetry</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Download nationwide CSV reports, blood group deficits, and operational fulfillment metrics.
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
              <Download className="w-3.5 h-3.5 text-red-400" />
              <span>Export CSV Audit Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500">Monthly Fulfillment Rate</span>
              <div className="text-2xl font-black text-slate-900">94.8%</div>
              <p className="text-[10px] text-emerald-600 font-bold">↑ 2.4% vs previous quarter</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500">Average Emergency Response</span>
              <div className="text-2xl font-black text-slate-900">18.4 mins</div>
              <p className="text-[10px] text-gray-400 font-medium">From alert to donor acceptance</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500">Donor Retention Rate</span>
              <div className="text-2xl font-black text-slate-900">72.1%</div>
              <p className="text-[10px] text-indigo-600 font-bold">Repeat voluntary lifesavers</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: Backup, Technical Config & Settings */}
      {(isBackupView || isSettingsView) && (
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Server className="w-5 h-5 text-slate-700" />
              <span>System Configuration & Backup Recovery</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Database snapshot schedules, rate limit governors, and platform metadata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Automated Database Snapshots</span>
              <p className="text-[11px] text-gray-500">Daily WAL archives and PostGIS point-in-time recovery active.</p>
              <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
                Create Instant Backup Snapshot
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">SMS Gateway API Quotas</span>
              <p className="text-[11px] text-gray-500">Govt. ICT Division SMS Gateway: 48,200 messages remaining this month.</p>
              <span className="text-[10px] font-bold text-emerald-600">Status: Operational (HTTP 200)</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: Support Center */}
      {isSupportView && (
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-600" />
              <span>National Lifesaver Support & Escalation Desk</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              24/7 technical assistance for hospital administrators, donors, and patient families.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-red-200">Emergency Telephone Helpline</span>
              <h3 className="text-2xl font-black mt-1">+880 1711 123456</h3>
              <p className="text-xs text-red-100 mt-1">Available 24 hours nationwide across all 64 districts.</p>
            </div>
            <a
              href="tel:+8801711123456"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition shadow-md inline-block text-center"
            >
              Dial Emergency Helpline
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
