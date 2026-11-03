export type Locale = 'bn' | 'en';

export interface Translations {
  // Top announcement bar
  topBarSlogan: string;
  topBarLocation: string;
  topBarPhone: string;
  topBarEmail: string;

  // Navigation
  navHome: string;
  navFindDonor: string;
  navBloodRequest: string;
  navHospitals: string;
  navOrganizations: string;
  navAbout: string;
  navResources: string;
  navLogin: string;
  navRegister: string;
  navDashboard: string;
  navLogout: string;

  // Hero Section
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCtaFindDonor: string;
  heroCtaBecomeDonor: string;
  heroSearchTitle: string;
  heroSelectBloodGroup: string;
  heroSelectDivision: string;
  heroSelectDistrict: string;
  heroSelectUpazila: string;
  heroBtnSearchDonor: string;

  // Impact Statistics
  statRegisteredDonors: string;
  statVerifiedDonors: string;
  statTotalDonations: string;
  statActiveRequests: string;
  statOrganizations: string;
  statHospitals: string;

  // How it works
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;
  howStep4Title: string;
  howStep4Desc: string;
  howStep5Title: string;
  howStep5Desc: string;
  howLearnMore: string;

  // Nationwide Network
  networkTitle: string;
  networkViewFullMap: string;
  networkDistrictCoverage: string;

  // Emergency Request Banner
  emergencyTitle: string;
  emergencySubtitle: string;
  emergencyBtnRequest: string;

  // Featured Donors & Recent Requests
  featuredDonorsTitle: string;
  viewAll: string;
  recentRequestsTitle: string;
  verifiedBadge: string;
  urgentBadge: string;
  criticalBadge: string;
  donationsCount: string;

  // Awareness Banner
  togetherBannerTitle: string;
  togetherBannerSubtitle: string;

  // Footer
  footerAboutText: string;
  footerQuickLinks: string;
  footerAboutUs: string;
  footerSupport: string;
  footerFollowUs: string;
  footerNewsletterTitle: string;
  footerNewsletterDesc: string;
  footerNewsletterPlaceholder: string;
  footerNewsletterBtn: string;
  footerScanVerify: string;
  footerCopyright: string;
  footerPrivacyPolicy: string;
  footerTerms: string;
  footerFaq: string;
  footerContact: string;
  footerHelpCenter: string;
  footerCommunityGuidelines: string;
}

export const translations: Record<Locale, Translations> = {
  bn: {
    topBarSlogan: "একটি সুস্থ বাংলাদেশের জন্য আমরা এক সাথে",
    topBarLocation: "ঢাকা, বাংলাদেশ",
    topBarPhone: "+৮৮০ ১৭১১ ১২৩৪৫৬",
    topBarEmail: "info@redsavior.org",

    navHome: "হোম",
    navFindDonor: "রক্তদাতা খুঁজুন",
    navBloodRequest: "রক্তের আবেদন",
    navHospitals: "হাসপাতাল",
    navOrganizations: "সংগঠন",
    navAbout: "আমাদের সম্পর্কে",
    navResources: "রিসোর্স",
    navLogin: "লগইন",
    navRegister: "রেজিস্টার",
    navDashboard: "ড্যাশবোর্ড",
    navLogout: "লগআউট",

    heroTitle1: "রক্ত দিন।",
    heroTitle2: "জীবন বাঁচান।",
    heroSubtitle: "বাংলাদেশ জুড়ে রক্তদাতা ও রক্তগ্রহীতাদের নির্ভরযোগ্য সেতুবন্ধন।",
    heroCtaFindDonor: "রক্তদাতা খুঁজুন",
    heroCtaBecomeDonor: "রক্তদাতা হোন",
    heroSearchTitle: "দ্রুত রক্তদাতা সন্ধান",
    heroSelectBloodGroup: "রক্তের গ্রুপ নির্বাচন করুন",
    heroSelectDivision: "বিভাগ নির্বাচন করুন",
    heroSelectDistrict: "জেলা নির্বাচন করুন",
    heroSelectUpazila: "উপজেলা নির্বাচন করুন",
    heroBtnSearchDonor: "রক্তদাতা খুঁজুন",

    statRegisteredDonors: "নিবন্ধিত রক্তদাতা",
    statVerifiedDonors: "যাচাইকৃত রক্তদাতা",
    statTotalDonations: "মোট রক্তদান",
    statActiveRequests: "সক্রিয় রক্তের আবেদন",
    statOrganizations: "যুক্ত সংগঠন",
    statHospitals: "হাসপাতাল ও ব্লাড ব্যাংক",

    howItWorksTitle: "রেডসেভিয়র কীভাবে কাজ করে?",
    howItWorksSubtitle: "মাত্র কয়েকটি সহজ পদক্ষেপে মানুষের জীবন বাঁচানোর অংশীদার হোন।",
    howStep1Title: "১. অ্যাকাউন্ট খুলুন",
    howStep1Desc: "সহজেই নিবন্ধন করুন",
    howStep2Title: "২. রক্তদাতা তথ্য দিন",
    howStep2Desc: "আপনার রক্তের তথ্য যোগ করুন",
    howStep3Title: "৩. আবেদন খুঁজুন বা পান",
    howStep3Desc: "জরুরি রক্তের ডাক গ্রহণ করুন",
    howStep4Title: "৪. রক্ত দান করুন",
    howStep4Desc: "নির্ধারিত কেন্দ্রে রক্ত দিন",
    howStep5Title: "৫. সার্টিফিকেট পান",
    howStep5Desc: "ডিজিটাল সনদ ও স্বীকৃতি নিন",
    howLearnMore: "আরও জানুন",

    networkTitle: "সারাদেশব্যাপী আমাদের নেটওয়ার্ক",
    networkViewFullMap: "পূর্ণাঙ্গ মানচিত্র দেখুন",
    networkDistrictCoverage: "৬৪ জেলায় বিস্তৃত মানবিক সহায়তা",

    emergencyTitle: "জরুরি রক্তের প্রয়োজন?",
    emergencySubtitle: "দ্রুত আবেদন পোস্ট করুন এবং আপনার নিকটবর্তী প্রস্তুত রক্তদাতাদের সাথে যুক্ত হোন।",
    emergencyBtnRequest: "রক্তের আবেদন করুন",

    featuredDonorsTitle: "নির্বাচিত রক্তদাতাবৃন্দ",
    viewAll: "সব দেখুন",
    recentRequestsTitle: "সাম্প্রতিক রক্তের আবেদন",
    verifiedBadge: "যাচাইকৃত",
    urgentBadge: "জরুরি",
    criticalBadge: "সঙ্কটাপন্ন",
    donationsCount: "বার রক্তদান করেছেন",

    togetherBannerTitle: "এক সাথে আমরা বাঁচাতে পারি বহু জীবন",
    togetherBannerSubtitle: "আপনার এক ব্যাগ রক্ত একটি পরিবারের মুখে হাসি ফোটাতে পারে।",

    footerAboutText: "রেডসেভিয়র বাংলাদেশের সর্ববৃহৎ মানবিক ও বিশ্বস্ত ডিজিটাল রক্তদান প্ল্যাটফর্ম।",
    footerQuickLinks: "প্রয়োজনীয় লিংক",
    footerAboutUs: "আমাদের কথা",
    footerSupport: "সহায়তা",
    footerFollowUs: "সামাজিক যোগাযোগ",
    footerNewsletterTitle: "আপডেট পেতে যুক্ত থাকুন",
    footerNewsletterDesc: "জীবন বাঁচানোর মানবিক কার্যক্রমে যুক্ত হতে সাবস্ক্রাইব করুন।",
    footerNewsletterPlaceholder: "আপনার ইমেইল লিখুন",
    footerNewsletterBtn: "সাবস্ক্রাইব",
    footerScanVerify: "ডিজিটাল আইডি কার্ড যাচাই করুন",
    footerCopyright: "রেডসেভিয়র। সর্বস্বত্ব সংরক্ষিত। একটি মানবিক ডিজিটাল উদ্যোগ।",
    footerPrivacyPolicy: "গোপনীয়তা নীতি",
    footerTerms: "ব্যবহারের শর্তাবলী",
    footerFaq: "সাধারণ জিজ্ঞাসা (FAQ)",
    footerContact: "যোগাযোগ",
    footerHelpCenter: "হেল্প সেন্টার",
    footerCommunityGuidelines: "কমিউনিটি নির্দেশিকা",
  },
  en: {
    topBarSlogan: "Together for a Healthier Bangladesh",
    topBarLocation: "Dhaka, Bangladesh",
    topBarPhone: "+880 1711 123456",
    topBarEmail: "info@redsavior.org",

    navHome: "Home",
    navFindDonor: "Find Donor",
    navBloodRequest: "Blood Request",
    navHospitals: "Hospitals",
    navOrganizations: "Organizations",
    navAbout: "About",
    navResources: "Resources",
    navLogin: "Login",
    navRegister: "Register",
    navDashboard: "Dashboard",
    navLogout: "Logout",

    heroTitle1: "Donate Blood.",
    heroTitle2: "Save Lives.",
    heroSubtitle: "Connecting Blood Donors and People in Need Across Bangladesh.",
    heroCtaFindDonor: "Find Blood Donor",
    heroCtaBecomeDonor: "Become a Donor",
    heroSearchTitle: "Quick Donor Search",
    heroSelectBloodGroup: "Select Blood Group",
    heroSelectDivision: "Select Division",
    heroSelectDistrict: "Select District",
    heroSelectUpazila: "Select Upazila",
    heroBtnSearchDonor: "Search Donor",

    statRegisteredDonors: "Registered Donors",
    statVerifiedDonors: "Verified Donors",
    statTotalDonations: "Total Donations",
    statActiveRequests: "Active Blood Requests",
    statOrganizations: "Organizations",
    statHospitals: "Hospitals & Blood Banks",

    howItWorksTitle: "How RedSavior Works?",
    howItWorksSubtitle: "Be a part of the lifesaving community in just a few steps.",
    howStep1Title: "1. Register",
    howStep1Desc: "Create your account",
    howStep2Title: "2. Become a Donor",
    howStep2Desc: "Add your details",
    howStep3Title: "3. Find / Receive Requests",
    howStep3Desc: "Accept blood requests",
    howStep4Title: "4. Donate Blood",
    howStep4Desc: "Save a life at center",
    howStep5Title: "5. Get Certificate",
    howStep5Desc: "Be a recognized hero",
    howLearnMore: "Learn More",

    networkTitle: "Our Nationwide Network",
    networkViewFullMap: "View Full Map",
    networkDistrictCoverage: "Covering all 64 districts across Bangladesh",

    emergencyTitle: "Emergency Blood Request?",
    emergencySubtitle: "Post a request and get donors near you quickly.",
    emergencyBtnRequest: "Request Blood",

    featuredDonorsTitle: "Featured Donors",
    viewAll: "View All",
    recentRequestsTitle: "Recent Blood Requests",
    verifiedBadge: "Verified",
    urgentBadge: "Urgent",
    criticalBadge: "Critical Emergency",
    donationsCount: "times donated",

    togetherBannerTitle: "Together We Can Save Lives",
    togetherBannerSubtitle: "Every single drop counts. Be someone's lifesaver today.",

    footerAboutText: "RedSavior is Bangladesh's nationwide secure humanitarian digital blood donation platform.",
    footerQuickLinks: "Quick Links",
    footerAboutUs: "About Us",
    footerSupport: "Support",
    footerFollowUs: "Follow Us",
    footerNewsletterTitle: "Subscribe for Updates",
    footerNewsletterDesc: "Stay connected for the latest updates and emergency drives.",
    footerNewsletterPlaceholder: "Enter your email",
    footerNewsletterBtn: "Subscribe",
    footerScanVerify: "Scan to Verify Our ID Card",
    footerCopyright: "RedSavior. All rights reserved. | A Digital Initiative for a Blood Healthy Bangladesh ❤️",
    footerPrivacyPolicy: "Privacy Policy",
    footerTerms: "Terms & Conditions",
    footerFaq: "FAQ",
    footerContact: "Contact Us",
    footerHelpCenter: "Help Center",
    footerCommunityGuidelines: "Community Guidelines",
  },
};
