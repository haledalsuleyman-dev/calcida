
import { CalculatorPage } from '@/components/CalculatorPage';
import { LoanCalculator } from '@/components/calculators/loan/LoanCalculator';
import { getCalculatorSpec } from '@/lib/calculatorSpecs';
import { calculatorMetadata } from '@/lib/seo';
import { Metadata } from 'next';

const spec = getCalculatorSpec('student-loan');

export const metadata: Metadata = calculatorMetadata({
  title: spec.title,
  description: spec.description,
  canonicalPath: spec.route,
});

export default function StudentLoanCalculatorPage() {
  return (
    <CalculatorPage
      spec={spec}
      howItWorks={
        <div>
          <p className="mb-4">
            A student loan calculator estimates your monthly payments based on the loan amount, the annual interest rate (APR), and the loan term.
          </p>
        </div>
      }
      guide={
        <article className="space-y-8 text-gray-800">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Manage Your Student Loans</h2>
            <p className="mb-4 text-lg leading-relaxed">
              Student loans can be a major financial burden, but there are ways to manage them effectively. Consider consolidating your loans, signing up for an income-driven repayment plan, or making extra payments.
            </p>
          </section>
        </article>
      }
    >
      <LoanCalculator type="student" />
    </CalculatorPage>
  );
}
