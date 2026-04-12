import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import { calculatorMetadata } from '@/lib/seo';
import { CALCULATOR_SPECS, getCalculatorSpec, type CalculatorId } from '@/lib/calculatorSpecs';

export const metadata: Metadata = calculatorMetadata({
  title: 'Tax Calculators for Income and Capital Gains',
  description: 'Estimate income tax, calculate sales tax, and model capital gains and other common tax scenarios in one place.',
  canonicalPath: '/tax',
});

const faq = [
  {
    question: "How do tax brackets work?",
    answer: "The US uses a progressive tax system. This means you don't pay one flat rate on all your income. Instead, portions of your income are taxed at different rates. For example, if you are in the 22% bracket, you only pay 22% on the income that falls within that specific range, not on your entire salary."
  },
  {
    question: "What is the difference between a tax deduction and a tax credit?",
    answer: "A tax deduction lowers your taxable income (e.g., standard deduction, 401k contributions), which reduces the amount of income you are taxed on. A tax credit reduces your tax bill dollar-for-dollar (e.g., Child Tax Credit). Credits are generally more valuable than deductions."
  },
  {
    question: "What is the standard deduction?",
    answer: "The standard deduction is a flat dollar amount that reduces the income you're taxed on. Most taxpayers choose the standard deduction rather than itemizing because it is simpler and often results in a lower tax bill. The amount is adjusted annually for inflation."
  },
  {
    question: "Do I have to pay taxes on investment gains?",
    answer: "Yes. If you sell an investment (like stocks or real estate) for more than you bought it for, you owe capital gains tax on the profit. If you held the asset for more than a year, you pay the lower long-term capital gains rate (0%, 15%, or 20%). If held for less than a year, you pay ordinary income tax rates."
  },
  {
    question: "How is sales tax calculated?",
    answer: "Sales tax is a percentage of the purchase price paid by the consumer. It typically includes a state tax rate plus any local (city or county) taxes. For example, if the sales tax rate is 8% and you buy a $100 item, the tax is $8, making the total cost $108."
  }
];

export default function TaxCategoryPage() {
  const preferred: CalculatorId[] = ['income-tax', 'sales-tax', 'capital-gains-tax', 'effective-tax-rate', 'self-employment-tax'];
  const idsInCategory = CALCULATOR_SPECS.filter((s) => s.category === 'tax').map((s) => s.id);
  const inCategory = new Set<CalculatorId>(idsInCategory);
  const preferredFiltered = preferred.filter((id) => inCategory.has(id));
  const preferredSet = new Set<CalculatorId>(preferredFiltered);
  const rest = idsInCategory
    .filter((id) => !preferredSet.has(id))
    .sort((a, b) => getCalculatorSpec(a).title.localeCompare(getCalculatorSpec(b).title));
  const extra: CalculatorId[] = ['after-tax-income'];
  const calculators = [...preferredFiltered, ...rest, ...extra].map((id) => {
    const spec = getCalculatorSpec(id);
    return { name: spec.title, description: spec.description, href: spec.route };
  });

  return (
    <CategoryPage
      title="Tax Calculators"
      description="Estimate your federal and state income taxes, calculate sales tax, and determine capital gains liability."
      calculators={calculators}
      faq={faq}
    >
      <div className="space-y-6 text-gray-800">
        <p>
          Taxes are one of life's certainties, but they don't have to be a mystery. Whether you are estimating your annual tax bill, calculating the final price of a purchase, or planning an investment sale, our <strong>free tax calculators</strong> help you navigate the complexities of the tax code.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8">Understanding the US Tax System</h2>
        <p>
          The United States uses a <strong>progressive tax system</strong> for federal income tax. This means that higher earners pay a higher percentage of their income in taxes, but only on the money that falls into higher "brackets."
        </p>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 my-6">
          <h3 className="font-bold text-lg mb-3 text-blue-900">Example: How Brackets Work</h3>
          <p className="mb-2">
            Imagine a simplified system where income up to $10,000 is taxed at 10%, and income over $10,000 is taxed at 20%.
          </p>
          <p>
            If you earn <strong>$15,000</strong>:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>You pay 10% on the first $10,000 = <strong>$1,000</strong></li>
            <li>You pay 20% on the remaining $5,000 = <strong>$1,000</strong></li>
            <li>Total Tax = <strong>$2,000</strong> (Effective rate of 13.3%, not 20%)</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Types of Taxes</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Income Tax</h3>
            <p>Levied by the federal government and most states on your earnings, including wages, interest, and dividends.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">FICA Tax</h3>
            <p>Payroll taxes that fund Social Security and Medicare. These are flat rates shared by employees and employers.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Capital Gains Tax</h3>
            <p>Tax on the profit from selling an asset. Long-term gains (held &gt;1 year) are taxed at preferential lower rates.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Sales Tax</h3>
            <p>Consumption tax imposed by state and local governments on the sale of goods and services.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Tax Planning Strategies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Contribute to Retirement Accounts:</strong> Money put into a Traditional 401(k) or IRA is tax-deductible, lowering your taxable income for the year.</li>
          <li><strong>Use an HSA:</strong> Health Savings Account contributions are tax-deductible, grow tax-free, and can be withdrawn tax-free for medical expenses.</li>
          <li><strong>Hold Investments Longer:</strong> Holding assets for at least a year qualifies you for long-term capital gains rates, which are significantly lower than ordinary income rates.</li>
          <li><strong>Harvest Losses:</strong> You can sell losing investments to offset gains from winning investments, reducing your overall tax liability (Tax-Loss Harvesting).</li>
        </ul>

        <p className="mt-8">
          Use our calculators to estimate your liability, but always consult with a qualified CPA or tax professional for advice specific to your situation.
        </p>
      </div>
    </CategoryPage>
  );
}
