
import { CalculatorPage } from '@/components/CalculatorPage';
import { InvestmentReturnCalculator } from '@/components/calculators/finance/InvestmentReturnCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('investment-return');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function InvestmentReturnPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            An investment return calculator helps you see how much your portfolio will grow over time with consistent contributions and an expected rate of return. It's a great tool for planning for a house, car, or emergency fund.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Core Calculation:</p>
            <p>FV = P(1 + r/n)^nt + PMT [((1 + r/n)^nt - 1) / (r/n)]</p>
            <div className="mt-2 text-gray-600">
              <ul className="list-none space-y-1">
                <li>FV = future value</li>
                <li>P = current investment</li>
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Invest for Your Future</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Investing is the most effective way to build wealth over time. The key is to start early, stay diversified, and keep your costs low.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Types of Investments</h2>
            <p className="mb-4">
              The type of investment you choose can have a huge impact on your final balance. Consider a combination of:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Stocks:</strong> High-risk, high-reward. Historically, the stock market returns about 10% per year.</li>
              <li><strong>Bonds:</strong> Lower-risk, lower-reward. Bonds can help balance your portfolio and reduce volatility.</li>
              <li><strong>Mutual Funds / ETFs:</strong> Diversified portfolios of stocks and bonds. Low-cost index funds are often the best choice for long-term investors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Asset Allocation</h2>
            <p className="mb-4">
              Your asset allocation (the percentage of your portfolio in different asset classes) is the most important factor in your long-term returns. Diversifying your investments across different asset classes can help reduce risk and improve your chances of reaching your goals.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Start Investing Today</h2>
            <p className="mb-4 text-blue-800">
              The best time to start investing was 20 years ago. The second best time is today. Use the calculator above to see how small changes can make a big difference.
            </p>
          </section>
        </article>
      }
    >
      <InvestmentReturnCalculator />
    </CalculatorPage>
  );
}
