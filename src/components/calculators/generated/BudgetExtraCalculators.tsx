"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { nn, fmtPct } from '@/components/calculators/generated/utils';
import { DebtPayoffCalculator } from '@/components/calculators/debt/DebtPayoffCalculator';

export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(10000);
  const [current, setCurrent] = useState(1000);
  const [months, setMonths] = useState(24);
  const [annualRate, setAnnualRate] = useState(0);

  const payment = useMemo(() => {
    const n = Math.max(1, Math.floor(nn(months)));
    const r = nn(annualRate) / 100 / 12;
    const fv = nn(goal);
    const pv = nn(current);
    if (r === 0) return Math.max(0, (fv - pv) / n);
    const pow = Math.pow(1 + r, n);
    return Math.max(0, (fv - pv * pow) * r / (pow - 1));
  }, [goal, current, months, annualRate]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Goal Amount ($)</Label>
            <Input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} />
          </div>
          <div>
            <Label>Current Savings ($)</Label>
            <Input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Months</Label>
              <Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </div>
            <div>
              <Label>Interest Rate (%/yr)</Label>
              <Input type="number" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Required Monthly Savings</h2>
          <div className="text-6xl font-bold text-blue-700">{formatCurrency(payment)}</div>
        </div>
      </div>
    </div>
  );
}

export function SinkingFundCalculator() {
  const [target, setTarget] = useState(2400);
  const [months, setMonths] = useState(12);
  const monthly = months > 0 ? nn(target) / nn(months) : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Target Amount ($)</Label>
            <Input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
          </div>
          <div>
            <Label>Months Until Needed</Label>
            <Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Monthly Amount</h2>
          <div className="text-6xl font-bold text-blue-700">{formatCurrency(monthly)}</div>
        </div>
      </div>
    </div>
  );
}

export function BillSplitCalculator() {
  const [bill, setBill] = useState(120);
  const [tip, setTip] = useState(18);
  const [people, setPeople] = useState(4);
  const tipAmount = nn(bill) * (nn(tip) / 100);
  const total = nn(bill) + tipAmount;
  const perPerson = people > 0 ? total / nn(people) : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Bill Amount ($)</Label>
            <Input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
          </div>
          <div>
            <Label>Tip (%)</Label>
            <Input type="number" step="0.1" value={tip} onChange={(e) => setTip(Number(e.target.value))} />
          </div>
          <div>
            <Label>People</Label>
            <Input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Per Person Total</h2>
          <div className="text-6xl font-bold text-blue-700">{formatCurrency(perPerson)}</div>
          <div className="mt-4 text-sm text-blue-900">Tip amount: <span className="font-semibold">{formatCurrency(tipAmount)}</span> · Total: <span className="font-semibold">{formatCurrency(total)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function SavingsRateCalculator() {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3500);
  const savings = Math.max(0, nn(income) - nn(expenses));
  const rate = income > 0 ? (savings / nn(income)) * 100 : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Monthly Income ($)</Label>
            <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Expenses ($)</Label>
            <Input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Savings Rate</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(rate)}</div>
          <div className="mt-3 text-lg text-blue-900">Monthly savings: <span className="font-bold">{formatCurrency(savings)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function NetIncomeCalculator() {
  const [grossMonthly, setGrossMonthly] = useState(6500);
  const [taxRate, setTaxRate] = useState(25);
  const [deductions, setDeductions] = useState(400);
  const taxes = nn(grossMonthly) * (nn(taxRate) / 100);
  const net = Math.max(0, nn(grossMonthly) - taxes - nn(deductions));
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Gross Monthly Income ($)</Label>
            <Input type="number" value={grossMonthly} onChange={(e) => setGrossMonthly(Number(e.target.value))} />
          </div>
          <div>
            <Label>Estimated Tax Rate (%)</Label>
            <Input type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Deductions ($)</Label>
            <Input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Net Monthly Income</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(net)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Taxes</span>
              <span className="font-bold">{formatCurrency(taxes)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Deductions</span>
              <span className="font-bold">{formatCurrency(deductions)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DebtStrategyCalculator({ strategy }: { strategy: 'snowball' | 'avalanche' }) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
        This page focuses on the {strategy === 'snowball' ? 'Debt Snowball' : 'Debt Avalanche'} method. Use the Debt Payoff Calculator below to model multiple debts and payoff scenarios.
      </div>
      <DebtPayoffCalculator />
    </div>
  );
}

export function CostOfLivingCalculator() {
  const [currentSalary, setCurrentSalary] = useState(75000);
  const [currentIndex, setCurrentIndex] = useState(100);
  const [newIndex, setNewIndex] = useState(120);

  const requiredSalary = nn(currentIndex) > 0 ? (nn(currentSalary) * nn(newIndex)) / nn(currentIndex) : 0;
  const difference = requiredSalary - nn(currentSalary);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Current Annual Salary ($)</Label>
            <Input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} />
          </div>
          <div>
            <Label>Current City Cost Index</Label>
            <Input type="number" value={currentIndex} onChange={(e) => setCurrentIndex(Number(e.target.value))} />
          </div>
          <div>
            <Label>New City Cost Index</Label>
            <Input type="number" value={newIndex} onChange={(e) => setNewIndex(Number(e.target.value))} />
          </div>
          <div className="text-xs text-gray-500">
            Use 100 for a national average or base city. If New City is 20% more expensive, use 120.
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Required Salary in New City</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(requiredSalary)}</div>
          <div className={`mt-4 text-lg font-medium ${difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {difference >= 0 ? 'Needs ' : 'Saves '}{formatCurrency(Math.abs(difference))} more per year
          </div>
        </div>
      </div>
    </div>
  );
}

