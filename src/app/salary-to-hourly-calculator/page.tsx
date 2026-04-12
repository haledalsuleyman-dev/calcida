
import { CalculatorPage } from '@/components/CalculatorPage';
import { SalaryToHourlyCalculator } from '@/components/calculators/salary/SalaryToHourlyCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('salary-to-hourly');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

const SALARY_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "How many work hours are in a year?",
    answer: "A standard full-time work year is typically 2,080 hours (40 hours per week × 52 weeks). However, this can vary if you take unpaid leave or work different weekly hours."
  },
  {
    question: "How do I convert my annual salary to hourly?",
    answer: "To find your hourly rate, divide your annual salary by the total number of hours worked in a year. For example, $50,000 divided by 2,080 hours is approximately $24.04 per hour."
  },
  {
    question: "Does this calculation include bonuses?",
    answer: "This calculator focuses on base salary. If you want to include bonuses, add your total annual bonus amount to your annual salary before calculating the hourly rate."
  },
  {
    question: "What is a 40-hour work week salary per hour?",
    answer: "For a 40-hour work week, you can get a quick estimate by dividing your annual salary by 2,000 (roughly accounting for 2 weeks of vacation) or 2,080 for the full year."
  },
  {
    question: "Is it better to be hourly or salaried?",
    answer: "Salaried roles often offer more stability and benefits, while hourly roles may offer overtime pay. Use this tool to see if an hourly offer actually matches or exceeds your current salary."
  }
];

export default function SalaryToHourlyCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={SALARY_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator translates your annual compensation into an hourly wage (and vice versa) to help you compare job offers and understand your time's value.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 my-6 text-gray-700">
            <h3 className="font-bold text-gray-900 mb-2">The Conversion Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-medium text-gray-900">Total Annual Hours:</span> We multiply your hours per week by the number of work weeks per year (typically 52).</li>
              <li><span className="font-medium text-gray-900">Division:</span> We divide your total annual salary by the total annual hours.</li>
              <li><span className="font-medium text-gray-900">Frequency Breakdown:</span> The tool also computes your weekly, biweekly, and monthly gross pay for a complete view.</li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="mb-4">Breaking down a common $60,000 annual salary:</p>
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li><strong>Annual Salary:</strong> $60,000</li>
            <li><strong>Work Week:</strong> 40 Hours</li>
            <li><strong>Work Weeks:</strong> 52</li>
            <li className="pt-2 border-t border-blue-200 mt-2">
              <span className="text-xl font-bold text-blue-900">Hourly Wage: $28.85</span>
            </li>
            <li><strong>Monthly Pay (Gross):</strong> $5,000</li>
            <li><strong>Biweekly Pay (Gross):</strong> $2,307.69</li>
          </ul>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Use This Calculation?</h2>
            <p className="mb-4">
              Switching from a salaried role to a contract (hourly) role often requires a higher hourly rate to cover your own benefits and taxes. This tool allows you to set a baseline so you don't accidentally take a pay cut when moving between different compensation models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Compare Your Take-Home Pay</h2>
            <p className="mb-4 text-gray-700">
              Gross hourly rates are only half the story. See how much you'll actually keep after taxes and deductions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/paycheck-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors text-blue-600 no-underline">
                <span className="font-bold block no-underline">Paycheck Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Estimate your individual paychecks after taxes and deductions.</span>
              </Link>
              <Link href="/take-home-pay-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors text-blue-600 no-underline">
                <span className="font-bold block no-underline">Take-Home Pay Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Compare your net annual income across different pay frequencies.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <SalaryToHourlyCalculator />
    </CalculatorPage>
  );
}
