import { Metadata } from 'next';
import WizardContainer from '@/components/wizard/WizardContainer';

export const metadata: Metadata = {
  title: 'Generate Your Landlord Demand Letter | TenantShield',
  description:
    'Generate a legally-worded demand letter for your landlord in minutes. Select your jurisdiction, describe the issue, and download a professional PDF.',
  robots: 'noindex', // Wizard is not a landing page
};

export default function WizardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 py-6 px-4 text-center">
        <h1 className="text-white font-bold text-xl sm:text-2xl">
          Generate Your Landlord Demand Letter
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Professional. Legally-cited. Ready in minutes.
        </p>
      </div>
      <WizardContainer />
    </main>
  );
}
