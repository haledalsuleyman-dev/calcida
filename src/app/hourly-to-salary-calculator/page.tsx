
import { CalculatorPage } from '@/components/CalculatorPage';
import { HourlyToSalaryCalculator } from '@/components/calculators/salary/HourlyToSalaryCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('hourly-to-salary');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function HourlyToSalaryCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            An hourly to salary calculator converts your hourly wage to an annual salary based on the number of hours you work per week and the number of weeks you work per year.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Your Annual Salary</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Calculating your annual salary can help you compare job offers, budget more effectively, and understand your true earning potential.
            </p>
          </section>
        </article>
      }
    >
      <HourlyToSalaryCalculator />
    </CalculatorPage>
  );
}
