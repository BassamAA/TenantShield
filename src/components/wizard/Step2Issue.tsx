'use client';

import { WizardFormData, IssueCategory } from '@/types';
import { ISSUES } from '@/data/issues';

interface Props {
  formData: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Issue({ formData, onUpdate, onNext, onBack }: Props) {
  const handleSelect = (id: IssueCategory) => {
    onUpdate({ issue: id });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-2">What is the problem?</h2>
      <p className="text-gray-500 mb-8">Select the issue category that best describes your situation.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {ISSUES.map((issue) => (
          <button
            key={issue.id}
            onClick={() => handleSelect(issue.id)}
            className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              formData.issue === issue.id
                ? 'border-navy-800 bg-navy-50 shadow-sm'
                : 'border-gray-200 hover:border-navy-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{issue.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy-900 text-sm leading-snug">{issue.label}</p>
              {issue.isEmergency && (
                <span className="inline-block mt-1 text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full">
                  Emergency — 24h deadline
                </span>
              )}
            </div>
            {formData.issue === issue.id && (
              <div className="w-5 h-5 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!formData.issue}
          className="flex-[2] bg-navy-800 text-white font-semibold py-4 rounded-xl hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          Continue
          <svg className="inline-block ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
