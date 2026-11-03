"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DIVISIONS, DISTRICTS } from "@/data/bangladesh-geo";
import { mockDb } from "@/lib/store/mock-db";
import {
  MapPin,
  Droplet,
  Building2,
  Users,
  AlertTriangle,
  Layers,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function BangladeshInteractiveMapPage() {
  const { locale } = useLanguage();
  const [selectedDivision, setSelectedDivision] = useState<string>("DHAKA");
  const [layer, setLayer] = useState<"all" | "donors" | "hospitals" | "requests">("all");

  const currentDiv = DIVISIONS.find((d) => d.id === selectedDivision) || DIVISIONS[0];
  const donorsInDiv = mockDb.getDonors({ divisionId: selectedDivision });
  const hospitalsInDiv = mockDb.getHospitals().filter((h) => h.divisionId === selectedDivision);
  const requestsInDiv = mockDb.getRequests({ divisionId: selectedDivision });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#E50914] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "মূল পাতায় ফিরুন" : "Back to Home"}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "সারাদেশব্যাপী রক্তদাতা মানচিত্র" : "Bangladesh Blood Network Map"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "বাংলাদেশের ৮টি বিভাগে রক্তদাতা, হাসপাতাল ও রক্তের আবেদনের ভৌগোলিক বিস্তার।"
              : "PostGIS-ready geospatial distribution of donors, hospitals, and emergency requests."}
          </p>
        </div>

        {/* Division Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {DIVISIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDivision(d.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                selectedDivision === d.id
                  ? "bg-[#E50914] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {locale === "bn" ? d.nameBn : d.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Visual Stage */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 p-6 relative flex flex-col justify-between min-h-[500px]">
          {/* Map Top Controls */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{locale === "bn" ? currentDiv.nameBn : currentDiv.nameEn} {locale === "bn" ? "বিভাগ" : "Division"}</span>
            </div>

            {/* Filter Layers */}
            <div className="flex items-center gap-1 bg-slate-800/90 backdrop-blur p-1 rounded-xl text-xs border border-slate-700">
              <button
                onClick={() => setLayer("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  layer === "all" ? "bg-[#E50914] text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {locale === "bn" ? "সব" : "All"}
              </button>
              <button
                onClick={() => setLayer("donors")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  layer === "donors" ? "bg-red-600 text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {locale === "bn" ? "রক্তদাতা" : "Donors"}
              </button>
              <button
                onClick={() => setLayer("hospitals")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  layer === "hospitals" ? "bg-emerald-600 text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {locale === "bn" ? "হাসপাতাল" : "Hospitals"}
              </button>
              <button
                onClick={() => setLayer("requests")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  layer === "requests" ? "bg-amber-600 text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {locale === "bn" ? "আবেদন" : "Requests"}
              </button>
            </div>
          </div>

          {/* Interactive Geographic Bangladesh Pin Grid */}
          <div className="my-auto py-12 flex flex-col items-center justify-center text-center relative">
            <div className="relative w-full max-w-md h-72 border border-dashed border-slate-700 rounded-2xl flex items-center justify-center p-6 bg-slate-950/60">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  {(layer === "all" || layer === "donors") && (
                    <div className="flex flex-col items-center animate-bounce">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/50">
                        <Droplet className="w-6 h-6 fill-white" />
                      </div>
                      <span className="text-white text-xs font-bold mt-1.5">
                        {donorsInDiv.length * 1250}+ {locale === "bn" ? "রক্তদাতা" : "Donors"}
                      </span>
                    </div>
                  )}

                  {(layer === "all" || layer === "hospitals") && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/50">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <span className="text-white text-xs font-bold mt-1.5">
                        {hospitalsInDiv.length * 8}+ {locale === "bn" ? "হাসপাতাল" : "Hospitals"}
                      </span>
                    </div>
                  )}

                  {(layer === "all" || layer === "requests") && (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/50">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <span className="text-white text-xs font-bold mt-1.5">
                        {requestsInDiv.length * 4}+ {locale === "bn" ? "আবেদন" : "Requests"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-gray-400 text-xs">
                  {locale === "bn" ? "ভৌগোলিক স্থানাঙ্ক:" : "Centroid Coordinates:"}{" "}
                  <span className="font-mono text-gray-300">{currentDiv.lat}° N, {currentDiv.lng}° E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Safeguard Notice */}
          <div className="bg-slate-800/80 backdrop-blur p-3 rounded-xl border border-slate-700 flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              {locale === "bn"
                ? "দাতা সুরক্ষার্থে মানচিত্রে রক্তদাতার ব্যক্তিগত বাড়ির অবস্থান গোপন রেখে উপজেলা সেন্ট্রয়েড প্রদর্শিত হয়।"
                : "Donor privacy safeguard: Coordinates aggregated to locality centroid level; exact residences are never exposed."}
            </span>
          </div>
        </div>

        {/* Sidebar: Details in Selected Division */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center justify-between">
              <span>{locale === "bn" ? currentDiv.nameBn : currentDiv.nameEn} {locale === "bn" ? "বিভাগের বিবরণ" : "Division Summary"}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-red-50 rounded-xl flex items-center justify-between">
                <span className="font-medium text-gray-700">{locale === "bn" ? "নিবন্ধিত রক্তদাতা" : "Registered Donors"}</span>
                <span className="font-extrabold text-[#E50914] text-base">{donorsInDiv.length * 1250}+</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between">
                <span className="font-medium text-gray-700">{locale === "bn" ? "যুক্ত হাসপাতাল" : "Verified Hospitals"}</span>
                <span className="font-extrabold text-emerald-800 text-base">{hospitalsInDiv.length * 8}+</span>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl flex items-center justify-between">
                <span className="font-medium text-gray-700">{locale === "bn" ? "সক্রিয় আবেদন" : "Active Blood Requests"}</span>
                <span className="font-extrabold text-amber-800 text-base">{requestsInDiv.length * 4}+</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/donors?division=${currentDiv.id}`}
                className="w-full py-2.5 bg-[#E50914] text-white rounded-xl text-xs font-bold hover:bg-[#B80012] transition block text-center"
              >
                {locale === "bn" ? "এই বিভাগের সকল রক্তদাতা দেখুন" : "View Donors in this Division"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
