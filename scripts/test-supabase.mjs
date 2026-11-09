import fs from 'fs';
import path from 'path';

// Read .env.local
const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const getEnvVar = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim() : process.env[key] || '';
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
const supabaseSecretKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

console.log('==================================================');
console.log('   RedSavior Supabase Cloud Connection Tester');
console.log('==================================================');
console.log(`Configured Project URL: ${supabaseUrl || '(not configured)'}`);
console.log(`Publishable / Anon Key: ${supabaseAnonKey ? supabaseAnonKey.substring(0, 18) + '...' : '(missing)'}`);
console.log(`Service Role Secret:    ${supabaseSecretKey ? supabaseSecretKey.substring(0, 14) + '...' : '(missing)'}`);

if (!supabaseUrl || supabaseUrl.includes('mock') || supabaseUrl.includes('your-project-ref')) {
  console.log('\n[STATUS]: MOCK MODE ACTIVE');
  console.log('No live Supabase project is currently linked in .env.local.');
  console.log('To link your Supabase project:');
  console.log('1. Go to https://supabase.com -> Project Settings -> API');
  console.log('2. Copy Project URL and anon public key');
  console.log('3. Update .env.local or use the in-app Database Settings panel at http://localhost:3000/dashboard');
  process.exit(0);
}

console.log('\nPinging Supabase Cloud Endpoint at: ' + supabaseUrl + ' ...');

try {
  // Test Auth API with publishable key
  const res = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (res.ok || res.status === 200) {
    console.log(`\n[SUCCESS]: Connected to Supabase Cloud! HTTP Status: ${res.status}`);
    console.log('Database and Auth service are healthy and responding.');

    // Test PostgREST with Secret key if available
    if (supabaseSecretKey) {
      const restRes = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
        },
      });
      if (restRes.ok || restRes.status === 200) {
        console.log(`[SUCCESS]: PostgREST Database API Verified (HTTP ${restRes.status}).`);
      }
    }
  } else {
    console.log(`\n[WARNING]: Supabase returned HTTP status ${res.status} (${res.statusText})`);
  }
} catch (err) {
  console.error(`\n[ERROR]: Failed to connect to ${supabaseUrl}`);
  console.error(err.message);
}
