
import { CalculatorPage } from '@/components/CalculatorPage';
import { RefinanceCalculator } from '@/components/calculators/mortgage/RefinanceCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('refinance');

const REFINANCE_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: 'What is the refinance break-even point?',
    answer:
      'The break-even point is the time it takes for monthly savings to cover closing costs. A common estimate is break-even months = closing costs ÷ monthly savings.',
  },
  {
    question: 'Should I include closing costs in the loan or pay them upfront?',
    answer:
      'Paying upfront increases cash needed today, while rolling costs into the loan increases the balance and interest paid. Compare both scenarios using the same rate and term.',
  },
  {
    question: 'When does refinancing usually help?',
    answer:
      'Refinancing can help when the new rate meaningfully lowers your payment or total interest and you plan to keep the loan long enough to pass the break-even point.',
  },
  {
    question: 'When might refinancing not help?',
    answer:
      'It may not help if closing costs are high, your rate reduction is small, you plan to move soon, or you reset to a longer term that increases total interest.',
  },
  {
    question: 'How does the remaining loan term matter?',
    answer:
      'If you have many years left, a lower rate can save more interest over time. If you have few years left, closing costs can be harder to recoup unless savings are large.',
  },
  {
    question: 'Does a lower monthly payment always mean I save money?',
    answer:
      'Not always. Extending the term can lower the payment but increase total interest. Compare both monthly payment and total cost across the scenarios.',
  },
];

const seoTitle = `Refinance Calculator: Find Break-Even & Savings`;
const seoDescription =
  'Compare a refinance offer to your current mortgage. Estimate monthly savings and break-even time, including closing costs—fast and free.';

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: absoluteUrl(spec.route) },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: absoluteUrl(spec.route),
    type: 'website',
  },
};

export default function RefinanceCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={REFINANCE_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>This refinance calculator compares your current mortgage to a new loan scenario to estimate payment changes and break-even time.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Enter current loan details:</span> Remaining balance, current rate, remaining term, and your current monthly payment (if requested).
            </li>
            <li>
              <span className="font-medium">Enter the refinance offer:</span> New rate and term, plus any upfront costs (points, lender fees, title, etc.).
            </li>
            <li>
              <span className="font-medium">Calculate monthly savings:</span> Estimate how much the new payment changes compared to the current payment.
            </li>
            <li>
              <span className="font-medium">Estimate break-even:</span> Closing costs divided by monthly savings gives a quick “months to break even” estimate.
            </li>
            <li>
              <span className="font-medium">Interpret the result:</span> If you plan to keep the loan beyond break-even, refinancing is more likely to help.
            </li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Should You Refinance Your Mortgage?</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Refinancing is usually about one of three goals: lowering the rate, changing the term, or changing the loan structure. The “right” choice depends on time horizon and costs.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Break-even matters:</span> A great rate doesn’t help if you move or refinance again before costs are recovered.
              </li>
              <li>
                <span className="font-medium">Term tradeoff:</span> Extending the term can lower the payment but increase total interest; shortening the term can raise payment while reducing total interest.
              </li>
              <li>
                <span className="font-medium">Closing costs are real:</span> Include points and fees, not just the rate.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Quick Checklist Before Refinancing</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Confirm your expected time in the home (or how long you’ll keep the loan).</li>
              <li>Compare APR and total cost, not just the headline rate.</li>
              <li>Model both “costs paid upfront” and “costs rolled into the loan” scenarios.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Related tools: the{' '}
              <Link href="/mortgage-payment-calculator" className="text-blue-600 hover:underline font-medium">
                Mortgage Payment Calculator
              </Link>
              ,{' '}
              <Link href="/mortgage-amortization-calculator" className="text-blue-600 hover:underline font-medium">
                Mortgage Amortization Calculator
              </Link>
              , and{' '}
              <Link href="/closing-costs-calculator" className="text-blue-600 hover:underline font-medium">
                Closing Costs Calculator
              </Link>
              .
            </p>
          </section>
        </article>
      }
    >
      <RefinanceCalculator />
    </CalculatorPage>
  );
}
