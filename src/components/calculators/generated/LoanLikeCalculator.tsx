"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan } from '@/lib/calculators/loan';
import { nn } from '@/components/calculators/generated/utils';

export function LoanLikeCalculator({ heading }: { heading: string }) {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);

  const result = useMemo(
    () => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(interestRate), loanTermYears: nn(termYears) }),
    [loanAmount, interestRate, termYears]
  );
  const first = result.amortizationSchedule[0];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">{heading}</h3>
          <div className="space-y-4">
            <div>
              <Label>Loan Amount ($)</Label>
              <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            </div>
            <div>
              <Label>Interest Rate (APR %)</Label>
              <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Monthly Payment</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(result.monthlyPayment)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-blue-800">
              <span className="block font-medium">Total Interest</span>
              <span className="font-bold">{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Total Cost</span>
              <span className="font-bold">{formatCurrency(result.totalPayment)}</span>
            </div>
          </div>
        </div>

        {first && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-center">First Payment Breakdown</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-xs uppercase tracking-wide text-gray-500">Payment</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(first.payment)}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-xs uppercase tracking-wide text-gray-500">Interest</div>
                <div className="text-xl font-bold text-red-700">{formatCurrency(first.interest)}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <div className="text-xs uppercase tracking-wide text-gray-500">Principal</div>
                <div className="text-xl font-bold text-green-700">{formatCurrency(first.principal)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

