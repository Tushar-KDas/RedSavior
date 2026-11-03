import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "RedSavior — Nationwide Blood Donation Platform | Bangladesh",
  description:
    "Donate Blood. Save Lives. RedSavior connects blood donors, patients, hospitals, blood banks, and volunteers throughout all 64 districts in Bangladesh.",
  keywords: [
    "blood donation bangladesh",
    "redsavior",
    "blood donor dhaka",
    "blood emergency",
    "blood bank bd",
    "rokto dan",
  ],
  authors: [{ name: "RedSavior Humanitarian Initiative" }],
  openGraph: {
    title: "RedSavior — Donate Blood. Save Lives.",
    description: "Connecting blood donors and people in need across Bangladesh.",
    url: "https://redsavior.org",
    siteName: "RedSavior",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <LanguageProvider>
          <AuthProvider>
            <TopAnnouncementBar />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
