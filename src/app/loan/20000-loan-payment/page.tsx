import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: '$20,000 Loan Payment: Estimate Monthly Payment',
  description: 'Estimate the monthly payment and total interest for a $20,000 personal loan. Compare APR and term scenarios with a free calculator.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/loan/20000-loan-payment' },
  openGraph: {
    title: '$20,000 Loan Payment: Estimate Monthly Payment',
    description: 'Estimate monthly payment and interest cost for a $20,000 loan.',
    url: '/loan/20000-loan-payment',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is the monthly payment on a $20,000 loan?',
    answer:
      'Monthly payment depends on your APR and loan term. Use the calculator below to estimate payment and total interest for your specific rate and years.',
  },
  {
    question: 'How much interest will I pay on a $20,000 loan?',
    answer:
      'Total interest depends on APR and term. Higher rates and longer terms usually increase total interest substantially, even if the monthly payment is lower.',
  },
  {
    question: 'Is it better to choose 3 years or 5 years?',
    answer:
      'A 3-year term usually costs less overall but has a higher payment. A 5-year term lowers the payment but often increases total interest. Compare both scenarios.',
  },
  {
    question: 'Can I lower the payment without extending the term?',
    answer:
      'Lowering the APR is typically the most effective way. Compare lenders, improve credit, or consider a co-signer if appropriate.',
  },
  {
    question: 'What if I make extra payments?',
    answer:
      'Extra payments can reduce total interest by paying principal down faster. Confirm your lender applies extra payments to principal and has no prepayment penalty.',
  },
  {
    question: 'Is APR the same as interest rate?',
    answer:
      'APR includes the interest rate plus certain fees, so it is often a better apples-to-apples comparison between lenders.',
  },
];

export default function Loan20000PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">$20,000 Loan Payment</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          A <strong>$20,000 loan</strong> can have very different monthly payments depending on APR and term length. Use the calculator below to estimate monthly
          payment and total interest, then compare options.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Scenario Explanation</h2>
        <ul>
          <li>Shorter terms usually cost less overall but require a higher monthly payment.</li>
          <li>Longer terms reduce the payment but can increase total interest paid.</li>
          <li>APR is the best comparison metric when lenders charge fees.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Example</h2>
        <p>
          Example scenario: $20,000 loan, a mid-range APR, and a 5-year term. Change the term to 3 years to see the payment increase and total interest decrease.
        </p>
      </div>

      <div className="mt-6">
        <LoanCalculator type="personal" defaultValues={{ amount: 20000, rate: 10.5, term: 5 }} />
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
            <Link href="/personal-loan-calculator" className="text-blue-600 hover:underline font-medium">
              Personal Loan Calculator
            </Link>
          </li>
          <li>
            <Link href="/credit-card-payoff-calculator" className="text-blue-600 hover:underline font-medium">
              Credit Card Payoff Calculator
            </Link>
          </li>
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

