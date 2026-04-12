
import { CalculatorPage } from '@/components/CalculatorPage';
import { CreditCardCalculator } from '@/components/calculators/credit-card/CreditCardCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('credit-card-payoff');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function CreditCardPayoffPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            Credit card debt can feel like a trap because of how interest is calculated. This tool helps you break free by showing you the math behind the monthly statement.
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Current Balance:</strong> What you owe today.</li>
            <li><strong>Interest Rate (APR):</strong> The cost of borrowing (look on your statement).</li>
            <li><strong>Monthly Payment:</strong> What you plan to pay (Fixed amount or Minimum).</li>
          </ul>
          <p>
            The results will show you your <strong>Debt-Free Date</strong> and the <strong>Total Interest</strong> you will pay. You might be shocked at how much a small increase in monthly payment can save you.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Escape Credit Card Debt Faster</h2>
            <p className="mb-4 text-lg leading-relaxed">
              The average American household carries thousands of dollars in credit card debt. With interest rates often exceeding 20%, this debt can double in just a few years if you only make minimum payments.
            </p>
            <p className="mb-4 leading-relaxed">
              The secret to paying it off isn't just "spending less"—it is attacking the debt mathematically. Using a <Link href="/credit-card-payoff-calculator" className="text-blue-600 hover:underline">payoff calculator</Link> is the first step to taking control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">The High Cost of Minimum Payments</h2>
            <p className="mb-4">
              Credit card companies love when you pay the minimum. Why? Because it maximizes their profit.
            </p>
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 my-6">
              <h3 className="text-xl font-bold text-red-900 mb-3">The "Minimum Payment" Trap</h3>
              <p className="mb-2">Balance: <strong>$5,000</strong> | APR: <strong>20%</strong> | Min Payment: <strong>$100</strong></p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-red-800">
                <li>Time to Pay Off: <strong>9 Years</strong></li>
                <li>Total Interest Paid: <strong>$5,800</strong> (More than the original debt!)</li>
              </ul>
              <p className="mt-4 font-bold text-green-800">
                Fix: Pay $200/month instead. Payoff time drops to under 3 years, and you save $4,000 in interest.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Debt Payoff Strategies: Snowball vs. Avalanche</h2>
            <p className="mb-4">
              If you have multiple cards, you need a strategy. Both methods work, but they serve different psychological needs.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="border border-gray-200 p-5 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">1. The Debt Avalanche</h3>
                <p className="text-sm text-gray-600 mb-3">Focus on the <strong>Highest Interest Rate</strong> first.</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Mathematically optimal (saves the most money).</li>
                  <li>Pay minimums on all other cards.</li>
                  <li>Throw every extra dollar at the card with the highest APR.</li>
                </ul>
              </div>
              <div className="border border-gray-200 p-5 rounded-lg">
                <h3 className="font-bold text-purple-700 mb-2">2. The Debt Snowball</h3>
                <p className="text-sm text-gray-600 mb-3">Focus on the <strong>Smallest Balance</strong> first.</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Psychologically rewarding (quick wins).</li>
                  <li>Pay minimums on all other cards.</li>
                  <li>Knock out the small debts quickly to build motivation.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Your Debt-Free Date Starts Here</h2>
            <p className="mb-4 text-blue-800">
              Don't let interest compound forever. Use the calculator above to find a monthly payment that fits your budget, and commit to it. The sooner you start, the thousands more you save.
            </p>
          </section>
        </article>
      }
    >
      <CreditCardCalculator />
    </CalculatorPage>
  );
}
