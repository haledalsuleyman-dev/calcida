import { CalculatorPage } from '@/components/CalculatorPage';
import { RetirementCalculator } from '@/components/calculators/retirement/RetirementCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import React from 'react';

const spec = getCalculatorSpec('401k-contribution');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function FourOhOneKContributionCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator estimates your 401(k) contributions based on your salary, contribution percentage, employer match, and the number of years you invest.
          </p>
          <p>
            Adjust your contribution rate to see how much you could add each year, and how employer match can increase your total contributions without reducing
            take-home pay as much as you might expect.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Contribution Rate and Employer Match</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Many people start by contributing enough to capture the full employer match. From there, increasing your contribution rate over time can be one of
              the highest-impact moves in long-term retirement planning.
            </p>
          </section>
        </article>
      }
    >
      <RetirementCalculator />
    </CalculatorPage>
  );
}

