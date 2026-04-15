import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/blog';

import { getSiteUrl } from '@/lib/utils';
import { CALCULATOR_SPECS } from '@/lib/calculatorSpecs';
import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const EXCLUDED_STATIC_ROUTES = new Set<string>([
  '/mortgage-refinance-calculator',
  '/loan-interest-calculator',
  '/mortgage/200000-mortgage-payment',
  '/mortgage/300000-mortgage-payment',
  '/mortgage/400000-mortgage-payment',
  '/mortgage/how-much-house-can-i-afford-on-70000-salary',
  '/loan/10000-loan-monthly-payment',
  '/loan/20000-loan-payment',
  '/loan/personal-loan-interest-example',
  '/salary/20-an-hour-is-how-much-a-year',
  '/salary/25-an-hour-is-how-much-a-year',
  '/salary/50000-to-hourly',
  '/salary/60000-after-tax',
  '/salary/70000-after-tax',
  '/salary/70000-monthly-pay',
  '/salary/80000-after-tax',
]);

function hasAppPageForRoute(route: `/${string}`): boolean {
  const slug = route.slice(1);
  const candidates = [
    path.join(process.cwd(), 'src', 'app', slug, 'page.tsx'),
    path.join(process.cwd(), 'src', 'app', slug, 'page.ts'),
    path.join(process.cwd(), 'app', slug, 'page.tsx'),
    path.join(process.cwd(), 'app', slug, 'page.ts'),
  ];
  return candidates.some((p) => fs.existsSync(p));
}

function collectStaticAppRoutes(): `/${string}`[] {
  const routes = new Set<`/${string}`>();

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('_')) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith('[') || entry.name.startsWith('(')) continue;
        walk(fullPath);
        continue;
      }

      if (entry.name !== 'page.tsx' && entry.name !== 'page.ts') continue;

      const relativeDir = path.relative(APP_DIR, path.dirname(fullPath));
      const route = relativeDir === '' ? '/' : (`/${relativeDir.split(path.sep).join('/')}` as `/${string}`);
      if (!EXCLUDED_STATIC_ROUTES.has(route)) {
        routes.add(route);
      }
    }
  }

  walk(APP_DIR);
  return Array.from(routes).sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();
  const staticRoutes = collectStaticAppRoutes();
  
  const posts = getSortedPostsData();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const calculators = CALCULATOR_SPECS.filter((spec) => {
    if (!spec.route.endsWith('-calculator')) return false;
    if (EXCLUDED_STATIC_ROUTES.has(spec.route)) return false;
    if ('generated' in spec && spec.generated) return true;
    return hasAppPageForRoute(spec.route);
  }).map((spec) => spec.route);

  const calculatorUrls = calculators.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const staticPageUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? ('daily' as const) : ('monthly' as const),
    priority: route === '/' ? 1 : route.includes('blog/') ? 0.75 : 0.8,
  }));

  const entries: MetadataRoute.Sitemap = [
    ...staticPageUrls,
    ...calculatorUrls,
    ...blogUrls,
  ];

  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) unique.set(entry.url, entry);
  return Array.from(unique.values());
}
