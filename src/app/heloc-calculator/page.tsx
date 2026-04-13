import { CalculatorPage } from '@/components/CalculatorPage';
import { HELOCCalculator } from '@/components/calculators/generated/MortgageAdvancedCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('heloc');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: 'HELOC Calculator: Estimate Payments During Draw & Repayment',
  description:
    'Calculate your HELOC monthly payments during the draw period and repayment period. See interest-only vs. fully amortizing costs and how your rate affects total interest.',
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is a HELOC and how does it work?',
    answer:
      'A Home Equity Line of Credit (HELOC) is a revolving credit line secured by your home equity. During the draw period (typically 5–10 years), you can borrow up to your limit and usually pay interest-only. After the draw period ends, the repayment period (typically 10–20 years) begins, during which you can no longer borrow and must repay principal + interest.',
  },
  {
    question: 'What are HELOC interest rates in 2026?',
    answer: `HELOC rates are variable and tied to the Prime Rate (which moves with the Fed Funds Rate). In ${currentYear}, HELOC rates typically run from Prime + 0% to Prime + 2%, placing them roughly in the 8–10% range depending on your credit score and loan-to-value ratio. Rates can rise significantly if the Fed raises rates.`,
  },
  {
    question: 'How much equity do I need to get a HELOC?',
    answer:
      'Most lenders require you to maintain at least 15–20% equity in your home after the HELOC. Combined Loan-to-Value (CLTV) — your first mortgage plus the HELOC — typically cannot exceed 80–85% of your home\'s appraised value. With a $400,000 home at 80% CLTV, you could borrow up to $320,000 minus your remaining mortgage balance.',
  },
  {
    question: 'What happens after the HELOC draw period ends?',
    answer:
      'When the draw period ends, the HELOC enters repayment. You can no longer withdraw funds, and your monthly payment increases from interest-only to principal + interest. Many borrowers experience "payment shock" at this point — the fully amortizing payment can be 2–3× the interest-only payment.',
  },
  {
    question: 'Is HELOC interest tax deductible?',
    answer:
      'HELOC interest may be deductible if the funds are used to "buy, build, or substantially improve" your home (the IRS rule post-2018 Tax Cuts and Jobs Act). Interest on funds used for personal expenses like debt consolidation, vacations, or car purchases is no longer deductible. Always consult a tax professional to confirm.',
  },
  {
    question: 'HELOC vs. home equity loan — which is better?',
    answer:
      'A HELOC is a revolving variable-rate line ideal for ongoing or uncertain expenses (renovations, education) and situations where you may not need all the funds upfront. A home equity loan gives you a fixed lump sum at a fixed rate — better for one-time expenses when you want payment certainty. If rates are rising, locking in a fixed-rate home equity loan may be more predictable.',
  },
];

export default function HelocCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator shows your estimated HELOC payments across both phases of the loan: the
            draw period (interest-only) and the repayment period (principal + interest). Because
            HELOCs have variable rates, the actual payment will fluctuate with the Prime Rate.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">Two Phases of a HELOC</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900 mb-1">Draw Period (5–10 years)</p>
                <p className="text-gray-600">
                  Borrow as needed up to your credit limit. Minimum payment is typically
                  interest-only on the outstanding balance. Your balance rises and falls as you draw
                  and repay.
                </p>
                <p className="font-mono text-xs mt-1 text-gray-500">
                  Monthly interest = Balance × (Annual Rate ÷ 12)
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900 mb-1">Repayment Period (10–20 years)</p>
                <p className="text-gray-600">
                  No new draws allowed. Outstanding balance is amortized over the repayment term —
                  payment includes both principal and interest, and is significantly higher than
                  draw-period payments.
                </p>
                <p className="font-mono text-xs mt-1 text-gray-500">
                  Monthly payment = Fully amortizing payment on remaining balance
                </p>
              </div>
            </div>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: $75,000 HELOC at 9.25% ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-3">
            <div className="border-b border-blue-200 pb-3">
              <p className="font-medium text-gray-900 mb-2">Draw Period (10 years, full balance drawn)</p>
              <div className="flex justify-between">
                <span>Outstanding balance</span>
                <span className="font-medium">$75,000</span>
              </div>
              <div className="flex justify-between">
                <span>Interest rate</span>
                <span className="font-medium">9.25% (variable)</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Interest-only payment</span>
                <span>~$578/month</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-2">Repayment Period (20 years)</p>
              <div className="flex justify-between">
                <span>Balance at start of repayment</span>
                <span className="font-medium">$75,000</span>
              </div>
              <div className="flex justify-between font-semibold text-red-700">
                <span>P+I monthly payment</span>
                <span>~$688/month</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Payment increase from draw period</span>
                <span>+$110/month (+19%)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total interest paid</span>
                <span>~$90,200</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *Variable rate risk: If rate rises to 11.25%, monthly draw-period payment increases to ~$703 (+$125/month).
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              HELOC Best Practices: Access Equity Wisely
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Use HELOCs for value-adding investments.</strong> Home renovations that
                increase your property&apos;s value, education that raises earning potential, or
                consolidating higher-rate debt all justify using home equity. Vacations and
                discretionary spending do not — you are putting your home at risk.
              </li>
              <li>
                <strong>Budget for repayment-period payment shock.</strong> The switch from
                interest-only to P+I can significantly impact cash flow. Build repayment-period
                payments into your financial plan before you draw.
              </li>
              <li>
                <strong>Watch the variable rate risk.</strong> HELOCs track the Prime Rate. If the
                Fed raises rates 2%, your rate rises 2% too. Consider a fixed-rate home equity loan
                if you prefer payment certainty.
              </li>
              <li>
                <strong>Consider converting to a fixed-rate during repayment.</strong> Many lenders
                allow a rate-lock option at the start of the repayment period, converting part or
                all of the balance to a fixed rate.
              </li>
              <li>
                <strong>Never miss a payment.</strong> A HELOC is secured by your home. Defaulting
                can put your house at risk of foreclosure — the stakes are fundamentally different
                from unsecured credit card debt.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Home Equity Tools</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/mortgage-payment-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Mortgage Payment Calculator</span>
                <span className="text-sm text-gray-500">Calculate your first mortgage payment alongside HELOC costs.</span>
              </Link>
              <Link
                href="/rent-vs-buy-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Rent vs. Buy Calculator</span>
                <span className="text-sm text-gray-500">See whether buying (and building equity) beats renting.</span>
              </Link>
              <Link
                href="/mortgage-amortization-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Amortization Calculator</span>
                <span className="text-sm text-gray-500">See how your first mortgage principal balance builds equity.</span>
              </Link>
              <Link
                href="/net-worth-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Net Worth Calculator</span>
                <span className="text-sm text-gray-500">Track home equity as part of your total net worth.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <HELOCCalculator />
    </CalculatorPage>
  );
}
