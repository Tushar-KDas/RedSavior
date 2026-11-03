"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const { locale } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email);
    setLoading(false);

    if (success) {
      router.push("/dashboard");
    } else {
      setError(
        locale === "bn"
          ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়। দয়া করে আবার চেষ্টা করুন।"
          : "Invalid email or password. Please try again."
      );
    }
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setLoading(true);
    await login(demoEmail);
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-red-50/40 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block relative h-12 w-48 mb-2">
            <Image
              src="/brand/logo.png"
              alt="RedSavior"
              fill
              className="object-contain"
            />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === "bn" ? "অ্যাকাউন্টে প্রবেশ করুন" : "Sign In to RedSavior"}
          </h2>
          <p className="text-xs text-gray-500">
            {locale === "bn"
              ? "জীবন বাঁচাতে আপনার মানবিক অ্যাকাউন্টে লগইন করুন"
              : "Access your blood donation and humanitarian dashboard"}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
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
                placeholder="admin@redsavior.org"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-gray-700 font-medium">
                {locale === "bn" ? "পাসওয়ার্ড" : "Password"}
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#E50914] hover:underline"
              >
                {locale === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot Password?"}
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>
              {loading
                ? locale === "bn"
                  ? "প্রবেশ করা হচ্ছে..."
                  : "Signing In..."
                : locale === "bn"
                ? "লগইন করুন"
                : "Sign In"}
            </span>
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">
            {locale === "bn" ? "এক ক্লিকে টেস্ট লগইন করুন" : "Quick Demo Role Switch"}
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@redsavior.org")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Super Admin (Full Platform)</span>
              </span>
              <span className="text-[10px] text-gray-500">admin@redsavior.org</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("ayesha.akter@gmail.com")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Donor (A+)</span>
              </span>
              <span className="text-[10px] text-gray-500">ayesha.akter@gmail.com</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-600">
          {locale === "bn" ? "নতুন অ্যাকাউন্ট খুলতে চান? " : "Don't have an account? "}
          <Link href="/register" className="text-[#E50914] font-bold hover:underline">
            {locale === "bn" ? "রেজিস্টার করুন" : "Register here"}
          </Link>
        </div>
      </div>
    </div>
  );
}
