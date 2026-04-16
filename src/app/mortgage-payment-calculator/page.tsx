import { CalculatorPage } from '@/components/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('mortgage-payment');

export const metadata: Metadata = calculatorMetadata({
  title: 'Mortgage Payment Calculator 2026: With Taxes, Insurance & PMI',
  description: 'Calculate your total monthly mortgage payment (PITI) for 2026. Includes principal, interest, property taxes, homeowners insurance, and HOA fees with biweekly payment options.',
  keywords: [
    'mortgage payment calculator 2026',
    'mortgage calculator with taxes and insurance and pmi',
    'piti calculator monthly',
    'biweekly mortgage payment calculator',
    'how much house can i afford on 400k house',
    'is now a good time to refinance 2026'
  ],
  canonicalPath: spec.route,
});

const MORTGAGE_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is PITI in a 2026 mortgage calculation?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance. In 2026, lenders focus heavily on your total carrying cost including HOA and PMI to determine your debt-to-income (DTI) ratio. This calculator provides a full PITI breakdown."
  },
  {
    question: "How do interest rates in 2026 affect my monthly payment?",
    answer: "With 2026 rates stabilizing, a 1% difference on a $400,000 loan can change your payment by approximately $250/month. It is critical to calculate with current market rates to avoid being 'house poor'."
  },
  {
    question: "Does this mortgage calculator include PMI?",
    answer: "Yes. If your down payment is less than 20%, the calculator automatically suggests account for Private Mortgage Insurance (PMI), which typically adds 0.5% to 1.5% to your annual loan cost."
  },
  {
    question: "Can I calculate bi-weekly mortgage savings?",
    answer: "Yes, by switching to our bi-weekly frequency, you effectively make 13 payments a year. This can shave 4-6 years off a standard 30-year mortgage and save you tens of thousands in interest."
  },
  {
    question: "Is now a good time to refinance my mortgage in 2026?",
    answer: "If 2026 rates are at least 0.75% to 1% lower than your current rate, refinancing may be beneficial. Use our calculator to see if the monthly savings outweigh the closing costs of the new loan."
  }
];

export default function MortgagePaymentCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={MORTGAGE_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            In 2026, home prices and interest rates require more precision than ever. Our <strong>Mortgage Payment Calculator</strong> is designed to provide a 100% accurate picture of your "True Carrying Cost" (PITI).
          </p>
          <p>
            This tool factors in 2026 property tax trends, homeowners insurance premiums, and <strong>PMI (Private Mortgage Insurance)</strong> to ensure you aren't surprised by hidden fees. Whether you're a first-time buyer or looking to refinance, calculating your monthly payment is the first step toward financial freedom.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4">
          <p className="text-gray-700">
            This calculator determines your monthly carrying cost (often called PITI) to give you a realistic picture of your housing expenses. Here is exactly what we calculate:
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The Complete Breakdown (PITI)</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li><span className="font-medium text-gray-900">Principal & Interest (P&I):</span> Based on the latest 2026 amortization schedules.</li>
              <li><span className="font-medium text-gray-900">Property Taxes:</span> Estimated based on national averages or your specific local rate.</li>
              <li><span className="font-medium text-gray-900">Homeowners Insurance:</span> Factoring in recent premium increases.</li>
              <li><span className="font-medium text-gray-900">PMI:</span> Automatically calculated if your down payment is less than 20%.</li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-6 text-gray-700">
          <p>
            The core mortgage payment uses the fixed-rate amortization formula:
          </p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4">
            M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
          </div>
          
          <div className="mt-8">
            <h4 className="font-bold text-gray-900 mb-2">Estimated Property Tax Rates (2026)</h4>
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 italic">
                  <tr>
                    <th className="p-2 border">State</th>
                    <th className="p-2 border">Avg. Rate</th>
                    <th className="p-2 border">Search Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">New Jersey</td><td className="p-2 border text-red-600">2.47%</td><td className="p-2 border text-gray-400 font-bold">#1 High</td></tr>
                  <tr><td className="p-2 border">Texas</td><td className="p-2 border">1.60%</td><td className="p-2 border text-gray-400 font-bold">Trending</td></tr>
                  <tr><td className="p-2 border">California</td><td className="p-2 border text-green-600">0.71%</td><td className="p-2 border text-gray-400 font-bold">Stable</td></tr>
                  <tr><td className="p-2 border">Florida</td><td className="p-2 border">0.91%</td><td className="p-2 border text-gray-400 font-bold">Growth</td></tr>
                </tbody>
              </table>
              <p className="text-[10px] mt-2 text-gray-400">*Rates are averages and vary significantly by county and municipality.</p>
            </div>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-900 mb-4 text-lg">2026 Example: $450,000 Home Purchase</p>
          <p className="mb-4 text-gray-700 italic">Scenario: You put down 10% ($45,000) on a $450,000 home with a 6.25% interest rate. Because your down payment is under 20%, you will pay PMI.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2 italic">
              <span>Loan Amount (90% LTV):</span> <span className="font-medium">$405,000</span>
            </li>
            <li className="flex justify-between pt-2">
              <span>Monthly Principal & Interest:</span> <span>$2,494</span>
            </li>
            <li className="flex justify-between">
              <span>Property Taxes (1.2%):</span> <span>$450</span>
            </li>
            <li className="flex justify-between">
              <span>Home Insurance:</span> <span>$150</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Estimated PMI (0.5%):</span> <span>$168</span>
            </li>
            <li className="flex justify-between pt-2">
              <span className="text-xl font-bold text-blue-900">Estimated Total Monthly:</span> 
              <span className="text-xl font-bold text-blue-900">~$3,262</span>
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4 Practical Ways to Lower Your Monthly Payment</h2>
            <p className="mb-4 text-gray-700">
              If the calculator shows a payment that is slightly out of your comfort zone, you have several levers you can pull to bring it down:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">1. Boost Your Down Payment</h3>
                <p className="text-sm text-gray-600">Putting more cash down reduces the principal balance you need to borrow, which lowers your core payment and reduces the total interest you'll owe over time.</p>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">2. Buy Down Your Rate</h3>
                <p className="text-sm text-gray-600">You can pay "discount points" upfront at closing. One point usually costs 1% of the loan amount and lowers your interest rate by roughly 0.25%, saving you money month over month.</p>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">3. Eliminate PMI Requirements</h3>
                <p className="text-sm text-gray-600">If you put down less than 20%, you will likely pay Private Mortgage Insurance. Hitting that 20% threshold instantly drops this expensive fee from your monthly bill.</p>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">4. Shop Around for Insurance</h3>
                <p className="text-sm text-gray-600">While you can't lower your property taxes, you can control your homeowners insurance. Shop your policy around annually to ensure you are getting the best coverage rate.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Next Steps: Related Mortgage Tools</h2>
            <p className="mb-4 text-gray-700">
              Understanding your monthly payment is only step one. Check out our related tools to refine your home-buying strategy:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/mortgage-amortization-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Amortization Schedule</span>
                <p className="text-sm text-gray-600 mt-2">See a year-by-year breakdown of your loan payoff schedule.</p>
              </Link>
              <Link href="/biweekly-mortgage-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Bi-Weekly Savings</span>
                <p className="text-sm text-gray-600 mt-2">Calculate how much interest you can save by switching to bi-weekly payments.</p>
              </Link>
              <Link href="/extra-payment-mortgage-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Early Payoff Expert</span>
                <p className="text-sm text-gray-600 mt-2">Enter custom extra payments to see exactly how quickly you can be debt-free.</p>
              </Link>
              <Link href="/mortgage-refinance-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Refinance Break-Even</span>
                <p className="text-sm text-gray-600 mt-2">Find out if the monthly savings of a refinance justify the closing costs.</p>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <MortgageCalculator />
    </CalculatorPage>
  );
}
