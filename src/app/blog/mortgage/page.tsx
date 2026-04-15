import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { getSortedPostsData } from '@/lib/blog';
import { BLOG_CATEGORIES, normalizeBlogCategory } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbListJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Mortgage Guides, Home Buying and Refinance Tips | Calcida',
  description: 'Expert mortgage articles covering affordability, PMI, rates, refinancing, and closing costs. Make smarter housing decisions with Calcida.',
  canonicalPath: '/blog/mortgage',
});

export default async function MortgageBlogCategoryPage() {
  const category = BLOG_CATEGORIES.find((c) => c.slug === 'mortgage')!;
  const posts = getSortedPostsData().filter((p) => normalizeBlogCategory(p.category) === 'mortgage');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      headline: `${category.name} Learning Center`,
      description: category.description,
      url: `${getSiteUrl()}/blog/mortgage`,
    },
    breadcrumbListJsonLd({
      items: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: category.name, path: `/blog/mortgage` },
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
          <Link href="/mortgage-calculators" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 inline-flex items-center gap-2 whitespace-nowrap">
            Mortgage Hub <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>

        {/* Category Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
             <h3 className="font-bold text-blue-900 mb-2">Home Buying</h3>
             <p className="text-sm text-blue-800/80">Expert breakdowns of closing costs, down payments, and credit scores.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
             <h3 className="font-bold text-green-900 mb-2">Loan Strategy</h3>
             <p className="text-sm text-green-800/80">Comparing 15 vs 30 year terms, ARM vs Fixed, and bi-weekly schedules.</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
             <h3 className="font-bold text-purple-900 mb-2">Refinancing</h3>
             <p className="text-sm text-purple-800/80">Objective analysis of when to switch your loan to save on interest.</p>
          </div>
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

        {/* Bottom Hub Linking */}
        <div className="mt-20 p-10 bg-gray-50 border border-gray-100 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Run the Numbers</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Theory is good, but math is better. Use our specialized mortgage calculators to model your exact house-buying scenario.</p>
          <div className="flex flex-wrap justify-center gap-3">
             <Link href="/mortgage-payment-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Payment Estimator</Link>
             <Link href="/mortgage-amortization-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Amortization Table</Link>
             <Link href="/pmi-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">PMI Calculator</Link>
             <Link href="/refinance-calculator" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-blue-500 transition-colors">Refinance Simulator</Link>
          </div>
        </div>
      </div>
    </>
  );
}
