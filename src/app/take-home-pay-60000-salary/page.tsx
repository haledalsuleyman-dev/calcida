import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';

export const metadata: Metadata = {
  title: `Take-Home Pay on a $60,000 Salary (${new Date().getFullYear()} Breakdown)`,
  description: 'Exactly how much is a $60,000 salary after taxes? See monthly, biweekly, and weekly take-home pay estimates.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/take-home-pay-60000-salary',
  },
  openGraph: {
    title: 'Take-Home Pay on a $60,000 Salary',
    description: 'See your true net income on a $60k salary after Federal, State, and FICA taxes.',
    url: '/take-home-pay-60000-salary',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Take-Home Pay on a $60,000 Salary",
  "description": "Comprehensive guide to understanding net income on a $60,000 annual salary.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is $60,000 a year monthly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gross monthly pay is $5,000. Net (take-home) monthly pay is typically between $3,700 and $4,100 depending on your state."
      }
    },
    {
      "@type": "Question",
      "name": "How much tax do I pay on $60k?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You will pay approximately $4,590 in FICA taxes (Social Security & Medicare) plus $4,500-$5,500 in Federal Income Tax. State taxes vary by location."
      }
    }
  ]
};

export default function TakeHome60kPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Take-Home Pay on a $60,000 Salary</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            Earning <strong>$60,000 a year</strong> is a strong income milestone, providing a solid middle-class foundation in many parts of the country. However, as anyone who has received their first full-time paycheck knows, your actual bank deposit will be noticeably lower than $5,000 a month. After federal income taxes, FICA deductions (Social Security and Medicare), and state taxes, your true spending power looks quite different. 
          </p>
          <p className="mb-8">
            If you want to quickly see how this maps to hourly wages, use our <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline">salary to hourly calculator</Link>. Otherwise, let's break down exactly where the money goes so you can budget accurately.
          </p>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Your Estimated Paycheck</h2>
            <p className="text-sm text-gray-600 mb-4">Based on a single filer with standard deduction (calculate yours with our <Link href="/paycheck-calculator" className="text-blue-600 hover:underline">paycheck calculator</Link>):</p>
            <ul className="space-y-3 text-lg">
              <li className="flex justify-between border-b border-green-200 pb-2">
                <span>Gross Pay (Monthly):</span>
                <span className="font-bold">$5,000</span>
              </li>
              <li className="flex justify-between border-b border-green-200 pb-2 text-red-600">
                <span>Federal Tax (Est):</span>
                <span>-$450</span>
              </li>
              <li className="flex justify-between border-b border-green-200 pb-2 text-red-600">
                <span>FICA Tax (7.65%):</span>
                <span>-$382</span>
              </li>
              <li className="flex justify-between pt-2">
                <span><strong>Net Pay (Take-Home):</strong></span>
                <span className="font-bold text-green-800">~$4,168</span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">*Does not include state tax, health insurance, or 401k.</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Where Does the Money Go?</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900">FICA (7.65%)</h3>
              <p>This is mandatory for everyone. It funds Social Security (6.2%) and Medicare (1.45%). On $60k, this is <strong>$4,590 per year</strong>.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900">Federal Income Tax</h3>
              <p>Because of the standard deduction (approx. $15,000 for single filers depending on the year), you only pay federal income tax on about $45,000 of your income. This keeps your effective tax rate lower than you might think, anchoring most of your money in the 10% and 12% marginal brackets. Learn more about <Link href="/blog/how-us-tax-brackets-work" className="text-blue-600 hover:underline">how US tax brackets actually work</Link>.</p>
            </div>
          </div>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">Calculate Your Exact Paycheck</h3>
            <p className="mb-4">Add your state tax, 401k, and insurance to get a perfect number:</p>
            <div className="flex justify-center">
              <Link href="/take-home-pay-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Open Take-Home Calculator
              </Link>
            </div>
          </div>

          <AuthorBlock />
          <SourcesBlock />
          <DisclaimerBlock />
        </div>
      </div>
    </>
  );
}