
import { CalculatorPage } from '@/components/CalculatorPage';
import { PaycheckCalculator } from '@/components/calculators/salary/PaycheckCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('paycheck');

const seoTitle = `Paycheck Calculator (${new Date().getFullYear()}): Estimate Take-Home Pay`;
const seoDescription = 'Estimate paycheck take-home pay after taxes and deductions. Fast, free paycheck calculator for budgeting and offer comparisons.';

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


const PAYCHECK_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is the difference between gross pay and net pay?',
    answer:
      'Gross pay is what you earned before deductions. Net pay (take-home pay) is what you actually receive after pre-tax deductions, taxes, and post-tax deductions are removed.',
  },
  {
    question: 'How do pre-tax deductions save me money on taxes?',
    answer:
      'Pre-tax deductions (like 401k contributions or health insurance) are taken out before federal and state taxes are calculated. This reduces your taxable income, meaning you pay less in income tax.',
  },
  {
    question: 'What are FICA taxes?',
    answer:
      'FICA stands for the Federal Insurance Contributions Act. It includes Social Security (6.2%) and Medicare (1.45%) taxes. Most employees pay a total of 7.65% from each paycheck, which is matched by their employer.',
  },
  {
    question: 'How do I change my tax withholding?',
    answer:
      'To change how much federal tax is withheld from your paycheck, you typically need to submit a new Form W-4 to your employer. Use our calculator to see how different withholding scenarios affect your take-home pay.',
  },
  {
    question: 'Why is my take-home pay lower than expected?',
    answer:
      'Common reasons include higher-than-expected state taxes, mandatory retirement contributions, health insurance premiums, or even one-time adjustments. Reviewing your pay stub line-by-line is the best way to understand the difference.',
  },
];

export default function PaycheckCalculatorPage() {
  const currentYear = new Date().getFullYear();
  return (
    <CalculatorPage
      spec={spec}
      faq={PAYCHECK_FAQ}
      howItWorks={
        <div className="space-y-4">
          <p>
            Our paycheck calculator estimates your net (take-home) pay from gross earnings by applying standard federal and state tax rules along with your specific employer deductions.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 my-6">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">The Paycheck Math:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium text-gray-900">Gross Pay:</span> We start with your total earnings for the period.</li>
              <li><span className="font-medium text-gray-900">Taxable Wage Calculation:</span> Pre-tax deductions (like 401k or HSA) are subtracted to find your taxable base.</li>
              <li><span className="font-medium text-gray-900">Standard Withholding:</span> We apply current {currentYear} federal brackets and FICA (7.65%) to estimate taxes.</li>
              <li><span className="font-medium text-gray-900">Net Final Result:</span> After all taxes and post-tax deductions are removed, you get your final take-home pay.</li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="mb-4 text-gray-700">Consider a semi-monthly employee (24 paychecks a year) earning a $72,000 salary:</p>
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li><strong>Gross Pay (per check):</strong> $3,000</li>
            <li><strong>401(k) Contribution (5%):</strong> -$150</li>
            <li><strong>Health Insurance Premium:</strong> -$100</li>
            <li><strong>Federal Tax (Est):</strong> ~$280</li>
            <li><strong>FICA (7.65%):</strong> ~$230</li>
            <li className="pt-2 border-t border-blue-200 mt-2">
              <span className="text-xl font-bold text-blue-900">Estimated Net Pay: ~$2,240 per check</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Individual results vary based on filing status, state taxes, and local withholdings.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Use This Paycheck Tool</h2>
            <p className="mb-4">
              To get the most accurate estimate, have your latest pay stub or an offer letter ready. You should experiment with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Pay Frequency:</strong> See how switching from biweekly to semi-monthly changes each individual check.</li>
              <li><strong>Deduction Adjustments:</strong> Model how increasing your 401(k) contribution decreases your taxes but also changes your net pay.</li>
              <li><strong>Offer Comparisons:</strong> Use the tool to compare two different job offers with different benefit costs side-by-side.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Pay & Tax Tools</h2>
            <p className="mb-4 text-gray-700">
              Understanding your pay is just the first step. Use these tools to see the bigger picture:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/take-home-pay-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors no-underline">
                <span className="font-bold block text-blue-600 no-underline">Take-Home Pay Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Calculate your net income across multiple pay frequencies.</span>
              </Link>
              <Link href="/salary-to-hourly-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors no-underline">
                <span className="font-bold block text-blue-600 no-underline">Salary to Hourly Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Find exactly what your annual salary equals in an hourly wage.</span>
              </Link>
              <Link href="/after-tax-income-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors no-underline">
                <span className="font-bold block text-blue-600 no-underline">After-Tax Income</span>
                <span className="text-sm text-gray-500 no-underline">See your annual take-home pay and effective tax rate.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <PaycheckCalculator />
    </CalculatorPage>
  );
}

