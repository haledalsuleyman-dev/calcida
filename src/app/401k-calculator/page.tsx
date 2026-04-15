import { CalculatorPage } from '@/components/CalculatorPage';
import { RetirementCalculator } from '@/components/calculators/retirement/RetirementCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const spec = getCalculatorSpec('401k');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `401(k) Calculator (${currentYear}): Project Your Retirement Balance`,
  description: `Calculate your 401(k) retirement balance. Instantly model how your contributions, employer match, and market returns multiply your wealth over time.`,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: `401(k) Calculator (${currentYear}): Project Your Retirement Balance`,
    description: `Calculate your 401(k) retirement balance. Instantly model how your contributions, employer match, and market returns multiply your wealth over time.`,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

const FOUR_OH_ONE_K_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "What is an employer 401(k) match?",
    answer: "A 401(k) match is free money your employer gives you for investing in your own retirement. If a company offers a '100% match up to 5%', it means if you contribute 5% of your salary to the 401(k), the employer will also deposit an amount equal to 5% of your salary into the account."
  },
  {
    question: "What is the maximum I can contribute to a 401(k)?",
    answer: "The IRS sets contribution limits annually. For 2024, the maximum employee contribution is $23,000 (with an extra $7,500 catch-up allowed if you are 50 or older). Note that employer match contributions do NOT count toward this $23,000 limit."
  },
  {
    question: "Should I choose Traditional or Roth 401(k)?",
    answer: "A Traditional 401(k) uses pre-tax dollars, lowering your current taxes, but you pay taxes when you withdraw in retirement. A Roth 401(k) uses after-tax dollars, giving you no tax break today, but resulting in completely tax-free withdrawals in retirement. Typically, if you expect your taxes to be higher in retirement, go Roth."
  },
  {
    question: "What happens to my 401(k) if I quit my job?",
    answer: "The money is yours. When you leave, you can roll it over into an Individual Retirement Account (IRA) without penalty, roll it into your new employer's 401(k), or leave it where it is (if the balance is high enough). Do NOT cash it out, or you face immense taxes and penalties."
  },
  {
    question: "What is a safe estimated return rate?",
    answer: "Historically, the U.S. stock market averages around 10% annually. However, because inflation decreases purchasing power, many financial planners use a conservative 7% 'Real Return' rate to project what the money will actually feel like in today's buying power."
  }
];

export default function RetirementCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FOUR_OH_ONE_K_FAQ}
      intro={
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            A 401(k) is the primary wealth-building engine for millions of Americans. It combines automated investing, massive tax shields, and often comes with free money via employer matching.
          </p>
          <p>
            Our <strong>{currentYear} 401(k) Calculator</strong> lets you fast-forward decades into the future. Play with your monthly contribution limits and safely experiment with theoretical market returns to find out precisely when you'll become a 401(k) millionaire.
          </p>
          <p>
            Make dialing in your retirement strategy your top priority today—because every year you delay drastically reduces the final slope of your wealth curve.
          </p>
        </div>
      }
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This 401(k) simulator operates by compounding your existing balance alongside a relentless schedule of future payroll contributions.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Simulation Mechanics:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-medium text-gray-900">Identify Annual Injection:</span> We calculate exactly how much cash is flowing into the account per year by combining your Salary % contribution and the Employer Match %.
              </li>
              <li>
                <span className="font-medium text-gray-900">Apply the Market Multiplier:</span> We apply the Expected Return Rate compounding formula across the time horizon between your Current Age and your Retirement Age.
              </li>
              <li>
                <span className="font-medium text-gray-900">Calculate Expected Growth:</span> We slice out your physical contributions to reveal the pure explosive growth generated purely by the market.
              </li>
            </ol>
          </div>
        </div>
      }
      formula={
        <div className="space-y-4 text-gray-700">
          <p>The system evaluates standard compounding math but applies it in a staggered continuous series to accurately reflect biweekly paycheck deductions:</p>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-center text-lg my-4 space-y-2">
            <p className="text-gray-500 text-sm">Where A = Target Balance, P = Current Balance, PMT = Annual Total Contribution</p>
            <p>A = P(1 + r/n)^(nt) + PMT × {`[((1 + r/n)^(nt) - 1) / (r/n)]`}</p>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-bold text-blue-900 mb-4 text-lg">
            Example: Why Employer Match is Free Money
          </p>
          <p className="mb-4 text-gray-700">A 30-year-old earning $80,000 decides to contribute 6% of their salary to hit their employer's "100% match up to 6%" policy. They plan to retire at age 65 assuming an 8% return across those 35 years.</p>
          
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Annual Employee Contribution (6%):</span> <span className="font-medium">$4,800</span>
            </li>
            <li className="flex justify-between border-b border-blue-200 pb-2">
              <span>Annual Employer Match (6%):</span> <span className="font-medium text-green-700">+$4,800 Free!</span>
            </li>
            <li className="flex justify-between pb-2 pt-1 bg-blue-100 px-2 rounded">
              <span className="font-medium text-blue-900">Total Yearly Infusion:</span> <span className="font-bold text-blue-900">$9,600</span>
            </li>
            
            <li className="flex justify-between pt-4 pb-2 border-b border-blue-200">
              <span className="font-bold">Total Pushed into Account Over 35 Years:</span> 
              <span>$336,000</span>
            </li>
            
            <li className="flex justify-between pt-2 mt-2 border-t border-blue-300">
              <span className="text-xl font-bold text-blue-900">Final Retirement Balance:</span> 
              <span className="text-xl font-bold text-blue-900">~$1,650,000</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Out of that massive $1.65 Million, the employee only personally sacrificed $168,000 from their paychecks. The market and the employer generated the remaining $1.48 Million.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              The 401(k) Step-by-Step Strategy
            </h2>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                <h3 className="font-bold text-gray-900">Step 1: Capture 100% of the Match</h3>
                <p className="text-gray-600 mt-1">If your employer offers a match, failing to contribute up to the match limit is equivalent to taking a voluntary pay cut. It is an immediate 100% guaranteed return on your investment. Do whatever is necessary in your budget to capture this.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                <h3 className="font-bold text-gray-900">Step 2: Auto-Escalate Annually</h3>
                <p className="text-gray-600 mt-1">Every time you get a raise (e.g., 3%), commit to bumping up your 401k contribution by 1%. Since your take-home pay is still going up, you will not feel the pinch, but your 401k balance will explode over time.</p>
              </li>
              <li className="bg-white p-4 rounded border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                <h3 className="font-bold text-gray-900">Step 3: Check Your Fund Allocation</h3>
                <p className="text-gray-600 mt-1">Money deposited into a 401k is often swept into a safe, boring "money market" fund earning nothing. You MUST log into the provider portal (Fidelity, Vanguard) and actively select an S&P 500 Index Fund or a Target Date Fund to get market exposure.</p>
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Retirement Planners</h2>
            <p className="mb-4 text-gray-700">Ensure your sunset years are fully funded with these complementary simulators:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/roth-ira-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Roth IRA Analyzer</span>
                <span className="text-sm text-gray-500 mt-2 block">Capped out your 401k match? Learn why funding a completely tax-free Roth IRA should be your immediate next move.</span>
              </Link>
              <Link href="/retirement-savings-calculator" className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block no-underline group">
                <span className="font-bold text-blue-600 block text-lg group-hover:underline">Total Retirement Setup</span>
                <span className="text-sm text-gray-500 mt-2 block">Combine all of your accounts to see if your total nest egg supports your desired monthly withdrawal rate.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <RetirementCalculator />
    </CalculatorPage>
  );
}
