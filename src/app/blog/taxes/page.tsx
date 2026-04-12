import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { getSortedPostsData } from '@/lib/blog';
import { BLOG_CATEGORIES, normalizeBlogCategory } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Tax Guides, Brackets and Capital Gains Tips',
  description: 'Browse tax articles on brackets, payroll taxes, capital gains, effective rates, and common filing concepts.',
  canonicalPath: '/blog/taxes',
});

export default function TaxesBlogCategoryPage() {
  const category = BLOG_CATEGORIES.find((c) => c.slug === 'taxes')!;
  const posts = getSortedPostsData().filter((p) => normalizeBlogCategory(p.category) === 'taxes');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: `Blog: ${category.name}`,
    description: category.description,
    url: `${getSiteUrl()}/blog/taxes`,
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
            <Link href="/tax" className="text-sm px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100">
              Tax calculators
            </Link>
            <Link href="/income-tax-calculator" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
              Income tax
            </Link>
            <Link href="/capital-gains-tax-calculator" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
              Capital gains
            </Link>
            <Link href="/effective-tax-rate-calculator" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
              Effective rate
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

