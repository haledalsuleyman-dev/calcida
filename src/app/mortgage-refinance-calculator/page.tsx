
import { CalculatorPage } from '@/components/CalculatorPage';
import { RefinanceCalculator } from '@/components/calculators/mortgage/RefinanceCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('mortgage-refinance');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function MortgageRefinancePage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A mortgage refinance calculator compares your current mortgage to a new refinance scenario. It calculates your break-even point—the moment your monthly savings cover the closing costs of the new loan.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Refinance Break-Even Formula:</p>
            <p className="text-xl">Break-Even (Months) = Total Closing Costs / Monthly Savings</p>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li><strong>Current Payment:</strong> $2,000</li>
            <li><strong>New Payment:</strong> $1,800</li>
            <li><strong>Monthly Savings:</strong> $200</li>
            <li><strong>Closing Costs:</strong> $4,000</li>
            <li><strong>Break-Even Point:</strong> $4,000 / $200 = <strong>20 Months</strong></li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Should You Refinance Your Mortgage?</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Refinancing is the process of replacing your current home loan with a new one, typically to get a lower interest rate, change the loan term, or tap into your home's equity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Top 3 Reasons to Refinance</h2>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Lower Your Interest Rate:</strong> This is the most common reason. If market rates have dropped since you bought your home, you could save hundreds of dollars every month.</li>
              <li><strong>Shorten Your Loan Term:</strong> Switching from a 30-year to a 15-year mortgage helps you build equity faster and save a massive amount in total interest.</li>
              <li><strong>Cash-Out Refinance:</strong> Use your home's equity to pay for major expenses like home improvements, medical bills, or high-interest debt consolidation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">The Importance of the Break-Even Point</h2>
            <p className="mb-4">
              Refinancing isn't free. You'll typically pay 2% to 5% of the loan amount in closing costs. The "break-even point" is how long you need to stay in the home for the monthly savings to outweigh these upfront costs. If you plan to move in 2 years but your break-even point is 3 years, refinancing doesn't make financial sense.
            </p>
          </section>
        </article>
      }
    >
      <RefinanceCalculator />
    </CalculatorPage>
  );
}
