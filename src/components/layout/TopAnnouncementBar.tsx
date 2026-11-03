"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Heart, MapPin, Phone, Mail } from "lucide-react";

export function TopAnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#E50914] text-white text-xs sm:text-sm py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Humanitarian Slogan */}
        <div className="flex items-center gap-2 font-medium">
          <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          <span>{t.topBarSlogan}</span>
        </div>

        {/* Right: Contact & Location */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 opacity-95">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.topBarLocation}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 opacity-95">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+8801711123456" className="hover:underline">{t.topBarPhone}</a>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 opacity-95">
            <Mail className="w-3.5 h-3.5" />
            <a href="mailto:info@redsavior.org" className="hover:underline">{t.topBarEmail}</a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 ml-2 pl-2 border-l border-red-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" title="Facebook">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" title="YouTube">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" title="LinkedIn">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" title="X">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
