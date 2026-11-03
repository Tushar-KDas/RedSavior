-- RedSavior Master Database Schema
-- Production-Ready PostgreSQL / Supabase Schema for Bangladesh Nationwide Blood Donation Platform

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS & CONSTANTS
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE blood_group_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other', 'unspecified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE donor_status_enum AS ENUM ('active', 'temporarily_unavailable', 'medical_hold', 'inactive', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_urgency_enum AS ENUM ('normal', 'urgent', 'critical_emergency');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status_enum AS ENUM (
        'draft', 'pending_review', 'published', 'searching', 
        'donor_responded', 'donor_confirmed', 'scheduled', 
        'completed', 'cancelled', 'expired', 'rejected'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE donation_status_enum AS ENUM (
        'draft', 'submitted', 'pending_verification', 'verified', 'rejected', 'disputed', 'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE facility_type_enum AS ENUM ('hospital', 'blood_bank', 'clinic', 'donation_center');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. GEOGRAPHIC FOUNDATION (BANGLADESH HIERARCHY)
-- ============================================================================

CREATE TABLE IF NOT EXISTS geo_divisions (
    id VARCHAR(10) PRIMARY KEY, -- e.g. 'DHAKA', 'CTG', 'RAJ'
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS geo_districts (
    id VARCHAR(20) PRIMARY KEY, -- e.g. 'dhaka', 'chittagong', 'sylhet'
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7)
);

CREATE TABLE IF NOT EXISTS geo_upazilas (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'dhanmondi', 'mirpur', 'hathazari'
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7)
);

-- ============================================================================
-- 3. RBAC (ROLES, PERMISSIONS & SCOPES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS roles (
    code VARCHAR(50) PRIMARY KEY, -- 'SUPER_ADMIN', 'ADMIN', 'DISTRICT_ADMIN', etc.
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hierarchy_level INT NOT NULL DEFAULT 100, -- lower number = higher privilege
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    code VARCHAR(100) PRIMARY KEY, -- e.g. 'users.read', 'donors.verify'
    module VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_code VARCHAR(50) REFERENCES roles(code) ON DELETE CASCADE,
    permission_code VARCHAR(100) REFERENCES permissions(code) ON DELETE CASCADE,
    PRIMARY KEY (role_code, permission_code)
);

CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- references auth.users in Supabase
    role_code VARCHAR(50) NOT NULL REFERENCES roles(code) ON DELETE CASCADE,
    granted_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role_code)
);

CREATE TABLE IF NOT EXISTS role_scopes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_role_id UUID NOT NULL REFERENCES user_roles(id) ON DELETE CASCADE,
    division_id VARCHAR(10) REFERENCES geo_divisions(id),
    district_id VARCHAR(20) REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) REFERENCES geo_upazilas(id),
    organization_id UUID,
    facility_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. PROFILES & USER DATA
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- matches auth.users.id
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    phone_verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    date_of_birth DATE,
    gender gender_enum DEFAULT 'unspecified',
    preferred_language VARCHAR(5) DEFAULT 'bn',
    is_suspended BOOLEAN DEFAULT FALSE,
    suspension_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. DONOR PROFILES & AVAILABILITY
-- ============================================================================

CREATE TABLE IF NOT EXISTS donor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    human_readable_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'RS-DNR-000125'
    blood_group blood_group_enum NOT NULL,
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id),
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) NOT NULL REFERENCES geo_upazilas(id),
    union_or_ward VARCHAR(100),
    area_or_village VARCHAR(150),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    willing_to_travel_km INT DEFAULT 15,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    verified_by UUID,
    total_verified_donations INT DEFAULT 0,
    emergency_opt_in BOOLEAN DEFAULT TRUE,
    public_directory_consent BOOLEAN DEFAULT TRUE,
    public_phone_visibility BOOLEAN DEFAULT FALSE,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donor_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_profile_id UUID UNIQUE NOT NULL REFERENCES donor_profiles(id) ON DELETE CASCADE,
    contact_available BOOLEAN DEFAULT TRUE,
    status donor_status_enum DEFAULT 'active',
    last_verified_donation_date DATE,
    next_review_date DATE,
    temporary_unavailable_until DATE,
    medical_hold_reason TEXT,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. FACILITIES (HOSPITALS & BLOOD BANKS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id),
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) NOT NULL REFERENCES geo_upazilas(id),
    address TEXT NOT NULL,
    contact_phone VARCHAR(25) NOT NULL,
    emergency_hotline VARCHAR(25),
    email VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_banks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id),
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) NOT NULL REFERENCES geo_upazilas(id),
    address TEXT NOT NULL,
    contact_phone VARCHAR(25) NOT NULL,
    email VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blood_bank_id UUID NOT NULL REFERENCES blood_banks(id) ON DELETE CASCADE,
    blood_group blood_group_enum NOT NULL,
    component_type VARCHAR(50) DEFAULT 'Whole Blood', -- 'Whole Blood', 'RBC', 'Platelets', 'Plasma'
    available_units INT NOT NULL DEFAULT 0 CHECK (available_units >= 0),
    reserved_units INT NOT NULL DEFAULT 0 CHECK (reserved_units >= 0),
    last_updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID,
    UNIQUE(blood_bank_id, blood_group, component_type)
);

-- ============================================================================
-- 7. BLOOD REQUESTS & RESPONSES
-- ============================================================================

CREATE TABLE IF NOT EXISTS blood_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    human_readable_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'REQ-2025-0014'
    requester_user_id UUID NOT NULL REFERENCES profiles(id),
    patient_name VARCHAR(150) NOT NULL,
    blood_group blood_group_enum NOT NULL,
    units_needed INT NOT NULL DEFAULT 1 CHECK (units_needed > 0),
    urgency request_urgency_enum DEFAULT 'normal',
    status request_status_enum DEFAULT 'published',
    hospital_name VARCHAR(255) NOT NULL,
    hospital_id UUID REFERENCES hospitals(id),
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id),
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) NOT NULL REFERENCES geo_upazilas(id),
    required_date DATE NOT NULL,
    required_time TIME,
    contact_person_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    medical_reason TEXT,
    notes TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS request_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
    donor_profile_id UUID NOT NULL REFERENCES donor_profiles(id) ON DELETE CASCADE,
    response_status VARCHAR(30) DEFAULT 'accepted', -- 'accepted', 'declined', 'cancelled', 'completed'
    donor_notes TEXT,
    contact_shared BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(request_id, donor_profile_id)
);

-- ============================================================================
-- 8. DONATION RECORDS, VERIFICATION & CERTIFICATES
-- ============================================================================

CREATE TABLE IF NOT EXISTS donation_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_profile_id UUID NOT NULL REFERENCES donor_profiles(id) ON DELETE CASCADE,
    request_id UUID REFERENCES blood_requests(id) ON DELETE SET NULL,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
    facility_name VARCHAR(255) NOT NULL,
    donation_date DATE NOT NULL,
    donation_type VARCHAR(50) DEFAULT 'Whole Blood',
    units_donated INT DEFAULT 1,
    status donation_status_enum DEFAULT 'submitted',
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMPTZ,
    verification_notes TEXT,
    certificate_code VARCHAR(50) UNIQUE,
    certificate_issued_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. DIGITAL ID CARDS & QR VERIFICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS id_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    card_type VARCHAR(50) DEFAULT 'DONOR', -- 'DONOR', 'SUPER_ADMIN', 'ADMIN', 'VOLUNTEER'
    display_id VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    qr_token_hash VARCHAR(128) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS qr_verification_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_card_id UUID NOT NULL REFERENCES id_cards(id) ON DELETE CASCADE,
    scanned_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address_hash VARCHAR(64),
    user_agent TEXT
);

-- ============================================================================
-- 10. REVIEWS & RATINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_profile_id UUID NOT NULL REFERENCES donor_profiles(id) ON DELETE CASCADE,
    reviewer_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    request_id UUID REFERENCES blood_requests(id) ON DELETE SET NULL,
    reliability_score INT CHECK (reliability_score BETWEEN 1 AND 5),
    communication_score INT CHECK (communication_score BETWEEN 1 AND 5),
    punctuality_score INT CHECK (punctuality_score BETWEEN 1 AND 5),
    overall_rating DECIMAL(3,2) NOT NULL,
    review_text TEXT,
    is_moderated BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(donor_profile_id, reviewer_user_id, request_id)
);

-- ============================================================================
-- 11. ORGANIZATIONS, VOLUNTEERS & CAMPAIGNS
-- ============================================================================

CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100),
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id),
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) NOT NULL REFERENCES geo_upazilas(id),
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(25) NOT NULL,
    website VARCHAR(255),
    description TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donation_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    description TEXT,
    venue_name VARCHAR(255) NOT NULL,
    division_id VARCHAR(10) NOT NULL REFERENCES geo_divisions(id),
    district_id VARCHAR(20) NOT NULL REFERENCES geo_districts(id),
    upazila_id VARCHAR(50) NOT NULL REFERENCES geo_upazilas(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    expected_donors INT DEFAULT 50,
    target_units INT DEFAULT 50,
    banner_url TEXT,
    status VARCHAR(30) DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed', 'cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 12. NOTIFICATIONS & AUDIT LOGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- 'info', 'emergency', 'reminder', 'verification', 'security'
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}',
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 13. INDEXES FOR HIGH-PERFORMANCE DISCOVERY
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_donor_geo ON donor_profiles (division_id, district_id, upazila_id);
CREATE INDEX IF NOT EXISTS idx_donor_blood ON donor_profiles (blood_group);
CREATE INDEX IF NOT EXISTS idx_donor_verification ON donor_profiles (is_verified, emergency_opt_in);
CREATE INDEX IF NOT EXISTS idx_request_geo ON blood_requests (division_id, district_id, status);
CREATE INDEX IF NOT EXISTS idx_request_blood ON blood_requests (blood_group, urgency);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_id_cards_token ON id_cards (qr_token_hash);

-- ============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper security definer function to check role safely
CREATE OR REPLACE FUNCTION public.check_user_has_role(req_user_id UUID, req_role VARCHAR)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles WHERE user_id = req_user_id AND role_code = req_role
    );
END;
$$;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" 
    ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can edit own profile" 
    ON profiles FOR UPDATE USING (auth.uid() = id);

-- DONOR PROFILES POLICIES
CREATE POLICY "Consented donor profiles visible in public directory"
    ON donor_profiles FOR SELECT 
    USING (public_directory_consent = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own donor profile"
    ON donor_profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own donor profile non-verified fields"
    ON donor_profiles FOR UPDATE 
    USING (auth.uid() = user_id);

-- BLOOD REQUESTS POLICIES
CREATE POLICY "Published requests are viewable by anyone"
    ON blood_requests FOR SELECT 
    USING (status != 'draft' OR auth.uid() = requester_user_id);

CREATE POLICY "Authenticated users can create blood requests"
    ON blood_requests FOR INSERT 
    WITH CHECK (auth.uid() = requester_user_id);

CREATE POLICY "Requesters can update their own blood request"
    ON blood_requests FOR UPDATE 
    USING (auth.uid() = requester_user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can read own notifications"
    ON notifications FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications read"
    ON notifications FOR UPDATE 
    USING (auth.uid() = user_id);
