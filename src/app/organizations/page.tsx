"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { Organization } from "@/types";
import {
  Users,
  Handshake,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Globe,
  Award,
  Calendar,
} from "lucide-react";

export default function OrganizationsPage() {
  const { locale } = useLanguage();
  const organizations = mockDb.getOrganizations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <Handshake className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "মানবিক সহযোগী নেটওয়ার্ক" : "Humanitarian Partners"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "রক্তদান সহযোগী সংগঠনসমূহ" : "Partner Organizations in Bangladesh"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "সারাদেশে স্বেচ্ছাসেবী রক্তদান ক্যাম্পেইন ও জনসচেতনতায় নিবেদিত সংগঠনবৃন্দ।"
              : "Volunteer networks, youth movements, and student blood donation societies."}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                {org.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{locale === "bn" ? "যাচাইকৃত পার্টনার" : "Verified Partner"}</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {locale === "bn" ? org.nameBn : org.nameEn}
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {org.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl text-xs">
                <div>
                  <span className="text-gray-400 block font-medium">
                    {locale === "bn" ? "আয়োজিত ক্যাম্পেইন" : "Donation Camps"}
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {org.totalDonationCamps}+
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">
                    {locale === "bn" ? "সক্রিয় স্বেচ্ছাসেবী" : "Volunteers"}
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {org.volunteerCount}+
                  </span>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <a href={`mailto:${org.contactEmail}`} className="hover:text-[#E50914] flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{org.contactEmail}</span>
                </a>
                <a href={`tel:${org.contactPhone}`} className="hover:text-[#E50914] flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{org.contactPhone}</span>
                </a>
              </div>

              {org.website && (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#E50914] font-bold hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
