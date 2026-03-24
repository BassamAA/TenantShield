import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  // Vercel injects this header automatically in production
  const country = req.headers.get('x-vercel-ip-country') ?? null;

  if (country) {
    return NextResponse.json({ country, source: 'vercel' });
  }

  // Local dev fallback — call a free IP geolocation API
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0].trim();

    // ip-api.com free tier: 45 req/min, no key needed
    const url = ip && ip !== '::1' && ip !== '127.0.0.1'
      ? `http://ip-api.com/json/${ip}?fields=countryCode`
      : `http://ip-api.com/json/?fields=countryCode`;

    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json() as { countryCode?: string };
      return NextResponse.json({ country: data.countryCode ?? 'US', source: 'ip-api' });
    }
  } catch {
    // silently fall through to default
  }

  return NextResponse.json({ country: 'US', source: 'default' });
}
