"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  Heart,
} from "lucide-react";

export default function ContactPage() {
  const { locale } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {locale === "bn" ? "আমাদের সাথে যোগাযোগ করুন" : "Get in Touch with RedSavior"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          {locale === "bn"
            ? "যেকোনো অনুসন্ধান, প্রাতিষ্ঠানিক পার্টনারশিপ বা জরুরি সহায়তার জন্য আমাদের লিখুন।"
            : "Reach out for emergency support, organizational collaborations, or inquiries."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">
              {locale === "bn" ? "কেন্দ্রীয় কার্যালয়" : "Headquarters"}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              RedSavior Foundation Bangladesh<br />
              Level 4, House 25, Road 8A, Dhanmondi R/A<br />
              Dhaka - 1209, Bangladesh
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">
              {locale === "bn" ? "জরুরি হটলাইন" : "Emergency Helpline"}
            </h3>
            <p className="text-xs text-gray-600 font-mono">
              +880 1711 123456 (24/7 Hotline)<br />
              +880 2 9116563 (Office Landline)
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E50914] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">
              {locale === "bn" ? "ইমেইল যোগাযোগ" : "Official Email"}
            </h3>
            <p className="text-xs text-gray-600">
              support@redsavior.org<br />
              partnerships@redsavior.org
            </p>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900">
                {locale === "bn" ? "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!" : "Message Sent Successfully!"}
              </h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                {locale === "bn"
                  ? "আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে যোগাযোগ করবে।"
                  : "Thank you for contacting RedSavior. Our representative will respond shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "আপনার নাম" : "Your Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahim Ahmed"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "বিষয়" : "Subject"}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Volunteer Partnership Inquiry"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {locale === "bn" ? "বার্তা" : "Message"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914] text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E50914] text-white font-bold rounded-xl hover:bg-[#B80012] shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{locale === "bn" ? "বার্তা পাঠান" : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
