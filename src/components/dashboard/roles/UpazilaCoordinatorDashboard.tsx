"use client";

import React, { useState } from "react";
import {
  Users,
  MapPin,
  Activity,
  Droplet,
  CheckSquare,
  Calendar,
  PhoneCall,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

interface UpazilaCoordinatorDashboardProps {
  upazilaName?: string;
  districtName?: string;
  onNavigateTab: (tabId: string) => void;
}

const LOCAL_TASKS = [
  {
    id: "task-01",
    title: "Verify emergency donor response for LabAid Patient",
    assignee: "Sabbir Hossain (Volunteer)",
    status: "In Progress",
    urgency: "HIGH",
    due: "Today 2:00 PM",
  },
  {
    id: "task-02",
    title: "Setup registration banner for Dhanmondi Blood Drive",
    assignee: "Rifat Ahmed (Field Force)",
    status: "Pending",
    urgency: "MEDIUM",
    due: "Tomorrow 9:00 AM",
  },
  {
    id: "task-03",
    title: "Assist elderly thalassemia patient relative with donor contact",
    assignee: "Mehnaz Parveen (Volunteer)",
    status: "Completed",
    urgency: "NORMAL",
    due: "Completed 1h ago",
  },
];

export function UpazilaCoordinatorDashboard({
  upazilaName = "Dhanmondi",
  districtName = "Dhaka",
  onNavigateTab,
}: UpazilaCoordinatorDashboardProps) {
  const [tasks, setTasks] = useState(LOCAL_TASKS);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === "Completed" ? "In Progress" : "Completed" }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {upazilaName} Field Coordination Hub
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{upazilaName}, {districtName}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Grassroots emergency blood dispatch, volunteer coordination, and local camps.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab("assigned-tasks")}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-teal-700 text-white hover:bg-teal-800 shadow-sm transition"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Assign Field Task</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Local Donors */}
        <div
          onClick={() => onNavigateTab("local-donors")}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase">
            <span>Local Donors</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">5,600</div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
            <span>4,230 Active Available</span>
            <span className="text-emerald-600 font-bold">75% Ready</span>
          </div>
        </div>

        {/* Today's Urgent Requests */}
        <div
          onClick={() => onNavigateTab("local-requests")}
          className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-red-700 font-bold uppercase">
            <span>Urgent Requisitions</span>
            <Activity className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-red-900 mt-2">2</div>
          <p className="text-[11px] text-red-700/80 mt-1">LabAid & Ibn Sina Hospital</p>
        </div>

        {/* Local Volunteers */}
        <div
          onClick={() => onNavigateTab("volunteers")}
          className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold uppercase">
            <span>Field Volunteers</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900 mt-2">140</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Active in {upazilaName}</p>
        </div>

        {/* Upcoming Donation Camps */}
        <div
          onClick={() => onNavigateTab("donation-camps")}
          className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase">
            <span>Donation Camps</span>
            <Calendar className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-900 mt-2">1</div>
          <p className="text-[11px] text-amber-700/80 mt-1">This Saturday @ Dhanmondi Lake</p>
        </div>
      </div>

      {/* Row 2: Urgent Requisition Triage & Field Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Field Tasks Roster */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Upazila Field Task Management
              </h3>
              <p className="text-[10px] text-gray-400">Assigned duties to verified local volunteers</p>
            </div>
            <span className="text-[11px] font-bold text-teal-700">{tasks.length} Active Tasks</span>
          </div>

          <div className="space-y-3 mt-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  task.status === "Completed"
                    ? "bg-gray-50 border-gray-200 opacity-60"
                    : "bg-slate-50/70 border-gray-200/80 hover:bg-white"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${task.status === "Completed" ? "line-through text-gray-500" : "text-slate-900"}`}>
                      {task.title}
                    </span>
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                        task.urgency === "HIGH"
                          ? "bg-red-100 text-red-600"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {task.urgency}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Assigned: {task.assignee} · <span className="text-gray-400">{task.due}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      task.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Camp Highlight */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Upcoming Local Blood Drive
              </h3>
              <Calendar className="w-4 h-4 text-teal-600" />
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-900 to-slate-900 text-white mt-4 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500 text-white px-2 py-0.5 rounded-full">
                Saturday 9:00 AM - 5:00 PM
              </span>
              <h4 className="text-base font-extrabold mt-2">Dhanmondi Voluntary Blood Camp</h4>
              <p className="text-xs text-teal-200/90 mt-1">
                Rabindra Sarobar Open Stage, Road 8A, Dhanmondi
              </p>

              <div className="mt-4 pt-3 border-t border-teal-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-teal-300 block">Target Units</span>
                  <span className="text-lg font-black text-white">150 Units</span>
                </div>
                <div>
                  <span className="text-[10px] text-teal-300 block">Volunteers Registered</span>
                  <span className="text-lg font-black text-white">24 Volunteers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => onNavigateTab("donation-camps")}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-xs font-bold text-teal-900 transition"
            >
              <span>Manage Camp Roster & Equipment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
