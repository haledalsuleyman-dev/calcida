import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Take-Home Pay Explained: Gross vs Net Income',
  description: 'Why is your paycheck so small? We explain taxes, FICA, and deductions that reduce your take-home pay.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/take-home-pay-explained',
  },
  openGraph: {
    title: 'Take-Home Pay Explained',
    description: 'Understanding the difference between your salary offer and your actual paycheck.',
    url: '/take-home-pay-explained',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Take-Home Pay Explained",
  "description": "Detailed guide on paycheck deductions, taxes, and net income calculation.",
  "author": {
    "@type": "Organization",
    "name": "Calcida"
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
      "name": "What is the difference between gross and net pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gross pay is your total salary before any deductions. Net pay is the actual amount deposited into your bank account after taxes and benefits are removed."
      }
    },
    {
      "@type": "Question",
      "name": "What is FICA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FICA stands for Federal Insurance Contributions Act. It is a mandatory 7.65% tax deducted from your paycheck to fund Social Security and Medicare."
      }
    }
  ]
};

export default function TakeHomePayExplainedPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Take-Home Pay Explained: Why is My Check So Small?</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            You signed an offer letter for $60,000. You did the math: $60,000 / 12 months = $5,000. (Verify this with our <Link href="/paycheck-calculator" className="text-blue-600 hover:underline">paycheck calculator</Link>).
          </p>
          <p className="mb-8">
            But when your first direct deposit hits, it's only <strong>$3,800</strong>. Panic sets in. Where did the other $1,200 go?
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The "Waterfall" of Deductions</h2>
          <p>
            Your money passes through several filters before it reaches you. Here is the order:
          </p>

          <div className="space-y-4 my-8">
            <div className="border-l-4 border-gray-300 pl-4 py-2">
              <h3 className="font-bold text-gray-900">1. Gross Pay</h3>
              <p className="text-sm">Your total salary. (The number you brag about).</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-bold text-green-700">2. Pre-Tax Deductions</h3>
              <p className="text-sm">Money taken out <em>before</em> taxes are calculated.</p>
              <ul className="list-disc pl-5 text-sm mt-1">
                <li>401(k) Contributions</li>
                <li>Health Insurance Premiums</li>
                <li>HSA / FSA Contributions</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h3 className="font-bold text-red-700">3. Taxes (The Big Hit)</h3>
              <p className="text-sm">Mandatory government cuts.</p>
              <ul className="list-disc pl-5 text-sm mt-1">
                <li><strong>Federal Income Tax:</strong> 10% - 37% (Progressive)</li>
                <li><strong>State Income Tax:</strong> 0% - 13% (Depends on location)</li>
                <li><strong>FICA:</strong> 7.65% (Social Security & Medicare)</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-bold text-yellow-700">4. Post-Tax Deductions</h3>
              <p className="text-sm">Garnishments, Roth 401(k), or Union Dues.</p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50">
              <h3 className="font-bold text-blue-900">5. Net Pay (Take-Home)</h3>
              <p className="text-sm font-bold">The money you actually get.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Real World Example</h2>
          <p>
            Let's look at a single person in <strong>Texas</strong> (No state tax!) making <strong>$60,000</strong>. Use our <Link href="/after-tax-income-calculator" className="text-blue-600 hover:underline">after tax income calculator</Link> to see how state taxes affect you.
          </p>
          <table className="min-w-full bg-white border border-gray-300 text-sm my-6">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-bold">Gross Monthly Pay</td>
                <td className="p-3 text-right font-bold">$5,000</td>
              </tr>
              <tr className="border-b text-red-600">
                <td className="p-3 pl-6">Federal Tax (Est)</td>
                <td className="p-3 text-right">-$450</td>
              </tr>
              <tr className="border-b text-red-600">
                <td className="p-3 pl-6">FICA (7.65%)</td>
                <td className="p-3 text-right">-$382</td>
              </tr>
              <tr className="border-b text-green-600">
                <td className="p-3 pl-6">Health Insurance (Avg)</td>
                <td className="p-3 text-right">-$150</td>
              </tr>
              <tr className="border-b text-green-600">
                <td className="p-3 pl-6">401k (5%)</td>
                <td className="p-3 text-right">-$250</td>
              </tr>
              <tr className="bg-blue-50 font-bold text-lg">
                <td className="p-3">Net Pay Check</td>
                <td className="p-3 text-right">$3,768</td>
              </tr>
            </tbody>
          </table>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">Check Your Own Paycheck</h3>
            <p className="mb-4">Don't guess. Use our calculator to see your exact deductions:</p>
            <div className="flex justify-center">
              <Link href="/take-home-pay-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Take-Home Pay Calculator
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How to Increase Take-Home Pay</h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li><strong>Adjust W-4:</strong> If you get a huge refund every year, you are overpaying taxes monthly. Adjust your W-4 to keep more money now.</li>
            <li><strong>Pre-Tax Benefits:</strong> Using an HSA or FSA lowers your taxable income, saving you money on taxes overall.</li>
            <li><strong>Move States:</strong> Moving from California to Nevada (0% income tax) is effectively a 5-10% raise.</li>
          </ul>
        </div>
      </div>
    </>
  );
}