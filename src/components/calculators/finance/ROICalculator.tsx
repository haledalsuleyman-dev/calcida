
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateROI } from '@/lib/calculators/finance';

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);

  const roi = useMemo(() => calculateROI(initialInvestment, finalValue), [initialInvestment, finalValue]);
  const netProfit = finalValue - initialInvestment;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="initialInvestment">Initial Cost of Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="finalValue">Final Value of Investment ($)</Label>
              <Input
                id="finalValue"
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Your Return on Investment</h2>
          <div className={`text-6xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {roi.toFixed(2)}%
          </div>
          <div className="mt-4 text-lg font-medium text-blue-800">
            Net Profit: {formatCurrency(netProfit)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">ROI Calculation Breakdown</h3>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Final Value:</span>
              <span className="font-bold text-gray-900">{formatCurrency(finalValue)}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Initial Cost:</span>
              <span className="font-bold text-gray-900">{formatCurrency(initialInvestment)}</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 rounded-md">
              <span className="text-blue-900 font-bold">ROI Percentage:</span>
              <span className={`font-bold ${roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {roi.toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Formula: ROI = ((Final Value - Initial Cost) / Initial Cost) x 100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
