
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateCarAffordability } from '@/lib/calculators/loan';

export function CarAffordabilityCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState(500);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);

  const result = useMemo(() => {
    return calculateCarAffordability(monthlyBudget, downPayment, interestRate, termYears);
  }, [monthlyBudget, downPayment, interestRate, termYears]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyBudget">Monthly Budget ($)</Label>
              <Input
                id="monthlyBudget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="downPayment">Down Payment ($)</Label>
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="termYears">Loan Term (Years)</Label>
              <select
                id="termYears"
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
              >
                {[2, 3, 4, 5, 6, 7].map((y) => (
                  <option key={y} value={y}>{y} Years ({y * 12} months)</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Maximum Car Price</h2>
          <div className="text-5xl font-bold text-blue-700">
            {formatCurrency(result.totalCarPrice)}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-blue-700">
              <span className="block font-medium">Loan Amount</span>
              <span className="font-bold">{formatCurrency(result.loanAmount)}</span>
            </div>
            <div className="text-green-700">
              <span className="block font-medium">Down Payment</span>
              <span className="font-bold">{formatCurrency(downPayment)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">20/4/10 Rule Check</h3>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">20% Down Payment:</span>
              <span className={`font-bold ${downPayment >= result.totalCarPrice * 0.2 ? 'text-green-600' : 'text-orange-600'}`}>
                {formatCurrency(result.totalCarPrice * 0.2)}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Max 4 Year Term:</span>
              <span className={`font-bold ${termYears <= 4 ? 'text-green-600' : 'text-orange-600'}`}>
                {termYears} Years
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2 italic text-center">
              The 20/4/10 rule suggests putting 20% down, financing for no more than 4 years, and keeping total transportation costs under 10% of gross income.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
