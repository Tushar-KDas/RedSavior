"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Mail, Lock, User, Phone, UserPlus, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const { locale } = useLanguage();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+8801");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wantToBeDonor, setWantToBeDonor] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(locale === "bn" ? "উভয় পাসওয়ার্ড এক হতে হবে।" : "Passwords do not match.");
      return;
    }

    if (!phone.startsWith("+8801") || phone.length < 14) {
      setError(
        locale === "bn"
          ? "সঠিক বাংলাদেশী মোবাইল নম্বর দিন (উদাহরণ: +8801711234567)"
          : "Please provide a valid Bangladeshi phone number (e.g. +8801711234567)"
      );
      return;
    }

    setLoading(true);
    const roles = wantToBeDonor ? (["DONOR", "NORMAL_USER"] as const) : (["NORMAL_USER"] as const);
    await register(email, fullName, phone, roles as any);
    setLoading(false);

    if (wantToBeDonor) {
      router.push("/donors/register");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-red-50/40 to-white">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
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
            {locale === "bn" ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "Join RedSavior Community"}
          </h2>
          <p className="text-xs text-gray-500">
            {locale === "bn"
              ? "রক্তদান করুন অথবা জরুরি মুহূর্তে রক্তের আবেদন করুন"
              : "Become part of the nationwide blood donation lifesaver network"}
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
              {locale === "bn" ? "পূর্ণ নাম" : "Full Name"}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahim Ahmed"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

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
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {locale === "bn" ? "বাংলাদেশী মোবাইল নম্বর" : "Mobile Number (Bangladesh)"}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+8801711234567"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {locale === "bn" ? "পাসওয়ার্ড" : "Password"}
              </label>
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

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                {locale === "bn" ? "পাসওয়ার্ড নিশ্চিত করুন" : "Confirm Password"}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Volunteer / Donor Opt-in */}
          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="donorOpt"
              checked={wantToBeDonor}
              onChange={(e) => setWantToBeDonor(e.target.checked)}
              className="mt-0.5 rounded text-[#E50914] focus:ring-[#E50914]"
            />
            <label htmlFor="donorOpt" className="text-xs text-gray-700 cursor-pointer">
              <span className="font-bold text-gray-900 block">
                {locale === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করতে চাই" : "I want to register as a Blood Donor"}
              </span>
              <span className="text-gray-500">
                {locale === "bn"
                  ? "জরুরি প্রয়োজনে রক্তদান করে মানুষের জীবন বাঁচাতে ভূমিকা রাখুন।"
                  : "Help save lives when patients require emergency blood transfusion."}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>
              {loading
                ? locale === "bn"
                  ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                  : "Creating Account..."
                : locale === "bn"
                ? "নিবন্ধন সম্পন্ন করুন"
                : "Create Account"}
            </span>
          </button>
        </form>

        <div className="text-center text-xs text-gray-600">
          {locale === "bn" ? "ইতিমধ্যে অ্যাকাউন্ট আছে? " : "Already registered? "}
          <Link href="/login" className="text-[#E50914] font-bold hover:underline">
            {locale === "bn" ? "লগইন করুন" : "Sign in"}
          </Link>
        </div>
      </div>
    </div>
  );
}
