export interface GeoDivision {
  id: string;
  nameEn: string;
  nameBn: string;
  lat: number;
  lng: number;
}

export interface GeoDistrict {
  id: string;
  divisionId: string;
  nameEn: string;
  nameBn: string;
  lat: number;
  lng: number;
}

export interface GeoUpazila {
  id: string;
  districtId: string;
  nameEn: string;
  nameBn: string;
  lat: number;
  lng: number;
}

export const DIVISIONS: GeoDivision[] = [
  { id: 'DHAKA', nameEn: 'Dhaka', nameBn: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  { id: 'CTG', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832 },
  { id: 'RAJ', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', lat: 24.3745, lng: 88.6042 },
  { id: 'KHULNA', nameEn: 'Khulna', nameBn: 'খুলনা', lat: 22.8456, lng: 89.5403 },
  { id: 'BARISHAL', nameEn: 'Barishal', nameBn: 'বরিশাল', lat: 22.7010, lng: 90.3535 },
  { id: 'SYLHET', nameEn: 'Sylhet', nameBn: 'সিলেট', lat: 24.8949, lng: 91.8687 },
  { id: 'RANGPUR', nameEn: 'Rangpur', nameBn: 'রংপুর', lat: 25.7439, lng: 89.2752 },
  { id: 'MYM', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203 },
];

export const DISTRICTS: GeoDistrict[] = [
  // Dhaka Division
  { id: 'dhaka', divisionId: 'DHAKA', nameEn: 'Dhaka', nameBn: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  { id: 'gazipur', divisionId: 'DHAKA', nameEn: 'Gazipur', nameBn: 'গাজীপুর', lat: 24.0023, lng: 90.4264 },
  { id: 'narayanganj', divisionId: 'DHAKA', nameEn: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ', lat: 23.6238, lng: 90.5000 },
  { id: 'tangail', divisionId: 'DHAKA', nameEn: 'Tangail', nameBn: 'টাঙ্গাইল', lat: 24.2513, lng: 89.9167 },
  { id: 'faridpur', divisionId: 'DHAKA', nameEn: 'Faridpur', nameBn: 'ফরিদপুর', lat: 23.6071, lng: 89.8429 },
  { id: 'manikganj', divisionId: 'DHAKA', nameEn: 'Manikganj', nameBn: 'মানিকগঞ্জ', lat: 23.8617, lng: 90.0003 },
  { id: 'munshiganj', divisionId: 'DHAKA', nameEn: 'Munshiganj', nameBn: 'মুন্সীগঞ্জ', lat: 23.5422, lng: 90.5305 },
  { id: 'narsingdi', divisionId: 'DHAKA', nameEn: 'Narsingdi', nameBn: 'নরসিংদী', lat: 23.9322, lng: 90.7154 },
  { id: 'gopalganj', divisionId: 'DHAKA', nameEn: 'Gopalganj', nameBn: 'গোপালগঞ্জ', lat: 23.0051, lng: 89.8266 },
  { id: 'kishoreganj', divisionId: 'DHAKA', nameEn: 'Kishoreganj', nameBn: 'কিশোরগঞ্জ', lat: 24.4449, lng: 90.7766 },
  { id: 'madaripur', divisionId: 'DHAKA', nameEn: 'Madaripur', nameBn: 'মাদারীপুর', lat: 23.1641, lng: 90.1897 },
  { id: 'rajbari', divisionId: 'DHAKA', nameEn: 'Rajbari', nameBn: 'রাজবাড়ী', lat: 23.7574, lng: 89.6445 },
  { id: 'shariatpur', divisionId: 'DHAKA', nameEn: 'Shariatpur', nameBn: 'শরীয়তপুর', lat: 23.2423, lng: 90.4348 },

  // Chattogram Division
  { id: 'chattogram', divisionId: 'CTG', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832 },
  { id: 'coxsbazar', divisionId: 'CTG', nameEn: "Cox's Bazar", nameBn: 'কক্সবাজার', lat: 21.4272, lng: 92.0058 },
  { id: 'cumilla', divisionId: 'CTG', nameEn: 'Cumilla', nameBn: 'কুমিল্লা', lat: 23.4607, lng: 91.1809 },
  { id: 'feni', divisionId: 'CTG', nameEn: 'Feni', nameBn: 'ফেনী', lat: 23.0186, lng: 91.3966 },
  { id: 'brahmanbaria', divisionId: 'CTG', nameEn: 'Brahmanbaria', nameBn: 'ব্রাহ্মণবাড়িয়া', lat: 23.9571, lng: 91.1119 },
  { id: 'chandpur', divisionId: 'CTG', nameEn: 'Chandpur', nameBn: 'চাঁদপুর', lat: 23.2333, lng: 90.6667 },
  { id: 'noakhali', divisionId: 'CTG', nameEn: 'Noakhali', nameBn: 'নোয়াখালী', lat: 22.8696, lng: 91.0994 },
  { id: 'lakshmipur', divisionId: 'CTG', nameEn: 'Lakshmipur', nameBn: 'লক্ষ্মীপুর', lat: 22.9425, lng: 90.8412 },
  { id: 'khagrachhari', divisionId: 'CTG', nameEn: 'Khagrachhari', nameBn: 'খাগড়াছড়ি', lat: 23.1193, lng: 91.9847 },
  { id: 'rangamati', divisionId: 'CTG', nameEn: 'Rangamati', nameBn: 'রাঙ্গামাটি', lat: 22.6533, lng: 92.1753 },
  { id: 'bandarban', divisionId: 'CTG', nameEn: 'Bandarban', nameBn: 'বান্দরবান', lat: 22.1953, lng: 92.2184 },

  // Rajshahi Division
  { id: 'rajshahi', divisionId: 'RAJ', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', lat: 24.3745, lng: 88.6042 },
  { id: 'bogura', divisionId: 'RAJ', nameEn: 'Bogura', nameBn: 'বগুড়া', lat: 24.8465, lng: 89.3777 },
  { id: 'pabna', divisionId: 'RAJ', nameEn: 'Pabna', nameBn: 'পাবনা', lat: 24.0064, lng: 89.2372 },
  { id: 'sirajganj', divisionId: 'RAJ', nameEn: 'Sirajganj', nameBn: 'সিরাজগঞ্জ', lat: 24.4534, lng: 89.7008 },
  { id: 'naogaon', divisionId: 'RAJ', nameEn: 'Naogaon', nameBn: 'নওগাঁ', lat: 24.8103, lng: 88.9416 },
  { id: 'natore', divisionId: 'RAJ', nameEn: 'Natore', nameBn: 'নাটোর', lat: 24.4206, lng: 88.9322 },
  { id: 'chapai_nawabganj', divisionId: 'RAJ', nameEn: 'Chapai Nawabganj', nameBn: 'চাঁপাইনবাবগঞ্জ', lat: 24.5965, lng: 88.2775 },
  { id: 'joypurhat', divisionId: 'RAJ', nameEn: 'Joypurhat', nameBn: 'জয়পুরহাট', lat: 25.1015, lng: 89.0270 },

  // Khulna Division
  { id: 'khulna', divisionId: 'KHULNA', nameEn: 'Khulna', nameBn: 'খুলনা', lat: 22.8456, lng: 89.5403 },
  { id: 'jashore', divisionId: 'KHULNA', nameEn: 'Jashore', nameBn: 'যশোর', lat: 23.1664, lng: 89.2137 },
  { id: 'kushtia', divisionId: 'KHULNA', nameEn: 'Kushtia', nameBn: 'কুষ্টিয়া', lat: 23.9013, lng: 89.1205 },
  { id: 'satkhira', divisionId: 'KHULNA', nameEn: 'Satkhira', nameBn: 'সাতক্ষীরা', lat: 22.7185, lng: 89.0705 },
  { id: 'bagerhat', divisionId: 'KHULNA', nameEn: 'Bagerhat', nameBn: 'বাগেরহাট', lat: 22.6516, lng: 89.7859 },
  { id: 'jhenaidah', divisionId: 'KHULNA', nameEn: 'Jhenaidah', nameBn: 'ঝিনাইদহ', lat: 23.5448, lng: 89.1539 },
  { id: 'chuadanga', divisionId: 'KHULNA', nameEn: 'Chuadanga', nameBn: 'চুয়াডাঙ্গা', lat: 23.6402, lng: 88.8418 },
  { id: 'magura', divisionId: 'KHULNA', nameEn: 'Magura', nameBn: 'মাগুরা', lat: 23.4873, lng: 89.4199 },
  { id: 'meherpur', divisionId: 'KHULNA', nameEn: 'Meherpur', nameBn: 'মেহেরপুর', lat: 23.7622, lng: 88.6318 },
  { id: 'narail', divisionId: 'KHULNA', nameEn: 'Narail', nameBn: 'নড়াইল', lat: 23.1725, lng: 89.5127 },

  // Sylhet Division
  { id: 'sylhet', divisionId: 'SYLHET', nameEn: 'Sylhet', nameBn: 'সিলেট', lat: 24.8949, lng: 91.8687 },
  { id: 'moulvibazar', divisionId: 'SYLHET', nameEn: 'Moulvibazar', nameBn: 'মৌলভীবাজার', lat: 24.4829, lng: 91.7774 },
  { id: 'habiganj', divisionId: 'SYLHET', nameEn: 'Habiganj', nameBn: 'হবিগঞ্জ', lat: 24.3749, lng: 91.4155 },
  { id: 'sunamganj', divisionId: 'SYLHET', nameEn: 'Sunamganj', nameBn: 'সুনামগঞ্জ', lat: 25.0658, lng: 91.3950 },

  // Barishal Division
  { id: 'barishal', divisionId: 'BARISHAL', nameEn: 'Barishal', nameBn: 'বরিশাল', lat: 22.7010, lng: 90.3535 },
  { id: 'patuakhali', divisionId: 'BARISHAL', nameEn: 'Patuakhali', nameBn: 'পটুয়াখালী', lat: 22.3596, lng: 90.3298 },
  { id: 'bhola', divisionId: 'BARISHAL', nameEn: 'Bhola', nameBn: 'ভোলা', lat: 22.6859, lng: 90.6481 },
  { id: 'pirojpur', divisionId: 'BARISHAL', nameEn: 'Pirojpur', nameBn: 'পিরোজপুর', lat: 22.5841, lng: 89.9720 },
  { id: 'barguna', divisionId: 'BARISHAL', nameEn: 'Barguna', nameBn: 'বরগুনা', lat: 22.1570, lng: 90.1256 },
  { id: 'jhalokati', divisionId: 'BARISHAL', nameEn: 'Jhalokati', nameBn: 'ঝালকাঠি', lat: 22.6406, lng: 90.1987 },

  // Rangpur Division
  { id: 'rangpur', divisionId: 'RANGPUR', nameEn: 'Rangpur', nameBn: 'রংপুর', lat: 25.7439, lng: 89.2752 },
  { id: 'dinajpur', divisionId: 'RANGPUR', nameEn: 'Dinajpur', nameBn: 'দিনাজপুর', lat: 25.6217, lng: 88.6355 },
  { id: 'kurigram', divisionId: 'RANGPUR', nameEn: 'Kurigram', nameBn: 'কুড়িগ্রাম', lat: 25.8054, lng: 89.6362 },
  { id: 'gaibandha', divisionId: 'RANGPUR', nameEn: 'Gaibandha', nameBn: 'গাইবান্ধা', lat: 25.3288, lng: 89.5407 },
  { id: 'nilphamari', divisionId: 'RANGPUR', nameEn: 'Nilphamari', nameBn: 'নীলফামারী', lat: 25.9318, lng: 88.8560 },
  { id: 'panchagarh', divisionId: 'RANGPUR', nameEn: 'Panchagarh', nameBn: 'পঞ্চগড়', lat: 26.3411, lng: 88.5542 },
  { id: 'thakurgaon', divisionId: 'RANGPUR', nameEn: 'Thakurgaon', nameBn: 'ঠাকুরগাঁও', lat: 26.0337, lng: 88.4617 },
  { id: 'lalmonirhat', divisionId: 'RANGPUR', nameEn: 'Lalmonirhat', nameBn: 'লালমনিরহাট', lat: 25.9923, lng: 89.2847 },

  // Mymensingh Division
  { id: 'mymensingh', divisionId: 'MYM', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', lat: 24.7471, lng: 90.4203 },
  { id: 'jamalpur', divisionId: 'MYM', nameEn: 'Jamalpur', nameBn: 'জামালপুর', lat: 24.9375, lng: 89.9378 },
  { id: 'netrokona', divisionId: 'MYM', nameEn: 'Netrokona', nameBn: 'নেত্রকোণা', lat: 24.8709, lng: 90.7279 },
  { id: 'sherpur', divisionId: 'MYM', nameEn: 'Sherpur', nameBn: 'শেরপুর', lat: 25.0205, lng: 90.0153 },
];

export const UPAZILAS: GeoUpazila[] = [
  // Dhaka District
  { id: 'dhanmondi', districtId: 'dhaka', nameEn: 'Dhanmondi', nameBn: 'ধানমন্ডি', lat: 23.7461, lng: 90.3742 },
  { id: 'mirpur', districtId: 'dhaka', nameEn: 'Mirpur', nameBn: 'মিরপুর', lat: 23.8041, lng: 90.3687 },
  { id: 'gulshan', districtId: 'dhaka', nameEn: 'Gulshan', nameBn: 'গুলশান', lat: 23.7925, lng: 90.4078 },
  { id: 'uttara', districtId: 'dhaka', nameEn: 'Uttara', nameBn: 'উত্তরা', lat: 23.8759, lng: 90.3795 },
  { id: 'motijheel', districtId: 'dhaka', nameEn: 'Motijheel', nameBn: 'মতিঝিল', lat: 23.7330, lng: 90.4172 },
  { id: 'savar', districtId: 'dhaka', nameEn: 'Savar', nameBn: 'সাভার', lat: 23.8583, lng: 90.2667 },
  { id: 'mohammadpur', districtId: 'dhaka', nameEn: 'Mohammadpur', nameBn: 'মোহাম্মদপুর', lat: 23.7658, lng: 90.3584 },
  { id: 'badda', districtId: 'dhaka', nameEn: 'Badda', nameBn: 'বাড্ডা', lat: 23.7805, lng: 90.4267 },
  { id: 'shahbagh', districtId: 'dhaka', nameEn: 'Shahbagh', nameBn: 'শাহবাগ', lat: 23.7389, lng: 90.3957 },
  { id: 'keraniganj', districtId: 'dhaka', nameEn: 'Keraniganj', nameBn: 'কেরানীগঞ্জ', lat: 23.6841, lng: 90.3117 },

  // Gazipur District
  { id: 'gazipur_sadar', districtId: 'gazipur', nameEn: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর', lat: 24.0023, lng: 90.4264 },
  { id: 'kaliakair', districtId: 'gazipur', nameEn: 'Kaliakair', nameBn: 'কালিয়াকৈর', lat: 24.0750, lng: 90.2167 },
  { id: 'tongia', districtId: 'gazipur', nameEn: 'Tongi', nameBn: 'টঙ্গী', lat: 23.8933, lng: 90.4031 },

  // Narayanganj District
  { id: 'narayanganj_sadar', districtId: 'narayanganj', nameEn: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর', lat: 23.6238, lng: 90.5000 },
  { id: 'sonargaon', districtId: 'narayanganj', nameEn: 'Sonargaon', nameBn: 'সোনারগাঁও', lat: 23.6472, lng: 90.6056 },
  { id: 'rupganj', districtId: 'narayanganj', nameEn: 'Rupganj', nameBn: 'রূপগঞ্জ', lat: 23.7944, lng: 90.5194 },

  // Chattogram District
  { id: 'panchlaish', districtId: 'chattogram', nameEn: 'Panchlaish', nameBn: 'পাঁচলাইশ', lat: 22.3684, lng: 91.8291 },
  { id: 'kotwali_ctg', districtId: 'chattogram', nameEn: 'Kotwali', nameBn: 'কোতোয়ালী', lat: 22.3384, lng: 91.8317 },
  { id: 'hathazari', districtId: 'chattogram', nameEn: 'Hathazari', nameBn: 'হাটহাজারী', lat: 22.5083, lng: 91.8083 },
  { id: 'halishahar', districtId: 'chattogram', nameEn: 'Halishahar', nameBn: 'হালিশহর', lat: 22.3167, lng: 91.7833 },
  { id: 'patenga', districtId: 'chattogram', nameEn: 'Patenga', nameBn: 'পতেঙ্গা', lat: 22.2500, lng: 91.7917 },

  // Sylhet District
  { id: 'sylhet_sadar', districtId: 'sylhet', nameEn: 'Sylhet Sadar', nameBn: 'সিলেট সদর', lat: 24.8949, lng: 91.8687 },
  { id: 'beanibazar', districtId: 'sylhet', nameEn: 'Beanibazar', nameBn: 'বিয়ানীবাজার', lat: 24.8250, lng: 92.1625 },
  { id: 'golapganj', districtId: 'sylhet', nameEn: 'Golapganj', nameBn: 'গোলাপগঞ্জ', lat: 24.8583, lng: 92.0250 },

  // Rajshahi District
  { id: 'boalia', districtId: 'rajshahi', nameEn: 'Boalia', nameBn: 'বোয়ালিয়া', lat: 24.3636, lng: 88.6000 },
  { id: 'rajpara', districtId: 'rajshahi', nameEn: 'Rajpara', nameBn: 'রাজপাড়া', lat: 24.3736, lng: 88.5800 },

  // Khulna District
  { id: 'khulna_sadar', districtId: 'khulna', nameEn: 'Khulna Sadar', nameBn: 'খুলনা সদর', lat: 22.8167, lng: 89.5500 },
  { id: 'sonadanga', districtId: 'khulna', nameEn: 'Sonadanga', nameBn: 'সোনাডাঙ্গা', lat: 22.8250, lng: 89.5333 },

  // Barishal District
  { id: 'barishal_sadar', districtId: 'barishal', nameEn: 'Barishal Sadar', nameBn: 'বরিশাল সদর', lat: 22.7010, lng: 90.3535 },

  // Rangpur District
  { id: 'rangpur_sadar', districtId: 'rangpur', nameEn: 'Rangpur Sadar', nameBn: 'রংপুর সদর', lat: 25.7439, lng: 89.2752 },

  // Mymensingh District
  { id: 'mymensingh_sadar', districtId: 'mymensingh', nameEn: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর', lat: 24.7471, lng: 90.4203 },
];

export function getDistrictsByDivision(divisionId: string): GeoDistrict[] {
  if (!divisionId) return [];
  return DISTRICTS.filter(d => d.divisionId.toUpperCase() === divisionId.toUpperCase());
}

export function getUpazilasByDistrict(districtId: string): GeoUpazila[] {
  if (!districtId) return [];
  const list = UPAZILAS.filter(u => u.districtId.toLowerCase() === districtId.toLowerCase());
  if (list.length === 0) {
    // Generate default Sadar upazila if not individually mapped
    const dist = DISTRICTS.find(d => d.id.toLowerCase() === districtId.toLowerCase());
    if (dist) {
      return [{
        id: `${dist.id}_sadar`,
        districtId: dist.id,
        nameEn: `${dist.nameEn} Sadar`,
        nameBn: `${dist.nameBn} সদর`,
        lat: dist.lat,
        lng: dist.lng
      }];
    }
  }
  return list;
}
