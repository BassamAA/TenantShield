import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    // Retrieve the checkout session to get the Stripe customer ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.customer) {
      return NextResponse.json({ error: 'No customer associated with this session' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: session.customer as string,
      return_url: `${baseUrl}/wizard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Customer portal error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
