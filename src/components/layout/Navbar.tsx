"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export function Navbar() {
  const { locale, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout, currentRole } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { label: t.navHome, href: "/" },
    {
      label: t.navFindDonor,
      href: "/donors",
      dropdown: [
        { label: locale === 'bn' ? 'রক্তদাতা খুঁজুন' : 'Find Blood Donors', href: '/donors' },
        { label: locale === 'bn' ? 'রক্তদাতা তালিকা' : 'Donor Directory', href: '/donors/directory' },
        { label: locale === 'bn' ? 'রক্তদাতা হিসেবে নিবন্ধন' : 'Become a Donor', href: '/donors/register' },
      ],
    },
    {
      label: t.navBloodRequest,
      href: "/requests",
      dropdown: [
        { label: locale === 'bn' ? 'সকল রক্তের আবেদন' : 'All Blood Requests', href: '/requests' },
        { label: locale === 'bn' ? 'রক্তের আবেদন করুন' : 'Create Blood Request', href: '/requests/create' },
      ],
    },
    {
      label: t.navHospitals,
      href: "/hospitals",
      dropdown: [
        { label: locale === 'bn' ? 'হাসপাতাল তালিকা' : 'Hospital Directory', href: '/hospitals' },
        { label: locale === 'bn' ? 'ব্লাড ব্যাংক তালিকা' : 'Blood Bank Directory', href: '/blood-banks' },
      ],
    },
    {
      label: t.navOrganizations,
      href: "/organizations",
      dropdown: [
        { label: locale === 'bn' ? 'সংগঠন তালিকা' : 'Organization Directory', href: '/organizations' },
        { label: locale === 'bn' ? 'রক্তদান ক্যাম্পেইন' : 'Donation Camps', href: '/campaigns' },
      ],
    },
    {
      label: t.navAbout,
      href: "/about",
      dropdown: [
        { label: locale === 'bn' ? 'আমাদের সম্পর্কে' : 'About RedSavior', href: '/about' },
        { label: locale === 'bn' ? 'লক্ষ্য ও উদ্দেশ্য' : 'Mission & Vision', href: '/about/mission' },
        { label: locale === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works', href: '/how-it-works' },
        { label: locale === 'bn' ? 'রক্তদান সচেতনতা' : 'Blood Donation Awareness', href: '/awareness' },
      ],
    },
    {
      label: t.navResources,
      href: "/faq",
      dropdown: [
        { label: locale === 'bn' ? 'প্রশ্নোত্তর (FAQ)' : 'FAQ', href: '/faq' },
        { label: locale === 'bn' ? 'শিক্ষামূলক নিবন্ধ' : 'Educational Articles', href: '/articles' },
        { label: locale === 'bn' ? 'আইডি ভেরিফিকেশন' : 'ID / QR Verification', href: '/verify-id' },
        { label: locale === 'bn' ? 'হেল্প সেন্টার ও সাপোর্ট' : 'Help Center', href: '/help' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
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
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-all ${
                      isActive
                        ? "bg-[#E50914] text-white shadow-sm"
                        : "text-gray-700 hover:text-[#E50914] hover:bg-red-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === item.href && (
                    <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.dropdown.map((drop) => (
                        <Link
                          key={drop.href}
                          href={drop.href}
                          className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-red-50 hover:text-[#E50914] transition"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              title="Toggle Language (বাংলা / English)"
            >
              <Globe className="w-3.5 h-3.5 text-[#E50914]" />
              <span>{locale === "bn" ? "English" : "বাংলা"}</span>
            </button>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#E50914] text-white hover:bg-[#B80012] shadow-sm transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t.navDashboard}</span>
                  <span className="ml-1 text-[10px] bg-red-800 px-1.5 py-0.5 rounded-full uppercase">
                    {currentRole.replace("_", " ")}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-[#E50914] rounded-full hover:bg-red-50 transition"
                  title={t.navLogout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                >
                  {t.navLogin}
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#E50914] rounded-full hover:bg-[#B80012] shadow-sm transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t.navRegister}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border border-gray-200 text-gray-700"
            >
              <Globe className="w-3 h-3 text-[#E50914]" />
              <span>{locale === "bn" ? "EN" : "বাং"}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#E50914] rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#E50914] text-white"
                      : "text-gray-700 hover:bg-red-50 hover:text-[#E50914]"
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
                        className="block px-2 py-1 text-xs text-gray-600 hover:text-[#E50914]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-[#E50914] text-white font-medium rounded-lg text-sm"
                >
                  {t.navDashboard}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-gray-600 hover:text-red-600 text-sm font-medium"
                >
                  {t.navLogout}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium"
                >
                  {t.navLogin}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 bg-[#E50914] text-white rounded-lg text-sm font-medium"
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
