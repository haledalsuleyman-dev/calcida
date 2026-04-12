
import { CalculatorPage } from '@/components/CalculatorPage';
import { EmergencyFundCalculator } from '@/components/calculators/finance/EmergencyFundCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('emergency-fund');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function EmergencyFundPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            An emergency fund is a financial safety net designed to cover unexpected expenses like car repairs, medical bills, or job loss.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The Emergency Fund Formula:</p>
            <p className="text-xl">Target Fund = Total Monthly Expenses x Number of Months</p>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li><strong>Monthly Expenses:</strong> $3,000 (Rent + Food + Utilities + Debt + Insurance)</li>
            <li><strong>Safety Margin:</strong> 6 Months</li>
            <li><strong>Target Fund:</strong> $3,000 x 6 = <strong>$18,000</strong></li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why an Emergency Fund is Step One</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Before you start investing or paying off low-interest debt, you must have an emergency fund. Without one, any financial surprise will force you to use high-interest credit cards or take out expensive loans, setting you back for months or years.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3 Months vs. 6 Months: How Much Do You Need?</h2>
            <p className="mb-4">
              The standard advice is 3 to 6 months of essential living expenses, but your specific number depends on your life situation:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Aim for 3 Months if:</strong> You have a stable job, no children, and low debt.</li>
              <li><strong>Aim for 6 Months if:</strong> You have children, a mortgage, or work in a volatile industry.</li>
              <li><strong>Aim for 9-12 Months if:</strong> You are self-employed, have an irregular income, or have significant health concerns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Where to Keep Your Emergency Fund</h2>
            <p className="mb-4">
              Your emergency fund should be safe and accessible, but it shouldn't just sit in a regular checking account where it earns zero interest.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>High-Yield Savings Accounts (HYSA):</strong> Often the best choice. They are FDIC-insured, easy to withdraw from, and earn significantly more interest than traditional savings accounts.</li>
              <li><strong>Money Market Accounts (MMA):</strong> Similar to HYSAs but often come with a debit card or check-writing abilities.</li>
              <li><strong>Avoid the Stock Market:</strong> Never keep your emergency fund in stocks or mutual funds. The market could be down exactly when you need the cash.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">What Counts as an Emergency?</h2>
            <p className="mb-4 text-blue-800">
              An emergency is something that is <strong>unplanned, urgent, and necessary</strong>. A car repair is an emergency. A job loss is an emergency. A "great deal" on a new TV or a spontaneous vacation is NOT an emergency.
            </p>
          </section>
        </article>
      }
    >
      <EmergencyFundCalculator />
    </CalculatorPage>
  );
}
