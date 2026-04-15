import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: '$10,000 Loan Monthly Payment: Personal Loan Calculator',
  description: 'Estimate the monthly payment for a $10,000 personal loan. Adjust APR and term to compare costs and total interest—fast and free.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/personal-loan-calculator' },
  robots: { index: false, follow: true },
  openGraph: {
    title: '$10,000 Loan Monthly Payment',
    description: 'Estimate monthly payment and total interest for a $10,000 personal loan.',
    url: '/loan/10000-loan-monthly-payment',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is the monthly payment on a $10,000 loan?',
    answer:
      'Monthly payment depends on APR and term length. Use the calculator below to estimate the payment and total interest for your exact rate and years.',
  },
  {
    question: 'What APR should I use for a $10,000 personal loan?',
    answer:
      'APR varies by credit score, lender, and term. Compare multiple APR scenarios to see how rate changes the monthly payment and total cost.',
  },
  {
    question: 'Is a shorter loan term always better?',
    answer:
      'A shorter term usually reduces total interest but increases the monthly payment. Choose a term that fits your budget and payoff goals.',
  },
  {
    question: 'Does making extra payments reduce interest?',
    answer:
      'Usually, yes. Extra payments reduce principal sooner, which can reduce interest paid. Confirm your lender applies extra payments to principal.',
  },
  {
    question: 'Is this the same as a credit card payoff?',
    answer:
      'No. This assumes an installment loan with fixed payments. For credit card repayment strategies, use the Credit Card Payoff Calculator.',
  },
  {
    question: 'Does this include origination fees?',
    answer:
      'Not automatically. If your lender charges origination fees, factor them into your comparison when choosing between offers.',
  },
];

export default function Loan10000MonthlyPaymentPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$10,000 Loan Monthly Payment</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          If you borrow <strong>$10,000</strong>, your monthly payment depends mostly on the interest rate (APR) and the loan term. Use the calculator below to
          estimate monthly payment and total interest, then compare scenarios.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Scenario Explanation</h2>
        <ul>
          <li>Lower APR reduces both monthly payment and total interest.</li>
          <li>Longer terms reduce the monthly payment but increase total interest.</li>
          <li>Use a “conservative” APR and an “optimistic” APR to bracket real offers.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Example</h2>
        <p>
          Example scenario: $10,000 loan, a mid-range APR, and a 3-year term. Change the term to 5 years to see how much monthly payment drops and how much total
          interest increases.
        </p>
      </div>

      <div className="mt-6">
        <LoanCalculator type="personal" defaultValues={{ amount: 10000, rate: 11.9, term: 3 }} />
      </div>

      <div className="prose prose-blue max-w-none text-gray-700 mt-10">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Related Calculators</h2>
        <ul>
          <li>
            <Link href="/loan-comparison-calculator" className="text-blue-600 hover:underline font-medium">
              Loan Comparison Calculator
            </Link>
          </li>
          <li>
            <Link href="/debt-payoff-calculator" className="text-blue-600 hover:underline font-medium">
              Debt Payoff Calculator
            </Link>
          </li>
          <li>
            <Link href="/credit-card-payoff-calculator" className="text-blue-600 hover:underline font-medium">
              Credit Card Payoff Calculator
            </Link>
          </li>
          <li>
            <Link href="/personal-loan-calculator" className="text-blue-600 hover:underline font-medium">
              Personal Loan Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

