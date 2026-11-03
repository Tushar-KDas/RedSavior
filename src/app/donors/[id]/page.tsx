"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import {
  Droplet,
  CheckCircle,
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  QrCode,
  Share2,
  HeartHandshake,
} from "lucide-react";

export default function DonorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { locale } = useLanguage();
  const router = useRouter();

  const donor = mockDb.getDonorById(id);

  if (!donor) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">
          {locale === "bn" ? "রক্তদাতার প্রোফাইল পাওয়া যায়নি" : "Donor Profile Not Found"}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {locale === "bn"
            ? "অনুগ্রহ করে লিংকটি পুনরায় পরীক্ষা করুন।"
            : "The requested donor could not be located."}
        </p>
        <Link
          href="/donors"
          className="mt-4 px-4 py-2 bg-[#E50914] text-white rounded-full text-xs font-semibold"
        >
          {locale === "bn" ? "সকল রক্তদাতা তালিকা" : "Back to Donor Directory"}
        </Link>
      </div>
    );
  }

  const idCard = mockDb.getIdCardByDisplayId(donor.humanReadableId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#E50914]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "তালিকায় ফিরে যান" : "Back to Directory"}</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#E50914] via-red-600 to-[#B80012] relative">
          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            {idCard && (
              <Link
                href={`/id-card?id=${donor.humanReadableId}`}
                className="px-3 py-1.5 bg-white/90 hover:bg-white text-gray-900 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <QrCode className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{locale === "bn" ? "ডিজিটাল আইডি কার্ড" : "Digital ID Card"}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 relative">
          {/* Avatar & Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                <Image
                  src={donor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"}
                  alt={donor.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{donor.fullName}</h1>
                  {donor.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{locale === "bn" ? "যাচাইকৃত" : "Verified"}</span>
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-gray-400 mt-0.5">
                  ID: {donor.humanReadableId}
                </div>
              </div>
            </div>

            {/* Blood Group Highlight */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-[#E50914] border-2 border-red-200">
                <span className="text-xl font-black">{donor.bloodGroup}</span>
                <span className="text-[10px] uppercase font-bold text-red-700">Blood</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-b border-gray-100 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-gray-400 block font-medium">
                {locale === "bn" ? "অবস্থান / এলাকা" : "Location Area"}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <MapPin className="w-4 h-4 text-[#E50914]" />
                <span>
                  {donor.upazilaId ? donor.upazilaId.toUpperCase() + ", " : ""}
                  {donor.districtId ? donor.districtId.toUpperCase() + ", " : ""}
                  {donor.divisionId}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 block font-medium">
                {locale === "bn" ? "যাচাইকৃত রক্তদান" : "Verified Donations"}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <Droplet className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
                <span>{donor.totalVerifiedDonations} {locale === "bn" ? "বার" : "Times"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 block font-medium">
                {locale === "bn" ? "সম্মাননা ও রেটিং" : "Rating & Feedback"}
              </span>
              <div className="flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{donor.rating} / 5.0</span>
                <span className="text-gray-400 font-normal">({donor.reviewCount} {locale === "bn" ? "টি রিভিউ" : "reviews"})</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {donor.bio && (
            <div className="mt-6 space-y-2">
              <h3 className="font-bold text-sm text-gray-900">
                {locale === "bn" ? "মানবিক বার্তা" : "Humanitarian Note"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                &ldquo;{donor.bio}&rdquo;
              </p>
            </div>
          )}

          {/* Medical Notice Section */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{locale === "bn" ? "চিকিৎসা ও স্বাস্থ্য নিরাপত্তা সতর্কতা" : "Medical Safety Notice"}</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              {locale === "bn"
                ? "রেডসেভিয়র রক্তদাতাদের যোগাযোগের প্ল্যাটফর্ম হিসেবে কাজ করে। চূড়ান্ত রক্ত সঞ্চালন ও উপযুক্ততা পরীক্ষা শুধুমাত্র অনুমোদিত হাসপাতাল বা ব্লাড ব্যাংকের চিকিৎসক ও ল্যাব টেকনিশিয়ানের মাধ্যমে নিশ্চিত করতে হবে।"
                : "RedSavior serves as a connection network. Final clinical eligibility, cross-matching, and transfusion safety are strictly the responsibility of qualified medical facilities."}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/requests/create?recommendedDonor=${donor.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition text-xs sm:text-sm"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{locale === "bn" ? "রক্তের জন্য আবেদন পাঠান" : "Send Blood Request"}</span>
            </Link>

            {idCard && (
              <Link
                href={`/id-card?id=${donor.humanReadableId}`}
                className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition text-xs sm:text-sm"
              >
                <QrCode className="w-4 h-4 text-[#E50914]" />
                <span>{locale === "bn" ? "আইডি কার্ড ডাউনলোড" : "Download ID Card"}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
