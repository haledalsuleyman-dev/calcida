import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';
import { SEOInternalLinkingWidget } from '@/components/content/SEOInternalLinkingWidget';
import { biweeklyToHourlyData } from '@/data/biweeklyToHourly';
import { formatUSD, formatUSD2 } from '@/data/hourlyToYear';

export const metadata: Metadata = {
  title: 'Biweekly Pay to Hourly Wage Guide',
  description: 'Convert biweekly paychecks to hourly wage. Complete chart from $500 to $10,000 every two weeks.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/biweekly-to-hourly-guide',
  },
  openGraph: {
    title: 'Biweekly Pay to Hourly Wage Guide',
    description: 'Convert biweekly paychecks to hourly wage. Complete chart from $500 to $10,000 every two weeks.',
    url: '/biweekly-to-hourly-guide',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Biweekly Pay to Hourly Wage Guide",
  "description": "Comprehensive chart converting biweekly pay from $500 to $10,000 into hourly wages.",
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

export default function BiweeklyGuideHub() {
  return (
    <>
      <JsonLd data={[jsonLd]} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Biweekly Pay to Hourly Wage Guide</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            If you get paid every two weeks and want to know your true hourly rate, this guide is for you. We cover biweekly paychecks ranging from <strong>$500 to $10,000</strong>.
          </p>
          <p className="mb-8">
            These conversions assume a standard <strong>80-hour work period</strong> (40 hours/week × 2 weeks).
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Biweekly Conversion Chart</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {biweeklyToHourlyData.map((item) => (
                <Link 
                  key={item.biweekly} 
                  href={`/${item.biweekly}-every-two-weeks-is-how-much-an-hour`}
                  className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm group"
                >
                  <div className="font-bold text-gray-900 group-hover:text-blue-600">
                    {formatUSD(item.biweekly)} / 2 wks
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {formatUSD2(item.biweekly / 80)} / hr
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-10 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <h3 className="text-xl font-bold mb-3 text-blue-900">Calculators</h3>
            <div className="flex justify-center gap-4">
              <Link href="/paycheck-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Paycheck Calculator
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
