"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DonorProfile } from "@/types";
import { mockDb } from "@/lib/store/mock-db";
import { DISTRICTS, DIVISIONS } from "@/data/bangladesh-geo";
import {
  Search,
  Filter,
  Printer,
  Copy,
  CheckCircle,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  Key,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
  Users,
} from "lucide-react";

interface DonorManagementModuleProps {
  activeTab?: string;
  onOpenPrintModal: (donor: DonorProfile) => void;
}

export function DonorManagementModule({
  activeTab = "donors",
  onOpenPrintModal,
}: DonorManagementModuleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("ALL");
  const [selectedVerification, setSelectedVerification] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [copiedLoginId, setCopiedLoginId] = useState<string | null>(null);

  // Fetch all donors from mockDb (contains 640+ nationwide donors)
  const allDonors = useMemo(() => mockDb.getDonors(), []);

  // Filtered districts based on division
  const availableDistricts = useMemo(() => {
    if (selectedDivision === "ALL") return DISTRICTS;
    return DISTRICTS.filter(d => d.divisionId.toUpperCase() === selectedDivision.toUpperCase());
  }, [selectedDivision]);

  // Filtered donors
  const filteredDonors = useMemo(() => {
    return allDonors.filter((d) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = d.fullName.toLowerCase().includes(q);
        const matchId = d.humanReadableId.toLowerCase().includes(q);
        const matchPhone = d.phone.toLowerCase().includes(q);
        const matchEmail = (d.loginEmail || "").toLowerCase().includes(q);
        const matchDistrict = d.districtId.toLowerCase().includes(q);
        const matchArea = (d.areaOrVillage || "").toLowerCase().includes(q);
        if (!matchName && !matchId && !matchPhone && !matchEmail && !matchDistrict && !matchArea) {
          return false;
        }
      }

      // Division
      if (selectedDivision !== "ALL" && d.divisionId.toUpperCase() !== selectedDivision.toUpperCase()) {
        return false;
      }

      // District
      if (selectedDistrict !== "ALL" && d.districtId.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }

      // Blood Group
      if (selectedBloodGroup !== "ALL" && d.bloodGroup !== selectedBloodGroup) {
        return false;
      }

      // Verification
      if (selectedVerification === "VERIFIED" && !d.isVerified) return false;
      if (selectedVerification === "PENDING" && d.isVerified) return false;

      return true;
    });
  }, [allDonors, searchQuery, selectedDivision, selectedDistrict, selectedBloodGroup, selectedVerification]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDonors.length / pageSize) || 1;
  const paginatedDonors = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDonors.slice(start, start + pageSize);
  }, [filteredDonors, currentPage, pageSize]);

  const handleCopyCredentials = async (donor: DonorProfile) => {
    const creds = `Email: ${donor.loginEmail || donor.phone}\nPassword: ${donor.loginPassword || "RedSavior@2026"}\nDonor ID: ${donor.humanReadableId}`;
    await navigator.clipboard.writeText(creds);
    setCopiedLoginId(donor.id);
    setTimeout(() => setCopiedLoginId(null), 2500);
  };

  const handleVerifyDonor = (donorId: string) => {
    mockDb.verifyDonor(donorId);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-6">
      {/* Title & Nationwide Scope Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              64 Districts Donor Directory & Lifesaver Console
            </h2>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-100 text-[#E50914] border border-red-200">
              {allDonors.length} Verified Donors
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Browse genuine voluntary blood donors across all 64 districts of Bangladesh. View login credentials, verify records, and print official digital ID cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 shadow-sm">
            <Users className="w-3.5 h-3.5 text-red-400" />
            <span>64 Districts Covered</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Search + 64 Districts + Blood Group + Verification) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, ID, phone, upazila, district..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-medium text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition"
          />
        </div>

        {/* Division Filter */}
        <div>
          <select
            value={selectedDivision}
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              setSelectedDistrict("ALL");
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          >
            <option value="ALL">All 8 Divisions</option>
            {DIVISIONS.map((div) => (
              <option key={div.id} value={div.id}>
                {div.nameEn} ({div.nameBn})
              </option>
            ))}
          </select>
        </div>

        {/* District Filter (All 64 Districts) */}
        <div>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          >
            <option value="ALL">All 64 Districts</option>
            {availableDistricts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {dist.nameEn} ({dist.nameBn})
              </option>
            ))}
          </select>
        </div>

        {/* Blood Group Filter */}
        <div>
          <select
            value={selectedBloodGroup}
            onChange={(e) => {
              setSelectedBloodGroup(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          >
            <option value="ALL">All Blood Groups</option>
            {["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg} Group
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count & Current Active Filters Summary */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-1 pb-1">
        <div>
          Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> –{" "}
          <strong>{Math.min(currentPage * pageSize, filteredDonors.length)}</strong> of{" "}
          <strong className="text-slate-900">{filteredDonors.length}</strong> matching donors
        </div>

        {(searchQuery || selectedDivision !== "ALL" || selectedDistrict !== "ALL" || selectedBloodGroup !== "ALL") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDivision("ALL");
              setSelectedDistrict("ALL");
              setSelectedBloodGroup("ALL");
              setSelectedVerification("ALL");
              setCurrentPage(1);
            }}
            className="text-[11px] font-bold text-[#E50914] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Main Donor Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200/80">
            <tr>
              <th className="p-3.5">Donor Profile & ID</th>
              <th className="p-3.5">Blood Group</th>
              <th className="p-3.5">District & Location</th>
              <th className="p-3.5">Contact Details</th>
              <th className="p-3.5">Login Credentials (Admin Access)</th>
              <th className="p-3.5">Verification</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedDonors.map((donor) => {
              const distObj = DISTRICTS.find(d => d.id.toLowerCase() === donor.districtId.toLowerCase());
              const districtLabel = distObj ? `${distObj.nameEn} (${distObj.nameBn})` : donor.districtId;

              return (
                <tr key={donor.id} className="hover:bg-slate-50/70 transition">
                  {/* Donor Profile & ID */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-200 flex-shrink-0 bg-slate-100">
                        <Image
                          src={donor.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"}
                          alt={donor.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-900 truncate">{donor.fullName}</div>
                        <div className="font-mono text-[10px] text-gray-400 font-bold tracking-wider">
                          {donor.humanReadableId}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Blood Group */}
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-xs font-black inline-flex items-center gap-1 ${
                        donor.bloodGroup.includes("-")
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : "bg-red-100 text-[#E50914] border border-red-200"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      {donor.bloodGroup}
                    </span>
                  </td>

                  {/* District & Location */}
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800 capitalize">{districtLabel}</div>
                    <div className="text-[10px] text-gray-500 capitalize flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                      <span className="truncate">{donor.areaOrVillage || donor.upazilaId}</span>
                    </div>
                  </td>

                  {/* Contact Phone & Email */}
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <a href={`tel:${donor.phone}`} className="hover:underline">
                        {donor.phone}
                      </a>
                    </div>
                    <div className="text-[10px] text-gray-400 truncate mt-0.5">
                      {donor.loginEmail || "donor@redsavior.org"}
                    </div>
                  </td>

                  {/* Login Credentials (Admin view & 1-click copy) */}
                  <td className="p-3.5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-[11px] space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-500 text-[10px]">User:</span>
                        <span className="text-slate-800 font-bold truncate max-w-[150px]">
                          {donor.loginEmail || donor.phone}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-500 text-[10px]">Pass:</span>
                        <span className="text-slate-800 font-bold">
                          {donor.loginPassword || "RedSavior@2026"}
                        </span>
                        <button
                          onClick={() => handleCopyCredentials(donor)}
                          className="p-1 rounded hover:bg-slate-200 text-gray-500 hover:text-slate-800 transition"
                          title="Copy Login Credentials"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    {copiedLoginId === donor.id && (
                      <span className="text-[9px] font-bold text-emerald-600 block mt-1">
                        ✓ Credentials copied to clipboard!
                      </span>
                    )}
                  </td>

                  {/* Verification & Donations */}
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{donor.totalVerifiedDonations} Donations</div>
                    <div className="mt-1">
                      {donor.isVerified ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-max">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions (Print ID Card + Approve + Call) */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Print ID Card Button */}
                      <button
                        onClick={() => onOpenPrintModal(donor)}
                        className="px-3 py-1.5 bg-[#E50914] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-red-600/20"
                        title="Print Digital ID Card"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print ID</span>
                      </button>

                      {!donor.isVerified && (
                        <button
                          onClick={() => handleVerifyDonor(donor.id)}
                          className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
        <span className="text-gray-500">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredDonors.length} total donors)
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-gray-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Quick Page Jumper Buttons */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) {
              pageNum = currentPage - 2 + i;
              if (pageNum > totalPages) pageNum = totalPages - (4 - i);
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl font-bold text-xs transition ${
                  currentPage === pageNum
                    ? "bg-[#E50914] text-white shadow-sm"
                    : "border border-gray-200 text-slate-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-gray-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
