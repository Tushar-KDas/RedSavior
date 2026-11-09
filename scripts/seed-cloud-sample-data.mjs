import fs from 'fs';
import path from 'path';

// Read from .env.local
const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const getEnvVar = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim() : process.env[key] || '';
};

const url = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const secret = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

const headers = {
  apikey: secret,
  Authorization: `Bearer ${secret}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation,resolution=merge-duplicates',
};

async function postData(endpoint, data) {
  const res = await fetch(`${url}/rest/v1/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error(`Error inserting into ${endpoint} (${res.status}):`, errText);
    return null;
  }
  return await res.json();
}

async function main() {
  console.log('Seeding initial production data to live Supabase cloud...');

  // 1. Roles (11 Roles)
  const roles = [
    { code: 'SUPER_ADMIN', name: 'Super Administrator', hierarchy_level: 1 },
    { code: 'ADMIN', name: 'System Administrator', hierarchy_level: 10 },
    { code: 'DISTRICT_ADMIN', name: 'District Administrator', hierarchy_level: 20 },
    { code: 'UPAZILA_COORDINATOR', name: 'Upazila Coordinator', hierarchy_level: 30 },
    { code: 'ORGANIZATION_ADMIN', name: 'Organization Admin', hierarchy_level: 40 },
    { code: 'HOSPITAL_ADMIN', name: 'Hospital Administrator', hierarchy_level: 50 },
    { code: 'BLOOD_BANK_ADMIN', name: 'Blood Bank Administrator', hierarchy_level: 60 },
    { code: 'VOLUNTEER', name: 'Verified Volunteer', hierarchy_level: 70 },
    { code: 'DONOR', name: 'Voluntary Blood Donor', hierarchy_level: 80 },
    { code: 'RECIPIENT', name: 'Blood Recipient / Patient', hierarchy_level: 90 },
    { code: 'NORMAL_USER', name: 'Registered User', hierarchy_level: 100 },
  ];
  await postData('roles', roles);
  console.log('✓ 11 Platform Roles seeded.');

  // 2. Profiles (Users)
  const profiles = [
    {
      id: 'a0000000-0000-0000-0000-000000000001',
      email: 'admin@redsavior.org',
      full_name: 'Rahim Ahmed',
      phone: '+8801711000001',
      phone_verified: true,
      email_verified: true,
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      preferred_language: 'bn',
      is_suspended: false,
    },
    {
      id: 'a0000000-0000-0000-0000-000000000002',
      email: 'ayesha.akter@gmail.com',
      full_name: 'Ayesha Akter',
      phone: '+8801812000002',
      phone_verified: true,
      email_verified: true,
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      preferred_language: 'bn',
      is_suspended: false,
    },
    {
      id: 'a0000000-0000-0000-0000-000000000003',
      email: 'tanvir.hasan@yahoo.com',
      full_name: 'Tanvir Hasan',
      phone: '+8801913000003',
      phone_verified: true,
      email_verified: true,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      preferred_language: 'bn',
      is_suspended: false,
    },
    {
      id: 'a0000000-0000-0000-0000-000000000004',
      email: 'dmch.admin@redsavior.org',
      full_name: 'Dr. Kamal Hossain',
      phone: '+8801714000004',
      phone_verified: true,
      email_verified: true,
      avatar_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150',
      preferred_language: 'bn',
      is_suspended: false,
    },
  ];
  await postData('profiles', profiles);
  console.log('✓ 4 Profiles seeded.');

  // 3. User Roles
  const userRoles = [
    { user_id: 'a0000000-0000-0000-0000-000000000001', role_code: 'SUPER_ADMIN' },
    { user_id: 'a0000000-0000-0000-0000-000000000001', role_code: 'DONOR' },
    { user_id: 'a0000000-0000-0000-0000-000000000002', role_code: 'DONOR' },
    { user_id: 'a0000000-0000-0000-0000-000000000003', role_code: 'DONOR' },
    { user_id: 'a0000000-0000-0000-0000-000000000004', role_code: 'HOSPITAL_ADMIN' },
  ];
  await postData('user_roles', userRoles);
  console.log('✓ User Roles linked.');

  // 4. Donor Profiles
  const donorProfiles = [
    {
      id: 'b0000000-0000-0000-0000-000000000001',
      user_id: 'a0000000-0000-0000-0000-000000000001',
      human_readable_id: 'RS-DNR-000125',
      blood_group: 'O+',
      division_id: 'DHAKA',
      district_id: 'dhaka',
      upazila_id: 'dhanmondi',
      union_or_ward: 'Ward 15',
      area_or_village: 'Road 8A, Dhanmondi',
      latitude: 23.7461,
      longitude: 90.3742,
      is_verified: true,
      total_verified_donations: 25,
      emergency_opt_in: true,
      public_directory_consent: true,
      public_phone_visibility: false,
      bio: 'Regular voluntary blood donor since 2018. Always ready for emergencies in Dhaka area.',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000002',
      user_id: 'a0000000-0000-0000-0000-000000000002',
      human_readable_id: 'RS-DNR-000126',
      blood_group: 'A+',
      division_id: 'DHAKA',
      district_id: 'dhaka',
      upazila_id: 'mirpur',
      union_or_ward: 'Section 10',
      area_or_village: 'Mirpur, Dhaka',
      latitude: 23.8067,
      longitude: 90.3683,
      is_verified: true,
      total_verified_donations: 20,
      emergency_opt_in: true,
      public_directory_consent: true,
      public_phone_visibility: false,
      bio: 'Ready to donate A+ blood in Mirpur and surrounding areas.',
    },
    {
      id: 'b0000000-0000-0000-0000-000000000003',
      user_id: 'a0000000-0000-0000-0000-000000000003',
      human_readable_id: 'RS-DNR-000127',
      blood_group: 'B+',
      division_id: 'CTG',
      district_id: 'chattogram',
      upazila_id: 'kotwali_ctg',
      union_or_ward: 'Anderkilla',
      area_or_village: 'Kotwali, Chattogram',
      latitude: 22.3384,
      longitude: 91.8317,
      is_verified: true,
      total_verified_donations: 18,
      emergency_opt_in: true,
      public_directory_consent: true,
      public_phone_visibility: false,
      bio: 'Chattogram city voluntary lifesaver. Available for thalassemia children.',
    },
  ];
  await postData('donor_profiles', donorProfiles);
  console.log('✓ 3 Donor Profiles seeded.');

  // 5. Donor Availability
  const donorAvailability = [
    { donor_profile_id: 'b0000000-0000-0000-0000-000000000001', contact_available: true, status: 'active', last_verified_donation_date: '2024-08-10' },
    { donor_profile_id: 'b0000000-0000-0000-0000-000000000002', contact_available: true, status: 'active', last_verified_donation_date: '2024-07-20' },
    { donor_profile_id: 'b0000000-0000-0000-0000-000000000003', contact_available: true, status: 'active', last_verified_donation_date: '2024-09-01' },
  ];
  await postData('donor_availability', donorAvailability);
  console.log('✓ Donor Availability state seeded.');

  // 6. Hospitals
  const hospitals = [
    {
      id: 'c0000000-0000-0000-0000-000000000001',
      name_en: 'Dhaka Medical College Hospital (DMCH)',
      name_bn: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
      division_id: 'DHAKA',
      district_id: 'dhaka',
      upazila_id: 'dhanmondi',
      address: 'Secretariat Road, Ramna, Dhaka 1000',
      contact_phone: '+880255165088',
      emergency_hotline: '+8801711223344',
      email: 'info@dmch.gov.bd',
      latitude: 23.7258,
      longitude: 90.3976,
      is_verified: true,
      is_active: true,
    },
    {
      id: 'c0000000-0000-0000-0000-000000000002',
      name_en: 'Chittagong Medical College Hospital (CMCH)',
      name_bn: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল',
      division_id: 'CTG',
      district_id: 'chattogram',
      upazila_id: 'kotwali_ctg',
      address: '57 K.B. Fazlul Kader Road, Chattogram',
      contact_phone: '+88031619400',
      emergency_hotline: '+8801819556677',
      email: 'director@cmch.gov.bd',
      latitude: 22.3592,
      longitude: 91.8286,
      is_verified: true,
      is_active: true,
    },
  ];
  await postData('hospitals', hospitals);
  console.log('✓ 2 Major Medical College Hospitals seeded.');

  // 7. Blood Requests
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const requests = [
    {
      id: 'd0000000-0000-0000-0000-000000000001',
      human_readable_id: 'REQ-2025-0014',
      requester_user_id: 'a0000000-0000-0000-0000-000000000001',
      patient_name: 'Rina Begum',
      blood_group: 'B+',
      units_needed: 2,
      urgency: 'critical_emergency',
      status: 'searching',
      hospital_name: 'Dhaka Medical College Hospital (DMCH)',
      hospital_id: 'c0000000-0000-0000-0000-000000000001',
      division_id: 'DHAKA',
      district_id: 'dhaka',
      upazila_id: 'dhanmondi',
      required_date: '2025-05-01',
      contact_person_name: 'Mohammad Ali (Brother)',
      contact_phone: '+8801712998877',
      medical_reason: 'Emergency Caesarean Delivery with severe hemorrhage',
      expires_at: expiresAt,
    },
    {
      id: 'd0000000-0000-0000-0000-000000000002',
      human_readable_id: 'REQ-2025-0015',
      requester_user_id: 'a0000000-0000-0000-0000-000000000002',
      patient_name: 'Shakil Ahmed',
      blood_group: 'O-',
      units_needed: 1,
      urgency: 'urgent',
      status: 'searching',
      hospital_name: 'Chittagong Medical College Hospital (CMCH)',
      hospital_id: 'c0000000-0000-0000-0000-000000000002',
      division_id: 'CTG',
      district_id: 'chattogram',
      upazila_id: 'kotwali_ctg',
      required_date: '2025-05-02',
      contact_person_name: 'Dr. Kamal Hossain',
      contact_phone: '+8801811445566',
      medical_reason: 'Major road traffic accident surgery',
      expires_at: expiresAt,
    },
  ];
  await postData('blood_requests', requests);
  console.log('✓ 2 Emergency Blood Requests seeded.');

  // 8. Digital ID Cards
  const idCards = [
    {
      id: 'e0000000-0000-0000-0000-000000000001',
      user_id: 'a0000000-0000-0000-0000-000000000001',
      card_type: 'SUPER_ADMIN',
      display_id: 'RS-DNR-000125',
      issue_date: '2024-01-01',
      is_active: true,
      qr_token_hash: 'rs_qr_tok_rahim_ahmed_o_plus_98f41e',
    },
    {
      id: 'e0000000-0000-0000-0000-000000000002',
      user_id: 'a0000000-0000-0000-0000-000000000002',
      card_type: 'DONOR',
      display_id: 'RS-DNR-000126',
      issue_date: '2024-02-15',
      is_active: true,
      qr_token_hash: 'rs_qr_tok_ayesha_akter_a_plus_77c22a',
    },
  ];
  await postData('id_cards', idCards);
  console.log('✓ 2 Digital ID Cards with QR Tokens seeded.');

  console.log('\n==================================================');
  console.log('🎉 Production Cloud Seeding Complete!');
  console.log('==================================================');
}

main().catch(console.error);
