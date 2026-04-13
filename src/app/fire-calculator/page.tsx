import { CalculatorPage } from '@/components/CalculatorPage';
import { FIRECalculator } from '@/components/calculators/generated/RetirementExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('fire');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: 'FIRE Calculator: Your Financial Independence Number',
  description:
    'Calculate your FIRE number — how much you need to retire early. Model your savings rate, expenses, and timeline to reach financial independence.',
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is the FIRE number?',
    answer:
      'Your FIRE number is the total portfolio value needed to retire and sustain your lifestyle indefinitely. The most common method is the 4% Rule: multiply your annual expenses by 25. For example, if you spend $50,000/year, your FIRE number is $1,250,000.',
  },
  {
    question: 'What does FIRE stand for?',
    answer:
      'FIRE stands for Financial Independence, Retire Early. The movement focuses on aggressive saving (often 40–70% of income), index fund investing, and frugal living to achieve financial independence decades before traditional retirement age.',
  },
  {
    question: 'What is the 4% rule?',
    answer:
      'The 4% rule (also called the Safe Withdrawal Rate) states that you can withdraw 4% of your portfolio in year one, adjust for inflation annually, and have a very high probability (~95%) of your portfolio lasting 30+ years. It originated from the Trinity Study (1998).',
  },
  {
    question: 'What are the different types of FIRE?',
    answer:
      'LeanFIRE targets a frugal lifestyle with minimal spending (~$25K–$40K/year). FatFIRE targets a comfortable or luxurious retirement (~$100K+/year). BaristaFIRE involves semi-retirement with part-time work covering some expenses. CoastFIRE means you\'ve saved enough that compound growth alone will reach your number without additional contributions.',
  },
  {
    question: 'How does savings rate affect my FIRE timeline?',
    answer:
      'Savings rate is the single most powerful lever in FIRE planning. A 10% savings rate takes ~43 years to reach FIRE. A 50% savings rate takes ~17 years. A 75% savings rate takes only ~7 years. Increasing your income and reducing expenses simultaneously is the fastest path.',
  },
  {
    question: 'What return rate should I assume in a FIRE calculator?',
    answer:
      'Most FIRE planners use 6–7% nominal returns (reflecting a broad stock market portfolio) or 4–5% real (inflation-adjusted) returns. The Trinity Study used historical U.S. market data. For conservative planning, use a lower rate (5–6%) to build in a margin of safety.',
  },
];

export default function FIRECalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This FIRE calculator estimates two things: your FIRE number (the portfolio size needed to
            retire) and the number of years to reach it given your current savings rate, income, and
            investment return assumptions.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">The FIRE Formula</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white border border-gray-200 rounded p-3 font-mono">
                FIRE Number = Annual Expenses × 25
              </div>
              <div className="bg-white border border-gray-200 rounded p-3 font-mono">
                Years to FIRE = f(Savings Rate, Return Rate, Current Portfolio)
              </div>
              <p className="text-gray-600">
                The 25× multiplier comes from the 4% Safe Withdrawal Rate (1 ÷ 4% = 25). Your
                portfolio grows through contributions plus investment returns until it reaches the
                target.
              </p>
            </div>
          </div>
          <p>
            The calculator runs a year-by-year projection: each year, your portfolio grows by the
            return rate and increases by your annual savings, until it exceeds your FIRE number.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: Targeting $60,000/Year in Retirement ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Annual expenses in retirement</span>
              <span className="font-medium">$60,000</span>
            </div>
            <div className="flex justify-between">
              <span>FIRE number (25× rule)</span>
              <span className="font-medium font-bold text-blue-900">$1,500,000</span>
            </div>
            <div className="border-t border-blue-200 pt-2 mt-2">
              <p className="font-medium text-gray-900 mb-2">Scenario A: 30% Savings Rate</p>
              <div className="flex justify-between"><span>Annual income</span><span>$100,000</span></div>
              <div className="flex justify-between"><span>Annual savings</span><span>$30,000</span></div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Years to FIRE (7% return)</span><span>~26 years</span>
              </div>
            </div>
            <div className="border-t border-blue-200 pt-2">
              <p className="font-medium text-gray-900 mb-2">Scenario B: 60% Savings Rate</p>
              <div className="flex justify-between"><span>Annual income</span><span>$100,000</span></div>
              <div className="flex justify-between"><span>Annual savings</span><span>$60,000</span></div>
              <div className="flex justify-between font-semibold text-green-700">
                <span>Years to FIRE (7% return)</span><span>~14 years</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *Doubling your savings rate cuts your timeline nearly in half.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              The FIRE Roadmap: From Paycheck to Financial Freedom
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Calculate your FIRE number.</strong> Estimate your annual retirement expenses
                (include healthcare — a major cost before Medicare eligibility at 65) and multiply by
                25.
              </li>
              <li>
                <strong>Maximize tax-advantaged accounts first.</strong> 401(k), Roth IRA, HSA — these
                reduce your tax bill now and/or in retirement. The annual savings on taxes accelerate
                your timeline.
              </li>
              <li>
                <strong>Invest consistently in low-cost index funds.</strong> Total stock market or
                S&amp;P 500 index funds have historically returned 7–10% annually. Keep expense ratios
                below 0.1%.
              </li>
              <li>
                <strong>Track your savings rate, not just your portfolio balance.</strong> Your
                savings rate determines how fast you accumulate wealth — it's the number to optimize.
              </li>
              <li>
                <strong>Plan for sequence-of-returns risk.</strong> A market crash early in
                retirement can devastate a portfolio. Maintain 1–2 years of cash, consider a bond
                tent, and be flexible with withdrawal rates in down years.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Retirement Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/four-percent-rule-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">4% Rule Calculator</span>
                <span className="text-sm text-gray-500">Model safe withdrawal rates from your portfolio.</span>
              </Link>
              <Link
                href="/roth-ira-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Roth IRA Calculator</span>
                <span className="text-sm text-gray-500">Project your tax-free retirement account growth.</span>
              </Link>
              <Link
                href="/savings-rate-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Savings Rate Calculator</span>
                <span className="text-sm text-gray-500">Calculate your current savings rate and set goals.</span>
              </Link>
              <Link
                href="/compound-interest-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Compound Interest Calculator</span>
                <span className="text-sm text-gray-500">Visualize how your investments compound over time.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <FIRECalculator />
    </CalculatorPage>
  );
}
