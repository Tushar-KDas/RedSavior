"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  Heart,
  PlusCircle,
  Users,
  MessageSquare,
  MapPin,
  KeyRound,
  Clock,
  CheckCircle,
  PhoneCall,
  ArrowRight,
  Hospital,
  AlertTriangle,
} from "lucide-react";

interface RecipientDashboardProps {
  recipientName?: string;
  onNavigateTab: (tabId: string) => void;
}

const RESPONDING_DONORS = [
  {
    id: "resp-01",
    name: "Tanvir Hasan",
    bloodGroup: "O+",
    phone: "+8801913000003",
    status: "Confirmed & En Route",
    eta: "Arriving in 20 mins",
    verifiedDonations: 18,
  },
  {
    id: "resp-02",
    name: "Rahim Ahmed",
    bloodGroup: "O+",
    phone: "+8801711000001",
    status: "Ready on Standby",
    eta: "Available within 45 mins",
    verifiedDonations: 25,
  },
];

export function RecipientDashboard({
  recipientName = "Recipient / Patient Family",
  onNavigateTab,
}: RecipientDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Patient & Emergency Requisition Center
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 border border-violet-200">
              Active Patient Case
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Track live voluntary donor responses, coordinate hospital arrival, and verify transfusions.
          </p>
        </div>

        <Link
          href="/requests/create"
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm transition"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Emergency Requisition</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Requisition */}
        <div
          onClick={() => onNavigateTab("my-requests")}
          className="p-5 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg shadow-red-500/15 cursor-pointer hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between text-xs text-red-100 font-bold uppercase">
            <span>Active Request</span>
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black mt-2">1 Live</div>
          <p className="text-[11px] text-red-100 mt-1">O+ Needed at DMCH ICU</p>
        </div>

        {/* Responding Donors */}
        <div
          onClick={() => onNavigateTab("donor-responses")}
          className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Responding Donors</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">2 Donors</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">1 En route to hospital</p>
        </div>

        {/* Verification OTP */}
        <div
          onClick={() => onNavigateTab("verification-otp")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Hospital Transfusion OTP</span>
            <KeyRound className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 tracking-widest font-mono">
            749-218
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Share with attending nurse upon arrival</p>
        </div>

        {/* Hospital Contact */}
        <div
          onClick={() => onNavigateTab("hospital-directions")}
          className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold uppercase">
            <span>Hospital Blood Bank</span>
            <Hospital className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-base font-black text-blue-900 mt-2 truncate">DMCH Transfusion</div>
          <p className="text-[11px] text-blue-700/80 mt-1">Room 204, 2nd Floor, Main Building</p>
        </div>
      </div>

      {/* Row 2: 5-Step Visual Progress Tracker */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              Live Tracker · Case #REQ-2026-0042
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              Requisition Progress: 2 Units O+ for Tahmina Khatun
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Donor Responded
          </span>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xs font-black text-emerald-900 block mt-1">1. Submitted</span>
            <p className="text-[10px] text-emerald-700">Verified by platform</p>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xs font-black text-emerald-900 block mt-1">2. Broadcasted</span>
            <p className="text-[10px] text-emerald-700">Alerted 85 nearby donors</p>
          </div>

          {/* Step 3: Active */}
          <div className="p-3 rounded-xl bg-red-50 border-2 border-red-500 text-center shadow-sm">
            <div className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center mx-auto animate-pulse">
              3
            </div>
            <span className="text-xs font-black text-red-900 block mt-1">3. Donor Responded</span>
            <p className="text-[10px] text-red-700 font-bold">2 Donors Confirmed</p>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 text-center opacity-60">
            <Clock className="w-5 h-5 text-gray-400 mx-auto" />
            <span className="text-xs font-bold text-gray-600 block mt-1">4. At Hospital</span>
            <p className="text-[10px] text-gray-400">Screening & collection</p>
          </div>

          {/* Step 5 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-gray-200 text-center opacity-60">
            <Clock className="w-5 h-5 text-gray-400 mx-auto" />
            <span className="text-xs font-bold text-gray-600 block mt-1">5. Transfused</span>
            <p className="text-[10px] text-gray-400">Doctor verification</p>
          </div>
        </div>
      </div>

      {/* Row 3: Responding Donors Contact Cards */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Confirmed Lifesavers En Route
            </h3>
            <p className="text-[10px] text-gray-400">Direct contact available for urgent medical coordination</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700">2 Voluntary Donors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {RESPONDING_DONORS.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">{d.name}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                    {d.bloodGroup}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    {d.verifiedDonations} donations
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-800 mt-1">{d.status}</p>
                <p className="text-[11px] text-gray-500">{d.eta}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`tel:${d.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Donor</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
