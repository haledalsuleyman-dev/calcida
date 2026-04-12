
import { CalculatorPage } from '@/components/CalculatorPage';
import { LoanComparisonCalculator } from '@/components/calculators/loan/LoanComparisonCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('loan-comparison');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function LoanComparisonPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A loan comparison calculator allows you to compare two loans side-by-side to see which one saves you more money over time.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Loan Formula:</p>
            <p className="text-xl">M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>M = Monthly payment</li>
                <li>P = Principal loan amount</li>
                <li>i = Monthly interest rate (annual rate / 12)</li>
                <li>n = Number of months (loan term in years x 12)</li>
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <p className="text-sm text-gray-700">
            If you borrow <strong>$25,000</strong>:
            <br />
            <strong>Option A:</strong> 6.5% interest for 5 years = $489.15/month ($29,349 total cost)
            <br />
            <strong>Option B:</strong> 4.5% interest for 3 years = $743.83/month ($26,778 total cost)
            <br />
            Option B saves you <strong>$2,571</strong> in total cost!
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Compare Loan Options Like a Pro</h2>
            <p className="mb-4 text-lg leading-relaxed">
              When comparing loans, don't just look at the monthly payment. A lower monthly payment might mean you're paying for a longer term, which can cost you thousands more in interest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Metrics for Comparison</h2>
            <p className="mb-4">
              When using the calculator above, look at these three metrics:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Monthly Payment:</strong> Can you afford this every month? This is about cash flow.</li>
              <li><strong>Total Interest Paid:</strong> How much are you paying the lender for the privilege of borrowing? This is about long-term cost.</li>
              <li><strong>APR:</strong> Does the interest rate reflect the true cost including fees? Use our <Link href="/apr-calculator" className="text-blue-600 hover:underline">APR calculator</Link> if you're not sure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">The Trade-Off: Rate vs. Term</h2>
            <p className="mb-4">
              In the example above, Option B has a higher monthly payment ($743 vs $489) but a lower total cost ($26,778 vs $29,349). This is because the term is shorter (3 years vs 5 years).
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Shorter Term:</strong> Higher monthly payment, lower total interest.</li>
              <li><strong>Longer Term:</strong> Lower monthly payment, higher total interest.</li>
              <li><strong>Lower Rate:</strong> Lower monthly payment AND lower total interest (all else being equal).</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Check for Prepayment Penalties</h2>
            <p className="mb-4 text-blue-800">
              Some loans charge a fee if you pay them off early. If you plan to make extra payments, ensure your loan is "open" and has no prepayment penalties. This allows you to use the <Link href="/debt-payoff-calculator" className="text-blue-600 hover:underline">debt payoff strategy</Link> effectively.
            </p>
          </section>
        </article>
      }
    >
      <LoanComparisonCalculator />
    </CalculatorPage>
  );
}
