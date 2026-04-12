
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan } from '@/lib/calculators/loan';

export function LoanComparisonCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loan1, setLoan1] = useState({ rate: 6.5, term: 5 });
  const [loan2, setLoan2] = useState({ rate: 4.5, term: 3 });

  const result1 = useMemo(() => calculateLoan({
    loanAmount,
    interestRate: loan1.rate,
    loanTermYears: loan1.term
  }), [loanAmount, loan1]);

  const result2 = useMemo(() => calculateLoan({
    loanAmount,
    interestRate: loan2.rate,
    loanTermYears: loan2.term
  }), [loanAmount, loan2]);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="max-w-md mx-auto">
          <Label htmlFor="loanAmount">Loan Amount ($)</Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Loan Option 1 */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm border-t-4 border-t-blue-500">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Loan Option A</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rate1">Interest Rate (%)</Label>
                <Input
                  id="rate1"
                  type="number"
                  step="0.1"
                  value={loan1.rate}
                  onChange={(e) => setLoan1({ ...loan1, rate: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="term1">Term (Years)</Label>
                <Input
                  id="term1"
                  type="number"
                  value={loan1.term}
                  onChange={(e) => setLoan1({ ...loan1, term: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-blue-900 font-medium">Monthly Payment</span>
                <span className="text-2xl font-bold text-blue-700">{formatCurrency(result1.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-blue-900 font-medium">Total Interest</span>
                <span className="text-lg font-bold text-blue-700">{formatCurrency(result1.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-900 font-medium">Total Cost</span>
                <span className="text-lg font-bold text-blue-700">{formatCurrency(result1.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Option 2 */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm border-t-4 border-t-purple-500">
            <h3 className="text-xl font-bold mb-4 text-purple-900">Loan Option B</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rate2">Interest Rate (%)</Label>
                <Input
                  id="rate2"
                  type="number"
                  step="0.1"
                  value={loan2.rate}
                  onChange={(e) => setLoan2({ ...loan2, rate: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="term2">Term (Years)</Label>
                <Input
                  id="term2"
                  type="number"
                  value={loan2.term}
                  onChange={(e) => setLoan2({ ...loan2, term: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span className="text-purple-900 font-medium">Monthly Payment</span>
                <span className="text-2xl font-bold text-purple-700">{formatCurrency(result2.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span className="text-purple-900 font-medium">Total Interest</span>
                <span className="text-lg font-bold text-purple-700">{formatCurrency(result2.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-900 font-medium">Total Cost</span>
                <span className="text-lg font-bold text-purple-700">{formatCurrency(result2.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="bg-green-50 p-8 rounded-lg border border-green-200 text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Comparison Results</h2>
        <div className="text-lg text-green-800 leading-relaxed max-w-2xl mx-auto">
          {result1.totalPayment < result2.totalPayment ? (
            <p><strong>Loan Option A</strong> is the cheaper overall loan, saving you <strong>{formatCurrency(result2.totalPayment - result1.totalPayment)}</strong> in total cost compared to Option B.</p>
          ) : result1.totalPayment > result2.totalPayment ? (
            <p><strong>Loan Option B</strong> is the cheaper overall loan, saving you <strong>{formatCurrency(result1.totalPayment - result2.totalPayment)}</strong> in total cost compared to Option A.</p>
          ) : (
            <p>Both loans have the same total cost.</p>
          )}
          
          <div className="mt-4 border-t border-green-200 pt-4 text-base italic">
            {result1.monthlyPayment < result2.monthlyPayment ? (
              <p>Option A also has a lower monthly payment by {formatCurrency(result2.monthlyPayment - result1.monthlyPayment)}.</p>
            ) : result1.monthlyPayment > result2.monthlyPayment ? (
              <p>Option B also has a lower monthly payment by {formatCurrency(result1.monthlyPayment - result2.monthlyPayment)}.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
