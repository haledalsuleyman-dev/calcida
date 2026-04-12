
import { CalculatorPage } from '@/components/CalculatorPage';
import { APRCalculator } from '@/components/calculators/loan/APRCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('apr');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function APRPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            The APR (Annual Percentage Rate) is the total yearly cost of borrowing, expressed as a percentage. It is almost always higher than the interest rate because it includes fees and other costs.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The APR Formula:</p>
            <p className="text-xl">APR = [((Fees + Interest) / Principal) / n] x 365 x 100</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>Fees = Origination, points, etc.</li>
                <li>Interest = Total interest paid over the life of the loan.</li>
                <li>n = Number of days in the loan term.</li>
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <p className="text-sm text-gray-700">
            If you borrow <strong>$10,000</strong> at a <strong>5% interest rate</strong> for <strong>2 years</strong> with <strong>$500 in fees</strong>, your APR will be:
            <br />
            $10,000 (Principal) + $500 (Fees) + $530 (Interest) = $11,030 total cost.
            <br />
            The APR would be approximately <strong>7.67%</strong>.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why You Should Always Compare APR, Not Just Interest Rates</h2>
            <p className="mb-4 text-lg leading-relaxed">
              When shopping for a loan, lenders will often advertise their lowest interest rates. But the interest rate only tells you the cost of the principal. The APR (Annual Percentage Rate) tells you the true cost of the entire loan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is Included in APR?</h2>
            <p className="mb-4">
              APR includes the interest rate plus other upfront costs and recurring fees:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Origination Fees:</strong> The cost to process the loan application.</li>
              <li><strong>Points:</strong> Prepaid interest you can pay to lower your rate.</li>
              <li><strong>Closing Costs:</strong> Appraisal fees, title insurance, and other closing expenses.</li>
              <li><strong>PMI (Private Mortgage Insurance):</strong> If your down payment is less than 20%.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Fixed-Rate vs. Variable-Rate APR</h2>
            <p className="mb-4">
              The type of APR you choose can have a huge impact on your total cost:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Fixed APR:</strong> The rate stays the same for the entire life of the loan. This is best for long-term loans like mortgages.</li>
              <li><strong>Variable APR:</strong> The rate can change based on the market (e.g., the Prime Rate). This is common for credit cards and some personal loans.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Truth in Lending Act (TILA)</h2>
            <p className="mb-4 text-blue-800">
              In the United States, the Truth in Lending Act (TILA) requires lenders to disclose the APR clearly on all loan documents. This ensures you can compare loans side-by-side using the same metric.
            </p>
          </section>
        </article>
      }
    >
      <APRCalculator />
    </CalculatorPage>
  );
}
