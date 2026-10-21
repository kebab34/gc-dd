import { site } from '@/lib/content';

export const dynamic = 'force-static';

// Plan du site pour Google
export default function sitemap() {
  return [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/mentions-legales/`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/confidentialite/`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
