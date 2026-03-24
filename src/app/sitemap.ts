import { MetadataRoute } from 'next';
import { JURISDICTIONS } from '@/data/jurisdictions';
import { ISSUE_URL_MAP } from '@/data/issues';

const BASE_URL = 'https://tenantshield.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/wizard`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = [];

  for (const jurisdiction of JURISDICTIONS) {
    for (const issueSlug of Object.values(ISSUE_URL_MAP)) {
      dynamicPages.push({
        url: `${BASE_URL}/${jurisdiction.id}/${issueSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...dynamicPages];
}
