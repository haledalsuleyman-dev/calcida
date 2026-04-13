import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Calculator, DollarSign, Home, Briefcase, TrendingUp, CreditCard } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { getSortedPostsData } from '@/lib/blog';
import { faqPageJsonLd } from '@/lib/jsonld';

const currentYear = new Date().getFullYear();

export const metadata: Metadata = pageMetadata({
  title: 'Free Financial Calculators — Mortgage, Loan & Salary Tools',
  description: `Free financial calculators for mortgages, loans, salary, taxes & retirement. Updated for ${currentYear}. Instant results, no sign-up required.`,
  canonicalPath: '/',
});

const popularCalculators = [
  {
    name: "Mortgage Payment",
    description: "Estimate monthly payments with taxes & insurance.",
    href: "/mortgage-payment-calculator",
    icon: Home
  },
  {
    name: "Auto Loan",
    description: "Calculate car payments and total interest.",
    href: "/auto-loan-calculator",
    icon: Calculator
  },
  {
    name: "Salary to Hourly",
    description: "Convert your annual salary to an hourly wage.",
    href: "/salary-to-hourly-calculator",
    icon: DollarSign
  },
  {
    name: "Net Worth",
    description: "Calculate your total assets minus liabilities.",
    href: "/net-worth-calculator",
    icon: TrendingUp
  },
  {
    name: "Debt Payoff",
    description: "Compare payoff strategies and save on interest.",
    href: "/debt-payoff-calculator",
    icon: CreditCard
  },
  {
    name: "401k Growth",
    description: "Project your retirement savings over time.",
    href: "/401k-calculator",
    icon: TrendingUp
  },
  {
    name: "Credit Card Payoff",
    description: "See how long to pay off your balance.",
    href: "/credit-card-payoff-calculator",
    icon: CreditCard
  },
  {
    name: "Paycheck Calculator",
    description: "Calculate your take-home pay after taxes.",
    href: "/paycheck-calculator",
    icon: Briefcase
  }
];

const categories = [
  { name: "Mortgage", href: "/mortgage", icon: Home },
  { name: "Loans", href: "/loan", icon: Calculator },
  { name: "Salary", href: "/salary", icon: DollarSign },
  { name: "Retirement", href: "/retirement", icon: TrendingUp },
  { name: "Credit Cards", href: "/credit-card", icon: CreditCard },
  { name: "Taxes", href: "/tax", icon: Briefcase },
];

const HOME_FAQ = [
  {
    question: "Are these financial calculators free?",
    answer: "Yes. Every calculator on Calcida is completely free to use. No sign-up, no subscription, and no hidden fees.",
  },
  {
    question: "How accurate are the results?",
    answer: `All calculators use standard financial formulas and are updated with ${currentYear} tax brackets, IRS limits, and current rates. Results are accurate for planning purposes; for complex tax situations consult a qualified advisor.`,
  },
  {
    question: "Which calculator should I use first?",
    answer: "Start with the calculator that matches your most pressing question — mortgage payment for home buyers, paycheck calculator for salary planning, or 401(k) calculator for retirement. Each page includes related tools to guide your next step.",
  },
  {
    question: "Do the calculators work on mobile?",
    answer: "Yes. All calculators are fully responsive and work on any device — phone, tablet, or desktop.",
  },
  {
    question: "How often is the data updated?",
    answer: `Tax data, contribution limits, and rate assumptions are reviewed and updated at the start of each tax year. The current data reflects ${currentYear} figures.`,
  },
];

export default async function HomePage() {
  const recentPosts = getSortedPostsData().slice(0, 4);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Homepage FAQPage schema — triggers People Also Ask */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(HOME_FAQ)) }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          {/* Trust signal pill */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Updated for {currentYear} — Free &amp; No Sign-Up Required
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Free Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Mortgage, loan, salary, tax &amp; retirement calculators. Get instant answers to make smarter money decisions.
          </p>
          
          <form action="/calculators" method="get" className="max-w-md mx-auto relative">
            <input
              type="text"
              name="q"
              placeholder="Search calculators (e.g. mortgage, auto loan)..."
              className="w-full px-6 py-4 pr-28 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link href="/calculators">
              <Button size="lg">Browse All Calculators</Button>
            </Link>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <Link href="/mortgage-calculators" className="hover:text-blue-600 hover:underline">Mortgage</Link>
              <Link href="/loan-calculators" className="hover:text-blue-600 hover:underline">Loans</Link>
              <Link href="/salary-calculators" className="hover:text-blue-600 hover:underline">Salary</Link>
              <Link href="/retirement-calculators" className="hover:text-blue-600 hover:underline">Retirement</Link>
              <Link href="/investment-calculators" className="hover:text-blue-600 hover:underline">Investing</Link>
              <Link href="/budget-calculators" className="hover:text-blue-600 hover:underline">Budgeting</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / social-proof bar */}
      <section className="bg-white border-y border-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-extrabold text-blue-600">50+</div>
              <div className="text-sm text-gray-500 mt-0.5">Free Calculators</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-600">8</div>
              <div className="text-sm text-gray-500 mt-0.5">Financial Categories</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-600">{currentYear}</div>
              <div className="text-sm text-gray-500 mt-0.5">Tax Data</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-600">$0</div>
              <div className="text-sm text-gray-500 mt-0.5">No Cost, Ever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Popular Calculators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-gray-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <calc.icon size={24} />
                    </div>
                    <CardTitle className="text-xl mb-2">{calc.name}</CardTitle>
                    <CardDescription>{calc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Calculators */}
      <section className="py-16 bg-blue-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">New & High Demand</h2>
            <Link href="/calculators" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
              View All <Calculator size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "ROI Calculator", href: "/roi-calculator", desc: "Calculate investment efficiency" },
              { name: "Inflation Calculator", href: "/inflation-calculator", desc: "Buying power over time" },
              { name: "Emergency Fund", href: "/emergency-fund-calculator", desc: "Plan your safety net" },
              { name: "Loan Comparison", href: "/loan-comparison-calculator", desc: "Compare two loans side-by-side" },
            ].map((calc) => (
              <Link 
                key={calc.href} 
                href={calc.href}
                className="bg-white p-5 rounded-xl border border-blue-100 hover:border-blue-400 transition-colors shadow-sm"
              >
                <h3 className="font-bold text-blue-900 mb-1">{calc.name}</h3>
                <p className="text-xs text-gray-500">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="block group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow h-full flex flex-col items-center justify-center gap-3">
                  <cat.icon className="text-gray-500 group-hover:text-blue-600 transition-colors" size={32} />
                  <span className="font-semibold text-gray-900">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Features */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
               <div>
                   <div className="text-4xl font-bold text-blue-600 mb-2">Fast</div>
                   <p className="text-gray-600">Instant results without page reloads.</p>
               </div>
               <div>
                   <div className="text-4xl font-bold text-blue-600 mb-2">Accurate</div>
                   <p className="text-gray-600">Updated with {currentYear} tax brackets and rates.</p>
               </div>
               <div>
                   <div className="text-4xl font-bold text-blue-600 mb-2">Free</div>
                   <p className="text-gray-600">No sign-up required. Always free to use.</p>
               </div>
           </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Financial Guides</h2>
                <p className="text-gray-500 mt-1 text-sm">In-depth articles to help you make better money decisions.</p>
              </div>
              <Link href="/blog" className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-1">
                All Articles →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug mb-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Homepage FAQ — triggers "People Also Ask" in Google */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {HOME_FAQ.map((item) => (
              <details
                key={item.question}
                className="group border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex justify-between items-center p-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 list-none">
                  {item.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform ml-4 shrink-0">▾</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
