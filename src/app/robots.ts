import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/wizard'],
      },
    ],
    sitemap: 'https://tenantshield.com/sitemap.xml',
  };
}
