"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { CheckCircle, Droplet, MapPin, Star, QrCode } from "lucide-react";

export default function DonorDirectoryPage() {
  const { locale } = useLanguage();
  const donors = mockDb.getDonors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {locale === "bn" ? "রক্তদাতা ডিরেক্টরি সূচি" : "Complete Verified Donor Directory"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "বাংলাদেশের নিবন্ধিত ও যাচাইকৃত স্বেচ্ছাসেবী রক্তদাতাদের পূর্ণাঙ্গ তালিকা।"
              : "Administrative listing of consented blood donors across all regions of Bangladesh."}
          </p>
        </div>

        <Link
          href="/donors"
          className="px-5 py-2.5 bg-[#E50914] text-white rounded-xl text-xs font-bold hover:bg-[#B80012] transition shadow-sm self-start sm:self-auto"
        >
          {locale === "bn" ? "ফিল্টার সহ সার্চ ভিউ" : "Search & Filter View"}
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">{locale === "bn" ? "রক্তদাতা" : "Donor"}</th>
                <th className="py-3.5 px-4">{locale === "bn" ? "আইডি নম্বর" : "Member ID"}</th>
                <th className="py-3.5 px-4">{locale === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}</th>
                <th className="py-3.5 px-4">{locale === "bn" ? "অবস্থান" : "Location"}</th>
                <th className="py-3.5 px-4">{locale === "bn" ? "মোট রক্তদান" : "Donations"}</th>
                <th className="py-3.5 px-4">{locale === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                <th className="py-3.5 px-4 text-right">{locale === "bn" ? "অ্যাকশন" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donors.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition">
                  <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2">
                    <span>{d.fullName}</span>
                    {d.isVerified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-500">{d.humanReadableId}</td>
                  <td className="py-3.5 px-4 font-black text-[#E50914]">{d.bloodGroup}</td>
                  <td className="py-3.5 px-4 text-gray-600">{d.districtId.toUpperCase()}, {d.divisionId}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-800">{d.totalVerifiedDonations}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{d.contactAvailable ? "Available" : "Resting"}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/donors/${d.id}`}
                      className="text-xs font-bold text-[#E50914] hover:underline"
                    >
                      {locale === "bn" ? "প্রোফাইল" : "Profile"} →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
