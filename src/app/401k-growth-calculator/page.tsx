import { CalculatorPage } from '@/components/CalculatorPage';
import { RetirementCalculator } from '@/components/calculators/retirement/RetirementCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import React from 'react';

const spec = getCalculatorSpec('401k-growth');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function FourOhOneKGrowthCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator projects 401(k) growth over time by combining your current balance, ongoing contributions, employer match, and an assumed annual
            return rate.
          </p>
          <p>
            Use conservative return assumptions when planning. You can also model different contribution levels to see how increasing your savings rate affects
            your projected retirement balance.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How Compounding Drives 401(k) Growth</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Over long horizons, compounding can contribute more to growth than new contributions. Staying invested and keeping fees low can have a meaningful
              impact on long-term outcomes.
            </p>
          </section>
        </article>
      }
    >
      <RetirementCalculator />
    </CalculatorPage>
  );
}

