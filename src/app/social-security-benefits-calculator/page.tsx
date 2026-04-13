import { CalculatorPage } from '@/components/CalculatorPage';
import { SocialSecurityBenefitsCalculator } from '@/components/calculators/generated/RetirementExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('social-security-benefits');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `Social Security Benefits Calculator (${currentYear}): Estimate Your Benefit`,
  description: `Estimate your Social Security retirement benefit at age 62, 67, or 70. See how claiming age affects your monthly check and lifetime payout.`,
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'How is my Social Security benefit calculated?',
    answer:
      'The SSA uses your 35 highest-earning years (indexed for inflation) to calculate your Average Indexed Monthly Earnings (AIME). It then applies a progressive formula — the Primary Insurance Amount (PIA) — that replaces a higher percentage of lower earnings. You get roughly 90% of the first ~$1,200/month in AIME, 32% of the next ~$6,000, and 15% of the rest.',
  },
  {
    question: 'What is Full Retirement Age (FRA)?',
    answer:
      'Full Retirement Age is when you receive 100% of your calculated benefit. For people born 1960 or later, FRA is 67. If you were born 1943–1954, FRA is 66. FRA is the benchmark — claiming before reduces benefits; delaying past FRA increases them.',
  },
  {
    question: 'What happens if I claim Social Security at 62?',
    answer:
      'Claiming at 62 (the earliest possible age) permanently reduces your benefit by up to 30% compared to claiming at your Full Retirement Age. However, you receive payments for more years — whether this is a better deal depends on your health and life expectancy.',
  },
  {
    question: 'What is the maximum Social Security benefit?',
    answer: `The maximum Social Security retirement benefit for someone retiring at Full Retirement Age in ${currentYear} is approximately $3,822/month. To receive the maximum, you must have earned the Social Security wage base or higher for at least 35 years.`,
  },
  {
    question: 'What is the break-even age for delaying Social Security?',
    answer:
      'If you delay claiming from 62 to 67, you need to live until approximately age 77–79 to break even on total lifetime benefits. Delaying to 70 breaks even around age 80–82. If your family has a history of longevity, delaying is almost always the mathematically superior choice.',
  },
  {
    question: 'Can I work while collecting Social Security before FRA?',
    answer: `Yes, but with restrictions. In ${currentYear}, if you're under FRA, $1 in benefits is withheld for every $2 you earn above ~$21,240/year. In the year you reach FRA, the limit rises to ~$56,520. After you reach FRA, there's no earnings limit — you can earn any amount without penalty.`,
  },
];

export default function SocialSecurityBenefitsCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator estimates your monthly Social Security retirement benefit based on your
            income history and the age at which you plan to claim. It models how claiming at 62, 67
            (FRA), or 70 affects your benefit and lifetime payout.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">How the SSA Calculates Your Benefit</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>35-year earnings history:</strong> The SSA averages your 35 highest-earning
                years (zero-filled if you have fewer). More years of high earnings = higher benefit.
              </li>
              <li>
                <strong>AIME:</strong> Your Average Indexed Monthly Earnings — 35-year total
                ÷ 420 months. Indexed for wage inflation.
              </li>
              <li>
                <strong>Primary Insurance Amount (PIA):</strong> The progressive benefit formula
                applied to AIME — you receive a higher replacement rate on lower earnings.
              </li>
              <li>
                <strong>Claiming age adjustments:</strong> Each month before FRA reduces your
                benefit; each month after FRA (up to 70) adds ~8%/year via Delayed Retirement
                Credits.
              </li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: $70,000/Year Average Earner, FRA 67 ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-3">
            <div className="border-b border-blue-200 pb-3">
              <p className="font-medium text-gray-900 mb-1">Estimated Monthly Benefit by Claiming Age</p>
              <div className="flex justify-between">
                <span>Claim at 62 (early)</span>
                <span className="font-medium text-red-700">~$1,540/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Claim at 67 (FRA)</span>
                <span className="font-medium text-blue-900">~$2,200/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Claim at 70 (max delay)</span>
                <span className="font-medium text-green-700">~$2,728/mo</span>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Lifetime Benefit (to age 85)</p>
              <div className="flex justify-between">
                <span>Age 62 (23 years × $1,540)</span>
                <span className="font-medium">~$425,000</span>
              </div>
              <div className="flex justify-between">
                <span>Age 67 (18 years × $2,200)</span>
                <span className="font-medium">~$475,000</span>
              </div>
              <div className="flex justify-between">
                <span>Age 70 (15 years × $2,728)</span>
                <span className="font-medium text-green-700">~$491,000</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *Delaying to 70 pays ~$66K more over a lifetime to age 85. Break-even vs. claiming at 67 is approximately age 82.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              When to Claim Social Security: The Strategic Decision
            </h2>
            <p className="text-gray-700 mb-3">
              The claiming age decision is one of the most significant financial choices in
              retirement planning — worth potentially $100,000+ in lifetime benefits for many
              households.
            </p>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">Claim Early (62–64): Consider if...</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>You have serious health concerns or a family history of shorter lifespan</li>
                  <li>You urgently need income and have no other assets</li>
                  <li>You are the lower-earning spouse and your partner will delay</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Delay to 70: Consider if...</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>You are in good health and have family longevity</li>
                  <li>You are the higher earner in a married couple (survivor benefits matter)</li>
                  <li>You have other assets (IRA, 401k) to bridge income to age 70</li>
                  <li>You want maximum inflation-protected income in your 80s+</li>
                </ul>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Maximize Your Lifetime Social Security Payout
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Work 35 years at the highest earnings possible.</strong> Zeros in your
                record hurt your AIME significantly. Replacing a zero-earning year with a $50,000
                year adds ~$119/month to your benefit.
              </li>
              <li>
                <strong>Coordinated spousal claiming strategy.</strong> The lower earner often claims
                early while the higher earner delays to 70, maximizing the survivor benefit for
                whoever lives longer.
              </li>
              <li>
                <strong>Check your earnings record for errors.</strong> Review your SSA statement at
                ssa.gov annually — errors in your recorded earnings directly reduce your benefit.
              </li>
              <li>
                <strong>Understand the taxability of benefits.</strong> Up to 85% of Social Security
                benefits may be taxable if your combined income exceeds $34,000 (single) or $44,000
                (MFJ). Roth conversion ladders can reduce this.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Retirement Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/retirement-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Retirement Calculator</span>
                <span className="text-sm text-gray-500">Combine Social Security with 401(k) and IRA income.</span>
              </Link>
              <Link
                href="/fire-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">FIRE Calculator</span>
                <span className="text-sm text-gray-500">Plan early retirement before Social Security eligibility.</span>
              </Link>
              <Link
                href="/roth-ira-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Roth IRA Calculator</span>
                <span className="text-sm text-gray-500">Build tax-free income to supplement Social Security.</span>
              </Link>
              <Link
                href="/four-percent-rule-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">4% Rule Calculator</span>
                <span className="text-sm text-gray-500">Model safe withdrawal rates alongside SS income.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <SocialSecurityBenefitsCalculator />
    </CalculatorPage>
  );
}
