"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ChevronDown, HelpCircle, Phone, ArrowRight } from "lucide-react";

export default function FaqPage() {
  const { locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qBn: "কে রক্তদান করতে পারেন?",
      qEn: "Who is eligible to donate blood in Bangladesh?",
      aBn: "সাধারণত ১৮ থেকে ৬০ বছর বয়সী যেকোনো সুস্থ পুরুষ ও নারী, যাদের ওজন কমপক্ষে ৪৫-৫০ কেজি এবং হিমোগ্লোবিন সন্তোষজনক, তারা রক্তদান করতে পারেন। তবে রক্তদানের পূর্বে সংশ্লিষ্ট হাসপাতালের চিকিৎসক দ্বারা শারীরিক পরীক্ষা সম্পন্ন করা আবশ্যক।",
      aEn: "Generally, healthy individuals aged 18 to 60 with a body weight of at least 45-50 kg and adequate hemoglobin can donate blood. Final fitness is determined on-site by clinical doctors.",
    },
    {
      qBn: "কতদিন পর পর রক্তদান করা যায়?",
      qEn: "How often can a donor donate blood?",
      aBn: "সম্পূর্ণ রক্ত (Whole Blood) দানের ক্ষেত্রে স্বাস্থ্যগত নির্দেশিকা অনুযায়ী সাধারণত ৩ থেকে ৪ মাস বিরতি দেওয়ার পরামর্শ দেওয়া হয়। প্লাটিলেট বা প্লাজমা এফেরেসিসের ক্ষেত্রে বিরতির সময় আরও কম হতে পারে। রেডসেভিয়রে পরবর্তী সম্ভাব্য পর্যালোচনার তারিখ ট্র্যাকিং সুবিধা রয়েছে।",
      aEn: "For whole blood, standard guidelines suggest an interval of 3 to 4 months between donations. Apheresis/platelet donations follow facility-specific criteria. RedSavior provides configurable automated safety reminders.",
    },
    {
      qBn: "রেডসেভিয়রে আমার ফোন নম্বর ও ব্যক্তিগত তথ্য কতটা সুরক্ষিত?",
      qEn: "How is donor privacy protected on RedSavior?",
      aBn: "আমরা রক্তদাতার পূর্ণ গোপনীয়তাকে সর্বোচ্চ অগ্রাধিকার দেই। ডিফল্টভাবে আপনার ফোন নম্বর পাবলিকলি মাস্ক বা আড়াল করা থাকে। শুধুমাত্র যখন আপনি কোনো জরুরি রক্তের আবেদনে সম্মতি দেবেন, তখনই তা প্রকাশ পাবে। আপনি যেকোনো সময় আপনার সম্মতি প্রত্যাহার করতে পারেন।",
      aEn: "We strictly prioritize privacy. Your mobile number is masked by default and only revealed upon mutual response consent. You can withdraw public consent at any time.",
    },
    {
      qBn: "ডিজিটাল আইডি কার্ডের কিউআর কোড কীভাবে কাজ করে?",
      qEn: "How does the cryptographic QR digital ID card work?",
      aBn: "প্রতিটি আইডি কার্ডে একটি ক্রিপ্টোগ্রাফিক র্যান্ডম টোকেন থাকে। যেকোনো স্মার্টফোন দিয়ে স্ক্যান করলে আমাদের সার্ভার থেকে কার্ডের সক্রিয়তা ও সত্যতা যাচাই হয়। কিউআর কোডের ভেতরে কোনো সংবেদনশীল চিকিৎসা তথ্য বা পাসওয়ার্ড সংরক্ষিত থাকে না।",
      aEn: "Each membership card features a cryptographically secure, non-sequential token. Scanning it queries the official RedSavior server to confirm authenticity without embedding private records in the barcode.",
    },
    {
      qBn: "রক্তদানের মাধ্যমে রক্তদাতার কি কোনো শারীরিক ক্ষতি হতে পারে?",
      qEn: "Does donating blood cause any harm or weakness?",
      aBn: "না। একজন প্রাপ্তবয়স্ক মানুষের শরীরে সাধারণত ৪.৫ থেকে ৫.৫ লিটার রক্ত থাকে, যার মাত্র ৩৫০-৪৫০ মিলি রক্তদানে নেওয়া হয়। শরীর মাত্র ২৪ থেকে ৪৮ ঘণ্টার মধ্যে রক্তের তরল অংশ পূরণ করে ফেলে এবং কয়েক সপ্তাহের মধ্যে লোহিত রক্তকণিকা পুনরায় তৈরি হয়। রক্তদান সম্পূর্ণ নিরাপদ।",
      aEn: "No. The human body replenishes fluid volume within 24-48 hours, and red blood cells regenerate in a few weeks. It is completely safe and healthy.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E50914] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "সাধারণ জিজ্ঞাসা ও উত্তর" : "Frequently Asked Questions"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {locale === "bn" ? "রক্তদান সংক্রান্ত সচরাচর জিজ্ঞাসা" : "Everything You Need to Know"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          {locale === "bn"
            ? "রক্তদান, নিরাপত্তা এবং রেডসেভিয়র প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী।"
            : "Answers to common questions regarding medical guidelines, donor privacy, and safety."}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-gray-900 flex items-center justify-between text-sm sm:text-base hover:bg-gray-50/50"
              >
                <span>{locale === "bn" ? faq.qBn : faq.qEn}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isOpen ? "rotate-180 text-[#E50914]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {locale === "bn" ? faq.aBn : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Box */}
      <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">
            {locale === "bn" ? "আরও কোনো প্রশ্ন আছে?" : "Have More Questions?"}
          </h4>
          <p className="text-xs text-gray-600 mt-0.5">
            {locale === "bn"
              ? "আমাদের সাপোর্ট টিম ২৪/৭ আপনাকে সহায়তা করতে প্রস্তুত।"
              : "Our dedicated support helpline is ready to assist you anytime."}
          </p>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2.5 bg-[#E50914] text-white rounded-xl text-xs font-bold hover:bg-[#B80012] shadow-sm transition flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "যোগাযোগ করুন" : "Contact Support"}</span>
        </Link>
      </div>
    </div>
  );
}
