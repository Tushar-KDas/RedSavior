"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { mockDb } from "@/lib/store/mock-db";
import { IdCardData } from "@/types";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import {
  Download,
  Printer,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

function DigitalIdCardContent() {
  const { locale } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const cardIdParam = searchParams.get("id");

  const [card, setCard] = useState<IdCardData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let foundCard: IdCardData | undefined;
    if (cardIdParam) {
      foundCard = mockDb.getIdCardByDisplayId(cardIdParam);
    } else if (user) {
      foundCard = mockDb.getIdCardByUserId(user.id);
    }
    if (!foundCard) {
      foundCard = mockDb.getIdCardByDisplayId("RS-DNR-000125");
    }

    if (foundCard) {
      setCard(foundCard);
      const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : "https://redsavior.org"}/verify-id/${foundCard.qrToken}`;
      QRCode.toDataURL(verifyUrl, {
        width: 180,
        margin: 1,
        color: {
          dark: "#111827",
          light: "#FFFFFF",
        },
      }).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [cardIdParam, user]);

  const handleCopyLink = () => {
    if (!card) return;
    const url = `${window.location.origin}/verify-id/${card.qrToken}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPdf = () => {
    if (!card) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [85.6, 120],
    });

    doc.setFillColor(229, 9, 20);
    doc.rect(0, 0, 85.6, 22, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RedSavior", 10, 10);
    doc.setFontSize(7);
    doc.text("Donate Blood. Save Lives. | Bangladesh", 10, 15);

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(5, 25, 75.6, 88, 3, 3, "S");

    doc.setTextColor(17, 24, 39);
    doc.setFontSize(12);
    doc.text(card.holderName, 10, 36);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`ID: ${card.displayId}`, 10, 42);
    doc.text(`Role: ${card.role.replace("_", " ")}`, 10, 48);
    if (card.bloodGroup) {
      doc.setTextColor(229, 9, 20);
      doc.setFontSize(10);
      doc.text(`Blood Group: ${card.bloodGroup}`, 10, 55);
    }

    doc.setTextColor(16, 163, 74);
    doc.setFontSize(8);
    doc.text(`Status: Verified Active Member`, 10, 62);

    if (qrDataUrl) {
      doc.addImage(qrDataUrl, "PNG", 24, 68, 36, 36);
    }

    doc.setFontSize(6);
    doc.setTextColor(148, 163, 184);
    doc.text("Scan QR to verify authenticity on redsavior.org", 16, 108);

    doc.save(`${card.displayId}_RedSavior_ID_Card.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!card) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  const isStaffCard = card.role === "SUPER_ADMIN" || card.role === "ADMIN";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#E50914]" />
            <span>{locale === "bn" ? "অফিসিয়াল ডিজিটাল সদস্যতা পরিচয়পত্র" : "Official Digital Membership Card"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {locale === "bn" ? "রেডসেভিয়র ডিজিটাল আইডি কার্ড" : "RedSavior Digital ID Card"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "যেকোনো স্মার্টফোন ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করে সত্যতা যাচাই করা সম্ভব।"
              : "Includes cryptographic QR code for instant identity verification across Bangladesh."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#E50914] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#B80012] shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>{locale === "bn" ? "পিডিএফ ডাউনলোড" : "Download PDF"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-900 transition"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === "bn" ? "প্রিন্ট করুন" : "Print Card"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-50 transition"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (locale === "bn" ? "কপি হয়েছে!" : "Copied!") : (locale === "bn" ? "লিংক কপি" : "Copy Link")}</span>
          </button>
        </div>
      </div>

      {/* Identity Card Display Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
        {/* Card Front Side */}
        <div
          ref={cardRef}
          className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 ${
            isStaffCard ? "border-amber-400 bg-slate-950 text-white" : "border-red-500 bg-white text-gray-900"
          } relative`}
        >
          {/* Card Top Brand Strip */}
          <div
            className={`p-5 flex items-center justify-between ${
              isStaffCard ? "bg-slate-900 border-b border-amber-400/40" : "bg-[#E50914] text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-36 bg-white/10 rounded-lg p-1">
                <Image
                  src="/brand/logo.png"
                  alt="RedSavior"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  isStaffCard ? "bg-amber-400 text-black font-black" : "bg-white text-[#E50914]"
                }`}
              >
                {card.role.replace("_", " ")}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-500 shadow-md flex-shrink-0">
                <Image
                  src={card.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                  alt={card.holderName}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-extrabold leading-tight">{card.holderName}</h3>
                <div className="text-xs font-mono text-gray-400 mt-0.5 font-bold">{card.displayId}</div>

                <div className="flex items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{locale === "bn" ? "যাচাইকৃত সক্রিয় সদস্য" : "Verified Active Member"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Blood Group & Details Strip */}
            <div
              className={`grid grid-cols-2 gap-3 p-3 rounded-2xl text-xs ${
                isStaffCard ? "bg-slate-900 border border-slate-800" : "bg-red-50/70 border border-red-100"
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  {locale === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                </span>
                <span className="text-lg font-black text-[#E50914]">{card.bloodGroup || "O+"}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  {locale === "bn" ? "মোট রক্তদান" : "Verified Donations"}
                </span>
                <span className="text-base font-extrabold text-gray-800 dark:text-white">
                  {card.donationsCount || 0} {locale === "bn" ? "বার" : "Times"}
                </span>
              </div>
            </div>

            {/* QR Code Verification Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 text-gray-900 shadow-inner">
              {qrDataUrl ? (
                <div className="relative w-36 h-36">
                  <Image src={qrDataUrl} alt="Verification QR Code" fill className="object-contain" />
                </div>
              ) : (
                <div className="w-36 h-36 bg-gray-100 animate-pulse rounded-lg" />
              )}
              <span className="text-[10px] font-mono text-gray-500 mt-2 tracking-wide font-medium">
                SCAN TO VERIFY AUTHENTICITY
              </span>
            </div>

            {/* Disclaimer Footer */}
            <div className="text-center text-[9px] text-gray-400 leading-tight">
              {locale === "bn"
                ? "এই কার্ডটি শুধুমাত্র পরিচয় নিশ্চিতকরণের জন্য। এটি কোনো ক্লিনিক্যাল রক্ত পরীক্ষার প্রমাণ নয়।"
                : "Identity verification credential only. Not a medical or transfusion clearance."}
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E50914]" />
              <span>{locale === "bn" ? "নিরাপত্তা ও কিউআর প্রযুক্তি" : "Cryptographic QR Features"}</span>
            </h4>
            <ul className="text-xs text-gray-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "নকল রোধে কার্ডে একটি সুরক্ষিত র্যান্ডম হ্যাশ টোকেন সংযুক্ত রয়েছে।"
                    : "Cryptographically hashed non-sequential token prevents forgery and sequential enumeration."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "কোনো সংবেদনশীল ব্যক্তিগত বা চিকিৎসা তথ্য কিউআরে সরাসরি সংরক্ষিত থাকে না।"
                    : "Zero private medical or phone data is exposed directly in the barcode payload."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "হাসপাতাল ও রক্তদাতাদের মধ্যে বিশ্বাস ও স্বচ্ছতা বৃদ্ধি করে।"
                    : "Instantly confirms active verified donor status for hospitals and blood banks."}
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`/verify-id/${card.qrToken}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <span>{locale === "bn" ? "পাবলিক যাচাইকরণ পৃষ্ঠা খুলুন" : "Open Public Verification Page"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DigitalIdCardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">Loading digital ID card...</div>}>
      <DigitalIdCardContent />
    </Suspense>
  );
}
