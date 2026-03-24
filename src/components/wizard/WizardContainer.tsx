'use client';

import { useState } from 'react';
import { WizardFormData, GeneratedLetter, Jurisdiction, IssueCategory } from '@/types';
import ProgressBar from './ProgressBar';
import Step1Jurisdiction from './Step1Jurisdiction';
import Step2Issue from './Step2Issue';
import Step3Details from './Step3Details';
import Step4Preview from './Step4Preview';
import { generateLetter } from '@/lib/templateEngine';

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
  const [step, setStep] = useState(preselectedJurisdiction && preselectedIssue ? 3 : preselectedJurisdiction ? 2 : 1);
  const [formData, setFormData] = useState<WizardFormData>({
    ...DEFAULT_FORM_DATA,
    jurisdiction: preselectedJurisdiction || '',
    issue: preselectedIssue || '',
  });
  const [letter, setLetter] = useState<GeneratedLetter | null>(null);

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goNext = () => {
    if (step === 3) {
      // Generate letter before going to step 4
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
          <Step4Preview letter={letter} onBack={goBack} />
        )}
      </div>
    </div>
  );
}
