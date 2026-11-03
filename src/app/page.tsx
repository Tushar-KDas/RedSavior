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
} from "lucide-react";

export default function HomePage() {
  const { locale, t } = useLanguage();
  const router = useRouter();

  // Cascading quick search states
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("ALL");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");

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
    <div className="space-y-12 pb-16">
      {/* =========================================================================
          HERO SECTION (Matching Homepage Reference Composition)
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-red-50/40 to-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-[#E50914] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === "bn" ? "জীবন বাঁচাতে এগিয়ে আসুন" : "Lifesaving Community in Bangladesh"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-[1.15] tracking-tight">
              {t.heroTitle1}{" "}
              <span className="text-[#E50914] block mt-1">{t.heroTitle2}</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/donors"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold rounded-full bg-[#E50914] text-white hover:bg-[#B80012] shadow-lg shadow-red-500/20 transition-all hover:gap-3"
              >
                <span>{t.heroCtaFindDonor}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/donors/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold rounded-full bg-white text-[#E50914] border-2 border-[#E50914] hover:bg-red-50 shadow-sm transition-all"
              >
                <Droplet className="w-4 h-4 fill-[#E50914]" />
                <span>{t.heroCtaBecomeDonor}</span>
              </Link>
            </div>
          </div>

          {/* Center Graphic: Blood Drop in Hands */}
          <div className="lg:col-span-3 hidden lg:flex flex-col items-center justify-center text-center relative">
            <div className="relative w-56 h-56 rounded-full bg-gradient-to-tr from-red-100 to-red-50 flex items-center justify-center p-6 shadow-inner border border-red-200/60">
              <div className="relative w-44 h-44 animate-pulse">
                <Image
                  src="/brand/logo.png"
                  alt="RedSavior"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-4 text-xs font-semibold text-gray-500 italic">
              &quot;A Drop of Blood... A Lifetime of Hope...&quot;
            </div>
          </div>

          {/* Right Column: Quick Donor Search Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Droplet className="w-5 h-5 text-[#E50914] fill-[#E50914]" />
                <h3 className="text-lg font-bold text-gray-900">{t.heroSearchTitle}</h3>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Blood Group */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {locale === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                  </label>
                  <select
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                  >
                    <option value="ALL">{t.heroSelectBloodGroup}</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Division */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {locale === "bn" ? "বিভাগ" : "Division"}
                  </label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedDistrict("");
                      setSelectedUpazila("");
                    }}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                  >
                    <option value="">{t.heroSelectDivision}</option>
                    {DIVISIONS.map((div) => (
                      <option key={div.id} value={div.id}>
                        {locale === "bn" ? div.nameBn : div.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {locale === "bn" ? "জেলা" : "District"}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedUpazila("");
                    }}
                    disabled={!selectedDivision}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 disabled:opacity-50"
                  >
                    <option value="">{t.heroSelectDistrict}</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {locale === "bn" ? dist.nameBn : dist.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {locale === "bn" ? "উপজেলা / থানা" : "Upazila / Thana"}
                  </label>
                  <select
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    disabled={!selectedDistrict}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 disabled:opacity-50"
                  >
                    <option value="">{t.heroSelectUpazila}</option>
                    {upazilas.map((upa) => (
                      <option key={upa.id} value={upa.id}>
                        {locale === "bn" ? upa.nameBn : upa.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition flex items-center justify-center gap-2 mt-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.heroBtnSearchDonor}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          IMPACT STATISTICS STRIP (Real Database-Backed Numbers)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-red-100 flex items-center justify-center text-[#E50914]">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {metrics.registeredDonors.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium">{t.statRegisteredDonors}</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {metrics.verifiedDonors.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium">{t.statVerifiedDonors}</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Droplet className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {metrics.totalDonations.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium">{t.statTotalDonations}</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {metrics.activeBloodRequests.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium">{t.statActiveRequests}</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <HandHeart className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {metrics.organizations.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium">{t.statOrganizations}</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              {metrics.hospitalsAndBanks.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium">{t.statHospitals}</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW REDSAVIOR WORKS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t.howItWorksTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">{t.howItWorksSubtitle}</p>
            </div>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#E50914] hover:underline"
            >
              <span>{t.howLearnMore}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-lg border-2 border-red-200">
                1
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{t.howStep1Title}</h4>
              <p className="text-xs text-gray-500">{t.howStep1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-lg border-2 border-red-200">
                2
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{t.howStep2Title}</h4>
              <p className="text-xs text-gray-500">{t.howStep2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-lg border-2 border-red-200">
                3
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{t.howStep3Title}</h4>
              <p className="text-xs text-gray-500">{t.howStep3Desc}</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-lg border-2 border-red-200">
                4
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{t.howStep4Title}</h4>
              <p className="text-xs text-gray-500">{t.howStep4Desc}</p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-lg border-2 border-red-200">
                5
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{t.howStep5Title}</h4>
              <p className="text-xs text-gray-500">{t.howStep5Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MIDDLE SECTION: OUR NATIONWIDE NETWORK & EMERGENCY BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Nationwide Network Interactive Map Preview */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{t.networkTitle}</h3>
              <p className="text-xs text-gray-500">{t.networkDistrictCoverage}</p>
            </div>
            <Link
              href="/donors/map"
              className="text-xs font-semibold text-[#E50914] hover:underline inline-flex items-center gap-1"
            >
              <span>{t.networkViewFullMap}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Visual Mini Map Area */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-4">
              <Image
                src="/brand/ref_admin_2.jpg"
                alt="Bangladesh Donor Map"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-8 h-8 text-[#E50914] animate-bounce" />
                <span className="text-white font-bold text-sm mt-2">
                  {locale === "bn" ? "৬৪ জেলায় বিস্তৃত নেটওয়ার্ক" : "All 64 Districts Connected"}
                </span>
                <span className="text-gray-300 text-xs mt-1">
                  {locale === "bn" ? "৮ বিভাগে সক্রিয় জরুরি রক্তদান সেবা" : "Real-time PostGIS Geolocation"}
                </span>
                <Link
                  href="/donors/map"
                  className="mt-3 px-4 py-1.5 bg-[#E50914] text-white rounded-full text-xs font-semibold hover:bg-[#B80012] transition"
                >
                  {t.networkViewFullMap}
                </Link>
              </div>
            </div>

            {/* Division-wise Distribution List */}
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">📍 {locale === "bn" ? "ঢাকা বিভাগ" : "Dhaka Division"}</span>
                <span className="font-bold text-gray-900">12,500+ {locale === "bn" ? "দাতা" : "Donors"}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">📍 {locale === "bn" ? "চট্টগ্রাম বিভাগ" : "Chattogram Division"}</span>
                <span className="font-bold text-gray-900">8,200+ {locale === "bn" ? "দাতা" : "Donors"}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">📍 {locale === "bn" ? "খুলনা বিভাগ" : "Khulna Division"}</span>
                <span className="font-bold text-gray-900">6,100+ {locale === "bn" ? "দাতা" : "Donors"}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">📍 {locale === "bn" ? "রাজশাহী বিভাগ" : "Rajshahi Division"}</span>
                <span className="font-bold text-gray-900">5,800+ {locale === "bn" ? "দাতা" : "Donors"}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">📍 {locale === "bn" ? "সিলেট ও অন্যান্য" : "Sylhet & Others"}</span>
                <span className="font-bold text-gray-900">17,400+ {locale === "bn" ? "দাতা" : "Donors"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Blood Request Callout Banner */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#E50914] to-[#B80012] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
            </div>

            <h3 className="text-2xl font-bold leading-snug">{t.emergencyTitle}</h3>
            <p className="text-red-100 text-sm leading-relaxed">{t.emergencySubtitle}</p>
          </div>

          <div className="pt-6">
            <Link
              href="/requests/create"
              className="w-full py-3.5 bg-white text-[#E50914] font-bold rounded-xl hover:bg-red-50 text-center block shadow-lg transition"
            >
              {t.emergencyBtnRequest}
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED DONORS & RECENT REQUESTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Donors */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#E50914]" />
              <h3 className="text-lg font-bold text-gray-900">{t.featuredDonorsTitle}</h3>
            </div>
            <Link href="/donors" className="text-xs font-semibold text-[#E50914] hover:underline">
              {t.viewAll} →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredDonors.map((donor) => (
              <Link
                key={donor.id}
                href={`/donors/${donor.id}`}
                className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-red-50/50 border border-gray-100 hover:border-red-200 transition"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-[#E50914]">
                  <Image
                    src={donor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                    alt={donor.fullName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-0.5 text-white">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="font-bold text-gray-900 text-xs sm:text-sm truncate w-full">
                  {donor.fullName}
                </div>

                <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-red-100 text-[#E50914] font-bold text-xs">
                  <Droplet className="w-3 h-3 fill-current" />
                  <span>{donor.bloodGroup}</span>
                </div>

                <div className="text-[11px] text-gray-500 mt-1">
                  {donor.totalVerifiedDonations} {locale === "bn" ? "বার দান" : "Donations"}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Blood Requests */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-[#E50914] fill-[#E50914]" />
              <h3 className="text-lg font-bold text-gray-900">{t.recentRequestsTitle}</h3>
            </div>
            <Link href="/requests" className="text-xs font-semibold text-[#E50914] hover:underline">
              {t.viewAll} →
            </Link>
          </div>

          <div className="space-y-3">
            {recentRequests.map((req) => (
              <Link
                key={req.id}
                href={`/requests/${req.id}`}
                className="block p-3 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-red-600 text-white font-extrabold rounded-lg text-xs">
                      {req.bloodGroup}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        req.urgency === "critical_emergency"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.urgency === "critical_emergency" ? t.criticalBadge : t.urgentBadge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>2h ago</span>
                  </div>
                </div>

                <div className="font-semibold text-gray-900 text-sm mt-2 truncate">
                  {req.hospitalName}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {req.patientName} • {req.unitsNeeded} {locale === "bn" ? "ব্যাগ প্রয়োজন" : "Units needed"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HUMANITARIAN AWARENESS BANNER (Together We Can Save Lives)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-[#E50914] to-red-700 rounded-2xl p-8 text-white text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-white text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">{t.togetherBannerTitle}</h2>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              {t.togetherBannerSubtitle}
            </p>
            <div className="pt-2">
              <Link
                href="/donors/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#E50914] font-bold rounded-full hover:bg-red-50 shadow-md transition"
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
