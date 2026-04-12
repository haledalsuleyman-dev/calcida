
"use client";
import React, { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateCompoundInterest } from '@/lib/calculators/finance';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function GeneralRetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);

  const years = retirementAge - currentAge;

  const result = useMemo(() => {
    return calculateCompoundInterest(
      currentSavings,
      monthlyContribution,
      annualReturn,
      years > 0 ? years : 0
    );
  }, [currentSavings, monthlyContribution, annualReturn, years]);

  const chartData = useMemo(() => {
    return result.schedule.map((s) => ({
      age: currentAge + s.period,
      balance: s.balance,
      principal: currentSavings + (monthlyContribution * 12 * s.period),
    }));
  }, [result, currentAge, currentSavings, monthlyContribution]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="retirementAge">Retirement Age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currentSavings">Current Retirement Savings ($)</Label>
              <Input
                id="currentSavings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <Input
                id="annualReturn"
                type="number"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Estimated Balance at Retirement</h2>
          <div className="text-4xl font-bold text-blue-700">
            {formatCurrency(result.finalBalance)}
          </div>
          <div className="mt-2 text-sm text-blue-800">
            In {years} years at age {retirementAge}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[400px] min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-center">Retirement Fund Projection</h3>
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="age" />
                <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(v) => `Age ${v}`} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Retirement Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ClientOnlyChart>
        </div>
      </div>
    </div>
  );
}
