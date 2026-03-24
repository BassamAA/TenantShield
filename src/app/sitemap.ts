import { MetadataRoute } from 'next';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { ISSUE_URL_MAP } from '@/data/issues';
import { BLOG_POSTS } from '@/data/blog-posts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tenant-letter.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/wizard`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const jurisdictionPages: MetadataRoute.Sitemap = [];
  for (const jurisdiction of JURISDICTIONS) {
    for (const issueSlug of Object.values(ISSUE_URL_MAP)) {
      jurisdictionPages.push({
        url: `${BASE_URL}/${jurisdiction.id}/${issueSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...blogPages, ...jurisdictionPages];
}
