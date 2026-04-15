import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { GeneratedCalculator } from '@/components/calculators/generated/GeneratedCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: 'How Much House Can I Afford on $70,000 Salary? Calculator',
  description: 'Estimate how much house you can afford on a $70,000 salary. Use a home affordability calculator with income, debts, down payment, and rate—free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/mortgage-affordability-calculator' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'How Much House Can I Afford on $70,000 Salary?',
    description: 'Estimate a home price range using income, debts, down payment, and interest rate assumptions.',
    url: '/mortgage/how-much-house-can-i-afford-on-70000-salary',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How much house can I afford on $70,000 a year?',
    answer:
      'It depends on your debts, down payment, interest rate, and property taxes/insurance. Start with gross income (~$5,833/month) and use the calculator to estimate a price range.',
  },
  {
    question: 'What monthly payment can I afford on a $70,000 salary?',
    answer:
      'Many guidelines start with a housing payment cap and a total debt-to-income cap. The right number depends on your budget, savings, and other obligations.',
  },
  {
    question: 'Does a down payment change affordability?',
    answer:
      'Yes. A larger down payment reduces the loan amount and can reduce PMI, which can meaningfully improve affordability.',
  },
  {
    question: 'Do property taxes and insurance matter?',
    answer:
      'They can be a large part of the monthly payment. If you ignore them, you can overestimate affordability.',
  },
  {
    question: 'How does interest rate affect what I can afford?',
    answer:
      'Higher rates increase the cost per borrowed dollar, which reduces the loan amount supported by the same monthly payment.',
  },
  {
    question: 'Should I use gross income or take-home pay?',
    answer:
      'Lenders often use gross income, but you should sanity-check the payment against your take-home pay to ensure it fits your monthly budget.',
  },
];

export default function HouseAffordability70000SalaryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">How Much House Can I Afford on a $70,000 Salary?</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          If you earn <strong>$70,000 per year</strong>, a quick affordability estimate starts with your gross monthly income (about{' '}
          <strong>$5,833/month</strong>). From there, the biggest drivers are your monthly debts, down payment, interest rate, and local taxes/insurance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Scenario-Specific Notes (70k Salary)</h2>
        <ul>
          <li>
            Start with income: $70,000/year ≈ $5,833/month gross. If you want to sanity-check budget fit, estimate net pay using the{' '}
            <Link href="/take-home-pay-calculator" className="text-blue-600 hover:underline font-medium">
              Take-Home Pay Calculator
            </Link>
            .
          </li>
          <li>Enter your recurring debts (car, credit cards, student loans) because they reduce what you can safely spend on housing.</li>
          <li>Model down payment and PMI assumptions. A 20% down payment often avoids PMI.</li>
          <li>Include realistic taxes and insurance so the monthly payment matches what you will actually pay.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example: $70,000 income, no other debts, 10% down, 30-year term, and a mid-range interest rate. Use this as a starting point, then adjust down payment
          and debt inputs to match your situation.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">House Affordability Calculator</h2>
      </div>

      <div className="mt-6">
        <GeneratedCalculator id="house-affordability" />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Calculators</h2>
        <ul>
          <li>
            <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline font-medium">
              Mortgage Payment Calculator
            </Link>
          </li>
          <li>
            <Link href="/down-payment-calculator" className="text-blue-600 hover:underline font-medium">
              Down Payment Calculator
            </Link>
          </li>
          <li>
            <Link href="/pmi-calculator" className="text-blue-600 hover:underline font-medium">
              PMI Calculator
            </Link>
          </li>
          <li>
            <Link href="/property-tax-calculator" className="text-blue-600 hover:underline font-medium">
              Property Tax Calculator
            </Link>
          </li>
          <li>
            <Link href="/mortgage-amortization-calculator" className="text-blue-600 hover:underline font-medium">
              Mortgage Amortization Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

