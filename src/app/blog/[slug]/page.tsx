import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { pageMetadata } from '@/lib/seo';
import { getCalculatorSuggestionsForBlog } from '@/lib/internalLinking';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { faqPageJsonLd, breadcrumbListJsonLd, blogPostingJsonLd } from '@/lib/jsonld';
import { BlogCTA } from '@/components/content/BlogCTA';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';
import { AdSlot } from '@/components/ads/AdSlot';

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

  const schema = [
    blogPostingJsonLd({
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.lastUpdated,
      urlPath: `/blog/${slug}`,
    }),
    breadcrumbListJsonLd({
      items: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.category, path: `/blog/${post.category.toLowerCase()}` },
        { name: post.title, path: `/blog/${slug}` },
      ],
    }),
  ];

  // Dynamically suggest calculators based on blog category + keywords
  const suggestedCalculators = getCalculatorSuggestionsForBlog(
    post.category,
    post.keywords ?? [],
  );

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

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

      <AdSlot id="blog-after-header" type="horizontal" className="mb-10" />

      <div className="prose prose-blue prose-lg max-w-none mb-12">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <AdSlot id="blog-after-content" type="horizontal" className="my-12" />

      <AuthorBlock />
      <SourcesBlock />
      <DisclaimerBlock />

      <BlogCTA category={post.category} />

      <AdSlot id="blog-before-tools" type="horizontal" className="my-16" />

      <hr className="my-12 border-gray-200" />

      {/* Suggested Tools Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Decision Support</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {suggestedCalculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{calc.name}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{calc.reason}</p>
              <span className="text-blue-600 font-bold text-sm flex items-center gap-1">
                Open Calculator <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M3 12h18"></path></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        
        {/* Related articles */}
        {post.relatedArticles && post.relatedArticles.length > 0 && (
             <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Keep Reading</h3>
                <ul className="space-y-4">
                    {post.relatedArticles.map((articleSlug) => {
                        const title = articleSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return (
                            <li key={articleSlug}>
                                <Link href={`/blog/${articleSlug}`} className="text-blue-600 hover:underline font-semibold block leading-tight">
                                    {title}
                                </Link>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Related Guide</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )}

        {/* Directory Link */}
        <div className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-3 italic text-blue-400">Next Steps</h3>
            <p className="text-gray-400 text-sm mb-6">Explore our full directory of financial planning tools to build your custom wealth map.</p>
            <Link href="/calculators" className="text-white font-bold hover:text-blue-400 flex items-center gap-2">
                All 100+ Financial Calculators <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
        </div>

      </div>

      <div className="mt-10 pt-10 border-t border-gray-100 flex items-center justify-between">
        <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold tracking-tight">
            &larr; BACK TO LIBRARY
        </Link>
        <Link href={`/blog/${post.category}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold tracking-tight uppercase">
            {post.category} HUB &rarr;
        </Link>
      </div>

    </article>

  );
}
