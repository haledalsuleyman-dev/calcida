import { CalculatorPage } from '@/components/CalculatorPage';
import { RetirementCalculator } from '@/components/calculators/retirement/RetirementCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

const spec = getCalculatorSpec('retirement-savings');

const RETIREMENT_SAVINGS_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What should I use for my expected return?',
    answer:
      'Return assumptions are uncertain. Many people compare multiple scenarios (conservative vs optimistic) and avoid relying on a single best-case return.',
  },
  {
    question: 'Does this projection include inflation?',
    answer:
      'Projections are typically in nominal dollars unless you model inflation separately. For purchasing-power planning, consider using a lower “real return” assumption.',
  },
  {
    question: 'How much should I contribute each month?',
    answer:
      'Contribution needs depend on your target retirement income, current savings, and time horizon. Use this calculator to test different monthly contributions and see the impact.',
  },
  {
    question: 'What if I plan to increase contributions over time?',
    answer:
      'This calculator uses the contribution amount you enter. If you expect raises or step-ups, you can rerun scenarios with higher future contributions to bracket outcomes.',
  },
  {
    question: 'How does time horizon affect retirement savings?',
    answer:
      'Time is one of the biggest drivers because compounding accelerates over long horizons. Adding years can matter as much as increasing the return assumption.',
  },
  {
    question: 'Are the results guaranteed?',
    answer:
      'No. This is a planning estimate based on assumptions. Markets vary and real outcomes depend on returns, fees, taxes, and contribution consistency.',
  },
];

const seoTitle = 'Retirement Savings Calculator: Project Your Balance';
const seoDescription =
  'Project retirement savings growth from your current balance, contributions, and return assumptions. Compare scenarios and set targets—free.';

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

export default function RetirementSavingsCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={RETIREMENT_SAVINGS_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>This retirement savings calculator estimates future retirement savings using your current balance, future contributions, and an assumed return.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Enter current savings:</span> Your current retirement balance across accounts you want to include.
            </li>
            <li>
              <span className="font-medium">Set future contributions:</span> Add the amount you plan to contribute each month or year (based on the calculator inputs).
            </li>
            <li>
              <span className="font-medium">Choose an expected return:</span> Use a conservative assumption if your goal is “minimum required” planning.
            </li>
            <li>
              <span className="font-medium">Set the time horizon:</span> Years until retirement is one of the biggest drivers due to compounding.
            </li>
            <li>
              <span className="font-medium">Review the projection:</span> Compare scenarios by changing one assumption at a time.
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Use a Retirement Savings Projection</h2>
            <p className="mb-4 text-lg leading-relaxed">
              A projection is most useful as a comparison tool. Use it to test contribution levels and return assumptions, then pick a plan that still works under conservative inputs.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Focus on controllable levers:</span> contribution level, fees, asset allocation, and time horizon.
              </li>
              <li>
                <span className="font-medium">Run at least two scenarios:</span> one conservative and one optimistic to understand the range.
              </li>
              <li>
                <span className="font-medium">Tie it to a goal:</span> if you have a target retirement spending level, work backward to a contribution plan.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Assumptions to Keep in Mind</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Returns vary year to year; long-run averages are not a guarantee.</li>
              <li>Fees and taxes can reduce realized returns and effective savings rate.</li>
              <li>If contributions rise with income, rerun the calculator occasionally to keep the plan realistic.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Related tools: the{' '}
              <Link href="/401k-calculator" className="text-blue-600 hover:underline font-medium">
                401(k) Calculator
              </Link>{' '}
              and the{' '}
              <Link href="/inflation-calculator" className="text-blue-600 hover:underline font-medium">
                Inflation Calculator
              </Link>
              .
            </p>
          </section>
        </article>
      }
    >
      <RetirementCalculator />
    </CalculatorPage>
  );
}

