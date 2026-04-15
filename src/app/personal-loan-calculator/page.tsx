import { CalculatorPage } from '@/components/CalculatorPage';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { absoluteUrl } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('personal-loan');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Personal Loan Calculator (${currentYear}): Check Monthly Payments`,
  description: `Calculate monthly personal loan payments. See total interest paid, amortization schedules, and evaluate debt consolidation scenarios free and instantly.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `Personal Loan Calculator (${currentYear}): Check Monthly Payments`,
    description: `Calculate monthly personal loan payments. See total interest paid, amortization schedules, and evaluate debt consolidation scenarios free and instantly.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const PERSONAL_LOAN_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is an unsecured personal loan?",
    answer: "An unsecured personal loan is money borrowed without putting up collateral (like a house or car). Because the lender takes on more risk, unsecured loans usually have higher interest rates than secured loans."
  },
  {
    question: "Do personal loans have origination fees?",
    answer: "Many do. Lenders often charge an origination fee ranging from 1% to 8% of the loan amount. This is usually deducted directly from the loan proceeds. Make sure to check the APR to understand the true cost."
  },
  {
    question: "Is it smart to consolidate debt with a personal loan?",
    answer: "Yes, if you have high-interest credit card debt (e.g., 25% APR) and can qualify for a personal loan at a much lower rate (e.g., 10% APR). However, it only works if you do not immediately run your credit card balances back up."
  },
  {
    question: "How long are personal loan terms?",
    answer: "Personal loan repayment terms typically range from 12 to 60 months (1 to 5 years), though some lenders offer terms up to 84 months for larger consolidation loans."
  },
  {
    question: "Will taking out a personal loan hurt my credit score?",
    answer: "Initially, it may cause a small dip due to the 'hard inquiry' and the addition of new debt. But over time, if you make all your payments on time and lower your credit utilization ratio, it can actually strengthen your credit score."
  }
];

export default function PersonalLoanCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={PERSONAL_LOAN_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Whether you are looking to consolidate high-interest credit cards, fund a major home renovation, or cover unexpected medical expenses, personal loans can offer a structured lifeline.
          </p>
          <p>
            However, without running the math, it is dangerously easy to take on a loan that drains your monthly budget. Our <strong>Personal Loan Calculator</strong> instantly reveals your monthly obligation and total interest costs based on your specific APR and term length.
          </p>
          <p>
            Test different payoff timelines so you can safely lock in a loan that solves your financial problem rather than creating a new one.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            Personal loans function on fixed-installment agreements. That means your payment amount will not randomly change in the future like a credit card minimum payment might.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Input Variables:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><span className="font-medium text-gray-900">Loan Amount:</span> The total sum of cash you are requesting from the bank or online lender.</li>
              <li><span className="font-medium text-gray-900">Interest Rate (APR):</span> Your Annual Percentage Rate. Aim to use the APR rather than the base rate, as APR incorporates hidden origination fees.</li>
              <li><span className="font-medium text-gray-900">Loan Term:</span> The amount of months or years you have agreed to pay the loan back in full.</li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>
            The calculator relies on standard amortization mathematics. The formula ensures that by your final promised payment date, the principal balance reaches exactly $0.
          </p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4">
            M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <p className="text-sm text-gray-600">
            For advanced planning, remember that any extra payments you make will solely target the "P" (Principal), radically destroying the total interest the formula would otherwise generate over time.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-900 mb-4 text-lg">Scenario: Consolidating $15,000 in Credit Card Debt</p>
          <p className="mb-4 text-gray-700">You are tired of paying 28% interest on your credit cards. You take out a $15,000 personal loan from an online lender at a much lower 11.5% fixed APR to pay off the cards entirely in 3 years (36 months).</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Loan Amount:</span> <span className="font-medium">$15,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Loan Term:</span> <span className="font-medium">3 Years (36 Months)</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>APR:</span> <span className="font-medium">11.5% Fixed</span>
            </li>
            <li className="flex justify-between pt-2 text-blue-900">
              <span className="text-xl font-bold">Monthly Payment:</span> 
              <span className="text-xl font-bold">~$494</span>
            </li>
            <li className="flex justify-between pt-1 text-sm text-blue-700">
              <span>Total Interest Paid:</span> 
              <span>~$2,800</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Compared to sitting in 28% credit card debt, this move practically saves thousands in compound interest while giving you a hard finish line.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Common Pitfalls with Personal Loans</h2>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-yellow-500">
                <h3 className="font-bold text-gray-900">The "Endless Debt" Trap</h3>
                <p className="text-gray-600 mt-1">If you use a personal loan to consolidate $10,000 in credit card debt, you free up your credit cards. <strong>You must not use those cards again.</strong> Millions of people immediately run their cards back up, effectively doubling their debt burden.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-yellow-500">
                <h3 className="font-bold text-gray-900">Ignoring Origination Fees</h3>
                <p className="text-gray-600 mt-1">Many "low interest" lenders charge a 5% origination fee up front. If you borrow $10,000, they take $500 off the top. Make sure you actually receive enough cash to accomplish your specific goal.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-yellow-500">
                <h3 className="font-bold text-gray-900">Stretching the Term</h3>
                <p className="text-gray-600 mt-1">Choosing a 7-year term will make the monthly payment incredibly low, but personal loan interest rates are rarely cheap. Over a 7-year timeline, you might end up paying $8,000 in interest on a $15,000 loan.</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Compare Debt Strategies</h2>
            <p className="mb-4 text-gray-700">
              Personal loans excel at combating high interest rate debts. Check out our dedicated debt tools to verify your strategy:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/credit-card-payoff-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Credit Card Payoff</span>
                <p className="text-sm text-gray-600 mt-2">See exactly how long it takes to clear a credit card using the Snowball or Avalanche methods without taking out a loan.</p>
              </Link>
              <Link href="/auto-loan-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Auto Loan Calculator</span>
                <p className="text-sm text-gray-600 mt-2">Personal loans often have higher rates than secured auto loans. If buying a car, use our dedicated vehicle calc.</p>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <LoanCalculator type="personal" />
    </CalculatorPage>
  );
}
