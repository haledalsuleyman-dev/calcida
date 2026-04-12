
import { CalculatorPage } from '@/components/CalculatorPage';
import { SavingsCalculator } from '@/components/calculators/finance/SavingsCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('savings');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function SavingsPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A savings calculator helps you see how much you'll have in the future by consistently depositing money into an account that earns interest. It's a great tool for planning for a house, car, or emergency fund.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Core Calculation:</p>
            <p>FV = P(1 + r/n)^nt + PMT [((1 + r/n)^nt - 1) / (r/n)]</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>FV = future value</li>
                <li>P = current savings</li>
                <li>r = expected annual return (decimal)</li>
                <li>n = compounding frequency (usually monthly)</li>
                <li>t = time (years)</li>
                <li>PMT = monthly contribution</li>
              </ul>
            </div>
          </div>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Save More Effectively</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Saving money is the foundation of financial health. Whether you're saving for a house, car, or emergency fund, the key is to be consistent and patient.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">High-Yield Savings Accounts (HYSA)</h2>
            <p className="mb-4">
              An HYSA is a type of savings account that typically pays a much higher interest rate than a standard savings account, often 10-20 times more.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Interest Rates:</strong> HYSA rates are often 4% to 5% or more.</li>
              <li><strong>Liquidity:</strong> Your money is still easily accessible.</li>
              <li><strong>Compounding:</strong> Interest is often compounded monthly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Saving for Your Emergency Fund</h2>
            <p className="mb-4">
              Financial experts recommend having 3 to 6 months of living expenses saved in an emergency fund. This will help you handle unexpected costs without going into debt.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Start Saving Today</h2>
            <p className="mb-4 text-blue-800">
              The best way to start saving is to automate it. Set up a recurring deposit from your checking account to your savings account and watch your money grow.
            </p>
          </section>
        </article>
      }
    >
      <SavingsCalculator />
    </CalculatorPage>
  );
}
