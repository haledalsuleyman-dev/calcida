
import { CalculatorPage } from '@/components/CalculatorPage';
import { NetWorthCalculator } from '@/components/calculators/finance/NetWorthCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('net-worth');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function NetWorthPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            Calculating your net worth is simple: add up everything you own (assets) and subtract everything you owe (liabilities).
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Net Worth Formula:</p>
            <p className="text-xl">Net Worth = Total Assets - Total Liabilities</p>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li><strong>Assets:</strong> $50,000 (Savings) + $300,000 (Home) + $20,000 (Car) = $370,000</li>
            <li><strong>Liabilities:</strong> $200,000 (Mortgage) + $10,000 (Student Loan) = $210,000</li>
            <li><strong>Net Worth:</strong> $370,000 - $210,000 = <strong>$160,000</strong></li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Tracking Net Worth Matters</h2>
            <p className="mb-4 text-lg leading-relaxed">
              While your income shows how much money is coming in, your net worth shows how much you are actually keeping. It is the ultimate scoreboard for your financial health.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What Counts as an Asset?</h2>
            <p className="mb-4">
              Assets are anything of value that you own. Common categories include:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Liquid Assets:</strong> Cash, checking accounts, and savings accounts.</li>
              <li><strong>Investments:</strong> Stocks, bonds, mutual funds, and retirement accounts (401k, IRA).</li>
              <li><strong>Real Estate:</strong> The current market value of your primary residence and any rental properties.</li>
              <li><strong>Personal Property:</strong> Cars, jewelry, and other high-value items (though these often depreciate).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Common Liabilities to Track</h2>
            <p className="mb-4">
              Liabilities are debts or financial obligations. These include:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Mortgages:</strong> The remaining balance on your home loan.</li>
              <li><strong>Consumer Debt:</strong> Credit card balances and personal loans.</li>
              <li><strong>Student Loans:</strong> Both federal and private education debt.</li>
              <li><strong>Auto Loans:</strong> The outstanding balance on your car financing.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">How to Increase Your Net Worth</h2>
            <p className="mb-4 text-blue-800">
              There are only two ways to grow your net worth: increase your assets (by saving and investing) or decrease your liabilities (by paying off debt). Doing both simultaneously is the fastest path to wealth.
            </p>
          </section>
        </article>
      }
    >
      <NetWorthCalculator />
    </CalculatorPage>
  );
}
