"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { DIVISIONS, getDistrictsByDivision } from "@/data/bangladesh-geo";
import { BloodGroup, BloodRequest } from "@/types";
import {
  Droplet,
  PlusCircle,
  Filter,
  AlertTriangle,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Heart,
  Clock,
  Sparkles,
  PhoneCall,
  Share2,
  Check,
} from "lucide-react";

function RequestsContent() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();

  const [bloodGroup, setBloodGroup] = useState<string>("ALL");
  const [division, setDivision] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const districts = getDistrictsByDivision(division);
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    const list = mockDb.getRequests({
      bloodGroup,
      divisionId: division,
      districtId: district,
      urgency,
    });
    setRequests(list);
  }, [bloodGroup, division, district, urgency]);

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleShare = (reqId: string) => {
    const url = `${window.location.origin}/requests/${reqId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(reqId);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Emergency Slogan Strip */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-900/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>
              {locale === "bn"
                ? "জরুরি লাইভ রক্তের রিকুইজিশন বোর্ড"
                : "Real-time Emergency Blood Board"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {locale === "bn"
              ? "জীবন বাঁচাতে রক্তের আবেদনসমূহ"
              : "Active Emergency Blood Requests"}
          </h1>
          <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
            {locale === "bn"
              ? "রোগীদের দ্রুত সহায়তা প্রদান করতে আপনার রক্তের গ্রুপ অনুযায়ী সাড়া দিন। আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি মূল্যবান জীবন।"
              : "Respond directly to hospital requisitions across Bangladesh. Verified clinical data, direct donor-patient dispatch."}
          </p>
        </div>

        <Link
          href="/requests/create"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#E50914] rounded-2xl text-xs sm:text-sm font-black hover:bg-gray-100 transition shadow-lg self-start md:self-auto flex-shrink-0 z-10"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{locale === "bn" ? "রক্তের নতুন আবেদন পোস্ট করুন" : "Post Blood Request"}</span>
        </Link>
      </div>

      {/* 1-Click Blood Group Quick Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-700 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#E50914] fill-[#E50914]" />
            <span>{locale === "bn" ? "গ্রুপ নির্বাচন করে আবেদন দেখুন" : "Filter by Blood Group"}</span>
          </span>
          <span className="text-gray-400">
            {bloodGroup === "ALL" ? "All Groups" : `Selected: ${bloodGroup}`}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          <button
            onClick={() => setBloodGroup("ALL")}
            className={`py-2 px-3 rounded-xl font-black text-xs transition-all ${
              bloodGroup === "ALL"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {locale === "bn" ? "সকল" : "ALL"}
          </button>
          {bloodGroups.map((bg) => (
            <button
              key={bg}
              onClick={() => setBloodGroup(bg)}
              className={`py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 ${
                bloodGroup === bg
                  ? "bg-[#E50914] text-white shadow-md shadow-red-600/30 ring-2 ring-red-400"
                  : "bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-[#E50914] border border-gray-200"
              }`}
            >
              <Droplet className={`w-3 h-3 ${bloodGroup === bg ? "fill-white" : "fill-current"}`} />
              <span>{bg}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters: Urgency & Location */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Filter className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "জরুরিতা ও এলাকা ফিল্টার" : "Urgency & Geographic Filters"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          {/* Division */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "বিভাগ" : "Division"}
            </label>
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
              }}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
            >
              <option value="">{locale === "bn" ? "সকল বিভাগ" : "All Divisions"}</option>
              {DIVISIONS.map((div) => (
                <option key={div.id} value={div.id}>
                  {locale === "bn" ? div.nameBn : div.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "জেলা" : "District"}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!division}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 disabled:opacity-50"
            >
              <option value="">{locale === "bn" ? "সকল জেলা" : "All Districts"}</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {locale === "bn" ? dist.nameBn : dist.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "জরুরিতা মাত্রা" : "Urgency Priority"}
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
            >
              <option value="ALL">{locale === "bn" ? "সকল আবেদন" : "All Urgencies"}</option>
              <option value="critical_emergency">
                {locale === "bn" ? "সঙ্কটাপন্ন (Critical - Within 2h)" : "Critical (Within 2h)"}
              </option>
              <option value="urgent">
                {locale === "bn" ? "জরুরি (Urgent - Within 12h)" : "Urgent (Within 12h)"}
              </option>
              <option value="normal">
                {locale === "bn" ? "সাধারণ (Normal / Scheduled)" : "Normal / Scheduled"}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Feed */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
            <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">
              {locale === "bn" ? "কোন আবেদন পাওয়া যায়নি" : "No Active Requests"}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {locale === "bn"
                ? "আপনার নির্বাচিত ফিল্টারের সাথে মিলিয়ে কোনো রক্তের আবেদন পাওয়া যায়নি।"
                : "No requisitions matched your current filters. Check other groups or divisions."}
            </p>
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                {/* Blood Group Badge */}
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-xl flex-shrink-0 shadow-lg shadow-red-600/30">
                  <span>{req.bloodGroup}</span>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full mt-0.5">
                    {req.unitsNeeded} {locale === "bn" ? "ব্যাগ" : "Units"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        req.urgency === "critical_emergency"
                          ? "bg-red-600 text-white animate-pulse"
                          : req.urgency === "urgent"
                          ? "bg-amber-500 text-white"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>
                        {req.urgency === "critical_emergency"
                          ? locale === "bn"
                            ? "সঙ্কটাপন্ন জরুরি"
                            : "Critical Emergency"
                          : locale === "bn"
                          ? "জরুরি"
                          : "Urgent Requisition"}
                      </span>
                    </span>

                    <span className="text-xs font-mono text-gray-400 font-bold">
                      {req.humanReadableId}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {req.requiredDate} ({req.requiredTime || "Immediate"})
                      </span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-xl font-black text-gray-900 tracking-tight">
                    {req.hospitalName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">
                      {locale === "bn" ? "রোগী:" : "Patient:"} {req.patientName} (
                      {req.medicalReason || "Hospitalized"})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                      <span>
                        {req.districtId ? req.districtId.toUpperCase() + ", " : ""}
                        {req.divisionId}
                      </span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {req.responsesCount || 0}{" "}
                        {locale === "bn" ? "জন সাড়া দিয়েছেন" : "Donors Responded"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <button
                  onClick={() => handleShare(req.id)}
                  className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  title="Share Request Link"
                >
                  {copiedId === req.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>

                <Link
                  href={`/requests/${req.id}`}
                  className="px-5 py-2.5 bg-[#E50914] text-white font-black rounded-xl hover:bg-[#B80012] shadow-md shadow-red-600/20 text-xs sm:text-sm flex items-center gap-1.5 transition"
                >
                  <span>{locale === "bn" ? "সাড়া দিন ও বিস্তারিত" : "Respond to Donate"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function BloodRequestsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-sm text-gray-500">
          Loading blood requests...
        </div>
      }
    >
      <RequestsContent />
    </Suspense>
  );
}
