# RedSavior Setup & Configuration Guide

This guide details the step-by-step setup procedure for local development and cloud integration with Supabase.

---

## 1. Local Environment Requirements
- **Node.js:** v18.17+ or v20+ or v24+
- **Package Manager:** npm v10+ (or pnpm / yarn)
- **Modern Web Browser:** Chrome, Firefox, Edge, Safari

---

## 2. Installation Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`.

---

## 3. Connecting Real Supabase Project (Optional Cloud Mode)

When you are ready to link a live cloud Supabase project:

1. Create a new Supabase project at [https://supabase.com](https://supabase.com).
2. Go to **Project Settings** → **API**.
3. Copy **Project URL** and **Anon / Public Key**.
4. In your `.env.local`, update:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   ```
5. Run the master SQL migration script:
   - Go to **SQL Editor** in Supabase dashboard.
   - Paste the contents of `supabase/migrations/001_initial_schema.sql` and run.
   - Paste the contents of `supabase/seed/bangladesh_geo.sql` to populate the 8 divisions, 64 districts, and upazilas.

---

## 4. Default Seed Test Accounts

The platform includes demo accounts for instant evaluation:

| Role | Email | Password | Access Scope |
|---|---|---|---|
| **Super Admin** | `admin@redsavior.org` | Any text (e.g. `password123`) | Full platform administration |
| **Verified Donor (A+)** | `ayesha.akter@gmail.com` | Any text | Donor dashboard & ID card |
| **Hospital Admin** | `dmch.admin@redsavior.org` | Any text | Hospital facility management |

On the `/login` page, you can also click the quick demo buttons to log in with a single click.
