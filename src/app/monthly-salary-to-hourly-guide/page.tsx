import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';
import { SEOInternalLinkingWidget } from '@/components/content/SEOInternalLinkingWidget';
import { monthlyToHourlyData } from '@/data/monthlyToHourly';
import { formatUSD, formatUSD2 } from '@/data/hourlyToYear';

export const metadata: Metadata = {
  title: 'Monthly Salary to Hourly Wage Guide',
  description: 'Convert monthly salary to hourly wage. Complete chart from $1,000/mo to $20,000/mo. Find your hourly rate.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/monthly-salary-to-hourly-guide',
  },
  openGraph: {
    title: 'Monthly Salary to Hourly Wage Guide',
    description: 'Convert monthly salary to hourly wage. Complete chart from $1,000/mo to $20,000/mo.',
    url: '/monthly-salary-to-hourly-guide',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Monthly Salary to Hourly Wage Guide",
  "description": "Comprehensive chart converting monthly salaries from $1,000 to $20,000 into hourly wages.",
  "author": {
    "@type": "Organization",
    "name": "Calcida Financial Research Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Calcida",
    "logo": {
      "@type": "ImageObject",
      "url": `${getSiteUrl()}/logo.png`
    }
  }
};

export default function MonthlyGuideHub() {
  return (
    <>
      <JsonLd data={[jsonLd]} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Monthly Salary to Hourly Wage Guide</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            If you know your monthly income but want to know your hourly rate, use this guide. We cover monthly salaries ranging from <strong>$1,000 to $20,000</strong>.
          </p>
          <p className="mb-8">
            These conversions assume a standard <strong>173.3-hour work month</strong> (40 hours/week × 52 weeks ÷ 12 months).
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Monthly Conversion Chart</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {monthlyToHourlyData.map((item) => (
                <Link 
                  key={item.monthly} 
                  href={`/${item.monthly}-a-month-is-how-much-an-hour`}
                  className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm group"
                >
                  <div className="font-bold text-gray-900 group-hover:text-blue-600">
                    {formatUSD(item.monthly)} / mo
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {formatUSD2((item.monthly * 12) / 2080)} / hr
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-10 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <h3 className="text-xl font-bold mb-3 text-blue-900">Calculators</h3>
            <div className="flex justify-center gap-4">
              <Link href="/salary-to-hourly-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Salary Calculator
              </Link>
            </div>
          </div>

          <SEOInternalLinkingWidget />
          <AuthorBlock />
          <SourcesBlock />
          <DisclaimerBlock />
        </div>
      </div>
    </>
  );
}
