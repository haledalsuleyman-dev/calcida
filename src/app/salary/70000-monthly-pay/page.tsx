import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { GeneratedCalculator } from '@/components/calculators/generated/GeneratedCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: '$70,000 a Year Is How Much a Month? Monthly Pay Calculator',
  description: 'Convert a $70,000 salary to monthly pay fast. See gross monthly income and compare scenarios with a free monthly salary calculator.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/after-tax-income-calculator' },
  robots: { index: false, follow: true },
  openGraph: {
    title: '$70,000 a Year Is How Much a Month?',
    description: 'Convert $70,000/year to monthly pay and explore scenarios.',
    url: '/salary/70000-monthly-pay',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is $70,000 a year monthly?',
    answer: 'Gross monthly pay is $70,000 ÷ 12 ≈ $5,833.33 before taxes and deductions.',
  },
  {
    question: 'Why can monthly pay look different on a paycheck?',
    answer:
      'Many jobs pay biweekly (26 checks) or semi-monthly (24 checks). The per-check amount can differ from a simple monthly average even if annual pay is the same.',
  },
  {
    question: 'Is this monthly pay after taxes?',
    answer:
      'No. This page converts gross salary into a monthly figure. For after-tax estimates, use the Take-Home Pay Calculator.',
  },
  {
    question: 'How much is $70,000 a year biweekly?',
    answer: 'Gross biweekly pay is $70,000 ÷ 26 ≈ $2,692.31 before taxes.',
  },
  {
    question: 'How do bonuses or commissions affect monthly pay?',
    answer:
      'If income is irregular, your “typical” monthly pay can differ from the annual average. Model base pay separately, then add expected variable pay as a separate scenario.',
  },
  {
    question: 'Should I budget using gross or net monthly pay?',
    answer:
      'Most people budget with net (take-home) pay because that is the money available to spend. Use the Take-Home Pay Calculator for a net estimate.',
  },
];

export default function Salary70000MonthlyPayPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$70,000 a Year Is How Much a Month?</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          If you earn <strong>$70,000 per year</strong>, a quick monthly breakdown is useful for budgeting and planning. Use the calculator below to convert your
          annual salary into monthly income (and related pay periods).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Quick Example</h2>
        <p>
          $70,000/year ÷ 12 ≈ <strong>$5,833.33/month</strong> (gross). For an after-tax estimate, link your scenario to the{' '}
          <Link href="/take-home-pay-calculator" className="text-blue-600 hover:underline font-medium">
            Take-Home Pay Calculator
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Monthly Salary Calculator</h2>
      </div>

      <div className="mt-6">
        <GeneratedCalculator id="monthly-salary" />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Calculators</h2>
        <ul>
          <li>
            <Link href="/take-home-pay-calculator" className="text-blue-600 hover:underline font-medium">
              Take-Home Pay Calculator
            </Link>
          </li>
          <li>
            <Link href="/paycheck-calculator" className="text-blue-600 hover:underline font-medium">
              Paycheck Calculator
            </Link>
          </li>
          <li>
            <Link href="/salary-to-hourly-calculator" className="text-blue-600 hover:underline font-medium">
              Salary to Hourly Calculator
            </Link>
          </li>
          <li>
            <Link href="/hourly-to-salary-calculator" className="text-blue-600 hover:underline font-medium">
              Hourly to Salary Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

