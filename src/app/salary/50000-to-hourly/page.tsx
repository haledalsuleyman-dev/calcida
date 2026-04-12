import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { SalaryToHourlyCalculator } from '@/components/calculators/salary/SalaryToHourlyCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: '50000 a Year Is How Much an Hour? Salary to Hourly Calculator',
  description: 'Convert a $50,000 salary to hourly pay fast. See hourly, weekly, and monthly breakdowns based on hours/week and weeks/year—free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/salary/50000-to-hourly' },
  openGraph: {
    title: '50000 a Year Is How Much an Hour?',
    description: 'Convert $50,000/year to hourly pay with a realistic work schedule.',
    url: '/salary/50000-to-hourly',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is $50,000 a year per hour?',
    answer:
      'On a standard 40 hours/week and 52 weeks/year schedule (2,080 hours), $50,000/year is about $24.04/hour. Your hourly rate changes if you work fewer weeks or hours.',
  },
  {
    question: 'Is $50,000 a year the same as $24/hour?',
    answer:
      'Not exactly. $24/hour at 40 hours/week for 52 weeks is $49,920/year. Small differences usually come from rounding or different assumptions.',
  },
  {
    question: 'What if I take unpaid time off?',
    answer:
      'If you work fewer weeks (or take unpaid time off), your effective hourly rate can increase because the same annual salary is spread over fewer working hours.',
  },
  {
    question: 'Does this include taxes?',
    answer:
      'No. This page converts gross salary into an hourly figure. For take-home pay, use the Take-Home Pay Calculator.',
  },
  {
    question: 'How much is $50,000 a year monthly?',
    answer:
      'Gross monthly pay is $50,000 ÷ 12 ≈ $4,166.67 before taxes and deductions.',
  },
  {
    question: 'What hours per week should I use?',
    answer:
      'Use the hours you actually work. If your schedule varies, use an average and compare a few scenarios to see the range.',
  },
];

export default function Salary50000ToHourlyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">50000 a Year Is How Much an Hour?</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          If you make <strong>$50,000 per year</strong>, your hourly pay depends on your schedule. Use the calculator below to convert $50,000 to an hourly rate
          based on your real hours per week and weeks worked per year.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Quick Example (Standard Full-Time)</h2>
        <p>
          Example assumptions: <strong>40 hours/week</strong> and <strong>52 weeks/year</strong> (2,080 hours). Estimated hourly rate:{' '}
          <strong>≈ $24.04/hour</strong>.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Salary to Hourly Calculator</h2>
      </div>

      <div className="mt-6">
        <SalaryToHourlyCalculator />
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
            <Link href="/after-tax-income-calculator" className="text-blue-600 hover:underline font-medium">
              After-Tax Income Calculator
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

