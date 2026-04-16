"use client";

import React, { useMemo, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const MortgagePieChart = dynamic(() => import('./MortgagePieChart'), { 
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-full border border-dashed border-gray-200 text-gray-400 text-xs">Loading Chart...</div>
});
import { en } from '@/lib/dictionaries/en';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { calculateMortgage, MortgagePaymentResult } from '@/lib/calculators/mortgage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { StickyResultBar } from '@/components/calculators/StickyResultBar';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface MortgageCalculatorProps {
  showExtraPayment?: boolean;
  showBiWeekly?: boolean;
  defaultValues?: {
    homePrice?: number;
    downPayment?: number;
    extraPayment?: number;
    paymentFrequency?: 'monthly' | 'biweekly';
  };
}

export function MortgageCalculator({ showExtraPayment, showBiWeekly, defaultValues }: MortgageCalculatorProps) {
  // New State for Home Price & Down Payment
  const initialHomePrice = defaultValues?.homePrice ?? 400000;
  const initialDownPayment = defaultValues?.downPayment ?? 80000;
  const initialDownPaymentPercent = initialHomePrice > 0 ? (initialDownPayment / initialHomePrice) * 100 : 20;

  const dict = en;

  const [homePrice, setHomePrice] = useState(initialHomePrice);
  const [downPayment, setDownPayment] = useState(initialDownPayment);
  const [downPaymentMode, setDownPaymentMode] = useState<'amount' | 'percent'>('amount');
  const [downPaymentPercent, setDownPaymentPercent] = useState(initialDownPaymentPercent);

  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  
  // Property Tax (Amount or Percent)
  const [propertyTax, setPropertyTax] = useState(4800);
  const [propertyTaxMode, setPropertyTaxMode] = useState<'amount' | 'percent'>('amount');
  const [propertyTaxPercent, setPropertyTaxPercent] = useState(1.2);

  const [insuranceYearly, setInsuranceYearly] = useState(1200);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  
  // Extra Payment (Optional)
  const [extraPayment, setExtraPayment] = useState(defaultValues?.extraPayment || 0);
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'biweekly'>(defaultValues?.paymentFrequency || 'monthly');

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
      propertyTaxYearly: propertyTax,
      insuranceYearly,
      hoaMonthly,
      paymentFrequency,
      extraPayment,
    });
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTax,
    insuranceYearly,
    hoaMonthly,
    paymentFrequency,
    extraPayment,
  ]);

  const handleDownloadCSV = () => {
    if (!result) return;
    const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance'];
    const rows = result.amortizationSchedule.map(row => [
      row.month,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
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
    link.setAttribute('download', 'mortgage_amortization.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!result) return null;

  const chartData = [
    { name: 'Principal & Interest', value: result.monthlyPrincipalAndInterest },
    { name: 'Property Tax', value: result.monthlyPropertyTax },
    { name: 'Home Insurance', value: result.monthlyInsurance },
    { name: 'HOA', value: result.monthlyHOA },
  ].filter((item) => item.value > 0);

  const totalInterest = result.totalInterest;
  const hasSavings = result.savings > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            
            {/* Home Price */}
            <div>
              <Label htmlFor="homePrice">{dict.mortgage.homePrice} ($)</Label>
              <Input
                id="homePrice"
                type="number"
                min={0}
                placeholder={dict.mortgage.homePricePlaceholder}
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

                  if (propertyTaxMode === 'percent') {
                    setPropertyTax(Math.round(val * (propertyTaxPercent / 100)));
                  } else if (val > 0) {
                    setPropertyTaxPercent(parseFloat(((propertyTax / val) * 100).toFixed(2)));
                  } else {
                    setPropertyTaxPercent(0);
                  }
                }}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Enter purchase price before closing costs.</p>
            </div>

            {/* Down Payment */}
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
                        {dict.mortgage.amount}
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
                        {dict.mortgage.percent}
                    </button>
                </div>
              </div>
              <Input
                id="downPayment"
                type="number"
                min={0}
                placeholder={downPaymentMode === 'amount' ? 'e.g., 80000' : 'e.g., 20'}
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
              <p className="text-xs text-gray-500 mt-1">{dict.mortgage.downPaymentHelper}</p>
            </div>

            {/* Loan Term */}
            <div>
              <Label htmlFor="loanTermYears">{dict.mortgage.loanTerm}</Label>
              <Select value={String(loanTermYears)} onValueChange={(v) => setLoanTermYears(Number(v))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 {dict.mortgage.years}</SelectItem>
                  <SelectItem value="20">20 {dict.mortgage.years}</SelectItem>
                  <SelectItem value="15">15 {dict.mortgage.years}</SelectItem>
                  <SelectItem value="10">10 {dict.mortgage.years}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">{dict.mortgage.loanTermHelper}</p>
            </div>

            {/* Interest Rate */}
            <div>
              <Label htmlFor="interestRate">{dict.mortgage.interestRate}</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                min={0}
                placeholder="e.g., 6.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                className="mt-1"
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
                <h4 className="font-medium mb-3 text-sm text-gray-500 uppercase tracking-wide">{dict.mortgage.taxesAndFees}</h4>
                
                {/* Property Tax */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="propertyTax">{dict.mortgage.propertyTax}</Label>
                    <div className="flex text-xs border rounded overflow-hidden">
                        <button 
                            onClick={() => {
                              setPropertyTaxMode('amount');
                              setPropertyTax(Math.round(homePrice * (propertyTaxPercent / 100)));
                            }}
                            className={`px-2 py-1 ${propertyTaxMode === 'amount' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {dict.mortgage.amount}
                        </button>
                        <button 
                            onClick={() => {
                              setPropertyTaxMode('percent');
                              if (homePrice > 0) {
                                setPropertyTaxPercent(parseFloat(((propertyTax / homePrice) * 100).toFixed(2)));
                              } else {
                                setPropertyTaxPercent(0);
                              }
                            }}
                            className={`px-2 py-1 ${propertyTaxMode === 'percent' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {dict.mortgage.percent}
                        </button>
                    </div>
                  </div>
                  <Input
                    id="propertyTax"
                    type="number"
                    min={0}
                    placeholder={propertyTaxMode === 'amount' ? 'e.g., 4800' : 'e.g., 1.2'}
                    value={propertyTaxMode === 'amount' ? propertyTax : propertyTaxPercent}
                    onChange={(e) => {
                        const val = Math.max(0, Number(e.target.value));
                        if (propertyTaxMode === 'amount') {
                            setPropertyTax(val);
                            if (homePrice > 0) {
                              setPropertyTaxPercent(parseFloat(((val / homePrice) * 100).toFixed(2)));
                            } else {
                              setPropertyTaxPercent(0);
                            }
                        } else {
                            setPropertyTaxPercent(val);
                            setPropertyTax(Math.round(homePrice * (val / 100)));
                        }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">{dict.mortgage.propertyTaxHelper}</p>
                </div>

                {/* Home Insurance */}
                <div className="mb-4">
                    <Label htmlFor="insuranceYearly">{dict.mortgage.homeInsurance} ($)</Label>
                    <Input
                        id="insuranceYearly"
                        type="number"
                        min={0}
                        placeholder="e.g., 1200"
                        value={insuranceYearly}
                        onChange={(e) => setInsuranceYearly(Math.max(0, Number(e.target.value)))}
                        className="mt-1"
                    />
                </div>

                {/* HOA */}
                <div>
                    <Label htmlFor="hoaMonthly">{dict.mortgage.hoaFees} ($)</Label>
                    <Input
                        id="hoaMonthly"
                        type="number"
                        min={0}
                        placeholder="e.g., 0"
                        value={hoaMonthly}
                        onChange={(e) => setHoaMonthly(Math.max(0, Number(e.target.value)))}
                        className="mt-1"
                    />
                </div>
            </div>

            {/* Optional Extra Payment Inputs */}
            {(showExtraPayment || extraPayment > 0) && (
                 <div className="pt-4 border-t border-gray-100">
                  <Label htmlFor="extraPayment">{dict.mortgage.extraPayment} ($)</Label>
                  <Input
                    id="extraPayment"
                    type="number"
                    min={0}
                    placeholder="e.g., 100"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value)))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">{dict.mortgage.extraPaymentHelper}</p>
                </div>
            )}

            {(showBiWeekly || paymentFrequency === 'biweekly') && (
                 <div className="pt-4 border-t border-gray-100">
                  <Label htmlFor="paymentFrequency">{dict.mortgage.paymentFrequency}</Label>
                  <Select value={paymentFrequency} onValueChange={(v) => setPaymentFrequency(v as 'monthly' | 'biweekly')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">{dict.mortgage.monthly}</SelectItem>
                      <SelectItem value="biweekly">{dict.mortgage.biweekly}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">{dict.mortgage.biweeklyHelper}</p>
                </div>
            )}

          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Primary Result Card */}
        <div ref={resultCardRef} className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl text-center shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-lg font-bold text-blue-100 mb-2 relative z-10">
            {paymentFrequency === 'biweekly' ? dict.mortgage.results.biweeklyPayment : dict.mortgage.results.monthlyPayment}
          </h2>
          <div className="text-6xl md:text-7xl font-black text-white tracking-tighter relative z-10 mb-8 animate-in zoom-in-95 duration-500">
            {paymentFrequency === 'biweekly' && result.biWeeklyPayment 
                ? formatCurrency(result.biWeeklyPayment) 
                : formatCurrency(result.totalMonthlyPayment)}
          </div>
          
          {/* Comparison for Bi-Weekly */}
          {paymentFrequency === 'biweekly' && (
              <div className="mb-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 text-white relative z-10">
                  <span className="font-bold opacity-70 uppercase tracking-widest text-xs block mb-1">{dict.mortgage.results.standardMonthly}</span>
                  <span className="text-xl font-black">{formatCurrency(result.totalMonthlyPayment)}</span>
              </div>
          )}

          {hasSavings && (
              <div className="mb-8 p-6 bg-white rounded-2xl text-left relative z-10 shadow-xl">
                  <div className="text-green-600 font-black text-xl mb-1 flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {dict.mortgage.results.save.replace('{amount}', formatCurrency(result.savings))}
                  </div>
                  <div className="text-gray-600 leading-relaxed pl-10 capitalize font-medium">
                      {dict.mortgage.results.payoffSummary
                        .replace('{years}', Math.floor(result.payoffMonths / 12).toString())
                        .replace('{months}', (result.payoffMonths % 12).toString())}
                  </div>
              </div>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
             <Button 
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 px-10 h-14 rounded-2xl font-black uppercase tracking-widest active:scale-95 shadow-xl shadow-black/10"
                onClick={() => {
                    const text = paymentFrequency === 'biweekly' 
                        ? `My estimated bi-weekly mortgage payment is ${formatCurrency(result.biWeeklyPayment || 0)}`
                        : `My estimated monthly mortgage payment is ${formatCurrency(result.totalMonthlyPayment)}`;
                    navigator.clipboard.writeText(text);
                    alert(dict.common.copied);
                }}
             >
               {dict.mortgage.results.share}
             </Button>
             <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 h-14 rounded-2xl font-black uppercase tracking-widest active:scale-95"
                onClick={handleDownloadCSV}
             >
               {dict.mortgage.results.download}
             </Button>
          </div>
        </div>

        {/* Visual Breakdown */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">{dict.mortgage.results.breakdown}</h3>
                <div className="h-[250px] min-h-[250px]">
                    <ClientOnlyChart className="h-full">
                        <MortgagePieChart data={chartData} />
                    </ClientOnlyChart>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  {dict.mortgage.results.detailedCosts.replace('{mode}', paymentFrequency === 'biweekly' ? 'Monthly Avg' : 'Monthly')}
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            {dict.mortgage.results.principalInterest}
                        </span>
                        <span className="font-medium">{formatCurrency(result.monthlyPrincipalAndInterest)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            {dict.mortgage.propertyTax.split('/')[0]}
                        </span>
                        <span className="font-medium">{formatCurrency(result.monthlyPropertyTax)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            {dict.mortgage.homeInsurance.split('/')[0]}
                        </span>
                        <span className="font-medium">{formatCurrency(result.monthlyInsurance)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            {dict.mortgage.hoaFees.split('/')[0]}
                        </span>
                        <span className="font-medium">{formatCurrency(result.monthlyHOA)}</span>
                    </div>
                    <div className="flex justify-between pt-2 font-bold text-lg mt-4">
                        <span>{dict.mortgage.results.totalMonthly}</span>
                        <span>{formatCurrency(result.totalMonthlyPayment)}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Key Insights Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                {dict.mortgage.insights.title}
            </h3>
            <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        {dict.mortgage.insights.totalInterest
                            .replace('{years}', loanTermYears.toString())
                            .replace('{amount}', formatCurrency(totalInterest))}
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        {dict.mortgage.insights.ltv.replace('{percent}', ((homePrice - downPayment) / homePrice * 100).toFixed(1))} 
                        {((homePrice - downPayment) / homePrice * 100) > 80 ? ` ${dict.mortgage.insights.pmiWarning}` : ` ${dict.mortgage.insights.pmiSuccess}`}
                    </span>
                </li>
                {paymentFrequency === 'biweekly' && hasSavings ? (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            {dict.mortgage.insights.biweeklyInsight}
                        </span>
                    </li>
                ) : (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            {dict.mortgage.insights.downPaymentImpact.replace('{amount}', formatCurrency(calculateMortgage({ loanAmount: 10000, interestRate, loanTermYears }).monthlyPrincipalAndInterest))}
                        </span>
                    </li>
                )}
            </ul>
        </div>

      </div>
      
      {/* StickyResultBar */}
      {result && (
        <StickyResultBar
          label={paymentFrequency === 'biweekly' ? dict.mortgage.sticky.biweekly : dict.mortgage.sticky.monthly}
          value={paymentFrequency === 'biweekly' ? (result.biWeeklyPayment || 0) : result.totalMonthlyPayment}
          secondaryLabel={paymentFrequency === 'biweekly' ? dict.mortgage.sticky.standard : undefined}
          secondaryValue={paymentFrequency === 'biweekly' ? result.totalMonthlyPayment : undefined}
          triggerRef={resultCardRef}
          onCopy={() => {
            if (paymentFrequency === 'biweekly') {
                 const text = `Loan Amount: ${formatCurrency(homePrice - downPayment)}\nRate: ${interestRate}%\nTerm: ${loanTermYears} years\nBi-Weekly Payment: ${formatCurrency(result.biWeeklyPayment || 0)}\nStandard Monthly: ${formatCurrency(result.totalMonthlyPayment)}\nInterest Saved: ${formatCurrency(result.savings)}\nTime Saved: ${Math.floor(result.payoffMonths / 12)} years ${result.payoffMonths % 12} months`;
                 navigator.clipboard.writeText(text);
                 alert(dict.common.copied);
            } else {
                 const text = `My estimated monthly mortgage payment is ${formatCurrency(result.totalMonthlyPayment)}`;
                 navigator.clipboard.writeText(text);
                 alert(dict.common.copied);
            }
          }}
        />
      )}
    </div>
  );
}
