
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

export function SavingsCalculator() {
  const [principal, setPrincipal] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualRate, setAnnualRate] = useState(4.5);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    return calculateCompoundInterest(
      principal,
      monthlyContribution,
      annualRate,
      years
    );
  }, [principal, monthlyContribution, annualRate, years]);

  const chartData = useMemo(() => {
    return result.schedule.map((s) => ({
      year: s.period,
      balance: s.balance,
      principal: principal + (monthlyContribution * 12 * s.period),
      interest: s.totalInterest,
    }));
  }, [result, principal, monthlyContribution]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Initial Savings Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Monthly Deposit ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="years">Savings Duration (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
            <h2 className="text-sm font-semibold text-blue-900 mb-1 uppercase tracking-wider">Final Savings</h2>
            <div className="text-3xl font-bold text-blue-700">
              {formatCurrency(result.finalBalance)}
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
            <h2 className="text-sm font-semibold text-green-900 mb-1 uppercase tracking-wider">Total Deposited</h2>
            <div className="text-3xl font-bold text-green-700">
              {formatCurrency(result.totalPrincipal)}
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 text-center">
            <h2 className="text-sm font-semibold text-purple-900 mb-1 uppercase tracking-wider">Total Interest Earned</h2>
            <div className="text-3xl font-bold text-purple-700">
              {formatCurrency(result.totalInterest)}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[400px] min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-center">Savings Growth Over Time</h3>
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(v) => `Year ${v}`} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Total Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ClientOnlyChart>
        </div>
      </div>
    </div>
  );
}
