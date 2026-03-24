import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | TenantShield',
  description: 'Privacy Policy for TenantShield document preparation service.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-navy-600 hover:text-navy-800 transition-colors">
            ← Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10 prose prose-sm max-w-none text-gray-700">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: January 2025</p>

          <h2>1. Information We Collect</h2>
          <p>When you use TenantShield, we collect:</p>
          <ul>
            <li>
              <strong>Form data you provide:</strong> Your name, landlord name, property address, and issue
              description — used solely to generate your demand letter.
            </li>
            <li>
              <strong>Payment information:</strong> Processed entirely by Stripe. We do not store card numbers
              or payment details.
            </li>
            <li>
              <strong>IP address / approximate location:</strong> Used only to detect your country for pricing
              purposes (CAD vs USD). Not stored persistently.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information you provide exclusively to:</p>
          <ul>
            <li>Generate your demand letter</li>
            <li>Process your payment via Stripe</li>
            <li>Deliver your PDF download</li>
          </ul>
          <p>
            We do not sell your data. We do not use your data for advertising. We do not share your information
            with third parties except Stripe (payment processing) and Vercel (hosting infrastructure).
          </p>

          <h2>3. Data Retention</h2>
          <p>
            Form data entered during letter generation is processed in-memory and is not stored on our servers
            after your session. Your letter content is temporarily stored in your browser&rsquo;s local storage
            to allow recovery after payment — this is cleared immediately upon return from the payment page.
          </p>

          <h2>4. Cookies and Local Storage</h2>
          <p>
            We use browser local storage (not cookies) only to preserve your form data across the Stripe
            payment redirect. No tracking cookies are set. No analytics cookies are set.
          </p>

          <h2>5. Third-Party Services</h2>
          <ul>
            <li>
              <strong>Stripe:</strong> Payment processing. Stripe&rsquo;s privacy policy applies to payment data.
            </li>
            <li>
              <strong>Vercel:</strong> Hosting. Standard server access logs may be retained by Vercel per their
              privacy policy.
            </li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>
            Since we do not store your personal data after your session, there is generally no data to access,
            correct, or delete. If you have concerns, contact us at the address below.
          </p>

          <h2>7. Children</h2>
          <p>
            The Service is not directed to children under 13. We do not knowingly collect information from
            children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated date at the top of this page
            reflects the most recent revision.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{' '}
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
