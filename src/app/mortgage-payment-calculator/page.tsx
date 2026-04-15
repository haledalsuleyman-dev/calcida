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
  title: 'Mortgage Payment Calculator: With Taxes & Insurance',
  description: 'Estimate your true monthly mortgage payment including principal, interest, taxes, insurance (PITI), and HOA fees to find out how much house you can really afford.',
  canonicalPath: spec.route,
});

const MORTGAGE_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is PITI in a mortgage payment?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four core components of a standard monthly mortgage payment. Principal and interest repay the lender, while taxes and insurance are usually held in an escrow account."
  },
  {
    question: "Does my mortgage payment include property taxes?",
    answer: "Usually, yes. Most lenders require you to pay a portion of your annual property taxes each month. The lender holds this in an escrow account and pays the tax bill on your behalf when it's due."
  },
  {
    question: "How much down payment do I actually need?",
    answer: "While 20% is the traditional gold standard to avoid Private Mortgage Insurance (PMI), many buyers put down 3% to 10%. FHA loans require as little as 3.5% down, and VA loans often require $0 down."
  },
  {
    question: "What is PMI and how much does it cost?",
    answer: "Private Mortgage Insurance (PMI) is required on conventional loans if your down payment is less than 20%. It typically costs between 0.3% and 1.5% of the original loan amount annually, adding up to hundreds of extra dollars per month."
  },
  {
    question: "How do interest rates affect my monthly payment?",
    answer: "Interest rates heavily impact your payment and overall cost. A 1% increase on a $300,000, 30-year loan can increase your monthly payment by roughly $200 and add over $70,000 to the total interest paid over the life of the loan."
  },
  {
    question: "Should I choose a 15-year or 30-year fixed mortgage?",
    answer: "A 30-year mortgage offers lower, more flexible monthly payments. A 15-year mortgage has higher monthly payments, but you'll secure a lower interest rate and pay drastically less total interest over the life of the loan."
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
            Buying a home is one of the biggest financial decisions you'll ever make. But knowing the asking price is only half the battle—you need to know exactly what it will cost you every single month.
          </p>
          <p>
            Our <strong>Mortgage Payment Calculator</strong> goes beyond basic principal and interest. It calculates your "true" monthly cost by factoring in the hidden expenses of homeownership: property taxes, homeowners insurance, HOA fees, and PMI (if applicable).
          </p>
          <p>
            Use this tool to dial in your housing budget, compare different interest rates, and see exactly how much house you can confidently afford.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4">
          <p className="text-gray-700">
            This calculator determines your monthly carrying cost (often called PITI) to give you a realistic picture of your housing expenses. Here is exactly what we calculate:
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The Complete Breakdown</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li><span className="font-medium text-gray-900">Principal & Interest (P&I):</span> Reverses your Home Price and Down Payment to find the Loan Amount, then amortizes it across your specific Loan Term and Interest Rate.</li>
              <li><span className="font-medium text-gray-900">Property Taxes:</span> Takes your annual property tax estimate and divides it by 12.</li>
              <li><span className="font-medium text-gray-900">Homeowners Insurance:</span> Takes your estimated annual premium and divides it by 12.</li>
              <li><span className="font-medium text-gray-900">HOA Fees (Optional):</span> Adds any monthly Homeowners Association dues directly to your bottom line.</li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>
            While taxes and insurance are simple arithmetic (divide the annual cost by 12), the core mortgage payment is calculated using the standard amortization formula:
          </p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4">
            M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
          </div>
          <ul className="list-disc pl-6 space-y-1 text-sm bg-gray-50 p-4 rounded border border-gray-200">
            <li><strong>M:</strong> Total monthly principal and interest payment</li>
            <li><strong>P:</strong> Principal loan amount (Home Price minus Down Payment)</li>
            <li><strong>i:</strong> Monthly interest rate (Annual Rate divided by 12)</li>
            <li><strong>n:</strong> Number of monthly payments (e.g., 360 for a 30-year loan)</li>
          </ul>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-900 mb-4 text-lg">Real-World Scenario: Buying a $350,000 Home</p>
          <p className="mb-4 text-gray-700">Let's say you're buying a $350,000 house with a 20% down payment to avoid PMI. You secure a 30-year fixed mortgage at a 6.5% interest rate. You estimate annual property taxes at $3,500 and home insurance at $1,200.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Home Price:</span> <span className="font-medium">$350,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Down Payment (20%):</span> <span className="font-medium">$70,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Loan Amount:</span> <span className="font-medium">$280,000</span>
            </li>
            <li className="flex justify-between pt-2">
              <span>Monthly Principal & Interest:</span> <span>$1,769</span>
            </li>
            <li className="flex justify-between">
              <span>Monthly Property Taxes:</span> <span>$291</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Monthly Insurance:</span> <span>$100</span>
            </li>
            <li className="flex justify-between pt-2">
              <span className="text-xl font-bold text-blue-900">Total Monthly Payment:</span> 
              <span className="text-xl font-bold text-blue-900">~$2,160</span>
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
                <p className="text-sm text-gray-600 mt-2">See a month-by-month breakdown of exactly how much of your payment goes to principal versus interest.</p>
              </Link>
              <Link href="/mortgage/how-much-house-can-i-afford-on-70000-salary" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Mortgage Affordability</span>
                <p className="text-sm text-gray-600 mt-2">Work backwards. Enter your salary and debts to see the maximum home price you can get approved for.</p>
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
