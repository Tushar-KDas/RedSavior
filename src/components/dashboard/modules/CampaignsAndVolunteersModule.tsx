"use client";

import React, { useState } from "react";
import { mockDb } from "@/lib/store/mock-db";
import {
  Users,
  Calendar,
  Award,
  CheckSquare,
  Radio,
  Heart,
  MapPin,
  Clock,
  PhoneCall,
  CheckCircle,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserPlus,
} from "lucide-react";

interface CampaignsAndVolunteersModuleProps {
  activeTab: string;
}

const SAMPLE_VOLUNTEERS = [
  {
    id: "vol-01",
    name: "Sabbir Hossain",
    phone: "+8801712009988",
    district: "Dhaka",
    upazila: "Dhanmondi",
    missionsCompleted: 24,
    points: 540,
    role: "Emergency Responder",
    status: "Active & Available",
  },
  {
    id: "vol-02",
    name: "Mehnaz Parveen",
    phone: "+8801819334411",
    district: "Dhaka",
    upazila: "Mirpur",
    missionsCompleted: 19,
    points: 420,
    role: "Donor Follow-up Lead",
    status: "Active",
  },
  {
    id: "vol-03",
    name: "Tanvir Hasan",
    phone: "+8801913000003",
    district: "Chattogram",
    upazila: "Kotwali",
    missionsCompleted: 31,
    points: 680,
    role: "Senior Field Scout",
    status: "On Mission",
  },
  {
    id: "vol-04",
    name: "Sadia Rahman",
    phone: "+8801611882233",
    district: "Sylhet",
    upazila: "Sylhet Sadar",
    missionsCompleted: 15,
    points: 350,
    role: "Camp Coordinator",
    status: "Active",
  },
];

const SAMPLE_CAMPAIGNS = [
  {
    id: "camp-01",
    title: "Sandhani Annual Youth Blood Drive",
    organizer: "Sandhani Central Blood Club",
    venue: "Dhaka University Teacher-Student Centre (TSC)",
    district: "Dhaka",
    date: "November 25, 2026 (9:00 AM - 5:00 PM)",
    targetUnits: 250,
    collectedUnits: 0,
    status: "Upcoming",
    volunteersAssigned: 24,
  },
  {
    id: "camp-02",
    title: "Winter Emergency Blood Camp",
    organizer: "Bangladesh Red Crescent Society",
    venue: "BUET Central Cafeteria Grounds",
    district: "Dhaka",
    date: "December 05, 2026 (10:00 AM - 4:00 PM)",
    targetUnits: 180,
    collectedUnits: 0,
    status: "Planning",
    volunteersAssigned: 18,
  },
  {
    id: "camp-03",
    title: "Chattogram Port Lifesavers Drive",
    organizer: "Quantum Foundation",
    venue: "CRB Open Grounds, Chattogram",
    district: "Chattogram",
    date: "December 12, 2026 (9:00 AM - 6:00 PM)",
    targetUnits: 300,
    collectedUnits: 0,
    status: "Upcoming",
    volunteersAssigned: 32,
  },
];

export function CampaignsAndVolunteersModule({ activeTab }: CampaignsAndVolunteersModuleProps) {
  const [volunteers, setVolunteers] = useState(SAMPLE_VOLUNTEERS);
  const [campaigns, setCampaigns] = useState(SAMPLE_CAMPAIGNS);
  const organizations = mockDb.getOrganizations();

  const isCampaignView = [
    "campaigns",
    "local-campaigns",
    "donation-camps",
    "drives",
    "camp-duty",
    "camp-collections",
  ].includes(activeTab);

  const isOrganizationView = ["organizations", "local-orgs"].includes(activeTab);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {isCampaignView
                ? "Nationwide Voluntary Blood Drives & Camps"
                : isOrganizationView
                ? "Voluntary Blood Organizations & Youth Clubs"
                : "Verified Volunteer Corps & Field Force"}
            </h2>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {isCampaignView ? `${campaigns.length} Active Drives` : `${volunteers.length} Field Responders`}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isCampaignView
              ? "Coordinate mobile blood donation camps, venue logistics, target collection units, and volunteer duties."
              : isOrganizationView
              ? "Empowering accredited student blood clubs, NGOs, and voluntary platforms across Bangladesh."
              : "Manage verified field volunteers, emergency dispatches, task assignments, and service points."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCampaignView && (
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#E50914] text-white hover:bg-red-700 transition shadow-sm">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Schedule New Blood Drive</span>
            </button>
          )}
          {!isCampaignView && !isOrganizationView && (
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Enroll New Volunteer</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: Campaigns Table */}
      {isCampaignView && (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5">Campaign Name & Organizer</th>
                <th className="p-3.5">Venue & District</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Target Units</th>
                <th className="p-3.5">Volunteers</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3.5">
                    <div className="font-extrabold text-slate-900">{camp.title}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{camp.organizer}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{camp.venue}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{camp.district} District</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">{camp.date}</td>
                  <td className="p-3.5">
                    <span className="font-black text-slate-900 text-xs bg-red-50 text-[#E50914] px-2 py-0.5 rounded-lg border border-red-200">
                      {camp.targetUnits} Units
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{camp.volunteersAssigned} Registered</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        camp.status === "Upcoming"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {camp.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
                      Manage Roster
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 2: Volunteers Table */}
      {!isCampaignView && !isOrganizationView && (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5">Volunteer Identity</th>
                <th className="p-3.5">District & Upazila</th>
                <th className="p-3.5">Phone Contact</th>
                <th className="p-3.5">Role Designation</th>
                <th className="p-3.5">Service Record</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {volunteers.map((vol) => (
                <tr key={vol.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3.5">
                    <div className="font-extrabold text-slate-900">{vol.name}</div>
                    <div className="font-mono text-[10px] text-gray-400 font-bold">{vol.id}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{vol.district}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{vol.upazila}</div>
                  </td>
                  <td className="p-3.5">
                    <a href={`tel:${vol.phone}`} className="font-semibold text-slate-800 hover:underline flex items-center gap-1">
                      <PhoneCall className="w-3 h-3 text-emerald-600" />
                      <span>{vol.phone}</span>
                    </a>
                  </td>
                  <td className="p-3.5 font-bold text-slate-700">{vol.role}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{vol.missionsCompleted} Missions</div>
                    <div className="text-[10px] text-emerald-600 font-bold">{vol.points} Points</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {vol.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
                      Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: Organizations Table */}
      {isOrganizationView && (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5">Organization Name</th>
                <th className="p-3.5">District & Coverage</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Total Camps</th>
                <th className="p-3.5">Volunteers Mobilized</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3.5">
                    <div className="font-extrabold text-slate-900">{org.nameEn}</div>
                    <div className="text-[11px] text-gray-500">{org.nameBn}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800 capitalize">{org.districtId}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{org.upazilaId}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800">{org.contactPhone}</div>
                    <div className="text-[10px] text-gray-400">{org.contactEmail}</div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{org.totalDonationCamps} Camps</td>
                  <td className="p-3.5 font-bold text-emerald-700">{org.volunteerCount} Volunteers</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                      <ShieldCheck className="w-3 h-3" /> Accredited Club
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition">
                      View Profile
                    </button>
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
