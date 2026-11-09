"use client";

import React, { useState } from "react";
import {
  Building2,
  AlertTriangle,
  Heart,
  Droplet,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  Radio,
  FileCheck,
  PhoneCall,
  PlusCircle,
} from "lucide-react";

interface HospitalAdminDashboardProps {
  hospitalName?: string;
  onNavigateTab: (tabId: string) => void;
}

const ACTIVE_PATIENT_REQUISITIONS = [
  {
    id: "hosp-req-01",
    patient: "Tahmina Khatun (Bed 402, ICU)",
    bloodGroup: "O+",
    unitsNeeded: 2,
    urgency: "CRITICAL",
    requiredBy: "Today 1:00 PM",
    matchedDonors: 6,
    incomingDonors: 1,
  },
  {
    id: "hosp-req-02",
    patient: "Abdul Jabbar (Surgery Ward, Post-Op)",
    bloodGroup: "A+",
    unitsNeeded: 3,
    urgency: "URGENT",
    requiredBy: "Today 4:00 PM",
    matchedDonors: 12,
    incomingDonors: 2,
  },
  {
    id: "hosp-req-03",
    patient: "Baby of Sumaiya (Neonatal ICU)",
    bloodGroup: "O-",
    unitsNeeded: 1,
    urgency: "CRITICAL",
    requiredBy: "Immediate",
    matchedDonors: 2,
    incomingDonors: 1,
  },
];

export function HospitalAdminDashboard({
  hospitalName = "Dhaka Medical College Hospital (DMCH)",
  onNavigateTab,
}: HospitalAdminDashboardProps) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logSuccess, setLogSuccess] = useState(false);

  const handleSimulateTransfusion = () => {
    setLogSuccess(true);
    setTimeout(() => {
      setLogSuccess(false);
      setShowLogModal(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Hospital Clinical Portal
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span>{hospitalName}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Clinical emergency requisitions, donor arrival triage, and blood transfusion verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab("emergency-requests")}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Emergency Requisition</span>
          </button>
          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Log Transfusion</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Emergency Requests */}
        <div
          onClick={() => onNavigateTab("emergency-requests")}
          className="p-5 rounded-2xl bg-red-50/80 border border-red-200/90 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>Active Requisitions</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">3</div>
          <p className="text-[11px] text-red-700/80 mt-1">2 ICU & Neonatal Critical</p>
        </div>

        {/* Incoming Donors */}
        <div
          onClick={() => onNavigateTab("donor-matching")}
          className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Incoming Donors Today</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">4</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">En route to Blood Transfusion Unit</p>
        </div>

        {/* Transfusions Completed */}
        <div
          onClick={() => onNavigateTab("transfusion-records")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Completed Transfusions</span>
            <FileCheck className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">1,240</div>
          <p className="text-[11px] text-gray-400 mt-1">Verified patient logs</p>
        </div>

        {/* Matched Donors in 5km */}
        <div
          onClick={() => onNavigateTab("donor-matching")}
          className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/90 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold uppercase">
            <span>Ready Donors (5km)</span>
            <Droplet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-900 mt-2">85</div>
          <p className="text-[11px] text-blue-700/80 mt-1">Available for emergency call</p>
        </div>
      </div>

      {/* Row 2: Live Patient Emergency Requisition Queue */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Active In-Hospital Patient Requisitions
            </h3>
            <p className="text-[10px] text-gray-400">Manage patient requirement urgency and incoming volunteers</p>
          </div>
          <span className="text-[11px] font-bold text-red-600">3 Pending Patients</span>
        </div>

        <div className="space-y-3 mt-4">
          {ACTIVE_PATIENT_REQUISITIONS.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-red-100 bg-red-50/30 hover:bg-red-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">{req.patient}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                    {req.bloodGroup} · {req.unitsNeeded} Units Needed
                  </span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                    {req.urgency}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-1.5">
                  <span>Required: <strong>{req.requiredBy}</strong></span>
                  <span>Matched: <strong>{req.matchedDonors} nearby</strong></span>
                  <span className="text-emerald-700 font-bold">Incoming: {req.incomingDonors} Donor</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onNavigateTab("donor-matching")}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                >
                  Call Next Donor
                </button>
                <button
                  onClick={() => setShowLogModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                >
                  Log Units
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Quick Transfusion Log */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">
              Verify Clinical Blood Transfusion
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Confirm patient cross-matching and batch screening verification.
            </p>

            {logSuccess ? (
              <div className="p-4 mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-emerald-800">
                  Transfusion verified and recorded to Supabase audit log!
                </span>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Patient Name / Hospital Bed</label>
                  <input
                    type="text"
                    defaultValue="Tahmina Khatun (Bed 402, ICU)"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Blood Group & Units</label>
                  <input
                    type="text"
                    defaultValue="O+ (Whole Blood, 1 Unit)"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Attending Physician / Transfusionist</label>
                  <input
                    type="text"
                    defaultValue="Dr. Kamal Hossain (Registrar, DMCH)"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-semibold"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button
                    onClick={() => setShowLogModal(false)}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl border hover:bg-gray-50 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSimulateTransfusion}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  >
                    Confirm & Issue Certificate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
