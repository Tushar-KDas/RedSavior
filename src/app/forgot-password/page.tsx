"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {locale === "bn" ? "পাসওয়ার্ড পুনরুদ্ধার" : "Reset Your Password"}
        </h2>
        <p className="text-xs text-gray-500">
          {locale === "bn"
            ? "আপনার নিবন্ধিত ইমেইল ঠিকানা দিন। আমরা পাসওয়ার্ড রিসেট লিংক পাঠাব।"
            : "Enter your registered email and we will send you a password reset link."}
        </p>

        {sent ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
            <h4 className="font-bold text-sm text-green-900">
              {locale === "bn" ? "রিসেট লিংক পাঠানো হয়েছে!" : "Reset Link Sent!"}
            </h4>
            <p className="text-xs text-green-700">
              {locale === "bn"
                ? "আপনার ইনবক্স বা স্প্যাম ফোল্ডার চেক করুন।"
                : "Please check your email inbox and spam folder."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-left">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {locale === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition"
            >
              {locale === "bn" ? "রিসেট লিংক পাঠান" : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#E50914]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "লগইনে ফিরে যান" : "Back to Login"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
