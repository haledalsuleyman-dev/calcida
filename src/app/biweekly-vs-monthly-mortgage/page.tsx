import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { AuthorBlock, DisclaimerBlock, SourcesBlock } from '@/components/content/AuthorBlock';

export const metadata: Metadata = {
  title: 'Biweekly vs Monthly Mortgage Payments: Which is Better?',
  description: 'Compare biweekly vs monthly mortgage payments. See how paying every two weeks saves thousands in interest and pays off your loan faster.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/biweekly-vs-monthly-mortgage',
  },
  openGraph: {
    title: 'Biweekly vs Monthly Mortgage Payments',
    description: 'The math battle: Biweekly vs Monthly payments. Who wins?',
    url: '/biweekly-vs-monthly-mortgage',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Biweekly vs Monthly Mortgage Payments: Which is Better?",
  "description": "In-depth comparison of mortgage repayment strategies to save interest.",
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
      "name": "Do biweekly mortgage payments save money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. By making 26 half-payments a year (instead of 12 full ones), you effectively make 13 monthly payments annually. This extra payment goes directly to principal, saving thousands in interest."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a downside to biweekly mortgage payments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The only downside is if your lender charges a fee to set it up. You can achieve the same result for free by dividing your monthly payment by 12 and adding that amount as 'Principal Only' to your monthly check."
      }
    }
  ]
};

export default function BiweeklyVsMonthlyPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Biweekly vs Monthly Mortgage Payments: Which is Better?</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            The standard way to pay a mortgage is once a month. But the <strong>smart</strong> way to pay a mortgage is biweekly. Use our <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline">mortgage payment calculator</Link> to check your current monthly rate.
          </p>
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Quick Comparison: Biweekly Wins</h2>
            <ul className="space-y-3 text-lg">
              <li className="flex justify-between border-b border-green-200 pb-2">
                <span>Monthly Plan:</span>
                <span className="font-bold">12 Payments/Year</span>
              </li>
              <li className="flex justify-between border-b border-green-200 pb-2">
                <span>Biweekly Plan:</span>
                <span className="font-bold">26 Half-Payments/Year</span>
              </li>
              <li className="flex justify-between border-b border-green-200 pb-2 text-green-700">
                <span>Effect:</span>
                <span className="font-bold">1 Extra Payment/Year</span>
              </li>
              <li className="flex justify-between pt-2">
                <span><strong>Interest Saved:</strong></span>
                <span className="font-bold text-green-800">$30,000 - $80,000+</span>
              </li>
            </ul>
          </div>

          <p className="mb-8">
            Switching to a biweekly schedule is one of the easiest "hacks" in personal finance. It requires almost no extra effort but can knock 5-6 years off your mortgage.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Monthly Plan</h3>
              <p className="text-sm mb-4">12 payments per year.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Standard option.</li>
                <li>Takes full 30 years to pay off.</li>
                <li>Maximum interest paid.</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-900 text-lg mb-2">Biweekly Plan</h3>
              <p className="text-sm mb-4">26 half-payments per year.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Equals 13 monthly payments/year.</li>
                <li>Pays off in ~24 years.</li>
                <li>Saves ~$50k+ in interest.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The Math Example</h2>
          <p>
            Loan: <strong>$300,000</strong> at <strong>6.5%</strong> (30 Years). See how extra payments affect this with our <Link href="/extra-payment-mortgage-calculator" className="text-blue-600 hover:underline">extra payment mortgage calculator</Link>.
          </p>
          <table className="min-w-full bg-white border border-gray-300 text-sm my-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Strategy</th>
                <th className="py-2 px-4 border-b text-left">Total Interest</th>
                <th className="py-2 px-4 border-b text-left">Years to Pay Off</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Monthly</td>
                <td className="py-2 px-4 border-b">$382,000</td>
                <td className="py-2 px-4 border-b">30 Years</td>
              </tr>
              <tr className="font-bold bg-green-50 text-green-900">
                <td className="py-2 px-4 border-b">Biweekly</td>
                <td className="py-2 px-4 border-b">$305,000</td>
                <td className="py-2 px-4 border-b">24 Years</td>
              </tr>
            </tbody>
          </table>
          <p className="text-center font-bold text-green-800 my-4">
            Savings: $77,000 in Interest!
          </p>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">Run Your Own Numbers</h3>
            <p className="mb-4">See how much time you can save on your specific loan:</p>
            <div className="flex justify-center">
              <Link href="/biweekly-mortgage-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Biweekly Calculator
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
