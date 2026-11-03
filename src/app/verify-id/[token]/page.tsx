"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Droplet,
  Calendar,
  AlertTriangle,
  ArrowLeft,
  Building2,
} from "lucide-react";

export default function VerifyIdTokenPage() {
  const { token } = useParams<{ token: string }>();
  const { locale } = useLanguage();

  // Try lookup by qrToken or by displayId
  const card = mockDb.getIdCardByToken(token) || mockDb.getIdCardByDisplayId(token);

  if (!card) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {locale === "bn" ? "কার্ডটি ভেরিফাই করা যায়নি" : "Unverified / Invalid ID Token"}
        </h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          {locale === "bn"
            ? "প্রদত্ত টোকেন বা আইডি নম্বরটি আমাদের ডাটাবেজে পাওয়া যায়নি অথবা এটি মেয়াদোত্তীর্ণ বা বাতিল করা হয়েছে।"
            : "The provided token was not found in the RedSavior official database, or has been revoked."}
        </p>
        <div className="pt-2">
          <Link
            href="/verify-id"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "আবার খুঁজুন" : "Try Again"}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      {/* Official Verification Box */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-500 overflow-hidden">
        {/* Verification Header Banner */}
        <div className="bg-emerald-600 text-white p-6 text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {locale === "bn" ? "অফিসিয়ালি যাচাইকৃত সদস্য" : "Official RedSavior Verified Member"}
          </h1>
          <p className="text-xs text-emerald-100 font-medium">
            {locale === "bn" ? "রেডসেভিয়র বাংলাদেশ ডাটাবেজ সত্যতা নিশ্চিত করেছে" : "Identity Verified by RedSavior Bangladesh Authority"}
          </p>
        </div>

        {/* Public Attributes Display */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 flex-shrink-0 shadow-sm">
              <Image
                src={card.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={card.holderName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{card.holderName}</h2>
              <div className="text-xs font-mono font-bold text-gray-500 mt-0.5">
                ID: {card.displayId}
              </div>
              <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold uppercase">
                {card.role.replace("_", " ")}
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-500 font-medium">
                {locale === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
              </span>
              <span className="font-extrabold text-[#E50914] text-base">
                {card.bloodGroup || "O+"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-500 font-medium">
                {locale === "bn" ? "সদস্যতার তারিখ" : "Member Since"}
              </span>
              <span className="font-semibold text-gray-800">{card.issueDate}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-500 font-medium">
                {locale === "bn" ? "যাচাইকৃত রক্তদান" : "Verified Donations"}
              </span>
              <span className="font-bold text-gray-800">
                {card.donationsCount || 0} {locale === "bn" ? "বার" : "Times"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-500 font-medium">
                {locale === "bn" ? "সদস্যতা স্ট্যাটাস" : "Membership Status"}
              </span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? "সক্রিয় ও বৈধ" : "Active & Genuine"}</span>
              </span>
            </div>
          </div>

          {/* Disclaimer (Section 09 Mandate) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{locale === "bn" ? "গুরুত্বপূর্ণ আইনি ও স্বাস্থ্য নোটিশ" : "Crucial Medical Notice"}</span>
            </div>
            <p>
              {locale === "bn"
                ? "এই ডিজিটাল যাচাইকরণ শুধুমাত্র রেডসেভিয়র নেটওয়ার্কে সদস্যের পরিচয় নিশ্চিত করে। এটি কোনো তাৎক্ষণিক মেডিকেল ফিটনেস বা ক্লিনিক্যাল রক্ত সঞ্চালনের সনদ নয়। রক্ত গ্রহণের পূর্বে প্রয়োজনীয় ল্যাব পরীক্ষা আবশ্যক।"
                : "This QR verification strictly confirms platform membership identity. It is NOT a clinical clearance or medical guarantee. Cross-matching and infectious screening must be conducted by qualified medical lab authorities."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
