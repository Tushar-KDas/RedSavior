# RedSavior — Nationwide Blood Donation Web Application (Bangladesh)

> **"Donate Blood. Save Lives. | Together for a Healthier Bangladesh"**

RedSavior is a production-grade, nationwide digital blood donation platform engineered for Bangladesh. It connects voluntary blood donors, patients in critical care, hospitals, blood banks, and humanitarian organizations across all 8 administrative divisions, 64 districts, and 495+ upazilas.

---

## 🌟 Key Features

1. **Pixel-Perfect Public Website**
   - Direct implementation matching the official RedSavior brand identity and reference layout.
   - Top announcement bar with 24/7 hotline, Dhaka location, and humanitarian slogan.
   - Cascading Quick Donor Search card (Blood Group → Division → District → Upazila).
   - Real-time impact statistics strip.
   - 5-step interactive "How RedSavior Works" workflow.
   - Interactive Bangladesh donation network map with district distribution.
   - Emergency blood request highlights & verified donor cards.

2. **Digital Donor ID Card & Cryptographic QR Verification**
   - Dynamic identity card generator for all platform roles (Donors, Volunteers, Admins).
   - Embedded QR code containing non-sequential cryptographic token hashes.
   - Instant public verification portal (`/verify-id/[token]`) for hospitals and patients.
   - Direct PDF download, PNG export, and printable layout.

3. **Complete 11-Role RBAC System**
   - Full support for 11 distinct roles:
     - `SUPER_ADMIN`
     - `ADMIN`
     - `DISTRICT_ADMIN`
     - `UPAZILA_COORDINATOR`
     - `ORGANIZATION_ADMIN`
     - `HOSPITAL_ADMIN`
     - `BLOOD_BANK_ADMIN`
     - `VOLUNTEER`
     - `DONOR`
     - `RECIPIENT`
     - `NORMAL_USER`
   - One-click secure multi-role switcher in the dashboard header.

4. **High-Fidelity Super Admin Dashboard**
   - Navy sidebar (`#0F172A`) matching reference screenshots.
   - 6 top metric cards (Total Users, Registered Donors, Verified Donors, Total Donations, Blood Requests, Hospitals & Banks).
   - Monthly donation trends chart (Recharts Line chart: 1M, 3M, 6M, 1Y).
   - Blood group distribution donut chart.
   - Live activity feed, pending approvals queue, and system health status.

5. **Bangladesh Master Geographic Hierarchy**
   - 8 divisions, 64 districts, and upazilas with verified Bangla and English names and centroid coordinates.
   - Instant cascading selection with zero lag.

6. **Privacy & Medical Safety By Design**
   - Phone numbers masked by default (`+88017•••••01`) until mutual response consent.
   - Strict medical disclaimer: The platform confirms identity and availability; clinical transfusion compatibility is solely the domain of licensed medical practitioners.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS & Brand Design Tokens (`#E50914`, `#B80012`, `#0F172A`)
- **Icons:** Lucide React
- **Charts:** Recharts
- **PDF Generation:** jsPDF
- **QR Codes:** QRCode
- **Database:** PostgreSQL / Supabase Schema with versioned SQL migrations & RLS
- **Geospatial:** PostGIS-ready schemas & OpenStreetMap compatible layers
- **Localization:** Bilingual (Bangla `bn` primary & English `en` secondary)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ or v24+
- npm v10+

### 1. Clone & Install
```bash
git clone https://github.com/redsavior/redsavior.git
cd redsavior
npm install
```

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Run Automated Tests
```bash
npm test
```

---

## 📁 Repository Structure

```
├── public/
│   └── brand/               # Official RedSavior logo and reference assets
├── src/
│   ├── app/                 # 32 Next.js App Router routes
│   │   ├── about/           # About Us, Mission & Vision
│   │   ├── articles/        # Educational blood donation guides
│   │   ├── awareness/       # Medical awareness hub
│   │   ├── blood-banks/     # Verified blood banks & real-time inventory
│   │   ├── campaigns/       # Community blood donation camps
│   │   ├── contact/         # Contact & 24/7 hotline
│   │   ├── dashboard/       # High-fidelity Super Admin & Role dashboard
│   │   ├── donors/          # Cascading donor search, map & public profile
│   │   ├── faq/             # Frequently asked questions
│   │   ├── help/            # Help center
│   │   ├── hospitals/       # Hospital directory & emergency hotlines
│   │   ├── how-it-works/    # 5-step walkthrough
│   │   ├── id-card/         # Digital ID card generator & PDF download
│   │   ├── login/           # Authentication & 1-click role demo
│   │   ├── organizations/   # Partner organizations & youth networks
│   │   ├── privacy/         # Privacy Policy
│   │   ├── register/        # Registration & donor onboarding
│   │   ├── requests/        # Emergency blood requests feed & responses
│   │   ├── terms/           # Terms & conditions
│   │   └── verify-id/       # Cryptographic QR verification portal
│   ├── components/          # Reusable UI & layout components
│   ├── data/                # Master Bangladesh geographic database
│   ├── lib/
│   │   ├── auth/            # AuthContext & role switcher
│   │   ├── i18n/            # Bilingual localization (Bangla/English)
│   │   ├── store/           # Local interactive persistent data store
│   │   └── supabase/        # Supabase client wrapper & SSR helpers
│   └── types/               # TypeScript interfaces
├── supabase/
│   ├── migrations/          # Master PostgreSQL schema & RLS policies
│   └── seed/                # Bangladesh 64-district geographic seed SQL
└── tests/                   # Automated unit & integration tests
```

---

## 📄 License
This project is licensed under the MIT License for humanitarian and open-source public health benefit in Bangladesh.
