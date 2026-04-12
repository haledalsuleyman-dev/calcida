import { CategoryPage } from '@/components/CategoryPage';
import { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Salary Calculators for Paycheck and Take-Home Pay',
  description: 'Convert salary and hourly pay, estimate paycheck deductions, and calculate take-home income with clear salary planning tools.',
  canonicalPath: '/salary',
});

const calculators = [
  {
    name: "Salary to Hourly Calculator",
    description: "Convert your annual salary to an hourly wage based on your work hours.",
    href: "/salary-to-hourly-calculator"
  },
  {
    name: "Hourly to Salary Calculator",
    description: "See how much you earn per year, month, and week based on your hourly rate.",
    href: "/hourly-to-salary-calculator"
  },
  {
    name: "Paycheck Calculator",
    description: "Estimate your net pay after taxes and deductions for each paycheck.",
    href: "/paycheck-calculator"
  },
  {
    name: "Take-Home Pay Calculator",
    description: "Calculate exactly how much money hits your bank account after all deductions.",
    href: "/take-home-pay-calculator"
  },
  {
    name: "After-Tax Income Calculator",
    description: "Estimate your annual after-tax income and effective tax rate based on your location and filing status.",
    href: "/after-tax-income-calculator"
  },
  {
    name: "60,000 After Tax",
    description: "See what you take home on a $60,000 salary after taxes.",
    href: "/salary/60000-after-tax"
  },
  {
    name: "70,000 After Tax",
    description: "See what you take home on a $70,000 salary after taxes.",
    href: "/salary/70000-after-tax"
  },
  {
    name: "80,000 After Tax",
    description: "See what you take home on a $80,000 salary after taxes.",
    href: "/salary/80000-after-tax"
  }
];

const faq = [
  {
    question: "What is the difference between gross and net pay?",
    answer: "Gross pay is your total earnings before any taxes or deductions are taken out. Net pay (or take-home pay) is the amount you actually receive in your bank account after federal and state taxes, Social Security, Medicare, and other deductions like 401(k) contributions and health insurance premiums."
  },
  {
    question: "How are payroll taxes calculated?",
    answer: "Payroll taxes include Social Security (6.2%) and Medicare (1.45%), collectively known as FICA taxes. In addition, federal income tax is withheld based on your W-4 form, and state income tax is withheld based on your state's tax laws."
  },
  {
    question: "How do I convert my annual salary to an hourly rate?",
    answer: "The standard formula assumes a 40-hour work week and 52 weeks per year (2,080 hours). To find your hourly rate, divide your annual salary by 2,080. For example, $50,000 / 2,080 = $24.04 per hour."
  },
  {
    question: "Does my paycheck change if I get paid biweekly vs. semi-monthly?",
    answer: "Yes. Biweekly means you get paid every two weeks (26 checks per year). Semi-monthly means you get paid twice a month (24 checks per year). Because there are fewer checks with a semi-monthly schedule, each check is slightly larger than a biweekly check for the same annual salary."
  },
  {
    question: "How much of my salary should I save?",
    answer: "A common recommendation is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. However, your specific savings rate should depend on your financial goals, such as retirement, buying a house, or building an emergency fund."
  }
];

export default function SalaryCategoryPage() {
  return (
    <CategoryPage
      title="Salary Calculators"
      description="Calculate your take-home pay, convert salary to hourly wage, and estimate taxes. Understand your true income."
      calculators={calculators}
      faq={faq}
    >
      <div className="space-y-6 text-gray-800">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            Browse the complete <Link href="/salary-calculators" className="text-blue-700 hover:underline font-medium">Salary Calculators</Link> hub or explore the full <Link href="/calculators" className="text-blue-700 hover:underline font-medium">Calculators</Link> index.
          </p>
        </div>
        <p>
          Your salary is more than just a number on an offer letter. Taxes, deductions, and pay schedules all impact how much money actually lands in your bank account. Our <strong>free salary calculators</strong> help you decode your paycheck and plan your budget with precision.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8">Understanding Your Paycheck</h2>
        <p>
          It can be a shock to see your first paycheck and realize it's significantly lower than your "gross" salary. Here is where the money goes:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">FICA Taxes</h3>
            <p>Mandatory contributions to Social Security (6.2%) and Medicare (1.45%). You pay this on every dollar you earn up to certain limits.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Federal & State Income Tax</h3>
            <p>Withheld based on your income bracket and the information on your W-4 form. Some states have no income tax, while others have high rates.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Benefits (Pre-Tax)</h3>
            <p>Deductions for health insurance, HSA/FSA contributions, and 401(k) retirement savings. These lower your taxable income.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Benefits (Post-Tax)</h3>
            <p>Deductions for things like Roth 401(k) contributions or life insurance, taken out after taxes are calculated.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Hourly vs. Salary</h2>
        <p>
          Comparing job offers often requires converting between hourly wages and annual salaries.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Salaried Employees:</strong> Typically exempt from overtime pay but receive a steady paycheck regardless of hours worked. Often includes benefits like paid time off.</li>
          <li><strong>Hourly Employees:</strong> Paid for every hour worked and usually eligible for overtime (1.5x pay) for hours over 40 per week. Income can fluctuate if hours are cut.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">Why Use a Paycheck Calculator?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Job Offers:</strong> Compare the real take-home pay of two different job offers in different locations.</li>
          <li><strong>Budgeting:</strong> Know exactly how much you can afford to spend on rent, car payments, and other expenses.</li>
          <li><strong>Tax Planning:</strong> Adjust your W-4 withholdings if you find you are owing money or getting too large of a refund at tax time.</li>
          <li><strong>Raise Negotiation:</strong> Calculate exactly what a 5% or 10% raise looks like in your biweekly check.</li>
        </ul>

        <p className="mt-8">
          Use our suite of tools to take the mystery out of your compensation and make informed career and financial decisions.
        </p>
      </div>
    </CategoryPage>
  );
}
