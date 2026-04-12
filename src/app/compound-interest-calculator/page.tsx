
import { CalculatorPage } from '@/components/CalculatorPage';
import { CompoundInterestCalculator } from '@/components/calculators/finance/CompoundInterestCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('compound-interest');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function CompoundInterestPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. It is often described as "interest on interest."
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Compound Interest Formula:</p>
            <p>A = P(1 + r/n)^nt</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>A = the future value of the investment/loan, including interest</li>
                <li>P = the principal investment amount</li>
                <li>r = the annual interest rate (decimal)</li>
                <li>n = the number of times that interest is compounded per unit t</li>
                <li>t = the time the money is invested or borrowed for</li>
              </ul>
            </div>
          </div>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">The Power of Compound Interest</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Compound interest is one of the most important concepts in finance. It's the reason why starting to save early can lead to massive wealth over time. Albert Einstein reportedly called it the "eighth wonder of the world."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How Compounding Frequency Affects Growth</h2>
            <p className="mb-4">
              The more frequently interest is compounded, the faster your money grows. For example, interest compounded daily will result in a higher final balance than interest compounded annually at the same rate.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Daily Compounding:</strong> 365 times per year</li>
              <li><strong>Monthly Compounding:</strong> 12 times per year</li>
              <li><strong>Quarterly Compounding:</strong> 4 times per year</li>
              <li><strong>Annual Compounding:</strong> Once per year</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Compound Interest vs. Simple Interest</h2>
            <p className="mb-4">
              Simple interest is only calculated on the principal amount. Compound interest, however, includes the interest earned in previous periods. Over long periods, the difference becomes staggering.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Why Time is Your Best Friend</h2>
            <p className="mb-4 text-blue-800">
              The earlier you start investing, the more time compound interest has to work its magic. Even small amounts can grow significantly over decades.
            </p>
          </section>
        </article>
      }
    >
      <CompoundInterestCalculator />
    </CalculatorPage>
  );
}
