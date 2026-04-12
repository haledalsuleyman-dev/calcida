"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan } from '@/lib/calculators/loan';
import { nn, fmtPct, clamp } from '@/components/calculators/generated/utils';

export function SimpleInterestLoanCalculator() {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(2);

  const interest = nn(principal) * (nn(rate) / 100) * nn(years);
  const total = nn(principal) + interest;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Principal ($)</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (% per year)</Label>
            <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Time (Years)</Label>
            <Input type="number" step="0.1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Simple Interest</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(interest)}</div>
          <div className="mt-4 text-lg text-blue-900">Total repayment: <span className="font-bold">{formatCurrency(total)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function DtiCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(6000);
  const [monthlyDebts, setMonthlyDebts] = useState(1500);
  const dti = monthlyIncome > 0 ? (nn(monthlyDebts) / nn(monthlyIncome)) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Gross Monthly Income ($)</Label>
            <Input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
          </div>
          <div>
            <Label>Total Monthly Debt Payments ($)</Label>
            <Input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Debt-to-Income Ratio</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(dti)}</div>
          <div className="mt-4 text-sm text-blue-900">Lower is generally better for loan approvals.</div>
        </div>
      </div>
    </div>
  );
}

export function PaydayLoanCalculator() {
  const [cashNeeded, setCashNeeded] = useState(500);
  const [fee, setFee] = useState(75);
  const [days, setDays] = useState(14);

  const apr = useMemo(() => {
    const principal = nn(cashNeeded);
    const f = nn(fee);
    const d = Math.max(1, nn(days));
    if (principal === 0) return 0;
    return ((f / principal) * (365 / d)) * 100;
  }, [cashNeeded, fee, days]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Cash Needed ($)</Label>
            <Input type="number" value={cashNeeded} onChange={(e) => setCashNeeded(Number(e.target.value))} />
          </div>
          <div>
            <Label>Fee ($)</Label>
            <Input type="number" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
          </div>
          <div>
            <Label>Loan Term (Days)</Label>
            <Input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Effective APR (Estimate)</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(apr)}</div>
          <div className="mt-3 text-sm text-blue-900">Total repayment: <span className="font-semibold">{formatCurrency(nn(cashNeeded) + nn(fee))}</span></div>
        </div>
      </div>
    </div>
  );
}

export function ParentPlusLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [interestRate, setInterestRate] = useState(9.08);
  const [originationFeePct, setOriginationFeePct] = useState(4.228);
  const [termYears, setTermYears] = useState(10);

  const netLoan = nn(loanAmount) * (1 - nn(originationFeePct) / 100);
  const result = useMemo(() => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(interestRate), loanTermYears: nn(termYears) }), [loanAmount, interestRate, termYears]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Requested Loan Amount ($)</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Origination Fee (%)</Label>
            <Input type="number" step="0.001" value={originationFeePct} onChange={(e) => setOriginationFeePct(Number(e.target.value))} />
          </div>
          <div>
            <Label>Loan Term (Years)</Label>
            <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Monthly Payment</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(result.monthlyPayment)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Net Disbursement: <span className="font-bold">{formatCurrency(netLoan)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentLoanRefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(40000);
  const [currentRate, setCurrentRate] = useState(6.8);
  const [newRate, setNewRate] = useState(4.5);
  const [newTerm, setNewTerm] = useState(10);

  const currentLoan = useMemo(() => calculateLoan({ loanAmount: nn(currentBalance), interestRate: nn(currentRate), loanTermYears: 10 }), [currentBalance, currentRate]);
  const newLoan = useMemo(() => calculateLoan({ loanAmount: nn(currentBalance), interestRate: nn(newRate), loanTermYears: nn(newTerm) }), [currentBalance, newRate, newTerm]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Current Balance ($)</Label>
            <Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(Number(e.target.value))} />
          </div>
          <div>
            <Label>Current Interest Rate (%)</Label>
            <Input type="number" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} />
          </div>
          <hr />
          <div>
            <Label>New Refinance Rate (%)</Label>
            <Input type="number" step="0.1" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>New Term (Years)</Label>
            <Input type="number" value={newTerm} onChange={(e) => setNewTerm(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Savings</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(Math.max(0, currentLoan.monthlyPayment - newLoan.monthlyPayment))}/mo</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">New Payment</span>
              <span className="font-bold">{formatCurrency(newLoan.monthlyPayment)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Interest Saved</span>
              <span className="font-bold">{formatCurrency(Math.max(0, currentLoan.totalInterest - newLoan.totalInterest))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutoLeaseCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(2000);
  const [residualValue, setResidualValue] = useState(21000);
  const [apr, setApr] = useState(6.0);
  const [termMonths, setTermMonths] = useState(36);

  const results = useMemo(() => {
    const term = Math.max(1, Math.floor(nn(termMonths)));
    const capCost = Math.max(0, nn(vehiclePrice) - nn(downPayment));
    const residual = clamp(nn(residualValue), 0, nn(vehiclePrice));
    const moneyFactor = clamp(nn(apr), 0, 30) / 2400;
    const depreciation = Math.max(0, capCost - residual) / term;
    const financeCharge = (capCost + residual) * moneyFactor;
    const monthly = depreciation + financeCharge;
    const total = monthly * term + nn(downPayment);
    return { term, capCost, residual, moneyFactor, depreciation, financeCharge, monthly, total };
  }, [vehiclePrice, downPayment, residualValue, apr, termMonths]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Vehicle Price (MSRP) ($)</Label>
            <Input type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Down Payment ($)</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
            <div>
              <Label>Lease Term (Months)</Label>
              <Input type="number" value={termMonths} onChange={(e) => setTermMonths(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Residual Value ($)</Label>
              <Input type="number" value={residualValue} onChange={(e) => setResidualValue(Number(e.target.value))} />
            </div>
            <div>
              <Label>APR Equivalent (%)</Label>
              <Input type="number" step="0.01" value={apr} onChange={(e) => setApr(Number(e.target.value))} />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Money factor is approximated as APR ÷ 2400. Taxes and fees vary by state and dealer and are not included here.
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Monthly Lease Payment</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(results.monthly)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Cap Cost (est.)</span>
              <span className="font-bold">{formatCurrency(results.capCost)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Money Factor</span>
              <span className="font-bold">{results.moneyFactor.toFixed(5)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Depreciation</span>
              <span className="font-bold">{formatCurrency(results.depreciation)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Finance Charge</span>
              <span className="font-bold">{formatCurrency(results.financeCharge)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">
            Estimated total paid over {results.term} months (payment + down payment): <span className="font-semibold">{formatCurrency(results.total)}</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Residual values are typically set by the lender; changing residual value can materially change the estimate.
          </div>
        </div>
      </div>
    </div>
  );
}

