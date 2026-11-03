"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Heart, Users, ShieldCheck, Droplet, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#E50914] text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-[#E50914]" />
          <span>{locale === "bn" ? "আমাদের মানবিক অঙ্গীকার" : "About RedSavior Bangladesh"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
          {locale === "bn" ? "জীবন বাঁচাতে প্রযুক্তির সেতুবন্ধন" : "Connecting Lifesavers Across Bangladesh"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {locale === "bn"
            ? "রেডসেভিয়র বাংলাদেশের সর্ববৃহৎ মানবিক ও বিশ্বস্ত ডিজিটাল রক্তদান প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য সারাদেশে জরুরি রক্তের প্রয়োজন এবং প্রস্তুত রক্তদাতাদের মধ্যে তাৎক্ষণিক ও নির্ভরযোগ্য যোগাযোগ নিশ্চিত করা।"
            : "RedSavior is Bangladesh's dedicated nationwide humanitarian digital blood donation network, uniting donors, patients, hospitals, blood banks, and volunteers across all 64 districts."}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">
            {locale === "bn" ? "মানবিক মূল্যবোধ" : "Compassion & Humanity"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "স্বেচ্ছায় ও বিনামূল্যে রক্তদানকে সর্বজনীন সামাজিক আন্দোলনে রূপান্তর করা আমাদের প্রধান লক্ষ্য।"
              : "Promoting 100% voluntary, unpaid, ethical blood donation as a cornerstone of human solidarity."}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">
            {locale === "bn" ? "নিরাপত্তা ও বিশ্বাসযোগ্যতা" : "Trust & Data Security"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "রক্তদাতার গোপনীয়তা সুরক্ষা, ফোন নম্বর মাস্কিং এবং কিউআর-ভিত্তিক ডিজিটাল সদস্যতা যাচাইকরণ।"
              : "Strict privacy safeguards, phone masking, cryptographic QR verification, and no clinical misrepresentation."}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">
            {locale === "bn" ? "সারাদেশব্যাপী নেটওয়ার্ক" : "Nationwide Coverage"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "৮টি বিভাগ ও ৬৪টি জেলার ৪৯৫+ উপজেলার যেকোনো প্রান্তে আধুনিক জিআইএস প্রযুক্তির সাহায্যে তাৎক্ষণিক অনুসন্ধান।"
              : "PostGIS-powered geospatial reach covering 495+ upazilas in all 8 divisions of Bangladesh."}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#E50914] to-[#B80012] rounded-3xl p-8 text-white text-center shadow-xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          {locale === "bn" ? "আপনিও হতে পারেন কারও জীবনের ত্রাণকর্তা" : "Be Someone's Savior Today"}
        </h2>
        <p className="text-red-100 text-xs sm:text-sm max-w-xl mx-auto">
          {locale === "bn"
            ? "আজই রক্তদাতা হিসেবে নিবন্ধন করুন এবং ডিজিটাল আইডি কার্ড গ্রহণ করুন।"
            : "Register in under 2 minutes and join thousands of heroes across Bangladesh."}
        </p>
        <div className="pt-2">
          <Link
            href="/donors/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#E50914] rounded-full text-xs sm:text-sm font-bold hover:bg-red-50 shadow-md transition"
          >
            <span>{locale === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করুন" : "Become a Donor"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
