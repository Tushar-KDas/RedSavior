"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { mockDb } from "@/lib/store/mock-db";
import {
  Droplet,
  AlertTriangle,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  Heart,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from "lucide-react";

export default function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { locale } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const [responded, setResponded] = useState(false);
  const [donorNotes, setDonorNotes] = useState("");

  const request = mockDb.getRequestById(id);

  if (!request) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">
          {locale === "bn" ? "রক্তের আবেদনটি পাওয়া যায়নি" : "Blood Request Not Found"}
        </h2>
        <Link
          href="/requests"
          className="mt-4 px-4 py-2 bg-[#E50914] text-white rounded-full text-xs font-semibold"
        >
          {locale === "bn" ? "সকল রক্তের আবেদন" : "Back to Requests Feed"}
        </Link>
      </div>
    );
  }

  const handleRespond = () => {
    // If logged in, get donor profile or mock donor
    const donor = mockDb.getDonors()[0];
    if (donor) {
      mockDb.respondToRequest(request.id, donor);
      setResponded(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#E50914]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "তালিকায় ফিরে যান" : "Back to Requests"}</span>
        </button>
      </div>

      {/* Main Request Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-[#E50914] font-black text-2xl flex-shrink-0 border-2 border-red-200">
              <span>{request.bloodGroup}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    request.urgency === "critical_emergency"
                      ? "bg-red-600 text-white"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {request.urgency === "critical_emergency"
                    ? locale === "bn" ? "সঙ্কটাপন্ন জরুরি" : "Critical Emergency"
                    : locale === "bn" ? "জরুরি আবেদন" : "Urgent"}
                </span>
                <span className="text-xs font-mono text-gray-400 font-bold">
                  {request.humanReadableId}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {request.hospitalName}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {locale === "bn" ? "পোস্ট করা হয়েছে:" : "Published:"} {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="text-right sm:text-left self-start sm:self-auto">
            <div className="text-xs font-semibold text-gray-400 uppercase">
              {locale === "bn" ? "প্রয়োজনীয় রক্ত" : "Units Required"}
            </div>
            <div className="text-2xl font-extrabold text-[#E50914]">
              {request.unitsNeeded} {locale === "bn" ? "ব্যাগ" : "Units"}
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="text-gray-400 font-medium block">
              {locale === "bn" ? "রোগীর তথ্য" : "Patient Info"}
            </span>
            <div className="font-bold text-gray-800">{request.patientName}</div>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-medium block">
              {locale === "bn" ? "রক্তদানের নির্ধারিত সময়" : "Required Date & Time"}
            </span>
            <div className="font-bold text-gray-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E50914]" />
              <span>{request.requiredDate} {request.requiredTime && `(${request.requiredTime})`}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-medium block">
              {locale === "bn" ? "হাসপাতালের অবস্থান" : "Hospital Location"}
            </span>
            <div className="font-bold text-gray-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              <span>{request.upazilaId ? request.upazilaId.toUpperCase() + ", " : ""}{request.districtId ? request.districtId.toUpperCase() + ", " : ""}{request.divisionId}</span>
            </div>
          </div>
        </div>

        {/* Medical Reason & Instructions */}
        {request.medicalReason && (
          <div className="p-4 bg-gray-50 rounded-xl space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-gray-900">
              {locale === "bn" ? "চিকিৎসা সংক্রান্ত কারণ" : "Medical Indication"}
            </h4>
            <p className="text-gray-600 leading-relaxed">{request.medicalReason}</p>
          </div>
        )}

        {request.notes && (
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1 text-xs">
            <h4 className="font-bold text-amber-900">
              {locale === "bn" ? "জরুরি নির্দেশনা" : "Special Instructions"}
            </h4>
            <p className="text-amber-800">{request.notes}</p>
          </div>
        )}

        {/* Contact Person Box */}
        <div className="p-5 bg-red-50/50 border border-red-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">
                {request.contactPersonName}
              </div>
              <div className="font-mono text-xs text-gray-600">
                {responded ? request.contactPhone : request.contactPhone.slice(0, 6) + "••••••"}
              </div>
            </div>
          </div>

          {!responded && (
            <span className="text-xs text-gray-500 font-medium">
              {locale === "bn" ? "(রক্তদানে সম্মতি দিলে নম্বর প্রকাশিত হবে)" : "(Contact revealed upon responding)"}
            </span>
          )}
        </div>

        {/* Response Action Box */}
        {responded ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-900">
              {locale === "bn" ? "আপনার সম্মতি গৃহীত হয়েছে!" : "Response Registered Successfully!"}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
              {locale === "bn"
                ? `ধন্যবাদ! রোগীর স্বজনদের কাছে আপনার রক্তদানের আগ্রহ পাঠানো হয়েছে। জরুরি যোগাযোগ করুন: ${request.contactPhone}`
                : `Thank you! The patient's attendants have been notified of your generous readiness. Direct Hotline: ${request.contactPhone}`}
            </p>
          </div>
        ) : (
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleRespond}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
              <span>{locale === "bn" ? "আমি রক্ত দান করতে ইচ্ছুক" : "I am Willing to Donate"}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Emergency Blood Request: ${request.bloodGroup} at ${request.hospitalName}`,
                    url: window.location.href,
                  });
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{locale === "bn" ? "শেয়ার করুন" : "Share Request"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
