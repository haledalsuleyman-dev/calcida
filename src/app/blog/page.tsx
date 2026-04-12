import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { Metadata } from 'next';
import { BLOG_CATEGORIES, normalizeBlogCategory, type BlogCategorySlug } from '@/lib/blogCategories';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Personal Finance Blog, Mortgage and Salary Guides',
  description: 'Read Calcida articles on personal finance, mortgages, taxes, retirement planning, salary conversions, and practical money decisions.',
  canonicalPath: '/blog',
});

export default function BlogIndex({ searchParams }: { searchParams?: { category?: string } }) {
  const posts = getSortedPostsData();
  const activeCategory = normalizeBlogCategory(searchParams?.category) as BlogCategorySlug | null;
  const visible = activeCategory ? posts.filter((p) => normalizeBlogCategory(p.category) === activeCategory) : posts;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Latest Financial Insights</h1>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Expert advice to help you make smarter financial decisions.
      </p>

      <div className="mb-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/blog"
            className={`text-sm px-3 py-1 rounded-full border transition-colors ${!activeCategory ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            All
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog?category=${c.slug}`}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                activeCategory === c.slug ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          {BLOG_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/blog/${c.slug}`} className="text-blue-600 hover:underline font-medium">
              Browse {c.name} →
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/calculators" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
            View all calculators
          </Link>
          <Link href="/mortgage-calculators" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
            Mortgage calculators
          </Link>
          <Link href="/investment-calculators" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
            Investment calculators
          </Link>
          <Link href="/retirement-calculators" className="text-sm px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
            Retirement calculators
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{post.date}</div>
              <div className="mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
                  {normalizeBlogCategory(post.category)?.replace('-', ' ') ?? post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.description}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                Read more &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
