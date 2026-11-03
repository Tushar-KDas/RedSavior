-- Bangladesh Master Geographic Hierarchy Seed Data
-- 8 Divisions, 64 Districts, and Major Upazilas / Thanas

-- 1. DIVISIONS
INSERT INTO geo_divisions (id, name_en, name_bn, latitude, longitude, display_order) VALUES
('DHAKA', 'Dhaka', 'ঢাকা', 23.8103, 90.4125, 1),
('CTG', 'Chattogram', 'চট্টগ্রাম', 22.3569, 91.7832, 2),
('RAJ', 'Rajshahi', 'রাজশাহী', 24.3745, 88.6042, 3),
('KHULNA', 'Khulna', 'খুলনা', 22.8456, 89.5403, 4),
('BARISHAL', 'Barishal', 'বরিশাল', 22.7010, 90.3535, 5),
('SYLHET', 'Sylhet', 'সিলেট', 24.8949, 91.8687, 6),
('RANGPUR', 'Rangpur', 'রংপুর', 25.7439, 89.2752, 7),
('MYM', 'Mymensingh', 'ময়মনসিংহ', 24.7471, 90.4203, 8)
ON CONFLICT (id) DO NOTHING;

-- 2. DISTRICTS
INSERT INTO geo_districts (id, division_id, name_en, name_bn, latitude, longitude) VALUES
-- Dhaka Division (13 districts)
('dhaka', 'DHAKA', 'Dhaka', 'ঢাকা', 23.8103, 90.4125),
('gazipur', 'DHAKA', 'Gazipur', 'গাজীপুর', 24.0023, 90.4264),
('narayanganj', 'DHAKA', 'Narayanganj', 'নারায়ণগঞ্জ', 23.6238, 90.5000),
('tangail', 'DHAKA', 'Tangail', 'টাঙ্গাইল', 24.2513, 89.9167),
('faridpur', 'DHAKA', 'Faridpur', 'ফরিদপুর', 23.6071, 89.8429),
('manikganj', 'DHAKA', 'Manikganj', 'মানিকগঞ্জ', 23.8617, 90.0003),
('munshiganj', 'DHAKA', 'Munshiganj', 'মুন্সীগঞ্জ', 23.5422, 90.5305),
('narsingdi', 'DHAKA', 'Narsingdi', 'নরসিংদী', 23.9322, 90.7154),
('gopalganj', 'DHAKA', 'Gopalganj', 'গোপালগঞ্জ', 23.0051, 89.8266),
('kishoreganj', 'DHAKA', 'Kishoreganj', 'কিশোরগঞ্জ', 24.4449, 90.7766),
('madaripur', 'DHAKA', 'Madaripur', 'মাদারীপুর', 23.1641, 90.1897),
('rajbari', 'DHAKA', 'Rajbari', 'রাজবাড়ী', 23.7574, 89.6445),
('shariatpur', 'DHAKA', 'Shariatpur', 'শরীয়তপুর', 23.2423, 90.4348),

-- Chattogram Division (11 districts)
('chattogram', 'CTG', 'Chattogram', 'চট্টগ্রাম', 22.3569, 91.7832),
('coxsbazar', 'CTG', 'Cox''s Bazar', 'কক্সবাজার', 21.4272, 92.0058),
('cumilla', 'CTG', 'Cumilla', 'কুমিল্লা', 23.4607, 91.1809),
('feni', 'CTG', 'Feni', 'ফেনী', 23.0186, 91.3966),
('brahmanbaria', 'CTG', 'Brahmanbaria', 'ব্রাহ্মণবাড়িয়া', 23.9571, 91.1119),
('chandpur', 'CTG', 'Chandpur', 'চাঁদপুর', 23.2333, 90.6667),
('noakhali', 'CTG', 'Noakhali', 'নোয়াখালী', 22.8696, 91.0994),
('lakshmipur', 'CTG', 'Lakshmipur', 'লক্ষ্মীপুর', 22.9425, 90.8412),
('khagrachhari', 'CTG', 'Khagrachhari', 'খাগড়াছড়ি', 23.1193, 91.9847),
('rangamati', 'CTG', 'Rangamati', 'রাঙ্গামাটি', 22.6533, 92.1753),
('bandarban', 'CTG', 'Bandarban', 'বান্দরবান', 22.1953, 92.2184),

-- Rajshahi Division (8 districts)
('rajshahi', 'RAJ', 'Rajshahi', 'রাজশাহী', 24.3745, 88.6042),
('bogura', 'RAJ', 'Bogura', 'বগুড়া', 24.8465, 89.3777),
('pabna', 'RAJ', 'Pabna', 'পাবনা', 24.0064, 89.2372),
('sirajganj', 'RAJ', 'Sirajganj', 'সিরাজগঞ্জ', 24.4534, 89.7008),
('naogaon', 'RAJ', 'Naogaon', 'নওগাঁ', 24.8103, 88.9416),
('natore', 'RAJ', 'Natore', 'নাটোর', 24.4206, 88.9322),
('chapai_nawabganj', 'RAJ', 'Chapai Nawabganj', 'চাঁপাইনবাবগঞ্জ', 24.5965, 88.2775),
('joypurhat', 'RAJ', 'Joypurhat', 'জয়পুরহাট', 25.1015, 89.0270),

-- Khulna Division (10 districts)
('khulna', 'KHULNA', 'Khulna', 'খুলনা', 22.8456, 89.5403),
('jashore', 'KHULNA', 'Jashore', 'যশোর', 23.1664, 89.2137),
('kushtia', 'KHULNA', 'Kushtia', 'কুষ্টিয়া', 23.9013, 89.1205),
('satkhira', 'KHULNA', 'Satkhira', 'সাতক্ষীরা', 22.7185, 89.0705),
('bagerhat', 'KHULNA', 'Bagerhat', 'বাগেরহাট', 22.6516, 89.7859),
('jhenaidah', 'KHULNA', 'Jhenaidah', 'ঝিনাইদহ', 23.5448, 89.1539),
('chuadanga', 'KHULNA', 'Chuadanga', 'চুয়াডাঙ্গা', 23.6402, 88.8418),
('magura', 'KHULNA', 'Magura', 'মাগুরা', 23.4873, 89.4199),
('meherpur', 'KHULNA', 'Meherpur', 'মেহেরপুর', 23.7622, 88.6318),
('narail', 'KHULNA', 'Narail', 'নড়াইল', 23.1725, 89.5127),

-- Sylhet Division (4 districts)
('sylhet', 'SYLHET', 'Sylhet', 'সিলেট', 24.8949, 91.8687),
('moulvibazar', 'SYLHET', 'Moulvibazar', 'মৌলভীবাজার', 24.4829, 91.7774),
('habiganj', 'SYLHET', 'Habiganj', 'হবিগঞ্জ', 24.3749, 91.4155),
('sunamganj', 'SYLHET', 'Sunamganj', 'সুনামগঞ্জ', 25.0658, 91.3950),

-- Barishal Division (6 districts)
('barishal', 'BARISHAL', 'Barishal', 'বরিশাল', 22.7010, 90.3535),
('patuakhali', 'BARISHAL', 'Patuakhali', 'পটুয়াখালী', 22.3596, 90.3298),
('bhola', 'BARISHAL', 'Bhola', 'ভোলা', 22.6859, 90.6481),
('pirojpur', 'BARISHAL', 'Pirojpur', 'পিরোজপুর', 22.5841, 89.9720),
('barguna', 'BARISHAL', 'Barguna', 'বরগুনা', 22.1570, 90.1256),
('jhalokati', 'BARISHAL', 'Jhalokati', 'ঝালকাঠি', 22.6406, 90.1987),

-- Rangpur Division (8 districts)
('rangpur', 'RANGPUR', 'Rangpur', 'রংপুর', 25.7439, 89.2752),
('dinajpur', 'RANGPUR', 'Dinajpur', 'দিনাজপুর', 25.6217, 88.6355),
('kurigram', 'RANGPUR', 'Kurigram', 'কুড়িগ্রাম', 25.8054, 89.6362),
('gaibandha', 'RANGPUR', 'Gaibandha', 'গাইবান্ধা', 25.3288, 89.5407),
('nilphamari', 'RANGPUR', 'Nilphamari', 'নীলফামারী', 25.9318, 88.8560),
('panchagarh', 'RANGPUR', 'Panchagarh', 'পঞ্চগড়', 26.3411, 88.5542),
('thakurgaon', 'RANGPUR', 'Thakurgaon', 'ঠাকুরগাঁও', 26.0337, 88.4617),
('lalmonirhat', 'RANGPUR', 'Lalmonirhat', 'লালমনিরহাট', 25.9923, 89.2847),

-- Mymensingh Division (4 districts)
('mymensingh', 'MYM', 'Mymensingh', 'ময়মনসিংহ', 24.7471, 90.4203),
('jamalpur', 'MYM', 'Jamalpur', 'জামালপুর', 24.9375, 89.9378),
('netrokona', 'MYM', 'Netrokona', 'নেত্রকোণা', 24.8709, 90.7279),
('sherpur', 'MYM', 'Sherpur', 'শেরপুর', 25.0205, 90.0153)
ON CONFLICT (id) DO NOTHING;

-- 3. KEY UPAZILAS / THANAS (Representative samples)
INSERT INTO geo_upazilas (id, district_id, name_en, name_bn, latitude, longitude) VALUES
-- Dhaka
('dhanmondi', 'dhaka', 'Dhanmondi', 'ধানমন্ডি', 23.7461, 90.3742),
('mirpur', 'dhaka', 'Mirpur', 'মিরপুর', 23.8041, 90.3687),
('gulshan', 'dhaka', 'Gulshan', 'গুলশান', 23.7925, 90.4078),
('uttara', 'dhaka', 'Uttara', 'উত্তরা', 23.8759, 90.3795),
('motijheel', 'dhaka', 'Motijheel', 'মতিঝিল', 23.7330, 90.4172),
('savar', 'dhaka', 'Savar', 'সাভার', 23.8583, 90.2667),
('mohammadpur', 'dhaka', 'Mohammadpur', 'মোহাম্মদপুর', 23.7658, 90.3584),
('badda', 'dhaka', 'Badda', 'বাড্ডা', 23.7805, 90.4267),
('shahbagh', 'dhaka', 'Shahbagh', 'শাহবাগ', 23.7389, 90.3957),
('keraniganj', 'dhaka', 'Keraniganj', 'কেরানীগঞ্জ', 23.6841, 90.3117),

-- Chattogram
('panchlaish', 'chattogram', 'Panchlaish', 'পাঁচলাইশ', 22.3684, 91.8291),
('kotwali_ctg', 'chattogram', 'Kotwali', 'কোতোয়ালী', 22.3384, 91.8317),
('hathazari', 'chattogram', 'Hathazari', 'হাটহাজারী', 22.5083, 91.8083),
('halishahar', 'chattogram', 'Halishahar', 'হালিশহর', 22.3167, 91.7833),

-- Sylhet
('sylhet_sadar', 'sylhet', 'Sylhet Sadar', 'সিলেট সদর', 24.8949, 91.8687),
('beanibazar', 'sylhet', 'Beanibazar', 'বিয়ানীবাজার', 24.8250, 92.1625),
('golapganj', 'sylhet', 'Golapganj', 'গোলাপগঞ্জ', 24.8583, 92.0250),

-- Rajshahi
('boalia', 'rajshahi', 'Boalia', 'বোয়ালিয়া', 24.3636, 88.6000),
('rajpara', 'rajshahi', 'Rajpara', 'রাজপাড়া', 24.3736, 88.5800),

-- Khulna
('khulna_sadar', 'khulna', 'Khulna Sadar', 'খুলনা সদর', 22.8167, 89.5500),
('sonadanga', 'khulna', 'Sonadanga', 'সোনাডাঙ্গা', 22.8250, 89.5333)
ON CONFLICT (id) DO NOTHING;
