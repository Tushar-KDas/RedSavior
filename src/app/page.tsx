"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { DIVISIONS, getDistrictsByDivision, getUpazilasByDistrict } from "@/data/bangladesh-geo";
import { BloodGroup } from "@/types";
import {
  Search,
  Heart,
  Droplet,
  Users,
  CheckCircle,
  AlertTriangle,
  Building2,
  HandHeart,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  Flame,
  CheckCircle2,
  Activity,
  Layers,
  Info,
} from "lucide-react";

// Blood compatibility matrix data for interactive explorer
const COMPATIBILITY_DATA: Record<BloodGroup, { canGiveTo: BloodGroup[]; canReceiveFrom: BloodGroup[] }> = {
  "O-": {
    canGiveTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-"],
  },
  "O+": {
    canGiveTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
  },
  "A-": {
    canGiveTo: ["A-", "A+", "AB-", "AB+"],
    canReceiveFrom: ["A-", "O-"],
  },
  "A+": {
    canGiveTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
  },
  "B-": {
    canGiveTo: ["B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["B-", "O-"],
  },
  "B+": {
    canGiveTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
  },
  "AB-": {
    canGiveTo: ["AB-", "AB+"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"],
  },
  "AB+": {
    canGiveTo: ["AB+"],
    canReceiveFrom: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
  },
};

export default function HomePage() {
  const { locale, t } = useLanguage();
  const router = useRouter();

  // Cascading quick search states
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("ALL");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");

  // Interactive Blood Compatibility Explorer State
  const [activeCompatibilityGroup, setActiveCompatibilityGroup] = useState<BloodGroup>("O+");

  // Division Explorer Tab State
  const [activeDivisionTab, setActiveDivisionTab] = useState<string>("DHAKA");

  const districts = getDistrictsByDivision(selectedDivision);
  const upazilas = getUpazilasByDistrict(selectedDistrict);

  const metrics = mockDb.getMetrics();
  const featuredDonors = mockDb.getDonors({ onlyVerified: true }).slice(0, 4);
  const recentRequests = mockDb.getRequests().slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup && selectedBloodGroup !== "ALL") params.append("bloodGroup", selectedBloodGroup);
    if (selectedDivision) params.append("division", selectedDivision);
    if (selectedDistrict) params.append("district", selectedDistrict);
    if (selectedUpazila) params.append("upazila", selectedUpazila);
    router.push(`/donors?${params.toString()}`);
  };

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="space-y-16 pb-20 overflow-hidden bg-radial-hero">
      {/* =========================================================================
          HERO SECTION (Advanced UI/UX Redesign)
          ========================================================================= */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200/80 text-[#E50914] text-xs font-bold shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E50914]" />
              </span>
              <span>
                {locale === "bn"
                  ? "বাংলাদেশে ৬৪ জেলায় ৮৯,৪২০+ রক্তদাতা প্রস্তুত"
                  : "89,420+ Verified Donors Ready Across Bangladesh"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1120] leading-[1.12] tracking-tight">
              {t.heroTitle1}{" "}
              <span className="text-gradient-red block mt-1.5">
                {t.heroTitle2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/donors"
                className="group inline-flex items-center gap-2.5 px-7 py-4 text-sm sm:text-base font-extrabold rounded-full bg-gradient-to-r from-red-600 to-[#E50914] text-white hover:shadow-glow-red hover:scale-[1.02] transition-all"
              >
                <Search className="w-4 h-4" />
                <span>{t.heroCtaFindDonor}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/donors/register"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm sm:text-base font-extrabold rounded-full bg-white text-gray-900 border-2 border-gray-200 hover:border-[#E50914] hover:text-[#E50914] hover:bg-red-50/40 shadow-sm transition-all"
              >
                <Droplet className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
                <span>{t.heroCtaBecomeDonor}</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{locale === "bn" ? "১০০% নিরাপদ ও গোপনীয়" : "100% Privacy Protected"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{locale === "bn" ? "কিউআর যাচাইকৃত আইডি" : "QR Verified Identity"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{locale === "bn" ? "জরুরি ট্রান্সফিউশন সাপোর্ট" : "Emergency Broadcast"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Donor Search Glass Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-card-hover border border-gray-200/90 p-6 sm:p-7 relative overflow-hidden">
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-[#E50914] to-amber-500" />

              <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
                    <Droplet className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">{t.heroSearchTitle}</h3>
                    <p className="text-[11px] text-gray-500">
                      {locale === "bn" ? "তাৎক্ষণিক রক্তদাতা অনুসন্ধান" : "Direct PostGIS Database Lookup"}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-[#E50914] px-2.5 py-1 rounded-full border border-red-100">
                  {locale === "bn" ? "৬৪ জেলা" : "64 Districts"}
                </span>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* 1-Click Blood Group Quick Selector Pills (Superior UX!) */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2 flex items-center justify-between">
                    <span>{locale === "bn" ? "রক্তের গ্রুপ নির্বাচন করুন" : "Select Blood Group"}</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      {selectedBloodGroup === "ALL" ? "All Groups" : `Selected: ${selectedBloodGroup}`}
                    </span>
                  </label>

                  <div className="grid grid-cols-4 gap-1.5">
                    {bloodGroups.map((bg) => {
                      const isSelected = selectedBloodGroup === bg;
                      return (
                        <button
                          key={bg}
                          type="button"
                          onClick={() => setSelectedBloodGroup(isSelected ? "ALL" : bg)}
                          className={`py-2 px-1 text-xs font-black rounded-xl border transition-all ${
                            isSelected
                              ? "bg-[#E50914] text-white border-[#E50914] shadow-md shadow-red-500/25 scale-[1.03]"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50/50"
                          }`}
                        >
                          {bg}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Division Selector */}
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    {locale === "bn" ? "বিভাগ" : "Division"}
                  </label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedDistrict("");
                      setSelectedUpazila("");
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 text-xs font-medium"
                  >
                    <option value="">{t.heroSelectDivision}</option>
                    {DIVISIONS.map((div) => (
                      <option key={div.id} value={div.id}>
                        {locale === "bn" ? div.nameBn : div.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      {locale === "bn" ? "জেলা" : "District"}
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedUpazila("");
                      }}
                      disabled={!selectedDivision}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 text-xs font-medium disabled:opacity-50"
                    >
                      <option value="">{t.heroSelectDistrict}</option>
                      {districts.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {locale === "bn" ? dist.nameBn : dist.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      {locale === "bn" ? "উপজেলা / থানা" : "Upazila / Thana"}
                    </label>
                    <select
                      value={selectedUpazila}
                      onChange={(e) => setSelectedUpazila(e.target.value)}
                      disabled={!selectedDistrict}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 text-xs font-medium disabled:opacity-50"
                    >
                      <option value="">{t.heroSelectUpazila}</option>
                      {upazilas.map((upa) => (
                        <option key={upa.id} value={upa.id}>
                          {locale === "bn" ? upa.nameBn : upa.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Search */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-[#E50914] to-[#B80012] text-white font-extrabold rounded-xl hover:shadow-glow-red shadow-md transition-all flex items-center justify-center gap-2 mt-2 group"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{t.heroBtnSearchDonor}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          IMPACT STATISTICS STRIP (Elevated Glassmorphism Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="glass-card rounded-2xl p-4 text-center space-y-2 relative overflow-hidden group">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-red-50 text-[#E50914] flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white transition-colors shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {metrics.registeredDonors.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.statRegisteredDonors}</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 inline-block">
              ↑ +14.2% Growth
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center space-y-2 relative overflow-hidden group">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {metrics.verifiedDonors.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.statVerifiedDonors}</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 inline-block">
              ✓ Verified & Ready
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center space-y-2 relative overflow-hidden group">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors shadow-sm">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {metrics.totalDonations.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.statTotalDonations}</div>
            </div>
            <div className="text-[10px] font-bold text-rose-700 bg-rose-50 rounded-full px-2 py-0.5 inline-block">
              🩸 Lives Saved
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center space-y-2 relative overflow-hidden group">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {metrics.activeBloodRequests.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.statActiveRequests}</div>
            </div>
            <div className="text-[10px] font-bold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5 inline-block">
              ⚡ 24/7 Live Feed
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center space-y-2 relative overflow-hidden group">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
              <HandHeart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {metrics.organizations.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.statOrganizations}</div>
            </div>
            <div className="text-[10px] font-bold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 inline-block">
              🤝 Partner Corps
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center space-y-2 relative overflow-hidden group">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                {metrics.hospitalsAndBanks.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.statHospitals}</div>
            </div>
            <div className="text-[10px] font-bold text-indigo-700 bg-indigo-50 rounded-full px-2 py-0.5 inline-block">
              🏥 Medical Units
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE BLOOD COMPATIBILITY EXPLORER (Unique UX Feature!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-[#0F172A] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>{locale === "bn" ? "ইন্টারেক্টিভ রক্তদান নির্দেশিকা" : "Interactive Transfusion Matrix"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {locale === "bn"
                  ? "আপনার রক্তের গ্রুপ কার কার জীবন বাঁচাতে পারে?"
                  : "Can You Donate or Receive? Compatibility Explorer"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                {locale === "bn"
                  ? "যেকোনো রক্তের গ্রুপে ক্লিক করুন এবং সরাসরি দেখুন কোন গ্রুপের রোগীকে আপনি রক্ত দিতে পারবেন।"
                  : "Select any blood group below to see instant donor/recipient compatibility."}
              </p>
            </div>

            {/* Blood group selector pills */}
            <div className="flex flex-wrap items-center gap-2">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setActiveCompatibilityGroup(bg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    activeCompatibilityGroup === bg
                      ? "bg-[#E50914] text-white shadow-glow-red scale-105"
                      : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Compatibility Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Can Donate To */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {activeCompatibilityGroup}{" "}
                    {locale === "bn" ? "যাদের রক্ত দিতে পারবেন" : "Can Donate Red Cells To:"}
                  </span>
                </div>
                <span className="text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  {COMPATIBILITY_DATA[activeCompatibilityGroup].canGiveTo.length} Groups
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {COMPATIBILITY_DATA[activeCompatibilityGroup].canGiveTo.map((group) => (
                  <span
                    key={group}
                    className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl font-black text-sm"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

            {/* Can Receive From */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Droplet className="w-5 h-5 fill-current" />
                  <span>
                    {activeCompatibilityGroup}{" "}
                    {locale === "bn" ? "যাদের থেকে রক্ত নিতে পারবেন" : "Can Receive Blood From:"}
                  </span>
                </div>
                <span className="text-xs font-bold bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-0.5 rounded-full">
                  {COMPATIBILITY_DATA[activeCompatibilityGroup].canReceiveFrom.length} Groups
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {COMPATIBILITY_DATA[activeCompatibilityGroup].canReceiveFrom.map((group) => (
                  <span
                    key={group}
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl font-black text-sm"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NATIONWIDE DIVISION EXPLORER & EMERGENCY BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Nationwide Network Matrix (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-0.5">
                <MapPin className="w-4 h-4" />
                <span>{locale === "bn" ? "ভৌগোলিক নেটওয়ার্ক" : "Geospatial Coverage"}</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">{t.networkTitle}</h3>
            </div>

            <Link
              href="/donors/map"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E50914] hover:underline self-start sm:self-auto"
            >
              <span>{t.networkViewFullMap}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Division Selector Tabs */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {DIVISIONS.map((d) => {
              const isActive = activeDivisionTab === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDivisionTab(d.id)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#E50914] text-white shadow-md shadow-red-500/20 scale-[1.03]"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {locale === "bn" ? d.nameBn : d.nameEn}
                </button>
              );
            })}
          </div>

          {/* Active Division Preview Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50/70 via-gray-50 to-white border border-red-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {locale === "bn" ? "নির্বাচিত বিভাগ" : "Active Division Overview"}
              </span>
              <h4 className="text-xl font-black text-gray-900">
                {DIVISIONS.find((d) => d.id === activeDivisionTab)?.nameEn} (
                {DIVISIONS.find((d) => d.id === activeDivisionTab)?.nameBn})
              </h4>
              <p className="text-xs text-gray-600">
                {locale === "bn"
                  ? "উপজেলা পর্যায়ে জরুরি রক্ত সঞ্চালন কেন্দ্র এবং প্রস্তুত স্বেচ্ছাসেবী নেটওয়ার্ক।"
                  : "PostGIS verified district centroids and live emergency responder network."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/donors?division=${activeDivisionTab}`}
                className="px-5 py-2.5 bg-[#E50914] text-white rounded-xl text-xs font-extrabold hover:bg-[#B80012] shadow-sm transition"
              >
                {locale === "bn" ? "রক্তদাতা দেখুন" : "Browse Donors"}
              </Link>
            </div>
          </div>
        </div>

        {/* Emergency Blood Request Callout Banner (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#E50914] via-red-600 to-[#991B1B] rounded-3xl p-7 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25">
              <AlertTriangle className="w-6 h-6 text-white animate-heartbeat" />
            </div>

            <h3 className="text-2xl font-black leading-snug">{t.emergencyTitle}</h3>
            <p className="text-red-100 text-xs sm:text-sm leading-relaxed">
              {t.emergencySubtitle}
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <Link
              href="/requests/create"
              className="w-full py-4 bg-white text-[#E50914] font-black rounded-2xl hover:bg-red-50 text-center block shadow-xl transition-transform hover:scale-[1.02]"
            >
              {t.emergencyBtnRequest}
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RECENT BLOOD REQUESTS & FEATURED LIFESAVERS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Blood Requests (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
                <Flame className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">{t.recentRequestsTitle}</h3>
            </div>
            <Link href="/requests" className="text-xs font-bold text-[#E50914] hover:underline">
              {t.viewAll} →
            </Link>
          </div>

          <div className="space-y-3">
            {recentRequests.map((req) => (
              <Link
                key={req.id}
                href={`/requests/${req.id}`}
                className="block p-3.5 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 bg-[#E50914] text-white font-black rounded-xl text-xs shadow-sm">
                      {req.bloodGroup}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        req.urgency === "critical_emergency"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {req.urgency === "critical_emergency" ? t.criticalBadge : t.urgentBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>2h ago</span>
                  </div>
                </div>

                <div className="font-extrabold text-gray-900 text-sm mt-2.5 group-hover:text-[#E50914] transition-colors truncate">
                  {req.hospitalName}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                  <span>{req.patientName}</span>
                  <span>•</span>
                  <span>{req.unitsNeeded} {locale === "bn" ? "ব্যাগ প্রয়োজন" : "Units required"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Lifesavers (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">{t.featuredDonorsTitle}</h3>
            </div>
            <Link href="/donors" className="text-xs font-bold text-[#E50914] hover:underline">
              {t.viewAll} →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {featuredDonors.map((donor) => (
              <Link
                key={donor.id}
                href={`/donors/${donor.id}`}
                className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-red-50/50 border border-gray-100 hover:border-red-200 transition-all"
              >
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden mb-2.5 border-2 border-red-500/80 shadow-md">
                  <Image
                    src={donor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                    alt={donor.fullName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-tl-lg p-0.5 text-white">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="font-extrabold text-gray-900 text-xs truncate w-full">
                  {donor.fullName}
                </div>

                <div className="mt-1 px-2 py-0.5 rounded-lg bg-red-100 text-[#E50914] font-black text-xs">
                  {donor.bloodGroup}
                </div>

                <div className="text-[11px] text-gray-500 mt-1 font-semibold">
                  {donor.totalVerifiedDonations} {locale === "bn" ? "বার দান" : "Donations"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW REDSAVIOR WORKS (Step Progression Architecture)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-gray-100 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{locale === "bn" ? "সহজ ও স্বচ্ছ প্রক্রিয়া" : "Step-by-Step Walkthrough"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">{t.howItWorksTitle}</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.howItWorksSubtitle}</p>
            </div>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E50914] hover:underline"
            >
              <span>{t.howLearnMore}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-red-50/40 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-[#E50914] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-500/20">
                1
              </div>
              <h4 className="font-extrabold text-gray-900 text-sm">{t.howStep1Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{t.howStep1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-red-50/40 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-[#E50914] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-500/20">
                2
              </div>
              <h4 className="font-extrabold text-gray-900 text-sm">{t.howStep2Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{t.howStep2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-red-50/40 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-[#E50914] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-500/20">
                3
              </div>
              <h4 className="font-extrabold text-gray-900 text-sm">{t.howStep3Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{t.howStep3Desc}</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-red-50/40 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-[#E50914] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-500/20">
                4
              </div>
              <h4 className="font-extrabold text-gray-900 text-sm">{t.howStep4Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{t.howStep4Desc}</p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl hover:bg-red-50/40 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-[#E50914] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-500/20">
                5
              </div>
              <h4 className="font-extrabold text-gray-900 text-sm">{t.howStep5Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{t.howStep5Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HUMANITARIAN COMMUNITY BANNER (Pledge & Join)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#991B1B] via-[#E50914] to-[#B80012] rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Heart className="w-7 h-7 fill-white text-white animate-heartbeat" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">{t.togetherBannerTitle}</h2>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              {t.togetherBannerSubtitle}
            </p>

            <div className="pt-3">
              <Link
                href="/donors/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#E50914] font-black rounded-full hover:bg-red-50 shadow-xl hover:scale-105 transition-all text-sm"
              >
                <span>{t.heroCtaBecomeDonor}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
