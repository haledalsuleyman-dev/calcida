
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateBudget } from '@/lib/calculators/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function BudgetCalculator() {
  const [netIncome, setNetIncome] = useState(5000);

  const budget = useMemo(() => calculateBudget(netIncome), [netIncome]);

  const chartData = [
    { name: 'Needs (50%)', value: budget.needs, fill: '#3b82f6' },
    { name: 'Wants (30%)', value: budget.wants, fill: '#ec4899' },
    { name: 'Savings/Debt (20%)', value: budget.savings, fill: '#10b981' }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="netIncome">Monthly Net Income ($)</Label>
              <Input
                id="netIncome"
                type="number"
                value={netIncome}
                onChange={(e) => setNetIncome(Number(e.target.value))}
              />
              <p className="text-xs text-gray-500 mt-2">Use your actual take-home pay after taxes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">50/30/20 Rule Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-md border border-blue-200">
              <span className="block text-sm text-gray-600 font-medium">Needs (50%)</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(budget.needs)}</span>
            </div>
            <div className="bg-white p-4 rounded-md border border-pink-200">
              <span className="block text-sm text-gray-600 font-medium">Wants (30%)</span>
              <span className="text-2xl font-bold text-pink-600">{formatCurrency(budget.wants)}</span>
            </div>
            <div className="bg-white p-4 rounded-md border border-green-200">
              <span className="block text-sm text-gray-600 font-medium">Savings/Debt (20%)</span>
              <span className="text-2xl font-bold text-green-600">{formatCurrency(budget.savings)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[350px] min-h-[350px]">
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </ClientOnlyChart>
        </div>
      </div>
    </div>
  );
}
