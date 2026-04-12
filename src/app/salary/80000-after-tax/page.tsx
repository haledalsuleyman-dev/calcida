import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { TakeHomePayCalculator } from '@/components/calculators/salary/TakeHomePayCalculator';
import { FAQ } from '@/components/calculators/FAQ';
import { TrustBadge } from '@/components/TrustBadge';

export const metadata: Metadata = {
  title: `$80,000 After Tax (${new Date().getFullYear()}): Estimate Take-Home Pay`,
  description: 'Estimate $80,000 salary after tax. Compare take-home pay by pay period with deductions and filing assumptions using a free calculator.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/salary/80000-after-tax' },
  openGraph: {
    title: '$80,000 After Tax: Estimate Take-Home Pay',
    description: 'Estimate take-home pay on an $80,000 salary after taxes and deductions.',
    url: '/salary/80000-after-tax',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How much is $80,000 after tax?',
    answer:
      'It depends on filing status, state taxes, pre-tax contributions, and deductions. Use the calculator below to estimate take-home pay and compare scenarios.',
  },
  {
    question: 'What is $80,000 a year monthly after taxes?',
    answer:
      'Monthly take-home pay varies. A practical approach is to estimate net annual pay first, then divide by 12 for a stable monthly budget number.',
  },
  {
    question: 'Do 401(k) contributions reduce taxable income?',
    answer:
      'Traditional 401(k) contributions are usually pre-tax and can reduce taxable income. Roth 401(k) contributions are typically post-tax.',
  },
  {
    question: 'Does this include bonuses?',
    answer:
      'Only if you add them. If your compensation includes a bonus, add it as additional income and compare a “base-only” scenario to a “base + bonus” scenario.',
  },
  {
    question: 'Why can two people with the same salary have different take-home pay?',
    answer:
      'Different states, filing status, benefits costs, retirement contributions, and withholding settings can change net pay materially.',
  },
  {
    question: 'Is this an exact tax calculation?',
    answer:
      'No. This is a planning estimate for take-home pay. Actual taxes owed depend on credits, deductions, and your full tax situation.',
  },
];

export default function Salary80000AfterTaxPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <TrustBadge />
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$80,000 After Tax: What You Take Home</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          A <strong>$80,000 salary</strong> can translate to very different take-home pay depending on taxes and deductions. Use the calculator below to estimate
          net pay per year, month, and paycheck, then adjust contributions and benefits to match your real situation.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Scenario Explanation (80k Salary)</h2>
        <ul>
          <li>
            Start with gross pay: $80,000/year is <strong>$6,666.67/month gross</strong>.
          </li>
          <li>Pre-tax deductions (like a traditional 401(k) or HSA) can reduce taxable income.</li>
          <li>State taxes can be a major driver, especially in higher-tax states.</li>
          <li>Pay frequency changes cash flow even when annual pay is the same.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example starting point: $80,000/year is <strong>$6,666.67/month gross</strong>. From there, subtract estimated taxes and deductions to estimate net pay.
          If you're a single filer in a state with no income tax (like Texas or Florida), your monthly take-home might be around <strong>$5,450</strong>. In a higher-tax state like California or New York, that same $80k might result in roughly <strong>$5,000</strong> after all withholdings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Why This Calculation Matters</h2>
        <p>
          Earning $80,000 puts you above the national median income, but without a clear understanding of your take-home pay, it's easy to overcommit financially. Knowing your net pay allows you to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Optimize Retirement Contributions:</strong> See how increasing your 401(k) contribution by 1% or 2% affects your monthly spending money.</li>
          <li><strong>Accurate Housing Budgeting:</strong> Use your actual $5,000+ net pay to determine how much you can comfortably spend on a mortgage or rent.</li>
          <li><strong>Tax Planning:</strong> Understand your effective tax rate and how it changes if you move between states or change your filing status.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Take-Home Pay Calculator</h2>
      </div>

      <div className="mt-6">
        <TakeHomePayCalculator defaultValues={{ income: 80000 }} />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Salaries & Tools</h2>
        <p>
          Compare your $80k salary with these other common income levels and tools:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li>
            <Link href="/salary/70000-after-tax" className="text-blue-600 hover:underline font-medium">
              $70,000 After Tax Breakdown
            </Link>
          </li>
          <li>
            <Link href="/salary/90000-after-tax" className="text-blue-600 hover:underline font-medium">
              $90,000 After Tax Breakdown
            </Link>
          </li>
          <li>
            <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline font-medium">
              $80,000 Salary to Hourly Converter
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

