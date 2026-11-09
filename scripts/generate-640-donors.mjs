import fs from 'fs';
import path from 'path';

const geoContent = fs.readFileSync(path.join(process.cwd(), 'src/data/bangladesh-geo.ts'), 'utf8');

// Parse DISTRICTS section
const districtSection = geoContent.slice(geoContent.indexOf('export const DISTRICTS'), geoContent.indexOf('export const UPAZILAS'));
const lines = districtSection.split('\n').filter(l => l.includes('divisionId:'));

const districts = lines.map(line => {
  const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  const divMatch = line.match(/divisionId:\s*['"]([^'"]+)['"]/);
  const nameEnMatch = line.match(/nameEn:\s*(?:"([^"]+)"|'([^']+)')/);
  const nameBnMatch = line.match(/nameBn:\s*['"]([^'"]+)['"]/);
  const latMatch = line.match(/lat:\s*([0-9.]+)/);
  const lngMatch = line.match(/lng:\s*([0-9.]+)/);

  return {
    id: idMatch[1],
    divisionId: divMatch[1],
    nameEn: nameEnMatch[1] || nameEnMatch[2],
    nameBn: nameBnMatch[1],
    lat: parseFloat(latMatch[1]),
    lng: parseFloat(lngMatch[1]),
  };
});

console.log(`Successfully parsed all ${districts.length} districts!`);

const MALE_FIRST_NAMES = [
  "Md. Rahim", "Tanvir", "Kamrul", "Sabbir", "Mehedi", "Zahid", "Mahfuzur", "Arifur", 
  "Shahriar", "Rashedul", "Nasir", "Ashiqur", "Imtiaz", "Faisal", "Tareq", "Saiful", 
  "Nazmul", "Mustafizur", "Shakib", "Tamim", "Anisur", "Tariqul", "Shafiqul", "Enamul", 
  "Mizanur", "Monir", "Habibur", "Abdur", "Sohag", "Biplob", "Al-Amin", "Khaled"
];

const FEMALE_FIRST_NAMES = [
  "Ayesha", "Sadia", "Nusrat", "Fatema", "Farzana", "Sumaiya", "Tanjina", "Tasnim", 
  "Sharmin", "Jannatul", "Rima", "Salma", "Afroza", "Mahmuda", "Fahmida", "Naznin", 
  "Umme Kulsum", "Dilruba", "Rumana", "Shirin"
];

const LAST_NAMES = [
  "Ahmed", "Hasan", "Islam", "Hossain", "Rahman", "Chowdhury", "Khan", "Uddin", 
  "Sarder", "Bhuiyan", "Talukder", "Miah", "Ali", "Mollah", "Sikder", "Kazi", "Majumder"
];

const BLOOD_GROUPS = ["O+", "A+", "B+", "O+", "A+", "B+", "AB+", "O-", "A-", "B-"];

const MALE_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
];

const FEMALE_AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
];

const LOCAL_AREAS = [
  "College Road", "Station Road", "Hospital Road", "Court Road", "Bazaar Road", 
  "Thana Road", "Sadar Road", "Upazila Complex", "Shahid Minar Road", "Jail Road"
];

const donors = [];
const users = [];

let donorCounter = 1001;

for (let dIndex = 0; dIndex < districts.length; dIndex++) {
  const dist = districts[dIndex];
  
  for (let i = 0; i < 10; i++) {
    const isFemale = i % 3 === 0;
    const firstName = isFemale 
      ? FEMALE_FIRST_NAMES[(dIndex * 3 + i) % FEMALE_FIRST_NAMES.length]
      : MALE_FIRST_NAMES[(dIndex * 5 + i) % MALE_FIRST_NAMES.length];
    const lastName = LAST_NAMES[(dIndex * 2 + i) % LAST_NAMES.length];
    const fullName = `${firstName} ${lastName}`;
    
    const bloodGroup = BLOOD_GROUPS[i % BLOOD_GROUPS.length];
    const donorId = `RS-DNR-${String(donorCounter).padStart(6, '0')}`;
    const userId = `usr-dnr-${dist.id}-${i + 1}`;
    
    const operator = ['017', '018', '019', '016', '015', '013'][(dIndex + i) % 6];
    const phonePart = String(1000000 + (dIndex * 153 + i * 37) % 8999999).padStart(7, '0');
    const phone = `+88${operator}${phonePart}`;
    
    const cleanName = firstName.toLowerCase().replace(/[^a-z]/g, '') + '.' + lastName.toLowerCase().replace(/[^a-z]/g, '');
    const loginEmail = `${cleanName}.${dist.id}@redsavior.org`;
    const loginPassword = `RS#Donor${2026 + (i % 3)}!`;
    
    const avatar = isFemale
      ? FEMALE_AVATARS[i % FEMALE_AVATARS.length]
      : MALE_AVATARS[i % MALE_AVATARS.length];

    const latOffset = ((i * 13) % 20 - 10) * 0.005;
    const lngOffset = ((i * 17) % 20 - 10) * 0.005;
    const lat = Number((dist.lat + latOffset).toFixed(4));
    const lng = Number((dist.lng + lngOffset).toFixed(4));

    const totalDonations = 1 + ((dIndex * 7 + i * 3) % 24);
    const monthsAgo = (i % 6) + 1;
    const lastDate = new Date();
    lastDate.setMonth(lastDate.getMonth() - monthsAgo);
    const lastDonationDate = lastDate.toISOString().split('T')[0];
    
    const area = LOCAL_AREAS[i % LOCAL_AREAS.length];
    const upazila = `${dist.id}_sadar`;

    donors.push({
      id: `dnr-${dist.id}-${String(i + 1).padStart(2, '0')}`,
      userId,
      humanReadableId: donorId,
      fullName,
      phone,
      bloodGroup,
      divisionId: dist.divisionId,
      districtId: dist.id,
      upazilaId: upazila,
      unionOrWard: `Ward ${(i % 9) + 1}`,
      areaOrVillage: `${area}, ${dist.nameEn}`,
      lat,
      lng,
      isVerified: true,
      totalVerifiedDonations: totalDonations,
      contactAvailable: true,
      emergencyOptIn: true,
      publicDirectoryConsent: true,
      publicPhoneVisibility: i % 2 === 0,
      lastDonationDate,
      nextReviewDate: '2026-12-31',
      rating: Number((4.7 + (i % 4) * 0.1).toFixed(1)),
      reviewCount: 3 + (i % 15),
      bio: `Voluntary blood donor from ${dist.nameEn} (${dist.nameBn}). Committed to emergency blood response for thalassemia and critical patients.`,
      avatarUrl: avatar,
      loginEmail,
      loginPassword,
      createdAt: '2024-01-15T00:00:00Z',
    });

    users.push({
      id: userId,
      email: loginEmail,
      fullName,
      phone,
      phoneVerified: true,
      emailVerified: true,
      avatarUrl: avatar,
      roles: ['DONOR', 'NORMAL_USER'],
      currentRole: 'DONOR',
      isSuspended: false,
      createdAt: '2024-01-15T00:00:00Z',
    });

    donorCounter++;
  }
}

console.log(`Generated ${donors.length} donors across ${districts.length} districts.`);

const fileContent = `// Master Seed Data for 64 Districts Nationwide Blood Donors (Minimum 10 per District)
// Generated automatically with genuine Bangladeshi names, local geography, and login credentials.

import { DonorProfile, UserProfile } from "@/types";

export const MASTER_64_DISTRICT_DONORS: DonorProfile[] = ${JSON.stringify(donors, null, 2)};

export const MASTER_DONOR_USERS: UserProfile[] = ${JSON.stringify(users, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/master-donors-seed.ts'), fileContent, 'utf8');
console.log('Successfully wrote src/data/master-donors-seed.ts!');
