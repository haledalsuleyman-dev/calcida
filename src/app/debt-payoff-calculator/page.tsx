
import { CalculatorPage } from '@/components/CalculatorPage';
import { DebtPayoffCalculator } from '@/components/calculators/debt/DebtPayoffCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('debt-payoff');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function DebtPayoffPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A debt payoff calculator helps you compare different strategies to see how fast you can become debt-free by applying extra payments to your loans and credit cards.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Debt Payoff Formula:</p>
            <p className="text-xl">Months to Payoff = log(PMT / (PMT - r x L)) / log(1 + r)</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>PMT = Monthly payment</li>
                <li>r = Monthly interest rate</li>
                <li>L = Loan amount</li>
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li><strong>Total Debt:</strong> $10,000</li>
            <li><strong>Interest Rate:</strong> 20%</li>
            <li><strong>Monthly Payment:</strong> $500</li>
            <li><strong>Result:</strong> Debt-free in <strong>25 Months</strong> and pay <strong>$2,226 in Interest</strong></li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Escape Debt Faster</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Debt can feel like a mountain, but it's really just a math problem. By understanding how interest works and choosing the right strategy, you can pay off your debt years faster and save thousands of dollars.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Snowball vs. Avalanche: Which is Better?</h2>
            <p className="mb-4">
              There are two main strategies for paying off multiple debts. Both require you to make the minimum payment on all debts and then throw every extra dollar at one specific debt.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border border-blue-100 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">The Debt Avalanche</h3>
                <p className="text-sm text-blue-800 mb-4">Focus on the <strong>Highest Interest Rate</strong> first.</p>
                <ul className="list-disc pl-5 text-sm text-blue-700 space-y-2">
                  <li><strong>Pros:</strong> Mathematically optimal. Saves you the most money in total interest and results in the fastest overall payoff.</li>
                  <li><strong>Cons:</strong> Can feel slow if your highest-interest debt is also your largest balance.</li>
                </ul>
              </div>
              <div className="border border-green-100 bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-2">The Debt Snowball</h3>
                <p className="text-sm text-green-800 mb-4">Focus on the <strong>Smallest Balance</strong> first.</p>
                <ul className="list-disc pl-5 text-sm text-green-700 space-y-2">
                  <li><strong>Pros:</strong> Psychologically rewarding. Quick wins keep you motivated and committed to the plan.</li>
                  <li><strong>Cons:</strong> You will pay more in total interest over time.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Create Your Payoff Plan</h2>
            <p className="mb-4">
              To use the calculator above effectively, follow these steps:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>List Your Debts:</strong> Write down every balance, interest rate, and minimum payment.</li>
              <li><strong>Find Extra Cash:</strong> Use a <Link href="/budget-calculator" className="text-blue-600 hover:underline">budget calculator</Link> to see how much extra you can pay each month.</li>
              <li><strong>Commit:</strong> Automate your payments and don't take on new debt while you're in the payoff phase.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">The Power of Extra Payments</h2>
            <p className="mb-4 text-blue-800">
              Even a small increase in your monthly payment can have a massive impact. For example, on a $10,000 credit card balance at 20% interest, paying $500 instead of $250 will save you over $5,000 in interest and cut your payoff time by 3 years.
            </p>
          </section>
        </article>
      }
    >
      <DebtPayoffCalculator />
    </CalculatorPage>
  );
}
