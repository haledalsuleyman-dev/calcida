import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { TakeHomePayCalculator } from '@/components/calculators/salary/TakeHomePayCalculator';
import { FAQ } from '@/components/calculators/FAQ';
import { TrustBadge } from '@/components/TrustBadge';

export const metadata: Metadata = {
  title: `$60,000 After Tax (${new Date().getFullYear()}): Estimate Take-Home Pay`,
  description: 'Estimate $60,000 salary after tax with a fast take-home pay calculator. Compare monthly and per-paycheck net pay with deductions—free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/salary/60000-after-tax' },
  openGraph: {
    title: '$60,000 After Tax: Estimate Take-Home Pay',
    description: 'Estimate take-home pay on a $60k salary after taxes and deductions.',
    url: '/salary/60000-after-tax',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How much is $60,000 after tax?',
    answer:
      'It depends on filing status, state, pre-tax benefits, and deductions. Use the calculator below to estimate your take-home pay and compare scenarios.',
  },
  {
    question: 'What is $60,000 a year monthly after taxes?',
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

export default function Salary60000AfterTaxPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <TrustBadge />
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$60,000 After Tax: What You Take Home</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          A <strong>$60,000 salary</strong> can look very different after federal taxes, state taxes, payroll taxes, and deductions. Use the calculator below to
          estimate take-home pay across pay periods and see how benefits like retirement contributions affect net pay.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example starting point: $60,000/year is <strong>$5,000/month gross</strong>. From there, subtract estimated taxes and deductions to estimate net pay.
          For instance, a single filer in a state like Tennessee or Washington (no income tax) might take home roughly <strong>$4,150</strong> per month. In a state with higher taxes like New York, that same $60k might result in about <strong>$3,850</strong> after all withholdings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Why This Calculation Matters</h2>
        <p>
          Knowing your exact take-home pay is the foundation of a solid financial plan. Many people make the mistake of budgeting based on their gross $5,000 monthly income, only to find they have significantly less available after taxes. Understanding your net pay helps you:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Set a Realistic Rent Goal:</strong> Ensure your housing costs don't exceed a safe percentage of your actual cash in hand.</li>
          <li><strong>Plan for Retirement:</strong> See how a 5% or 10% 401(k) contribution impacts your monthly spending power.</li>
          <li><strong>Emergency Fund Planning:</strong> Calculate how many months of <em>net pay</em> you need to save for a true safety net.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Take-Home Pay Calculator</h2>
      </div>

      <div className="mt-6">
        <TakeHomePayCalculator defaultValues={{ income: 60000 }} />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Salaries & Tools</h2>
        <p>
          Compare your $60k salary with these other common income levels and tools:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li>
            <Link href="/salary/50000-to-hourly" className="text-blue-600 hover:underline font-medium">
              $50,000 After Tax Breakdown
            </Link>
          </li>
          <li>
            <Link href="/salary/70000-after-tax" className="text-blue-600 hover:underline font-medium">
              $70,000 After Tax Breakdown
            </Link>
          </li>
          <li>
            <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline font-medium">
              $60,000 Salary to Hourly Converter
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
