
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { calculateAPR } from '@/lib/calculators/loan';

export function APRCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [totalMonths, setTotalMonths] = useState(24);
  const [upfrontFees, setUpfrontFees] = useState(500);

  const apr = useMemo(() => calculateAPR(loanAmount, monthlyPayment, totalMonths, upfrontFees), [loanAmount, monthlyPayment, totalMonths, upfrontFees]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Principal ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
              <Input
                id="monthlyPayment"
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="totalMonths">Loan Term (Months)</Label>
              <Input
                id="totalMonths"
                type="number"
                value={totalMonths}
                onChange={(e) => setTotalMonths(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="upfrontFees">Upfront Fees ($)</Label>
              <Input
                id="upfrontFees"
                type="number"
                value={upfrontFees}
                onChange={(e) => setUpfrontFees(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Your Annual Percentage Rate (APR)</h2>
          <div className="text-6xl font-bold text-blue-700">
            {apr.toFixed(3)}%
          </div>
          <p className="mt-4 text-sm text-blue-800 leading-relaxed max-w-md mx-auto">
            The APR represents the true yearly cost of borrowing, accounting for both the interest rate and upfront fees.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">How APR is Different</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <span className="block font-bold text-blue-900 mb-1">Interest Rate</span>
                <p className="text-sm text-gray-600">The basic percentage cost of borrowing the loan principal.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                <span className="block font-bold text-blue-900 mb-1">APR</span>
                <p className="text-sm text-gray-600 font-medium text-blue-800">The total cost of the loan (interest + fees) expressed as a yearly percentage.</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              The APR is almost always higher than the interest rate because it includes the impact of upfront costs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
