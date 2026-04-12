import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: 'Biweekly vs Monthly Mortgage Payments: Compare & Calculate',
  description: 'Compare biweekly vs monthly mortgage payments. Use a calculator to estimate payoff time and interest savings from paying every two weeks—free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/mortgage/biweekly-vs-monthly-mortgage' },
  openGraph: {
    title: 'Biweekly vs Monthly Mortgage Payments',
    description: 'Compare payment schedules and estimate interest savings with a biweekly mortgage calculator.',
    url: '/mortgage/biweekly-vs-monthly-mortgage',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Do biweekly mortgage payments save money?',
    answer:
      'Often, yes. Making 26 half-payments per year is roughly equivalent to making 13 monthly payments, which can reduce interest and shorten payoff time.',
  },
  {
    question: 'Is biweekly the same as paying extra principal monthly?',
    answer:
      'Biweekly schedules usually create an extra full payment each year. You can often replicate the effect by making a consistent extra principal payment monthly.',
  },
  {
    question: 'Is there a downside to biweekly payments?',
    answer:
      'The main downside is if your lender charges a fee or if your cash flow makes biweekly payments harder to manage. Always confirm payments are applied correctly.',
  },
  {
    question: 'How do I calculate my biweekly payment amount?',
    answer:
      'A common approach is to divide your monthly payment by 2 and pay that amount every two weeks. Use the calculator below to compare monthly vs biweekly scenarios.',
  },
  {
    question: 'Do biweekly payments reduce PMI faster?',
    answer:
      'They can, because you may pay principal down faster. PMI removal rules vary by loan type and lender, so confirm the requirements for your mortgage.',
  },
  {
    question: 'Should I refinance instead of switching to biweekly?',
    answer:
      'It depends. Refinancing can lower your rate but usually includes closing costs. Biweekly payments are often a low-friction way to reduce interest without refinancing.',
  },
];

export default function MortgageBiweeklyVsMonthlyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Biweekly vs Monthly Mortgage Payments</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          Most mortgages are paid monthly, but a biweekly schedule can shorten payoff time by effectively adding an extra payment each year. Use the calculator
          below to compare monthly and biweekly schedules using your own loan details.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How It Works</h2>
        <ul>
          <li>Monthly: 12 payments per year.</li>
          <li>Biweekly: 26 half-payments per year (about 13 full payments).</li>
          <li>The extra principal reduces the balance faster, which reduces future interest.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example: a 30-year fixed mortgage with a mid-range rate. Compare monthly vs biweekly and watch how payoff time and total interest change. For refinance
          break-even math, use the{' '}
          <Link href="/refinance-calculator" className="text-blue-600 hover:underline font-medium">
            Refinance Calculator
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Biweekly vs Monthly Calculator</h2>
      </div>

      <div className="mt-6">
        <MortgageCalculator showBiWeekly={true} defaultValues={{ paymentFrequency: 'monthly' }} />
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
            <Link href="/extra-payment-mortgage-calculator" className="text-blue-600 hover:underline font-medium">
              Extra Mortgage Payment Calculator
            </Link>
          </li>
          <li>
            <Link href="/mortgage-amortization-calculator" className="text-blue-600 hover:underline font-medium">
              Mortgage Amortization Calculator
            </Link>
          </li>
          <li>
            <Link href="/refinance-calculator" className="text-blue-600 hover:underline font-medium">
              Refinance Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

