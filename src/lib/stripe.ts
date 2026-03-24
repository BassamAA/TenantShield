import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
});

export const PRICES = {
  ONE_TIME: {
    amount: 999, // $9.99 in cents
    currency: 'usd',
    description: 'TenantShield — Single Letter Download',
    mode: 'payment' as const,
  },
  SUBSCRIPTION: {
    amount: 1999, // $19.99 in cents
    currency: 'usd',
    description: 'TenantShield — Unlimited Letters (Monthly)',
    mode: 'subscription' as const,
  },
};
