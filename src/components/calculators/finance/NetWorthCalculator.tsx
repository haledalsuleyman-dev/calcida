
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateNetWorth } from '@/lib/calculators/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function NetWorthCalculator() {
  const [assets, setAssets] = useState({
    cash: 10000,
    investments: 50000,
    realEstate: 300000,
    other: 5000
  });
  const [liabilities, setLiabilities] = useState({
    mortgage: 200000,
    studentLoans: 20000,
    creditCards: 5000,
    other: 0
  });

  const totalAssets = useMemo(() => Object.values(assets).reduce((a, b) => a + b, 0), [assets]);
  const totalLiabilities = useMemo(() => Object.values(liabilities).reduce((a, b) => a + b, 0), [liabilities]);
  const netWorth = calculateNetWorth(totalAssets, totalLiabilities);

  const chartData = [
    { name: 'Assets', value: totalAssets, fill: '#10b981' },
    { name: 'Liabilities', value: totalLiabilities, fill: '#ef4444' }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-green-700">Assets</h3>
          <div className="space-y-4">
            {Object.keys(assets).map((key) => (
              <div key={key}>
                <Label htmlFor={`asset-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <Input
                  id={`asset-${key}`}
                  type="number"
                  value={assets[key as keyof typeof assets]}
                  onChange={(e) => setAssets({ ...assets, [key]: Number(e.target.value) })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-red-700">Liabilities</h3>
          <div className="space-y-4">
            {Object.keys(liabilities).map((key) => (
              <div key={key}>
                <Label htmlFor={`liability-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <Input
                  id={`liability-${key}`}
                  type="number"
                  value={liabilities[key as keyof typeof liabilities]}
                  onChange={(e) => setLiabilities({ ...liabilities, [key]: Number(e.target.value) })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Your Net Worth</h2>
          <div className={`text-5xl font-bold ${netWorth >= 0 ? 'text-blue-700' : 'text-red-600'}`}>
            {formatCurrency(netWorth)}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-green-700">
              <span className="block font-medium">Total Assets</span>
              <span className="font-bold">{formatCurrency(totalAssets)}</span>
            </div>
            <div className="text-red-700">
              <span className="block font-medium">Total Liabilities</span>
              <span className="font-bold">{formatCurrency(totalLiabilities)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[300px] min-h-[300px]">
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
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
