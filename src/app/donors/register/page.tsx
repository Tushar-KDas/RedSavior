"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { mockDb } from "@/lib/store/mock-db";
import { DIVISIONS, getDistrictsByDivision, getUpazilasByDistrict } from "@/data/bangladesh-geo";
import { BloodGroup } from "@/types";
import {
  UserPlus,
  Droplet,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Calendar,
  Phone,
  QrCode,
  ArrowRight,
} from "lucide-react";

export default function DonorRegistrationPage() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const router = useRouter();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "+8801");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [divisionId, setDivisionId] = useState("DHAKA");
  const [districtId, setDistrictId] = useState("dhaka");
  const [upazilaId, setUpazilaId] = useState("dhanmondi");
  const [areaOrVillage, setAreaOrVillage] = useState("");
  const [emergencyOptIn, setEmergencyOptIn] = useState(true);
  const [publicDirectoryConsent, setPublicDirectoryConsent] = useState(true);
  const [publicPhoneVisibility, setPublicPhoneVisibility] = useState(false);
  const [bio, setBio] = useState("");

  const [createdDonorId, setCreatedDonorId] = useState<string | null>(null);
  const [humanReadableId, setHumanReadableId] = useState<string | null>(null);

  const districts = getDistrictsByDivision(divisionId);
  const upazilas = getUpazilasByDistrict(districtId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDonor = mockDb.createDonorProfile({
      userId: user?.id || `usr-${Date.now()}`,
      fullName,
      phone,
      bloodGroup,
      divisionId,
      districtId,
      upazilaId,
      areaOrVillage,
      lat: 23.8103,
      lng: 90.4125,
      contactAvailable: true,
      emergencyOptIn,
      publicDirectoryConsent,
      publicPhoneVisibility,
      bio,
    });

    setCreatedDonorId(newDonor.id);
    setHumanReadableId(newDonor.humanReadableId);
  };

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  if (createdDonorId && humanReadableId) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {locale === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে!" : "Donor Registration Successful!"}
          </h2>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100 inline-block">
            <div className="text-xs text-red-600 font-semibold uppercase tracking-wider">
              {locale === "bn" ? "আপনার ডিজিটাল রক্তদাতা আইডি" : "Your Digital Donor ID"}
            </div>
            <div className="text-2xl font-mono font-black text-[#E50914] mt-1">
              {humanReadableId}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "bn"
              ? "ধন্যবাদ! রেডসেভিয়রে আপনার রক্তদাতা প্রোফাইল ও কিউআর-যুক্ত ডিজিটাল আইডি কার্ড তাৎক্ষণিকভাবে তৈরি হয়েছে।"
              : "Thank you for stepping forward to save lives. Your profile and secure QR digital donor ID card are ready."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/id-card?id=${humanReadableId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition text-xs sm:text-sm"
            >
              <QrCode className="w-4 h-4" />
              <span>{locale === "bn" ? "আইডি কার্ড দেখুন ও ডাউনলোড করুন" : "View & Download ID Card"}</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition text-xs sm:text-sm"
            >
              <span>{locale === "bn" ? "ড্যাশবোর্ডে যান" : "Go to Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <Droplet className="w-4 h-4 fill-[#E50914]" />
            <span>{locale === "bn" ? "জীবন বাঁচানোর মানবিক উদ্যোগ" : "Join Nationwide Blood Donor Registry"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {locale === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করুন" : "Register as a Blood Donor"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === "bn"
              ? "সঠিক তথ্য প্রদান করে ডিজিটাল রক্তদাতা আইডি কার্ড গ্রহণ করুন।"
              : "Provide your accurate details to receive a verified digital donor ID card."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
          {/* Section 1: Personal */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center text-xs">1</span>
              <span>{locale === "bn" ? "ব্যক্তিগত তথ্য" : "Personal Information"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "পূর্ণ নাম" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahim Ahmed"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800 font-bold text-[#E50914]"
                >
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "মোবাইল নম্বর" : "Mobile Number"}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801711234567"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "জন্ম তারিখ" : "Date of Birth"}
                </label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center text-xs">2</span>
              <span>{locale === "bn" ? "রক্তদানের এলাকা / অবস্থান" : "Location Hierarchy"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "বিভাগ" : "Division"}
                </label>
                <select
                  value={divisionId}
                  onChange={(e) => {
                    setDivisionId(e.target.value);
                    setDistrictId("");
                    setUpazilaId("");
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                >
                  {DIVISIONS.map((div) => (
                    <option key={div.id} value={div.id}>
                      {locale === "bn" ? div.nameBn : div.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "জেলা" : "District"}
                </label>
                <select
                  value={districtId}
                  onChange={(e) => {
                    setDistrictId(e.target.value);
                    setUpazilaId("");
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                >
                  <option value="">{locale === "bn" ? "জেলা নির্বাচন" : "Select District"}</option>
                  {districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {locale === "bn" ? dist.nameBn : dist.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "উপজেলা / থানা" : "Upazila / Thana"}
                </label>
                <select
                  value={upazilaId}
                  onChange={(e) => setUpazilaId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                >
                  <option value="">{locale === "bn" ? "উপজেলা নির্বাচন" : "Select Upazila"}</option>
                  {upazilas.map((upa) => (
                    <option key={upa.id} value={upa.id}>
                      {locale === "bn" ? upa.nameBn : upa.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {locale === "bn" ? "গ্রাম / পাড়া / এলাকা" : "Area / Village / Road"}
              </label>
              <input
                type="text"
                value={areaOrVillage}
                onChange={(e) => setAreaOrVillage(e.target.value)}
                placeholder="e.g. Dhanmondi Road 8A"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          {/* Section 3: Privacy & Preferences */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center text-xs">3</span>
              <span>{locale === "bn" ? "গোপনীয়তা ও সম্মতি" : "Privacy & Consent Settings"}</span>
            </h3>

            <div className="space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicDirectoryConsent}
                  onChange={(e) => setPublicDirectoryConsent(e.target.checked)}
                  className="mt-0.5 rounded text-[#E50914] focus:ring-[#E50914]"
                />
                <span className="text-gray-700">
                  {locale === "bn"
                    ? "পাবলিক রক্তদাতা তালিকায় নাম ও রক্তের গ্রুপ প্রদর্শনে আমার সম্মতি আছে।"
                    : "I consent to appear in the public donor search directory."}
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emergencyOptIn}
                  onChange={(e) => setEmergencyOptIn(e.target.checked)}
                  className="mt-0.5 rounded text-[#E50914] focus:ring-[#E50914]"
                />
                <span className="text-gray-700">
                  {locale === "bn"
                    ? "নিকটবর্তী কোনো রোগী সঙ্কটাপন্ন অবস্থায় থাকলে জরুরি নোটিফিকেশন পেতে চাই।"
                    : "Opt-in to receive critical emergency alerts for patients nearby."}
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicPhoneVisibility}
                  onChange={(e) => setPublicPhoneVisibility(e.target.checked)}
                  className="mt-0.5 rounded text-[#E50914] focus:ring-[#E50914]"
                />
                <span className="text-gray-700">
                  {locale === "bn"
                    ? "আমার ফোন নম্বর সরাসরি পাবলিকলি দৃশ্যমান রাখতে চাই (অন্যথায় সুরক্ষিতভাবে মাস্ক করা থাকবে)।"
                    : "Make my phone number publicly visible (otherwise it is masked by default)."}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "সংক্ষিপ্ত পরিচয় / মানবিক বার্তা (ঐচ্ছিক)" : "Short Bio (Optional)"}
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Regular voluntary blood donor ready to help..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-lg transition flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{locale === "bn" ? "নিবন্ধন সম্পন্ন করুন এবং আইডি কার্ড পান" : "Complete Registration & Get ID Card"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
