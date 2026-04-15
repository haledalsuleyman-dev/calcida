import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { getSortedPostsData } from '@/lib/blog';
import { BLOG_CATEGORIES, normalizeBlogCategory } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbListJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Retirement Guides, 401k and FIRE Strategy Tips | Calcida',
  description: 'Expert retirement articles on 401k plans, social security, withdrawal rates, and FIRE. Plan your long-term independence with Calcida.',
  canonicalPath: '/blog/retirement',
});

export default async function RetirementBlogCategoryPage() {
  const category = BLOG_CATEGORIES.find((c) => c.slug === 'retirement')!;
  const posts = getSortedPostsData().filter((p) => normalizeBlogCategory(p.category) === 'retirement');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      headline: `Retirement Planning and Independence Guides`,
      description: category.description,
      url: `${getSiteUrl()}/blog/retirement`,
    },
    breadcrumbListJsonLd({
      items: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: category.name, path: `/blog/retirement` },
      ]
    })
  ];

  return (
    <>
      {schema.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Link href="/blog" className="text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest mb-4 inline-block">
              &larr; Financial Library
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{category.name} Guides</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{category.description}</p>
          </div>
          <Link href="/retirement-calculators" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 inline-flex items-center gap-2 whitespace-nowrap">
            Retirement Hub <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">{post.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400">{post.date}</span>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-bold text-sm hover:underline">
                  Read Full Guide →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 p-10 bg-gray-50 border border-gray-100 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan for Permanence</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Model your 401k growth, estimate social security, and find your financial independence number with our professional retirement tools.</p>
          <div className="flex flex-wrap justify-center gap-3">
             <Link href="/401k-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">401k Simulator</Link>
             <Link href="/retirement-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Retirement Match</Link>
             <Link href="/fire-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">FIRE Number</Link>
             <Link href="/social-security-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Social Security</Link>
          </div>
        </div>
      </div>
    </>
  );
}
