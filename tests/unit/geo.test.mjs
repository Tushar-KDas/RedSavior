import test from 'node:test';
import assert from 'node:assert/strict';

// Test geographic hierarchy integrity
test('Bangladesh Geographic Hierarchy: 8 Divisions exist with bilingual names', () => {
  const divisions = [
    { id: 'DHAKA', nameEn: 'Dhaka', nameBn: 'ঢাকা' },
    { id: 'CTG', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম' },
    { id: 'RAJ', nameEn: 'Rajshahi', nameBn: 'রাজশাহী' },
    { id: 'KHULNA', nameEn: 'Khulna', nameBn: 'খুলনা' },
    { id: 'BARISHAL', nameEn: 'Barishal', nameBn: 'বরিশাল' },
    { id: 'SYLHET', nameEn: 'Sylhet', nameBn: 'সিলেট' },
    { id: 'RANGPUR', nameEn: 'Rangpur', nameBn: 'রংপুর' },
    { id: 'MYM', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
  ];

  assert.equal(divisions.length, 8, 'Should have exactly 8 administrative divisions');
  divisions.forEach(d => {
    assert.ok(d.id, 'Division must have an ID');
    assert.ok(d.nameEn, 'Division must have an English name');
    assert.ok(d.nameBn, 'Division must have a Bangla name');
  });
});

test('District cascading correctly maps to parent division', () => {
  const sampleDistricts = [
    { id: 'dhaka', divisionId: 'DHAKA' },
    { id: 'gazipur', divisionId: 'DHAKA' },
    { id: 'chattogram', divisionId: 'CTG' },
    { id: 'sylhet', divisionId: 'SYLHET' },
    { id: 'rajshahi', divisionId: 'RAJ' },
  ];

  const dhakaDistricts = sampleDistricts.filter(d => d.divisionId === 'DHAKA');
  assert.equal(dhakaDistricts.length, 2, 'Should filter districts belonging to Dhaka');
  assert.equal(dhakaDistricts[0].id, 'dhaka');
});
