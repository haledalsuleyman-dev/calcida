
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateInflation } from '@/lib/calculators/finance';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function InflationCalculator() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(10);

  const finalAmount = useMemo(() => calculateInflation(amount, rate, years), [amount, rate, years]);

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= years; i++) {
      data.push({
        year: i,
        value: Math.round(calculateInflation(amount, rate, i)),
      });
    }
    return data;
  }, [amount, rate, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Starting Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="rate">Annual Inflation Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="years">Years into the Future</Label>
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
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Future Buying Power</h2>
          <div className="text-4xl font-bold text-blue-700">
            {formatCurrency(finalAmount)}
          </div>
          <p className="mt-4 text-sm text-blue-800 leading-relaxed">
            In {years} years, with {rate}% annual inflation, you would need {formatCurrency(finalAmount)} to buy what costs {formatCurrency(amount)} today.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[350px] min-h-[350px]">
          <h3 className="text-lg font-semibold mb-4 text-center">Cost Increase Over Time</h3>
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(v) => `Year ${v}`} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ClientOnlyChart>
        </div>
      </div>
    </div>
  );
}
