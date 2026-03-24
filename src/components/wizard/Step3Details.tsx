'use client';

import { WizardFormData } from '@/types';

interface Props {
  formData: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
}

function Field({ label, hint, children, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-navy-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      {children}
    </div>
  );
}

const inputClass =
  'w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-navy-500 transition-colors placeholder-gray-400';

export default function Step3Details({ formData, onUpdate, onNext, onBack }: Props) {
  const isValid =
    formData.tenantName.trim() &&
    formData.landlordName.trim() &&
    formData.propertyAddress.trim() &&
    formData.dateStarted;

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-2">Fill in your details</h2>
      <p className="text-gray-500 mb-8">This information will be inserted into your formal demand letter.</p>

      <div className="space-y-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Your Full Name" required>
            <input
              type="text"
              value={formData.tenantName}
              onChange={(e) => onUpdate({ tenantName: e.target.value })}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </Field>
          <Field label="Landlord / Property Manager Name" required>
            <input
              type="text"
              value={formData.landlordName}
              onChange={(e) => onUpdate({ landlordName: e.target.value })}
              placeholder="John Doe / ABC Property Mgmt"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2">
            <Field label="Property Address" required>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) => onUpdate({ propertyAddress: e.target.value })}
                placeholder="123 Main Street, Toronto, ON M5A 1A1"
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Unit / Apt Number" hint="If applicable">
            <input
              type="text"
              value={formData.unitNumber}
              onChange={(e) => onUpdate({ unitNumber: e.target.value })}
              placeholder="Unit 4B"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="When did the problem start?" required hint="Approximate date is fine">
          <input
            type="date"
            value={formData.dateStarted}
            onChange={(e) => onUpdate({ dateStarted: e.target.value })}
            className={inputClass}
            max={new Date().toISOString().split('T')[0]}
          />
        </Field>

        <Field
          label="Describe the problem"
          hint="Provide specific details — what you see, smell, or experience. The more specific, the stronger your letter."
        >
          <textarea
            value={formData.issueDescription}
            onChange={(e) => onUpdate({ issueDescription: e.target.value })}
            placeholder="E.g. There is black mold visible on the north wall of the bathroom, approximately 2 feet in diameter, and the ceiling above the shower has water staining suggesting ongoing moisture infiltration..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Verbal complaint */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="verbal"
              checked={formData.complainedVerbally}
              onChange={(e) => onUpdate({ complainedVerbally: e.target.checked })}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 accent-navy-800 cursor-pointer"
            />
            <label htmlFor="verbal" className="text-sm font-semibold text-navy-900 cursor-pointer">
              I have already complained about this verbally or by text/email
            </label>
          </div>

          {formData.complainedVerbally && (
            <div className="ml-8">
              <label className="text-xs font-medium text-gray-600 block mb-1">Date of verbal complaint (optional)</label>
              <input
                type="date"
                value={formData.verbalComplaintDate}
                onChange={(e) => onUpdate({ verbalComplaintDate: e.target.value })}
                className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-500 transition-colors"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}
        </div>

        {/* Photos */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="photos"
              checked={formData.hasPhotos}
              onChange={(e) => onUpdate({ hasPhotos: e.target.checked })}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 accent-navy-800 cursor-pointer"
            />
            <label htmlFor="photos" className="text-sm font-semibold text-navy-900 cursor-pointer">
              I have photographs documenting this issue
            </label>
          </div>
          {formData.hasPhotos && (
            <p className="ml-8 mt-1 text-xs text-trust-green font-medium">
              Great — this strengthens your position. The letter will reference your photographic evidence.
            </p>
          )}
        </div>
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
          disabled={!isValid}
          className="flex-[2] bg-navy-800 text-white font-semibold py-4 rounded-xl hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          Generate My Letter
          <svg className="inline-block ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {!isValid && (
        <p className="text-center text-xs text-gray-400 mt-3">
          Please fill in all required fields (marked with *) to continue.
        </p>
      )}
    </div>
  );
}
