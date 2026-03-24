import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, getBlogPost } from '@/data/blog-posts';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Not Found | TenantShield' };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tenant-letter.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'TenantShield', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'TenantShield',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-image.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-navy-900 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
              <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span>·</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Excerpt */}
          <div className="bg-navy-50 border-l-4 border-navy-800 rounded-r-xl p-5 mb-8">
            <p className="text-navy-900 font-medium text-base leading-relaxed">{post.excerpt}</p>
          </div>

          {/* Sections */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-8">
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-bold text-navy-900 mb-3">{section.heading}</h2>
                <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j}>
                      {para.split(/\*\*(.*?)\*\*/g).map((chunk, k) =>
                        k % 2 === 1 ? <strong key={k}>{chunk}</strong> : chunk
                      )}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-800">
              <strong>Legal Disclaimer:</strong> This article is for informational purposes only and does not constitute legal advice. Laws vary by jurisdiction and change over time. For advice specific to your situation, consult a qualified lawyer, paralegal, or tenant rights organization in your area.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-navy-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Ready to send a demand letter?</h2>
            <p className="text-gray-300 text-sm mb-5">
              Generate a professionally worded letter citing the real laws in your jurisdiction. Takes 3 minutes.
            </p>
            <Link
              href="/wizard"
              className="inline-block bg-trust-green hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Generate My Letter — Free Preview
            </Link>
          </div>

          {/* Other articles */}
          <div className="mt-10">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">More Articles</h3>
            <div className="space-y-3">
              {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block text-sm text-navy-700 hover:text-navy-900 hover:underline transition-colors"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
