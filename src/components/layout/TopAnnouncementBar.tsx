"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Heart, MapPin, Phone, Mail, AlertCircle, Sparkles } from "lucide-react";

export function TopAnnouncementBar() {
  const { locale, t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-[#991B1B] via-[#E50914] to-[#B80012] text-white text-xs py-2 px-4 shadow-sm relative z-50 overflow-hidden">
      {/* Background subtle pulse pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 relative z-10">
        {/* Left: Humanitarian Slogan with Live Beacon */}
        <div className="flex items-center gap-2 font-medium">
          <div className="flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <Heart className="w-3.5 h-3.5 fill-white text-white animate-heartbeat" />
            <span className="font-bold tracking-wide">
              {locale === "bn" ? "লাইভ নেটওয়ার্ক" : "LIVE NETWORK"}
            </span>
          </div>
          <span className="text-white/95 text-[11px] sm:text-xs">
            {t.topBarSlogan}
          </span>
        </div>

        {/* Center: Live Emergency Callout (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/90">
          <span className="bg-black/25 px-2.5 py-0.5 rounded-full border border-white/10 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {locale === "bn"
              ? "৬৪ জেলায় ৮৯,৪২০+ রক্তদাতা প্রস্তুত"
              : "89,420+ Donors Ready Across 64 Districts"}
          </span>
        </div>

        {/* Right: Contact & Location */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/95">
          <div className="flex items-center gap-1 opacity-90">
            <MapPin className="w-3.5 h-3.5 text-white/80" />
            <span className="hidden sm:inline">{t.topBarLocation}</span>
            <span className="sm:hidden">Dhaka, BD</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <Phone className="w-3 h-3 text-white/90" />
            <a
              href="tel:+8801711123456"
              className="hover:underline tracking-tight bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-md transition"
              title="24/7 Blood Emergency Hotline"
            >
              {t.topBarPhone}
            </a>
          </div>

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-white/25">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              title="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
