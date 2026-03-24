'use client';

import { GeneratedLetter } from '@/types';
import { JURISDICTION_LABELS } from '@/data/jurisdictions';
import { ISSUE_LABELS } from '@/data/issues';

interface Props {
  letter: GeneratedLetter;
  isPaid: boolean;
}

export default function LetterPreview({ letter, isPaid }: Props) {
  const paragraphs = letter.letterBody.split('\n\n');
  // Show first ~40% of letter, blur the rest
  const cutoffIndex = Math.floor(paragraphs.length * 0.45);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Letter header bar */}
      <div className="bg-navy-900 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Generated Letter</p>
          <p className="text-white font-semibold text-sm">
            {ISSUE_LABELS[letter.issue]} — {JURISDICTION_LABELS[letter.jurisdiction]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {letter.template.isEmergency && (
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              EMERGENCY
            </span>
          )}
          <span className="bg-trust-green/20 text-trust-green text-xs font-semibold px-2.5 py-1 rounded-full">
            {letter.template.deadlineDays === 1 ? '24-hour deadline' : `${letter.template.deadlineDays}-day deadline`}
          </span>
        </div>
      </div>

      {/* Letter body */}
      <div className="font-mono text-sm leading-relaxed">
        {/* Visible portion */}
        <div className="px-8 py-6">
          {paragraphs.slice(0, cutoffIndex).map((para, idx) => (
            <div key={idx} className={para.startsWith('RE:') || para.startsWith('DESCRIPTION') || para.startsWith('LEGAL BASIS') || para.startsWith('DEMANDS') || para.startsWith('CONSEQUENCES') ? 'mb-4' : 'mb-3'}>
              {para.startsWith('RE:') || para.startsWith('DESCRIPTION') || para.startsWith('LEGAL BASIS') || para.startsWith('DEMANDS') || para.startsWith('CONSEQUENCES') ? (
                <p className="font-bold text-navy-900 font-sans uppercase text-xs tracking-wider underline">{para}</p>
              ) : para.match(/^\d+\./) ? (
                <p className="ml-4 text-gray-700">{para}</p>
              ) : para.startsWith('•') ? (
                <p className="ml-4 text-gray-600 text-xs">{para}</p>
              ) : (
                <p className="text-gray-800">{para}</p>
              )}
            </div>
          ))}
        </div>

        {/* Blurred / payment gate area */}
        {!isPaid && (
          <div className="relative">
            {/* Blurred text */}
            <div className="px-8 pb-6 select-none" style={{ filter: 'blur(5px)', userSelect: 'none' }}>
              {paragraphs.slice(cutoffIndex).map((para, idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-gray-800">{para}</p>
                </div>
              ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white flex flex-col items-center justify-end pb-8 px-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-navy-900 font-bold text-lg mb-1">Your letter is ready</p>
                <p className="text-gray-500 text-sm mb-1">
                  Unlock the full letter with all legal citations,<br />
                  demands, and escalation language.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Full letter if paid */}
        {isPaid && (
          <div className="px-8 pb-6">
            {paragraphs.slice(cutoffIndex).map((para, idx) => (
              <div key={idx} className="mb-3">
                {para.startsWith('RE:') || para.startsWith('DESCRIPTION') || para.startsWith('LEGAL BASIS') || para.startsWith('DEMANDS') || para.startsWith('CONSEQUENCES') ? (
                  <p className="font-bold text-navy-900 font-sans uppercase text-xs tracking-wider underline">{para}</p>
                ) : para.match(/^\d+\./) ? (
                  <p className="ml-4 text-gray-700">{para}</p>
                ) : (
                  <p className="text-gray-800">{para}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
