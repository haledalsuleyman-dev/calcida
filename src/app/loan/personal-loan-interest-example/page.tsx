import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl } from '@/lib/utils';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { FAQ } from '@/components/calculators/FAQ';

export const metadata: Metadata = {
  title: 'Personal Loan Interest Example: See How Interest Adds Up',
  description: 'See a personal loan interest example and estimate monthly payment and total interest with a free calculator. Compare APR and term scenarios.',
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: '/loan/personal-loan-interest-example' },
  openGraph: {
    title: 'Personal Loan Interest Example',
    description: 'Understand how personal loan interest works and estimate total interest cost.',
    url: '/loan/personal-loan-interest-example',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How does interest work on a personal loan?',
    answer:
      'Most personal loans are amortizing installment loans. Each payment includes interest and principal. Early payments usually include more interest; later payments include more principal.',
  },
  {
    question: 'Why do I pay more interest at the beginning?',
    answer:
      'Interest is calculated on the remaining balance. At the start, the balance is highest, so interest is higher. As you pay principal down, interest decreases over time.',
  },
  {
    question: 'Is APR the same as interest rate?',
    answer:
      'Not always. APR can include certain fees in addition to the interest rate, so it is often the better metric to compare loan offers.',
  },
  {
    question: 'Do extra payments reduce interest on a personal loan?',
    answer:
      'Usually, yes. Extra payments reduce principal sooner, which reduces future interest. Confirm there is no prepayment penalty and that extra payments apply to principal.',
  },
  {
    question: 'How can I lower total interest paid?',
    answer:
      'Lower the APR, choose a shorter term if the payment fits your budget, and consider making extra principal payments.',
  },
  {
    question: 'What is a realistic personal loan interest example to start with?',
    answer:
      'A common comparison is a 3–5 year term with a mid-range APR. Use the calculator below, then try a lower APR and a shorter term to see the impact on total interest.',
  },
];

export default function PersonalLoanInterestExamplePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Personal Loan Interest Example</h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="text-xl leading-relaxed mb-6">
          If you are comparing personal loan offers, the monthly payment is only part of the story. The interest rate (and APR) plus the term determines how much
          total interest you pay over time. This page shows a realistic example you can adjust.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Scenario Explanation</h2>
        <ul>
          <li>
            <strong>APR:</strong> Higher APR increases monthly payment and total interest.
          </li>
          <li>
            <strong>Term:</strong> Longer terms reduce monthly payment but usually increase total interest.
          </li>
          <li>
            <strong>Amortization:</strong> Early payments are interest-heavy because the balance is highest at the start.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Realistic Example</h2>
        <p>
          Example inputs: $15,000 loan, 11.5% APR, 4-year term. Use the calculator output to compare total interest across scenarios. Then try a 3-year term and
          a lower APR to see how much interest you can save.
        </p>
      </div>

      <div className="mt-6">
        <LoanCalculator type="personal" defaultValues={{ amount: 15000, rate: 11.5, term: 4 }} />
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
            <Link href="/personal-loan-calculator" className="text-blue-600 hover:underline font-medium">
              Personal Loan Calculator
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
        </ul>
      </div>

      <FAQ items={faqs} />
    </div>
  );
}

