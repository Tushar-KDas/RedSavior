"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { QrCode, Search, ShieldCheck } from "lucide-react";

export default function VerifyIdPortalPage() {
  const { locale } = useLanguage();
  const router = useRouter();
  const [tokenInput, setTokenInput] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      router.push(`/verify-id/${tokenInput.trim()}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 text-[#E50914] mx-auto flex items-center justify-center">
          <QrCode className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {locale === "bn" ? "রেডসেভিয়র আইডি কার্ড যাচাইকরণ" : "RedSavior ID Card Verification"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {locale === "bn"
              ? "সদস্যতা কার্ডের কিউআর টোকেন বা আইডি নম্বর দিয়ে সত্যতা যাচাই করুন।"
              : "Verify the authenticity of any RedSavior digital membership card issued in Bangladesh."}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 text-xs sm:text-sm text-left">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "টোকেন বা কার্ড আইডি লিখুন" : "Enter Verification Token or Member ID"}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="e.g. rs_qr_tok_rahim_ahmed_o_plus_98f41e or RS-DNR-000125"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === "bn" ? "যাচাই করুন" : "Verify Authenticity"}</span>
          </button>
        </form>

        <div className="pt-2 text-[11px] text-gray-400">
          {locale === "bn"
            ? "স্মার্টফোনের ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করলে সরাসরি যাচাইকৃত পৃষ্ঠায় চলে যাবেন।"
            : "Scanning the QR code on the physical or digital card will automatically open this verification page."}
        </div>
      </div>
    </div>
  );
}
