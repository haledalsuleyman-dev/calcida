
import { CalculatorPage } from '@/components/CalculatorPage';
import { GeneralRetirementCalculator } from '@/components/calculators/retirement/GeneralRetirementCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('retirement');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

const RETIREMENT_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "How much should I save for retirement each month?",
    answer: "A common recommendation is to save 15% of your gross income for retirement. If you are starting later in life, you may need to increase this percentage to catch up."
  },
  {
    question: "What is the 4% rule in retirement?",
    answer: "The 4% rule suggests that you can safely withdraw 4% of your total retirement savings in the first year of retirement (and adjust for inflation thereafter) without running out of money over a 30-year period."
  },
  {
    question: "What annual return should I assume for retirement?",
    answer: "While the stock market has historically returned about 10% annually, many planners use a more conservative 6-8% for retirement projections to account for inflation and lower-risk bond holdings as you age."
  },
  {
    question: "Should I use a Roth or Traditional retirement account?",
    answer: "Traditional accounts offer a tax break today but are taxed when you withdraw. Roth accounts are funded with after-tax dollars but offer tax-free withdrawals. The choice depends on whether you expect to be in a higher tax bracket now or in retirement."
  },
  {
    question: "When can I stop working?",
    answer: "You can stop working when your passive income (from investments, Social Security, or pensions) covers your annual expenses. Use this calculator to see when your projected balance hits your 'retirement number.'"
  }
];

export default function RetirementPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={RETIREMENT_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator projects your future nest egg by applying the power of compound interest to your current savings and future monthly contributions.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 my-6 text-gray-700">
            <h3 className="font-bold text-gray-900 mb-2">The Growth Engine:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-medium text-gray-900">Initial Balance:</span> Your starting point today.</li>
              <li><span className="font-medium text-gray-900">Monthly Contributions:</span> The consistent amount you add each month.</li>
              <li><span className="font-medium text-gray-900">Compound Interest:</span> Your money earns returns, and then those returns earn their own returns, creating exponential growth over decades.</li>
              <li><span className="font-medium text-gray-900">Time Horizon:</span> The number of years until you plan to retire is the most critical factor in the final result.</li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="mb-4">See how a $500 monthly contribution grows over a 35-year career:</p>
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li><strong>Current Age:</strong> 30</li>
            <li><strong>Retirement Age:</strong> 65</li>
            <li><strong>Starting Balance:</strong> $10,000</li>
            <li><strong>Monthly Contribution:</strong> $500</li>
            <li><strong>Assumed Annual Return:</strong> 7%</li>
            <li className="pt-2 border-t border-blue-200 mt-2">
              <span className="text-xl font-bold text-blue-900">Projected Balance: ~$882,000</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Of this total, approximately $662,000 comes from compound interest alone!
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">The Power of Starting Early</h2>
            <p className="mb-4">
              Compound interest is often called the 'eighth wonder of the world.' If you start saving $500 a month at age 25, you could retire with significantly more than if you start at age 35, even if you save more per month later. Time is your greatest asset in retirement planning.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Maximize Your Savings</h2>
            <p className="mb-4 text-gray-700">
              Retirement planning has many moving parts. Use these related tools to dive deeper into specific accounts and strategies:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/401k-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors text-blue-600 no-underline">
                <span className="font-bold block no-underline">401(k) Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Calculate how your employer match accelerates your savings.</span>
              </Link>
              <Link href="/compound-interest-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors text-blue-600 no-underline">
                <span className="font-bold block no-underline">Compound Interest</span>
                <span className="text-sm text-gray-500 no-underline">See the math behind how your investments grow over time.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <GeneralRetirementCalculator />
    </CalculatorPage>
  );
}
