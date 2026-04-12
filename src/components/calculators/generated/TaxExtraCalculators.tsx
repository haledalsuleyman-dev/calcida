"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { nn, fmtPct, clamp } from '@/components/calculators/generated/utils';
import { loadCurrentTaxData, type FilingStatus, type TaxBracket } from '@/lib/tax/us/taxData';

function taxFromBrackets(taxableIncome: number, brackets: TaxBracket[]): { total: number; marginalRate: number } {
  let remaining = taxableIncome;
  let lastCap = 0;
  let total = 0;
  let marginalRate = 0;
  for (const b of brackets) {
    if (remaining <= 0) break;
    const cap = b.upTo ?? Infinity;
    const width = Math.max(0, cap - lastCap);
    const amount = Math.min(width, remaining);
    total += amount * b.rate;
    marginalRate = b.rate;
    remaining -= amount;
    lastCap = cap;
  }
  return { total, marginalRate };
}

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(90000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const data = loadCurrentTaxData();
  const standardDeduction = data.standardDeductions[filingStatus];
  const taxable = Math.max(0, nn(income) - standardDeduction);
  const { total: tax, marginalRate } = taxFromBrackets(taxable, data.brackets[filingStatus]);
  const effective = income > 0 ? (tax / nn(income)) * 100 : 0;
  const afterTax = nn(income) - tax;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Income ($)</Label>
            <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
          <div>
            <Label>Filing Status</Label>
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white" value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Federal Income Tax</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(tax)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">After-Tax Income</span>
              <span className="font-bold">{formatCurrency(afterTax)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Marginal Rate</span>
              <span className="font-bold">{fmtPct(marginalRate * 100)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Effective Rate</span>
              <span className="font-bold">{fmtPct(effective)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Taxable Income</span>
              <span className="font-bold">{formatCurrency(taxable)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700">
          This estimate uses the standard deduction and progressive brackets. It does not include credits, itemized deductions, or state taxes.
        </div>
      </div>
    </div>
  );
}

export function SalesTaxCalculator() {
  const [price, setPrice] = useState(100);
  const [rate, setRate] = useState(8);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');

  const { finalPrice, taxAmount, basePrice } = useMemo(() => {
    const r = clamp(nn(rate), 0, 100) / 100;
    if (mode === 'forward') {
      const tax = nn(price) * r;
      return { basePrice: nn(price), taxAmount: tax, finalPrice: nn(price) + tax };
    } else {
      const base = nn(price) / (1 + r);
      return { basePrice: base, taxAmount: nn(price) - base, finalPrice: nn(price) };
    }
  }, [price, rate, mode]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div className="flex p-1 bg-gray-100 rounded-lg mb-4">
            <button
              onClick={() => setMode('forward')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'forward' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Add Tax
            </button>
            <button
              onClick={() => setMode('reverse')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'reverse' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Remove Tax
            </button>
          </div>
          <div>
            <Label>{mode === 'forward' ? 'Pre-Tax Price ($)' : 'Total Price (Tax Inclusive) ($)'}</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Sales Tax Rate (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            {mode === 'forward' ? 'Total Price' : 'Pre-Tax Price'}
          </h2>
          <div className="text-5xl font-bold text-blue-700">
            {formatCurrency(mode === 'forward' ? finalPrice : basePrice)}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Sales Tax</span>
              <span className="font-bold">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">
                {mode === 'forward' ? 'Pre-Tax' : 'Total'}
              </span>
              <span className="font-bold">
                {formatCurrency(mode === 'forward' ? basePrice : finalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CapitalGainsTaxCalculator() {
  const [buyPrice, setBuyPrice] = useState(50);
  const [sellPrice, setSellPrice] = useState(75);
  const [shares, setShares] = useState(100);
  const [taxRate, setTaxRate] = useState(15);
  const gain = (nn(sellPrice) - nn(buyPrice)) * nn(shares);
  const tax = Math.max(0, gain) * (clamp(nn(taxRate), 0, 50) / 100);
  const totalProceeds = nn(sellPrice) * nn(shares);
  const afterTaxProceeds = totalProceeds - tax;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Buy Price ($)</Label>
              <Input type="number" step="0.01" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} />
            </div>
            <div>
              <Label>Sell Price ($)</Label>
              <Input type="number" step="0.01" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Shares</Label>
              <Input type="number" value={shares} onChange={(e) => setShares(Number(e.target.value))} />
            </div>
            <div>
              <Label>Tax Rate (%)</Label>
              <Input type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Capital Gains Tax</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(tax)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Capital Gain</span>
              <span className="font-bold">{formatCurrency(gain)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">After-Tax Proceeds</span>
              <span className="font-bold">{formatCurrency(afterTaxProceeds)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SelfEmploymentTaxCalculator() {
  const [netEarnings, setNetEarnings] = useState(80000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const data = loadCurrentTaxData();
  const base = nn(netEarnings) * 0.9235;
  const ss = Math.min(base, data.ssWageBase) * 0.124;
  const medicare = base * 0.029;
  const threshold = data.medicareAdditionalThreshold[filingStatus];
  const additional = base > threshold ? (base - threshold) * 0.009 : 0;
  const total = ss + medicare + additional;
  const effective = netEarnings > 0 ? (total / nn(netEarnings)) * 100 : 0;
  const deductibleHalf = total / 2;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Net Self-Employment Income ($/year)</Label>
            <Input type="number" value={netEarnings} onChange={(e) => setNetEarnings(Number(e.target.value))} />
          </div>
          <div>
            <Label>Filing Status</Label>
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white" value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Self-Employment Tax</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(total)}</div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Social Security</span>
              <span className="font-bold">{formatCurrency(ss)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Medicare</span>
              <span className="font-bold">{formatCurrency(medicare + additional)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Deductible Half</span>
              <span className="font-bold text-green-600">{formatCurrency(deductibleHalf)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Effective</span>
              <span className="font-bold">{fmtPct(effective)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700">
          <p>
            <strong>Note:</strong> You can deduct 50% of your self-employment tax ({formatCurrency(deductibleHalf)}) from your gross income 
            when calculating your federal income tax. This is an "above-the-line" deduction.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EffectiveTaxRateCalculator() {
  const [taxes, setTaxes] = useState(18000);
  const [income, setIncome] = useState(90000);
  const rate = income > 0 ? (nn(taxes) / nn(income)) * 100 : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Total Taxes Paid ($)</Label>
            <Input type="number" value={taxes} onChange={(e) => setTaxes(Number(e.target.value))} />
          </div>
          <div>
            <Label>Total Gross Income ($)</Label>
            <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Effective Tax Rate</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(rate)}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700 space-y-3">
          <p>
            <strong>Effective vs. Marginal:</strong> Your effective tax rate is the actual percentage of your income that goes to the IRS. 
            It is almost always lower than your marginal tax bracket.
          </p>
          <p>
            While your <strong>marginal rate</strong> applies only to the very last dollar you earned, your <strong>effective rate</strong> accounts for 
            the fact that some of your income was taxed at 0% (deductions), some at 10%, some at 12%, and so on.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EstateTaxCalculator() {
  const [estateValue, setEstateValue] = useState(15000000);
  const [exemption, setExemption] = useState(13610000);

  const taxableEstate = Math.max(0, nn(estateValue) - nn(exemption));
  const estimatedTax = taxableEstate * 0.40; // Simplified 40% top rate

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Total Estate Value ($)</Label>
            <Input type="number" value={estateValue} onChange={(e) => setEstateValue(Number(e.target.value))} />
          </div>
          <div>
            <Label>Federal Exemption ($)</Label>
            <Input type="number" value={exemption} onChange={(e) => setExemption(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Federal Estate Tax</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(estimatedTax)}</div>
          <div className="mt-4 text-sm text-gray-600">
            Based on a simplified 40% top federal rate. Actual taxes may involve graduated brackets and state-level estate taxes.
          </div>
        </div>
      </div>
    </div>
  );
}

export function InheritanceTaxCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(4.5);

  const tax = nn(amount) * (nn(rate) / 100);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Inheritance Amount ($)</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Estimated State Tax Rate (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Inheritance Tax</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(tax)}</div>
          <div className="mt-4 text-sm text-gray-600">
            Inheritance tax depends on the state and your relationship to the deceased. Common rates range from 0% to 18%.
          </div>
        </div>
      </div>
    </div>
  );
}

export function GiftTaxCalculator() {
  const [giftAmount, setGiftAmount] = useState(50000);
  const [annualExclusion, setAnnualExclusion] = useState(18000);

  const taxableAmount = Math.max(0, nn(giftAmount) - nn(annualExclusion));

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Total Gift Amount ($)</Label>
            <Input type="number" value={giftAmount} onChange={(e) => setGiftAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Exclusion ($)</Label>
            <Input type="number" value={annualExclusion} onChange={(e) => setAnnualExclusion(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Amount Counting Against Lifetime Exemption</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(taxableAmount)}</div>
          <div className="mt-4 text-sm text-gray-600">
            Most individuals will not owe gift tax until they exceed their lifetime exemption ($13.61M in 2024), but gifts over the annual exclusion must be reported.
          </div>
        </div>
      </div>
    </div>
  );
}

export function TaxBracketCalculator() {
  const [taxableIncome, setTaxableIncome] = useState(90000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const data = loadCurrentTaxData();
  const brackets = data.brackets[filingStatus];

  const breakdown = useMemo(() => {
    let remaining = nn(taxableIncome);
    let lastCap = 0;
    const rows: { rate: number; amount: number; tax: number; cap: number | null }[] = [];
    let marginalRate = 0;
    let total = 0;

    for (const b of brackets) {
      if (remaining <= 0) break;
      const cap = b.upTo ?? Infinity;
      const width = Math.max(0, cap - lastCap);
      const amount = Math.min(width, remaining);
      const tax = amount * b.rate;
      if (amount > 0) marginalRate = b.rate;
      rows.push({ rate: b.rate, amount, tax, cap: Number.isFinite(cap) ? cap : null });
      total += tax;
      remaining -= amount;
      lastCap = cap;
    }

    const effective = nn(taxableIncome) > 0 ? (total / nn(taxableIncome)) * 100 : 0;
    return { rows, total, marginalRate, effective };
  }, [taxableIncome, brackets]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Taxable Income ($)</Label>
            <Input type="number" value={taxableIncome} onChange={(e) => setTaxableIncome(Number(e.target.value))} />
          </div>
          <div>
            <Label>Filing Status</Label>
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white" value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div className="text-xs text-gray-500">
            Uses federal brackets for the current tax data in the site. This does not include credits, itemized deductions, AMT, or state/local taxes.
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Tax by Bracket</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(breakdown.total)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Marginal Bracket</span>
              <span className="font-bold">{fmtPct(breakdown.marginalRate * 100)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Effective Rate</span>
              <span className="font-bold">{fmtPct(breakdown.effective)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm font-semibold text-gray-900 mb-4">Bracket Breakdown</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">Rate</th>
                  <th className="py-2 pr-4">Taxed Amount</th>
                  <th className="py-2 pr-4">Tax Owed</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.rows.map((r, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-2 pr-4 font-medium text-gray-900">{fmtPct(r.rate * 100)}</td>
                    <td className="py-2 pr-4 text-gray-700">{formatCurrency(r.amount)}</td>
                    <td className="py-2 pr-4 text-gray-700">{formatCurrency(r.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

