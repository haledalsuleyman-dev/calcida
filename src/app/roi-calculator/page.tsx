
import { CalculatorPage } from '@/components/CalculatorPage';
import { ROICalculator } from '@/components/calculators/finance/ROICalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('roi');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function ROIPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            ROI (Return on Investment) is a measure used to evaluate the efficiency or profitability of an investment or compare the efficiency of a number of different investments.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The ROI Formula:</p>
            <p className="text-xl">ROI = ((Final Value - Initial Cost) / Initial Cost) x 100</p>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <p className="text-sm text-gray-700">
            If you bought a stock for <strong>$10,000</strong> and sold it for <strong>$15,000</strong>, your ROI would be:
            <br />
            (($15,000 - $10,000) / $10,000) x 100 = <strong>50%</strong>
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Evaluate Your ROI</h2>
            <p className="mb-4 text-lg leading-relaxed">
              ROI is one of the most important metrics in finance. It helps you understand whether an investment is worth the risk and allows you to compare different opportunities on an equal footing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Annualized ROI: The Real Picture</h2>
            <p className="mb-4">
              A 50% ROI might sound great, but it's very different if it took 1 year versus 10 years to achieve. For long-term investments, always look at the annualized ROI (also known as CAGR):
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>1 Year:</strong> 50% ROI = 50% Annualized.</li>
              <li><strong>5 Years:</strong> 50% ROI = 8.45% Annualized.</li>
              <li><strong>10 Years:</strong> 50% ROI = 4.14% Annualized.</li>
            </ul>
            <p className="text-sm text-gray-600 italic">
              Use our <Link href="/compound-interest-calculator" className="text-blue-600 hover:underline">compound interest calculator</Link> to see how your returns grow over time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is a Good ROI?</h2>
            <p className="mb-4">
              A "good" ROI depends on the risk and the asset class. For example:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Stocks:</strong> Historically, the S&P 500 has returned about 10% per year.</li>
              <li><strong>Real Estate:</strong> Often 5-10% depending on the market and leverage.</li>
              <li><strong>Business Ventures:</strong> Usually require a much higher ROI (20%+) to justify the increased risk and time commitment.</li>
              <li><strong>Savings Accounts:</strong> Low risk, low ROI (often 1-5%).</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">ROI vs. ROE</h2>
            <p className="mb-4 text-blue-800">
              ROI measures the return on the *total cost* of an investment. ROE (Return on Equity) measures the return on the *cash you personally invested*. For example, if you buy a house with 20% down, your ROE will be much higher than your ROI if the house increases in value.
            </p>
          </section>
        </article>
      }
    >
      <ROICalculator />
    </CalculatorPage>
  );
}
