"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateLoan } from '@/lib/calculators/loan';
import { clamp, fmtPct, inverseAmortizedPrincipal, nn } from '@/components/calculators/generated/utils';

export function InterestOnlyMortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [rate, setRate] = useState(6);
  const [termYears, setTermYears] = useState(30);
  const [ioYears, setIoYears] = useState(5);

  const monthlyInterestOnly = nn(loanAmount) * (nn(rate) / 100 / 12);
  const remainingYears = Math.max(1, Math.floor(nn(termYears) - nn(ioYears)));
  const amortized = useMemo(
    () => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(rate), loanTermYears: remainingYears }),
    [loanAmount, rate, remainingYears]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Total Term (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
            <div>
              <Label>Interest-Only Years</Label>
              <Input type="number" value={ioYears} onChange={(e) => setIoYears(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Interest-Only Payment</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(monthlyInterestOnly)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Estimated later payment (amortized over {remainingYears} years): <span className="font-bold">{formatCurrency(amortized.monthlyPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ARMCalculator() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [termYears, setTermYears] = useState(30);
  const [initialRate, setInitialRate] = useState(5.5);
  const [fixedYears, setFixedYears] = useState(5);
  const [adjustedRate, setAdjustedRate] = useState(7);

  const initialLoan = useMemo(
    () => calculateLoan({ loanAmount: nn(loanAmount), interestRate: nn(initialRate), loanTermYears: nn(termYears) }),
    [loanAmount, initialRate, termYears]
  );

  const fixedMonths = Math.floor(nn(fixedYears) * 12);
  const remainingYears = Math.max(1, Math.floor(nn(termYears) - nn(fixedYears)));
  const lastIndex = Math.max(0, Math.min(initialLoan.amortizationSchedule.length - 1, fixedMonths - 1));
  const balanceAfterFixed = initialLoan.amortizationSchedule[lastIndex]?.remainingBalance ?? nn(loanAmount);
  const adjustedLoan = useMemo(
    () => calculateLoan({ loanAmount: nn(balanceAfterFixed), interestRate: nn(adjustedRate), loanTermYears: remainingYears }),
    [balanceAfterFixed, adjustedRate, remainingYears]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Total Term (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
            <div>
              <Label>Fixed Period (Years)</Label>
              <Input type="number" value={fixedYears} onChange={(e) => setFixedYears(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Initial Rate (%)</Label>
              <Input type="number" step="0.01" value={initialRate} onChange={(e) => setInitialRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Adjusted Rate (%)</Label>
              <Input type="number" step="0.01" value={adjustedRate} onChange={(e) => setAdjustedRate(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Payments</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Initial Payment</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(initialLoan.monthlyPayment)}</div>
              <div className="text-xs text-gray-600 mt-2">Based on {initialRate}% over {termYears} years</div>
            </div>
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Later Payment</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(adjustedLoan.monthlyPayment)}</div>
              <div className="text-xs text-gray-600 mt-2">After {fixedYears} years, based on {adjustedRate}% over {remainingYears} years</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-blue-900">
            Estimated balance after fixed period: <span className="font-semibold">{formatCurrency(balanceAfterFixed)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HELOCCalculator() {
  const [drawAmount, setDrawAmount] = useState(50000);
  const [rate, setRate] = useState(8);
  const [drawYears, setDrawYears] = useState(10);
  const [repayYears, setRepayYears] = useState(20);

  const drawPayment = nn(drawAmount) * (nn(rate) / 100 / 12);
  const repayLoan = useMemo(
    () => calculateLoan({ loanAmount: nn(drawAmount), interestRate: nn(rate), loanTermYears: nn(repayYears) }),
    [drawAmount, rate, repayYears]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Drawn Balance ($)</Label>
            <Input type="number" value={drawAmount} onChange={(e) => setDrawAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Draw Period (Years)</Label>
              <Input type="number" value={drawYears} onChange={(e) => setDrawYears(Number(e.target.value))} />
            </div>
            <div>
              <Label>Repayment Period (Years)</Label>
              <Input type="number" value={repayYears} onChange={(e) => setRepayYears(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated HELOC Payments</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Draw Period (Interest-Only)</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(drawPayment)}</div>
              <div className="text-xs text-gray-600 mt-2">Approx. interest-only for {drawYears} years</div>
            </div>
            <div className="bg-white rounded-lg border border-blue-100 p-5">
              <div className="text-xs uppercase tracking-wide text-gray-500">Repayment Period (Amortized)</div>
              <div className="text-3xl font-bold text-blue-700">{formatCurrency(repayLoan.monthlyPayment)}</div>
              <div className="text-xs text-gray-600 mt-2">Amortized over {repayYears} years</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(2400);
  const [rentGrowth, setRentGrowth] = useState(3);
  const [homePrice, setHomePrice] = useState(420000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [yearsToStay, setYearsToStay] = useState(7);
  const [homeAppreciation, setHomeAppreciation] = useState(3);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1);
  const [insuranceAnnual, setInsuranceAnnual] = useState(1800);
  const [maintenanceRate, setMaintenanceRate] = useState(1);

  const results = useMemo(() => {
    const years = Math.floor(clamp(nn(yearsToStay), 1, 30));
    const rent0 = nn(monthlyRent);
    const rg = clamp(nn(rentGrowth), 0, 20) / 100;
    let rentTotal = 0;
    for (let y = 0; y < years; y++) rentTotal += rent0 * 12 * Math.pow(1 + rg, y);

    const loanAmount = Math.max(0, nn(homePrice) - nn(downPayment));
    const loan = calculateLoan({ loanAmount, interestRate: nn(interestRate), loanTermYears: nn(termYears) });
    const months = Math.min(loan.amortizationSchedule.length, years * 12);
    const paymentsTotal = loan.monthlyPayment * months;
    const taxesMonthly = nn(homePrice) * (clamp(nn(propertyTaxRate), 0, 10) / 100) / 12;
    const insuranceMonthly = nn(insuranceAnnual) / 12;
    const maintenanceMonthly = nn(homePrice) * (clamp(nn(maintenanceRate), 0, 10) / 100) / 12;
    const ownershipCosts = (taxesMonthly + insuranceMonthly + maintenanceMonthly) * months;
    const remainingBalance = loan.amortizationSchedule[months - 1]?.remainingBalance ?? loanAmount;
    const app = clamp(nn(homeAppreciation), 0, 20) / 100;
    const futureValue = nn(homePrice) * Math.pow(1 + app, years);
    const equity = Math.max(0, futureValue - remainingBalance);
    const buyNetCost = paymentsTotal + ownershipCosts - equity + nn(downPayment);
    return { years, rentTotal, buyNetCost, equity };
  }, [monthlyRent, rentGrowth, homePrice, downPayment, interestRate, termYears, yearsToStay, homeAppreciation, propertyTaxRate, insuranceAnnual, maintenanceRate]);

  const better = results.buyNetCost < results.rentTotal ? 'Buying' : 'Renting';
  const diff = Math.abs(results.buyNetCost - results.rentTotal);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Monthly Rent ($)</Label>
            <Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rent Growth (%/yr)</Label>
              <Input type="number" step="0.1" value={rentGrowth} onChange={(e) => setRentGrowth(Number(e.target.value))} />
            </div>
            <div>
              <Label>Years to Stay</Label>
              <Input type="number" value={yearsToStay} onChange={(e) => setYearsToStay(Number(e.target.value))} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Price ($)</Label>
            <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
          </div>
          <div>
            <Label>Down Payment ($)</Label>
            <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Term (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Home Appreciation (%/yr)</Label>
              <Input type="number" step="0.1" value={homeAppreciation} onChange={(e) => setHomeAppreciation(Number(e.target.value))} />
            </div>
            <div>
              <Label>Property Tax Rate (%/yr)</Label>
              <Input type="number" step="0.1" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Insurance (Annual $)</Label>
              <Input type="number" value={insuranceAnnual} onChange={(e) => setInsuranceAnnual(Number(e.target.value))} />
            </div>
            <div>
              <Label>Maintenance (%/yr)</Label>
              <Input type="number" step="0.1" value={maintenanceRate} onChange={(e) => setMaintenanceRate(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Winner Over {results.years} Years</h2>
          <div className="text-5xl font-bold text-blue-700">{better}</div>
          <div className="mt-3 text-sm text-blue-900">
            Estimated difference: <span className="font-semibold">{formatCurrency(diff)}</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">Rent Total Paid</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.rentTotal)}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">Buy Net Cost (est.)</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.buyNetCost)}</div>
            <div className="text-xs text-gray-600 mt-2">Includes estimated equity: {formatCurrency(results.equity)}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700">
          This is a simplified model for scenario comparison. Real outcomes depend on transaction costs, tax impacts, HOA, PMI, and local market factors.
        </div>
      </div>
    </div>
  );
}

export function ReverseMortgageCalculator() {
  const [homeValue, setHomeValue] = useState(500000);
  const [balance, setBalance] = useState(0);
  const [age, setAge] = useState(70);
  const [expectedRate, setExpectedRate] = useState(7.5);

  const principalLimitFactor = useMemo(() => {
    const baseAge = 62;
    const ageDiff = Math.max(0, nn(age) - baseAge);
    const rateFactor = Math.max(0, 10 - nn(expectedRate)) / 100;
    return (0.4 + (ageDiff * 0.01) + rateFactor);
  }, [age, expectedRate]);

  const principalLimit = nn(homeValue) * principalLimitFactor;
  const netPrincipalLimit = Math.max(0, principalLimit - nn(balance));

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Home Value ($)</Label>
            <Input type="number" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} />
          </div>
          <div>
            <Label>Current Mortgage Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
          <div>
            <Label>Age of Youngest Borrower</Label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <Label>Expected Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={expectedRate} onChange={(e) => setExpectedRate(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Principal Limit</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(principalLimit)}</div>
          <div className="mt-4 text-lg text-blue-900">
            Net Available Funds: <span className="font-bold">{formatCurrency(netPrincipalLimit)}</span>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            This is an estimate. Actual amounts depend on specific FHA/HECM limits, fees, and current market factors.
          </div>
        </div>
      </div>
    </div>
  );
}

export function MortgagePayoffCalculator() {
  const [balance, setBalance] = useState(320000);
  const [rate, setRate] = useState(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState(2200);
  const [extraPayment, setExtraPayment] = useState(0);

  const results = useMemo(() => {
    function simulate(extra: number) {
      const r = nn(rate) / 100 / 12;
      let b = nn(balance);
      let months = 0;
      let totalInterest = 0;
      const payment = nn(monthlyPayment) + Math.max(0, extra);
      const maxMonths = 2000 * 12;
      while (b > 0.01 && months < maxMonths) {
        const interest = b * r;
        if (payment <= interest + 0.005) return { payoffMonths: null as number | null, totalInterest, lastInterest: interest };
        const principal = Math.min(b, payment - interest);
        b -= principal;
        totalInterest += interest;
        months += 1;
      }
      return { payoffMonths: months, totalInterest, lastInterest: b * r };
    }

    const base = simulate(0);
    const withExtra = simulate(nn(extraPayment));

    function payoffDate(months: number | null) {
      if (months == null) return null;
      const d = new Date();
      d.setMonth(d.getMonth() + months);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    }

    const interestSaved =
      base.payoffMonths != null && withExtra.payoffMonths != null
        ? Math.max(0, base.totalInterest - withExtra.totalInterest)
        : 0;

    const monthsSaved =
      base.payoffMonths != null && withExtra.payoffMonths != null
        ? Math.max(0, base.payoffMonths - withExtra.payoffMonths)
        : 0;

    return {
      base,
      withExtra,
      payoffDate: payoffDate(withExtra.payoffMonths),
      interestSaved,
      monthsSaved,
    };
  }, [balance, rate, monthlyPayment, extraPayment]);

  const invalid = results.withExtra.payoffMonths == null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Current Mortgage Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Payment (Principal + Interest) ($)</Label>
            <Input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(Number(e.target.value))} />
          </div>
          <div>
            <Label>Extra Monthly Payment ($)</Label>
            <Input type="number" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} />
          </div>
          <div className="text-xs text-gray-500">
            This estimate assumes a fixed rate and consistent monthly payments. It excludes taxes, insurance, HOA, and escrow changes.
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Payoff</h2>
          {invalid ? (
            <div className="text-blue-900">
              <div className="text-2xl font-bold">Payment too low</div>
              <div className="mt-2 text-sm">
                Monthly interest is about <span className="font-semibold">{formatCurrency(results.withExtra.lastInterest ?? 0)}</span>. Increase your payment to reduce the balance.
              </div>
            </div>
          ) : (
            <>
              <div className="text-5xl font-bold text-blue-700">{results.payoffDate}</div>
              <div className="mt-3 text-sm text-blue-900">
                Payoff time: <span className="font-semibold">{results.withExtra.payoffMonths}</span> months
              </div>
            </>
          )}
        </div>

        {!invalid && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-xs uppercase tracking-wide text-gray-500">Total Interest</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.withExtra.totalInterest)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-xs uppercase tracking-wide text-gray-500">Interest Saved</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.interestSaved)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="text-xs uppercase tracking-wide text-gray-500">Months Saved</div>
              <div className="text-2xl font-bold text-gray-900">{results.monthsSaved}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function HouseAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(800);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const results = useMemo(() => {
    const incomeMonthly = nn(annualIncome) / 12;
    const housing28 = incomeMonthly * 0.28;
    const housing36 = incomeMonthly * 0.36 - nn(monthlyDebts);
    const maxHousingPayment = Math.max(0, Math.min(housing28, housing36));
    const maxLoanAmount = inverseAmortizedPrincipal(maxHousingPayment, nn(interestRate), Math.max(1, Math.floor(nn(termYears))));
    const maxHomePrice = maxLoanAmount + nn(downPayment);
    const backEndDti = incomeMonthly > 0 ? ((nn(monthlyDebts) + maxHousingPayment) / incomeMonthly) * 100 : 0;
    return { maxHousingPayment, maxLoanAmount, maxHomePrice, backEndDti };
  }, [annualIncome, monthlyDebts, downPayment, interestRate, termYears]);

  const guidance =
    results.backEndDti <= 36 ? 'Within a common 36% back-end DTI guideline.' :
    results.backEndDti <= 43 ? 'Near typical qualifying limits for many loan programs.' :
    'Above common DTI guidelines; consider lowering debts, increasing down payment, or reducing the target payment.';

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Annual Income ($)</Label>
            <Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Debt Payments ($)</Label>
            <Input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} />
          </div>
          <div>
            <Label>Down Payment ($)</Label>
            <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Term (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Uses a rule-of-thumb housing budget and estimates principal-and-interest only. Taxes, insurance, HOA, and PMI can reduce affordability.
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Affordable Home Price</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(results.maxHomePrice)}</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-blue-800">
              <span className="block font-medium">Max Monthly Payment</span>
              <span className="font-bold">{formatCurrency(results.maxHousingPayment)}</span>
            </div>
            <div className="text-gray-700">
              <span className="block font-medium">Estimated Loan Amount</span>
              <span className="font-bold">{formatCurrency(results.maxLoanAmount)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">
            Back-end DTI (debts + housing): <span className="font-semibold">{fmtPct(results.backEndDti)}</span>
          </div>
          <div className="text-sm text-gray-700 mt-2">{guidance}</div>
        </div>
      </div>
    </div>
  );
}

