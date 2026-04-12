import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Biweekly Mortgage Savings: How to Save Thousands',
  description: 'See how switching to biweekly mortgage payments can save you thousands in interest and pay off your home years faster.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/biweekly-mortgage-savings',
  },
  openGraph: {
    title: 'Biweekly Mortgage Savings Explained',
    description: 'The math behind biweekly payments: 26 half-payments equals one extra full payment a year.',
    url: '/biweekly-mortgage-savings',
    type: 'article',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Biweekly Mortgage Savings Explained",
  "description": "Guide on how biweekly mortgage payments work and how much money they save homeowners.",
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
      "name": "How does biweekly mortgage payment work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Instead of paying once a month, you pay half your monthly mortgage amount every two weeks. Since there are 52 weeks in a year, you make 26 half-payments, which equals 13 full monthly payments per year."
      }
    },
    {
      "@type": "Question",
      "name": "Do banks charge for biweekly payments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some lenders or third-party servicers charge a setup fee or transaction fee for biweekly plans. However, you can often achieve the same result for free by manually making one extra principal-only payment each year."
      }
    }
  ]
};

export default function BiweeklySavingsPage() {
  return (
    <>
      <JsonLd data={[jsonLd, faqSchema]} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Biweekly Mortgage Savings: The Math Behind the Magic</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700">
          <p className="text-xl leading-relaxed mb-6">
            Switching your mortgage to a biweekly payment schedule is widely considered one of the simplest, lowest-risk financial strategies to save tens of thousands of dollars in compound interest.
          </p>
          <p className="mb-8">
            The standard mortgage is paid monthly, meaning you make 12 payments a year. By switching to a biweekly schedule—simply paying exactly half your monthly amount every two weeks—you effectively trick the calendar into helping you make <strong>one extra full principal payment</strong> every year, entirely painlessly.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How It Works (The 26 vs. 12 Rule)</h2>
          <p>
            There are 52 weeks in a year.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Monthly Plan:</strong> 12 payments per year.</li>
            <li><strong>Biweekly Plan:</strong> 52 weeks / 2 = 26 half-payments per year.</li>
          </ul>
          <p>
            26 half-payments is equal to <strong>13 full monthly payments</strong>. That one extra payment goes 100% toward your principal balance, reducing your interest for every future month.
          </p>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Real Savings Example</h2>
            <p className="mb-4"><strong>Loan:</strong> $300,000 at 6.5% interest (30-Year Fixed)</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 border-b border-green-200 pb-2 mb-2">Standard Monthly</h3>
                <ul className="space-y-1 text-sm">
                  <li>Payment: $1,896 / month</li>
                  <li>Payoff Time: 30 Years</li>
                  <li>Total Interest: $382,000</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-green-700 border-b border-green-200 pb-2 mb-2">Biweekly Plan</h3>
                <ul className="space-y-1 text-sm">
                  <li>Payment: $948 / 2 weeks</li>
                  <li>Payoff Time: ~24 Years</li>
                  <li>Total Interest: ~$305,000</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-green-200 text-center">
              <p className="text-xl font-bold text-green-800">
                Savings: ~$77,000 + 6 Years of Freedom
              </p>
            </div>
          </div>

          <div className="my-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-3">Calculate Your Own Savings</h3>
            <p className="mb-4">Enter your loan balance and interest rate to see exactly how many years you can shave off your loan:</p>
            <div className="flex justify-center mb-4">
              <Link href="/biweekly-mortgage-calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Run Biweekly Calculator
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              Related Reading: <Link href="/blog/pay-off-30-year-mortgage-in-15-years" className="text-blue-600 hover:underline">How to Pay Off a 30-Year Mortgage in 15 Years</Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How to Start Biweekly Payments</h2>
          <p>
            You don't need a special program to do this. You have two options (verify savings with our <Link href="/extra-payment-mortgage-calculator" className="text-blue-600 hover:underline">extra payment mortgage calculator</Link>):
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-4">
            <li>
              <strong>The Official Way:</strong> Call your lender and ask to switch to biweekly auto-draft. 
              <br/><span className="text-red-600 italic text-sm">Warning: Watch out for setup fees.</span>
            </li>
            <li>
              <strong>The DIY Way (Recommended):</strong> Take your monthly principal & interest payment, divide it by 12, and add that amount to your monthly payment as "Principal Only".
              <br/><span className="text-gray-600 italic text-sm">Example: If payment is $1,200. $1,200 / 12 = $100. Pay $1,300 every month.</span>
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900">Can I do this with any mortgage?</h3>
              <p>Yes, almost all mortgages allow for prepayment without penalty. However, always check your loan documents for "prepayment penalty" clauses (rare in modern qualified mortgages).</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Is biweekly better than investing?</h3>
              <p>It depends on your interest rate. If your mortgage rate is 7%, paying it off is a guaranteed 7% return. If your rate is 3%, you might earn more investing in the stock market (historically 8-10% returns). Biweekly payments are a "safe" investment.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}