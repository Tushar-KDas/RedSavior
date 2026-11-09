"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { DonorProfile } from "@/types";
import {
  Printer,
  X,
  ShieldCheck,
  Droplet,
  MapPin,
  Phone,
  Mail,
  Key,
  Copy,
  CheckCircle,
  ExternalLink,
  Award,
} from "lucide-react";

interface PrintIdCardModalProps {
  donor: DonorProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PrintIdCardModal({ donor, isOpen, onClose }: PrintIdCardModalProps) {
  const [copiedKey, setCopiedKey] = React.useState(false);

  if (!isOpen || !donor) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCredentials = async () => {
    const text = `Donor Name: ${donor.fullName}\nID: ${donor.humanReadableId}\nBlood Group: ${donor.bloodGroup}\nDistrict: ${donor.districtId}\nLogin Email: ${donor.loginEmail || donor.phone}\nPassword: ${donor.loginPassword || "RedSavior@2026"}`;
    await navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  // Generate QR target URL
  const qrTargetUrl = `https://redsavior.vercel.app/verify-id/${donor.humanReadableId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrTargetUrl)}&color=0B1120`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Print Specific CSS Styles injected for pure card output */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-card-container,
          #printable-card-container * {
            visibility: visible !important;
          }
          #printable-card-container {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background: white !important;
            padding: 20mm !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 my-8">
        {/* Modal Top Control Bar (Hidden during print) */}
        <div className="no-print p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#E50914]" />
              <span>Official Lifesaver Digital ID Card</span>
            </h3>
            <p className="text-xs text-gray-500">
              High-resolution printable card for {donor.fullName} ({donor.humanReadableId})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCredentials}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-slate-700 transition"
              title="Copy Login Credentials"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedKey ? "✓ Copied!" : "Copy Login"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white text-xs font-black shadow-md shadow-red-600/20 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Card / প্রিন্ট</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-200 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CARD CONTENT (Visible in modal and targeted by @media print) */}
        <div id="printable-card-container" className="p-6 bg-slate-100 flex flex-col items-center justify-center gap-6">
          {/* Card Front: CR-80 Standard ID Card Ratio */}
          <div className="w-[370px] sm:w-[420px] rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] text-white p-5 shadow-2xl border-2 border-red-600/60 relative overflow-hidden flex flex-col justify-between">
            {/* Holographic / Metallic Sheen Background */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header: Republic of Bangladesh & RedSavior */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-700/80 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-black text-white text-sm shadow-md border border-red-400">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase text-white flex items-center gap-1">
                    <span>RedSavior Bangladesh</span>
                    <span className="text-[9px] text-red-400">🇧🇩</span>
                  </h4>
                  <p className="text-[8px] text-gray-300 uppercase tracking-widest font-semibold">
                    National Voluntary Lifesaver Network
                  </p>
                </div>
              </div>

              {/* Blood Group Badge */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E50914] to-red-700 text-white flex flex-col items-center justify-center font-black text-base shadow-lg shadow-red-900/50 border border-red-400">
                <span className="leading-none">{donor.bloodGroup}</span>
                <span className="text-[7px] text-red-200 tracking-tighter uppercase mt-0.5">Blood</span>
              </div>
            </div>

            {/* Middle Section: Avatar + Details + QR */}
            <div className="py-4 flex items-center justify-between gap-3 relative z-10">
              {/* Avatar + Basic Data */}
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-red-500 shadow-md flex-shrink-0 bg-slate-800">
                  <Image
                    src={donor.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"}
                    alt={donor.fullName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-red-600/90 text-[8px] text-center font-black uppercase tracking-wider py-0.5 text-white">
                    Verified
                  </div>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h5 className="font-black text-sm text-white truncate">{donor.fullName}</h5>
                  <div className="font-mono text-[10px] text-amber-400 font-bold tracking-wider">
                    {donor.humanReadableId}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-300">
                    <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span className="truncate capitalize">{donor.areaOrVillage || donor.districtId}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-300">
                    <Phone className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>{donor.phone}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center flex-shrink-0 bg-white p-1.5 rounded-xl shadow-md border border-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeUrl}
                  alt="Cryptographic QR Token"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
                <span className="text-[7px] text-slate-900 font-bold uppercase tracking-tight mt-0.5">
                  Scan to Verify
                </span>
              </div>
            </div>

            {/* Footer Bar: Verification Seal & Donations */}
            <div className="pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-[9px] text-gray-400 relative z-10 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Govt. DGHS Endorsed</span>
              </div>
              <div className="flex items-center gap-1 text-gray-300 font-semibold">
                <Award className="w-3 h-3 text-amber-400" />
                <span>{donor.totalVerifiedDonations} Verified Donations</span>
              </div>
              <div className="font-mono text-gray-400">
                Issued: {donor.createdAt ? donor.createdAt.split("T")[0] : "2024-01-01"}
              </div>
            </div>
          </div>

          {/* Card Back: Emergency Guidelines */}
          <div className="w-[370px] sm:w-[420px] rounded-2xl bg-white text-slate-800 p-4 shadow-xl border-2 border-slate-300 relative flex flex-col justify-between text-xs">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-[9px] font-black uppercase tracking-wider text-red-600">
                  Emergency Medical Directive & Lifesaver Code
                </span>
                <span className="text-[9px] font-bold text-gray-400 font-mono">
                  {donor.humanReadableId}
                </span>
              </div>

              <div className="space-y-1.5 mt-2.5 text-[10px] text-gray-600">
                <p>
                  <strong>1. Voluntary Lifesaver:</strong> The cardholder is an accredited voluntary blood donor certified under RedSavior Bangladesh.
                </p>
                <p>
                  <strong>2. Emergency Priority:</strong> In case of accident or emergency, hospitals are instructed to accord priority clinical donor check.
                </p>
                <p>
                  <strong>3. 24/7 Transfusion Helpline:</strong> Dial <strong>+880 1711 123456</strong> or visit <strong>redsavior.vercel.app</strong>.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-gray-200 flex items-center justify-between text-[9px] text-gray-500">
              <div>
                <span className="block font-semibold">Authorized Signatory</span>
                <span className="text-gray-400 font-serif italic">Director, RedSavior BD</span>
              </div>
              <div className="text-right">
                <span className="block font-semibold">National Hotline</span>
                <span className="font-bold text-red-600">+880 1711 123456</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls (Hidden during print) */}
        <div className="no-print p-4 sm:p-5 border-t border-gray-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-500">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>
              Login Email: <strong className="text-slate-800 font-mono">{donor.loginEmail || donor.phone}</strong>
            </span>
            <span className="text-gray-300">|</span>
            <span>
              Pass: <strong className="text-slate-800 font-mono">{donor.loginPassword || "RedSavior@2026"}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 font-bold text-gray-700 transition"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-extrabold flex items-center gap-1.5 shadow-md shadow-red-600/25 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
