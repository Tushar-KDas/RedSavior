"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  Globe,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Droplet,
  Heart,
  PlusCircle,
  Building2,
  Users,
  HelpCircle,
  QrCode,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const { locale, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout, currentRole } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.navHome, href: "/" },
    {
      label: t.navFindDonor,
      href: "/donors",
      dropdown: [
        {
          label: locale === "bn" ? "রক্তদাতা অনুসন্ধান" : "Find Blood Donors",
          desc: locale === "bn" ? "উপজেলা ও রক্তের গ্রুপ অনুযায়ী" : "Search by upazila and blood group",
          href: "/donors",
          icon: Droplet,
        },
        {
          label: locale === "bn" ? "রক্তদাতা ডিরেক্টরি" : "Donor Directory",
          desc: locale === "bn" ? "সারাদেশের নিবন্ধিত তালিকা" : "Complete administrative directory",
          href: "/donors/directory",
          icon: Users,
        },
        {
          label: locale === "bn" ? "রক্তদাতা নিবন্ধন" : "Become a Donor",
          desc: locale === "bn" ? "ডিজিটাল আইডি কার্ড পান" : "Join the lifesaver network",
          href: "/donors/register",
          icon: Heart,
          badge: locale === "bn" ? "যুক্ত হোন" : "Join",
        },
      ],
    },
    {
      label: t.navBloodRequest,
      href: "/requests",
      dropdown: [
        {
          label: locale === "bn" ? "জরুরি রক্তের আবেদন বোর্ড" : "Live Blood Requests",
          desc: locale === "bn" ? "সরাসরি রোগীর পাশে দাঁড়ান" : "Review urgent patient needs",
          href: "/requests",
          icon: Droplet,
        },
        {
          label: locale === "bn" ? "রক্তের নতুন আবেদন করুন" : "Post Blood Request",
          desc: locale === "bn" ? "নিকটবর্তী রক্তদাতাদের ডাকুন" : "Broadcast emergency requisition",
          href: "/requests/create",
          icon: PlusCircle,
          badge: locale === "bn" ? "জরুরি" : "Emergency",
        },
      ],
    },
    {
      label: t.navHospitals,
      href: "/hospitals",
      dropdown: [
        {
          label: locale === "bn" ? "হাসপাতাল তালিকা" : "Verified Hospitals",
          desc: locale === "bn" ? "অনুমোদিত মেডিকেল কলেজ" : "Accredited medical facilities",
          href: "/hospitals",
          icon: Building2,
        },
        {
          label: locale === "bn" ? "সেন্ট্রাল ব্লাড ব্যাংক" : "Blood Banks & Stocks",
          desc: locale === "bn" ? "প্রস্তুত রক্তের মজুদ" : "Real-time component units",
          href: "/blood-banks",
          icon: Droplet,
        },
      ],
    },
    {
      label: t.navOrganizations,
      href: "/organizations",
      dropdown: [
        {
          label: locale === "bn" ? "মানবিক সহযোগী সংগঠন" : "Partner Organizations",
          desc: locale === "bn" ? "স্বেচ্ছাসেবী নেটওয়ার্ক" : "Voluntary partner networks",
          href: "/organizations",
          icon: Users,
        },
        {
          label: locale === "bn" ? "রক্তদান ক্যাম্পেইন ও উৎসব" : "Donation Camps & Events",
          desc: locale === "bn" ? "ক্যাম্পেইন শিডিউল ও আরএসভিপি" : "Upcoming community drives",
          href: "/campaigns",
          icon: Heart,
        },
      ],
    },
    {
      label: t.navAbout,
      href: "/about",
      dropdown: [
        {
          label: locale === "bn" ? "আমাদের সম্পর্কে" : "About RedSavior",
          desc: locale === "bn" ? "মানবিক অঙ্গীকার ও পরিচিতি" : "Our story and mission",
          href: "/about",
          icon: Heart,
        },
        {
          label: locale === "bn" ? "লক্ষ্য ও উদ্দেশ্য" : "Mission & Vision",
          desc: locale === "bn" ? "সুস্থ বাংলাদেশের প্রত্যাশা" : "A healthier Bangladesh",
          href: "/about/mission",
          icon: Sparkles,
        },
        {
          label: locale === "bn" ? "কীভাবে কাজ করে" : "How It Works",
          desc: locale === "bn" ? "সহজ ৫টি পদক্ষেপ" : "5 transparent steps",
          href: "/how-it-works",
          icon: ShieldCheck,
        },
        {
          label: locale === "bn" ? "রক্তদান সচেতনতা" : "Blood Awareness",
          desc: locale === "bn" ? "স্বাস্থ্য উপকারিতা ও তথ্য" : "Health benefits & guidance",
          href: "/awareness",
          icon: Droplet,
        },
      ],
    },
    {
      label: t.navResources,
      href: "/faq",
      dropdown: [
        {
          label: locale === "bn" ? "সচরাচর জিজ্ঞাসা (FAQ)" : "FAQ & Answers",
          desc: locale === "bn" ? "সাধারণ প্রশ্নের উত্তর" : "Common questions answered",
          href: "/faq",
          icon: HelpCircle,
        },
        {
          label: locale === "bn" ? "শিক্ষামূলক নিবন্ধ" : "Educational Articles",
          desc: locale === "bn" ? "মেডিকেল প্রতিবেদন" : "Transfusion medicine articles",
          href: "/articles",
          icon: Droplet,
        },
        {
          label: locale === "bn" ? "ডিজিটাল আইডি যাচাই" : "QR ID Verification",
          desc: locale === "bn" ? "সদস্যতা কার্ড নিশ্চিত করুন" : "Verify official donor card",
          href: "/verify-id",
          icon: QrCode,
          badge: locale === "bn" ? "কিউআর" : "QR",
        },
      ],
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgb(0,0,0,0.06)] border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Enhanced Micro-Hover */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative h-14 w-48 sm:w-56">
              <Image
                src="/brand/logo.png"
                alt="RedSavior - Donate Blood. Save Lives."
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const hasDropdown = item.dropdown && item.dropdown.length > 0;

              return (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#E50914] text-white shadow-sm shadow-red-500/25"
                        : "text-gray-700 hover:text-[#E50914] hover:bg-red-50/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                          activeDropdown === item.href ? "rotate-180 text-[#E50914]" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* High-Fidelity Dropdown Menu */}
                  {hasDropdown && activeDropdown === item.href && (
                    <div className="absolute left-0 mt-1 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/90 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {item.dropdown.map((drop) => {
                        const Icon = drop.icon || Droplet;
                        return (
                          <Link
                            key={drop.href}
                            href={drop.href}
                            className="flex items-start gap-3 px-4 py-2.5 hover:bg-red-50/80 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-xl bg-red-50 text-[#E50914] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#E50914] group-hover/item:text-white transition-colors shadow-sm">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-gray-900 group-hover/item:text-[#E50914] transition-colors">
                                  {drop.label}
                                </span>
                                {drop.badge && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-red-100 text-[#E50914]">
                                    {drop.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                                {drop.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Emergency Request Pulse Button */}
            <Link
              href="/requests/create"
              className="relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-red-600 to-[#E50914] text-white shadow-md shadow-red-500/20 hover:shadow-red-500/35 hover:scale-[1.02] transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span>{locale === "bn" ? "রক্তের ডাক দিন" : "Request Blood"}</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/50 text-gray-700 transition"
              title="Toggle Language (বাংলা / English)"
            >
              <Globe className="w-3.5 h-3.5 text-[#E50914]" />
              <span>{locale === "bn" ? "EN" : "বাংলা"}</span>
            </button>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 pl-3 pr-4 py-1.5 text-xs font-bold rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-red-400" />
                  <span>{t.navDashboard}</span>
                  <span className="text-[9px] bg-[#E50914] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                    {currentRole.replace("_", " ")}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-[#E50914] rounded-full hover:bg-red-50 transition"
                  title={t.navLogout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-[#E50914] border border-gray-200 hover:border-red-200 rounded-full hover:bg-red-50/50 transition"
                >
                  {t.navLogin}
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#E50914] hover:bg-[#B80012] rounded-full shadow-md shadow-red-500/20 hover:scale-[1.02] transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t.navRegister}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/requests/create"
              className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#E50914] text-white"
            >
              {locale === "bn" ? "আবেদন" : "Request"}
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border border-gray-200 text-gray-700"
            >
              <Globe className="w-3 h-3 text-[#E50914]" />
              <span>{locale === "bn" ? "EN" : "বাং"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#E50914] rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl px-5 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <div key={item.href} className="border-b border-gray-50 pb-1">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-sm font-bold ${
                    pathname === item.href
                      ? "bg-[#E50914] text-white"
                      : "text-gray-800 hover:bg-red-50 hover:text-[#E50914]"
                  }`}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 space-y-1 mt-1 border-l-2 border-red-100">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2 py-1.5 text-xs text-gray-600 hover:text-[#E50914] font-medium"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#E50914] text-white font-bold rounded-xl text-sm shadow-md"
                >
                  {t.navDashboard}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-gray-600 hover:text-red-600 text-xs font-semibold"
                >
                  {t.navLogout}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold"
                >
                  {t.navLogin}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 bg-[#E50914] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {t.navRegister}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
