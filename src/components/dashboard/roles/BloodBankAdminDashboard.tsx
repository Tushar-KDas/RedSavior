"use client";

import React, { useState } from "react";
import {
  Archive,
  Layers,
  AlertTriangle,
  Clock,
  Droplet,
  Truck,
  CheckCircle,
  Plus,
  Minus,
  ArrowRight,
  TrendingUp,
  Building2,
} from "lucide-react";

interface BloodBankAdminDashboardProps {
  bloodBankName?: string;
  onNavigateTab: (tabId: string) => void;
}

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type ComponentType = "Whole Blood" | "Packed RBC" | "Platelets" | "Plasma";

interface InventoryState {
  [group: string]: {
    [component: string]: number;
  };
}

const INITIAL_MATRIX: InventoryState = {
  "O+": { "Whole Blood": 18, "Packed RBC": 24, "Platelets": 8, "Plasma": 14 },
  "O-": { "Whole Blood": 3, "Packed RBC": 4, "Platelets": 2, "Plasma": 3 },
  "A+": { "Whole Blood": 14, "Packed RBC": 19, "Platelets": 6, "Plasma": 11 },
  "A-": { "Whole Blood": 2, "Packed RBC": 3, "Platelets": 1, "Plasma": 2 },
  "B+": { "Whole Blood": 12, "Packed RBC": 16, "Platelets": 5, "Plasma": 9 },
  "B-": { "Whole Blood": 3, "Packed RBC": 2, "Platelets": 1, "Plasma": 2 },
  "AB+": { "Whole Blood": 6, "Packed RBC": 8, "Platelets": 3, "Plasma": 5 },
  "AB-": { "Whole Blood": 1, "Packed RBC": 2, "Platelets": 1, "Plasma": 1 },
};

const EXPIRING_UNITS = [
  { group: "AB-", component: "Platelets", bagCode: "BAG-8842-AB-", expires: "In 18 hours", status: "Critical" },
  { group: "O-", component: "Whole Blood", bagCode: "BAG-9120-O-", expires: "In 26 hours", status: "Urgent" },
  { group: "A+", component: "Platelets", bagCode: "BAG-7731-A+", expires: "In 38 hours", status: "Monitor" },
];

export function BloodBankAdminDashboard({
  bloodBankName = "Bangladesh Red Crescent Central Blood Bank",
  onNavigateTab,
}: BloodBankAdminDashboardProps) {
  const [matrix, setMatrix] = useState<InventoryState>(INITIAL_MATRIX);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  const updateUnits = (group: BloodGroup, comp: ComponentType, delta: number) => {
    setMatrix((prev) => {
      const currentVal = prev[group]?.[comp] || 0;
      const nextVal = Math.max(0, currentVal + delta);
      return {
        ...prev,
        [group]: {
          ...prev[group],
          [comp]: nextVal,
        },
      };
    });
    setSaveBanner(`Updated ${group} (${comp})`);
    setTimeout(() => setSaveBanner(null), 2500);
  };

  // Calculate totals
  const totalUnits = Object.values(matrix).reduce(
    (sum, comps) => sum + Object.values(comps).reduce((s, v) => s + v, 0),
    0
  );

  const groups: BloodGroup[] = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const components: ComponentType[] = ["Whole Blood", "Packed RBC", "Platelets", "Plasma"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Blood Bank Inventory & Component Operations
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 flex items-center gap-1">
              <Archive className="w-3 h-3" />
              <span>{bloodBankName}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time component stock monitoring, expiration alerts, and hospital cross-match dispatches.
          </p>
        </div>

        {saveBanner && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
            ✓ {saveBanner}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Stock */}
        <div
          onClick={() => onNavigateTab("live-stock")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Total Units In Stock</span>
            <Archive className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{totalUnits}</div>
          <p className="text-[11px] text-gray-400 mt-1">Across 8 Blood Groups & 4 Components</p>
        </div>

        {/* Critical Low Stock Alert */}
        <div
          onClick={() => onNavigateTab("component-stock")}
          className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>Critical Low Groups</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">2 Groups</div>
          <p className="text-[11px] text-red-700/80 mt-1">AB- and O- below threshold (&lt; 5 units)</p>
        </div>

        {/* Units Expiring in 48h */}
        <div
          onClick={() => onNavigateTab("expiring-alerts")}
          className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase">
            <span>Expiring in 48 Hours</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-900 mt-2">3 Bags</div>
          <p className="text-[11px] text-amber-700/80 mt-1">Platelet short shelf-life alerts</p>
        </div>

        {/* Today's Dispatches */}
        <div
          onClick={() => onNavigateTab("reservation-dispatch")}
          className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Dispatched Today</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">12 Units</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">To DMCH & BSMMU Emergency</p>
        </div>
      </div>

      {/* Row 2: 8x4 Component Matrix */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              Live Blood Component Inventory Matrix (8 × 4)
            </h3>
            <p className="text-xs text-gray-500">
              Interactive unit adjustment across all 8 blood groups and components. Real-time sync to Supabase.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-red-600">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> &lt; 5 Units (Critical)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Adequate
            </span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-extrabold uppercase">
                <th className="py-2.5 px-3">Blood Group</th>
                {components.map((comp) => (
                  <th key={comp} className="py-2.5 px-3">{comp}</th>
                ))}
                <th className="py-2.5 px-3 text-right">Group Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {groups.map((group) => {
                const groupTotal = components.reduce(
                  (sum, c) => sum + (matrix[group]?.[c] || 0),
                  0
                );
                const isGroupLow = groupTotal < 15;

                return (
                  <tr key={group} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 font-black text-slate-900 flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                        group.includes("-") ? "bg-amber-100 text-amber-900" : "bg-red-100 text-red-700"
                      }`}>
                        {group}
                      </span>
                    </td>

                    {components.map((comp) => {
                      const count = matrix[group]?.[comp] || 0;
                      const isLow = count < 5;

                      return (
                        <td key={comp} className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                                isLow
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {count}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={() => updateUnits(group, comp, -1)}
                                title="Decrease 1 Unit"
                                className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => updateUnits(group, comp, 1)}
                                title="Add 1 Unit"
                                className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>
                      );
                    })}

                    <td className="py-3 px-3 text-right">
                      <span className={`font-black text-xs ${isGroupLow ? "text-red-600" : "text-slate-900"}`}>
                        {groupTotal} Units
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Expiring Stock Warning Log */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Expiring Unit Watchlist (&lt; 48h)
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab("expiring-alerts")}
            className="text-[11px] font-bold text-cyan-800 hover:underline flex items-center gap-1"
          >
            <span>View Full Shelf Log</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {EXPIRING_UNITS.map((u) => (
            <div
              key={u.bagCode}
              className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-xs font-black text-slate-900">{u.group} · {u.component}</span>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5">{u.bagCode}</p>
                <span className="text-[10px] font-bold text-amber-800 mt-1 block">
                  Expires: {u.expires}
                </span>
              </div>
              <button
                onClick={() => onNavigateTab("reservation-dispatch")}
                className="px-2.5 py-1 rounded bg-amber-700 text-white text-[11px] font-bold hover:bg-amber-800 transition flex-shrink-0"
              >
                Dispatch First
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
