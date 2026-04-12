"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan } from '@/lib/calculators/loan';
import { clamp, nn } from '@/components/calculators/generated/utils';

export function DownPaymentCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPercent, setDownPercent] = useState(20);

  const downPayment = nn(homePrice) * (clamp(downPercent, 0, 100) / 100);
  const loanAmount = Math.max(0, nn(homePrice) - downPayment);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label>Home Price ($)</Label>
              <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
            </div>
            <div>
              <Label>Down Payment (%)</Label>
              <Input type="number" step="0.1" value={downPercent} onChange={(e) => setDownPercent(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Down Payment</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(downPayment)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Estimated Loan Amount: <span className="font-bold">{formatCurrency(loanAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PMICalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPercent, setDownPercent] = useState(10);
  const [pmiRate, setPmiRate] = useState(0.7);

  const downPayment = nn(homePrice) * (clamp(downPercent, 0, 100) / 100);
  const loanAmount = Math.max(0, nn(homePrice) - downPayment);
  const monthlyPmi = (loanAmount * (nn(pmiRate) / 100)) / 12;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Price ($)</Label>
            <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Down Payment (%)</Label>
            <Input type="number" step="0.1" value={downPercent} onChange={(e) => setDownPercent(Number(e.target.value))} />
          </div>
          <div>
            <Label>PMI Rate (% per year)</Label>
            <Input type="number" step="0.01" value={pmiRate} onChange={(e) => setPmiRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Monthly PMI</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(monthlyPmi)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Loan Amount</span>
              <span className="font-bold">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Down Payment</span>
              <span className="font-bold">{formatCurrency(downPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClosingCostsCalculator() {
  const [price, setPrice] = useState(400000);
  const [rate, setRate] = useState(3);
  const closingCosts = nn(price) * (clamp(rate, 0, 20) / 100);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Price ($)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Closing Cost Rate (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Closing Costs</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(closingCosts)}</div>
          <div className="mt-3 text-sm text-blue-900">Typical ranges are often 2%–5% depending on lender and location.</div>
        </div>
      </div>
    </div>
  );
}

export function MortgagePointsCalculator() {
  const [loanAmount, setLoanAmount] = useState(350000);
  const [points, setPoints] = useState(1);
  const [monthlySavings, setMonthlySavings] = useState(60);
  const pointsCost = nn(loanAmount) * (clamp(points, 0, 10) / 100);
  const breakEvenMonths = monthlySavings > 0 ? pointsCost / nn(monthlySavings) : Infinity;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Points (1 point = 1%)</Label>
            <Input type="number" step="0.1" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
          </div>
          <div>
            <Label>Estimated Monthly Savings ($)</Label>
            <Input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Upfront Points Cost</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(pointsCost)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Break-even: <span className="font-bold">{Number.isFinite(breakEvenMonths) ? `${Math.ceil(breakEvenMonths)} months` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MortgageRateComparisonCalculator() {
  const [loanAmount, setLoanAmount] = useState(350000);
  const [rateA, setRateA] = useState(6.25);
  const [rateB, setRateB] = useState(5.75);
  const [termYears, setTermYears] = useState(30);
  const a = useMemo(() => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(rateA), loanTermYears: nn(termYears) }), [loanAmount, rateA, termYears]);
  const b = useMemo(() => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(rateB), loanTermYears: nn(termYears) }), [loanAmount, rateB, termYears]);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Loan Term (Years)</Label>
            <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
          </div>
          <div>
            <Label>Rate A (%)</Label>
            <Input type="number" step="0.01" value={rateA} onChange={(e) => setRateA(Number(e.target.value))} />
          </div>
          <div>
            <Label>Rate B (%)</Label>
            <Input type="number" step="0.01" value={rateB} onChange={(e) => setRateB(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">Option A</div>
            <div className="mt-2 text-3xl font-bold text-blue-700">{formatCurrency(a.monthlyPayment)}</div>
            <div className="mt-3 text-sm text-blue-900">Total interest: <span className="font-semibold">{formatCurrency(a.totalInterest)}</span></div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">Option B</div>
            <div className="mt-2 text-3xl font-bold text-blue-700">{formatCurrency(b.monthlyPayment)}</div>
            <div className="mt-3 text-sm text-blue-900">Total interest: <span className="font-semibold">{formatCurrency(b.totalInterest)}</span></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
          <div className="text-sm text-gray-600">Monthly difference</div>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(Math.abs(a.monthlyPayment - b.monthlyPayment))}</div>
        </div>
      </div>
    </div>
  );
}

export function VaLoanCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [fundingFeePct, setFundingFeePct] = useState(2.15);
  const [interestRate, setInterestRate] = useState(6.25);
  const [termYears, setTermYears] = useState(30);

  const fundingFee = nn(homePrice) * (nn(fundingFeePct) / 100);
  const loanAmount = nn(homePrice) + fundingFee;
  const result = useMemo(() => calculateLoan({ loanAmount, interestRate: nn(interestRate), loanTermYears: nn(termYears) }), [loanAmount, interestRate, termYears]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Price ($)</Label>
            <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>VA Funding Fee (%)</Label>
            <Input type="number" step="0.01" value={fundingFeePct} onChange={(e) => setFundingFeePct(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
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
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Loan Amount (inc. Fee)</span>
              <span className="font-bold">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Funding Fee</span>
              <span className="font-bold">{formatCurrency(fundingFee)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FhaLoanCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPercent, setDownPercent] = useState(3.5);
  const [interestRate, setInterestRate] = useState(6.5);
  const [mipRate, setMipRate] = useState(0.55);

  const downPayment = nn(homePrice) * (nn(downPercent) / 100);
  const baseLoan = nn(homePrice) - downPayment;
  const upfrontMip = baseLoan * 0.0175;
  const loanAmount = baseLoan + upfrontMip;
  const monthlyMip = (baseLoan * (nn(mipRate) / 100)) / 12;

  const result = useMemo(() => calculateLoan({ loanAmount, interestRate: nn(interestRate), loanTermYears: 30 }), [loanAmount, interestRate]);
  const totalMonthly = result.monthlyPayment + monthlyMip;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Price ($)</Label>
            <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Down Payment (%)</Label>
            <Input type="number" step="0.1" value={downPercent} onChange={(e) => setDownPercent(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual MIP (%)</Label>
            <Input type="number" step="0.01" value={mipRate} onChange={(e) => setMipRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Total Monthly Payment</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(totalMonthly)}</div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">P&I</span>
              <span className="font-bold">{formatCurrency(result.monthlyPayment)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Monthly MIP</span>
              <span className="font-bold">{formatCurrency(monthlyMip)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Down Payment</span>
              <span className="font-bold">{formatCurrency(downPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function pvOfAnnuity(payment: number, monthlyRate: number, n: number): number {
  if (monthlyRate === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + monthlyRate, -n))) / monthlyRate;
}

function estimateAprPct(params: { loanAmount: number; noteRatePct: number; termYears: number; totalFees: number }): number {
  const loanAmount = nn(params.loanAmount);
  const noteRatePct = nn(params.noteRatePct);
  const n = Math.max(1, Math.floor(nn(params.termYears) * 12));
  const totalFees = Math.max(0, nn(params.totalFees));

  const netProceeds = loanAmount - totalFees;
  if (loanAmount <= 0 || netProceeds <= 0) return 0;

  const payment = calculateLoan({ loanAmount, interestRate: noteRatePct, loanTermYears: n / 12 }).monthlyPayment;
  if (!Number.isFinite(payment) || payment <= 0) return 0;

  const targetPv = netProceeds;
  let lo = 0;
  let hi = 1;

  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const pv = pvOfAnnuity(payment, mid, n);
    if (pv > targetPv) lo = mid;
    else hi = mid;
  }

  const monthlyRate = (lo + hi) / 2;
  return monthlyRate * 12 * 100;
}

export function MortgageAprCalculator() {
  const [loanAmount, setLoanAmount] = useState(350000);
  const [noteRate, setNoteRate] = useState(6.25);
  const [termYears, setTermYears] = useState(30);
  const [pointsPct, setPointsPct] = useState(1);
  const [otherFees, setOtherFees] = useState(2500);

  const pointsCost = nn(loanAmount) * (clamp(pointsPct, 0, 10) / 100);
  const totalFees = pointsCost + Math.max(0, nn(otherFees));
  const payment = useMemo(
    () => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(noteRate), loanTermYears: nn(termYears) }).monthlyPayment,
    [loanAmount, noteRate, termYears]
  );
  const apr = useMemo(
    () => estimateAprPct({ loanAmount: nn(loanAmount), noteRatePct: nn(noteRate), termYears: nn(termYears), totalFees }),
    [loanAmount, noteRate, termYears, totalFees]
  );

  const netProceeds = Math.max(0, nn(loanAmount) - totalFees);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Note Rate (%)</Label>
            <Input type="number" step="0.01" value={noteRate} onChange={(e) => setNoteRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Term (Years)</Label>
            <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
          </div>
          <div>
            <Label>Discount Points (%)</Label>
            <Input type="number" step="0.1" value={pointsPct} onChange={(e) => setPointsPct(Number(e.target.value))} />
          </div>
          <div>
            <Label>Other Upfront Fees ($)</Label>
            <Input type="number" value={otherFees} onChange={(e) => setOtherFees(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated APR (Including Fees)</h2>
          <div className="text-6xl font-bold text-blue-700">{apr.toFixed(2)}%</div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Monthly P&amp;I</span>
              <span className="font-bold">{formatCurrency(payment)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Total Fees</span>
              <span className="font-bold">{formatCurrency(totalFees)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Net Proceeds</span>
              <span className="font-bold">{formatCurrency(netProceeds)}</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            This APR is an estimate using your note rate payment and the upfront fees. Lenders may calculate APR differently based on which fees are included.
          </div>
        </div>
      </div>
    </div>
  );
}

export function PropertyTaxCalculator() {
  const [homeValue, setHomeValue] = useState(450000);
  const [taxRate, setTaxRate] = useState(1.1);
  const [exemption, setExemption] = useState(0);

  const taxableValue = Math.max(0, nn(homeValue) - Math.max(0, nn(exemption)));
  const annualTax = taxableValue * (nn(taxRate) / 100);
  const monthlyTax = annualTax / 12;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Value ($)</Label>
            <Input type="number" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} />
          </div>
          <div>
            <Label>Property Tax Rate (% per year)</Label>
            <Input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Exemption / Reduction ($)</Label>
            <Input type="number" value={exemption} onChange={(e) => setExemption(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Property Taxes</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(annualTax)}/yr</div>
          <div className="mt-3 text-lg text-blue-900">
            Monthly escrow estimate: <span className="font-bold">{formatCurrency(monthlyTax)}/mo</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Taxable Value</span>
              <span className="font-bold">{formatCurrency(taxableValue)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Rate</span>
              <span className="font-bold">{taxRate.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

