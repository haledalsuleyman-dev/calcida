
import { CalculatorPage } from '@/components/CalculatorPage';
import { InflationCalculator } from '@/components/calculators/finance/InflationCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('inflation');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function InflationPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. This calculator shows how your buying power changes over time based on an annual inflation rate.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Inflation Formula:</p>
            <p className="text-xl">FV = PV x (1 + r)^n</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>FV = Future Value</li>
                <li>PV = Present Value (Starting amount)</li>
                <li>r = Inflation rate (decimal)</li>
                <li>n = Number of years</li>
              </ul>
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <p className="text-sm text-gray-700">
            If you have <strong>$1,000</strong> today and inflation is <strong>3%</strong> annually, in <strong>10 years</strong> you would need:
            <br />
            $1,000 x (1.03)^10 = <strong>$1,343.92</strong> to buy the same items.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How Inflation Affects Your Savings</h2>
            <p className="mb-4 text-lg leading-relaxed">
              While your savings might be growing in nominal terms (the number on your bank statement), they might be shrinking in real terms (what you can actually buy with that money) if the interest rate you are earning is lower than the inflation rate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is the Consumer Price Index (CPI)?</h2>
            <p className="mb-4">
              In the United States, the Consumer Price Index (CPI) is the most common measure of inflation. It tracks the price of a basket of goods and services including:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Food & Beverages:</strong> Groceries and dining out.</li>
              <li><strong>Housing:</strong> Rent and homeowner costs.</li>
              <li><strong>Transportation:</strong> Fuel, public transit, and car prices.</li>
              <li><strong>Medical Care:</strong> Healthcare services and supplies.</li>
              <li><strong>Energy:</strong> Electricity, gas, and oil.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Protect Your Money from Inflation</h2>
            <p className="mb-4">
              Keeping all your money in a standard checking account is usually a bad idea during high inflation. Consider these strategies:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>High-Yield Savings:</strong> Earn more interest than traditional accounts.</li>
              <li><strong>Investing in Stocks:</strong> Historically, the stock market has outperformed inflation over long periods.</li>
              <li><strong>Real Estate:</strong> Property values and rents often rise with inflation.</li>
              <li><strong>TIPS (Treasury Inflation-Protected Securities):</strong> Bonds that are indexed to inflation.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">The Power of "Real" Returns</h2>
            <p className="mb-4 text-blue-800">
              When evaluating an investment, always subtract the inflation rate from your expected return to find your "real" return. If your investment earns 7% but inflation is 3%, your real return is 4%.
            </p>
          </section>
        </article>
      }
    >
      <InflationCalculator />
    </CalculatorPage>
  );
}
