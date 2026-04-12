
import { CalculatorPage } from '@/components/CalculatorPage';
import { ExtraPaymentMortgageCalculator } from '@/components/calculators/mortgage/ExtraPaymentMortgageCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('extra-payment-mortgage');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function ExtraPaymentMortgageCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            Making extra payments on your mortgage principal reduces the amount you owe, which in turn reduces the amount of interest you're charged in every future period.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How Extra Payments Shorten Your Mortgage</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Every dollar you pay extra on your principal is a dollar you don't have to pay interest on for the rest of the loan. This can save you tens of thousands of dollars over 30 years.
            </p>
          </section>
        </article>
      }
    >
      <ExtraPaymentMortgageCalculator />
    </CalculatorPage>
  );
}
