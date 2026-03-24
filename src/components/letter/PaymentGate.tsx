'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GeneratedLetter } from '@/types';
import { useCurrency } from '@/hooks/useCurrency';

interface Props {
  letter: GeneratedLetter;
  onBeforeCheckout: () => void;
}

export default function PaymentGate({ letter, onBeforeCheckout }: Props) {
  const [loading, setLoading] = useState<'one-time' | 'subscription' | null>(null);
  const { currency, symbol, oneTimePrice, subPrice, loading: geoLoading } = useCurrency();

  const handleCheckout = async (plan: 'one-time' | 'subscription') => {
    setLoading(plan);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          currency,
          letterData: {
            jurisdiction:    letter.jurisdiction,
            issue:           letter.issue,
            tenantName:      letter.tenantName,
            propertyAddress: letter.propertyAddress,
          },
        }),
      });

      const data = await res.json();
      if (data.url) {
        onBeforeCheckout(); // persist form state before leaving the page
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const currencyLabel = currency === 'CAD' ? ' CAD' : '';

  return (
    <div className="mt-6">
      {/* Trust signals */}
      <div className="flex items-center justify-center gap-6 mb-6 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Secure Checkout via Stripe
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          All major cards accepted
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Instant PDF download
        </span>
      </div>

      {/* Pricing options */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 transition-opacity duration-300 ${geoLoading ? 'opacity-50' : 'opacity-100'}`}>
        {/* One-time */}
        <div className="border-2 border-gray-200 rounded-2xl p-5 flex flex-col hover:border-navy-300 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-navy-900 text-lg">
                {symbol}{oneTimePrice}
                <span className="text-sm font-normal text-gray-400 ml-1">{currencyLabel}</span>
              </p>
              <p className="text-xs text-gray-500">One-time payment</p>
            </div>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">Single Letter</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5 mb-4 flex-1">
            {['This letter as a PDF', 'Full legal text with citations', 'Instant download'].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-trust-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout('one-time')}
            disabled={loading !== null || geoLoading}
            className="w-full bg-navy-800 text-white font-semibold py-3 rounded-xl hover:bg-navy-700 disabled:opacity-50 transition-all duration-200 text-sm"
          >
            {loading === 'one-time' ? <Spinner /> : `Pay ${symbol}${oneTimePrice}${currencyLabel} — Get PDF`}
          </button>
        </div>

        {/* Subscription */}
        <div className="border-2 border-navy-800 rounded-2xl p-5 flex flex-col relative bg-navy-50">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-navy-800 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-navy-900 text-lg">
                {symbol}{subPrice}
                <span className="text-sm font-normal text-gray-500">/mo</span>
                <span className="text-sm font-normal text-gray-400 ml-1">{currencyLabel}</span>
              </p>
              <p className="text-xs text-gray-500">Monthly subscription</p>
            </div>
            <span className="bg-navy-200 text-navy-800 text-xs font-medium px-2.5 py-1 rounded-full">Unlimited</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5 mb-4 flex-1">
            {['Unlimited letters per month', 'All jurisdictions', 'Cancel anytime'].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-trust-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout('subscription')}
            disabled={loading !== null || geoLoading}
            className="w-full bg-trust-green text-white font-semibold py-3 rounded-xl hover:bg-green-600 disabled:opacity-50 transition-all duration-200 text-sm"
          >
            {loading === 'subscription' ? <Spinner /> : `Subscribe — ${symbol}${subPrice}${currencyLabel}/mo`}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        Payments processed securely by Stripe. By purchasing, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-gray-300 transition-colors">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline hover:text-gray-300 transition-colors">Privacy Policy</Link>.
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Redirecting...
    </span>
  );
}
