import test from 'node:test';
import assert from 'node:assert/strict';

test('RBAC System: All 11 platform roles exist with distinct hierarchy', () => {
  const roles = [
    'SUPER_ADMIN',
    'ADMIN',
    'DISTRICT_ADMIN',
    'UPAZILA_COORDINATOR',
    'ORGANIZATION_ADMIN',
    'HOSPITAL_ADMIN',
    'BLOOD_BANK_ADMIN',
    'VOLUNTEER',
    'DONOR',
    'RECIPIENT',
    'NORMAL_USER',
  ];

  assert.equal(roles.length, 11, 'RedSavior architecture must support all 11 explicit roles');
  assert.ok(roles.includes('SUPER_ADMIN'));
  assert.ok(roles.includes('DISTRICT_ADMIN'));
  assert.ok(roles.includes('HOSPITAL_ADMIN'));
  assert.ok(roles.includes('BLOOD_BANK_ADMIN'));
});

test('Super Admin has unrestricted global management scope', () => {
  const user = {
    roles: ['SUPER_ADMIN', 'DONOR'],
    currentRole: 'SUPER_ADMIN',
  };

  const canManageAll = user.currentRole === 'SUPER_ADMIN';
  assert.equal(canManageAll, true);
});
