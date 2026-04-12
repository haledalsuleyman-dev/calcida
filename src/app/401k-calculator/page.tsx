
import { CalculatorPage } from '@/components/CalculatorPage';
import { RetirementCalculator } from '@/components/calculators/retirement/RetirementCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('401k');

const FOUR_OH_ONE_K_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'How does employer match work?',
    answer:
      'Employer match varies by plan, but a common structure is matching a percentage of your contributions up to a cap. Match may also have a vesting schedule.',
  },
  {
    question: 'What contribution rate should I start with?',
    answer:
      'Many people start by contributing enough to capture the full employer match, then increase the rate over time as their budget allows.',
  },
  {
    question: 'What return rate should I assume?',
    answer:
      'Return assumptions are uncertain. For long-term planning, many people use a conservative range and compare scenarios (for example, lower vs higher return assumptions).',
  },
  {
    question: 'Do 401(k) contributions have limits?',
    answer:
      'Yes. The IRS sets annual contribution limits, and some plans also have their own limits or match caps. If your inputs exceed limits, treat the result as a directional estimate.',
  },
  {
    question: 'Does this account for inflation?',
    answer:
      'The projection is typically shown in nominal dollars unless you explicitly model inflation elsewhere. For purchasing-power planning, consider using a lower “real return” assumption.',
  },
  {
    question: 'How does increasing contributions impact the result?',
    answer:
      'Higher contributions increase the base that compounds over time. Over long horizons, small contribution changes can create large differences in ending balance.',
  },
];

const seoTitle = `401(k) Calculator (${new Date().getFullYear()}): Project Balance With Match`;
const seoDescription =
  'Project your 401(k) balance with contributions, employer match, and return assumptions. Compare contribution rates and time horizon—free.';

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

export default function RetirementCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FOUR_OH_ONE_K_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>This 401(k) calculator estimates how your balance may grow based on your contributions, employer match, and an assumed investment return.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Enter your starting point:</span> Current 401(k) balance (if any) and salary inputs used by the calculator.
            </li>
            <li>
              <span className="font-medium">Set your contribution rate:</span> Your employee contribution is typically a percent of salary.
            </li>
            <li>
              <span className="font-medium">Include employer match:</span> If your plan matches contributions, that additional amount compounds too.
            </li>
            <li>
              <span className="font-medium">Choose a return assumption:</span> Higher assumed returns increase projections, but real returns vary.
            </li>
            <li>
              <span className="font-medium">Project over time:</span> Growth compounds, so time horizon often matters as much as the rate.
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Maximize Your 401(k)</h2>
            <p className="mb-4 text-lg leading-relaxed">
              The biggest levers are contribution rate, employer match, and time. Use this calculator to see how each lever changes your long-term balance.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Capture the match first:</span> If your employer offers match, it is often the highest-impact early step.
              </li>
              <li>
                <span className="font-medium">Increase gradually:</span> Small annual increases can be easier than a big jump and can add up over decades.
              </li>
              <li>
                <span className="font-medium">Keep assumptions realistic:</span> Compare a conservative return scenario to an optimistic one.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Limits and Plan Rules</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Annual IRS contribution limits may cap how much you can contribute.</li>
              <li>Employer match rules often include a cap and may not match every dollar you contribute.</li>
              <li>Vesting can affect how much of the match you keep if you leave your job.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Next: compare outcomes with the{' '}
              <Link href="/retirement-savings-calculator" className="text-blue-600 hover:underline font-medium">
                Retirement Savings Calculator
              </Link>{' '}
              or focus on contributions using the{' '}
              <Link href="/401k-contribution-calculator" className="text-blue-600 hover:underline font-medium">
                401(k) Contribution Calculator
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
