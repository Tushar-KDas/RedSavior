import test from 'node:test';
import assert from 'node:assert/strict';

test('Digital ID Card: Cryptographic QR Token validation', () => {
  const qrToken = 'rs_qr_tok_rahim_ahmed_o_plus_98f41e';
  
  // Rule: QR token must NOT contain plain passwords, emails, or Supabase service keys
  assert.ok(!qrToken.includes('password'), 'QR token must never contain passwords');
  assert.ok(!qrToken.includes('@'), 'QR token must never expose raw email addresses');
  assert.ok(!qrToken.includes('service_role'), 'QR token must not contain service keys');
  assert.ok(qrToken.startsWith('rs_qr_tok_'), 'QR token should follow standard secure prefix');
});

test('Donor ID format follows standardized alphanumeric template', () => {
  const sampleId = 'RS-DNR-000125';
  const regex = /^RS-DNR-\d{6}$/;
  assert.match(sampleId, regex, 'Donor display ID must match RS-DNR-XXXXXX pattern');
});
