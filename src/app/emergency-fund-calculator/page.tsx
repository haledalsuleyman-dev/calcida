import { CalculatorPage } from '@/components/CalculatorPage';
import { EmergencyFundCalculator } from '@/components/calculators/finance/EmergencyFundCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata, absoluteUrl } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('emergency-fund');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Emergency Fund Calculator (${currentYear}): Check Your Safety Net`,
  description: `Calculate exactly how much cash you need in an emergency fund. Tally your essential expenses and prepare for job loss or medical crises free and instantly.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `Emergency Fund Calculator (${currentYear}): Check Your Safety Net`,
    description: `Calculate exactly how much cash you need in an emergency fund. Tally your essential expenses and prepare for job loss or medical crises free and instantly.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const EMERGENCY_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is an emergency fund?",
    answer: "An emergency fund is a stash of purely liquid cash set aside to cover massive, unexpected financial events—such as unexpected job loss, major medical hospital bills, or urgent home repairs."
  },
  {
    question: "How many months of expenses do I need?",
    answer: "Financial experts recommend 3 to 6 months of absolute bare-minimum living expenses. If you are single with a highly stable job, 3 months might suffice. If you have dependents, a mortgage, or have a volatile income (like a freelancer), target 6 to 9 months."
  },
  {
    question: "Where should I store my emergency fund?",
    answer: "Your emergency fund must be liquid (instantly accessible sans penalties). A High-Yield Savings Account (HYSA) is perfect because it earns 4-5% APY without risking the principal. NEVER invest your emergency cash into the stock market; a market crash often coincides directly with mass job losses."
  },
  {
    question: "Do I include eating out and Netflix in the calculation?",
    answer: "No. If you lose your job tomorrow, you will cancel Netflix and stop ordering DoorDash. Only include structural 'must-pay' essentials: housing, groceries, utilities, insurance, and minimum debt payments."
  },
  {
    question: "Should I build my emergency fund before paying off debt?",
    answer: "You should build a 'Starter' emergency fund of $1,000 to $2,000 immediately to buffer against minor disasters (like a blown tire). Then, aggressively pay off high-interest toxic debt like credit cards. Only after toxic debt is gone should you slowly build the full 3-6 month safety net."
  }
];

export default function EmergencyFundPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={EMERGENCY_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Life is unpredictable. Without a dedicated financial safety net, a single medical emergency, car breakdown, or sudden layoff will instantly force you into terrifying, high-interest credit card debt.
          </p>
          <p>
            Our <strong>Emergency Fund Calculator</strong> helps you accurately identify exactly how much liquid cash you need to survive. Instead of guessing, we strip away your luxury spending and calculate your "bare-bones" survival number.
          </p>
          <p>
            Establishing this fortified wall of cash is Step 1 of all wealth building. You cannot risk investing in the stock market until your baseline structure is indestructible.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            Calculating your emergency safety net requires harsh honesty. We only care about what it costs to literally keep a roof over your head and food on the table while you search for highly-pressing new income.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">The Survival Formula:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-medium text-gray-900">Isolate Core Housing:</span> Add your Mortgage/Rent, mandatory property insurance, and base utilities (water, power, trash).
              </li>
              <li>
                <span className="font-medium text-gray-900">Add Biological Needs:</span> Strictly calculate your grocery budget and essential medical medications or health insurance premiums.
              </li>
              <li>
                <span className="font-medium text-gray-900">Add Core Transportation:</span> If you need a car to interview for jobs, add your auto loan minimums, gas, and auto insurance.
              </li>
              <li>
                <span className="font-medium text-gray-900">Multiply by Risk Margin:</span> Take that monthly "survival" total and multiply it by 3, 6, or 9 months depending on the volatility of your livelihood.
              </li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>Your target number is derived from a brutally simple multiplication:</p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-xl my-4 text-red-900 font-bold">
            Target Cache = Monthly Survival Expenses × Months of Protection
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-bold text-blue-900 mb-4 text-lg">
            Example: Sizing up a 6-Month Shield
          </p>
          <p className="mb-4 text-gray-700">A married couple with one child wants to prepare for a worst-case scenario layoff. They drop all their expensive hobbies and uncover their base survival baseline:</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Housing (Rent & Utilities):</span> <span className="font-medium">$1,800</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Groceries & Essentials:</span> <span className="font-medium">$800</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Must-Pay Debts (Car, Minimum CC):</span> <span className="font-medium">$500</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Insurance (Health + Auto):</span> <span className="font-medium">$400</span>
            </li>
            <li className="flex justify-between pb-2 pt-1 bg-red-100 px-2 rounded">
              <span className="font-medium text-red-900">Core Monthly Survival Cost:</span> <span className="font-bold text-red-900">$3,500</span>
            </li>
            
            <li className="flex justify-between pt-4 pb-2 border-b border-blue-200">
              <span className="font-bold text-gray-900">Target Coverage Margin:</span> 
              <span className="font-bold">6 Months</span>
            </li>
            
            <li className="flex justify-between pt-2">
              <span className="text-xl font-bold text-blue-900">Emergency Fund Target:</span> 
              <span className="text-xl font-bold text-blue-900">$21,000</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *This $21,000 must sit untouched in a High-Yield Savings Account. It acts as an absolute psychological fortress if their company ever goes bankrupt.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              The "Starter" vs. The "Fully Funded" Fund
            </h2>
            <p className="mb-4 text-gray-700">
              If your target number is $20,000, that can feel overwhelmingly impossible alongside paying off credit card debt. That is why you split the mission into two phases:
            </p>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-red-500">
                <h3 className="font-bold text-gray-900">Phase 1: The $1,000 Starter Filter</h3>
                <p className="text-gray-600 mt-1">Halt all stock investing and save up $1,000 (or one full month of rent). This catches minor crises—like a busted alternator or a minor ER visit—preventing you from turning to predatory payday loans while you are trying to pay off your credit cards.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-red-500">
                <h3 className="font-bold text-gray-900">Phase 2: The Fully Funded Shield</h3>
                <p className="text-gray-600 mt-1">Once all non-mortgage toxic debt is cleared out of your life, you pivot your massive freed-up cash flow to rapidly inflate the Starter fund up to your full 3-6 month target.</p>
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Financial Defense Tools</h2>
            <p className="mb-4 text-gray-700">Analyze your expenses and plot your timeline out of debt to accelerate your savings capability:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/budget-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Monthly Budget Tool</span>
                <span className="text-sm text-gray-500 mt-2 block">Map out exactly where every dollar of your paycheck is going to find fat that you can trim and route into savings.</span>
              </Link>
              <Link href="/credit-card-payoff-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Credit Card Demolition</span>
                <span className="text-sm text-gray-500 mt-2 block">Create an unforgiving math structure to rapidly eliminate 25% APR consumer debts.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <EmergencyFundCalculator />
    </CalculatorPage>
  );
}
