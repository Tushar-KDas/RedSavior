"use client";

import React, { useState } from "react";
import {
  Radio,
  CheckSquare,
  Award,
  Calendar,
  PhoneCall,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface VolunteerDashboardProps {
  volunteerName?: string;
  onNavigateTab: (tabId: string) => void;
}

const EMERGENCY_DISPATCHES = [
  {
    id: "disp-01",
    patient: "Rahima Begum (Cesarean Emergency)",
    hospital: "Sir Salimullah Medical College (Mitford)",
    bloodGroup: "B+",
    units: 2,
    donorAssigned: "Tanvir Hasan (+8801913000003)",
    status: "Donor En Route",
    time: "Dispatch sent 15m ago",
  },
];

const MY_TASKS = [
  {
    id: "vt-01",
    title: "Call 5 O- donors for thalassemia emergency in DMCH",
    due: "Today by 1:00 PM",
    points: "+25 pts",
    status: "In Progress",
  },
  {
    id: "vt-02",
    title: "Coordinate donor arrival at National Heart Foundation",
    due: "Today 3:30 PM",
    points: "+30 pts",
    status: "Pending",
  },
  {
    id: "vt-03",
    title: "Submit field verification report for Mirpur Camp",
    due: "Tomorrow",
    points: "+15 pts",
    status: "Pending",
  },
];

export function VolunteerDashboard({
  volunteerName = "Sabbir Hossain",
  onNavigateTab,
}: VolunteerDashboardProps) {
  const [tasks, setTasks] = useState(MY_TASKS);
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const completeTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Completed" } : t))
    );
    setClaimedReward(`Completed "${title}"! +Points logged.`);
    setTimeout(() => setClaimedReward(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Volunteer Field Portal
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Field Responder</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Welcome, {volunteerName}! Active field missions, emergency dispatches, and volunteer rewards.
          </p>
        </div>

        {claimedReward && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
            ✓ {claimedReward}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Dispatches */}
        <div
          onClick={() => onNavigateTab("emergency-dispatches")}
          className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>Active Dispatches</span>
            <Radio className="w-4 h-4 text-red-600 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">1 Active</div>
          <p className="text-[11px] text-red-700/80 mt-1">Mitford Hospital emergency</p>
        </div>

        {/* Assigned Tasks */}
        <div
          onClick={() => onNavigateTab("assigned-tasks")}
          className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase">
            <span>Assigned Tasks</span>
            <CheckSquare className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-900 mt-2">
            {tasks.filter((t) => t.status !== "Completed").length} Pending
          </div>
          <p className="text-[11px] text-amber-700/80 mt-1">Donor calls & logistics</p>
        </div>

        {/* Completed Missions */}
        <div
          onClick={() => onNavigateTab("badges-points")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Completed Missions</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">24</div>
          <p className="text-[11px] text-gray-400 mt-1">100% verified field tasks</p>
        </div>

        {/* Volunteer Points & Badges */}
        <div
          onClick={() => onNavigateTab("badges-points")}
          className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Service Points</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">540 pts</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Level 3: Senior Lifesaver Scout</p>
        </div>
      </div>

      {/* Row 2: Live Emergency Dispatch Response Box */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white rounded-2xl p-5 shadow-xl border border-red-900/60">
        <div className="flex items-center justify-between pb-3 border-b border-red-900/40">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500 animate-ping" />
            <h3 className="font-black text-sm uppercase tracking-wider text-red-400">
              High Priority Emergency Dispatch
            </h3>
          </div>
          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white">
            Action Required
          </span>
        </div>

        {EMERGENCY_DISPATCHES.map((d) => (
          <div key={d.id} className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">{d.patient}</span>
                <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white">
                  {d.bloodGroup} · {d.units} Units
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {d.hospital}
              </p>
              <p className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                Assigned Donor: <strong>{d.donorAssigned}</strong> ({d.status})
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="tel:+8801913000003"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Donor</span>
              </a>
              <button
                onClick={() => onNavigateTab("emergency-dispatches")}
                className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-gray-100 transition shadow-md"
              >
                Confirm Arrival
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Assigned Field Tasks Checklist */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Assigned Field Tasks & Missions
            </h3>
            <p className="text-[10px] text-gray-400">Complete tasks to earn service badges and volunteer points</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700">
            {tasks.filter((t) => t.status === "Completed").length} of {tasks.length} Done
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                task.status === "Completed"
                  ? "bg-emerald-50/50 border-emerald-200 opacity-70"
                  : "bg-slate-50 border-gray-200/80 hover:bg-white"
              }`}
            >
              <div>
                <span className={`text-xs font-bold ${task.status === "Completed" ? "line-through text-gray-500" : "text-slate-900"}`}>
                  {task.title}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Due: {task.due} · <span className="font-bold text-emerald-600">{task.points}</span>
                </p>
              </div>

              {task.status !== "Completed" ? (
                <button
                  onClick={() => completeTask(task.id, task.title)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex-shrink-0"
                >
                  Mark Completed
                </button>
              ) : (
                <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Done</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
