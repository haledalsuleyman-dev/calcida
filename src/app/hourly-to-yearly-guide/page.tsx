import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';
import { hourlyToYearData, formatUSD, formatUSD2 } from '@/data/hourlyToYear';
import { SEOInternalLinkingWidget } from '@/components/content/SEOInternalLinkingWidget';

export const metadata: Metadata = {
  title: 'Hourly to Yearly Pay Guide',
  description: 'Convert hourly wages to annual salaries. Complete chart from $10/hr to $200/hr. Find your yearly income.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/hourly-to-yearly-guide',
  },
  openGraph: {
    title: 'Hourly to Yearly Pay Guide',
    description: 'Convert hourly wages to annual salaries. Complete chart from $10/hr to $200/hr.',
    url: '/hourly-to-yearly-guide',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hourly to Yearly Pay Guide",
  "description": "Comprehensive chart converting hourly wages from $10/hr to $200/hr into annual salaries.",
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

export default function HourlyGuideHub() {
  return (
    <>
      <JsonLd data={[jsonLd]} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Hourly to Yearly Pay Guide</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            Need to know exactly how much your hourly wage is per year? Use this complete guide to convert any hourly rate from <strong>$10/hr to $200/hr</strong> into an annual salary.
          </p>
          <p className="mb-8">
            All calculations assume a standard <strong>40-hour work week</strong> and <strong>52 paid weeks</strong> per year (2,080 hours total).
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Hourly Conversion Chart</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hourlyToYearData.map((item) => (
                <Link 
                  key={item.hourly} 
                  href={`/${item.hourly}-an-hour-is-how-much-a-year`}
                  className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm group"
                >
                  <div className="font-bold text-gray-900 group-hover:text-blue-600">
                    {formatUSD2(item.hourly)} / hr
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {formatUSD(item.hourly * 2080)} / yr
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-10 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <h3 className="text-xl font-bold mb-3 text-blue-900">Need a Custom Calculation?</h3>
            <p className="mb-4">If your hourly rate isn't listed or you work different hours, use our calculator:</p>
            <div className="flex justify-center">
              <Link href="/hourly-to-salary-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Open Hourly Calculator
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
