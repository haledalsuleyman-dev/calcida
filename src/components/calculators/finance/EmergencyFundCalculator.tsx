
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateEmergencyFund } from '@/lib/calculators/finance';

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState({
    rent: 1500,
    food: 600,
    utilities: 300,
    transport: 200,
    insurance: 150,
    debt: 400,
    other: 200
  });
  const [months, setMonths] = useState(6);

  const monthlyTotal = useMemo(() => Object.values(expenses).reduce((a, b) => a + b, 0), [expenses]);
  const totalFund = calculateEmergencyFund(monthlyTotal, months);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-blue-900">Monthly Essential Expenses</h3>
          <div className="space-y-4">
            {Object.keys(expenses).map((key) => (
              <div key={key}>
                <Label htmlFor={`expense-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <Input
                  id={`expense-${key}`}
                  type="number"
                  value={expenses[key as keyof typeof expenses]}
                  onChange={(e) => setExpenses({ ...expenses, [key]: Number(e.target.value) })}
                />
              </div>
            ))}
            <div className="pt-4">
              <Label htmlFor="months">Safety Margin (Months)</Label>
              <select
                id="months"
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              >
                {[3, 4, 5, 6, 9, 12].map((m) => (
                  <option key={m} value={m}>{m} Months</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Target Emergency Fund</h2>
          <div className="text-5xl font-bold text-blue-700">
            {formatCurrency(totalFund)}
          </div>
          <p className="mt-4 text-sm text-blue-800 leading-relaxed">
            Based on monthly expenses of {formatCurrency(monthlyTotal)}, you should save {formatCurrency(totalFund)} to cover {months} months of costs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">Expense Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(expenses).map(([name, amount]) => (
              <div key={name} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{name}</span>
                <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-blue-900">
              <span>Total Monthly</span>
              <span>{formatCurrency(monthlyTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
