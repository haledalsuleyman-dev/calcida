
import { CalculatorPage } from '@/components/CalculatorPage';
import { BudgetCalculator } from '@/components/calculators/finance/BudgetCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('budget');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function BudgetPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A budget calculator helps you allocate your monthly income to different categories to ensure your needs are met and your financial goals are reached.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-6 font-mono text-sm overflow-x-auto">
            <p className="mb-2 font-bold text-gray-700">The 50/30/20 Budget Formula:</p>
            <p className="text-xl">Needs = Income x 0.50</p>
            <p className="text-xl">Wants = Income x 0.30</p>
            <p className="text-xl">Savings = Income x 0.20</p>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Example Calculation:</h3>
          <p className="text-sm text-gray-700">
            If your take-home pay is <strong>$4,000</strong> per month, you should aim for:
            <br />
            <strong>$2,000</strong> (Needs) + <strong>$1,200</strong> (Wants) + <strong>$800</strong> (Savings/Debt)
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Create a Budget You'll Actually Stick To</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Most people fail at budgeting because they make it too complicated. A good budget is a tool for awareness, not a straightjacket for your spending.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">The 50/30/20 Rule: A Simple Framework</h2>
            <p className="mb-4">
              Popularized by Senator Elizabeth Warren in her book *All Your Worth*, the 50/30/20 rule is a great starting point for anyone:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>50% for Needs:</strong> These are essential costs like rent/mortgage, utilities, groceries, transportation, and minimum debt payments.</li>
              <li><strong>30% for Wants:</strong> These are "lifestyle" choices like dining out, entertainment, subscriptions, and travel.</li>
              <li><strong>20% for Savings & Debt:</strong> This is for building an <Link href="/emergency-fund-calculator" className="text-blue-600 hover:underline">emergency fund</Link>, investing for retirement, or making extra debt payments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Handle Budget Deviations</h2>
            <p className="mb-4">
              Life is unpredictable. Some months your car will break down or you'll have a family wedding. When this happens, follow these rules:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Borrow from Wants:</strong> If your needs go over 50%, the first place to take money from is your wants category.</li>
              <li><strong>Use Your Emergency Fund:</strong> For truly unplanned and necessary expenses, that's what your <Link href="/emergency-fund-calculator" className="text-blue-600 hover:underline">savings</Link> are for.</li>
              <li><strong>Track Every Dollar:</strong> Use an app or a simple spreadsheet for at least 30 days to see exactly where your money is going.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Automate Your Success</h2>
            <p className="mb-4 text-blue-800">
              The easiest way to stick to a budget is to automate it. Set up a recurring transfer from your checking account to your savings account the day after you get paid. If you never see the money, you won't miss it.
            </p>
          </section>
        </article>
      }
    >
      <BudgetCalculator />
    </CalculatorPage>
  );
}
