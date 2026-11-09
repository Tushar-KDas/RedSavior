"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Droplet,
  Heart,
  QrCode,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  AlertTriangle,
  Star,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Download,
} from "lucide-react";

interface DonorDashboardProps {
  donorName?: string;
  bloodGroup?: string;
  donorId?: string;
  onNavigateTab: (tabId: string) => void;
}

const MATCHED_URGENT_REQUESTS = [
  {
    id: "req-match-01",
    patient: "Tahmina Khatun (Cesarean)",
    hospital: "Dhaka Medical College Hospital (DMCH)",
    bloodGroup: "O+",
    unitsNeeded: 2,
    urgency: "CRITICAL",
    distance: "3.2 km away",
    phone: "+8801711223344",
  },
  {
    id: "req-match-02",
    patient: "Faruk Hossain (Accident Trauma)",
    hospital: "National Institute of Traumatology (NITOR)",
    bloodGroup: "O+",
    unitsNeeded: 1,
    urgency: "URGENT",
    distance: "5.1 km away",
    phone: "+8801819334455",
  },
];

export function DonorDashboard({
  donorName = "Rahim Ahmed",
  bloodGroup = "O+",
  donorId = "RS-DNR-000125",
  onNavigateTab,
}: DonorDashboardProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [toggleNotice, setToggleNotice] = useState<string | null>(null);

  const handleToggle = () => {
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    setToggleNotice(
      nextState
        ? "✓ You are now marked as AVAILABLE for emergency requests in your area."
        : "You are now marked as TEMPORARILY ON REST. Emergency calls paused."
    );
    setTimeout(() => setToggleNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Lifesaver Donor Console
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-[#E50914] border border-red-200 flex items-center gap-1">
              <Droplet className="w-3 h-3 fill-red-600 text-red-600" />
              <span>{bloodGroup} Verified Lifesaver</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Welcome back, {donorName}! Thank you for standing ready to save lives nationwide.
          </p>
        </div>

        {/* Interactive Availability Toggle */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-gray-200/90 shadow-sm">
          <div className="text-right">
            <div className="text-xs font-black text-slate-900">
              {isAvailable ? "Ready to Donate" : "Temporarily On Rest"}
            </div>
            <p className="text-[10px] text-gray-400">
              {isAvailable ? "Emergency requests visible" : "Calls paused"}
            </p>
          </div>

          <button
            onClick={handleToggle}
            className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isAvailable ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isAvailable ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {toggleNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
          {toggleNotice}
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Donations */}
        <div
          onClick={() => onNavigateTab("donation-history")}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#E50914] to-red-700 text-white shadow-lg shadow-red-500/15 cursor-pointer hover:scale-[1.02] transition"
        >
          <div className="flex items-center justify-between text-xs text-red-100 font-bold uppercase">
            <span>Verified Donations</span>
            <Droplet className="w-4 h-4 fill-white text-white" />
          </div>
          <div className="text-3xl font-black mt-2">25 Times</div>
          <p className="text-[11px] text-red-100 mt-1">Regular voluntary lifesaver</p>
        </div>

        {/* Lives Impacted */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Lives Impacted</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">75+ Lives</div>
          <p className="text-[11px] text-gray-400 mt-1">Approx 3 lives saved per donation</p>
        </div>

        {/* Next Eligible Donation */}
        <div
          onClick={() => onNavigateTab("health-log")}
          className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Donation Eligibility</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-2">Eligible Today</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Last donation was 90+ days ago</p>
        </div>

        {/* Rating & Recognition */}
        <div
          onClick={() => onNavigateTab("ratings-reviews")}
          className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase">
            <span>Donor Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-900 mt-2">5.0 ★</div>
          <p className="text-[11px] text-amber-700/80 mt-1">18 Verified patient reviews</p>
        </div>
      </div>

      {/* Row 2: Digital ID Card Preview & Urgent Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Digital ID Card High-Fidelity Preview */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#E50914]" />
                <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  My Official Lifesaver Card
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Active & Verified
              </span>
            </div>

            {/* RedSavior Donor Card Visual Representation */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#0B1120] via-slate-900 to-[#1E293B] text-white shadow-xl relative overflow-hidden border border-slate-700/80">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs">
                    RS
                  </div>
                  <div>
                    <h4 className="font-black text-sm tracking-wide">RedSavior</h4>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider">Lifesaver ID</p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-red-600/90 border border-red-400 text-white flex items-center justify-center font-black text-base shadow-md">
                  {bloodGroup}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-500 shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
                    alt={donorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">{donorName}</h5>
                  <p className="text-xs text-gray-300 font-mono mt-0.5">{donorId}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                    ✓ Verified Blood Donor
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-gray-400">
                <span>Issue: Jan 2024</span>
                <span>Donations: 25</span>
                <span className="font-mono text-gray-300">QR Cryptotoken: Valid</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/id-card"
              className="text-xs font-bold text-[#E50914] hover:underline flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Full Screen & QR Verification</span>
            </Link>
            <Link
              href="/verify-id"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
            >
              <span>Verify Token</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Urgent Requests Matching My Blood Group */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  Urgent Requisitions Matching {bloodGroup} Near You
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                2 Matches in Dhaka
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {MATCHED_URGENT_REQUESTS.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{req.patient}</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                        {req.bloodGroup} · {req.unitsNeeded} Units
                      </span>
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                        {req.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {req.hospital} · <strong>{req.distance}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`tel:${req.phone}`}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                    >
                      Respond & Call
                    </a>
                    <Link
                      href="/requests"
                      className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-slate-800 text-xs font-bold hover:bg-gray-50 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Need blood for a family member?</span>
            <Link href="/requests/create" className="text-[#E50914] font-bold hover:underline">
              Post Blood Request →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
