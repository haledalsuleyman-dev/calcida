"use client";
import React, { useState, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { StickyResultBar } from '@/components/calculators/StickyResultBar';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];
const STATES_NO_INCOME_TAX = ['AK', 'FL', 'NV', 'SD', 'TN', 'TX', 'WA', 'WY', 'NH'];

interface TakeHomeResult {
  annualGross: number;
  preTaxDeductions: number;
  postTaxDeductions: number;
  federalTaxAnnual: number;
  stateTaxAnnual: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalTaxAnnual: number;
  netPayAnnual: number;
  netMonthly: number;
  netBiweekly: number;
  netWeekly: number;
}

interface TakeHomePayCalculatorProps {
  defaultValues?: {
    income?: number;
  };
}

export function TakeHomePayCalculator({ defaultValues }: TakeHomePayCalculatorProps = {}) {
  // Income Inputs
  const [incomeType, setIncomeType] = useState('annual'); // annual, hourly
  const [inputValue, setInputValue] = useState(defaultValues?.income ?? 60000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [bonus, setBonus] = useState(0);

  // Deductions
  const [preTaxDeductions, setPreTaxDeductions] = useState(0); // 401k, HSA (Annual)
  const [postTaxDeductionsMonthly, setPostTaxDeductionsMonthly] = useState(0); // Health insurance, etc. (Monthly)

  // Tax Inputs
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('CA');
  const [federalTaxEnabled, setFederalTaxEnabled] = useState(true);
  const [stateTaxEnabled, setStateTaxEnabled] = useState(true);
  const [ficaEnabled, setFicaEnabled] = useState(true);

  const resultCardRef = useRef<HTMLDivElement | null>(null);

  const result = useMemo<TakeHomeResult>(() => {
    // 1. Calculate Gross Annual Income
    let annualGross = 0;
    if (incomeType === 'annual') {
        annualGross = inputValue;
    } else {
        annualGross = inputValue * hoursPerWeek * weeksPerYear;
    }
    annualGross += bonus;

    // 2. Pre-Tax Deductions
    // Annualized Pre-Tax Deductions
    const totalPreTaxDeductions = preTaxDeductions;
    
    // Taxable Income (for Federal/State income tax)
    const taxableIncome = Math.max(0, annualGross - totalPreTaxDeductions);

    // 3. Federal Tax Calculation (Simplified 2024 Brackets on Taxable Income)
    let federalTaxAnnual = 0;
    if (federalTaxEnabled) {
        const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
        const federalTaxable = Math.max(0, taxableIncome - standardDeduction);
        
        if (filingStatus === 'single') {
            if (federalTaxable > 609350) federalTaxAnnual = (federalTaxable - 609350) * 0.37 + 183647;
            else if (federalTaxable > 243725) federalTaxAnnual = (federalTaxable - 243725) * 0.35 + 55678;
            else if (federalTaxable > 191950) federalTaxAnnual = (federalTaxable - 191950) * 0.32 + 39110;
            else if (federalTaxable > 100525) federalTaxAnnual = (federalTaxable - 100525) * 0.24 + 17168;
            else if (federalTaxable > 47150) federalTaxAnnual = (federalTaxable - 47150) * 0.22 + 5426;
            else if (federalTaxable > 11600) federalTaxAnnual = (federalTaxable - 11600) * 0.12 + 1160;
            else federalTaxAnnual = federalTaxable * 0.10;
        } else {
            // Married Filing Jointly (2024)
            if (federalTaxable > 731200) federalTaxAnnual = (federalTaxable - 731200) * 0.37 + 186601;
            else if (federalTaxable > 487450) federalTaxAnnual = (federalTaxable - 487450) * 0.35 + 101304;
            else if (federalTaxable > 383900) federalTaxAnnual = (federalTaxable - 383900) * 0.32 + 68170;
            else if (federalTaxable > 201050) federalTaxAnnual = (federalTaxable - 201050) * 0.24 + 24286;
            else if (federalTaxable > 94300) federalTaxAnnual = (federalTaxable - 94300) * 0.22 + 10852;
            else if (federalTaxable > 23200) federalTaxAnnual = (federalTaxable - 23200) * 0.12 + 2320;
            else federalTaxAnnual = federalTaxable * 0.10;
        }
    }

    // 4. FICA Taxes (Social Security + Medicare)
    // FICA is usually based on Gross Pay (before 401k).
    let socialSecurityTax = 0;
    let medicareTax = 0;
    
    if (ficaEnabled) {
        // Social Security: 6.2% up to $168,600 (2024 limit)
        const ssWageBase = Math.min(annualGross, 168600);
        socialSecurityTax = ssWageBase * 0.062;

        // Medicare: 1.45% on all earnings + 0.9% Additional Medicare Tax over threshold
        medicareTax = annualGross * 0.0145;
        const addMedThreshold = filingStatus === 'single' ? 200000 : 250000;
        if (annualGross > addMedThreshold) {
            medicareTax += (annualGross - addMedThreshold) * 0.009;
        }
    }

    // 5. State Tax (Simplified Estimation)
    let stateTaxAnnual = 0;
    if (stateTaxEnabled && !STATES_NO_INCOME_TAX.includes(state)) {
        // Using taxable income (after pre-tax deductions)
        const stateTaxable = Math.max(0, taxableIncome - 4000); // Dummy standard deduction
        if (state === 'CA' || state === 'NY' || state === 'HI') { 
             stateTaxAnnual = stateTaxable * 0.06; // High tax estimate
        } else {
             stateTaxAnnual = stateTaxable * 0.04; // Average tax estimate
        }
    }

    // 6. Post-Tax Deductions
    const annualPostTaxDeductions = postTaxDeductionsMonthly * 12;

    // 7. Totals
    const totalTaxAnnual = federalTaxAnnual + stateTaxAnnual + socialSecurityTax + medicareTax;
    const totalDeductionsAnnual = totalPreTaxDeductions + annualPostTaxDeductions;
    
    // Net Pay = Gross - Taxes - All Deductions
    const netPayAnnual = Math.max(0, annualGross - totalTaxAnnual - totalDeductionsAnnual);

    return {
        annualGross,
        preTaxDeductions: totalPreTaxDeductions,
        postTaxDeductions: annualPostTaxDeductions,
        federalTaxAnnual,
        stateTaxAnnual,
        socialSecurityTax,
        medicareTax,
        totalTaxAnnual,
        netPayAnnual,
        
        // Periodic Net Pay
        netMonthly: netPayAnnual / 12,
        netBiweekly: netPayAnnual / 26,
        netWeekly: netPayAnnual / 52,
    };

  }, [incomeType, inputValue, hoursPerWeek, weeksPerYear, bonus, preTaxDeductions, postTaxDeductionsMonthly, filingStatus, state, federalTaxEnabled, stateTaxEnabled, ficaEnabled]);

  const chartData = [
    { name: 'Net Pay', value: result.netPayAnnual },
    { name: 'Federal Tax', value: result.federalTaxAnnual },
    { name: 'State Tax', value: result.stateTaxAnnual },
    { name: 'FICA', value: result.socialSecurityTax + result.medicareTax },
    { name: 'Pre-Tax Ded.', value: result.preTaxDeductions },
    { name: 'Post-Tax Ded.', value: result.postTaxDeductions },
  ].filter(item => item.value > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Income & Deductions</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="incomeType">Income Type</Label>
              <Select value={incomeType} onValueChange={setIncomeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Salary</SelectItem>
                  <SelectItem value="hourly">Hourly Wage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="inputValue">{incomeType === 'annual' ? 'Annual Salary' : 'Hourly Wage'}</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                    id="inputValue"
                    type="number"
                    min={0}
                    placeholder="e.g., 60000"
                    value={inputValue}
                    onChange={(e) => setInputValue(Math.max(0, Number(e.target.value)))}
                    className="pl-7"
                />
              </div>
            </div>

            {incomeType === 'hourly' && (
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
                    </div>
                </div>
            )}

            <div>
              <Label htmlFor="bonus">Bonus / Extra Income (Yearly)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                    id="bonus"
                    type="number"
                    min={0}
                    placeholder="e.g., 5000"
                    value={bonus}
                    onChange={(e) => setBonus(Math.max(0, Number(e.target.value)))}
                    className="pl-7"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="preTaxDeductions">Pre-tax Deductions (Annual Total)</Label>
              <p className="text-xs text-gray-500 mb-1">401k, HSA, FSA, etc.</p>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                    id="preTaxDeductions"
                    type="number"
                    min={0}
                    placeholder="e.g., 0"
                    value={preTaxDeductions}
                    onChange={(e) => setPreTaxDeductions(Math.max(0, Number(e.target.value)))}
                    className="pl-7"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="postTaxDeductions">Post-tax Deductions (Monthly Total)</Label>
              <p className="text-xs text-gray-500 mb-1">Health insurance, uniform, etc.</p>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                    id="postTaxDeductions"
                    type="number"
                    min={0}
                    placeholder="e.g., 0"
                    value={postTaxDeductionsMonthly}
                    onChange={(e) => setPostTaxDeductionsMonthly(Math.max(0, Number(e.target.value)))}
                    className="pl-7"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Post-tax deductions reduce net pay after taxes.</p>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Tax Profile</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="filingStatus">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">No State Tax</SelectItem>
                  <SelectItem value="AL">Alabama</SelectItem>
                  <SelectItem value="AK">Alaska</SelectItem>
                  <SelectItem value="AZ">Arizona</SelectItem>
                  <SelectItem value="AR">Arkansas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="CO">Colorado</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                  <SelectItem value="DE">Delaware</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="GA">Georgia</SelectItem>
                  <SelectItem value="HI">Hawaii</SelectItem>
                  <SelectItem value="ID">Idaho</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="IN">Indiana</SelectItem>
                  <SelectItem value="IA">Iowa</SelectItem>
                  <SelectItem value="KS">Kansas</SelectItem>
                  <SelectItem value="KY">Kentucky</SelectItem>
                  <SelectItem value="LA">Louisiana</SelectItem>
                  <SelectItem value="ME">Maine</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="MI">Michigan</SelectItem>
                  <SelectItem value="MN">Minnesota</SelectItem>
                  <SelectItem value="MS">Mississippi</SelectItem>
                  <SelectItem value="MO">Missouri</SelectItem>
                  <SelectItem value="MT">Montana</SelectItem>
                  <SelectItem value="NE">Nebraska</SelectItem>
                  <SelectItem value="NV">Nevada</SelectItem>
                  <SelectItem value="NH">New Hampshire</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="NM">New Mexico</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NC">North Carolina</SelectItem>
                  <SelectItem value="ND">North Dakota</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                  <SelectItem value="OK">Oklahoma</SelectItem>
                  <SelectItem value="OR">Oregon</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                  <SelectItem value="RI">Rhode Island</SelectItem>
                  <SelectItem value="SC">South Carolina</SelectItem>
                  <SelectItem value="SD">South Dakota</SelectItem>
                  <SelectItem value="TN">Tennessee</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="UT">Utah</SelectItem>
                  <SelectItem value="VT">Vermont</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="WA">Washington</SelectItem>
                  <SelectItem value="WV">West Virginia</SelectItem>
                  <SelectItem value="WI">Wisconsin</SelectItem>
                  <SelectItem value="WY">Wyoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2">
             <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={federalTaxEnabled} onChange={(e) => setFederalTaxEnabled(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">Federal Tax</span>
             </label>
             <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={stateTaxEnabled} onChange={(e) => setStateTaxEnabled(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">State Tax</span>
             </label>
             <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={ficaEnabled} onChange={(e) => setFicaEnabled(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">FICA (Social Security & Medicare)</span>
             </label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Primary Result Card */}
        <div className="bg-green-50 p-8 rounded-lg border border-green-100 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Estimated Monthly Take-Home</h2>
          <div className="text-5xl font-bold text-green-700 mb-2">
            {formatCurrency(result.netMonthly)}
          </div>
          <div className="text-green-800 font-medium mb-6">
            Annual Take-Home: {formatCurrency(result.netPayAnnual)}
          </div>
          
          <div className="flex justify-center gap-4">
             <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                    navigator.clipboard.writeText(`My estimated take-home pay is ${formatCurrency(result.netMonthly)} per month.`);
                    alert("Copied to clipboard!");
                }}
             >
               Copy Result
             </Button>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid md:grid-cols-2 gap-8">
            {/* Paycheck Period Breakdown */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Paycheck Schedule</h3>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Monthly</span>
                        <span className="font-bold text-lg">{formatCurrency(result.netMonthly)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Bi-Weekly (26/yr)</span>
                        <span className="font-bold text-lg">{formatCurrency(result.netBiweekly)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Weekly</span>
                        <span className="font-bold text-lg">{formatCurrency(result.netWeekly)}</span>
                    </div>
                </div>
            </div>

            {/* Annual Breakdown */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Detailed Breakdown (Annual)</h3>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">Gross Income</span>
                        <span className="font-bold">{formatCurrency(result.annualGross)}</span>
                    </div>
                    
                    {result.preTaxDeductions > 0 && (
                         <div className="flex justify-between text-gray-600 text-sm">
                            <span>Pre-Tax Deductions</span>
                            <span>-{formatCurrency(result.preTaxDeductions)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-red-600 text-sm">
                        <span>Federal Tax</span>
                        <span>-{formatCurrency(result.federalTaxAnnual)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 text-sm">
                        <span>State Tax ({state})</span>
                        <span>-{formatCurrency(result.stateTaxAnnual)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 text-sm">
                        <span>FICA (SS + Medicare)</span>
                        <span>-{formatCurrency(result.socialSecurityTax + result.medicareTax)}</span>
                    </div>
                    
                    {result.postTaxDeductions > 0 && (
                        <div className="flex justify-between text-purple-600 text-sm">
                            <span>Post-Tax Deductions</span>
                            <span>-{formatCurrency(result.postTaxDeductions)}</span>
                        </div>
                    )}
                    
                    <div className="flex justify-between pt-2 font-bold text-lg mt-2 text-green-700">
                        <span>Net Take-Home Pay</span>
                        <span>{formatCurrency(result.netPayAnnual)}</span>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Visualization */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Income Distribution</h3>
            <div className="h-[300px] min-h-[300px]">
                <ClientOnlyChart className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
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
                        Your take-home pay is approximately <strong>{((result.netPayAnnual / result.annualGross) * 100).toFixed(1)}%</strong> of your gross income.
                    </span>
                </li>
                {result.postTaxDeductions > 0 && (
                     <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            Post-tax deductions (like insurance) reduce your monthly net pay by <strong>{formatCurrency(result.postTaxDeductions / 12)}</strong>.
                        </span>
                    </li>
                )}
                {result.preTaxDeductions > 0 && (
                    <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>
                            Contributing <strong>{formatCurrency(result.preTaxDeductions)}</strong> to pre-tax accounts lowers your taxable income, saving you money on income taxes.
                        </span>
                    </li>
                )}
            </ul>
        </div>

      </div>

      {result && (
        <StickyResultBar
          label="Take-Home Pay"
          value={result.netMonthly}
          suffix="/month"
          secondaryLabel="Annual"
          secondaryValue={result.netPayAnnual}
          triggerRef={resultCardRef}
          onCopy={() => {
            const text = `Gross: ${formatCurrency(result.annualGross)}\nPre-Tax: ${formatCurrency(result.preTaxDeductions)}\nTaxes: ${formatCurrency(result.totalTaxAnnual)}\nPost-Tax: ${formatCurrency(result.postTaxDeductions)}\nNet Monthly: ${formatCurrency(result.netMonthly)}\nNet Annual: ${formatCurrency(result.netPayAnnual)}`;
            navigator.clipboard.writeText(text);
            alert("Copied summary to clipboard!");
          }}
        />
      )}
    </div>
  );
}
