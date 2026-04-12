import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { TakeHomePayCalculator } from '@/components/calculators/salary/TakeHomePayCalculator';
import { FAQ } from '@/components/calculators/FAQ';
import { TrustBadge } from '@/components/TrustBadge';

export const metadata: Metadata = {
  title: `$70,000 After Tax (${new Date().getFullYear()}): Estimate Take-Home Pay`,
  description: 'Estimate $70,000 salary after tax with a fast take-home pay calculator. Compare monthly and per-paycheck net pay with deductions—free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/salary/70000-after-tax' },
  openGraph: {
    title: '$70,000 After Tax: Estimate Take-Home Pay',
    description: 'Estimate take-home pay on a $70k salary after taxes and deductions.',
    url: '/salary/70000-after-tax',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How much is $70,000 after tax?',
    answer:
      'It depends on filing status, state, pre-tax benefits, and deductions. Use the calculator below to estimate your take-home pay and compare scenarios.',
  },
  {
    question: 'What is $70,000 a year monthly after taxes?',
    answer:
      'Monthly take-home pay varies by taxes and deductions. Start by estimating net annual pay, then divide by 12 for a consistent monthly budget number.',
  },
  {
    question: 'Does a 401(k) contribution reduce taxes?',
    answer:
      'Traditional 401(k) contributions are usually pre-tax and can reduce taxable income. Roth contributions are typically post-tax.',
  },
  {
    question: 'Does this include health insurance deductions?',
    answer:
      'Only if you enter them. Many employer health plans are pre-tax, which can change taxable income and your take-home estimate.',
  },
  {
    question: 'Is this a tax return calculator?',
    answer:
      'No. It estimates withholding and net pay for planning. Actual tax owed depends on credits, deductions, and your full tax situation.',
  },
  {
    question: 'How can I make this estimate more accurate?',
    answer:
      'Use a recent pay stub and mirror your pay frequency, benefits, and withholding. Then adjust inputs until your estimate matches your real net pay.',
  },
];

export default function Salary70000AfterTaxPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <TrustBadge />
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$70,000 After Tax: What You Take Home</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          A <strong>$70,000 salary</strong> can look very different after federal taxes, state taxes, payroll taxes, and deductions. Use the calculator below to
          estimate take-home pay across pay periods and see how benefits like retirement contributions affect net pay.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example starting point: $70,000/year is <strong>$5,833/month gross</strong>. From there, subtract estimated taxes and deductions to estimate net pay.
          If you're a single filer in a state with no income tax (like Texas or Florida), your monthly take-home might be around <strong>$4,800</strong>. In a higher-tax state like California, that same $70k might result in roughly <strong>$4,400</strong> after all withholdings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Why This Calculation Matters</h2>
        <p>
          Understanding your after-tax income is the only way to build a realistic budget. Relying on your gross salary can lead to overspending because it doesn't account for the roughly 20-25% that goes toward taxes and benefits. By knowing your actual net pay, you can accurately plan for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Housing costs:</strong> Aiming for 30% of your net pay rather than gross for a safer financial cushion.</li>
          <li><strong>Debt repayment:</strong> Seeing exactly how much is available to put toward student loans or credit cards.</li>
          <li><strong>Savings goals:</strong> Setting realistic targets for an emergency fund or retirement based on what hits your bank account.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Take-Home Pay Calculator</h2>
      </div>

      <div className="mt-6">
        <TakeHomePayCalculator defaultValues={{ income: 70000 }} />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Salaries & Tools</h2>
        <p>
          Compare your $70k salary with these other common income levels and tools:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li>
            <Link href="/salary/60000-after-tax" className="text-blue-600 hover:underline font-medium">
              $60,000 After Tax Breakdown
            </Link>
          </li>
          <li>
            <Link href="/salary/80000-after-tax" className="text-blue-600 hover:underline font-medium">
              $80,000 After Tax Breakdown
            </Link>
          </li>
          <li>
            <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline font-medium">
              $70,000 Salary to Hourly Converter
            </Link>
          </li>
          <li>
            <Link href="/budget-calculator" className="text-blue-600 hover:underline font-medium">
              Monthly Budget Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}
