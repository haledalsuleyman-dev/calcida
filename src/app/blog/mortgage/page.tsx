import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { getSortedPostsData } from '@/lib/blog';
import { BLOG_CATEGORIES, normalizeBlogCategory } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Mortgage Guides, Home Buying and Refinance Tips',
  description: 'Browse mortgage articles covering affordability, PMI, rates, refinancing, closing costs, and practical home buying decisions.',
  canonicalPath: '/blog/mortgage',
});

export default function MortgageBlogCategoryPage() {
  const category = BLOG_CATEGORIES.find((c) => c.slug === 'mortgage')!;
  const posts = getSortedPostsData().filter((p) => normalizeBlogCategory(p.category) === 'mortgage');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: `Blog: ${category.name}`,
    description: category.description,
    url: `${getSiteUrl()}/blog/mortgage`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
          <Link href="/blog" className="text-sm font-medium text-blue-600 hover:underline">
            ← All blog posts
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link href="/mortgage-calculators" className="text-sm px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100">
              Mortgage calculators
            </Link>
            <Link href="/mortgage-payment-calculator" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
              Mortgage payment
            </Link>
            <Link href="/mortgage-affordability-calculator" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
              Affordability
            </Link>
            <Link href="/pmi-calculator" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
              PMI
            </Link>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-3 text-gray-900">{category.name} Articles</h1>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl">{category.description}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold mb-3 text-gray-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

