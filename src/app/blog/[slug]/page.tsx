import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { pageMetadata } from '@/lib/seo';
import { getCalculatorSuggestionsForBlog } from '@/lib/internalLinking';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper to get calculator name from path
const getCalculatorName = (path: string) => {
  const calculators: Record<string, string> = {
    '/mortgage-payment-calculator': 'Mortgage Payment Calculator',
    '/mortgage-amortization-calculator': 'Mortgage Amortization Calculator',
    '/biweekly-mortgage-calculator': 'Biweekly Mortgage Calculator',
    '/extra-payment-mortgage-calculator': 'Extra Payment Mortgage Calculator',
    '/refinance-calculator': 'Refinance Calculator',
    '/paycheck-calculator': 'Paycheck Calculator',
    '/salary-to-hourly-calculator': 'Salary to Hourly Calculator',
    '/hourly-to-salary-calculator': 'Hourly to Salary Calculator',
    '/after-tax-income-calculator': 'After-Tax Income Calculator',
    '/take-home-pay-calculator': 'Take-Home Pay Calculator',
  };
  return calculators[path] || path.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    canonicalPath: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.lastUpdated || post.date,
  });
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostData(slug);
  const baseUrl = getSiteUrl();
  const mdxComponents = {
    h1: (props: React.ComponentProps<'h1'>) => <h2 {...props} />,
  };

  if (!post) {
    notFound();
  }

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "url": `${baseUrl}/blog/${slug}`,
    "datePublished": post.date,
    "dateModified": post.lastUpdated || post.date,
    "author": {
      "@type": "Organization",
      "name": "Calcida",
      "url": baseUrl,
      "logo": { "@type": "ImageObject", "url": `${baseUrl}/icon.png` }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Calcida",
      "url": baseUrl,
      "logo": { "@type": "ImageObject", "url": `${baseUrl}/icon.png` }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`
    },
    ...(post.keywords && post.keywords.length > 0
      ? { "keywords": post.keywords.join(', ') }
      : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${baseUrl}/blog/${slug}`
      }
    ]
  };

  // Dynamically suggest calculators based on blog category + keywords
  const suggestedCalculators = getCalculatorSuggestionsForBlog(
    post.category,
    post.keywords ?? [],
  );

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <header className="mb-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                {post.category}
            </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">{post.title}</h1>
        <div className="text-gray-500 text-sm">
            Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {post.lastUpdated && (
                <span> • Updated on {new Date(post.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
        </div>
      </header>

      <div className="prose prose-blue prose-lg max-w-none mb-12">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <hr className="my-12 border-gray-200" />

      {/* Related Content Section */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Related Calculators */}
        {post.relatedCalculators && post.relatedCalculators.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Related Calculators</h3>
                <ul className="space-y-3">
                    {post.relatedCalculators.map((calcPath) => (
                        <li key={calcPath}>
                            <Link href={calcPath} className="text-blue-600 hover:underline font-medium flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                                {getCalculatorName(calcPath)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* Related Articles (Placeholder logic - ideally this would be dynamic, but frontmatter is manual) */}
        {post.relatedArticles && post.relatedArticles.length > 0 && (
             <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Related Articles</h3>
                <ul className="space-y-3">
                    {post.relatedArticles.map((articleSlug) => {
                        // In a real app we might fetch the title, but for now we format the slug
                        const title = articleSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return (
                            <li key={articleSlug}>
                                <Link href={`/blog/${articleSlug}`} className="text-blue-600 hover:underline font-medium block">
                                    {title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )}

      </div>

      {/* Dynamic calculator suggestions based on article topic */}
      {suggestedCalculators.length > 0 && (
        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Try These Calculators</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {suggestedCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="block p-3 bg-white border border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
              >
                <span className="font-semibold text-blue-700 block">{calc.name}</span>
                <span className="text-xs text-gray-500">{calc.reason}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium">
            &larr; Back to all articles
        </Link>
      </div>

    </article>
  );
}
