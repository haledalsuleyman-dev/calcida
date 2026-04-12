"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { nn, fmtPct } from '@/components/calculators/generated/utils';

export function SalaryConversionCalculator({ mode }: { mode: 'weekly' | 'biweekly' | 'monthly' | 'hourly-to-monthly' | 'monthly-to-hourly' }) {
  const [annualSalary, setAnnualSalary] = useState(78000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);

  const result = useMemo(() => {
    if (mode === 'weekly') return nn(annualSalary) / 52;
    if (mode === 'biweekly') return nn(annualSalary) / 26;
    if (mode === 'monthly') return nn(annualSalary) / 12;
    if (mode === 'hourly-to-monthly') return (nn(hourlyRate) * nn(hoursPerWeek) * nn(weeksPerYear)) / 12;
    return (nn(monthlyIncome) * 12) / Math.max(1, nn(hoursPerWeek) * nn(weeksPerYear));
  }, [mode, annualSalary, hourlyRate, hoursPerWeek, weeksPerYear, monthlyIncome]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          {mode === 'hourly-to-monthly' ? (
            <>
              <div>
                <Label>Hourly Rate ($/hr)</Label>
                <Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hours/Week</Label>
                  <Input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Weeks/Year</Label>
                  <Input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value))} />
                </div>
              </div>
            </>
          ) : mode === 'monthly-to-hourly' ? (
            <>
              <div>
                <Label>Monthly Income ($)</Label>
                <Input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hours/Week</Label>
                  <Input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Weeks/Year</Label>
                  <Input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value))} />
                </div>
              </div>
            </>
          ) : (
            <div>
              <Label>Annual Salary ($)</Label>
              <Input type="number" value={annualSalary} onChange={(e) => setAnnualSalary(Number(e.target.value))} />
            </div>
          )}
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Result</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(result)}</div>
        </div>
      </div>
    </div>
  );
}

export function OvertimeCalculator({ multiplier: defaultMultiplier }: { multiplier: number }) {
  const [hourly, setHourly] = useState(22);
  const [regularHours, setRegularHours] = useState(40);
  const [otHours, setOtHours] = useState(10);
  const [multiplier, setMultiplier] = useState(defaultMultiplier);
  const overtimePay = nn(hourly) * nn(multiplier) * nn(otHours);
  const regularPay = nn(hourly) * nn(regularHours);
  const totalPay = regularPay + overtimePay;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Hourly Rate ($)</Label>
            <Input type="number" value={hourly} onChange={(e) => setHourly(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Regular Hours</Label>
              <Input type="number" value={regularHours} onChange={(e) => setRegularHours(Number(e.target.value))} />
            </div>
            <div>
              <Label>Multiplier (e.g., 1.5)</Label>
              <Input type="number" step="0.1" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <Label>Overtime Hours</Label>
            <Input type="number" value={otHours} onChange={(e) => setOtHours(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Total Earnings</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(totalPay)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Regular Pay</span>
              <span className="font-bold">{formatCurrency(regularPay)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Overtime Pay ({multiplier}×)</span>
              <span className="font-bold">{formatCurrency(overtimePay)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SalaryIncreaseCalculator() {
  const [oldSalary, setOldSalary] = useState(80000);
  const [newSalary, setNewSalary] = useState(88000);
  const increase = Math.max(0, nn(newSalary) - nn(oldSalary));
  const pct = oldSalary > 0 ? (increase / nn(oldSalary)) * 100 : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Current Salary ($)</Label>
            <Input type="number" value={oldSalary} onChange={(e) => setOldSalary(Number(e.target.value))} />
          </div>
          <div>
            <Label>New Salary ($)</Label>
            <Input type="number" value={newSalary} onChange={(e) => setNewSalary(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Raise Amount</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(increase)}</div>
          <div className="mt-2 text-lg text-blue-900">Raise percentage: <span className="font-bold">{fmtPct(pct)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function BonusCalculator() {
  const [base, setBase] = useState(70000);
  const [bonus, setBonus] = useState(8000);
  const total = nn(base) + nn(bonus);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Base Pay ($/year)</Label>
            <Input type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} />
          </div>
          <div>
            <Label>Bonus ($)</Label>
            <Input type="number" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Total Compensation (Gross)</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(total)}</div>
        </div>
      </div>
    </div>
  );
}

export function CommissionCalculator() {
  const [base, setBase] = useState(60000);
  const [sales, setSales] = useState(250000);
  const [commissionRate, setCommissionRate] = useState(5);
  const commission = nn(sales) * (nn(commissionRate) / 100);
  const total = nn(base) + commission;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Base Pay ($/year)</Label>
            <Input type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} />
          </div>
          <div>
            <Label>Sales Volume ($)</Label>
            <Input type="number" value={sales} onChange={(e) => setSales(Number(e.target.value))} />
          </div>
          <div>
            <Label>Commission Rate (%)</Label>
            <Input type="number" step="0.1" value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Commission</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(commission)}</div>
          <div className="mt-2 text-lg text-blue-900">Total compensation: <span className="font-bold">{formatCurrency(total)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function SeverancePayCalculator() {
  const [grossAmount, setGrossAmount] = useState(20000);
  const [taxRate, setTaxRate] = useState(25);
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000);

  const netAmount = nn(grossAmount) * (1 - nn(taxRate) / 100);
  const monthsOfCoverage = monthlyExpenses > 0 ? netAmount / nn(monthlyExpenses) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Gross Severance Amount ($)</Label>
            <Input type="number" value={grossAmount} onChange={(e) => setGrossAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Estimated Tax Rate (%)</Label>
            <Input type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Living Expenses ($)</Label>
            <Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Net Severance Pay</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(netAmount)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Covers essential expenses for: <span className="font-bold">{monthsOfCoverage.toFixed(1)} months</span>
          </div>
        </div>
      </div>
    </div>
  );
}

