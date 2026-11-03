"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  UserPlus,
  Droplet,
  Bell,
  Heart,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function HowItWorksPage() {
  const { locale } = useLanguage();

  const steps = [
    {
      step: 1,
      icon: UserPlus,
      titleBn: "অ্যাকাউন্ট তৈরি করুন",
      titleEn: "Create Your Account",
      descBn: "আপনার নাম, মোবাইল নম্বর ও সাধারণ তথ্য দিয়ে মাত্র ২ মিনিটে রেডসেভিয়রে যোগ দিন।",
      descEn: "Sign up with your verified Bangladeshi mobile number and email in under 2 minutes.",
    },
    {
      step: 2,
      icon: Droplet,
      titleBn: "রক্তদাতা তথ্য ও রক্তের গ্রুপ যোগ করুন",
      titleEn: "Complete Donor Profile",
      descBn: "আপনার রক্তের গ্রুপ, বিভাগ, জেলা এবং উপজেলা নির্ধারণ করুন। তাৎক্ষণিকভাবে ডিজিটাল আইডি কার্ড তৈরি হবে।",
      descEn: "Select your verified blood group and location hierarchy to generate your QR-enabled digital membership ID.",
    },
    {
      step: 3,
      icon: Bell,
      titleBn: "জরুরি ডাক পান বা রক্তদাতা খুঁজুন",
      titleEn: "Receive Urgent Alerts or Find Donors",
      descBn: "আপনার এলাকায় কোনো মুমূর্ষু রোগীর রক্তের প্রয়োজন হলে প্ল্যাটফর্মের মাধ্যমে দ্রুত নোটিফিকেশন পাবেন।",
      descEn: "Receive real-time notifications when nearby hospital transfusions match your blood group.",
    },
    {
      step: 4,
      icon: Heart,
      titleBn: "অনুমোদিত কেন্দ্রে রক্ত দান করুন",
      titleEn: "Donate at Certified Medical Facilities",
      descBn: "হাসপাতাল বা ব্লাড ব্যাংকে গিয়ে নিরাপদ পরিবেশে রক্ত দিন। প্রয়োজনীয় স্বাস্থ্য পরীক্ষা ল্যাবে সম্পন্ন হবে।",
      descEn: "Visit the certified hospital transfusion unit where qualified clinical personnel carry out the procedure.",
    },
    {
      step: 5,
      icon: Award,
      titleBn: "ডিজিটাল স্বীকৃতি ও সার্টিফিকেট গ্রহণ করুন",
      titleEn: "Receive Verified Record & Certificate",
      descBn: "হাসপাতাল যাচাইকরণের পর আপনার মোট রক্তদান সংখ্যা যুক্ত হবে এবং ডিজিটাল সম্মাননা সনদ ডাউনলোড করতে পারবেন।",
      descEn: "Hospital staff confirms the donation transaction, updating your verified count and issuing your certificate.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {locale === "bn" ? "রেডসেভিয়র কীভাবে কাজ করে?" : "How RedSavior Works"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          {locale === "bn"
            ? "স্বেচ্ছায় রক্তদান করে একজন মানুষের জীবন বাঁচাতে এই সহজ ৫টি পদক্ষেপ অনুসরণ করুন।"
            : "Follow these 5 transparent steps to become part of the lifesaving revolution in Bangladesh."}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start gap-6 hover:shadow-md transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-[#E50914] flex items-center justify-center font-black text-xl flex-shrink-0 border-2 border-red-200">
                {st.step}
              </div>

              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#E50914]" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {locale === "bn" ? st.titleBn : st.titleEn}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {locale === "bn" ? st.descBn : st.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 text-center">
        <Link
          href="/donors/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E50914] text-white font-bold rounded-full hover:bg-[#B80012] shadow-lg transition text-xs sm:text-sm"
        >
          <span>{locale === "bn" ? "এখনই রক্তদাতা হন" : "Become a Donor Now"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
