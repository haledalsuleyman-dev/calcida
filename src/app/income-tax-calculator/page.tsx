import { CalculatorPage } from '@/components/CalculatorPage';
import { IncomeTaxCalculator } from '@/components/calculators/generated/TaxExtraCalculators';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('income-tax');
const currentYear = new Date().getFullYear();

export const metadata: Metadata = calculatorMetadata({
  title: `Federal Income Tax Calculator (${currentYear}): Estimate Your Tax Bill`,
  description: `Estimate your ${currentYear} federal income tax bill. Enter your income, filing status, and deductions to see your tax bracket, effective rate, and refund estimate.`,
  canonicalPath: spec.route,
});

const FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'How is federal income tax calculated in the U.S.?',
    answer:
      'The U.S. uses a progressive tax system with seven federal brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%). Each rate applies only to the income within that bracket — not your total income. For example, in 2026 a single filer earning $60,000 pays 10% on the first ~$11,925, 12% on income between ~$11,925 and ~$48,475, and 22% on the remainder.',
  },
  {
    question: `What are the ${currentYear} federal income tax brackets?`,
    answer: `For ${currentYear}, the seven federal income tax rates are 10%, 12%, 22%, 24%, 32%, 35%, and 37%. The exact bracket thresholds are adjusted each year for inflation by the IRS. Use this calculator to see the current brackets applied to your specific income and filing status.`,
  },
  {
    question: 'What is the standard deduction for 2026?',
    answer:
      'The standard deduction is adjusted annually for inflation. For 2026, estimates based on IRS inflation adjustments put it at approximately $15,350 for single filers and $30,700 for married filing jointly. Use this calculator with updated figures for the most accurate estimate.',
  },
  {
    question: 'What is my marginal vs. effective tax rate?',
    answer:
      'Your marginal rate is the rate on your last dollar of income (your highest bracket). Your effective rate is your total tax bill divided by total income — it is always lower than your marginal rate because of lower rates applied to the first portions of income.',
  },
  {
    question: 'Does this calculator include state income tax?',
    answer:
      'This calculator estimates federal income tax only. State tax rates vary widely — from 0% in states like Texas and Florida to over 13% in California. For a complete picture, research your state\'s rate separately.',
  },
  {
    question: 'How can I legally reduce my federal income tax?',
    answer:
      'Common tax-reduction strategies include maximizing pre-tax contributions to a Traditional 401(k) or IRA, contributing to an HSA, claiming eligible credits (Child Tax Credit, EITC, education credits), and timing capital gains/losses strategically. Consult a qualified tax professional for personalized advice.',
  },
];

export default function IncomeTaxCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator estimates your federal income tax using the IRS progressive bracket system
            for the current tax year. It applies the standard deduction automatically and models each
            bracket individually to show your tax breakdown.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
            <h3 className="font-bold text-gray-900 mb-3">How the Calculation Works</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Gross income → Taxable income:</strong> The standard deduction is subtracted
                from your gross income. Pre-tax contributions (401k, HSA) reduce income further.
              </li>
              <li>
                <strong>Bracket application:</strong> The first layer of taxable income is taxed at
                10%, the next layer at 12%, and so on — each bracket applies only to that specific
                slice of income.
              </li>
              <li>
                <strong>Effective rate:</strong> Total federal tax divided by total gross income
                gives your effective (average) rate — typically much lower than your top bracket.
              </li>
              <li>
                <strong>FICA taxes:</strong> Social Security (6.2%, up to the wage base) and
                Medicare (1.45%) are calculated separately and shown in the breakdown.
              </li>
            </ol>
          </div>
          <p>
            Results are estimates for planning purposes. Your actual tax depends on deductions,
            credits, and circumstances not modeled here.
          </p>
        </div>
      }
      example={
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="font-semibold text-blue-900 mb-3">
            Example: Single Filer, $75,000 Income ({currentYear})
          </p>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span>Gross Income</span>
              <span className="font-medium">$75,000</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Deduction (est.)</span>
              <span className="font-medium">−$15,350</span>
            </div>
            <div className="flex justify-between border-b border-blue-200 pb-2">
              <span>Taxable Income</span>
              <span className="font-medium">$59,650</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>10% on first ~$11,925</span>
              <span>$1,193</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>12% on ~$11,925–$48,475</span>
              <span>$4,386</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 border-b border-blue-200 pb-2">
              <span>22% on ~$48,475–$59,650</span>
              <span>$2,459</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-900 pt-1">
              <span>Estimated Federal Tax</span>
              <span>~$8,038</span>
            </div>
            <div className="flex justify-between text-blue-700">
              <span>Effective Tax Rate</span>
              <span>~10.7%</span>
            </div>
            <div className="flex justify-between text-blue-700">
              <span>Marginal Rate</span>
              <span>22%</span>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            *Brackets adjusted for {currentYear} inflation estimates. Actual brackets published by
            the IRS may vary slightly.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              How to Reduce Your Income Tax Bill
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Max out your 401(k):</strong> In {currentYear}, you can contribute up to
                $23,500 ($31,000 if 50+) pre-tax, directly reducing your taxable income.
              </li>
              <li>
                <strong>Contribute to a Traditional IRA:</strong> Depending on your income and
                workplace plan, up to $7,000 ($8,000 if 50+) may be deductible.
              </li>
              <li>
                <strong>Fund your HSA:</strong> Health Savings Account contributions are triple
                tax-advantaged — deductible now, grow tax-free, and withdraw tax-free for medical
                expenses.
              </li>
              <li>
                <strong>Harvest capital losses:</strong> Offset investment gains with realized losses
                to reduce your tax liability.
              </li>
              <li>
                <strong>Time your income:</strong> Deferring income to years with lower earnings can
                keep you in a lower bracket.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Tax Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/tax-bracket-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Tax Bracket Calculator</span>
                <span className="text-sm text-gray-500">See exactly how each bracket applies to your income.</span>
              </Link>
              <Link
                href="/effective-tax-rate-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Effective Tax Rate Calculator</span>
                <span className="text-sm text-gray-500">Your average real tax rate vs. marginal rate.</span>
              </Link>
              <Link
                href="/paycheck-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Paycheck Calculator</span>
                <span className="text-sm text-gray-500">Estimate your take-home pay after all withholdings.</span>
              </Link>
              <Link
                href="/self-employment-tax-calculator"
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors block"
              >
                <span className="font-bold text-blue-600 block">Self-Employment Tax Calculator</span>
                <span className="text-sm text-gray-500">Estimate SE tax if you're self-employed or a freelancer.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <IncomeTaxCalculator />
    </CalculatorPage>
  );
}
