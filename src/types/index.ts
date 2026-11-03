export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'DISTRICT_ADMIN'
  | 'UPAZILA_COORDINATOR'
  | 'ORGANIZATION_ADMIN'
  | 'HOSPITAL_ADMIN'
  | 'BLOOD_BANK_ADMIN'
  | 'VOLUNTEER'
  | 'DONOR'
  | 'RECIPIENT'
  | 'NORMAL_USER';

export type RequestUrgency = 'normal' | 'urgent' | 'critical_emergency';

export type RequestStatus =
  | 'draft'
  | 'pending_review'
  | 'published'
  | 'searching'
  | 'donor_responded'
  | 'donor_confirmed'
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'expired'
  | 'rejected';

export type DonationStatus =
  | 'draft'
  | 'submitted'
  | 'pending_verification'
  | 'verified'
  | 'rejected'
  | 'disputed'
  | 'cancelled';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'unspecified';
  roles: UserRole[];
  currentRole: UserRole;
  isSuspended: boolean;
  createdAt: string;
}

export interface DonorProfile {
  id: string;
  userId: string;
  humanReadableId: string; // e.g. RS-DNR-000125
  fullName: string;
  phone: string;
  bloodGroup: BloodGroup;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  unionOrWard?: string;
  areaOrVillage?: string;
  lat: number;
  lng: number;
  isVerified: boolean;
  totalVerifiedDonations: number;
  contactAvailable: boolean;
  emergencyOptIn: boolean;
  publicDirectoryConsent: boolean;
  publicPhoneVisibility: boolean;
  lastDonationDate?: string;
  nextReviewDate?: string;
  rating: number;
  reviewCount: number;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  humanReadableId: string; // e.g. REQ-2025-0014
  requesterUserId: string;
  requesterName: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  urgency: RequestUrgency;
  status: RequestStatus;
  hospitalName: string;
  hospitalId?: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  requiredDate: string;
  requiredTime?: string;
  contactPersonName: string;
  contactPhone: string;
  alternatePhone?: string;
  medicalReason?: string;
  notes?: string;
  expiresAt: string;
  createdAt: string;
  responsesCount?: number;
}

export interface RequestResponse {
  id: string;
  requestId: string;
  donorProfileId: string;
  donorName: string;
  donorBloodGroup: BloodGroup;
  donorPhone: string;
  status: 'accepted' | 'declined' | 'cancelled' | 'completed';
  donorNotes?: string;
  contactShared: boolean;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  donorProfileId: string;
  donorName: string;
  requestId?: string;
  hospitalName: string;
  donationDate: string;
  donationType: string;
  unitsDonated: number;
  status: DonationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  certificateCode?: string;
  createdAt: string;
}

export interface IdCardData {
  id: string;
  userId: string;
  holderName: string;
  displayId: string; // e.g. RS-DNR-000125 or RS-ADM-000001
  bloodGroup?: BloodGroup;
  role: UserRole;
  issueDate: string;
  isActive: boolean;
  isVerified: boolean;
  avatarUrl?: string;
  qrToken: string;
  donationsCount?: number;
}

export interface RatingReview {
  id: string;
  donorProfileId: string;
  reviewerUserId: string;
  reviewerName: string;
  requestId?: string;
  reliabilityScore: number;
  communicationScore: number;
  punctualityScore: number;
  overallRating: number;
  reviewText: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Hospital {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  address: string;
  contactPhone: string;
  emergencyHotline?: string;
  email?: string;
  lat: number;
  lng: number;
  isVerified: boolean;
  isActive: boolean;
  totalRequestsHandled: number;
}

export interface BloodBank {
  id: string;
  hospitalId?: string;
  nameEn: string;
  nameBn: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  address: string;
  contactPhone: string;
  email?: string;
  lat: number;
  lng: number;
  isVerified: boolean;
  isActive: boolean;
  stockSummary: Record<BloodGroup, number>;
}

export interface Organization {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  description: string;
  logoUrl?: string;
  isVerified: boolean;
  totalDonationCamps: number;
  volunteerCount: number;
}

export interface DonationCampaign {
  id: string;
  organizationId?: string;
  organizationName: string;
  titleEn: string;
  titleBn: string;
  venueName: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  startDate: string;
  endDate: string;
  targetUnits: number;
  collectedUnits: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  bannerUrl?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'emergency' | 'reminder' | 'verification' | 'security';
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface SystemMetrics {
  totalUsers: number;
  registeredDonors: number;
  verifiedDonors: number;
  totalDonations: number;
  activeBloodRequests: number;
  hospitalsAndBanks: number;
  organizations: number;
  bloodGroupDistribution: {
    bloodGroup: BloodGroup;
    count: number;
    percentage: number;
  }[];
}
