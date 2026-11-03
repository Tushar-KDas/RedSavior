"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

export default function MissionVisionPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {locale === "bn" ? "লক্ষ্য ও উদ্দেশ্য (Mission & Vision)" : "Our Mission & Vision"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          {locale === "bn"
            ? "রক্তের অভাবে বাংলাদেশে একজন মানুষেরও যেন অকাল মৃত্যু না হয় — সেই অঙ্গীকার নিয়ে আমাদের পথচলা।"
            : "Ensuring zero preventable deaths due to blood scarcity in Bangladesh."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {locale === "bn" ? "আমাদের মিশন (Mission)" : "Our Mission"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "প্রযুক্তি ও মানবিক ভালোবাসার সমন্বয়ে এমন একটি সর্বজনীন প্ল্যাটফর্ম প্রতিষ্ঠা করা, যা বাংলাদেশের ৬৪ জেলার প্রতিটি উপজেলায় রক্তদাতা ও গ্রহীতার মাঝে তাৎক্ষণিক সংযোগ স্থাপন করে জীবন বাঁচাতে কার্যকর ভূমিকা পালন করবে।"
              : "To democratize and streamline emergency blood transfusion discovery through modern geolocation, secure identity cards, and community empowerment across Bangladesh."}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {locale === "bn" ? "আমাদের ভিশন (Vision)" : "Our Vision"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "একটি সুস্থ ও সহানুভূতিশীল বাংলাদেশ গড়ে তোলা, যেখানে জরুরি রক্তের প্রয়োজনে কোনো স্বজনকে দিশেহারা হতে হবে না এবং স্বেচ্ছায় রক্তদান প্রতিটি নাগরিকের গৌরবোজ্জ্বল অভ্যাস হিসেবে বিবেচিত হবে।"
              : "A healthier, kinder, and self-sufficient Bangladesh where voluntary blood donation is celebrated and no patient in critical care ever waits in vain for safe blood."}
          </p>
        </div>
      </div>
    </div>
  );
}
