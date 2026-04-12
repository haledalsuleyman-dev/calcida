
import { CalculatorPage } from '@/components/CalculatorPage';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('mortgage-amortization');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function MortgageAmortizationCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            An amortization schedule is a table that shows each periodic payment on an amortizing loan. It breaks down each payment into interest and principal and shows the remaining balance after each payment.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Understanding Mortgage Amortization</h2>
            <p className="mb-4 text-lg leading-relaxed">
              When you first start paying off a mortgage, most of your payment goes toward interest. As the balance decreases, more of your payment goes toward principal. This process is called amortization.
            </p>
          </section>
        </article>
      }
    >
      <MortgageCalculator />
    </CalculatorPage>
  );
}
