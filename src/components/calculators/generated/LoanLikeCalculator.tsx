"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan } from '@/lib/calculators/loan';
import { nn } from '@/components/calculators/generated/utils';

export function LoanLikeCalculator({ heading }: { heading: string }) {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);

  const result = useMemo(
    () => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(interestRate), loanTermYears: nn(termYears) }),
    [loanAmount, interestRate, termYears]
  );
  const first = result.amortizationSchedule[0];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">{heading}</h3>
          <div className="space-y-6">
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Loan Amount ($)</Label>
              <Input 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Interest Rate (APR %)</Label>
              <Input 
                type="number" 
                step="0.01" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className="group">
              <Label className="text-gray-900 font-bold mb-2 block group-focus-within:text-blue-600 transition-colors">Loan Term (Years)</Label>
              <Input 
                type="number" 
                value={termYears} 
                onChange={(e) => setTermYears(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl text-center shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-lg font-bold text-blue-100 mb-2 relative z-10">Estimated Monthly Payment</h2>
          <div className="text-6xl md:text-7xl font-black text-white tracking-tighter relative z-10 mb-8 animate-in zoom-in-95 duration-500">
            {formatCurrency(result.monthlyPayment)}
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="block text-[10px] uppercase tracking-widest font-black text-blue-200 mb-1">Total Interest</span>
              <span className="text-xl md:text-2xl font-black text-white">{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="block text-[10px] uppercase tracking-widest font-black text-blue-200 mb-1">Total Cost</span>
              <span className="text-xl md:text-2xl font-black text-white">{formatCurrency(result.totalPayment)}</span>
            </div>
          </div>
        </div>

        {first && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8 text-center">First Payment Breakdown</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 bg-gray-50 rounded-2xl text-center border border-transparent hover:border-blue-100 transition-colors group">
                <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Payment</div>
                <div className="text-2xl font-black text-gray-900 tracking-tight">{formatCurrency(first.payment)}</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl text-center border border-transparent hover:border-red-100 transition-colors group">
                <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2 group-hover:text-red-400 transition-colors">Interest</div>
                <div className="text-2xl font-black text-red-600 tracking-tight">{formatCurrency(first.interest)}</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl text-center border border-transparent hover:border-green-100 transition-colors group">
                <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2 group-hover:text-green-400 transition-colors">Principal</div>
                <div className="text-2xl font-black text-green-600 tracking-tight">{formatCurrency(first.principal)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

