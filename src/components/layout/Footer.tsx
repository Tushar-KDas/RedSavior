"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { QrCode, ArrowRight, Heart, CheckCircle2 } from "lucide-react";

export function Footer() {
  const { locale, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1120] text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-52 bg-white/5 p-1 rounded-xl">
                <Image
                  src="/brand/logo.png"
                  alt="RedSavior"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {t.footerAboutText}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{t.footerFollowUs}:</span>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#E50914] transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#E50914] transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#E50914] transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">{t.footerQuickLinks}</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/" className="hover:text-white transition">{t.navHome}</Link></li>
              <li><Link href="/donors" className="hover:text-white transition">{t.navFindDonor}</Link></li>
              <li><Link href="/requests" className="hover:text-white transition">{t.navBloodRequest}</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition">{t.navHospitals}</Link></li>
              <li><Link href="/organizations" className="hover:text-white transition">{t.navOrganizations}</Link></li>
              <li><Link href="/campaigns" className="hover:text-white transition">{locale === 'bn' ? 'রক্তদান ক্যাম্পেইন' : 'Donation Camps'}</Link></li>
            </ul>
          </div>

          {/* Col 3: Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">{t.footerSupport}</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/faq" className="hover:text-white transition">{t.footerFaq}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">{t.footerPrivacyPolicy}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">{t.footerTerms}</Link></li>
              <li><Link href="/community-guidelines" className="hover:text-white transition">{t.footerCommunityGuidelines}</Link></li>
              <li><Link href="/help" className="hover:text-white transition">{t.footerHelpCenter}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">{t.footerContact}</Link></li>
            </ul>
          </div>

          {/* Col 4: QR Verification & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">{t.footerNewsletterTitle}</h4>
            <p className="text-xs text-gray-400">{t.footerNewsletterDesc}</p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footerNewsletterPlaceholder}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E50914]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#E50914] text-white rounded-md hover:bg-[#B80012] flex items-center justify-center transition"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{locale === 'bn' ? 'ধন্যবাদ! আপনি যুক্ত হয়েছেন।' : 'Subscribed successfully!'}</span>
                </div>
              )}
            </form>

            {/* QR Scanner Link */}
            <div className="pt-2">
              <Link
                href="/verify-id"
                className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 transition group"
              >
                <QrCode className="w-5 h-5 text-[#E50914] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold text-[11px] leading-tight">{t.footerScanVerify}</div>
                  <div className="text-[10px] text-gray-400">Scan & Confirm Authenticity</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} {t.footerCopyright}</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition">{t.footerPrivacyPolicy}</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition">{t.footerTerms}</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition">{t.footerContact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
