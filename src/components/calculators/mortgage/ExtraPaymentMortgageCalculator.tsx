"use client";

import React, { useMemo, useState, useRef } from 'react';
import {
  AreaChart,
  Area,
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
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';
import { StickyResultBar } from '@/components/calculators/StickyResultBar';
import { calculateMortgage, MortgagePaymentResult } from '@/lib/calculators/mortgage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export function ExtraPaymentMortgageCalculator() {
  // Base Mortgage Inputs
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPaymentMode, setDownPaymentMode] = useState<'amount' | 'percent'>('amount');
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  
  // Extra Payment Inputs
  const [extraMonthly, setExtraMonthly] = useState(200);
  const [extraYearly, setExtraYearly] = useState(0);
  const [extraOneTime, setExtraOneTime] = useState(0);
  const [extraOneTimeStartMonth, setExtraOneTimeStartMonth] = useState(1);

  const resultCardRef = useRef<HTMLDivElement | null>(null);

  const result = useMemo<MortgagePaymentResult | null>(() => {
    const loanAmount = homePrice - downPayment;
    
    if (loanAmount <= 0) {
      return null;
    }

    return calculateMortgage({
      loanAmount,
      interestRate,
      loanTermYears,
      extraMonthly,
      extraYearly,
      extraOneTime,
      extraOneTimeStartMonth,
    });
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTermYears,
    extraMonthly,
    extraYearly,
    extraOneTime,
    extraOneTimeStartMonth,
  ]);

  const handleDownloadCSV = () => {
    if (!result) return;
    const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Extra Principal', 'Remaining Balance'];
    const rows = result.amortizationSchedule.map(row => [
      row.month,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.extraPrincipal.toFixed(2),
      row.remainingBalance.toFixed(2),
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'mortgage_extra_payments.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!result) return null;

  // Chart Data: Compare Balance Over Time (Baseline vs Extra)
  // We need to reconstruct baseline balance since result only returns "with extra" schedule
  // However, we can approximate or re-run calculation. 
  // For efficiency, we will assume standard amortization curve for baseline.
  
  // Create chart data points (every 12 months to keep chart light)
  const chartData = result.amortizationSchedule
    .filter((row) => row.month % 12 === 0 || row.month === 1 || row.remainingBalance === 0)
    .map((row) => {
        // Calculate theoretical baseline balance for this month
        // B = P(1+r)^n - (M((1+r)^n - 1))/r
        // For simplicity in visualization, we can just use a simple linear approximation or just show "With Extra"
        // Better: Calculate exact baseline balance for visualization
        const r = interestRate / 100 / 12;
        const P = homePrice - downPayment;
        const n = row.month;
        const M = result.monthlyPrincipalAndInterest;
        let baselineBalance = 0;
        if (interestRate === 0) {
            baselineBalance = P - (M * n);
        } else {
            baselineBalance = (P * Math.pow(1 + r, n)) - (M * (Math.pow(1 + r, n) - 1)) / r;
        }
        
        return {
            month: row.month,
            year: Math.floor(row.month / 12),
            "Balance (Standard)": Math.max(0, baselineBalance),
            "Balance (With Extra)": row.remainingBalance,
        };
    });

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Loan Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="homePrice">Home Price ($)</Label>
              <Input
                id="homePrice"
                type="number"
                value={homePrice}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value));
                  setHomePrice(val);
                  if (downPaymentMode === 'percent') {
                    setDownPayment(Math.round(val * (downPaymentPercent / 100)));
                  } else if (val > 0) {
                    setDownPaymentPercent(parseFloat(((downPayment / val) * 100).toFixed(2)));
                  } else {
                    setDownPaymentPercent(0);
                  }
                }}
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="downPayment">Down Payment</Label>
                <div className="flex text-xs border rounded overflow-hidden">
                    <button 
                        onClick={() => {
                          setDownPaymentMode('amount');
                          setDownPayment(Math.round(homePrice * (downPaymentPercent / 100)));
                        }}
                        className={`px-2 py-1 ${downPaymentMode === 'amount' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                        Amount
                    </button>
                    <button 
                        onClick={() => {
                          setDownPaymentMode('percent');
                          if (homePrice > 0) {
                            setDownPaymentPercent(parseFloat(((downPayment / homePrice) * 100).toFixed(2)));
                          } else {
                            setDownPaymentPercent(0);
                          }
                        }}
                        className={`px-2 py-1 ${downPaymentMode === 'percent' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                        Percent
                    </button>
                </div>
              </div>
              <Input
                id="downPayment"
                type="number"
                value={downPaymentMode === 'amount' ? downPayment : downPaymentPercent}
                onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    if (downPaymentMode === 'amount') {
                        setDownPayment(val);
                        if (homePrice > 0) {
                          setDownPaymentPercent(parseFloat(((val / homePrice) * 100).toFixed(2)));
                        } else {
                          setDownPaymentPercent(0);
                        }
                    } else {
                        setDownPaymentPercent(val);
                        setDownPayment(Math.round(homePrice * (val / 100)));
                    }
                }}
              />
            </div>

            <div>
              <Label htmlFor="loanTermYears">Loan Term (Years)</Label>
              <Select value={String(loanTermYears)} onValueChange={(v) => setLoanTermYears(Number(v))}>
                <SelectTrigger className="mt-1">
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
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Extra Payments</h3>
          <div className="space-y-4">
             <div>
              <Label htmlFor="extraMonthly">Extra Monthly ($)</Label>
              <Input
                id="extraMonthly"
                type="number"
                min={0}
                placeholder="e.g., 200"
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(Math.max(0, Number(e.target.value)))}
                className="mt-1 bg-green-50 border-green-200 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">Early extra payments reduce interest the most.</p>
            </div>
            
            <div>
              <Label htmlFor="extraYearly">Extra Annual ($)</Label>
              <Input
                id="extraYearly"
                type="number"
                min={0}
                placeholder="e.g., 1000"
                value={extraYearly}
                onChange={(e) => setExtraYearly(Math.max(0, Number(e.target.value)))}
                className="mt-1 bg-green-50 border-green-200 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">Applied at end of each year</p>
            </div>

            <div>
              <Label htmlFor="extraOneTime">One-Time Payment ($)</Label>
              <Input
                id="extraOneTime"
                type="number"
                min={0}
                placeholder="e.g., 5000"
                value={extraOneTime}
                onChange={(e) => setExtraOneTime(Math.max(0, Number(e.target.value)))}
                className="mt-1 bg-green-50 border-green-200 focus:ring-green-500"
              />
            </div>
            
            {extraOneTime > 0 && (
                <div>
                <Label htmlFor="extraOneTimeStartMonth">Apply One-Time Payment at Month</Label>
                <Input
                    id="extraOneTimeStartMonth"
                    type="number"
                    min={1}
                    value={extraOneTimeStartMonth}
                    onChange={(e) => setExtraOneTimeStartMonth(Number(e.target.value))}
                    className="mt-1"
                />
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Primary Result Card */}
        <div ref={resultCardRef} className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-6 rounded-lg border border-green-200 text-center">
                <div className="text-green-800 font-medium mb-1">Interest Saved</div>
                <div className="text-3xl font-bold text-green-900">
                    {formatCurrency(result.interestSaved)}
                </div>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg border border-blue-200 text-center">
                <div className="text-blue-800 font-medium mb-1">Time Saved</div>
                <div className="text-3xl font-bold text-blue-900">
                    {Math.floor(result.timeSavedMonths / 12)}y {result.timeSavedMonths % 12}m
                </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 text-center">
                <div className="text-gray-700 font-medium mb-1">New Payoff Date</div>
                <div className="text-3xl font-bold text-gray-900">
                    {new Date().getFullYear() + Math.floor(result.payoffMonthsWithExtra / 12)}
                </div>
            </div>
        </div>

        {/* Visual Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Balance Payoff Comparison</h3>
            <div className="h-[300px] min-h-[300px]">
                <ClientOnlyChart className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Area type="monotone" dataKey="Balance (Standard)" stackId="1" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.5} />
                    <Area type="monotone" dataKey="Balance (With Extra)" stackId="2" stroke="#10b981" fill="#86efac" fillOpacity={0.6} />
                </AreaChart>
                </ResponsiveContainer>
                </ClientOnlyChart>
            </div>
        </div>

        {/* Key Insights Section */}
        {(result.interestSaved > 0 || result.timeSavedMonths > 0) && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Key Insights
                </h3>
                <ul className="space-y-3 text-gray-700">
                    {result.interestSaved > 0 && (
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                            <span>
                                By paying extra, you will save <strong>{formatCurrency(result.interestSaved)}</strong> in total interest.
                            </span>
                        </li>
                    )}
                    {result.timeSavedMonths > 0 && (
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                            <span>
                                Your loan term will be shortened by <strong>{Math.floor(result.timeSavedMonths / 12)} years and {result.timeSavedMonths % 12} months</strong>.
                            </span>
                        </li>
                    )}
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            New Total Interest Cost: <strong>{formatCurrency(result.totalInterestWithExtra)}</strong> (Original: {formatCurrency(result.totalInterest)})
                        </span>
                    </li>
                </ul>
            </div>
        )}
        
        <div className="flex justify-center gap-4">
             <Button 
                size="lg"
                onClick={() => {
                    navigator.clipboard.writeText(`By paying extra, I can save ${formatCurrency(result.interestSaved)} and pay off my mortgage ${Math.floor(result.timeSavedMonths / 12)} years earlier!`);
                    alert("Result copied to clipboard!");
                }}
             >
               Copy & Share
             </Button>
             <Button variant="outline" size="lg" onClick={handleDownloadCSV}>
               Download Full Schedule (CSV)
             </Button>
        </div>

      </div>

      {result && (
        <StickyResultBar
          label="New Payoff Date"
          value={new Date(new Date().setMonth(new Date().getMonth() + result.payoffMonthsWithExtra)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          secondaryLabel="Interest Saved"
          secondaryValue={result.interestSaved}
          triggerRef={resultCardRef}
          onCopy={() => {
            const payoffDate = new Date(new Date().setMonth(new Date().getMonth() + result.payoffMonthsWithExtra)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            const text = `Extra Payments: Monthly ${formatCurrency(extraMonthly)} | Annual ${formatCurrency(extraYearly)} | One-Time ${formatCurrency(extraOneTime)}\nNew Payoff Date: ${payoffDate}\nInterest Saved: ${formatCurrency(result.interestSaved)}\nTime Saved: ${Math.floor(result.timeSavedMonths / 12)} years ${result.timeSavedMonths % 12} months`;
            navigator.clipboard.writeText(text);
            alert("Copied summary to clipboard!");
          }}
        />
      )}
    </div>
  );
}
