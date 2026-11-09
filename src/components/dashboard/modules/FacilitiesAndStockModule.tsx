"use client";

import React, { useState } from "react";
import { mockDb } from "@/lib/store/mock-db";
import {
  Building2,
  Archive,
  Layers,
  Clock,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
  ExternalLink,
  Search,
  TestTube,
  ShieldCheck,
} from "lucide-react";

interface FacilitiesAndStockModuleProps {
  activeTab: string;
}

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type ComponentType = "Whole Blood" | "Packed RBC" | "Platelets" | "Plasma";

export function FacilitiesAndStockModule({ activeTab }: FacilitiesAndStockModuleProps) {
  const hospitals = mockDb.getHospitals();
  const bloodBanks = mockDb.getBloodBanks();

  // 8x4 Component Inventory State
  const [matrix, setMatrix] = useState<Record<string, Record<string, number>>>({
    "O+": { "Whole Blood": 18, "Packed RBC": 24, "Platelets": 8, "Plasma": 14 },
    "O-": { "Whole Blood": 3, "Packed RBC": 4, "Platelets": 2, "Plasma": 3 },
    "A+": { "Whole Blood": 14, "Packed RBC": 19, "Platelets": 6, "Plasma": 11 },
    "A-": { "Whole Blood": 2, "Packed RBC": 3, "Platelets": 1, "Plasma": 2 },
    "B+": { "Whole Blood": 12, "Packed RBC": 16, "Platelets": 5, "Plasma": 9 },
    "B-": { "Whole Blood": 3, "Packed RBC": 2, "Platelets": 1, "Plasma": 2 },
    "AB+": { "Whole Blood": 6, "Packed RBC": 8, "Platelets": 3, "Plasma": 5 },
    "AB-": { "Whole Blood": 1, "Packed RBC": 2, "Platelets": 1, "Plasma": 1 },
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateUnits = (group: string, comp: string, delta: number) => {
    setMatrix((prev) => {
      const current = prev[group]?.[comp] || 0;
      const next = Math.max(0, current + delta);
      return {
        ...prev,
        [group]: {
          ...prev[group],
          [comp]: next,
        },
      };
    });
    setToastMessage(`Updated ${group} (${comp}) to ${Math.max(0, (matrix[group]?.[comp] || 0) + delta)} units`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const groups: BloodGroup[] = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const components: ComponentType[] = ["Whole Blood", "Packed RBC", "Platelets", "Plasma"];

  const isStockView = [
    "live-stock",
    "component-stock",
    "inventory",
    "testing-screening",
    "reservation-dispatch",
    "hospital-orders",
    "expiring-alerts",
    "disposal-logs",
  ].includes(activeTab);

  const isBloodBankView = [
    "blood-banks",
    "local-bloodbanks",
    "blood-bank-directory",
  ].includes(activeTab);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {isStockView
                ? "Blood Bank Component Stock & Laboratory Matrix"
                : isBloodBankView
                ? "Accredited Blood Banks & Storage Centers"
                : "Verified Hospitals & Medical College Networks"}
            </h2>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200">
              {isStockView ? "Live Stock Telemetry" : `${hospitals.length} Medical Facilities`}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isStockView
              ? "Real-time 8x4 blood component matrix, screening tests, cold-chain monitoring, and hospital dispatches."
              : "Nationwide hospital directories, emergency transfusion units, and accredited blood bank facilities across all 64 districts."}
          </p>
        </div>

        {toastMessage && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
            ✓ {toastMessage}
          </div>
        )}
      </div>

      {/* VIEW 1: 8x4 Component Matrix (for live-stock, component-stock, inventory, etc.) */}
      {isStockView && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-extrabold text-slate-900 block text-sm">
                8 Blood Groups × 4 Components Matrix
              </span>
              <span className="text-gray-500 text-[11px]">
                Adjust live units with +/- buttons. Syncs automatically with hospital requisitions.
              </span>
            </div>
            <div className="flex items-center gap-3 font-bold text-[11px]">
              <span className="flex items-center gap-1.5 text-red-600">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> &lt; 5 Units (Critical Shortage)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Adequate Supply
              </span>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-3">Blood Group</th>
                  {components.map((comp) => (
                    <th key={comp} className="p-3">{comp}</th>
                  ))}
                  <th className="p-3 text-right">Total Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {groups.map((group) => {
                  const total = components.reduce((sum, c) => sum + (matrix[group]?.[c] || 0), 0);
                  const isLow = total < 15;

                  return (
                    <tr key={group} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-black text-slate-900 flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                            group.includes("-") ? "bg-amber-100 text-amber-900" : "bg-red-100 text-[#E50914]"
                          }`}
                        >
                          {group}
                        </span>
                      </td>

                      {components.map((comp) => {
                        const count = matrix[group]?.[comp] || 0;
                        const isCompLow = count < 5;

                        return (
                          <td key={comp} className="p-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                                  isCompLow
                                    ? "bg-red-100 text-red-700 border border-red-200"
                                    : "bg-slate-100 text-slate-800"
                                }`}
                              >
                                {count}
                              </span>
                              <div className="flex items-center gap-0.5">
                                <button
                                  onClick={() => updateUnits(group, comp, -1)}
                                  className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 font-bold"
                                  title="Remove 1 unit"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => updateUnits(group, comp, 1)}
                                  className="w-5 h-5 rounded bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white font-bold"
                                  title="Add 1 unit"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      <td className="p-3 text-right">
                        <span className={`font-black text-xs ${isLow ? "text-red-600" : "text-slate-900"}`}>
                          {total} Units
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Laboratory Screening & Quality Logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase">
                <TestTube className="w-4 h-4 text-emerald-600" />
                <span>Laboratory Screening Checklist (100% Mandatory)</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                All collected blood units must pass 5 essential transfusion-transmitted infection (TTI) tests: 
                <strong> HIV 1/2, Hepatitis B (HBsAg), Hepatitis C (HCV), Syphilis (VDRL), and Malaria</strong> before release.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Component Shelf-Life & Temperature Control</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Whole Blood: 35 days (2°C to 6°C) · Packed RBC: 42 days (2°C to 6°C) · Platelets: 5 days (20°C to 24°C with continuous agitation) · Plasma: 1 year (-18°C or colder).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Hospital Facilities Table */}
      {!isStockView && (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5">Facility Name</th>
                <th className="p-3.5">District & Location</th>
                <th className="p-3.5">Emergency Hotline</th>
                <th className="p-3.5">Requisitions Handled</th>
                <th className="p-3.5">Accreditation</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hospitals.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3.5">
                    <div className="font-extrabold text-slate-900">{h.nameEn}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{h.nameBn}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800 capitalize">{h.districtId}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{h.upazilaId}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span>{h.contactPhone}</span>
                    </div>
                    {h.emergencyHotline && (
                      <div className="text-[10px] text-red-600 font-bold mt-0.5">
                        Hotline: {h.emergencyHotline}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{h.totalRequestsHandled} Cases</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                      <ShieldCheck className="w-3 h-3" /> Accredited
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <a
                      href={`tel:${h.contactPhone}`}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition inline-block"
                    >
                      Call Desk
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
