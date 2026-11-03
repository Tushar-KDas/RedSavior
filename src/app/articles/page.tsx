"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export default function ArticlesPage() {
  const { locale } = useLanguage();

  const articles = [
    {
      id: "art-1",
      titleBn: "রক্তদানের আগে ও পরে যা জানা অত্যন্ত জরুরি",
      titleEn: "Essential Do's and Don'ts Before and After Donating Blood",
      snippetBn: "পর্যাপ্ত পানি পান, পুষ্টিকর খাবার এবং পর্যাপ্ত বিশ্রামের গুরুত্ব সম্পর্কে জেনে নিন বিশেষজ্ঞদের পরামর্শ।",
      snippetEn: "Key clinical recommendations regarding hydration, nutrition, and recovery following a blood donation.",
      date: "April 20, 2025",
      readTime: "4 min read",
    },
    {
      id: "art-2",
      titleBn: "থ্যালাসেমিয়া প্রতিরোধে রক্ত পরীক্ষা ও সামাজিক সচেতনতা",
      titleEn: "Preventing Thalassemia in Bangladesh: Screening and Support",
      snippetBn: "বিয়ের পূর্বে থ্যালাসেমিয়ার বাহক পরীক্ষা কেন অত্যন্ত জরুরি এবং রোগীদের নিয়মিত রক্ত সঞ্চালন প্রক্রিয়া।",
      snippetEn: "Why pre-marital carrier testing is vital to curb thalassemia rates in upcoming generations.",
      date: "April 15, 2025",
      readTime: "6 min read",
    },
    {
      id: "art-3",
      titleBn: "রক্তের উপাদান বিভাজন: আরবিসি, প্লাটিলেট ও প্লাজমা",
      titleEn: "Component Separation: RBC, Platelets, and Cryoprecipitate",
      snippetBn: "আধুনিক রক্ত ব্যাংকে কীভাবে এক ব্যাগ রক্ত থেকে একাধিক জীবন রক্ষাকারী উপাদান তৈরি করা হয়।",
      snippetEn: "How modern blood banking technology maximizes the impact of single donations for multiple patients.",
      date: "April 10, 2025",
      readTime: "5 min read",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {locale === "bn" ? "শিক্ষামূলক নিবন্ধ ও স্বাস্থ্য বার্তা" : "Educational Articles & Blood Guides"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          {locale === "bn"
            ? "রক্তদান, স্বাস্থ্যবিধি ও চিকিৎসা বিজ্ঞান সম্পর্কিত বিশেষজ্ঞদের তথ্যসমৃদ্ধ প্রতিবেদন।"
            : "Evidence-based health articles on transfusion medicine, patient care, and community awareness."}
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition space-y-3"
          >
            <div className="flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{art.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{art.readTime}</span>
              </span>
            </div>

            <h3 className="font-bold text-gray-900 text-lg hover:text-[#E50914] transition cursor-pointer">
              {locale === "bn" ? art.titleBn : art.titleEn}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {locale === "bn" ? art.snippetBn : art.snippetEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
