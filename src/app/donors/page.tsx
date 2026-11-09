"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { DIVISIONS, getDistrictsByDivision, getUpazilasByDistrict } from "@/data/bangladesh-geo";
import { BloodGroup, DonorProfile } from "@/types";
import {
  Search,
  Droplet,
  Filter,
  CheckCircle,
  MapPin,
  Phone,
  Star,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Heart,
  LayoutGrid,
  ListFilter,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function DonorsContent() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();

  // URL Query Initial State
  const initialBlood = searchParams.get("bloodGroup") || "ALL";
  const initialDiv = searchParams.get("division") || "";
  const initialDist = searchParams.get("district") || "";
  const initialUpa = searchParams.get("upazila") || "";

  const [bloodGroup, setBloodGroup] = useState<string>(initialBlood);
  const [division, setDivision] = useState<string>(initialDiv);
  const [district, setDistrict] = useState<string>(initialDist);
  const [upazila, setUpazila] = useState<string>(initialUpa);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const districts = getDistrictsByDivision(division);
  const upazilas = getUpazilasByDistrict(district);

  const [donors, setDonors] = useState<DonorProfile[]>([]);

  useEffect(() => {
    const list = mockDb.getDonors({
      bloodGroup,
      divisionId: division,
      districtId: district,
      upazilaId: upazila,
      onlyVerified,
      onlyAvailable,
      searchQuery,
    });
    setDonors(list);
  }, [bloodGroup, division, district, upazila, onlyVerified, onlyAvailable, searchQuery]);

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1.5">
            <Droplet className="w-4 h-4 fill-[#E50914]" />
            <span>
              {locale === "bn"
                ? "সারাদেশব্যাপী রক্তদাতা অনুসন্ধান ও সংযোগ"
                : "Nationwide Blood Donor Discovery & Connect"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {locale === "bn" ? "প্রস্তুত রক্তদাতা খুঁজুন" : "Find Blood Donors in Bangladesh"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            {locale === "bn"
              ? "৬৪ জেলা এবং ৪৯৫+ উপজেলার যেকোনো প্রান্তে জরুরি মুহূর্তে প্রস্তুত রক্তদাতাদের সাথে যোগাযোগ করুন।"
              : "Search verified voluntary blood donors across all 8 divisions and 64 districts in Bangladesh."}
          </p>
        </div>

        <Link
          href="/donors/register"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E50914] text-white rounded-2xl text-xs sm:text-sm font-black hover:bg-[#B80012] transition shadow-lg shadow-red-600/20 self-start md:self-auto flex-shrink-0"
        >
          <UserCheck className="w-4 h-4" />
          <span>{locale === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করুন" : "Become a Donor"}</span>
        </Link>
      </div>

      {/* 1-Click Blood Group Quick Selector Strip */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-700 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
            <span>{locale === "bn" ? "রক্তের গ্রুপ অনুযায়ী বাছাই করুন" : "Quick Blood Group Filter"}</span>
          </span>
          <span className="text-gray-400">
            {bloodGroup === "ALL" ? "All Groups Selected" : `Selected: ${bloodGroup}`}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          <button
            onClick={() => setBloodGroup("ALL")}
            className={`py-2 px-3 rounded-xl font-black text-xs transition-all ${
              bloodGroup === "ALL"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {locale === "bn" ? "সকল" : "ALL"}
          </button>
          {bloodGroups.map((bg) => (
            <button
              key={bg}
              onClick={() => setBloodGroup(bg)}
              className={`py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 ${
                bloodGroup === bg
                  ? "bg-[#E50914] text-white shadow-md shadow-red-600/30 ring-2 ring-red-400"
                  : "bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-[#E50914] border border-gray-200"
              }`}
            >
              <Droplet className={`w-3 h-3 ${bloodGroup === bg ? "fill-white" : "fill-current"}`} />
              <span>{bg}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cascading Location & Search Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Filter className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "ভৌগোলিক অবস্থান ও বিবরণ" : "Geographic & Detailed Filters"}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid" ? "bg-gray-100 text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "list" ? "bg-gray-100 text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
          {/* Division */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "বিভাগ" : "Division"}
            </label>
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
                setUpazila("");
              }}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
            >
              <option value="">{locale === "bn" ? "সকল বিভাগ" : "All 8 Divisions"}</option>
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
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setUpazila("");
              }}
              disabled={!division}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 disabled:opacity-50"
            >
              <option value="">{locale === "bn" ? "সকল জেলা" : "All Districts"}</option>
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
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              disabled={!district}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 disabled:opacity-50"
            >
              <option value="">{locale === "bn" ? "সকল উপজেলা" : "All Upazilas"}</option>
              {upazilas.map((upa) => (
                <option key={upa.id} value={upa.id}>
                  {locale === "bn" ? upa.nameBn : upa.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Text Search */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "নাম বা আইডি দিয়ে খুঁজুন" : "Name or ID Search"}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Rahim or RS-DNR"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Checkbox Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="rounded text-[#E50914] focus:ring-[#E50914]"
            />
            <span className="font-semibold text-gray-700">
              {locale === "bn" ? "শুধুমাত্র যাচাইকৃত রক্তদাতা" : "Only Verified Donors"}
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-[#E50914] focus:ring-[#E50914]"
            />
            <span className="font-semibold text-gray-700">
              {locale === "bn" ? "শুধুমাত্র প্রস্তুত / এভেইলেবল রক্তদাতা" : "Available to Donate Now"}
            </span>
          </label>
        </div>
      </div>

      {/* Results Count & Information */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 px-1">
        <span>
          {locale === "bn"
            ? `মোট ${donors.length} জন প্রস্তুত রক্তদাতা পাওয়া গেছে`
            : `Showing ${donors.length} active blood donors`}
        </span>
        <span className="text-emerald-600 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          <span>PostGIS Radius Filter Ready</span>
        </span>
      </div>

      {/* Donors Grid / List */}
      {donors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
          <Droplet className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-800">
            {locale === "bn" ? "কোন রক্তদাতা পাওয়া যায়নি" : "No Donors Found"}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {locale === "bn"
              ? "আপনার নির্বাচিত ফিল্টার বা গ্রুপের সাথে মিলিয়ে কোনো রক্তদাতা পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার পরিবর্তন করুন।"
              : "No donors matched your specific criteria. Try adjusting the blood group or geographic filters."}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {donors.map((donor) => {
            const maskedPhone = donor.publicPhoneVisibility
              ? donor.phone
              : donor.phone.slice(0, 6) + "•••••" + donor.phone.slice(-2);

            return (
              <div
                key={donor.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-red-500 shadow-md">
                        <Image
                          src={
                            donor.avatarUrl ||
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
                          }
                          alt={donor.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-gray-900 text-sm sm:text-base">
                            {donor.fullName}
                          </h3>
                          {donor.isVerified && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 font-bold">
                          {donor.humanReadableId}
                        </div>
                      </div>
                    </div>

                    {/* Blood Group Badge */}
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-sm shadow-md shadow-red-600/30">
                      <span>{donor.bloodGroup}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914] flex-shrink-0" />
                      <span className="truncate font-medium">
                        {donor.upazilaId ? donor.upazilaId.toUpperCase() + ", " : ""}
                        {donor.districtId ? donor.districtId.toUpperCase() + ", " : ""}
                        {donor.divisionId}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="font-mono text-gray-700 font-semibold">{maskedPhone}</span>
                      {!donor.publicPhoneVisibility && (
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                          {locale === "bn" ? "সুরক্ষিত" : "Masked"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <span className="text-[11px] text-gray-500">
                        {locale === "bn" ? "মোট রক্তদান:" : "Verified Donations:"}{" "}
                        <strong className="text-gray-900 font-black">
                          {donor.totalVerifiedDonations}
                        </strong>
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{donor.rating}</span>
                        <span className="text-gray-400 font-normal">({donor.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      donor.contactAvailable
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        donor.contactAvailable ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                      }`}
                    />
                    <span>
                      {donor.contactAvailable
                        ? locale === "bn"
                          ? "রক্তদানে প্রস্তুত"
                          : "Ready to Donate"
                        : locale === "bn"
                        ? "সাময়িক অনুপলব্ধ"
                        : "Unavailable"}
                    </span>
                  </span>

                  <Link
                    href={`/donors/${donor.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-[#E50914] text-xs font-bold text-gray-800 transition"
                  >
                    <span>{locale === "bn" ? "প্রোফাইল" : "Profile"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FindDonorsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-sm text-gray-500">
          Loading blood donors...
        </div>
      }
    >
      <DonorsContent />
    </Suspense>
  );
}
