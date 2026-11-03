"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ShieldCheck, Lock, EyeOff, UserX } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{locale === "bn" ? "আইনি ও গোপনীয়তা সুরক্ষা" : "Legal & Privacy Standards"}</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          {locale === "bn" ? "রেডসেভিয়র গোপনীয়তা নীতি (Privacy Policy)" : "Privacy Policy"}
        </h1>
        <p className="text-xs text-gray-500">
          {locale === "bn"
            ? "সর্বশেষ হালনাগাদ: এপ্রিল ২০২৫ | বাংলাদেশের প্রযোজ্য ডিজিটাল ও স্বাস্থ্য তথ্য বিধিমালা অনুসারে প্রণীত"
            : "Last Updated: April 2025 | In compliance with applicable Bangladesh data protection norms"}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "১. আমাদের নীতিগত অঙ্গীকার" : "1. Ethical Commitment"}
          </h2>
          <p>
            {locale === "bn"
              ? "রেডসেভিয়র একটি অলাভজনক ও মানবিক ডিজিটাল উদ্যোগ। আমরা রক্তদাতাদের ব্যক্তিগত তথ্য বা ফোন নম্বর কোনো বাণিজ্যিক সংস্থা বা তৃতীয় পক্ষের কাছে বিক্রি, লিজ বা বাজারজাত করি না। আমাদের লক্ষ্য শুধুমাত্র রক্তদাতা ও মুমূর্ষু রোগীর সেতুবন্ধন তৈরি করা।"
              : "RedSavior operates solely as a humanitarian platform. We never sell, monetize, or harvest donor contact lists for commercial advertising or marketing."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "২. সংগৃহীত তথ্যের পরিধি" : "2. Scope of Collected Information"}
          </h2>
          <p>
            {locale === "bn"
              ? "আমরা শুধুমাত্র রক্তদান প্রক্রিয়ার জন্য আবশ্যক মৌলিক তথ্য সংগ্রহ করি: নাম, রক্তের গ্রুপ, বিভাগ, জেলা, উপজেলা এবং যাচাইকৃত মোবাইল নম্বর। আমরা কোনো অপ্রয়োজনীয় ব্যক্তিগত বা সংবেদনশীল মেডিকেল ডকুমেন্টেশন সংরক্ষণ করি না।"
              : "We collect minimal necessary attributes: name, blood group, administrative geographic hierarchy (Division/District/Upazila), and mobile contact. No unauthorized medical histories are stored."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "৩. ফোন নম্বর মাস্কিং ও সম্মতি প্রত্যাহার" : "3. Phone Masking & Consent Revocation"}
          </h2>
          <p>
            {locale === "bn"
              ? "পাবলিক সার্চে রক্তদাতার মোবাইল নম্বর ডিফল্টভাবে মাস্ক করা থাকে। রক্তদাতা যখন স্বেচ্ছায় কোনো নির্দিষ্ট রক্তের আবেদনে সাড়া দেন, তখনই আবেদনকারীর সাথে যোগাযোগ স্থাপিত হয়। রক্তদাতা যেকোনো সময় তার প্রোফাইল গোপন রাখতে পারেন বা অ্যাকাউন্ট মুছে ফেলার আবেদন করতে পারেন।"
              : "All donor contact numbers are masked by default. Numbers are only revealed upon conscious consent to an emergency blood request. Donors can toggle off directory visibility or request data purge at any time."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">
            {locale === "bn" ? "৪. কিউআর কোড নিরাপত্তা" : "4. QR Code Token Security"}
          </h2>
          <p>
            {locale === "bn"
              ? "রেডসেভিয়র ডিজিটাল আইডি কার্ডের কিউআর কোডে কোনো সংবেদনশীল তথ্য বা পাসওয়ার্ড সংরক্ষিত থাকে না। এটি শুধুমাত্র একটি নন-সিকোয়েন্সিয়াল সুরক্ষিত হ্যাশ টোকেন যা সত্যতা নিশ্চিত করে।"
              : "Digital ID QR tokens contain zero private credentials or medical records. They serve solely as cryptographic references for public authenticity confirmation."}
          </p>
        </section>
      </div>
    </div>
  );
}
