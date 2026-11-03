"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { BloodBank, BloodGroup } from "@/types";
import {
  Droplet,
  MapPin,
  Phone,
  CheckCircle,
  Building2,
  AlertCircle,
  Search,
} from "lucide-react";

export default function BloodBanksPage() {
  const { locale } = useLanguage();
  const [search, setSearch] = useState("");
  const bloodBanks = mockDb.getBloodBanks().filter((b) =>
    b.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    b.nameBn.includes(search) ||
    b.districtId.toLowerCase().includes(search.toLowerCase())
  );

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <Droplet className="w-4 h-4 fill-[#E50914]" />
            <span>{locale === "bn" ? "রক্তাগার ও মজুদ ব্যবস্থাপনা" : "Central Blood Banks"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "ব্লাড ব্যাংক তালিকা" : "Verified Blood Banks in Bangladesh"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "যাচাইকৃত সেন্ট্রাল ব্লাড ব্যাংক ও আধুনিক উপাদান প্রক্রিয়াকরণ ল্যাব।"
              : "Discover accredited blood banks, component separation labs, and stock availability."}
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === "bn" ? "ব্লাড ব্যাংক খুঁজুন..." : "Search blood banks..."}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-xs sm:text-sm text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bloodBanks.map((bank) => (
          <div
            key={bank.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition space-y-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
                  <Droplet className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {locale === "bn" ? bank.nameBn : bank.nameEn}
                  </h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{bank.address}</span>
                  </div>
                </div>
              </div>

              {bank.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{locale === "bn" ? "যাচাইকৃত" : "Verified"}</span>
                </span>
              )}
            </div>

            {/* Blood Stock Strip */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">
                {locale === "bn" ? "বর্তমান প্রস্তুত রক্তের মজুদ (ব্যাগ)" : "Available Component Stock (Units)"}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {bloodGroups.map((bg) => {
                  const stock = bank.stockSummary[bg] || 0;
                  return (
                    <div
                      key={bg}
                      className={`p-2 rounded-xl text-center border ${
                        stock > 10
                          ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                          : stock > 0
                          ? "bg-amber-50/60 border-amber-200 text-amber-900"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <div className="text-xs font-black">{bg}</div>
                      <div className="text-sm font-extrabold mt-0.5">{stock}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact & Hotline */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E50914]" />
                <span className="text-gray-500">{locale === "bn" ? "সরাসরি যোগাযোগ:" : "Contact Hotline:"}</span>
                <a href={`tel:${bank.contactPhone}`} className="font-mono font-bold text-gray-900 hover:text-[#E50914]">
                  {bank.contactPhone}
                </a>
              </div>

              <Link
                href={`/requests/create?hospital=${encodeURIComponent(bank.nameEn)}`}
                className="px-4 py-2 bg-[#E50914] text-white rounded-xl text-xs font-bold hover:bg-[#B80012] transition text-center"
              >
                {locale === "bn" ? "রক্ত রিকুইজিশন পাঠান" : "Requisition Blood"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
