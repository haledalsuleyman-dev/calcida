import { CalculatorPage } from '@/components/CalculatorPage';
import { CDCalculator } from '@/components/calculators/generated/InvestmentExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('cd');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `CD Calculator (${currentYear}): Certificate of Deposit Interest & Growth`,
  description: `Calculate how much interest your CD earns. Enter deposit amount, APY, and term to see final value, total interest, and month-by-month growth. Compare CD rates.`,
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is a Certificate of Deposit (CD)?',
    answer:
      'A CD is a savings product offered by banks and credit unions that pays a fixed interest rate in exchange for locking up your deposit for a set term — typically 3 months to 5 years. CDs are FDIC-insured up to $250,000 per depositor per institution, making them one of the safest savings vehicles available.',
  },
  {
    question: `What are the best CD rates in ${currentYear}?`,
    answer: `CD rates vary by institution and term. In ${currentYear}, high-yield online banks and credit unions offer the most competitive rates — often 4–5%+ APY on 1-year CDs, compared to 0.5–1% at traditional brick-and-mortar banks. Rates are influenced by Federal Reserve policy and move when the Fed adjusts the federal funds rate.`,
  },
  {
    question: 'How is CD interest calculated?',
    answer:
      'Most CDs compound interest daily or monthly. The APY (Annual Percentage Yield) already accounts for compounding, so the calculation is straightforward: Final Value = Principal × (1 + APY)^Years. A $10,000 CD at 5% APY for 1 year grows to $10,500. Over 3 years: $10,000 × (1.05)³ = $11,576.',
  },
  {
    question: 'What is the early withdrawal penalty on a CD?',
    answer:
      'Early withdrawal penalties vary by bank and term length. Typical penalties range from 3 months of interest (for 6–12 month CDs) to 12–18 months of interest (for 5-year CDs). Some banks offer "no-penalty CDs" with slightly lower rates but full flexibility. Factor the penalty into your decision before locking up funds.',
  },
  {
    question: 'Should I get a CD ladder?',
    answer:
      'A CD ladder splits your savings across multiple CDs with staggered maturity dates (e.g., 1-year, 2-year, 3-year, 4-year, 5-year). When each CD matures, you reinvest at the current rate. Benefits: you avoid locking all your money at one rate, access funds regularly, and capture rate increases over time. It\'s ideal for medium-term savings goals.',
  },
  {
    question: 'CD vs. high-yield savings account — which is better?',
    answer: `In ${currentYear}, high-yield savings accounts (HYSA) at online banks offer competitive rates with full liquidity — no early withdrawal penalty. CDs typically offer slightly higher rates but require locking funds. Choose a CD when: you have a specific future expense, want to lock in a high rate before the Fed cuts, or need to prevent yourself from spending. Choose HYSA when you want flexibility.`,
  },
];

export default function CDCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This CD calculator shows how much interest your deposit earns over the CD term, using
            compound interest based on the APY. It shows a month-by-month balance breakdown so you
            can see exactly how your money grows.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">How CD Interest Compounds</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white border border-gray-200 rounded p-3 font-mono">
                Final Value = Principal × (1 + APY ÷ 100)<sup>Years</sup>
              </div>
              <div className="bg-white border border-gray-200 rounded p-3 font-mono">
                Total Interest = Final Value − Principal
              </div>
              <p className="text-gray-600">
                APY (Annual Percentage Yield) already accounts for compounding frequency. Use APY —
                not APR — for accurate calculations. Banks are required to advertise APY on CDs so
                you can compare them fairly.
              </p>
            </div>
          </div>
          <p>
            The monthly balance table shows how your balance grows each month, which is useful for
            planning if you need to access funds by a certain date.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: $25,000 CD at 4.75% APY ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-3">
            <div className="border-b border-blue-200 pb-3">
              <p className="font-medium text-gray-900 mb-2">6-Month CD</p>
              <div className="flex justify-between"><span>Deposit</span><span>$25,000</span></div>
              <div className="flex justify-between"><span>APY</span><span>4.75%</span></div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Interest earned</span><span>~$586</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Final value</span><span>~$25,586</span>
              </div>
            </div>
            <div className="border-b border-blue-200 pb-3">
              <p className="font-medium text-gray-900 mb-2">1-Year CD</p>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Interest earned</span><span>~$1,188</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Final value</span><span>~$26,188</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-2">5-Year CD</p>
              <div className="flex justify-between font-semibold text-green-700">
                <span>Interest earned</span><span>~$6,632</span>
              </div>
              <div className="flex justify-between font-semibold text-green-700">
                <span>Final value</span><span>~$31,632</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *5-year CD earns 5.6× more interest than a 6-month CD thanks to compound growth. Compare to a 0.5% traditional savings account: same $25K earns just $630 over 5 years.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              CD Strategy: Get the Highest Safe Return on Your Cash
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Compare online banks first.</strong> Online banks consistently offer 3–5×
                higher CD rates than traditional banks. FDIC insurance applies equally to online
                banks — there is no safety trade-off.
              </li>
              <li>
                <strong>Build a CD ladder for flexibility.</strong> Split $50,000 into five $10,000
                CDs (1, 2, 3, 4, 5 years). Each year, one matures — giving you access to funds and
                the option to reinvest at then-current rates.
              </li>
              <li>
                <strong>Lock in high rates before the Fed cuts.</strong> When the Fed signals rate
                cuts, locking in a 5-year CD at the current high rate can significantly outperform
                rolling over short-term CDs in a declining rate environment.
              </li>
              <li>
                <strong>Consider no-penalty CDs.</strong> No-penalty CDs allow early withdrawal
                without forfeiting interest after a short holding period (typically 6–7 days).
                Useful for emergency funds or uncertain timelines.
              </li>
              <li>
                <strong>Check the penalty before you commit.</strong> A 12-month interest penalty on
                a 5-year CD means you need to hold it for over a year before early withdrawal
                breaks even. Calculate your break-even point before opening.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Savings &amp; Investment Tools</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/savings-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Savings Calculator</span>
                <span className="text-sm text-gray-500">Compare CD growth vs. regular savings contributions.</span>
              </Link>
              <Link
                href="/compound-interest-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Compound Interest Calculator</span>
                <span className="text-sm text-gray-500">See long-term compounding on any investment.</span>
              </Link>
              <Link
                href="/future-value-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Future Value Calculator</span>
                <span className="text-sm text-gray-500">Project investment growth with regular contributions.</span>
              </Link>
              <Link
                href="/roth-ira-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Roth IRA Calculator</span>
                <span className="text-sm text-gray-500">Compare tax-free retirement growth vs. CD yields.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <CDCalculator />
    </CalculatorPage>
  );
}
