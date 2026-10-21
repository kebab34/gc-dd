import { site } from '@/lib/content';

export const dynamic = 'force-static';

// Plan du site pour Google (site en une seule page)
export default function sitemap() {
  return [{ url: `${site.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
