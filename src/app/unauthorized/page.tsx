"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function UnauthorizedPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-[#E50914] flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {locale === "bn" ? "অননুমোদিত অ্যাক্সেস" : "Unauthorized Access"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {locale === "bn"
            ? "আপনার এই পৃষ্ঠায় প্রবেশের প্রয়োজনীয় অনুমতি নেই। সঠিক অ্যাকাউন্টে লগইন করুন অথবা প্রশাসকের সাথে যোগাযোগ করুন।"
            : "You do not have the required permissions to access this administrative resource. Please contact an authorized administrator."}
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E50914] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#B80012] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "bn" ? "মূল পাতায় ফিরে যান" : "Return to Homepage"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
