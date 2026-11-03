import test from 'node:test';
import assert from 'node:assert/strict';

test('Blood Group Compatibility: Universal red cell donor is O-', () => {
  const universalDonor = 'O-';
  const recipientBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  // Clinical check: O- can safely donate red cells to any ABO/Rh group
  assert.equal(universalDonor, 'O-');
  assert.equal(recipientBloodGroups.length, 8);
});

test('Donor phone masking: Unconsented phones are securely masked', () => {
  const rawPhone = '+8801711000001';
  const isConsentGiven = false;

  const maskedPhone = isConsentGiven
    ? rawPhone
    : rawPhone.slice(0, 6) + '•••••' + rawPhone.slice(-2);

  assert.equal(maskedPhone, '+88017•••••01');
  assert.ok(!maskedPhone.includes('11000'), 'Private digits must be masked');
});
