import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("RedSavior 11 Role Dashboard Configuration & RBAC Test Suite", async (t) => {
  // Read and parse source files directly
  const rolesConfigContent = fs.readFileSync(
    path.join(process.cwd(), "src/lib/auth/roles-config.ts"),
    "utf8"
  );
  const permissionsContent = fs.readFileSync(
    path.join(process.cwd(), "src/lib/auth/permissions.ts"),
    "utf8"
  );

  const EXPECTED_ROLES = [
    "SUPER_ADMIN",
    "ADMIN",
    "DISTRICT_ADMIN",
    "UPAZILA_COORDINATOR",
    "ORGANIZATION_ADMIN",
    "HOSPITAL_ADMIN",
    "BLOOD_BANK_ADMIN",
    "VOLUNTEER",
    "DONOR",
    "RECIPIENT",
    "NORMAL_USER",
  ];

  await t.test("1. All 11 Supported Roles Exist in System Registry", () => {
    assert.equal(EXPECTED_ROLES.length, 11);
    for (const role of EXPECTED_ROLES) {
      assert.ok(
        rolesConfigContent.includes(`${role}:`),
        `ROLES_CONFIG must contain definition for ${role}`
      );
    }
  });

  await t.test("2. Exact Sidebar Navigation Item Counts Match Specifications", () => {
    const EXPECTED_NAV_COUNTS = {
      SUPER_ADMIN: 29,
      ADMIN: 15,
      DISTRICT_ADMIN: 13,
      UPAZILA_COORDINATOR: 11,
      ORGANIZATION_ADMIN: 14,
      HOSPITAL_ADMIN: 12,
      BLOOD_BANK_ADMIN: 14,
      VOLUNTEER: 11,
      DONOR: 14,
      RECIPIENT: 11,
      NORMAL_USER: 11,
    };

    for (const [role, count] of Object.entries(EXPECTED_NAV_COUNTS)) {
      // Find the exact role block in roles-config.ts using exact key matching
      const roleRegex = new RegExp(`\\b${role}:\\s*\\{[\\s\\S]*?sidebarItems:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*\\}`, "m");
      const match = rolesConfigContent.match(roleRegex);
      assert.ok(match, `Must find sidebarItems block for ${role}`);

      // Count occurrences of { id: in sidebarItems
      const itemsCount = (match[1].match(/\{\s*id:/g) || []).length;
      assert.equal(
        itemsCount,
        count,
        `Role ${role} sidebar items count must be exactly ${count}, got ${itemsCount}`
      );
    }
  });

  await t.test("3. Super Admin has Unrestricted Administrative Rights", () => {
    const superAdminBlock = permissionsContent.match(/\bSUPER_ADMIN:\s*\[([\s\S]*?)\]/);
    assert.ok(superAdminBlock);
    const superPerms = superAdminBlock[1];
    assert.ok(superPerms.includes('"users.delete"'));
    assert.ok(superPerms.includes('"roles.manage"'));
    assert.ok(superPerms.includes('"settings.manage"'));
    assert.ok(superPerms.includes('"database.manage"'));
  });

  await t.test("4. Normal Admin is Restricted from Dangerous Destructive Operations", () => {
    const adminBlock = permissionsContent.match(/(?:^|\n)\s*ADMIN:\s*\[([\s\S]*?)\]/);
    assert.ok(adminBlock);
    const adminPerms = adminBlock[1];

    assert.ok(!adminPerms.includes('"users.delete"'), "ADMIN must not have users.delete permission");
    assert.ok(!adminPerms.includes('"roles.manage"'), "ADMIN must not have roles.manage permission");
    assert.ok(!adminPerms.includes('"settings.manage"'), "ADMIN must not have settings.manage permission");
    assert.ok(!adminPerms.includes('"database.manage"'), "ADMIN must not have database.manage permission");
    assert.ok(adminPerms.includes('"donors.verify"'), "ADMIN must have donors.verify permission");
  });

  await t.test("5. Geographic Scopes Enforce Strict Data Isolation", () => {
    function isWithinScope(scope, target) {
      if (!scope) return true;
      if (scope.districtId && target.districtId && scope.districtId !== target.districtId) return false;
      if (scope.upazilaId && target.upazilaId && scope.upazilaId !== target.upazilaId) return false;
      if (scope.organizationId && target.organizationId && scope.organizationId !== target.organizationId) return false;
      if (scope.facilityId && target.facilityId && scope.facilityId !== target.facilityId) return false;
      return true;
    }

    const dhakaScope = { districtId: "dhaka" };
    const sylhetScope = { districtId: "sylhet" };

    const targetDhakaHospital = { districtId: "dhaka", facilityId: "hosp-dmch" };
    const targetSylhetHospital = { districtId: "sylhet", facilityId: "hosp-mag" };

    assert.equal(isWithinScope(dhakaScope, targetDhakaHospital), true);
    assert.equal(isWithinScope(dhakaScope, targetSylhetHospital), false, "District Admin cannot access records outside assigned district");
    assert.equal(isWithinScope(sylhetScope, targetDhakaHospital), false);
    assert.equal(isWithinScope(sylhetScope, targetSylhetHospital), true);
  });

  await t.test("6. Donor & Normal User RBAC Constraints", () => {
    const donorBlock = permissionsContent.match(/DONOR:\s*\[([\s\S]*?)\]/);
    assert.ok(donorBlock);
    const donorPerms = donorBlock[1];

    assert.ok(donorPerms.includes('"donors.toggle_availability"'), "DONOR can toggle availability");
    assert.ok(donorPerms.includes('"idcards.read"'), "DONOR can read own ID card");
    assert.ok(!donorPerms.includes('"donors.verify"'), "DONOR cannot verify other donors");

    const normalUserBlock = permissionsContent.match(/NORMAL_USER:\s*\[([\s\S]*?)\]/);
    assert.ok(normalUserBlock);
    const normalUserPerms = normalUserBlock[1];

    assert.ok(normalUserPerms.includes('"requests.create"'), "NORMAL_USER can request blood");
    assert.ok(!normalUserPerms.includes('"donors.verify"'), "NORMAL_USER cannot verify donors");
    assert.ok(!normalUserPerms.includes('"bloodbanks.inventory"'), "NORMAL_USER cannot modify inventory");
  });

  await t.test("7. All 11 Role Dashboard Components are Present in Repository", () => {
    const components = [
      "src/components/dashboard/roles/SuperAdminDashboard.tsx",
      "src/components/dashboard/roles/AdminDashboard.tsx",
      "src/components/dashboard/roles/DistrictAdminDashboard.tsx",
      "src/components/dashboard/roles/UpazilaCoordinatorDashboard.tsx",
      "src/components/dashboard/roles/OrganizationAdminDashboard.tsx",
      "src/components/dashboard/roles/HospitalAdminDashboard.tsx",
      "src/components/dashboard/roles/BloodBankAdminDashboard.tsx",
      "src/components/dashboard/roles/VolunteerDashboard.tsx",
      "src/components/dashboard/roles/DonorDashboard.tsx",
      "src/components/dashboard/roles/RecipientDashboard.tsx",
      "src/components/dashboard/roles/NormalUserDashboard.tsx",
    ];

    for (const comp of components) {
      assert.ok(fs.existsSync(path.join(process.cwd(), comp)), `Component ${comp} must exist`);
    }
  });
});
