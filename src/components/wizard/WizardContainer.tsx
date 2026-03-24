'use client';

import { useState, useEffect, useRef } from 'react';
import { WizardFormData, GeneratedLetter, Jurisdiction, IssueCategory } from '@/types';
import ProgressBar from './ProgressBar';
import Step1Jurisdiction from './Step1Jurisdiction';
import Step2Issue from './Step2Issue';
import Step3Details from './Step3Details';
import Step4Preview from './Step4Preview';
import { generateLetter } from '@/lib/templateEngine';

const STORAGE_KEY = 'ts_wizard_formdata';

const DEFAULT_FORM_DATA: WizardFormData = {
  jurisdiction: '',
  issue: '',
  tenantName: '',
  landlordName: '',
  propertyAddress: '',
  unitNumber: '',
  dateStarted: '',
  issueDescription: '',
  complainedVerbally: false,
  verbalComplaintDate: '',
  hasPhotos: false,
};

interface WizardContainerProps {
  preselectedJurisdiction?: Jurisdiction;
  preselectedIssue?: IssueCategory;
}

export default function WizardContainer({
  preselectedJurisdiction,
  preselectedIssue,
}: WizardContainerProps) {
  const [step, setStep] = useState(
    preselectedJurisdiction && preselectedIssue ? 3 : preselectedJurisdiction ? 2 : 1
  );
  const [formData, setFormData] = useState<WizardFormData>({
    ...DEFAULT_FORM_DATA,
    jurisdiction: preselectedJurisdiction || '',
    issue: preselectedIssue || '',
  });
  const [letter, setLetter] = useState<GeneratedLetter | null>(null);
  const [returnedPaid, setReturnedPaid] = useState(false);
  // Set to true just before redirecting to Stripe so the leave warning is suppressed
  const goingToCheckout = useRef(false);

  // Warn before leaving if the user has started filling in details (step 3+),
  // but NOT when they are intentionally going to the Stripe checkout page.
  useEffect(() => {
    const hasStartedFilling =
      step >= 3 &&
      (formData.tenantName || formData.landlordName || formData.propertyAddress || formData.issueDescription);
    if (!hasStartedFilling) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (goingToCheckout.current) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step, formData.tenantName, formData.landlordName, formData.propertyAddress, formData.issueDescription]);

  // On mount — check if we're returning from Stripe (success or cancelled)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('success') === 'true') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const restored: WizardFormData = JSON.parse(saved);
          setFormData(restored);
          const generated = generateLetter(restored);
          setLetter(generated);
          setReturnedPaid(true);
          setStep(4);
          localStorage.removeItem(STORAGE_KEY);
          window.history.replaceState({}, '', window.location.pathname);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    // Cancelled — restore the form so the user doesn't lose their work
    if (params.get('cancelled') === 'true') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const restored: WizardFormData = JSON.parse(saved);
          setFormData(restored);
          const generated = generateLetter(restored);
          setLetter(generated);
          setStep(4); // Send them back to the preview/payment screen
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goNext = () => {
    if (step === 3) {
      const generated = generateLetter(formData);
      setLetter(generated);
    }
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called by PaymentGate just before redirecting to Stripe
  const saveBeforeCheckout = () => {
    goingToCheckout.current = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ProgressBar currentStep={step} totalSteps={4} />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        {step === 1 && (
          <Step1Jurisdiction formData={formData} onUpdate={updateFormData} onNext={goNext} />
        )}
        {step === 2 && (
          <Step2Issue formData={formData} onUpdate={updateFormData} onNext={goNext} onBack={goBack} />
        )}
        {step === 3 && (
          <Step3Details formData={formData} onUpdate={updateFormData} onNext={goNext} onBack={goBack} />
        )}
        {step === 4 && letter && (
          <Step4Preview
            letter={letter}
            onBack={goBack}
            isPaid={returnedPaid}
            onBeforeCheckout={saveBeforeCheckout}
          />
        )}
      </div>
    </div>
  );
}
