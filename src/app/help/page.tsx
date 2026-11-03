"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HelpCircle, Phone, Mail, FileText, QrCode, Search } from "lucide-react";

export default function HelpCenterPage() {
  const { locale } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {locale === "bn" ? "রেডসেভিয়র হেল্প ও সাপোর্ট সেন্টার" : "RedSavior Help Center"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          {locale === "bn"
            ? "প্ল্যাটফর্ম ব্যবহার, রক্তের আবেদন কিংবা রক্তদাতা রেজিস্ট্রেশনে যেকোনো সহায়তা নিন।"
            : "Find guides, emergency contact channels, and verification assistance."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/faq"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition space-y-3 block"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">
            {locale === "bn" ? "সাধারণ প্রশ্নোত্তর (FAQ)" : "FAQ & Guides"}
          </h3>
          <p className="text-xs text-gray-500">
            {locale === "bn" ? "রক্তদান ও অ্যাপ ব্যবহার সম্পর্কিত প্রশ্নোত্তর।" : "Common questions regarding registration and safety."}
          </p>
        </Link>

        <Link
          href="/verify-id"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition space-y-3 block"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">
            {locale === "bn" ? "আইডি কার্ড ভেরিফিকেশন" : "Verify ID Card"}
          </h3>
          <p className="text-xs text-gray-500">
            {locale === "bn" ? "ডিজিটাল কিউআর কোড স্ক্যান করে সত্যতা যাচাই করুন।" : "Scan QR token to check genuine donor membership."}
          </p>
        </Link>

        <Link
          href="/contact"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition space-y-3 block"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">
            {locale === "bn" ? "২৪/৭ জরুরি হটলাইন" : "Emergency Support"}
          </h3>
          <p className="text-xs text-gray-500">
            {locale === "bn" ? "জরুরি রক্তের প্রয়োজনে সরাসরি যোগাযোগ করুন।" : "Direct hotline for urgent hospital blood requisitions."}
          </p>
        </Link>
      </div>
    </div>
  );
}
