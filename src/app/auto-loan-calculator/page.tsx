import { CalculatorPage } from '@/components/CalculatorPage';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { absoluteUrl } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('auto-loan');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Auto Loan Calculator (${currentYear}): Estimate Your Car Payment`,
  description: `Estimate your monthly car payment with this free auto loan calculator. Factor in the vehicle price, down payment, trade-in value, taxes, and interest rate.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `Auto Loan Calculator (${currentYear}): Estimate Your Car Payment`,
    description: `Estimate your monthly car payment with this free auto loan calculator. Factor in the vehicle price, down payment, trade-in value, taxes, and interest rate.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const AUTO_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is a good interest rate for a car loan?",
    answer: "Interest rates depend heavily on your credit score and the age of the vehicle. Generally, an excellent credit score can secure an APR below 6% for new cars and below 8% for used cars, but market conditions fluctuate."
  },
  {
    question: "Should I finance for 48, 60, or 72 months?",
    answer: "A standard, healthy auto loan term is 48 to 60 months. While 72 or 84 months will drastically reduce your monthly payment, you will pay far more in total interest and risk being 'underwater' (owing more than the car is worth) due to rapid depreciation."
  },
  {
    question: "How does my down payment affect the car loan?",
    answer: "A down payment directly reduces the principal amount you need to borrow. This lowers your monthly payment, decreases the total interest paid over the life of the loan, and protects you against immediate depreciation."
  },
  {
    question: "What are sales tax and dealer fees?",
    answer: "Sales tax is calculated by your state and local government based on the purchase price. Dealer fees (document fees, transport, etc.) are added by the dealership. It is crucial to negotiate the 'out-the-door' price rather than just the monthly payment."
  },
  {
    question: "Is it better to take cash back or a lower APR?",
    answer: "This is a math problem! Sometimes a 0% APR deal is better, but often, taking a $3,000 cash rebate and securing your own financing at a moderate rate through a credit union yields a cheaper overall cost. You must run both scenarios."
  }
];

export default function AutoLoanCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={AUTO_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Dealerships love to negotiate based on the "monthly payment" because it allows them to hide the true cost of the vehicle by extending the loan term. Don't fall into that trap.
          </p>
          <p>
            Our <strong>Auto Loan Calculator</strong> empowers you to take control of the financing. By entering the vehicle price, your down payment, and a realistic interest rate, you can instantly see exactly what your monthly car payment should be.
          </p>
          <p>
            Run multiple scenarios before you ever step foot on the lot, guaranteeing that you secure a deal that actually fits your budget.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator mimics the exact math used by banks and dealership finance departments (F&I) to determine your auto loan.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">How We Find Your Payment:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><span className="font-medium text-gray-900">Total Purchase Price:</span> We start with the sticker price and add estimated sales tax and typical dealer documentation fees to find your out-the-door cost.</li>
              <li><span className="font-medium text-gray-900">Subtract Credits:</span> We subtract your cash down payment and the trade-in value of your current vehicle to arrive at your Total Loan Amount.</li>
              <li><span className="font-medium text-gray-900">Amortization:</span> The Total Loan Amount is put into a standard amortization formula, distributing the cost and the APR across your chosen loan term.</li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>
            Auto loans use fixed-rate amortization. This means your monthly payment stays exactly the same every month. Early in the loan, more of your payment goes toward interest, but over time, the majority goes toward principal.
          </p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4">
            A = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <p className="text-sm text-gray-600">
            <em>Where <strong>A</strong> is the monthly payment, <strong>P</strong> is the principal loan amount, <strong>r</strong> is the monthly interest rate, and <strong>n</strong> is the number of months.</em>
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-900 mb-4 text-lg">Example: Financing a $32,000 SUV</p>
          <p className="mb-4 text-gray-700">Imagine you are buying a used SUV. You have $4,000 to put down and a trade-in worth $3,000. You've secured a 7% interest rate through your local credit union over a standard 60-month term.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Vehicle Negotiated Price:</span> <span className="font-medium">$32,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Less Down Payment:</span> <span className="font-medium text-red-600">-$4,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Less Trade-In Value:</span> <span className="font-medium text-red-600">-$3,000</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span className="font-bold">Total Loan Amount:</span> <span className="font-bold">$25,000</span>
            </li>
            <li className="flex justify-between pt-2">
              <span>Loan Term:</span> <span className="font-medium">60 Months</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Interest Rate (APR):</span> <span className="font-medium">7.0%</span>
            </li>
            <li className="flex justify-between pt-2 text-blue-900">
              <span className="text-xl font-bold">Monthly Payment:</span> 
              <span className="text-xl font-bold">~$495</span>
            </li>
            <li className="flex justify-between pt-1 text-sm text-blue-700">
              <span>Total Interest Over 5 Years:</span> 
              <span>~$4,701</span>
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3 Golden Rules for Buying a Car</h2>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900">Rule 1: Use the 20/4/10 Guideline</h3>
                <p className="text-gray-600 mt-1">Financial experts generally recommend putting at least 20% down, keeping the loan term to no more than 4 years (48 months), and ensuring your total transportation expenses don't exceed 10% of your gross monthly income.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900">Rule 2: Get Pre-Approved First</h3>
                <p className="text-gray-600 mt-1">Never walk into a dealership praying they give you a good rate. Secure pre-approval from a bank or credit union before you shop. This effectively makes you a cash buyer and forces the dealership to beat your rate to earn your financing.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900">Rule 3: Beware of 84-Month Loans</h3>
                <p className="text-gray-600 mt-1">A 7-year loan guarantees that your car's value will drop much faster than you can pay off the principal. If it gets totaled in year four, insurance will pay you market value, but you will still owe the bank thousands of dollars (being "underwater").</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Continue Your Financial Planning</h2>
            <p className="mb-4 text-gray-700">
              Make sure this vehicle fits into your broader financial picture with these tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/personal-loan-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Personal Loan Calculator</span>
                <p className="text-sm text-gray-600 mt-2">Determine the total cost of any fixed-rate loan, perfect for unexpected expenses or debt consolidation.</p>
              </Link>
              <Link href="/loan-comparison-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded hover:border-blue-500 transition-colors group no-underline">
                <span className="font-bold text-blue-600 text-lg group-hover:underline">Loan Comparison Engine</span>
                <p className="text-sm text-gray-600 mt-2">Plug in the dealer's loan offer vs. your credit union's loan offer and see exactly which one saves you more money.</p>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <LoanCalculator type="auto" />
    </CalculatorPage>
  );
}
