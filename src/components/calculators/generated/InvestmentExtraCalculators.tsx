"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateCompoundInterest } from '@/lib/calculators/finance';
import { fmtPct, nn } from '@/components/calculators/generated/utils';

export function FutureValueCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(20);
  const result = useMemo(
    () => calculateCompoundInterest(nn(principal), nn(monthlyContribution), nn(annualRate), nn(years)),
    [principal, monthlyContribution, annualRate, years]
  );
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Starting Amount ($)</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Contribution ($)</Label>
            <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Return (%)</Label>
            <Input type="number" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Future Value</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(result.finalBalance)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">Total Contributions</span>
              <span className="font-bold">{formatCurrency(result.totalPrincipal)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Total Interest</span>
              <span className="font-bold">{formatCurrency(result.totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState(50000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const pv = nn(futureValue) / Math.pow(1 + nn(rate) / 100, nn(years));
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Future Value ($)</Label>
            <Input type="number" value={futureValue} onChange={(e) => setFutureValue(Number(e.target.value))} />
          </div>
          <div>
            <Label>Discount Rate (%/yr)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Present Value</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(pv)}</div>
        </div>
      </div>
    </div>
  );
}

export function NetPresentValueCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [annualCashFlow, setAnnualCashFlow] = useState(18000);
  const [years, setYears] = useState(10);
  const [discountRate, setDiscountRate] = useState(8);
  const [terminalValue, setTerminalValue] = useState(0);

  const npv = useMemo(() => {
    const r = nn(discountRate) / 100;
    const n = Math.max(0, Math.floor(nn(years)));
    let value = -nn(initialInvestment);
    for (let t = 1; t <= n; t++) {
      value += nn(annualCashFlow) / Math.pow(1 + r, t);
    }
    if (n > 0 && nn(terminalValue) !== 0) {
      value += nn(terminalValue) / Math.pow(1 + r, n);
    }
    return value;
  }, [annualCashFlow, discountRate, initialInvestment, terminalValue, years]);

  const verdict = npv > 0 ? 'Positive NPV' : npv < 0 ? 'Negative NPV' : 'Break-even';

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Initial Investment ($)</Label>
            <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Net Cash Flow ($)</Label>
            <Input type="number" value={annualCashFlow} onChange={(e) => setAnnualCashFlow(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
          <div>
            <Label>Discount Rate (%/yr)</Label>
            <Input type="number" step="0.1" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Terminal Value (Optional) ($)</Label>
            <Input type="number" value={terminalValue} onChange={(e) => setTerminalValue(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Net Present Value (NPV)</h2>
          <div className={`text-5xl font-bold ${npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(npv)}</div>
          <div className="mt-3 text-lg text-blue-900">
            <span className="font-bold">{verdict}</span> at {discountRate.toFixed(2)}% discount rate
          </div>
          <div className="mt-4 text-sm text-gray-600">
            NPV discounts future cash flows back to today. Positive NPV can indicate the investment clears your required return (discount rate).
          </div>
        </div>
      </div>
    </div>
  );
}

export function CAGRCalculator() {
  const [start, setStart] = useState(10000);
  const [end, setEnd] = useState(18000);
  const [years, setYears] = useState(5);
  const cagr = start > 0 && years > 0 ? (Math.pow(nn(end) / nn(start), 1 / nn(years)) - 1) * 100 : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Starting Value ($)</Label>
            <Input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
          </div>
          <div>
            <Label>Ending Value ($)</Label>
            <Input type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">CAGR</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(cagr)}</div>
        </div>
      </div>
    </div>
  );
}

export function RuleOf72Calculator() {
  const [rate, setRate] = useState(8);
  const years = rate > 0 ? 72 / nn(rate) : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Return Rate (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Years to Double</h2>
          <div className="text-6xl font-bold text-blue-700">{years.toFixed(1)} years</div>
        </div>
      </div>
    </div>
  );
}

export function DividendYieldCalculator() {
  const [annualDividend, setAnnualDividend] = useState(2.4);
  const [price, setPrice] = useState(60);
  const yieldPct = price > 0 ? (nn(annualDividend) / nn(price)) * 100 : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Dividend ($/share)</Label>
            <Input type="number" step="0.01" value={annualDividend} onChange={(e) => setAnnualDividend(Number(e.target.value))} />
          </div>
          <div>
            <Label>Share Price ($)</Label>
            <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Dividend Yield</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(yieldPct)}</div>
        </div>
      </div>
    </div>
  );
}

export function DividendGrowthCalculator() {
  const [currentDividend, setCurrentDividend] = useState(2);
  const [growth, setGrowth] = useState(7);
  const [years, setYears] = useState(10);
  const futureDividend = nn(currentDividend) * Math.pow(1 + nn(growth) / 100, nn(years));
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Current Dividend ($/share/year)</Label>
            <Input type="number" step="0.01" value={currentDividend} onChange={(e) => setCurrentDividend(Number(e.target.value))} />
          </div>
          <div>
            <Label>Dividend Growth (%/yr)</Label>
            <Input type="number" step="0.1" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Projected Dividend</h2>
          <div className="text-5xl font-bold text-blue-700">${futureDividend.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export function DividendReinvestmentCalculator() {
  const [principal, setPrincipal] = useState(25000);
  const [priceReturn, setPriceReturn] = useState(7);
  const [dividendYield, setDividendYield] = useState(3);
  const [years, setYears] = useState(20);
  const result = useMemo(() => calculateCompoundInterest(nn(principal), 0, nn(priceReturn) + nn(dividendYield), nn(years)), [principal, priceReturn, dividendYield, years]);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Starting Investment ($)</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          </div>
          <div>
            <Label>Price Return (%/yr)</Label>
            <Input type="number" step="0.1" value={priceReturn} onChange={(e) => setPriceReturn(Number(e.target.value))} />
          </div>
          <div>
            <Label>Dividend Yield (%/yr)</Label>
            <Input type="number" step="0.1" value={dividendYield} onChange={(e) => setDividendYield(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Ending Value (Reinvested)</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(result.finalBalance)}</div>
        </div>
      </div>
    </div>
  );
}

export function FeeImpactCalculator({ label }: { label: string }) {
  const [balance, setBalance] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [grossReturn, setGrossReturn] = useState(7);
  const [feeRate, setFeeRate] = useState(1);
  const [years, setYears] = useState(25);
  const noFee = useMemo(() => calculateCompoundInterest(nn(balance), nn(monthlyContribution), nn(grossReturn), nn(years)), [balance, monthlyContribution, grossReturn, years]);
  const withFee = useMemo(() => calculateCompoundInterest(nn(balance), nn(monthlyContribution), Math.max(0, nn(grossReturn) - nn(feeRate)), nn(years)), [balance, monthlyContribution, grossReturn, feeRate, years]);
  const diff = noFee.finalBalance - withFee.finalBalance;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Starting Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Contribution ($)</Label>
            <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gross Return (%/yr)</Label>
              <Input type="number" step="0.1" value={grossReturn} onChange={(e) => setGrossReturn(Number(e.target.value))} />
            </div>
            <div>
              <Label>{label} (%/yr)</Label>
              <Input type="number" step="0.1" value={feeRate} onChange={(e) => setFeeRate(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Impact of Fees</h2>
          <div className="text-4xl font-bold text-blue-700">{formatCurrency(diff)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-700">
              <span className="block font-medium">No Fees</span>
              <span className="font-bold">{formatCurrency(noFee.finalBalance)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">With Fees</span>
              <span className="font-bold">{formatCurrency(withFee.finalBalance)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InflationAdjustedReturnCalculator() {
  const [nominal, setNominal] = useState(8);
  const [inflation, setInflation] = useState(3);
  const real = ((1 + nn(nominal) / 100) / (1 + nn(inflation) / 100) - 1) * 100;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Nominal Return (%/yr)</Label>
            <Input type="number" step="0.1" value={nominal} onChange={(e) => setNominal(Number(e.target.value))} />
          </div>
          <div>
            <Label>Inflation Rate (%/yr)</Label>
            <Input type="number" step="0.1" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Real Return (After Inflation)</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(real)}</div>
        </div>
      </div>
    </div>
  );
}

export function StockAveragePriceCalculator() {
  const [shares1, setShares1] = useState(10);
  const [price1, setPrice1] = useState(50);
  const [shares2, setShares2] = useState(15);
  const [price2, setPrice2] = useState(40);
  const totalShares = nn(shares1) + nn(shares2);
  const totalCost = nn(shares1) * nn(price1) + nn(shares2) * nn(price2);
  const avg = totalShares > 0 ? totalCost / totalShares : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Purchase 1</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Shares</Label>
              <Input type="number" value={shares1} onChange={(e) => setShares1(Number(e.target.value))} />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input type="number" step="0.01" value={price1} onChange={(e) => setPrice1(Number(e.target.value))} />
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mt-4">Purchase 2</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Shares</Label>
              <Input type="number" value={shares2} onChange={(e) => setShares2(Number(e.target.value))} />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input type="number" step="0.01" value={price2} onChange={(e) => setPrice2(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Average Cost per Share</h2>
          <div className="text-6xl font-bold text-blue-700">${avg.toFixed(2)}</div>
          <div className="mt-4 text-sm text-blue-900">Total shares: <span className="font-semibold">{totalShares}</span> · Total cost: <span className="font-semibold">{formatCurrency(totalCost)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function PaybackPeriodCalculator() {
  const [initialCost, setInitialCost] = useState(50000);
  const [annualCashFlow, setAnnualCashFlow] = useState(12500);
  const years = annualCashFlow > 0 ? nn(initialCost) / nn(annualCashFlow) : Infinity;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Initial Investment ($)</Label>
            <Input type="number" value={initialCost} onChange={(e) => setInitialCost(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Cash Flow ($)</Label>
            <Input type="number" value={annualCashFlow} onChange={(e) => setAnnualCashFlow(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Payback Period</h2>
          <div className="text-6xl font-bold text-blue-700">{Number.isFinite(years) ? `${years.toFixed(1)} years` : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

export function CryptoReturnCalculator() {
  const [buyPrice, setBuyPrice] = useState(40000);
  const [sellPrice, setSellPrice] = useState(60000);
  const [quantity, setQuantity] = useState(0.1);
  const [fees, setFees] = useState(25);

  const cost = nn(buyPrice) * nn(quantity);
  const proceeds = nn(sellPrice) * nn(quantity);
  const netProfit = proceeds - cost - nn(fees);
  const roi = cost > 0 ? (netProfit / cost) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Buy Price ($)</Label>
            <Input type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Sell Price ($)</Label>
            <Input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input type="number" step="0.0001" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
          <div>
            <Label>Transaction Fees ($)</Label>
            <Input type="number" value={fees} onChange={(e) => setFees(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Net Profit/Loss</h2>
          <div className={`text-5xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(netProfit)}
          </div>
          <div className="mt-4 text-lg text-blue-900">
            ROI: <span className="font-bold">{roi.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BondYieldCalculator() {
  const [price, setPrice] = useState(950);
  const [couponRate, setCouponRate] = useState(5);
  const [parValue, setParValue] = useState(1000);
  const [yearsToMaturity, setYearsToMaturity] = useState(10);

  const currentYield = (nn(parValue) * (nn(couponRate) / 100)) / nn(price) * 100;
  // Simplified YTM formula
  const ytm = (nn(parValue) * (nn(couponRate) / 100) + (nn(parValue) - nn(price)) / nn(yearsToMaturity)) / ((nn(parValue) + nn(price)) / 2) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Bond Price ($)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Coupon Rate (%)</Label>
            <Input type="number" step="0.1" value={couponRate} onChange={(e) => setCouponRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Par Value ($)</Label>
            <Input type="number" value={parValue} onChange={(e) => setParValue(Number(e.target.value))} />
          </div>
          <div>
            <Label>Years to Maturity</Label>
            <Input type="number" value={yearsToMaturity} onChange={(e) => setYearsToMaturity(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Yield to Maturity (YTM)</h2>
          <div className="text-6xl font-bold text-blue-700">{ytm.toFixed(2)}%</div>
          <div className="mt-4 text-lg text-blue-900">
            Current Yield: <span className="font-bold">{currentYield.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnnuityCalculator() {
  const [payment, setPayment] = useState(1000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(20);
  const [frequency, setFrequency] = useState(12);

  const fv = useMemo(() => {
    const r = nn(rate) / 100 / nn(frequency);
    const n = nn(years) * nn(frequency);
    const pmt = nn(payment);
    if (r === 0) return pmt * n;
    return pmt * ((Math.pow(1 + r, n) - 1) / r);
  }, [payment, rate, years, frequency]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Periodic Payment ($)</Label>
            <Input type="number" value={payment} onChange={(e) => setPayment(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Return (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Years</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div>
              <Label>Frequency (per yr)</Label>
              <Input type="number" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Future Value of Annuity</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(fv)}</div>
        </div>
      </div>
    </div>
  );
}

export function AnnuityPayoutCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const [frequency, setFrequency] = useState(12);

  const pmt = useMemo(() => {
    const r = nn(rate) / 100 / nn(frequency);
    const n = nn(years) * nn(frequency);
    const pv = nn(principal);
    if (r === 0) return pv / n;
    return (pv * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [principal, rate, years, frequency]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Initial Principal ($)</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          </div>
          <div>
            <Label>Annual Return (%)</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Years to Payout</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div>
              <Label>Frequency (per yr)</Label>
              <Input type="number" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Periodic Payout</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(pmt)}</div>
          <div className="mt-4 text-sm text-blue-900">Total payout over time: <span className="font-bold">{formatCurrency(pmt * nn(years) * nn(frequency))}</span></div>
        </div>
      </div>
    </div>
  );
}

