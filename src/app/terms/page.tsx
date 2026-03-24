import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | TenantShield',
  description: 'Terms of Service for TenantShield document preparation service.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-navy-600 hover:text-navy-800 transition-colors">
            ← Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10 prose prose-sm max-w-none text-gray-700">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: January 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using TenantShield (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of
            Service. If you do not agree to these terms, do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            TenantShield is a document preparation service that generates template-based demand letters for tenants.
            The Service is not a law firm. The documents generated do not constitute legal advice and do not create
            an attorney-client relationship. For legal advice specific to your situation, consult a qualified
            attorney or tenant rights organization in your jurisdiction.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>You agree that you will:</p>
          <ul>
            <li>Provide accurate information when generating letters</li>
            <li>Use the generated documents only for lawful purposes</li>
            <li>Not misrepresent facts in the generated letters</li>
            <li>Take sole responsibility for how you use the generated documents</li>
          </ul>

          <h2>4. Payment and Refunds</h2>
          <p>
            Payments are processed securely by Stripe. One-time purchases grant you a single PDF download.
            Subscriptions renew monthly until cancelled. Due to the instant digital delivery nature of the
            Service, all sales are final. If you experience a technical issue preventing download, contact us
            for assistance.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The letter templates, legal citations, and generated content are owned by TenantShield. You receive
            a personal, non-exclusive license to use the generated document for your individual tenant matter.
            You may not resell or redistribute generated documents.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. TENANTSHIELD DOES NOT WARRANT
            THAT THE DOCUMENTS GENERATED WILL ACHIEVE ANY PARTICULAR LEGAL OUTCOME. LEGAL OUTCOMES DEPEND ON
            FACTS, CIRCUMSTANCES, AND JURISDICTION-SPECIFIC LAW THAT CANNOT BE FULLY ADDRESSED BY A TEMPLATE.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, TenantShield shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of the Service or any generated
            document.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Ontario, Canada, without regard to conflict of law principles.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes constitutes
            acceptance of the new Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@tenant-letter.com" className="text-navy-700 underline">
              support@tenant-letter.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
