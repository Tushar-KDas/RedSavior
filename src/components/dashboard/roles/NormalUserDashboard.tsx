"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Droplet,
  PlusCircle,
  Bookmark,
  Building2,
  Calendar,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface NormalUserDashboardProps {
  userName?: string;
  onNavigateTab: (tabId: string) => void;
}

const ELIGIBILITY_POINTS = [
  "Age between 18 and 65 years",
  "Weight at least 45 kg (48 kg for women)",
  "No major surgery in the last 6 months",
  "Normal blood pressure and hemoglobin (>12.5 g/dL)",
];

const RECENT_CAMPS = [
  {
    id: "c-01",
    title: "Dhanmondi Voluntary Blood Camp",
    venue: "Rabindra Sarobar, Dhanmondi",
    date: "This Saturday",
  },
  {
    id: "c-02",
    title: "Chattogram Youth Lifesaver Drive",
    venue: "CRB Open Grounds, Chattogram",
    date: "Next Sunday",
  },
];

export function NormalUserDashboard({
  userName = "Member",
  onNavigateTab,
}: NormalUserDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Hero Callout Banner: Become a Donor */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-[#E50914] to-rose-700 text-white p-6 sm:p-8 shadow-xl shadow-red-500/20 border border-red-500">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Lifesaver Community</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            One Bag of Blood Can Save Up to 3 Lives
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mt-2 leading-relaxed">
            Welcome, {userName}! You are a registered member of Bangladesh&apos;s RedSavior Network.
            Complete your donor profile to receive your verified digital ID card and save lives.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/donors/register"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 shadow-md transition flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-red-600 fill-red-600" />
              <span>Apply to Become a Donor</span>
            </Link>
            <Link
              href="/requests/create"
              className="px-5 py-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 border border-white/30 text-white font-bold text-xs transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Emergency Blood Request</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Donor Status */}
        <div
          onClick={() => onNavigateTab("become-donor")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Donor Registration</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-2">Not Yet Registered</div>
          <p className="text-[11px] text-[#E50914] font-bold mt-1">Click to start application →</p>
        </div>

        {/* Saved Donors */}
        <div
          onClick={() => onNavigateTab("saved-donors")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Saved Donors</span>
            <Bookmark className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">3 Donors</div>
          <p className="text-[11px] text-gray-400 mt-1">Bookmarked for emergency</p>
        </div>

        {/* Verified Hospitals */}
        <div
          onClick={() => onNavigateTab("hospital-directory")}
          className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold uppercase">
            <span>Medical Facilities</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-900 mt-2">320 Facilities</div>
          <p className="text-[11px] text-blue-700/80 mt-1">Verified across Bangladesh</p>
        </div>

        {/* Public Donation Drives */}
        <div
          onClick={() => onNavigateTab("donation-camps")}
          className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Upcoming Drives</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">12 Camps</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Nationwide this month</p>
        </div>
      </div>

      {/* Row 2: Eligibility Guidelines & Recent Camps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Eligibility Criteria */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Who Can Donate Blood? Quick Eligibility Check
              </h3>
              <p className="text-[10px] text-gray-400">Standard health guidelines approved by WHO & RedSavior</p>
            </div>
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {ELIGIBILITY_POINTS.map((pt, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-semibold">{pt}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Already fit to donate?</span>
            <Link href="/donors/register" className="text-[#E50914] font-bold hover:underline">
              Start Free Registration Form →
            </Link>
          </div>
        </div>

        {/* Recent Donation Camps */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Upcoming Public Blood Camps
              </h3>
              <Calendar className="w-4 h-4 text-red-500" />
            </div>

            <div className="space-y-3 mt-3">
              {RECENT_CAMPS.map((camp) => (
                <div key={camp.id} className="p-3 rounded-xl border border-gray-100 bg-slate-50/70">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {camp.date}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{camp.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{camp.venue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <Link
              href="/campaigns"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition"
            >
              <span>Explore All Nationwide Campaigns</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
