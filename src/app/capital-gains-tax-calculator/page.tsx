import { CalculatorPage } from '@/components/CalculatorPage';
import { CapitalGainsTaxCalculator } from '@/components/calculators/generated/TaxExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('capital-gains-tax');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `Capital Gains Tax Calculator (${currentYear}): Stocks, Real Estate & More`,
  description: `Estimate your ${currentYear} capital gains tax on stocks, real estate, or crypto. See short-term vs. long-term rates and how to minimize your tax bill.`,
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is the capital gains tax rate for 2026?',
    answer: `For ${currentYear}, long-term capital gains rates are 0%, 15%, or 20% depending on your taxable income and filing status. Short-term gains are taxed at ordinary income rates (10%–37%). High earners may also owe an additional 3.8% Net Investment Income Tax (NIIT).`,
  },
  {
    question: 'What is the difference between short-term and long-term capital gains?',
    answer:
      'Short-term capital gains apply to assets sold after holding them for one year or less — taxed at your ordinary income rate (up to 37%). Long-term capital gains apply to assets held over one year — taxed at the preferential 0%, 15%, or 20% rates.',
  },
  {
    question: 'When do I qualify for the 0% long-term capital gains rate?',
    answer: `In ${currentYear}, single filers with taxable income up to approximately $47,025 and married filers up to approximately $94,050 may qualify for the 0% long-term capital gains rate. This is a significant planning opportunity for low-income years.`,
  },
  {
    question: 'Can I offset capital gains with capital losses?',
    answer:
      'Yes. Capital losses can be used to offset capital gains dollar-for-dollar. If your losses exceed gains, you can deduct up to $3,000 against ordinary income per year. Excess losses carry forward indefinitely to future tax years.',
  },
  {
    question: 'What is the home sale capital gains exclusion?',
    answer:
      'If you sell your primary residence after living in it for at least 2 of the past 5 years, you can exclude up to $250,000 in gain (single) or $500,000 (married filing jointly) from capital gains tax. This is one of the most valuable tax benefits available.',
  },
  {
    question: 'What is the Net Investment Income Tax (NIIT)?',
    answer:
      'The NIIT is an additional 3.8% tax on investment income (including capital gains) for high earners. In 2026, it applies when MAGI exceeds $200,000 (single) or $250,000 (married filing jointly), making the effective long-term rate 18.8% or 23.8% for top earners.',
  },
];

export default function CapitalGainsTaxCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator estimates the federal capital gains tax on the sale of an investment
            asset. Enter your purchase price, sale price, how long you held the asset, and your
            income to see whether short-term or long-term rates apply and how much you may owe.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">How Capital Gains Tax Is Calculated</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Gain = Sale Price − Cost Basis.</strong> Cost basis is what you paid,
                including commissions and improvements (for real estate).
              </li>
              <li>
                <strong>Holding period determines the rate.</strong> Over 1 year = long-term
                preferential rate. One year or less = short-term = ordinary income rate.
              </li>
              <li>
                <strong>Your income determines which long-term bracket applies</strong> (0%, 15%, or
                20%).
              </li>
              <li>
                <strong>NIIT may apply</strong> if your MAGI exceeds the threshold, adding 3.8% to
                investment income.
              </li>
              <li>
                <strong>State capital gains taxes</strong> vary and are not included here (some states
                tax gains as ordinary income; a few have no capital gains tax at all).
              </li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: Selling Stock with $50,000 Gain ({currentYear})
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-medium text-gray-900 mb-2">Short-Term (held &lt; 1 year)</p>
              <ul className="space-y-1">
                <li>Gain: $50,000</li>
                <li>Income: $80,000</li>
                <li>Rate: 22% (ordinary income)</li>
                <li className="font-semibold text-red-700">Tax owed: ~$11,000</li>
                <li>After-tax gain: ~$39,000</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-2">Long-Term (held &gt; 1 year)</p>
              <ul className="space-y-1">
                <li>Gain: $50,000</li>
                <li>Income: $80,000</li>
                <li>Rate: 15% (long-term)</li>
                <li className="font-semibold text-green-700">Tax owed: ~$7,500</li>
                <li>After-tax gain: ~$42,500</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *Waiting one extra year to qualify for long-term rates saves $3,500 on a $50,000 gain.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Tax-Loss Harvesting: Your Most Powerful Tool
            </h2>
            <p className="text-gray-700 mb-3">
              Tax-loss harvesting is the practice of selling investments at a loss to offset capital
              gains. It can reduce your {currentYear} tax bill with no change in your overall
              investment exposure (using similar but not identical replacement assets to avoid wash-sale rules).
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Match losses to gains:</strong> Short-term losses offset short-term gains
                first (where rates are highest), then long-term gains.
              </li>
              <li>
                <strong>Carry forward excess losses.</strong> After offsetting up to $3,000 in
                ordinary income, remaining losses carry forward indefinitely.
              </li>
              <li>
                <strong>Avoid the wash-sale rule:</strong> You cannot repurchase the same or
                substantially identical security within 30 days before or after the sale.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Tax &amp; Investment Tools</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/income-tax-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Income Tax Calculator</span>
                <span className="text-sm text-gray-500">Estimate your total federal tax bill.</span>
              </Link>
              <Link
                href="/investment-return-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Investment Return Calculator</span>
                <span className="text-sm text-gray-500">Calculate pre-tax and after-tax returns.</span>
              </Link>
              <Link
                href="/roth-ira-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Roth IRA Calculator</span>
                <span className="text-sm text-gray-500">Grow investments tax-free with a Roth IRA.</span>
              </Link>
              <Link
                href="/effective-tax-rate-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Effective Tax Rate Calculator</span>
                <span className="text-sm text-gray-500">Understand your overall tax burden.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <CapitalGainsTaxCalculator />
    </CalculatorPage>
  );
}
