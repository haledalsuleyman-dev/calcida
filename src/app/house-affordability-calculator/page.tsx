import { CalculatorPage } from '@/components/CalculatorPage';
import { HouseAffordabilityCalculator } from '@/components/calculators/generated/MortgageAdvancedCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('house-affordability');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `How Much House Can I Afford? Calculator (${currentYear})`,
  description:
    'Find out how much house you can afford based on your income, debts, down payment, and interest rate. Uses the 28/36 rule and DTI guidelines lenders actually use.',
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'How much house can I afford on my income?',
    answer:
      'A common guideline: your monthly housing costs (principal, interest, taxes, insurance) should not exceed 28% of your gross monthly income. At $80,000/year, that is ~$1,867/month in housing costs. With a 6.8% 30-year mortgage, $1,867/month covers roughly a $283,000 loan — add your down payment to get your maximum purchase price.',
  },
  {
    question: 'What is the 28/36 rule?',
    answer:
      'The 28/36 rule is a standard lender guideline: spend no more than 28% of gross monthly income on housing costs (front-end DTI) and no more than 36% on all debt payments combined including housing, car loans, and student loans (back-end DTI). Some lenders allow up to 43–45% back-end DTI with strong credit.',
  },
  {
    question: 'What income do I need to buy a $400,000 home?',
    answer: `With a 20% down payment ($80,000) on a $400,000 home and a 6.8% 30-year mortgage, your principal and interest is ~$2,104/month. Adding estimated taxes and insurance (~$700/month), total housing costs are ~$2,804/month. Using the 28% guideline, you need a gross income of ~$120,000/year. At 36% back-end DTI with no other debt, you need ~$93,000/year.`,
  },
  {
    question: 'Does the calculator include PMI?',
    answer:
      'Private Mortgage Insurance (PMI) is required when your down payment is less than 20%. PMI typically costs 0.5–1.5% of the loan amount annually (~$100–$300/month on a $250,000 loan). PMI adds to your monthly housing costs and reduces how much home you can afford — factor it in when evaluating smaller down payments.',
  },
  {
    question: 'How does my debt-to-income (DTI) ratio affect what I can afford?',
    answer:
      'DTI is your total monthly debt payments divided by gross monthly income. If you have $500/month in existing debt (car loan, student loans), that $500 reduces the housing payment a lender will approve. To maximize affordability, pay down existing debts before applying for a mortgage — each $100 in debt reduction can increase your home-buying budget by $15,000–$20,000.',
  },
  {
    question: 'How much should I put down on a house?',
    answer: `20% down avoids PMI and gives you instant 20% equity — the traditional target. However, many buyers put 5–10% down and pay PMI temporarily. FHA loans allow as little as 3.5% down. In ${currentYear}, with median home prices over $400,000, the 20% down payment on a median home exceeds $80,000 — for many buyers, a smaller down payment with PMI makes more practical sense.`,
  },
];

export default function HouseAffordabilityCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator estimates the maximum home price you can afford using lenders&apos; actual
            underwriting criteria — your income, existing debts, down payment, and the current
            interest rate.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">How Lenders Evaluate Affordability</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">Front-End DTI ≤ 28%</p>
                <p className="text-gray-600 mt-1">
                  Housing costs (P+I+T+I) ÷ Gross monthly income ≤ 28%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  P = Principal, I = Interest, T = Property Tax, I = Insurance (PITI)
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">Back-End DTI ≤ 36–43%</p>
                <p className="text-gray-600 mt-1">
                  All monthly debts (PITI + car + student loans + cards) ÷ Gross income ≤ 36–43%
                </p>
              </div>
              <p className="text-gray-600">
                The lower limit from either calculation sets your maximum. Your actual approved
                amount also depends on credit score, savings reserves, and employment history.
              </p>
            </div>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: $90,000 Household Income, 6.8% Rate ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-3">
            <div className="border-b border-blue-200 pb-3">
              <p className="font-medium text-gray-900 mb-2">Inputs</p>
              <div className="flex justify-between"><span>Annual gross income</span><span>$90,000</span></div>
              <div className="flex justify-between"><span>Monthly existing debts</span><span>$400/mo</span></div>
              <div className="flex justify-between"><span>Down payment</span><span>$40,000 (10%)</span></div>
              <div className="flex justify-between"><span>Mortgage rate</span><span>6.8% (30-yr)</span></div>
            </div>
            <div className="border-b border-blue-200 pb-3">
              <p className="font-medium text-gray-900 mb-2">Calculation</p>
              <div className="flex justify-between"><span>Max 28% front-end housing budget</span><span>$2,100/mo</span></div>
              <div className="flex justify-between"><span>Max 36% back-end ($400 other debt)</span><span>$2,300/mo</span></div>
              <div className="flex justify-between"><span>Binding constraint</span><span>$2,100/mo</span></div>
            </div>
            <div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Affordable loan amount (P+I ~$1,400)</span><span>~$213,000</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Max purchase price (+ $40k down)</span><span>~$253,000</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *Paying off the $400/month in existing debt would increase the affordable price by ~$60,000.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              How to Maximize Your Home-Buying Budget
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Pay down high-payment debts before applying.</strong> Every $200/month you
                eliminate in car or student loan payments can increase your approved loan by
                ~$30,000–$35,000.
              </li>
              <li>
                <strong>Improve your credit score.</strong> Going from a 680 to 740 credit score can
                lower your mortgage rate by 0.5%+, saving ~$100/month on a $300,000 loan and
                increasing what you can afford.
              </li>
              <li>
                <strong>Shop multiple lenders.</strong> Rate differences of 0.25–0.5% between
                lenders are common. On a $350,000 loan, 0.5% lower rate saves ~$100/month and
                ~$36,000 over 30 years.
              </li>
              <li>
                <strong>Consider a longer look-back window.</strong> Lenders typically require
                2 years of stable employment. If you recently changed jobs for a higher salary,
                document it carefully to get credit for the income increase.
              </li>
              <li>
                <strong>Don&apos;t confuse pre-qualified with pre-approved.</strong> Pre-approval
                involves full income/asset verification and is far more credible to sellers in a
                competitive market.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Home-Buying Tools</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/mortgage-payment-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Mortgage Payment Calculator</span>
                <span className="text-sm text-gray-500">See your exact monthly P&I on any loan amount.</span>
              </Link>
              <Link
                href="/rent-vs-buy-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Rent vs. Buy Calculator</span>
                <span className="text-sm text-gray-500">Compare the 10-year cost of renting vs. buying.</span>
              </Link>
              <Link
                href="/down-payment-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Down Payment Calculator</span>
                <span className="text-sm text-gray-500">See how much to save and when you can reach your goal.</span>
              </Link>
              <Link
                href="/mortgage-amortization-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Amortization Calculator</span>
                <span className="text-sm text-gray-500">See the full payment schedule and equity buildup.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <HouseAffordabilityCalculator />
    </CalculatorPage>
  );
}
