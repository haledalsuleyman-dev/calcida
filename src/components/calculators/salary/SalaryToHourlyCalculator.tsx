"use client";
import React, { useState, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { StickyResultBar } from '@/components/calculators/StickyResultBar';
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

interface SalaryResult {
  hourly: number;
  effectiveHourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
  totalPotentialHours: number;
  actualWorkingHours: number;
  unpaidHours: number;
  paidHolidayHours: number;
}

export function SalaryToHourlyCalculator() {
  const [annualSalary, setAnnualSalary] = useState(60000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [unpaidTimeOffEnabled, setUnpaidTimeOffEnabled] = useState(false);
  const [unpaidDays, setUnpaidDays] = useState(10); // Default 2 weeks (10 working days)
  const [paidHolidaysEnabled, setPaidHolidaysEnabled] = useState(true);
  const [paidHolidayDays, setPaidHolidayDays] = useState(10); // Standard US holidays

  const resultCardRef = useRef<HTMLDivElement | null>(null);

  const result = useMemo<SalaryResult>(() => {
    // 1. Calculate Total Standard Hours (Contract Hours)
    // Standard assumes you are paid for these hours (including paid holidays, excluding unpaid time)
    // Actually, "Salary" usually implies you are paid for the year regardless of holidays (they are paid).
    // But Unpaid time off reduces your paycheck OR implies you work less for same money (if you are lucky, but usually reduces pay).
    // Let's assume "Salary" is the GROSS AMOUNT RECEIVED.
    
    // Total Workable Hours in a Year (based on weeks/hours)
    const totalPotentialHours = weeksPerYear * hoursPerWeek;
    
    // Hours per day (average)
    const hoursPerDay = hoursPerWeek / 5; // Assuming 5 day work week for simplified math

    // Deduct Unpaid Time Off from "Working Hours"
    // If I take unpaid time off, I am NOT working those hours.
    const unpaidHours = unpaidTimeOffEnabled ? unpaidDays * hoursPerDay : 0;
    
    // Paid Holidays are hours I DON'T work but GET PAID for.
    // They are included in the "Paid Hours" but excluded from "Actual Working Hours".
    const paidHolidayHours = paidHolidaysEnabled ? paidHolidayDays * hoursPerDay : 0;

    // Actual Working Hours = Total - Unpaid - PaidHolidays
    const actualWorkingHours = totalPotentialHours - unpaidHours - paidHolidayHours;

    // Adjusted Paid Hours? 
    // If salary is fixed $60k, and I take unpaid time off... usually salary is reduced.
    // BUT the user entered "Annual Salary". We assume this is the TOTAL AMOUNT EARNED.
    // So if they earned $60k, and took unpaid time off, the $60k is what they got.
    // So we calculate hourly based on what?
    // Standard Definition: Hourly Rate = Annual Salary / 2080 (or standard year).
    // Adjusted Definition: Hourly Rate = Annual Salary / Actual Hours Worked.

    // Let's output:
    // 1. Standard Hourly (based on 52 weeks * 40 hours) - "Contract Rate"
    // 2. Actual Hourly (based on Actual Working Hours) - "Effective Rate"

    const standardHours = weeksPerYear * hoursPerWeek;
    const standardHourly = annualSalary / standardHours;
    
    // Effective: What you earn for every hour you ACTUALLY sit at your desk.
    const effectiveHourly = annualSalary / actualWorkingHours;

    // Periodic breakdowns (based on Standard Year logic usually, or the Salary amount divided by periods)
    // If I make $60k/year:
    const monthly = annualSalary / 12;
    const weekly = annualSalary / 52;
    const biweekly = annualSalary / 26;
    const daily = annualSalary / (52 * 5); // Average day

    return {
      hourly: standardHourly,
      effectiveHourly: effectiveHourly,
      daily: daily, // Simple average
      weekly: weekly,
      biweekly: biweekly,
      monthly: monthly,
      annual: annualSalary,
      totalPotentialHours,
      actualWorkingHours,
      unpaidHours,
      paidHolidayHours
    };

  }, [annualSalary, hoursPerWeek, weeksPerYear, unpaidTimeOffEnabled, unpaidDays, paidHolidaysEnabled, paidHolidayDays]);

  const chartData = [
    { name: 'Working Hours', value: result.actualWorkingHours },
    { name: 'Paid Holidays', value: result.paidHolidayHours },
    { name: 'Unpaid Time Off', value: result.unpaidHours },
  ].filter(item => item.value > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Salary Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="annualSalary">Annual Salary</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="annualSalary"
                  type="number"
                  min={0}
                  placeholder="e.g., 60000"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Math.max(0, Number(e.target.value)))}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Gross yearly pay before taxes.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="hoursPerWeek">Hours/Week</Label>
                    <Input
                        id="hoursPerWeek"
                        type="number"
                        min={0}
                        placeholder="e.g., 40"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Math.max(0, Number(e.target.value)))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Standard is 40 hours/week.</p>
                </div>
                <div>
                    <Label htmlFor="weeksPerYear">Weeks/Year</Label>
                    <Input
                        id="weeksPerYear"
                        type="number"
                        min={0}
                        placeholder="e.g., 52"
                        value={weeksPerYear}
                        onChange={(e) => setWeeksPerYear(Math.max(0, Number(e.target.value)))}
                    />
                    <p className="text-xs text-gray-500 mt-1">2080 hours/year assumes 40 × 52.</p>
                </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="paidHolidays" className="cursor-pointer">Include Paid Holidays?</Label>
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
                        <Label htmlFor="paidHolidayDays" className="text-xs text-gray-600">Number of Days (Yearly)</Label>
                        <Input
                            id="paidHolidayDays"
                            type="number"
                            min={0}
                            placeholder="e.g., 10"
                            value={paidHolidayDays}
                            onChange={(e) => setPaidHolidayDays(Math.max(0, Number(e.target.value)))}
                            className="h-8 mt-1"
                        />
                    </div>
                )}
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="unpaidTimeOff" className="cursor-pointer">Include Unpaid Time Off?</Label>
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
                        <Label htmlFor="unpaidDays" className="text-xs text-gray-600">Number of Days (Yearly)</Label>
                        <Input
                            id="unpaidDays"
                            type="number"
                            min={0}
                            placeholder="e.g., 10"
                            value={unpaidDays}
                            onChange={(e) => setUnpaidDays(Math.max(0, Number(e.target.value)))}
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
        <div ref={resultCardRef} className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Hourly Wage</h2>
          <div className="text-5xl font-bold text-blue-700 mb-2">
            {formatCurrency(result.hourly)}
            <span className="text-2xl text-blue-600 font-normal">/hr</span>
          </div>
          <div className="text-blue-800 font-medium mb-6">
            Based on {weeksPerYear} weeks at {hoursPerWeek} hours/week
          </div>
          
          <div className="flex justify-center gap-4">
             <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                    navigator.clipboard.writeText(`My salary of ${formatCurrency(annualSalary)} is approximately ${formatCurrency(result.hourly)} per hour.`);
                    alert("Copied to clipboard!");
                }}
             >
               Copy & Share
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
                        <span className="font-bold">{formatCurrency(result.annual)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Monthly</span>
                        <span className="font-bold">{formatCurrency(result.monthly)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Bi-Weekly (26/yr)</span>
                        <span className="font-bold">{formatCurrency(result.biweekly)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Weekly</span>
                        <span className="font-bold">{formatCurrency(result.weekly)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Daily (8 hrs)</span>
                        <span className="font-bold">{formatCurrency(result.daily)}</span>
                    </div>
                </div>
            </div>

            {/* Effective Rate / Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Effective Hourly Rate</h3>
                <p className="text-sm text-gray-600 mb-4">
                    If you account for paid holidays and unpaid time off, your earnings per <strong>actual hour worked</strong> changes.
                </p>
                
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-md">
                    <span className="font-medium text-gray-700">Effective Rate</span>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(result.effectiveHourly)}/hr</span>
                </div>

                <div className="h-[150px] min-h-[150px]">
                    <ClientOnlyChart className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${Number(value).toFixed(1)} hrs`} />
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
                        A <strong>{formatCurrency(annualSalary)}</strong> salary equals approximately <strong>{formatCurrency(result.hourly)}</strong> per hour (standard {hoursPerWeek}-hour week).
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        You work approximately <strong>{Math.round(result.actualWorkingHours)}</strong> hours per year after accounting for time off and holidays.
                    </span>
                </li>
                {result.effectiveHourly > result.hourly && (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            Because of paid time off, you are effectively earning <strong>{formatCurrency(result.effectiveHourly)}</strong> for every hour you actually work.
                        </span>
                    </li>
                )}
            </ul>
        </div>

      </div>
      
      {/* Sticky Result Bar */}
      {result && (
        <StickyResultBar
          label="Hourly Wage"
          value={result.hourly}
          suffix="/hr"
          secondaryLabel="Effective"
          secondaryValue={result.effectiveHourly}
          triggerRef={resultCardRef}
        />
      )}
    </div>
  );
}
