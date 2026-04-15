import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { getSortedPostsData } from '@/lib/blog';
import { BLOG_CATEGORIES, normalizeBlogCategory } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbListJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Tax Guides, Brackets and Effective Rate Tips | Calcida',
  description: 'Expert tax articles on federal brackets, self-employment tax, capital gains, and effective rates. Minimize your burden with Calcida.',
  canonicalPath: '/blog/taxes',
});

export default async function TaxesBlogCategoryPage() {
  const category = BLOG_CATEGORIES.find((c) => c.slug === 'taxes')!;
  const posts = getSortedPostsData().filter((p) => normalizeBlogCategory(p.category) === 'taxes');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      headline: `Tax Planning and Optimization Guides`,
      description: category.description,
      url: `${getSiteUrl()}/blog/taxes`,
    },
    breadcrumbListJsonLd({
      items: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: category.name, path: `/blog/taxes` },
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
          <Link href="/tax-calculators" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 inline-flex items-center gap-2 whitespace-nowrap">
            Tax Hub <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Minimize Your Tax Bill</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">See how federal and state taxes impact your net income. Model capital gains, self-employment taxes, and your effective rate.</p>
          <div className="flex flex-wrap justify-center gap-3">
             <Link href="/income-tax-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Income Tax</Link>
             <Link href="/tax-bracket-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Tax Brackets</Link>
             <Link href="/capital-gains-tax-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Capital Gains</Link>
             <Link href="/self-employment-tax-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">1099 Tax Tool</Link>
          </div>
        </div>
      </div>
    </>
  );
}
