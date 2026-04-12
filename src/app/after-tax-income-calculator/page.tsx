
import { CalculatorPage } from '@/components/CalculatorPage';
import { AfterTaxIncomeCalculator } from '@/components/calculators/salary/AfterTaxIncomeCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('after-tax-income');

const AFTER_TAX_INCOME_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What does “after-tax income” mean?',
    answer:
      'After-tax income is the amount you keep after estimated taxes are subtracted from gross income. It is a useful number for budgeting and comparing scenarios.',
  },
  {
    question: 'What is the difference between marginal and effective tax rate?',
    answer:
      'Marginal tax rate applies to your last dollar of income in a progressive system. Effective tax rate is total taxes divided by total income, which is usually lower.',
  },
  {
    question: 'Does this include state and local taxes?',
    answer:
      'It depends on what you enter. If you provide state or local tax assumptions, they can be reflected in the estimate. Tax rules vary widely by location.',
  },
  {
    question: 'Does this include deductions and tax credits?',
    answer:
      'This is an estimate based on the assumptions you provide. Detailed itemized deductions and credits can materially change results in real tax filings.',
  },
  {
    question: 'How accurate is an after-tax income estimate?',
    answer:
      'It is best used for planning. Your real taxes depend on filing status, deductions, credits, and local rules. Use your latest tax return or pay stubs to refine assumptions.',
  },
  {
    question: 'Why can after-tax income change even if salary stays the same?',
    answer:
      'Tax rates, withholding, benefits, and deductions can change. Life events (marriage, dependents) and changes in pre-tax contributions can also affect taxes owed.',
  },
];

const seoTitle = `After-Tax Income Calculator (${new Date().getFullYear()}): Estimate Income After Taxes`;
const seoDescription =
  'Estimate after-tax income and effective tax rate using your income and assumptions. Compare scenarios for budgeting and offers—free.';

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

export default function AfterTaxIncomeCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={AFTER_TAX_INCOME_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>This after-tax income calculator estimates how much income you keep after taxes based on the assumptions you enter.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Start with gross income:</span> Enter your annual income (or the income amount requested by the calculator).
            </li>
            <li>
              <span className="font-medium">Apply tax assumptions:</span> Taxes are estimated from your inputs (such as filing setup and location assumptions, when provided).
            </li>
            <li>
              <span className="font-medium">Compute after-tax income:</span> After-tax income is gross income minus estimated total taxes.
            </li>
            <li>
              <span className="font-medium">Compute effective tax rate:</span> Effective rate is estimated taxes divided by gross income.
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Your After-Tax Income</h2>
            <p className="mb-4 text-lg leading-relaxed">
              After-tax income is the number that matters for spending and saving. Use this calculator to compare scenarios, not to predict an exact tax bill.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use consistent inputs (annual income, location, and filing assumptions).</li>
              <li>When comparing two job offers, keep assumptions the same so the difference reflects the offer, not the settings.</li>
              <li>If you have a recent pay stub or tax return, use it to sanity-check the implied effective tax rate.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Assumptions to Keep in Mind</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Tax credits, itemized deductions, and special situations can materially change real outcomes.</li>
              <li>Withholding is not always equal to taxes owed; refunds and balances due happen when the two differ.</li>
              <li>Pre-tax benefits and retirement contributions can change taxable income and the estimate.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              For related scenarios, use the{' '}
              <Link href="/take-home-pay-calculator" className="text-blue-600 hover:underline font-medium">
                Take-Home Pay Calculator
              </Link>{' '}
              or estimate withholding per check with the{' '}
              <Link href="/paycheck-calculator" className="text-blue-600 hover:underline font-medium">
                Paycheck Calculator
              </Link>
              .
            </p>
          </section>
        </article>
      }
    >
      <AfterTaxIncomeCalculator />
    </CalculatorPage>
  );
}
