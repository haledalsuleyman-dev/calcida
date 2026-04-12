"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateCompoundInterest } from '@/lib/calculators/finance';
import { clamp, nn } from '@/components/calculators/generated/utils';

function yearsToReachTarget(params: { current: number; annualSavings: number; annualReturnPct: number; target: number }): number | null {
  let balance = nn(params.current);
  const savings = nn(params.annualSavings);
  const r = clamp(params.annualReturnPct, 0, 30) / 100;
  const target = nn(params.target);
  if (target <= balance) return 0;
  if (savings <= 0 && r === 0) return null;
  for (let year = 1; year <= 80; year++) {
    balance = balance * (1 + r) + savings;
    if (balance >= target) return year;
  }
  return null;
}

export function FIRECalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(48000);
  const [swr, setSwr] = useState(4);
  const [current, setCurrent] = useState(150000);
  const [annualSavings, setAnnualSavings] = useState(24000);
  const [returnPct, setReturnPct] = useState(7);

  const target = swr > 0 ? nn(annualExpenses) / (clamp(nn(swr), 1, 10) / 100) : 0;
  const years = yearsToReachTarget({ current: nn(current), annualSavings: nn(annualSavings), annualReturnPct: nn(returnPct), target });

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Expenses ($)</Label>
            <Input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Safe Withdrawal Rate (%)</Label>
              <Input type="number" step="0.1" value={swr} onChange={(e) => setSwr(Number(e.target.value))} />
            </div>
            <div>
              <Label>Expected Return (%/yr)</Label>
              <Input type="number" step="0.1" value={returnPct} onChange={(e) => setReturnPct(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Investments ($)</Label>
              <Input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
            </div>
            <div>
              <Label>Annual Savings ($)</Label>
              <Input type="number" value={annualSavings} onChange={(e) => setAnnualSavings(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated FIRE Number</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(target)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Time to reach target: <span className="font-bold">{years === null ? 'N/A' : `${years} years`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IraGrowthCalculator() {
  const [start, setStart] = useState(15000);
  const [annualContribution, setAnnualContribution] = useState(6000);
  const [returnPct, setReturnPct] = useState(7);
  const [years, setYears] = useState(20);
  const monthly = nn(annualContribution) / 12;
  const result = useMemo(() => calculateCompoundInterest(nn(start), monthly, nn(returnPct), nn(years)), [start, monthly, returnPct, years]);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Starting Balance ($)</Label>
            <Input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Contribution ($)</Label>
            <Input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Return (%/yr)</Label>
              <Input type="number" step="0.1" value={returnPct} onChange={(e) => setReturnPct(Number(e.target.value))} />
            </div>
            <div>
              <Label>Years</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Projected Balance</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(result.finalBalance)}</div>
          <div className="mt-4 text-sm text-blue-900">Total contributions: <span className="font-semibold">{formatCurrency(result.totalPrincipal)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function FourPercentRuleCalculator() {
  const [portfolio, setPortfolio] = useState(1000000);
  const annual = nn(portfolio) * 0.04;
  const monthly = annual / 12;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Portfolio Balance ($)</Label>
            <Input type="number" value={portfolio} onChange={(e) => setPortfolio(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Withdrawal</h2>
          <div className="mt-2 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Annual</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(annual)}</div>
            </div>
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Monthly</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(monthly)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PensionCalculator() {
  const [finalSalary, setFinalSalary] = useState(90000);
  const [years, setYears] = useState(25);
  const [accrual, setAccrual] = useState(1.5);
  const annual = nn(finalSalary) * (clamp(nn(accrual), 0, 5) / 100) * nn(years);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Final Salary ($/year)</Label>
            <Input type="number" value={finalSalary} onChange={(e) => setFinalSalary(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Years of Service</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div>
              <Label>Accrual Rate (%/yr)</Label>
              <Input type="number" step="0.1" value={accrual} onChange={(e) => setAccrual(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Pension Income</h2>
          <div className="mt-2 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Annual</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(annual)}</div>
            </div>
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Monthly</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(annual / 12)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RMD_DIVISORS: Record<number, number> = {
  72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2,
  81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2,
};

export function RmdCalculator() {
  const [age, setAge] = useState(75);
  const [balance, setBalance] = useState(500000);
  const divisor = RMD_DIVISORS[Math.floor(nn(age))] ?? 24.6;
  const rmd = divisor > 0 ? nn(balance) / divisor : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Age</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <Label>Retirement Account Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated RMD</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(rmd)}</div>
          <div className="mt-3 text-sm text-blue-900">Divisor used: <span className="font-semibold">{divisor}</span></div>
        </div>
      </div>
    </div>
  );
}

export function SocialSecurityBenefitsCalculator() {
  const [earnings, setEarnings] = useState(70000);
  const [age, setAge] = useState(67);

  const pia = useMemo(() => {
    // Simplified PIA calculation
    const monthlyEarnings = nn(earnings) / 12;
    let benefit = 0;
    if (monthlyEarnings <= 1174) {
      benefit = monthlyEarnings * 0.9;
    } else if (monthlyEarnings <= 7078) {
      benefit = (1174 * 0.9) + (monthlyEarnings - 1174) * 0.32;
    } else {
      benefit = (1174 * 0.9) + (5904 * 0.32) + (monthlyEarnings - 7078) * 0.15;
    }
    return benefit;
  }, [earnings]);

  const reductionFactor = useMemo(() => {
    const fra = 67;
    const diff = fra - nn(age);
    if (diff > 0) {
      // Reduction for early retirement
      return 1 - (diff * 0.06);
    } else if (diff < 0) {
      // Increase for delayed retirement
      return 1 + (Math.abs(diff) * 0.08);
    }
    return 1;
  }, [age]);

  const monthlyBenefit = pia * reductionFactor;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Average Annual Earnings (Top 35 Years) ($)</Label>
            <Input type="number" value={earnings} onChange={(e) => setEarnings(Number(e.target.value))} />
          </div>
          <div>
            <Label>Retirement Age</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Monthly Benefit</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(monthlyBenefit)}</div>
          <div className="mt-4 text-sm text-gray-600">
            This is a simplified estimate based on 2024 bend points and rules. For an accurate projection, visit SSA.gov.
          </div>
        </div>
      </div>
    </div>
  );
}

export function EarlyRetirementCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(60000);
  const [currentSavings, setCurrentSavings] = useState(200000);
  const [monthlySavings, setMonthlySavings] = useState(2500);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const targetNetWorth = nn(annualExpenses) * 25;
  const result = useMemo(() => {
    let balance = nn(currentSavings);
    let months = 0;
    const monthlyRate = nn(expectedReturn) / 100 / 12;
    while (balance < targetNetWorth && months < 600) {
      balance = (balance + nn(monthlySavings)) * (1 + monthlyRate);
      months++;
    }
    return { months, finalBalance: balance };
  }, [currentSavings, monthlySavings, expectedReturn, targetNetWorth]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Expenses ($)</Label>
            <Input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
          </div>
          <div>
            <Label>Current Savings ($)</Label>
            <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Savings ($)</Label>
            <Input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} />
          </div>
          <div>
            <Label>Expected Return (%)</Label>
            <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Years to Early Retirement</h2>
          <div className="text-5xl font-bold text-blue-700">{(result.months / 12).toFixed(1)} years</div>
          <div className="mt-4 text-lg text-blue-900">
            Target Net Worth (25x expenses): <span className="font-bold">{formatCurrency(targetNetWorth)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RothVsTraditionalIraCalculator() {
  const [contribution, setContribution] = useState(7000);
  const [currentTaxRate, setCurrentTaxRate] = useState(22);
  const [retirementTaxRate, setRetirementTaxRate] = useState(15);
  const [years, setYears] = useState(25);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const rothFV = useMemo(() => {
    const rate = nn(expectedReturn) / 100;
    return nn(contribution) * Math.pow(1 + rate, nn(years));
  }, [contribution, expectedReturn, years]);

  const tradFV = useMemo(() => {
    const rate = nn(expectedReturn) / 100;
    const grossFV = nn(contribution) * Math.pow(1 + rate, nn(years));
    return grossFV * (1 - nn(retirementTaxRate) / 100);
  }, [contribution, expectedReturn, years, retirementTaxRate]);

  const better = rothFV > tradFV ? 'Roth IRA' : 'Traditional IRA';

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Contribution ($)</Label>
            <Input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Tax Rate (%)</Label>
              <Input type="number" value={currentTaxRate} onChange={(e) => setCurrentTaxRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Retirement Rate (%)</Label>
              <Input type="number" value={retirementTaxRate} onChange={(e) => setRetirementTaxRate(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <Label>Years to Retirement</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
          <div>
            <Label>Expected Return (%)</Label>
            <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated After-Tax Value</h2>
          <div className="text-4xl font-bold text-blue-700">{better} is better by {formatCurrency(Math.abs(rothFV - tradFV))}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded border border-blue-100">
              <span className="block font-medium text-gray-600">Roth IRA</span>
              <span className="text-2xl font-bold text-blue-700">{formatCurrency(rothFV)}</span>
            </div>
            <div className="bg-white p-4 rounded border border-blue-100">
              <span className="block font-medium text-gray-600">Traditional IRA</span>
              <span className="text-2xl font-bold text-blue-700">{formatCurrency(tradFV)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

