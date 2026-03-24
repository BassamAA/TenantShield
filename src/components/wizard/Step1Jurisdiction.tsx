'use client';

import { WizardFormData, Jurisdiction } from '@/types';
import { JURISDICTIONS } from '@/data/jurisdictions';

interface Props {
  formData: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
}

const CA_JURISDICTIONS = JURISDICTIONS.filter((j) => j.country === 'CA');
const US_JURISDICTIONS = JURISDICTIONS.filter((j) => j.country === 'US');

export default function Step1Jurisdiction({ formData, onUpdate, onNext }: Props) {
  const handleSelect = (id: Jurisdiction) => {
    onUpdate({ jurisdiction: id });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-2">Where is your rental located?</h2>
      <p className="text-gray-500 mb-8">Select your province or state — your letter will reference the correct local laws.</p>

      {/* Canadian provinces */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Canada</h3>
        <div className="grid grid-cols-2 gap-3">
          {CA_JURISDICTIONS.map((j) => (
            <button
              key={j.id}
              onClick={() => handleSelect(j.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                formData.jurisdiction === j.id
                  ? 'border-navy-800 bg-navy-50 shadow-sm'
                  : 'border-gray-200 hover:border-navy-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{j.flag}</span>
              <div>
                <p className="font-semibold text-navy-900 text-sm">{j.name}</p>
                <p className="text-xs text-gray-400">Canada</p>
              </div>
              {formData.jurisdiction === j.id && (
                <div className="ml-auto w-5 h-5 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* US states */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">United States</h3>
        <div className="grid grid-cols-2 gap-3">
          {US_JURISDICTIONS.map((j) => (
            <button
              key={j.id}
              onClick={() => handleSelect(j.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                formData.jurisdiction === j.id
                  ? 'border-navy-800 bg-navy-50 shadow-sm'
                  : 'border-gray-200 hover:border-navy-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{j.flag}</span>
              <div>
                <p className="font-semibold text-navy-900 text-sm">{j.name}</p>
                <p className="text-xs text-gray-400">United States</p>
              </div>
              {formData.jurisdiction === j.id && (
                <div className="ml-auto w-5 h-5 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!formData.jurisdiction}
        className="w-full bg-navy-800 text-white font-semibold py-4 rounded-xl hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-lg"
      >
        Continue
        <svg className="inline-block ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
