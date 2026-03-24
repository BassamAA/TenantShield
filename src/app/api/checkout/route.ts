import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

function getPriceId(plan: string, currency: string): string {
  const map: Record<string, string | undefined> = {
    'one-time-usd':      process.env.STRIPE_PRICE_ONE_TIME,
    'one-time-cad':      process.env.STRIPE_PRICE_ONE_TIME_CAD,
    'subscription-usd':  process.env.STRIPE_PRICE_SUBSCRIPTION,
    'subscription-cad':  process.env.STRIPE_PRICE_SUBSCRIPTION_CAD,
  };
  const cur = currency === 'CAD' ? 'cad' : 'usd';
  const key = `${plan}-${cur}`;
  const id = map[key];
  if (!id) throw new Error(`Price ID not configured for ${key}`);
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, currency = 'USD', letterData } = body;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/wizard?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl  = `${baseUrl}/wizard?cancelled=true`;

    const metadata = {
      plan,
      currency,
      jurisdiction:    letterData?.jurisdiction    || '',
      issue:           letterData?.issue           || '',
      tenantName:      letterData?.tenantName      || '',
      propertyAddress: letterData?.propertyAddress || '',
    };

    const priceId = getPriceId(plan, currency);
    const mode = plan === 'subscription' ? 'subscription' : 'payment';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata,
      success_url: successUrl,
      cancel_url:  cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
