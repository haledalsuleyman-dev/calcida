
import { CalculatorPage } from '@/components/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('biweekly-mortgage');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function BiweeklyMortgageCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            By paying biweekly, you effectively make 13 full payments a year instead of 12. This extra payment goes directly toward the principal, saving you interest and shortening your loan term.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Biweekly Mortgage Payments Work</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Paying biweekly means you pay half of your monthly payment every two weeks. Since there are 52 weeks in a year, you end up making 26 half-payments, which equals 13 full monthly payments.
            </p>
          </section>
        </article>
      }
    >
      <MortgageCalculator showBiWeekly={true} defaultValues={{ paymentFrequency: 'biweekly' }} />
    </CalculatorPage>
  );
}
