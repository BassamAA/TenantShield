import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { ISSUES } from '@/data/issues';
import { ISSUE_URL_MAP } from '@/data/issues';
import { BLOG_POSTS } from '@/data/blog-posts';

const FEATURED_JURISDICTIONS = ['ontario', 'quebec', 'california', 'new-york'];
const FEATURED_ISSUES = ['mold-moisture', 'no-heat', 'pest-infestation', 'broken-lock', 'electrical-hazard', 'no-hot-water'];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tenant-letter.com';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TenantShield',
  url: BASE_URL,
  description: 'Generate a legally-worded landlord demand letter citing your actual tenant protection laws.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/wizard`,
    'query-input': 'required name=search_term_string',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'TenantShield — Landlord Demand Letter Generator',
  serviceType: 'Document Preparation',
  description:
    'Generate a professionally worded landlord violation demand letter citing the real tenant rights laws in your jurisdiction.',
  url: BASE_URL,
  provider: { '@type': 'Organization', name: 'TenantShield', url: BASE_URL },
  areaServed: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'California', 'New York', 'Texas', 'Florida', 'Illinois'],
  offers: {
    '@type': 'Offer',
    price: '9.99',
    priceCurrency: 'USD',
    description: 'One-time PDF download of your demand letter',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is sending a demand letter to my landlord legal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Tenants have a legal right to assert their rights in writing. A formal written demand creates a paper trail and is often the first required step before filing a complaint with a housing authority.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my landlord retaliate against me for sending this letter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Landlord retaliation for exercising tenant rights is illegal in virtually every jurisdiction TenantShield covers. In Ontario, Section 83 of the Residential Tenancies Act protects tenants. In California, Civil Code § 1942.5 explicitly prohibits retaliatory evictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my landlord ignores the letter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ignoring a formal written demand strengthens your case. Your letter serves as evidence that you provided proper written notice. You can then file a complaint with the relevant housing authority — such as the Landlord and Tenant Board (Ontario) or Code Enforcement (California).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TenantShield a law firm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. TenantShield is a document preparation service. The letters generated do not constitute legal advice. For legal advice specific to your situation, consult a licensed lawyer, paralegal, or tenant rights organization.',
      },
    },
  ],
};

export default function HomePage() {
  const featuredJurisdictions = JURISDICTIONS.filter((j) => FEATURED_JURISDICTIONS.includes(j.id));
  const featuredIssues = ISSUES.filter((i) => FEATURED_ISSUES.includes(i.id));

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
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

      {/* Blog preview */}
      <section className="py-16 sm:py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-trust-green text-xs font-bold uppercase tracking-widest mb-1">Tenant Rights Guides</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Know Before You Send</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-navy-700 hover:text-navy-900 transition-colors hidden sm:block">
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-gray-50 rounded-xl border border-gray-200 p-5 hover:border-navy-300 hover:bg-navy-50 transition-all duration-200"
              >
                <p className="text-xs text-gray-400 mb-2">{post.readingTimeMinutes} min read</p>
                <h3 className="font-bold text-navy-900 text-sm leading-snug mb-2 group-hover:text-navy-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-navy-700 hover:text-navy-900 transition-colors">
              All articles →
            </Link>
          </div>
        </div>
      </section>

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
    </>
  );
}
