import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url, anonKey, serviceKey } = await req.json();

    if (!url || !url.startsWith('https://') || !url.includes('.supabase.co')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid Supabase Project URL. Expected format: https://[your-project-id].supabase.co',
        },
        { status: 400 }
      );
    }

    if (!anonKey || anonKey.length < 20) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid Supabase Anon Public Key. Please copy the anon key from Project Settings -> API.',
        },
        { status: 400 }
      );
    }

    // Ping Supabase to test validity
    let pingSuccess = false;
    let pingMessage = '';
    try {
      const pingRes = await fetch(`${url}/rest/v1/?apikey=${anonKey}`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });
      pingSuccess = pingRes.ok || pingRes.status === 200 || pingRes.status === 404;
      if (!pingSuccess) {
        pingMessage = `Server returned status ${pingRes.status}: ${pingRes.statusText}`;
      }
    } catch (e: any) {
      pingMessage = e.message || 'Network reachability error';
    }

    // Update .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    const updateEnvVar = (content: string, key: string, value: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(content)) {
        return content.replace(regex, `${key}=${value}`);
      } else {
        return content + `\n${key}=${value}`;
      }
    };

    envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_URL', url.trim());
    envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey.trim());
    if (serviceKey && serviceKey.trim().length > 10) {
      envContent = updateEnvVar(envContent, 'SUPABASE_SERVICE_ROLE_KEY', serviceKey.trim());
    }

    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');

    return NextResponse.json({
      success: true,
      pingSuccess,
      message: pingSuccess
        ? 'Supabase credentials verified and successfully connected! Updated .env.local.'
        : `Credentials saved to .env.local. Note: Ping check reported: ${pingMessage}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update database configuration.',
      },
      { status: 500 }
    );
  }
}
