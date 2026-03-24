'use client';

import { GeneratedLetter } from '@/types';
import LetterPreview from '@/components/letter/LetterPreview';
import PaymentGate from '@/components/letter/PaymentGate';
import { useState } from 'react';

interface Props {
  letter: GeneratedLetter;
  onBack: () => void;
  isPaid?: boolean;
  onBeforeCheckout: () => void;
}

export default function Step4Preview({ letter, onBack, isPaid: initialPaid = false, onBeforeCheckout }: Props) {
  const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS_PAYMENT === 'true';
  const [isPaid, setIsPaid] = useState(devBypass || initialPaid);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const justPaid = initialPaid && !devBypass;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter }),
        signal: AbortSignal.timeout(60_000),
      });

      if (!res.ok) throw new Error('PDF generation failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `TenantShield-Letter-${letter.jurisdiction}-${letter.issue}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const msg = err instanceof Error && err.name === 'TimeoutError'
        ? 'PDF generation timed out. Please try again.'
        : 'PDF generation failed. Please try again.';
      setDownloadError(msg);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      {devBypass && !initialPaid && (
        <div className="mb-4 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs font-mono px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="font-bold">DEV</span>
          Payment bypassed — set <code>NEXT_PUBLIC_DEV_BYPASS_PAYMENT=false</code> to test Stripe
        </div>
      )}

      {/* Payment success banner */}
      {justPaid && (
        <div className="mb-5 bg-trust-green/10 border border-trust-green/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-trust-green">Payment confirmed!</p>
            <p className="text-xs text-gray-600">Your letter is unlocked. Download it below.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-navy-900">Your Letter is Ready</h2>
        {isPaid && !justPaid && (
          <span className="flex items-center gap-1.5 text-trust-green text-sm font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Payment confirmed
          </span>
        )}
      </div>
      <p className="text-gray-500 mb-6">
        {isPaid
          ? 'Your full letter is unlocked. Download it as a PDF and send it to your landlord.'
          : 'Review the preview below, then unlock the full letter with legal citations and escalation language.'}
      </p>

      <LetterPreview letter={letter} isPaid={isPaid} />

      {isPaid ? (
        <div className="mt-6 space-y-3">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full bg-trust-green text-white font-semibold py-4 rounded-xl hover:bg-green-600 disabled:opacity-50 transition-all duration-200 text-lg flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Letter
              </>
            )}
          </button>

          {downloadError && (
            <p className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {downloadError}
            </p>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800 font-semibold mb-1">How to use your letter:</p>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Print the letter or send it as a PDF attachment</li>
              <li>Keep a copy for your records with the date sent</li>
              <li>Send via email (with read receipt) and/or certified mail</li>
              <li>If no response by the deadline, contact your housing authority</li>
            </ol>
          </div>
        </div>
      ) : (
        <PaymentGate letter={letter} onBeforeCheckout={onBeforeCheckout} />
      )}

      <button
        onClick={onBack}
        className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        Edit details
      </button>
    </div>
  );
}
