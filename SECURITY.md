# RedSavior Security Architecture & Privacy Policy

## 1. Security Principles
RedSavior handles vital humanitarian health data connecting donors and patients across Bangladesh. Security and patient confidentiality are embedded by design.

---

## 2. Key Security Safeguards

### A. Phone Number Privacy & Anti-Scraping
- Raw phone numbers are **masked by default** in public donor search results (`+88017•••••01`).
- Phone numbers are only revealed when a donor explicitly responds to and accepts a specific emergency blood request.
- Rate limiting is enforced on search APIs to prevent bulk harvesting by third-party spam bots.

### B. Cryptographic QR Verification
- The QR code on digital ID cards does **not** contain raw phone numbers, National ID numbers, medical histories, or secrets.
- It contains a non-sequential, randomly generated cryptographic token hash pointing to the official verification endpoint (`/verify-id/[token]`).
- Verification confirms active platform membership status only; it is explicitly disclaimed from clinical medical fitness.

### C. Row-Level Security (RLS)
- In Supabase PostgreSQL, RLS is enabled on all public schema tables.
- Users cannot manipulate another user's profile or verified donation counts.
- Only verified facility administrators can update verified donation counts.

### D. Zero Plaintext Credentials
- Password hashing is enforced via bcrypt/Argon2 through Supabase Auth.
- `SUPABASE_SERVICE_ROLE_KEY` is strictly reserved for secure server-side environments and never exposed to client-side bundles.

---

## 3. Reporting Vulnerabilities
If you discover a security vulnerability in RedSavior, please report it immediately to:
`security@redsavior.org`
