"use client";

import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { calculateRefinance, RefinanceResult } from '@/lib/calculators/refinance';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export function RefinanceCalculator() {
  // Current Loan State
  const [currentBalance, setCurrentBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [remainingTerm, setRemainingTerm] = useState(25);

  // New Loan State
  const [newRate, setNewRate] = useState(5.5);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(5000);
  const [cashOut, setCashOut] = useState(0);

  const result = useMemo<RefinanceResult | null>(() => {
    if (currentBalance <= 0) return null;
    return calculateRefinance({
      currentLoanBalance: currentBalance,
      currentInterestRate: currentRate,
      remainingLoanTermYears: remainingTerm,
      newInterestRate: newRate,
      newLoanTermYears: newTerm,
      closingCosts,
      cashOutAmount: cashOut,
    });
  }, [currentBalance, currentRate, remainingTerm, newRate, newTerm, closingCosts, cashOut]);

  if (!result) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Current Loan</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentBalance">Remaining Balance ($)</Label>
              <Input
                id="currentBalance"
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="currentRate">Interest Rate (%)</Label>
              <Input
                id="currentRate"
                type="number"
                step="0.1"
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="remainingTerm">Remaining Term (Years)</Label>
              <Input
                id="remainingTerm"
                type="number"
                value={remainingTerm}
                onChange={(e) => setRemainingTerm(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">New Refinance Loan</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newRate">New Interest Rate (%)</Label>
              <Input
                id="newRate"
                type="number"
                step="0.1"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="mt-1 bg-blue-50 border-blue-200 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="newTerm">New Term (Years)</Label>
              <Select value={String(newTerm)} onValueChange={(v) => setNewTerm(Number(v))}>
                <SelectTrigger className="mt-1 bg-blue-50 border-blue-200 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="closingCosts">Closing Costs ($)</Label>
              <Input
                id="closingCosts"
                type="number"
                value={closingCosts}
                onChange={(e) => setClosingCosts(Number(e.target.value))}
                className="mt-1 bg-blue-50 border-blue-200 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="cashOut">Cash Out Amount ($)</Label>
              <Input
                id="cashOut"
                type="number"
                value={cashOut}
                onChange={(e) => setCashOut(Number(e.target.value))}
                className="mt-1 bg-blue-50 border-blue-200 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Primary Result Cards */}
        <div className="grid md:grid-cols-3 gap-4">
            <div className={`p-6 rounded-lg border text-center ${result.monthlySavings > 0 ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className={`${result.monthlySavings > 0 ? 'text-green-800' : 'text-red-800'} font-medium mb-1`}>Monthly Savings</div>
                <div className={`text-3xl font-bold ${result.monthlySavings > 0 ? 'text-green-900' : 'text-red-900'}`}>
                    {formatCurrency(Math.abs(result.monthlySavings))}
                </div>
                {result.monthlySavings < 0 && <span className="text-xs text-red-700">Payment Increase</span>}
            </div>
            <div className="bg-blue-100 p-6 rounded-lg border border-blue-200 text-center">
                <div className="text-blue-800 font-medium mb-1">Break-Even Point</div>
                <div className="text-3xl font-bold text-blue-900">
                    {result.breakEvenMonths === Infinity ? 'Never' : `${Math.floor(result.breakEvenMonths / 12)}y ${result.breakEvenMonths % 12}m`}
                </div>
            </div>
            <div className={`p-6 rounded-lg border text-center ${result.netLifetimeSavings > 0 ? 'bg-gray-100 border-gray-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="text-gray-700 font-medium mb-1">Lifetime Savings</div>
                <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(result.netLifetimeSavings)}
                </div>
            </div>
        </div>

        {/* Visual Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Total Cost Comparison Over Time</h3>
            <div className="h-[300px] min-h-[300px]">
                <ClientOnlyChart className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={result.comparisonSchedule}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="cumulativeCostOld" name="Current Loan" stroke="#94a3b8" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="cumulativeCostNew" name="Refinanced Loan" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
                </ResponsiveContainer>
                </ClientOnlyChart>
            </div>
        </div>

        {/* Key Insights Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Key Insights
            </h3>
            <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        Your new monthly payment will be <strong>{formatCurrency(result.newMonthlyPayment)}</strong> (Current: {formatCurrency(result.currentMonthlyPayment)}).
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        It will take <strong>{result.breakEvenMonths === Infinity ? 'over 30 years' : `${result.breakEvenMonths} months`}</strong> to recoup your {formatCurrency(closingCosts)} in closing costs through monthly savings.
                    </span>
                </li>
                {result.netLifetimeSavings < 0 && (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span>
                            <strong>Warning:</strong> Refinancing will cost you <strong>{formatCurrency(Math.abs(result.netLifetimeSavings))}</strong> more over the long run, likely due to extending the loan term or high closing costs.
                        </span>
                    </li>
                )}
                {result.cashOutAmount && result.cashOutAmount > 0 && (
                     <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            You are cashing out <strong>{formatCurrency(result.cashOutAmount || 0)}</strong>, which increases your new loan balance to {formatCurrency(result.newLoanAmount)}.
                        </span>
                    </li>
                )}
            </ul>
        </div>
        
        <div className="flex justify-center">
             <Button 
                size="lg"
                onClick={() => {
                    navigator.clipboard.writeText(`Refinancing could save me ${formatCurrency(result.monthlySavings)}/month and ${formatCurrency(result.netLifetimeSavings)} total!`);
                    alert("Result copied to clipboard!");
                }}
             >
               Copy Results
             </Button>
        </div>

      </div>
    </div>
  );
}
