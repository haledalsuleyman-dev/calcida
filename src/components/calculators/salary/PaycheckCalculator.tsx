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
import { loadCurrentTaxData, TaxBracket } from '@/lib/tax/us/taxData';

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];
const STATES_NO_INCOME_TAX = ['AK', 'FL', 'NV', 'SD', 'TN', 'TX', 'WA', 'WY', 'NH'];

interface PaycheckResult {
  grossPayPeriod: number;
  federalTaxPeriod: number;
  stateTaxPeriod: number;
  socialSecurityPeriod: number;
  medicarePeriod: number;
  additionalWithholdingPeriod: number;
  totalTaxPeriod: number;
  netPayPeriod: number;
  grossPayAnnual: number;
  netPayAnnual: number;
  netPayMonthly: number;
  totalTaxAnnual: number;
}

export function PaycheckCalculator() {
  // Income Inputs
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [grossPay, setGrossPay] = useState(60000);
  const [payRateType, setPayRateType] = useState('annual'); // annual, monthly, hourly
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  // Tax Inputs
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('CA'); // Default California for demo, or 'None'
  const [federalTaxEnabled, setFederalTaxEnabled] = useState(true);
  const [stateTaxEnabled, setStateTaxEnabled] = useState(true);
  const [ficaEnabled, setFicaEnabled] = useState(true);
  const [additionalWithholding, setAdditionalWithholding] = useState(0);

  const resultCardRef = useRef<HTMLDivElement | null>(null);

  // Constants for tax calculations (Simplified 2024 Estimates)
  const result = useMemo<PaycheckResult>(() => {
    const taxConfig = loadCurrentTaxData();
    // 1. Normalize Gross Pay to Annual
    let annualGross = 0;
    if (payRateType === 'annual') annualGross = grossPay;
    else if (payRateType === 'monthly') annualGross = grossPay * 12;
    else if (payRateType === 'hourly') annualGross = grossPay * hoursPerWeek * 52;
    
    // 2. Determine Pay Periods
    let periods = 26;
    if (payFrequency === 'weekly') periods = 52;
    else if (payFrequency === 'biweekly') periods = 26;
    else if (payFrequency === 'semimonthly') periods = 24;
    else if (payFrequency === 'monthly') periods = 12;
    else if (payFrequency === 'annual') periods = 1;

    const grossPerPeriod = annualGross / periods;

    // 3. Federal Tax Calculation
    let federalTaxAnnual = 0;
    if (federalTaxEnabled) {
        const standardDeduction = filingStatus === 'single' ? taxConfig.standardDeductions.single : taxConfig.standardDeductions.married;
        const taxableIncome = Math.max(0, annualGross - standardDeduction);
        const brackets: TaxBracket[] = filingStatus === 'single' ? taxConfig.brackets.single : taxConfig.brackets.married;
        let remaining = taxableIncome;
        let lowerBound = 0;
        for (const b of brackets) {
          if (remaining <= 0) break;
          const upper = b.upTo == null ? Infinity : b.upTo;
          const span = Math.max(0, Math.min(remaining, upper - lowerBound));
          if (span > 0) {
            federalTaxAnnual += span * b.rate;
            remaining -= span;
            lowerBound = upper;
          }
        }
    }

    // 4. FICA Taxes (Social Security + Medicare)
    let socialSecurityTax = 0;
    let medicareTax = 0;
    
    if (ficaEnabled) {
        const ssWageBase = Math.min(annualGross, taxConfig.ssWageBase);
        socialSecurityTax = ssWageBase * 0.062;

        medicareTax = annualGross * 0.0145;
        const addMedThreshold = filingStatus === 'single' ? taxConfig.medicareAdditionalThreshold.single : taxConfig.medicareAdditionalThreshold.married;
        if (annualGross > addMedThreshold) {
            medicareTax += (annualGross - addMedThreshold) * 0.009;
        }
    }

    // 5. State Tax (Very Simplified Estimation)
    let stateTaxAnnual = 0;
    if (stateTaxEnabled && !STATES_NO_INCOME_TAX.includes(state)) {
        // Flat estimate for demo purposes (e.g. 5% effective rate for taxed states)
        // In a real production app, this needs a full state tax engine.
        // We will use a progressive logic to make it feel realistic.
        const stateTaxable = Math.max(0, annualGross - 4000); // Dummy standard deduction
        if (state === 'CA' || state === 'NY' || state === 'HI') { // High tax states
             stateTaxAnnual = stateTaxable * 0.06; 
        } else {
             stateTaxAnnual = stateTaxable * 0.04; 
        }
    }

    // 6. Additional Withholding
    const annualAdditional = additionalWithholding * periods;

    // 7. Totals
    const totalTaxAnnual = federalTaxAnnual + stateTaxAnnual + socialSecurityTax + medicareTax + annualAdditional;
    const netPayAnnual = Math.max(0, annualGross - totalTaxAnnual);

    return {
        grossPayPeriod: grossPerPeriod,
        federalTaxPeriod: federalTaxAnnual / periods,
        stateTaxPeriod: stateTaxAnnual / periods,
        socialSecurityPeriod: socialSecurityTax / periods,
        medicarePeriod: medicareTax / periods,
        additionalWithholdingPeriod: additionalWithholding,
        totalTaxPeriod: totalTaxAnnual / periods,
        netPayPeriod: netPayAnnual / periods,
        
        grossPayAnnual: annualGross,
        netPayAnnual: netPayAnnual,
        netPayMonthly: netPayAnnual / 12,
        totalTaxAnnual: totalTaxAnnual
    };

  }, [grossPay, payRateType, hoursPerWeek, payFrequency, filingStatus, state, federalTaxEnabled, stateTaxEnabled, ficaEnabled, additionalWithholding]);

  const chartData = [
    { name: 'Net Pay', value: result.netPayPeriod },
    { name: 'Federal Tax', value: result.federalTaxPeriod },
    { name: 'State Tax', value: result.stateTaxPeriod },
    { name: 'FICA', value: result.socialSecurityPeriod + result.medicarePeriod },
  ].filter(item => item.value > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Income Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="grossPay">Gross Pay Amount</Label>
              <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <Input
                        id="grossPay"
                        type="number"
                        min={0}
                        placeholder="e.g., 2000"
                        value={grossPay}
                        onChange={(e) => setGrossPay(Math.max(0, Number(e.target.value)))}
                        className="pl-7"
                    />
                  </div>
                  <Select value={payRateType} onValueChange={setPayRateType}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Yearly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>

            {payRateType === 'hourly' && (
                <div>
                    <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                    <Input
                        id="hoursPerWeek"
                        type="number"
                        min={0}
                        placeholder="e.g., 40"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Math.max(0, Number(e.target.value)))}
                    />
                </div>
            )}

            <div>
              <Label htmlFor="payFrequency">Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={setPayFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly (52/yr)</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly (26/yr)</SelectItem>
                  <SelectItem value="semimonthly">Semi-Monthly (24/yr)</SelectItem>
                  <SelectItem value="monthly">Monthly (12/yr)</SelectItem>
                  <SelectItem value="annual">Annual (1/yr)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
          </div>
          
          <h3 className="font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Tax Settings</h3>
          <div className="space-y-3">
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
             
             <div className="pt-2">
                <Label htmlFor="additionalWithholding" className="text-xs">Additional Withholding ($)</Label>
                <Input
                    id="additionalWithholding"
                    type="number"
                    min={0}
                    placeholder="e.g., 0"
                    value={additionalWithholding}
                    onChange={(e) => setAdditionalWithholding(Math.max(0, Number(e.target.value)))}
                    className="mt-1 h-8"
                />
                <p className="text-xs text-gray-500 mt-1">Estimates only — actual withholding varies.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Primary Result Card */}
        <div ref={resultCardRef} className="bg-green-50 p-8 rounded-lg border border-green-100 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Estimated Take-Home Pay</h2>
          <div className="text-5xl font-bold text-green-700 mb-2">
            {formatCurrency(result.netPayPeriod)}
          </div>
          <div className="text-green-800 font-medium capitalize mb-6">
            per {payFrequency.replace('semimonthly', 'semi-monthly')} paycheck
          </div>
          
          <div className="flex justify-center gap-4">
             <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                    navigator.clipboard.writeText(`My estimated take-home pay is ${formatCurrency(result.netPayPeriod)} per paycheck.`);
                    alert("Copied to clipboard!");
                }}
             >
               Copy & Share
             </Button>
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Where Your Money Goes</h3>
                <div className="h-[250px] min-h-[250px]">
                    <ClientOnlyChart className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
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
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Paycheck Breakdown</h3>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">Gross Pay</span>
                        <span className="font-bold">{formatCurrency(result.grossPayPeriod)}</span>
                    </div>
                    
                    <div className="flex justify-between text-red-600 text-sm">
                        <span>Federal Tax</span>
                        <span>-{formatCurrency(result.federalTaxPeriod)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 text-sm">
                        <span>State Tax ({state})</span>
                        <span>-{formatCurrency(result.stateTaxPeriod)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 text-sm">
                        <span>Social Security</span>
                        <span>-{formatCurrency(result.socialSecurityPeriod)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 text-sm border-b border-gray-100 pb-2">
                        <span>Medicare</span>
                        <span>-{formatCurrency(result.medicarePeriod)}</span>
                    </div>
                    
                    <div className="flex justify-between pt-2 font-bold text-lg mt-2 text-green-700">
                        <span>Net Pay</span>
                        <span>{formatCurrency(result.netPayPeriod)}</span>
                    </div>
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
                        Taxes reduce your gross pay by approximately <strong>{((result.totalTaxAnnual / result.grossPayAnnual) * 100).toFixed(1)}%</strong>.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        Your estimated net monthly income is <strong>{formatCurrency(result.netPayMonthly)}</strong>.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        FICA taxes (Social Security & Medicare) account for <strong>{formatCurrency(result.socialSecurityPeriod + result.medicarePeriod)}</strong> of each paycheck.
                    </span>
                </li>
            </ul>
        </div>

      </div>

      {result && (
        <StickyResultBar
          label="Take-Home Pay (per paycheck)"
          value={result.netPayPeriod}
          secondaryLabel="Net monthly"
          secondaryValue={result.netPayMonthly}
          triggerRef={resultCardRef}
          onCopy={() => {
            const text = `Frequency: ${payFrequency}\nGross: ${formatCurrency(result.grossPayPeriod)}\nNet Paycheck: ${formatCurrency(result.netPayPeriod)}\nNet Monthly: ${formatCurrency(result.netPayMonthly)}\nTaxes Total: ${formatCurrency(result.totalTaxPeriod)}`;
            navigator.clipboard.writeText(text);
            alert("Copied summary to clipboard!");
          }}
        />
      )}
    </div>
  );
}
