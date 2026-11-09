import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  const isMock = !url || url.includes('mock') || url.includes('your-project-ref');

  if (isMock) {
    return NextResponse.json({
      connected: false,
      mode: 'mock',
      message: 'Running in Local Mock Store mode. Live Supabase Cloud URL is not yet connected.',
      url: url || null,
      hasAnonKey: !!anonKey && !anonKey.includes('mock'),
      hasServiceKey: !!serviceKey && !serviceKey.includes('mock'),
    });
  }

  try {
    // Ping Supabase REST endpoint
    const res = await fetch(`${url}/rest/v1/?apikey=${anonKey}`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    if (res.ok || res.status === 200 || res.status === 404) {
      return NextResponse.json({
        connected: true,
        mode: 'cloud',
        message: 'Successfully connected to live Supabase cloud database instance!',
        url,
        statusCode: res.status,
      });
    } else {
      return NextResponse.json({
        connected: false,
        mode: 'error',
        message: `Supabase returned HTTP status ${res.status}: ${res.statusText}. Please verify your anon key.`,
        url,
      });
    }
  } catch (err: any) {
    return NextResponse.json({
      connected: false,
      mode: 'error',
      message: err.message || 'Failed to reach Supabase project. Check internet connection or project URL.',
      url,
    });
  }
}
