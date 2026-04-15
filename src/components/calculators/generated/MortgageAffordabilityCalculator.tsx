"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { inverseAmortizedPrincipal, nn } from '@/components/calculators/generated/utils';

export function MortgageAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(800);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const maxHousingPayment = useMemo(() => {
    const incomeMonthly = nn(annualIncome) / 12;
    const frontEnd = incomeMonthly * 0.28;
    const backEnd = incomeMonthly * 0.36 - nn(monthlyDebts);
    return Math.max(0, Math.min(frontEnd, backEnd));
  }, [annualIncome, monthlyDebts]);

  const maxLoanAmount = useMemo(
    () => inverseAmortizedPrincipal(maxHousingPayment, nn(interestRate), nn(termYears)),
    [maxHousingPayment, interestRate, termYears]
  );
  const maxHomePrice = maxLoanAmount + nn(downPayment);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Income & Debts</h3>
          <div className="space-y-6">
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Annual Income ($)</Label>
              <Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} />
            </div>
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Monthly Debt Payments ($)</Label>
              <Input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} />
            </div>
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Down Payment ($)</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Loan Assumptions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Rate (%)</Label>
              <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Term (Y)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl text-center shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-lg font-bold text-blue-100 mb-2 relative z-10">Estimated Max Home Price</h2>
          <div className="text-6xl md:text-7xl font-black text-white tracking-tighter relative z-10 mb-8 animate-in zoom-in-95 duration-500">
            {formatCurrency(maxHomePrice)}
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="block text-[10px] uppercase tracking-widest font-black text-blue-200 mb-1">Max Housing Payment</span>
              <span className="text-xl md:text-2xl font-black text-white">{formatCurrency(maxHousingPayment)}</span>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="block text-[10px] uppercase tracking-widest font-black text-blue-200 mb-1">Loan Amount</span>
              <span className="text-xl md:text-2xl font-black text-white">{formatCurrency(maxLoanAmount)}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm text-gray-500 leading-relaxed italic flex items-start gap-4">
            <svg className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            This estimate uses a common 28/36 guideline and does not include taxes, insurance, HOA, or PMI. Lenders may qualify borrowers differently.
        </div>
      </div>
    </div>
  );
}

