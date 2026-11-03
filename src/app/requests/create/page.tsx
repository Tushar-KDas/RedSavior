"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { mockDb } from "@/lib/store/mock-db";
import { DIVISIONS, getDistrictsByDivision, getUpazilasByDistrict } from "@/data/bangladesh-geo";
import { BloodGroup, RequestUrgency } from "@/types";
import {
  AlertTriangle,
  Building2,
  Calendar,
  Phone,
  User,
  Droplet,
  Send,
  ArrowRight,
} from "lucide-react";

export default function CreateBloodRequestPage() {
  const { locale } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [urgency, setUrgency] = useState<RequestUrgency>("urgent");
  const [hospitalName, setHospitalName] = useState("Dhaka Medical College Hospital (DMCH)");
  const [divisionId, setDivisionId] = useState("DHAKA");
  const [districtId, setDistrictId] = useState("dhaka");
  const [upazilaId, setUpazilaId] = useState("shahbagh");
  const [requiredDate, setRequiredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [requiredTime, setRequiredTime] = useState("12:00");
  const [contactPersonName, setContactPersonName] = useState(user?.fullName || "");
  const [contactPhone, setContactPhone] = useState(user?.phone || "+8801");
  const [medicalReason, setMedicalReason] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const districts = getDistrictsByDivision(divisionId);
  const upazilas = getUpazilasByDistrict(districtId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newReq = mockDb.createRequest({
      requesterUserId: user?.id || `usr-${Date.now()}`,
      requesterName: contactPersonName,
      patientName,
      bloodGroup,
      unitsNeeded: Number(unitsNeeded),
      urgency,
      hospitalName,
      divisionId,
      districtId,
      upazilaId,
      requiredDate,
      requiredTime,
      contactPersonName,
      contactPhone,
      medicalReason,
      notes,
      expiresAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    });

    setSubmitting(false);
    router.push(`/requests/${newReq.id}`);
  };

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "জরুরি সেবা পোর্টাল" : "Lifesaving Emergency Broadcast"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {locale === "bn" ? "রক্তের জরুরি আবেদন পোস্ট করুন" : "Post an Emergency Blood Request"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === "bn"
              ? "সঠিক তথ্য দিন যাতে আপনার নিকটবর্তী উপযুক্ত রক্তদাতাদের দ্রুত নোটিফাই করা যায়।"
              : "Broadcast your request across Bangladesh to mobilize verified blood donors."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
          {/* Section 1: Patient & Blood Requirement */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center text-xs">1</span>
              <span>{locale === "bn" ? "রোগী ও রক্তের গ্রুপ" : "Patient & Blood Details"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "রোগীর নাম বা সংক্ষিপ্ত বিবরণ" : "Patient Name / Reference"}
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Mrs. Salma Begum (Surgery)"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "প্রয়োজনীয় রক্তের গ্রুপ" : "Required Blood Group"}
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
                  {locale === "bn" ? "প্রয়োজনীয় রক্তের পরিমাণ (ব্যাগ/ইউনিট)" : "Units Needed (Bags)"}
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  required
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "জরুরিতা মাত্রা" : "Urgency Priority"}
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as RequestUrgency)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                >
                  <option value="critical_emergency">{locale === "bn" ? "🚨 সঙ্কটাপন্ন জরুরি (Critical)" : "🚨 Critical Emergency"}</option>
                  <option value="urgent">{locale === "bn" ? "⚠️ জরুরি (Urgent)" : "⚠️ Urgent"}</option>
                  <option value="normal">{locale === "bn" ? "সাধারণ শিডিউল (Normal)" : "Normal Schedule"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Hospital & Location */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center text-xs">2</span>
              <span>{locale === "bn" ? "হাসপাতাল ও অবস্থান" : "Hospital & Location"}</span>
            </h3>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {locale === "bn" ? "হাসপাতালের নাম" : "Hospital Name"}
              </label>
              <input
                type="text"
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g. Dhaka Medical College Hospital"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "রক্তদানের কাঙ্ক্ষিত তারিখ" : "Required Date"}
                </label>
                <input
                  type="date"
                  required
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "কাঙ্ক্ষিত সময় (ঐচ্ছিক)" : "Required Time (Optional)"}
                </label>
                <input
                  type="time"
                  value={requiredTime}
                  onChange={(e) => setRequiredTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact Person */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-[#E50914] flex items-center justify-center text-xs">3</span>
              <span>{locale === "bn" ? "যোগাযোগকারীর তথ্য" : "Contact Details"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "যোগাযোগকারীর নাম" : "Contact Person Name"}
                </label>
                <input
                  type="text"
                  required
                  value={contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                  placeholder="e.g. Farhan Kabir (Brother)"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "যোগাযোগের ফোন নম্বর" : "Contact Phone Number"}
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+8801711223344"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {locale === "bn" ? "অতিরিক্ত নির্দেশনা (রক্তের রুম নম্বর বা ল্যাব কাউন্টার)" : "Instructions / Room / Floor"}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Transfusion Medicine Department, Room 204..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <Send className="w-4 h-4" />
            <span>
              {submitting
                ? locale === "bn"
                  ? "আবেদন পোস্ট হচ্ছে..."
                  : "Broadcasting Request..."
                : locale === "bn"
                ? "জরুরি রক্তের আবেদন প্রকাশ করুন"
                : "Broadcast Emergency Request"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
