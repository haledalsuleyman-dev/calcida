
import { CalculatorPage } from '@/components/CalculatorPage';
import { TakeHomePayCalculator } from '@/components/calculators/salary/TakeHomePayCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('take-home-pay');

const TAKE_HOME_PAY_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is included in take-home pay?',
    answer:
      'Take-home pay is your net pay after estimated taxes and any deductions you include, such as benefits and retirement contributions.',
  },
  {
    question: 'What is not included in this estimate?',
    answer:
      'This is a planning estimate and may not include every payroll detail (special bonus withholding, local taxes, reimbursements, or one-time adjustments) unless you model them.',
  },
  {
    question: 'How does pay frequency affect take-home pay?',
    answer:
      'Pay frequency changes the per-check amount and can affect withholding timing. Your annual take-home should be similar for the same annual salary, but each check can look different.',
  },
  {
    question: 'Do retirement contributions and health insurance reduce taxes?',
    answer:
      'Often, yes, if they are pre-tax. Traditional 401(k) and some benefits reduce taxable income, while Roth contributions are typically post-tax.',
  },
  {
    question: 'Is take-home pay the same as net income?',
    answer:
      'In everyday use, yes. Take-home pay usually refers to net pay from wages after payroll deductions and withholding.',
  },
  {
    question: 'What should I enter if I do not know my exact withholding?',
    answer:
      'Start with a reasonable estimate, then compare the result to a recent pay stub and adjust until the estimate matches your real net pay.',
  },
];

const seoTitle = `Take-Home Pay Calculator (${new Date().getFullYear()}): Estimate Net Pay`;
const seoDescription =
  'Estimate take-home pay per paycheck and per year after taxes and deductions. Compare pay frequency and benefits fast—free.';

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

export default function TakeHomePayCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={TAKE_HOME_PAY_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>This take-home pay calculator estimates how much you keep after taxes and deductions, and it helps compare pay across different pay frequencies.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Enter income:</span> Use your gross pay amount (hourly, salary, or annual—based on the inputs shown).
            </li>
            <li>
              <span className="font-medium">Choose pay frequency:</span> Weekly vs biweekly vs semi-monthly changes the size of each check.
            </li>
            <li>
              <span className="font-medium">Add deductions:</span> Include benefits and contributions you expect (health insurance, retirement, HSA, etc.).
            </li>
            <li>
              <span className="font-medium">Estimate taxes:</span> Withholding is calculated from the assumptions you provide, then subtracted from gross pay.
            </li>
            <li>
              <span className="font-medium">Review take-home pay:</span> Use the result for budgeting or comparing offers.
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Your Take-Home Pay</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Take-home pay is what lands in your bank account. The best estimates come from being explicit about what you include (and what you leave out).
            </p>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Included (typical)</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Estimated federal, state, and payroll taxes (withholding).</li>
              <li>Pre-tax deductions like traditional retirement contributions and some benefits.</li>
              <li>Post-tax deductions like Roth contributions or certain insurance add-ons (varies by plan).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Pay Frequency and Budgeting</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use the pay frequency you actually receive to plan bills and cash flow.</li>
              <li>For annual planning, focus on yearly totals; for monthly budgeting, convert net pay to a monthly figure consistently.</li>
              <li>If you get irregular income (bonuses, overtime), model it separately so your “typical paycheck” stays realistic.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              If you want a paycheck-by-paycheck view, use the{' '}
              <Link href="/paycheck-calculator" className="text-blue-600 hover:underline font-medium">
                Paycheck Calculator
              </Link>
              . For tax-focused comparisons, try the{' '}
              <Link href="/after-tax-income-calculator" className="text-blue-600 hover:underline font-medium">
                After-Tax Income Calculator
              </Link>
              .
            </p>
          </section>
        </article>
      }
    >
      <TakeHomePayCalculator />
    </CalculatorPage>
  );
}
