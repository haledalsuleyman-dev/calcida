"use client";
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface HourlyResult {
  hourlyRate: number;
  baseAnnualPay: number;
  overtimeAnnualPay: number;
  unpaidDeduction: number;
  totalAnnualPay: number;
  monthlyPay: number;
  biweeklyPay: number;
  weeklyPay: number;
  dailyPay: number;
  effectiveHourlyRate: number;
  actualWorkingHours: number;
}

interface HourlyToSalaryCalculatorProps {
  defaultValues?: {
    hourlyRate?: number;
    hoursPerWeek?: number;
    weeksPerYear?: number;
  };
}

export function HourlyToSalaryCalculator({ defaultValues }: HourlyToSalaryCalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState(defaultValues?.hourlyRate ?? 25);
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultValues?.hoursPerWeek ?? 40);
  const [weeksPerYear, setWeeksPerYear] = useState(defaultValues?.weeksPerYear ?? 52);
  
  const [overtimeEnabled, setOvertimeEnabled] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState(5);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5);
  
  const [paidHolidaysEnabled, setPaidHolidaysEnabled] = useState(true);
  const [paidHolidayDays, setPaidHolidayDays] = useState(10);
  
  const [unpaidTimeOffEnabled, setUnpaidTimeOffEnabled] = useState(false);
  const [unpaidDays, setUnpaidDays] = useState(10);

  const result = useMemo<HourlyResult>(() => {
    // 1. Calculate Base Annual Pay
    // Base pay assumes standard hours * weeks.
    // If paid holidays are enabled, they are usually included in the base salary (you get paid for them).
    // If unpaid time off is enabled, it reduces the base pay.
    
    const standardAnnualHours = hoursPerWeek * weeksPerYear;
    const baseAnnualPay = hourlyRate * standardAnnualHours;
    
    // 2. Overtime Pay
    let overtimeAnnualPay = 0;
    if (overtimeEnabled) {
      overtimeAnnualPay = (hourlyRate * overtimeMultiplier) * overtimeHours * weeksPerYear;
    }
    
    // 3. Unpaid Time Off Deduction
    // Assuming 5 day work week to get daily hours
    const hoursPerDay = hoursPerWeek / 5;
    let unpaidDeduction = 0;
    if (unpaidTimeOffEnabled) {
      unpaidDeduction = hourlyRate * hoursPerDay * unpaidDays;
    }
    
    // 4. Total Annual Pay
    const totalAnnualPay = Math.max(0, baseAnnualPay + overtimeAnnualPay - unpaidDeduction);
    
    // 5. Periodic Pay
    const monthlyPay = totalAnnualPay / 12;
    const biweeklyPay = totalAnnualPay / 26;
    const weeklyPay = totalAnnualPay / 52;
    const dailyPay = totalAnnualPay / (52 * 5); // Average daily pay
    
    // 6. Effective Hourly Rate
    // Total Pay / Actual Hours Worked
    // Actual Hours = (Weeks * Hours) + (Overtime * Weeks) - (Unpaid Days * Hours/Day) - (Paid Holidays * Hours/Day)
    const paidHolidayHours = paidHolidaysEnabled ? (paidHolidayDays * hoursPerDay) : 0;
    const unpaidHours = unpaidTimeOffEnabled ? (unpaidDays * hoursPerDay) : 0;
    const totalOvertimeHours = overtimeEnabled ? (overtimeHours * weeksPerYear) : 0;
    
    const actualWorkingHours = (standardAnnualHours + totalOvertimeHours) - unpaidHours - paidHolidayHours;
    const effectiveHourlyRate = actualWorkingHours > 0 ? totalAnnualPay / actualWorkingHours : 0;

    return {
      hourlyRate,
      baseAnnualPay,
      overtimeAnnualPay,
      unpaidDeduction,
      totalAnnualPay,
      monthlyPay,
      biweeklyPay,
      weeklyPay,
      dailyPay,
      effectiveHourlyRate,
      actualWorkingHours
    };

  }, [hourlyRate, hoursPerWeek, weeksPerYear, overtimeEnabled, overtimeHours, overtimeMultiplier, unpaidTimeOffEnabled, unpaidDays, paidHolidaysEnabled, paidHolidayDays]);

  const chartData = [
    { name: 'Base Pay', value: result.baseAnnualPay - result.unpaidDeduction }, // Net Base
    { name: 'Overtime Pay', value: result.overtimeAnnualPay },
  ].filter(item => item.value > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Hourly Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hourlyRate">Hourly Wage</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="hoursPerWeek">Hours/Week</Label>
                    <Input
                        id="hoursPerWeek"
                        type="number"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="weeksPerYear">Weeks/Year</Label>
                    <Input
                        id="weeksPerYear"
                        type="number"
                        value={weeksPerYear}
                        onChange={(e) => setWeeksPerYear(Number(e.target.value))}
                    />
                </div>
            </div>
            
            {/* Overtime Toggle */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="overtime" className="cursor-pointer">Include Overtime?</Label>
                    <input 
                        type="checkbox" 
                        id="overtime"
                        checked={overtimeEnabled} 
                        onChange={(e) => setOvertimeEnabled(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                </div>
                {overtimeEnabled && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="overtimeHours" className="text-xs text-gray-600">Hours/Week</Label>
                            <Input
                                id="overtimeHours"
                                type="number"
                                value={overtimeHours}
                                onChange={(e) => setOvertimeHours(Number(e.target.value))}
                                className="h-8 mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="overtimeMultiplier" className="text-xs text-gray-600">Multiplier (1.5x)</Label>
                            <Input
                                id="overtimeMultiplier"
                                type="number"
                                step="0.5"
                                value={overtimeMultiplier}
                                onChange={(e) => setOvertimeMultiplier(Number(e.target.value))}
                                className="h-8 mt-1"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Paid Holidays Toggle */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="paidHolidays" className="cursor-pointer">Paid Holidays?</Label>
                    <input 
                        type="checkbox" 
                        id="paidHolidays"
                        checked={paidHolidaysEnabled} 
                        onChange={(e) => setPaidHolidaysEnabled(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                </div>
                {paidHolidaysEnabled && (
                    <div>
                        <Label htmlFor="paidHolidayDays" className="text-xs text-gray-600">Days per Year</Label>
                        <Input
                            id="paidHolidayDays"
                            type="number"
                            value={paidHolidayDays}
                            onChange={(e) => setPaidHolidayDays(Number(e.target.value))}
                            className="h-8 mt-1"
                        />
                    </div>
                )}
            </div>

            {/* Unpaid Time Off Toggle */}
            <div className="pt-2 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="unpaidTimeOff" className="cursor-pointer">Unpaid Time Off?</Label>
                    <input 
                        type="checkbox" 
                        id="unpaidTimeOff"
                        checked={unpaidTimeOffEnabled} 
                        onChange={(e) => setUnpaidTimeOffEnabled(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                </div>
                {unpaidTimeOffEnabled && (
                    <div>
                        <Label htmlFor="unpaidDays" className="text-xs text-gray-600">Days per Year</Label>
                        <Input
                            id="unpaidDays"
                            type="number"
                            value={unpaidDays}
                            onChange={(e) => setUnpaidDays(Number(e.target.value))}
                            className="h-8 mt-1"
                        />
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Primary Result Card */}
        <div className="bg-green-50 p-8 rounded-lg border border-green-100 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Estimated Annual Salary</h2>
          <div className="text-5xl font-bold text-green-700 mb-2">
            {formatCurrency(result.totalAnnualPay)}
          </div>
          <div className="text-green-800 font-medium mb-6">
            Based on {formatCurrency(hourlyRate)}/hr for {hoursPerWeek} hours/week
          </div>
          
          <div className="flex justify-center gap-4">
             <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                    navigator.clipboard.writeText(`My hourly wage of ${formatCurrency(hourlyRate)} is approximately ${formatCurrency(result.totalAnnualPay)} per year.`);
                    alert("Copied to clipboard!");
                }}
             >
               Copy Result
             </Button>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Paycheck Breakdown</h3>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Annual Salary</span>
                        <span className="font-bold">{formatCurrency(result.totalAnnualPay)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Monthly Pay</span>
                        <span className="font-bold">{formatCurrency(result.monthlyPay)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Bi-Weekly Pay</span>
                        <span className="font-bold">{formatCurrency(result.biweeklyPay)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Weekly Pay</span>
                        <span className="font-bold">{formatCurrency(result.weeklyPay)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Daily Pay (Avg)</span>
                        <span className="font-bold">{formatCurrency(result.dailyPay)}</span>
                    </div>
                </div>
            </div>

            {/* Income Composition / Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Income Composition</h3>
                
                {unpaidTimeOffEnabled && result.unpaidDeduction > 0 && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
                        Unpaid time off reduces your potential annual earnings by <strong>{formatCurrency(result.unpaidDeduction)}</strong>.
                    </div>
                )}
                
                {overtimeEnabled && result.overtimeAnnualPay > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-100">
                        Overtime adds <strong>{formatCurrency(result.overtimeAnnualPay)}</strong> to your annual income.
                    </div>
                )}

                <div className="h-[200px] min-h-[200px]">
                    <ClientOnlyChart className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    </ClientOnlyChart>
                </div>
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
                        <strong>{formatCurrency(hourlyRate)}/hour</strong> at {hoursPerWeek} hours/week is approximately <strong>{formatCurrency(result.baseAnnualPay)}/year</strong>.
                    </span>
                </li>
                {overtimeEnabled && (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            Overtime contributes approximately <strong>{((result.overtimeAnnualPay / result.totalAnnualPay) * 100).toFixed(1)}%</strong> to your total annual income.
                        </span>
                    </li>
                )}
                {paidHolidaysEnabled && (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            You get paid for approximately <strong>{paidHolidayDays} days</strong> per year without working, effectively boosting your hourly rate for actual work done.
                        </span>
                    </li>
                )}
                 <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        Your effective hourly rate for actual hours worked is <strong>{formatCurrency(result.effectiveHourlyRate)}</strong>.
                    </span>
                </li>
            </ul>
        </div>

      </div>
    </div>
  );
}
