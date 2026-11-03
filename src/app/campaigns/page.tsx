"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Calendar,
  MapPin,
  Users,
  Droplet,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function CampaignsPage() {
  const { locale } = useLanguage();
  const [registeredCamp, setRegisteredCamp] = useState<string | null>(null);

  const camps = [
    {
      id: "camp-01",
      titleBn: "জাতীয় রক্তদান দিবস ২০২৫ বিশেষ ক্যাম্প",
      titleEn: "National Voluntary Blood Donation Drive 2025",
      orgName: "Life Care Foundation Bangladesh",
      venue: "TSC Auditorium, University of Dhaka, Shahbagh",
      date: "May 10, 2025",
      time: "09:00 AM - 05:00 PM",
      targetUnits: 300,
      collectedUnits: 145,
      status: "upcoming",
    },
    {
      id: "camp-02",
      titleBn: "চট্টগ্রাম বিশ্ববিদ্যালয় রক্তদান উৎসব",
      titleEn: "Chattogram University Campus Blood Camp",
      orgName: "Sandhani CU Unit",
      venue: "Chittagong University Central Field, Hathazari",
      date: "May 18, 2025",
      time: "10:00 AM - 04:00 PM",
      targetUnits: 200,
      collectedUnits: 80,
      status: "upcoming",
    },
    {
      id: "camp-03",
      titleBn: "সিলেট শাহজালাল বিশ্ববিদ্যালয় রক্তদান কর্মসূচি",
      titleEn: "SUST Community Blood Donation Camp",
      orgName: "Kinjol Volunteer Forum",
      venue: "Mini Auditorium, SUST Campus, Sylhet",
      date: "May 25, 2025",
      time: "09:30 AM - 03:30 PM",
      targetUnits: 150,
      collectedUnits: 40,
      status: "upcoming",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "রক্তদান কর্মসূচি ও উৎসব" : "Community Blood Drives"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "রক্তদান ক্যাম্পেইন ও ইভেন্ট" : "Blood Donation Camps in Bangladesh"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "বিশ্ববিদ্যালয়, কলেজ ও জনপরিসরে অনুষ্ঠিত আসন্ন স্বেচ্ছাসেবী রক্তদান ক্যাম্পেইন।"
              : "Participate in local blood donation camps to support thalassemic children and emergency patients."}
          </p>
        </div>
      </div>

      {registeredCamp && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-emerald-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            {locale === "bn"
              ? "ধন্যবাদ! আপনি ক্যাম্পেইনে অংশ নিতে সফলভাবে নিবন্ধন করেছেন। এসএমএস বা ইমেইলে বিস্তারিত জানানো হবে।"
              : "Thank you! You have successfully RSVPed for the blood camp. We look forward to seeing you!"}
          </span>
        </div>
      )}

      {/* Camps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-100 text-[#E50914]">
                  {camp.status.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400 font-medium">{camp.orgName}</span>
              </div>

              <h3 className="font-bold text-gray-900 text-base leading-snug">
                {locale === "bn" ? camp.titleBn : camp.titleEn}
              </h3>

              <div className="space-y-2 text-xs text-gray-600 pt-1">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E50914] flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">{camp.venue}</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{camp.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{camp.time}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                  <span className="text-gray-500">{locale === "bn" ? "লক্ষ্যমাত্রা" : "Target"}</span>
                  <span className="text-gray-800">{camp.collectedUnits} / {camp.targetUnits} {locale === "bn" ? "ব্যাগ" : "Units"}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#E50914] h-full rounded-full transition-all"
                    style={{ width: `${(camp.collectedUnits / camp.targetUnits) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setRegisteredCamp(camp.id)}
              className="w-full py-2.5 bg-red-50 text-[#E50914] hover:bg-[#E50914] hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Droplet className="w-3.5 h-3.5 fill-current" />
              <span>{locale === "bn" ? "ক্যাম্পেইনে অংশ নিতে রেজিস্ট্রেশন করুন" : "Register to Donate at Camp"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
