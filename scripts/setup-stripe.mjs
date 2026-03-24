/**
 * Run once to create Stripe products & prices.
 * Usage: node scripts/setup-stripe.mjs
 * Prints the Price IDs to add to .env.local
 */
import Stripe from 'stripe';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');

const secretKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim();
if (!secretKey || secretKey.includes('placeholder')) {
  console.error('❌  No STRIPE_SECRET_KEY found in .env.local');
  process.exit(1);
}

const stripe = new Stripe(secretKey, { apiVersion: '2026-02-25.clover' });

async function run() {
  console.log('🔧  Creating TenantShield products in Stripe...\n');

  // ── One-time product ──────────────────────────────────────────────────────
  const singleProduct = await stripe.products.create({
    name: 'TenantShield — Single Letter',
    description: 'One professional landlord demand letter as a PDF, with full legal citations.',
    metadata: { plan: 'one-time' },
  });

  const singlePrice = await stripe.prices.create({
    product: singleProduct.id,
    unit_amount: 999,        // $9.99
    currency: 'usd',
  });

  console.log(`✅  Single letter product: ${singleProduct.id}`);
  console.log(`    Price ID: ${singlePrice.id}`);

  // ── Subscription product ──────────────────────────────────────────────────
  const subProduct = await stripe.products.create({
    name: 'TenantShield — Unlimited Monthly',
    description: 'Generate unlimited landlord demand letters each month. Cancel anytime.',
    metadata: { plan: 'subscription' },
  });

  const subPrice = await stripe.prices.create({
    product: subProduct.id,
    unit_amount: 1999,       // $19.99
    currency: 'usd',
    recurring: { interval: 'month' },
  });

  console.log(`\n✅  Subscription product: ${subProduct.id}`);
  console.log(`    Price ID: ${subPrice.id}`);

  // ── Write price IDs back to .env.local ────────────────────────────────────
  const updated = envContent.includes('STRIPE_PRICE_ONE_TIME')
    ? envContent
        .replace(/STRIPE_PRICE_ONE_TIME=.*/,  `STRIPE_PRICE_ONE_TIME=${singlePrice.id}`)
        .replace(/STRIPE_PRICE_SUBSCRIPTION=.*/, `STRIPE_PRICE_SUBSCRIPTION=${subPrice.id}`)
    : envContent +
        `\nSTRIPE_PRICE_ONE_TIME=${singlePrice.id}` +
        `\nSTRIPE_PRICE_SUBSCRIPTION=${subPrice.id}\n`;

  writeFileSync(envPath, updated);

  console.log('\n✅  Price IDs written to .env.local');
  console.log('\n─────────────────────────────────────────────────');
  console.log('Next step: set up your webhook.');
  console.log('Local testing:  npx stripe listen --forward-to localhost:3000/api/webhook');
  console.log('Production:     add https://your-domain.com/api/webhook in Stripe Dashboard');
  console.log('                Events to enable: checkout.session.completed, customer.subscription.deleted');
  console.log('                Copy the "whsec_..." secret into STRIPE_WEBHOOK_SECRET in .env.local / Vercel');
  console.log('─────────────────────────────────────────────────\n');
}

run().catch((err) => {
  console.error('❌  Setup failed:', err.message);
  process.exit(1);
});
