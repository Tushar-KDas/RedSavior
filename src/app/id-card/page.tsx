"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
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
  RotateCw,
  Sparkles,
  PhoneCall,
  Lock,
  Heart,
  QrCode,
  Shield,
} from "lucide-react";

function DigitalIdCardContent() {
  const { locale } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const cardIdParam = searchParams.get("id");

  const [card, setCard] = useState<IdCardData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
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
        width: 200,
        margin: 1,
        color: {
          dark: "#0F172A",
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

    // Top Header Banner
    doc.setFillColor(229, 9, 20);
    doc.rect(0, 0, 85.6, 24, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RedSavior", 10, 11);
    doc.setFontSize(7);
    doc.text("Donate Blood. Save Lives. | Bangladesh", 10, 17);

    // Card White Body Container
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(5, 26, 75.6, 88, 3, 3, "S");

    doc.setTextColor(17, 24, 39);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(card.holderName, 10, 37);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`ID: ${card.displayId}`, 10, 43);
    doc.text(`Role: ${card.role.replace("_", " ")}`, 10, 49);

    if (card.bloodGroup) {
      doc.setTextColor(229, 9, 20);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`Blood Group: ${card.bloodGroup}`, 10, 56);
    }

    doc.setTextColor(16, 163, 74);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`Status: Verified Lifesaver Member`, 10, 63);

    if (qrDataUrl) {
      doc.addImage(qrDataUrl, "PNG", 24, 68, 38, 38);
    }

    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text("Scan QR with any phone to verify on redsavior.org", 14, 110);

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#E50914]" />
            <span>
              {locale === "bn"
                ? "অফিসিয়াল ডিজিটাল সদস্যতা পরিচয়পত্র"
                : "Official Digital Membership Credential"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {locale === "bn" ? "রেডসেভিয়র ডিজিটাল আইডি কার্ড" : "RedSavior Digital Lifesaver Card"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "যেকোনো স্মার্টফোন ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করে সত্যতা যাচাই করা সম্ভব।"
              : "Includes cryptographic QR code for instant identity verification across Bangladesh."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-black shadow-sm transition"
          >
            <RotateCw className="w-4 h-4 text-amber-400" />
            <span>{isFlipped ? (locale === "bn" ? "সামনের দিক দেখুন" : "View Front") : (locale === "bn" ? "পেছনের দিক দেখুন" : "Flip to Back")}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#E50914] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#B80012] shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>{locale === "bn" ? "পিডিএফ ডাউনলোড" : "Download PDF"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-bold hover:bg-gray-200 transition"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === "bn" ? "প্রিন্ট করুন" : "Print"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-50 transition"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            <span>
              {copied
                ? locale === "bn"
                  ? "কপি হয়েছে!"
                  : "Copied!"
                : locale === "bn"
                ? "লিংক"
                : "Copy Link"}
            </span>
          </button>
        </div>
      </div>

      {/* Main 3D Card Display Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 py-4">
        {/* The Card Viewport */}
        <div className="w-full max-w-sm perspective-1000">
          {!isFlipped ? (
            /* =========================================================================
               FRONT SIDE OF THE DIGITAL ID CARD
               ========================================================================= */
            <div
              ref={cardRef}
              className={`rounded-3xl overflow-hidden shadow-2xl border-4 transition-all duration-300 relative ${
                isStaffCard
                  ? "border-amber-400 bg-slate-950 text-white shadow-amber-900/20"
                  : "border-red-500 bg-white text-gray-900 shadow-red-900/20"
              }`}
            >
              {/* Card Top Brand Strip */}
              <div
                className={`p-4 flex items-center justify-between ${
                  isStaffCard ? "bg-slate-900 border-b border-amber-400/30" : "bg-gradient-to-r from-red-600 to-red-700 text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="relative h-9 w-32 bg-white/10 rounded-lg p-1 backdrop-blur-sm">
                    <Image
                      src="/brand/logo.png"
                      alt="RedSavior"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      isStaffCard
                        ? "bg-amber-400 text-black shadow-sm"
                        : "bg-white text-[#E50914] shadow-sm"
                    }`}
                  >
                    {card.role.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Holographic Ribbon Subheader */}
              <div className="bg-gradient-to-r from-amber-400 via-rose-300 to-amber-400 text-slate-950 px-4 py-1 text-[9px] font-black uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-600" />
                  <span>Verified Lifesaver Pass • Bangladesh</span>
                </span>
                <span className="font-mono">ID: {card.displayId}</span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-500 shadow-md flex-shrink-0">
                    <Image
                      src={
                        card.avatarUrl ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
                      }
                      alt={card.holderName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-black leading-tight tracking-tight">
                      {card.holderName}
                    </h3>
                    <div className="text-xs font-mono text-gray-400 mt-0.5 font-bold">
                      {card.displayId}
                    </div>

                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>
                          {locale === "bn"
                            ? "যাচাইকৃত সক্রিয় রক্তদাতা"
                            : "Verified Active Lifesaver"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blood Group & Details Strip */}
                <div
                  className={`grid grid-cols-2 gap-3 p-3.5 rounded-2xl text-xs ${
                    isStaffCard
                      ? "bg-slate-900 border border-slate-800"
                      : "bg-red-50/80 border border-red-100"
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      {locale === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                    </span>
                    <span className="text-xl font-black text-[#E50914] flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-[#E50914]" />
                      <span>{card.bloodGroup || "O+"}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      {locale === "bn" ? "মোট রক্তদান" : "Verified Donations"}
                    </span>
                    <span className="text-base font-black text-gray-900 dark:text-white">
                      {card.donationsCount || 0} {locale === "bn" ? "বার" : "Times"}
                    </span>
                  </div>
                </div>

                {/* Scannable Cryptographic QR Container */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 text-gray-900 shadow-inner">
                  {qrDataUrl ? (
                    <div className="relative w-36 h-36">
                      <Image
                        src={qrDataUrl}
                        alt="Verification QR Code"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 bg-gray-100 animate-pulse rounded-lg" />
                  )}
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-gray-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SCAN WITH PHONE TO VERIFY</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center text-[9px] text-gray-400 leading-tight">
                  {locale === "bn"
                    ? "এই কার্ডটি শুধুমাত্র পরিচয় নিশ্চিতকরণের জন্য। এটি কোনো ক্লিনিক্যাল রক্ত পরীক্ষার প্রমাণ নয়।"
                    : "Identity verification credential only. Not a medical or transfusion clearance."}
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
               BACK SIDE OF THE DIGITAL ID CARD
               ========================================================================= */
            <div
              className={`rounded-3xl overflow-hidden shadow-2xl border-4 transition-all duration-300 relative ${
                isStaffCard
                  ? "border-amber-400 bg-slate-950 text-white"
                  : "border-red-500 bg-slate-900 text-white"
              }`}
            >
              {/* Magnetic Stripe Bar */}
              <div className="w-full h-12 bg-black mt-6 border-y border-slate-800" />

              {/* Back Card Content */}
              <div className="p-6 space-y-4 text-xs">
                {/* Official Declaration */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-black uppercase text-red-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Nationwide Lifesaver Authorization</span>
                  </div>
                  <p className="text-[10px] text-gray-300 leading-relaxed">
                    The bearer is a registered voluntary blood donor under the RedSavior Bangladesh Humanitarian Lifeline. Cross-matching and laboratory validation must precede any clinical blood transfusion.
                  </p>
                </div>

                {/* Emergency Hotlines */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-gray-400">
                    Emergency Bangladesh Helplines
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono font-bold">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                      <span>National: 999</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Health: 16263</span>
                    </div>
                  </div>
                </div>

                {/* Barcode Simulation */}
                <div className="p-3 bg-white rounded-xl text-black text-center space-y-1">
                  <div className="font-mono text-base tracking-[0.35em] font-black">
                    ||| | |||| | ||| || |||| | |||||
                  </div>
                  <div className="text-[9px] font-mono text-gray-600 font-bold">
                    TOKEN: {card.qrToken.substring(0, 24)}...
                  </div>
                </div>

                {/* Issuance and Expiry */}
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/10">
                  <div>
                    <span>Issued: </span>
                    <span className="text-white font-bold">{card.issueDate}</span>
                  </div>
                  <div>
                    <span>Valid Thru: </span>
                    <span className="text-emerald-400 font-bold">2028-12-31</span>
                  </div>
                </div>

                {/* Return to Front button */}
                <button
                  onClick={() => setIsFlipped(false)}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition"
                >
                  Flip to Front Side
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Info & Security Details */}
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E50914]" />
              <span>
                {locale === "bn"
                  ? "নিরাপত্তা ও কিউআর প্রযুক্তি"
                  : "Cryptographic QR Features"}
              </span>
            </h4>
            <ul className="text-xs text-gray-600 space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "নকল রোধে কার্ডে একটি সুরক্ষিত নন-সিকোয়েন্সিয়াল হ্যাশ টোকেন সংযুক্ত রয়েছে।"
                    : "Non-sequential cryptographic hash token prevents counterfeit cards and sequential scraping."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "কোনো সংবেদনশীল ব্যক্তিগত বা চিকিৎসা তথ্য কিউআরে সরাসরি উন্মুক্ত থাকে না।"
                    : "Zero private health or personal phone numbers are hardcoded in the public QR barcode."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "হাসপাতাল ও রক্তদাতাদের মধ্যে বিশ্বাস ও তাৎক্ষণিক যাচাইকরণ নিশ্চিত করে।"
                    : "Instant verification on official redsavior.org server gives hospitals 100% confidence."}
                </span>
              </li>
            </ul>

            <div className="pt-2 space-y-2">
              <Link
                href={`/verify-id/${card.qrToken}`}
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>
                  {locale === "bn"
                    ? "সরাসরি কিউআর স্ক্যান টেস্ট করুন"
                    : "Simulate Real-time Scan"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DigitalIdCardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-sm text-gray-500">
          Loading digital ID card...
        </div>
      }
    >
      <DigitalIdCardContent />
    </Suspense>
  );
}
