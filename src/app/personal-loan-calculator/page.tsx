
import { CalculatorPage } from '@/components/CalculatorPage';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('personal-loan');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function PersonalLoanCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A personal loan calculator estimates your monthly payments based on the loan amount, the annual interest rate (APR), and the loan term.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Choose the Right Personal Loan</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Personal loans can be used for a variety of purposes, such as consolidating debt, paying for medical expenses, or funding a home improvement project.
            </p>
          </section>
        </article>
      }
    >
      <LoanCalculator type="personal" />
    </CalculatorPage>
  );
}
