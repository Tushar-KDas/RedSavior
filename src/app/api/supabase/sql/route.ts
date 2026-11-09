import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'schema';

  try {
    let filePath = '';
    if (type === 'geo') {
      filePath = path.join(process.cwd(), 'supabase', 'seed', 'bangladesh_geo.sql');
    } else {
      filePath = path.join(process.cwd(), 'supabase', 'migrations', '001_initial_schema.sql');
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'SQL file not found' }, { status: 404 });
    }

    const sqlContent = fs.readFileSync(filePath, 'utf8');
    return new NextResponse(sqlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
