"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Droplet,
  Heart,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function AwarenessPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E50914] text-xs font-bold uppercase tracking-wider">
          <Droplet className="w-3.5 h-3.5 fill-[#E50914]" />
          <span>{locale === "bn" ? "স্বাস্থ্য ও সচেতনতা বার্তা" : "Health & Awareness"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {locale === "bn" ? "রক্তদান কেন এত জরুরি?" : "Why Voluntary Blood Donation Matters"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          {locale === "bn"
            ? "প্রতি বছর বাংলাদেশে লক্ষাধিক রোগীর রক্তের প্রয়োজন হয়। আপনার এক ব্যাগ রক্ত ৩ জনের জীবন বাঁচাতে পারে।"
            : "In Bangladesh, over 800,000 units of blood are required annually for surgeries, trauma, and thalassemia patients."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">
            {locale === "bn" ? "থ্যালাসেমিয়া রোগীদের সহায়তা" : "Support for Thalassemia"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "বাংলাদেশে হাজার হাজার শিশু থ্যালাসেমিয়া রোগে আক্রান্ত, যাদের বেঁচে থাকার জন্য প্রতি মাসে নিয়মিত রক্তের প্রয়োজন হয়।"
              : "Thousands of thalassemic children in Bangladesh require lifelong monthly transfusions to survive."}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">
            {locale === "bn" ? "রক্তদাতার শারীরিক সুফল" : "Health Benefits for Donors"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "নিয়মিত রক্তদান রক্তে অতিরিক্ত আয়রনের মাত্রা কমিয়ে হৃদরোগের ঝুঁকি হ্রাস করে এবং নতুন রক্তকোষ উৎপাদনে সহায়তা করে।"
              : "Regular donation helps balance iron stores, stimulates bone marrow production of fresh RBCs, and reduces cardiovascular strain."}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">
            {locale === "bn" ? "বিনামূল্যে স্বাস্থ্য স্ক্রিনিং" : "Free Health Screening"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "রক্তদানের সময় এইচআইভি, হেপাটাইটিস বি ও সি, ম্যালেরিয়া এবং সিফিলিসের মতো গুরুতর রোগের বিনামূল্যে নির্ভরযোগ্য পরীক্ষা হয়।"
              : "Before each donation, medical facilities perform mandatory screenings for HIV, Hepatitis B & C, Syphilis, and Malaria."}
          </p>
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">
            {locale === "bn" ? "আজই জীবন বাঁচানোর উদ্যোগে যুক্ত হোন" : "Ready to Make a Difference?"}
          </h4>
          <p className="text-xs text-gray-600 mt-0.5">
            {locale === "bn"
              ? "আপনার রক্তের গ্রুপ যোগ করুন এবং জরুরি রক্তদাতা তালিকায় অন্তর্ভুক্ত হোন।"
              : "Join our verified donor registry and receive a digital membership badge."}
          </p>
        </div>

        <Link
          href="/donors/register"
          className="px-6 py-3 bg-[#E50914] text-white rounded-xl text-xs font-bold hover:bg-[#B80012] shadow-sm transition"
        >
          {locale === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন" : "Register as Donor"}
        </Link>
      </div>
    </div>
  );
}
