import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Tenant Rights Blog — Guides, Letters & Legal Tips | TenantShield',
  description:
    'Free guides for tenants: how to write demand letters, understand your rights, deal with mold, no heat, pest infestations, and more — for Ontario, California, Quebec, and New York.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tenant-letter.com';

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TenantShield Tenant Rights Blog',
    url: `${BASE_URL}/blog`,
    description: metadata.description,
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      description: post.excerpt,
    })),
  };

  return (
    <>
      <JsonLd data={blogListSchema} />

      <main className="min-h-screen bg-gray-50">
        <div className="bg-navy-900 py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-trust-green text-sm font-semibold uppercase tracking-widest mb-3">Tenant Rights Blog</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Know Your Rights. Use Them.
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Plain-English guides on tenant rights, demand letters, and what to do when your landlord won&apos;t fix things.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:border-navy-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-trust-green group-hover:gap-2 transition-all">
                Read article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-16">
          <div className="bg-navy-900 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to send your letter?</h2>
            <p className="text-gray-300 text-sm mb-6">Generate a professionally worded demand letter in 3 minutes.</p>
            <Link
              href="/wizard"
              className="inline-block bg-trust-green hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Generate My Letter — Free Preview
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
