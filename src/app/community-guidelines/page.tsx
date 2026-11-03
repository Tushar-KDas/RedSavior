"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Users, Heart, ShieldCheck, AlertCircle } from "lucide-react";

export default function CommunityGuidelinesPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4 fill-[#E50914]" />
          <span>{locale === "bn" ? "সৌহার্দ্য ও মানবিক মূল্যবোধ" : "Community Ethics"}</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          {locale === "bn" ? "কমিউনিটি নির্দেশিকা (Community Guidelines)" : "Community Guidelines"}
        </h1>
        <p className="text-xs text-gray-500">
          {locale === "bn"
            ? "একটি নিরাপদ, বিশ্বস্ত ও মানবিক বাংলাদেশ গড়ে তুলতে আমাদের যৌথ অঙ্গীকার"
            : "Guiding principles for ethical, respectful blood donation collaboration in Bangladesh"}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "১. রক্তদাতাদের প্রতি পূর্ণ সম্মান ও যত্ন" : "1. Respecting Donor Dignity"}
          </h2>
          <p>
            {locale === "bn"
              ? "রক্তদাতারা হলেন মানব সেবার অনন্য নায়ক। রক্তদানের সময় এবং পরবর্তী সময়ে রক্তদাতার আরাম, সময় ও সম্মানের প্রতি সর্বোচ্চ যত্নবান হতে হবে।"
              : "Donors give the gift of life freely. Treat them with gratitude, punctuality, and the highest standard of cordial respect."}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "২. ভুয়া আবেদন প্রকাশ সম্পূর্ণ নিষিদ্ধ" : "2. Truthful Emergency Requisitions"}
          </h2>
          <p>
            {locale === "bn"
              ? "শুধুমাত্র প্রকৃত ও প্রত্যয়িত রোগীর প্রয়োজনেই রক্তের আবেদন পোস্ট করুন। অপ্রয়োজনীয় বা মিথ্যা আবেদনের ক্ষেত্রে প্ল্যাটফর্ম থেকে তাৎক্ষণিক আইনি ব্যবস্থা গ্রহণ করা হবে।"
              : "Only verified requests for actual patients should be submitted. Fabricated calls undermine trust and jeopardize critical emergency cases."}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "৩. ধর্ম, বর্ণ ও অঞ্চল নির্বিশেষে মানবিক ঐক্য" : "3. Non-Discrimination"}
          </h2>
          <p>
            {locale === "bn"
              ? "রক্তের কোনো ধর্ম, জাত বা ভেদাভেদ নেই। যেকোনো নাগরিকের বিপদে নিঃস্বার্থভাবে পাশে দাঁড়ানোই রেডসেভিয়রের মূল বার্তা।"
              : "Blood connects all of humanity without distinction of religion, caste, gender, or locality."}
          </p>
        </div>
      </div>
    </div>
  );
}
