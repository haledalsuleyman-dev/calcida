
import { CalculatorPage } from '@/components/CalculatorPage';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import type { JsonLdFaqItem } from '@/lib/jsonld';
import { Metadata } from 'next';
import Link from 'next/link';

const spec = getCalculatorSpec('auto-loan');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

const AUTO_FAQ: readonly JsonLdFaqItem[] = [
  {
    question: "How long should an auto loan term be?",
    answer: "A common standard is 60 months (5 years). While 72 or 84 months lower your monthly payments, you will pay far more in interest and risk being 'underwater' (owing more than the car is worth)."
  },
  {
    question: "How does a down payment affect my car loan?",
    answer: "A larger down payment reduces the total loan amount, which lowers your monthly payment and the amount of interest you pay over time. Aim for at least 20% if possible."
  },
  {
    question: "What is a good APR for an auto loan?",
    answer: "APR depends on your credit score and whether the car is new or used. Generally, a rate below 6-7% for new cars or 8-9% for used cars is considered competitive today."
  },
  {
    question: "Can I pay off my car loan early?",
    answer: "Most auto loans do not have prepayment penalties, meaning you can save money on interest by paying more than the minimum each month. Check your specific loan agreement first."
  },
  {
    question: "What is a trade-in value?",
    answer: "A trade-in value is the amount a dealership offers you for your current car, which is then subtracted from the purchase price of the new car, effectively acting as a down payment."
  }
];

export default function AutoLoanCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      faq={AUTO_FAQ}
      howItWorks={
        <div className="space-y-4 text-gray-700">
          <p>
            This calculator helps you understand the monthly cost of a car purchase by factoring in the vehicle price, your down payment, any trade-in value, and the financing terms.
          </p>
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 my-6">
            <h3 className="font-bold text-gray-900 mb-2">The Simple Breakdown:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-medium text-gray-900">Total Loan Amount:</span> Price minus down payment and trade-in value.</li>
              <li><span className="font-medium text-gray-900">Interest Calculation:</span> The monthly interest rate is applied to your remaining balance each month.</li>
              <li><span className="font-medium text-gray-900">Monthly Payment:</span> A fixed amount that covers both principal and interest, ensuring the loan is zeroed out by the end of the term.</li>
            </ol>
          </div>
        </div>
      }
      example={
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <p className="mb-4">Calculating the math for a typical mid-sized SUV purchase:</p>
          <ul className="space-y-2 text-gray-700 list-none pl-0">
            <li><strong>Vehicle Price:</strong> $35,000</li>
            <li><strong>Down Payment:</strong> $5,000</li>
            <li><strong>Trade-in Value:</strong> $2,000</li>
            <li><strong>Loan Amount:</strong> $28,000</li>
            <li><strong>Interest Rate (APR):</strong> 6.0%</li>
            <li><strong>Loan Term:</strong> 60 Months (5 Years)</li>
            <li className="pt-2 border-t border-blue-200 mt-2">
              <span className="text-xl font-bold text-blue-900">Monthly Payment: ~$541.32</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-800 italic">
            *Total interest paid over the life of this loan would be approximately $4,479.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Watch Out for Total Loan Cost</h2>
            <p className="mb-4">
              When dealerships focus solely on the "monthly payment," it's easy to overlook the total cost. Extending a loan from 60 months to 84 months can make a car feel affordable today, but you could end up paying thousands more in interest and owing more than the car is worth for several years.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Check Your Car Budget</h2>
            <p className="mb-4 text-gray-700">
              Before you head to the dealership, run the numbers through these related tools to ensure the purchase is sustainable:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/car-affordability-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors text-blue-600 no-underline">
                <span className="font-bold block no-underline">Car Affordability Calculator</span>
                <span className="text-sm text-gray-500 no-underline">Find your maximum car price based on your monthly income.</span>
              </Link>
              <Link href="/loan-comparison-calculator" className="p-4 bg-white border border-gray-200 rounded hover:border-blue-500 transition-colors text-blue-600 no-underline">
                <span className="font-bold block no-underline">Loan Comparison</span>
                <span className="text-sm text-gray-500 no-underline">Compare two different loan offers (rates vs terms) side-by-side.</span>
              </Link>
            </div>
          </section>
        </article>
      }
    >
      <LoanCalculator type="auto" />
    </CalculatorPage>
  );
}
