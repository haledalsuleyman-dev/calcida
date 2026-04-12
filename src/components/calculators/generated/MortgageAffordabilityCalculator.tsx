"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { inverseAmortizedPrincipal, nn } from '@/components/calculators/generated/utils';

export function MortgageAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(800);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const maxHousingPayment = useMemo(() => {
    const incomeMonthly = nn(annualIncome) / 12;
    const frontEnd = incomeMonthly * 0.28;
    const backEnd = incomeMonthly * 0.36 - nn(monthlyDebts);
    return Math.max(0, Math.min(frontEnd, backEnd));
  }, [annualIncome, monthlyDebts]);

  const maxLoanAmount = useMemo(
    () => inverseAmortizedPrincipal(maxHousingPayment, nn(interestRate), nn(termYears)),
    [maxHousingPayment, interestRate, termYears]
  );
  const maxHomePrice = maxLoanAmount + nn(downPayment);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Income & Debts</h3>
          <div className="space-y-4">
            <div>
              <Label>Annual Income ($)</Label>
              <Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} />
            </div>
            <div>
              <Label>Monthly Debt Payments ($)</Label>
              <Input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} />
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Loan Assumptions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Term (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Max Home Price</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(maxHomePrice)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-blue-800">
              <span className="block font-medium">Max Monthly Payment</span>
              <span className="font-bold">{formatCurrency(maxHousingPayment)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Estimated Loan Amount</span>
              <span className="font-bold">{formatCurrency(maxLoanAmount)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700">
          This estimate uses a common 28/36 guideline and does not include taxes, insurance, HOA, or PMI. Lenders may qualify borrowers differently.
        </div>
      </div>
    </div>
  );
}

