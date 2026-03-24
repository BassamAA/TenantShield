import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import Link from 'next/link';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { ISSUES } from '@/data/issues';
import { ISSUE_URL_MAP } from '@/data/issues';

const FEATURED_JURISDICTIONS = ['ontario', 'quebec', 'california', 'new-york'];
const FEATURED_ISSUES = ['mold-moisture', 'no-heat', 'pest-infestation', 'broken-lock', 'electrical-hazard', 'no-hot-water'];

export default function HomePage() {
  const featuredJurisdictions = JURISDICTIONS.filter((j) => FEATURED_JURISDICTIONS.includes(j.id));
  const featuredIssues = ISSUES.filter((i) => FEATURED_ISSUES.includes(i.id));

  return (
    <main>
      <Hero />
      <HowItWorks />

      {/* Issue coverage grid */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              10 Housing Violations Covered
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every letter cites the specific law in your jurisdiction — not generic templates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {ISSUES.map((issue) => (
              <Link
                key={issue.id}
                href={`/ontario/${ISSUE_URL_MAP[issue.id]}`}
                className="flex flex-col items-center text-center p-4 rounded-xl border-2 border-gray-100 hover:border-navy-300 hover:bg-navy-50 transition-all duration-200 group"
              >
                <span className="text-3xl mb-2">{issue.icon}</span>
                <span className="text-xs font-semibold text-navy-800 leading-tight group-hover:text-navy-900">
                  {issue.label.split('(')[0].trim()}
                </span>
                {issue.isEmergency && (
                  <span className="mt-1.5 text-xs text-red-600 font-medium">Emergency</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Jurisdiction coverage */}
      <section className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Available in 9 Jurisdictions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Each letter references the actual legislation, housing code, and regulatory body for your location.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {featuredJurisdictions.map((j) => (
              <Link
                key={j.id}
                href={`/${j.id}/mold`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-navy-300 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-2xl">{j.flag}</span>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{j.name}</p>
                  <p className="text-xs text-trust-green font-medium">Full templates</p>
                </div>
              </Link>
            ))}
            {JURISDICTIONS.filter((j) => !FEATURED_JURISDICTIONS.includes(j.id)).map((j) => (
              <Link
                key={j.id}
                href={`/${j.id}/mold`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-navy-300 hover:shadow-sm transition-all duration-200 opacity-75"
              >
                <span className="text-2xl">{j.flag}</span>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{j.name}</p>
                  <p className="text-xs text-gray-400 font-medium">Available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links for SEO */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-navy-900 mb-6">Popular Letter Templates</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {featuredJurisdictions.flatMap((j) =>
              featuredIssues.slice(0, 3).map((issue) => (
                <Link
                  key={`${j.id}-${issue.id}`}
                  href={`/${j.id}/${ISSUE_URL_MAP[issue.id]}`}
                  className="text-xs text-gray-600 hover:text-navy-800 hover:underline transition-colors py-1"
                >
                  {j.name} — {issue.label.split('(')[0].trim()} Letter
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 bg-navy-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to hold your landlord accountable?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Generate your letter in 3 minutes. Preview for free. Download for $9.99.
          </p>
          <Link
            href="/wizard"
            className="inline-block bg-trust-green hover:bg-green-500 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            Generate My Letter — Free Preview
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            No account required · No legal knowledge needed · Works on mobile
          </p>
        </div>
      </section>
    </main>
  );
}
