"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { Hospital } from "@/types";
import {
  Building2,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  HeartPulse,
  ExternalLink,
  Search,
} from "lucide-react";

export default function HospitalsPage() {
  const { locale } = useLanguage();
  const [search, setSearch] = useState("");
  const hospitals = mockDb.getHospitals().filter((h) =>
    h.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    h.nameBn.includes(search) ||
    h.districtId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "স্বাস্থ্যসেবা ও রক্ত সঞ্চালন কেন্দ্র" : "Transfusion Facilities"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "হাসপাতাল তালিকা" : "Verified Hospital Directory"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "বাংলাদেশের অনুমোদিত সরকারি ও বেসরকারি হাসপাতালের তালিকা এবং জরুরি হটলাইন।"
              : "Access verified hospitals and medical colleges with active blood transfusion services."}
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
              placeholder={locale === "bn" ? "হাসপাতাল বা জেলা খুঁজুন..." : "Search hospital or district..."}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-xs sm:text-sm text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hosp) => (
          <div
            key={hosp.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E50914] flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                {hosp.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{locale === "bn" ? "যাচাইকৃত" : "Verified"}</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {locale === "bn" ? hosp.nameBn : hosp.nameEn}
                </h3>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{hosp.address}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">{locale === "bn" ? "যোগাযোগ:" : "Contact Phone:"}</span>
                  <a href={`tel:${hosp.contactPhone}`} className="font-mono font-bold text-gray-800 hover:text-[#E50914]">
                    {hosp.contactPhone}
                  </a>
                </div>

                {hosp.emergencyHotline && (
                  <div className="flex items-center justify-between text-[#E50914]">
                    <span className="font-medium">{locale === "bn" ? "জরুরি হটলাইন:" : "Emergency Hotline:"}</span>
                    <a href={`tel:${hosp.emergencyHotline}`} className="font-mono font-extrabold hover:underline">
                      {hosp.emergencyHotline}
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-gray-500 text-[11px]">
                  <span>{locale === "bn" ? "সম্পন্ন রক্তদান আবেদন:" : "Transfusions Handled:"}</span>
                  <strong className="text-gray-900">{hosp.totalRequestsHandled}+</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/requests/create?hospital=${encodeURIComponent(hosp.nameEn)}`}
                className="w-full py-2 bg-red-50 text-[#E50914] hover:bg-[#E50914] hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>{locale === "bn" ? "এই হাসপাতালে রক্ত চান" : "Request Blood Here"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
