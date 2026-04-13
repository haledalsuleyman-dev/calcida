import { CalculatorPage } from '@/components/CalculatorPage';
import { SelfEmploymentTaxCalculator } from '@/components/calculators/generated/TaxExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('self-employment-tax');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `Self-Employment Tax Calculator (${currentYear}): SE Tax + Deduction`,
  description: `Calculate your ${currentYear} self-employment tax (SE tax). See Social Security and Medicare breakdowns, the half-SE deduction, and estimated quarterly payments.`,
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is self-employment tax?',
    answer:
      'Self-employment tax (SE tax) covers Social Security and Medicare for people who work for themselves. Employees pay 7.65% of their wages and employers match it — self-employed individuals pay both halves: 15.3% of net earnings.',
  },
  {
    question: `What is the self-employment tax rate in ${currentYear}?`,
    answer: `The SE tax rate is 15.3% of net self-employment earnings: 12.4% for Social Security (up to the annual wage base, adjusted each year by the SSA) and 2.9% for Medicare (no cap). High earners pay an additional 0.9% Additional Medicare Tax above $200,000 (single) or $250,000 (MFJ).`,
  },
  {
    question: 'How is net self-employment income calculated?',
    answer:
      'Start with your gross self-employment revenue, subtract allowable business expenses (home office, equipment, software, travel, etc.) to get net profit. SE tax is then calculated on 92.35% of that net profit (the IRS allows you to multiply by 0.9235 to account for the employer-equivalent portion).',
  },
  {
    question: 'Can I deduct self-employment tax on my return?',
    answer:
      'Yes. You can deduct 50% of your SE tax as an above-the-line deduction on Form 1040 Schedule 1. This reduces your adjusted gross income (not just taxable income), meaning it lowers your income tax even if you take the standard deduction.',
  },
  {
    question: 'Do I need to make quarterly estimated tax payments?',
    answer:
      'If you expect to owe $1,000 or more in federal taxes for the year, you must make quarterly estimated payments (due April 15, June 15, September 15, and January 15). Both SE tax and income tax count toward this threshold. Underpaying can result in an IRS penalty.',
  },
  {
    question: 'How can freelancers and contractors reduce self-employment tax?',
    answer:
      'Key strategies: (1) Maximize deductible business expenses to reduce net profit. (2) Elect S-Corp status — pay yourself a reasonable salary (subject to SE tax) and take remaining profits as distributions (not subject to SE tax). (3) Contribute to a SEP-IRA or Solo 401(k) to reduce taxable income. Consult a CPA before restructuring.',
  },
];

export default function SelfEmploymentTaxCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator estimates your federal self-employment tax and the deduction you can take
            on your return. It handles the 92.35% net earnings adjustment the IRS requires and shows
            both Social Security and Medicare components.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">Step-by-Step SE Tax Formula</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Net self-employment income</strong> = Gross revenue − Business expenses
              </li>
              <li>
                <strong>SE income subject to tax</strong> = Net income × 92.35%
                <br />
                <span className="text-gray-500 text-xs">
                  (Mirrors the employer deduction — you&apos;re treated as both employer and employee)
                </span>
              </li>
              <li>
                <strong>SE tax</strong> = SE income × 15.3% (or 2.9% for income above Social
                Security wage base)
              </li>
              <li>
                <strong>Deduction</strong> = SE tax × 50% — reduces your AGI on Schedule 1
              </li>
            </ol>
          </div>
          <p>
            Quarterly estimated payments split your annual SE + income tax liability into four
            installments to avoid underpayment penalties.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: Freelancer with $85,000 Net Profit ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Net self-employment profit</span>
              <span className="font-medium">$85,000</span>
            </div>
            <div className="flex justify-between">
              <span>× 92.35% adjustment</span>
              <span className="font-medium">$78,498</span>
            </div>
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span>× 15.3% SE tax rate</span>
              <span className="font-medium text-red-700">$12,010</span>
            </div>
            <div className="flex justify-between">
              <span>Half-SE deduction (reduces AGI)</span>
              <span className="font-medium text-green-700">−$6,005</span>
            </div>
            <div className="border-t border-blue-200 pt-2 mt-1">
              <p className="text-xs text-gray-500 mb-2">Quarterly estimated payment breakdown:</p>
              <div className="flex justify-between">
                <span>SE tax per quarter</span>
                <span className="font-medium">~$3,003</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>(plus estimated income tax)</span>
                <span></span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *The $6,005 deduction can reduce federal income tax by $1,321–$2,162 depending on your
            income tax bracket.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Self-Employed Tax Strategy: Keep More of What You Earn
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Track every business expense.</strong> Home office (proportional square
                footage), internet, phone, software subscriptions, professional development, and
                health insurance premiums all reduce your taxable net profit — the base for SE tax
                and income tax.
              </li>
              <li>
                <strong>Open a SEP-IRA or Solo 401(k).</strong> You can contribute up to 25% of net
                self-employment income to a SEP-IRA (up to $69,000 in {currentYear}). A Solo 401(k)
                allows even higher combined contributions. Both reduce your AGI dollar-for-dollar.
              </li>
              <li>
                <strong>Consider S-Corp election.</strong> Once net profit consistently exceeds
                ~$50,000–$60,000, electing S-Corp status can save thousands. You pay SE tax only on
                a &quot;reasonable salary&quot; — remaining profit flows as distributions not subject to SE
                tax.
              </li>
              <li>
                <strong>Pay quarterly — don&apos;t wait until April.</strong> If you owe $1,000+ annually,
                quarterly payments prevent underpayment penalties (0.5% per month on the shortfall).
              </li>
              <li>
                <strong>Deduct your health insurance premiums.</strong> Self-employed individuals can
                deduct 100% of health, dental, and vision insurance premiums for themselves and
                family — another above-the-line AGI reduction.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Tax Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/income-tax-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Income Tax Calculator</span>
                <span className="text-sm text-gray-500">Estimate your total federal income tax on top of SE tax.</span>
              </Link>
              <Link
                href="/paycheck-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Paycheck Calculator</span>
                <span className="text-sm text-gray-500">See W-2 take-home pay vs. 1099 contractor income.</span>
              </Link>
              <Link
                href="/effective-tax-rate-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Effective Tax Rate Calculator</span>
                <span className="text-sm text-gray-500">Your combined SE + income tax as a percentage of income.</span>
              </Link>
              <Link
                href="/capital-gains-tax-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Capital Gains Tax Calculator</span>
                <span className="text-sm text-gray-500">Estimate tax on selling business assets or investments.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <SelfEmploymentTaxCalculator />
    </CalculatorPage>
  );
}
