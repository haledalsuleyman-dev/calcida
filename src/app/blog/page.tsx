import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { Metadata } from 'next';
import { BLOG_CATEGORIES, normalizeBlogCategory, type BlogCategorySlug } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbListJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = pageMetadata({
  title: 'Financial Library & Personal Finance Guides | Calcida',
  description: 'Expert financial guides on mortgages, salary planning, taxes, and investing. Learn the math behind your money with Calcida.',
  canonicalPath: '/blog',
});

export default async function BlogIndex({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const posts = getSortedPostsData();
  const activeCategory = normalizeBlogCategory(category) as BlogCategorySlug | null;
  const visible = activeCategory ? posts.filter((p) => normalizeBlogCategory(p.category) === activeCategory) : posts;

  const breadcrumb = breadcrumbListJsonLd({
    items: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
          Financial <span className="text-blue-600">Library</span> & Guides
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The math behind your money, explained simply. Browse our expert guides to make smarter financial decisions for your home, career, and future.
        </p>
      </div>

      {/* Hero Category Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        {BLOG_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/${c.slug}`}
            className="flex flex-col items-center p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all group text-center shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {c.slug === 'mortgage' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              )}
              {c.slug === 'investing' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              )}
              {c.slug === 'retirement' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              )}
              {c.slug === 'salary' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              )}
              {c.slug === 'personal-finance' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              )}
              {c.slug === 'taxes' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              )}
            </div>
            <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">{c.name}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <main className="lg:w-2/3">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeCategory ? `Guides in ${activeCategory}` : 'Latest Insights'}
            </h2>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              {visible.length} Articles
            </div>
          </div>

          <div className="space-y-12">
            {visible.map((post) => (
              <article key={post.slug} className="group relative flex flex-col items-start">
                <div className="mb-4">
                  <Link 
                    href={`/blog/${normalizeBlogCategory(post.category)}`}
                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-tighter hover:bg-blue-100 transition-colors"
                  >
                    {normalizeBlogCategory(post.category)?.replace('-', ' ') ?? post.category}
                  </Link>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 group/link">
                    Read Guide 
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18"></path></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </span>
              Top Calculators
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Mortgage Payment', href: '/mortgage-payment-calculator' },
                { name: 'Paycheck & Take-Home', href: '/paycheck-calculator' },
                { name: 'Compound Interest', href: '/compound-interest-calculator' },
                { name: 'Income Tax Estimate', href: '/income-tax-calculator' },
                { name: 'Retirement Savings', href: '/retirement-calculator' },
              ].map((calc) => (
                <Link 
                  key={calc.href} 
                  href={calc.href} 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                >
                  <span className="text-gray-700 font-medium group-hover:text-blue-600">{calc.name}</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              ))}
            </div>
            <Link href="/calculators" className="mt-8 block text-center py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
              All 100+ Tools
            </Link>
          </div>

          <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-2xl shadow-blue-200 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-3 leading-tight text-white">Topical Hubs</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">Navigate our most comprehensive financial resource collections.</p>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/mortgage-calculators" className="bg-blue-700/50 hover:bg-blue-500 p-3 rounded-xl text-sm font-semibold transition-colors border border-blue-400/30">Mortgage & Home →</Link>
                <Link href="/salary-calculators" className="bg-blue-700/50 hover:bg-blue-500 p-3 rounded-xl text-sm font-semibold transition-colors border border-blue-400/30">Salary & Career →</Link>
                <Link href="/tax-calculators" className="bg-blue-700/50 hover:bg-blue-500 p-3 rounded-xl text-sm font-semibold transition-colors border border-blue-400/30">Tax Planning →</Link>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
