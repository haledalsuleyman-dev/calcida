import { CalculatorPage } from '@/components/CalculatorPage';
import { IraGrowthCalculator } from '@/components/calculators/generated/RetirementExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('roth-ira');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `Roth IRA Calculator (${currentYear}): Project Tax-Free Growth`,
  description: `Estimate your Roth IRA balance at retirement. See how tax-free compounding on ${currentYear} contributions grows over decades. Updated contribution limits.`,
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: `What is the Roth IRA contribution limit for ${currentYear}?`,
    answer: `For ${currentYear}, you can contribute up to $7,000 per year to a Roth IRA ($8,000 if you're age 50 or older). Contribution limits are subject to income phase-outs — consult the IRS for the exact thresholds for your filing status.`,
  },
  {
    question: 'How does a Roth IRA grow tax-free?',
    answer:
      'Roth IRA contributions are made with after-tax dollars. The money then grows tax-free, and qualified withdrawals in retirement are completely tax-free. This is the key advantage over a Traditional IRA, where withdrawals are taxed as ordinary income.',
  },
  {
    question: 'What is the income limit to contribute to a Roth IRA?',
    answer:
      'For 2026, single filers with MAGI above ~$161,000 and married filers above ~$203,000 face phase-outs, and contributions are not allowed above ~$176,000 (single) or ~$218,000 (MFJ). High earners may use a Backdoor Roth IRA strategy.',
  },
  {
    question: 'Roth IRA vs. Traditional IRA — which is better?',
    answer:
      'A Roth IRA is generally better if you expect your tax rate to be higher in retirement than it is now (e.g., young earners, rising income careers). A Traditional IRA is generally better if you need the tax deduction now. The best answer depends on your specific income trajectory.',
  },
  {
    question: 'Can I withdraw from a Roth IRA before retirement?',
    answer:
      'You can withdraw your contributions (not earnings) at any time, penalty-free. Earnings may be subject to a 10% penalty and income tax if withdrawn before age 59½ and before the account is 5 years old. Exceptions exist for first home purchase, disability, and death.',
  },
  {
    question: 'What return rate should I use in the Roth IRA calculator?',
    answer:
      'A common planning assumption is 6–8% nominal annual return for a diversified equity-heavy portfolio. Long-term U.S. stock market historical average is approximately 10% nominal, or ~7% after inflation. Use a conservative rate (6–7%) for planning to avoid overestimating.',
  },
];

export default function RothIraCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator projects your Roth IRA balance at retirement using compound interest on
            your annual contributions. Because Roth IRA growth and qualified withdrawals are
            tax-free, the projected balance represents money you can actually spend — not a pre-tax
            figure.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">What This Calculator Models</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Starting balance:</strong> Any existing Roth IRA balance compounds
                throughout the projection.
              </li>
              <li>
                <strong>Annual contributions:</strong> Each year you add the contribution amount,
                which then compounds at your chosen return rate.
              </li>
              <li>
                <strong>Compounding:</strong> Returns compound annually. The longer the time horizon,
                the more dramatic the effect of compounding.
              </li>
              <li>
                <strong>Inflation adjustment:</strong> The tool can show real (inflation-adjusted)
                results to help you understand actual buying power at retirement.
              </li>
            </ul>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: Starting at Age 30, Contributing $500/Month
          </p>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Annual contribution</span>
              <span className="font-medium">$6,000</span>
            </div>
            <div className="flex justify-between">
              <span>Starting balance</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="flex justify-between">
              <span>Annual return assumption</span>
              <span className="font-medium">7%</span>
            </div>
            <div className="flex justify-between">
              <span>Years until retirement (age 65)</span>
              <span className="font-medium">35 years</span>
            </div>
            <div className="border-t border-blue-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold text-blue-900 text-base">
                <span>Projected Balance at 65</span>
                <span>~$945,000</span>
              </div>
              <div className="flex justify-between text-blue-700">
                <span>Total contributions</span>
                <span>$210,000</span>
              </div>
              <div className="flex justify-between text-blue-700">
                <span>Tax-free growth</span>
                <span>~$735,000</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *All $945,000 is available tax-free in retirement. A Traditional IRA of the same balance
            would net approximately $700,000 after a 26% effective retirement tax rate.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Roth IRA Strategy: Maximize Your Tax-Free Wealth
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Start as early as possible.</strong> Compounding is exponential. $7,000
                contributed at age 22 grows to over $150,000 by age 65 at 7% — without adding
                another dollar.
              </li>
              <li>
                <strong>Always contribute at least enough to max out.</strong> In {currentYear}, the
                max is $7,000 ($8,000 if 50+). Front-load contributions early in the year when
                possible to maximize compounding.
              </li>
              <li>
                <strong>Use the Backdoor Roth if over the income limit.</strong> High earners above
                the phase-out threshold can make a non-deductible Traditional IRA contribution and
                immediately convert it to Roth.
              </li>
              <li>
                <strong>Choose high-growth investments.</strong> Because the Roth is tax-free, put
                your highest-expected-return assets (small-cap equities, REITs) here and
                lower-return assets in taxable accounts.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Retirement Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/401k-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">401(k) Calculator</span>
                <span className="text-sm text-gray-500">Project your employer-matched retirement savings.</span>
              </Link>
              <Link
                href="/ira-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Traditional IRA Calculator</span>
                <span className="text-sm text-gray-500">Compare growth with pre-tax Traditional IRA contributions.</span>
              </Link>
              <Link
                href="/retirement-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Retirement Calculator</span>
                <span className="text-sm text-gray-500">Estimate total retirement savings from all sources.</span>
              </Link>
              <Link
                href="/compound-interest-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Compound Interest Calculator</span>
                <span className="text-sm text-gray-500">Visualize the power of compounding on any investment.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <IraGrowthCalculator />
    </CalculatorPage>
  );
}
