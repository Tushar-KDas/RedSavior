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
} from "lucide-react";

function RequestsContent() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();

  const [bloodGroup, setBloodGroup] = useState<string>("ALL");
  const [division, setDivision] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("ALL");

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "জরুরি রক্তের আবেদন বোর্ড" : "Live Emergency Blood Feed"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "রক্তের আবেদনসমূহ" : "Blood Requests in Bangladesh"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "রোগীদের দ্রুত সহায়তা প্রদান করতে আপনার রক্তের গ্রুপ অনুযায়ী সাড়া দিন।"
              : "Review active hospital transfusions and respond to save lives."}
          </p>
        </div>

        <Link
          href="/requests/create"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#E50914] text-white rounded-full text-xs sm:text-sm font-bold hover:bg-[#B80012] transition shadow-md self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{locale === "bn" ? "রক্তের নতুন আবেদন করুন" : "Post Blood Request"}</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "প্রয়োজনীয় রক্তের গ্রুপ" : "Required Blood Group"}
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
            >
              <option value="ALL">{locale === "bn" ? "সকল গ্রুপ" : "All Blood Groups"}</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

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
              <option value="critical_emergency">{locale === "bn" ? "সঙ্কটাপন্ন (Critical)" : "Critical Emergency"}</option>
              <option value="urgent">{locale === "bn" ? "জরুরি (Urgent)" : "Urgent"}</option>
              <option value="normal">{locale === "bn" ? "সাধারণ (Normal)" : "Normal"}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Feed */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-[#E50914] font-black text-xl flex-shrink-0 border-2 border-red-200">
                <span>{req.bloodGroup}</span>
                <span className="text-[10px] font-bold text-red-700">
                  {req.unitsNeeded} {locale === "bn" ? "ব্যাগ" : "Units"}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      req.urgency === "critical_emergency"
                        ? "bg-red-600 text-white"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {req.urgency === "critical_emergency"
                      ? locale === "bn" ? "সঙ্কটাপন্ন জরুরি" : "Critical Emergency"
                      : locale === "bn" ? "জরুরি" : "Urgent"}
                  </span>

                  <span className="text-xs font-mono text-gray-400 font-semibold">{req.humanReadableId}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{req.requiredDate} ({req.requiredTime || "Anytime"})</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {req.hospitalName}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <span className="font-medium text-gray-800">
                    {locale === "bn" ? "রোগী:" : "Patient:"} {req.patientName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{req.districtId ? req.districtId.toUpperCase() + ", " : ""}{req.divisionId}</span>
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{req.responsesCount || 0} {locale === "bn" ? "জন সাড়া দিয়েছেন" : "Responses"}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
              <Link
                href={`/requests/${req.id}`}
                className="px-5 py-2.5 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-sm text-xs sm:text-sm flex items-center gap-1.5 transition"
              >
                <span>{locale === "bn" ? "বিস্তারিত ও সাড়া দিন" : "View & Respond"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BloodRequestsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">Loading blood requests...</div>}>
      <RequestsContent />
    </Suspense>
  );
}
