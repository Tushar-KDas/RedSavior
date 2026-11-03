"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FileText, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>{locale === "bn" ? "ব্যবহারের নীতিমালা" : "Terms & Conditions"}</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          {locale === "bn" ? "ব্যবহারের শর্তাবলী (Terms of Service)" : "Terms of Service"}
        </h1>
        <p className="text-xs text-gray-500">
          {locale === "bn"
            ? "রেডসেভিয়র প্ল্যাটফর্ম ব্যবহারের সাধারণ নিয়মাবলী"
            : "Governing terms for using the RedSavior blood donation platform in Bangladesh"}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "১. স্বেচ্ছাসেবী রক্তদান" : "1. Voluntary Unpaid Blood Donation"}
          </h2>
          <p>
            {locale === "bn"
              ? "রেডসেভিয়র শতভাগ স্বেচ্ছাসেবী ও বিনামূল্যের রক্তদানকে সমর্থন করে। রক্তের কোনো প্রকার বাণিজ্যিক ক্রয়-বিক্রয় প্ল্যাটফর্মে কঠোরভাবে নিষিদ্ধ।"
              : "RedSavior strictly advocates for 100% voluntary, non-remunerated blood donation. Any commercial buying, selling, or financial brokering of human blood is strictly prohibited."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "২. চিকিৎসা ও স্বাস্থ্য দায়মুক্তি" : "2. Medical & Clinical Disclaimer"}
          </h2>
          <p>
            {locale === "bn"
              ? "রেডসেভিয়র কোনো হাসপাতাল বা রক্ত সঞ্চালন ল্যাবরেটরি নয়। রক্তদাতার তাৎক্ষণিক শারীরিক সুস্থতা, ক্রস-ম্যাচিং এবং রক্তের নিরাপদ সঞ্চালন পরীক্ষা সংশ্লিষ্ট হাসপাতালের লাইসেন্সপ্রাপ্ত চিকিৎসকদের দায়িত্ব।"
              : "RedSavior is a communication and discovery platform. We do not provide clinical transfusions. Medical eligibility and laboratory cross-matching are solely the domain of licensed medical practitioners."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "৩. অসদাচরণ ও হয়রানি রোধ" : "3. Anti-Harassment & Misuse"}
          </h2>
          <p>
            {locale === "bn"
              ? "কোনো রক্তদাতাকে জোরপূর্বক রক্তদানে বাধ্য করা বা অনাকাঙ্ক্ষিত হয়রানি করা শাস্তিযোগ্য অপরাধ। কোনো অসদাচরণের অভিযোগ প্রমাণিত হলে অবিলম্বে সংশ্লিষ্ট অ্যাকাউন্ট স্থায়ীভাবে স্থগিত করা হবে।"
              : "Coercing, harassing, or spamming registered donors is an immediate ground for permanent platform suspension and administrative escalation."}
          </p>
        </section>
      </div>
    </div>
  );
}
