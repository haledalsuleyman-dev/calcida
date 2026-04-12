"use client";

import React, { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan, LoanResult } from '@/lib/calculators/loan';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface LoanCalculatorProps {
  type: 'auto' | 'personal' | 'student';
  defaultValues?: {
    amount: number;
    rate: number;
    term: number;
  };
}

export function LoanCalculator({ type, defaultValues }: LoanCalculatorProps) {
  const [amount, setAmount] = useState(defaultValues?.amount || 20000);
  const [rate, setRate] = useState(defaultValues?.rate || 5);
  const [term, setTerm] = useState(defaultValues?.term || 5);

  const title = useMemo(() => {
    switch (type) {
      case 'auto': return 'Auto Loan Calculator';
      case 'personal': return 'Personal Loan Calculator';
      case 'student': return 'Student Loan Calculator';
      default: return 'Loan Calculator';
    }
  }, [type]);

  const result = useMemo<LoanResult>(() => {
    return calculateLoan({
      loanAmount: amount,
      interestRate: rate,
      loanTermYears: term,
    });
  }, [amount, rate, term]);

  if (!result) return null;

  const chartData = [
    { name: 'Principal', value: amount },
    { name: 'Interest', value: result.totalInterest },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Loan Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="term">Loan Term (Years)</Label>
              <Input
                id="term"
                type="number"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Estimated Monthly Payment</h2>
          <div className="text-4xl font-bold text-blue-700">
            {formatCurrency(result.monthlyPayment)}
          </div>
           <div className="mt-2 text-sm text-blue-800">
            Total Interest: {formatCurrency(result.totalInterest)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[300px] min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4 text-center">Total Cost Breakdown</h3>
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ClientOnlyChart>
        </div>
      </div>
    </div>
  );
}
