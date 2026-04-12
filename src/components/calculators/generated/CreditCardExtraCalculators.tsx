"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { nn, fmtPct, clamp } from '@/components/calculators/generated/utils';

export function CreditUtilizationCalculator() {
  const [balances, setBalances] = useState(2000);
  const [limits, setLimits] = useState(10000);
  const util = limits > 0 ? (nn(balances) / nn(limits)) * 100 : 0;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Total Balances ($)</Label>
            <Input type="number" value={balances} onChange={(e) => setBalances(Number(e.target.value))} />
          </div>
          <div>
            <Label>Total Credit Limits ($)</Label>
            <Input type="number" value={limits} onChange={(e) => setLimits(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Credit Utilization</h2>
          <div className="text-6xl font-bold text-blue-700">{fmtPct(util)}</div>
        </div>
      </div>
    </div>
  );
}

export function CreditCardInterestCalculator() {
  const [balance, setBalance] = useState(3000);
  const [apr, setApr] = useState(24);
  const [payment, setPayment] = useState(150);
  const r = nn(apr) / 100 / 12;
  const interest0 = nn(balance) * r;
  const payoff = useMemo(() => {
    const L = nn(balance);
    const PMT = nn(payment);
    if (L === 0) return { months: 0, totalInterest: 0, feasible: true };
    if (PMT <= L * r) return { months: null as number | null, totalInterest: null as number | null, feasible: false };
    const months = Math.ceil(Math.log(PMT / (PMT - r * L)) / Math.log(1 + r));
    const totalPaid = months * PMT;
    const totalInterest = Math.max(0, totalPaid - L);
    return { months, totalInterest, feasible: true };
  }, [balance, payment, r]);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
          <div>
            <Label>APR (%)</Label>
            <Input type="number" step="0.1" value={apr} onChange={(e) => setApr(Number(e.target.value))} />
          </div>
          <div>
            <Label>Monthly Payment ($)</Label>
            <Input type="number" value={payment} onChange={(e) => setPayment(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Starting Monthly Interest</h2>
          <div className="text-5xl font-bold text-blue-700">{formatCurrency(interest0)}</div>
          {!payoff.feasible ? (
            <div className="mt-3 text-sm text-red-700">Payment is too small to reduce the balance (it doesn’t cover interest).</div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-700">
                <span className="block font-medium">Payoff time</span>
                <span className="font-bold">{payoff.months} months</span>
              </div>
              <div className="text-gray-700">
                <span className="block font-medium">Total interest</span>
                <span className="font-bold">{formatCurrency(payoff.totalInterest ?? 0)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CreditCardMinimumPaymentCalculator() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(20);
  const [minPercent, setMinPercent] = useState(2);
  const [minDollar, setMinDollar] = useState(25);
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const result = useMemo(() => {
    let b = nn(balance);
    const r = nn(apr) / 100 / 12;
    const minP = clamp(nn(minPercent), 0, 50) / 100;
    const minD = nn(minDollar);
    let interestTotal = 0;
    let months = 0;
    for (let i = 0; i < 600 && b > 0.01; i++) {
      const interest = b * r;
      const payment = Math.max(b * minP, minD);
      if (payment <= interest) return { months: null as number | null, interestTotal: null as number | null };
      b = Math.max(0, b + interest - payment);
      interestTotal += interest;
      months++;
    }
    return { months, interestTotal };
  }, [balance, apr, minPercent, minDollar]);
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
          <div>
            <Label>APR (%)</Label>
            <Input type="number" step="0.1" value={apr} onChange={(e) => setApr(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Minimum (% of balance)</Label>
              <Input type="number" step="0.1" value={minPercent} onChange={(e) => setMinPercent(Number(e.target.value))} />
            </div>
            <div>
              <Label>Minimum ($ floor)</Label>
              <Input type="number" value={minDollar} onChange={(e) => setMinDollar(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Payoff Timeline</h2>
          {result.months === null ? (
            <div className="text-red-700 text-sm">Minimum payment rule is too small relative to interest; balance may not decrease.</div>
          ) : (
            <>
              <div className="text-6xl font-bold text-blue-700">{result.months} months</div>
              <div className="mt-3 text-sm text-blue-900">Total interest paid: <span className="font-semibold">{formatCurrency(result.interestTotal ?? 0)}</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function BalanceTransferCalculator() {
  const [balance, setBalance] = useState(6000);
  const [currentApr, setCurrentApr] = useState(22);
  const [transferApr, setTransferApr] = useState(0);
  const [feePct, setFeePct] = useState(3);
  const [promoMonths, setPromoMonths] = useState(12);
  const [postPromoApr, setPostPromoApr] = useState(22);
  const [payment, setPayment] = useState(300);
  const result = useMemo(() => {
    const L = nn(balance);
    const fee = L * (clamp(nn(feePct), 0, 10) / 100);
    const simulate = (aprSchedule: (month: number) => number) => {
      let b = L;
      let interestTotal = 0;
      let months = 0;
      for (let m = 1; m <= 600 && b > 0.01; m++) {
        const apr = aprSchedule(m);
        const r = nn(apr) / 100 / 12;
        const interest = b * r;
        const pmt = Math.min(nn(payment), b + interest);
        if (pmt <= interest && b > 0.01) return null;
        b = Math.max(0, b + interest - pmt);
        interestTotal += interest;
        months = m;
      }
      return { months, interestTotal };
    };
    const current = simulate(() => currentApr);
    const transfer = simulate((m) => (m <= nn(promoMonths) ? transferApr : postPromoApr));
    return { fee, current, transfer };
  }, [balance, feePct, currentApr, transferApr, promoMonths, postPromoApr, payment]);
  const savings = result.current && result.transfer ? (result.current.interestTotal - (result.transfer.interestTotal + result.fee)) : null;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div>
            <Label>Balance ($)</Label>
            <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current APR (%)</Label>
              <Input type="number" step="0.1" value={currentApr} onChange={(e) => setCurrentApr(Number(e.target.value))} />
            </div>
            <div>
              <Label>Monthly Payment ($)</Label>
              <Input type="number" value={payment} onChange={(e) => setPayment(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Transfer APR (%)</Label>
              <Input type="number" step="0.1" value={transferApr} onChange={(e) => setTransferApr(Number(e.target.value))} />
            </div>
            <div>
              <Label>Transfer Fee (%)</Label>
              <Input type="number" step="0.1" value={feePct} onChange={(e) => setFeePct(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Promo Months</Label>
              <Input type="number" value={promoMonths} onChange={(e) => setPromoMonths(Number(e.target.value))} />
            </div>
            <div>
              <Label>Post-Promo APR (%)</Label>
              <Input type="number" step="0.1" value={postPromoApr} onChange={(e) => setPostPromoApr(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">Estimated Savings</h2>
          <div className="text-5xl font-bold text-blue-700">{savings === null ? 'N/A' : formatCurrency(savings)}</div>
          <div className="mt-3 text-sm text-blue-900">Transfer fee: <span className="font-semibold">{formatCurrency(result.fee)}</span></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">Keep Current Card</div>
            <div className="text-2xl font-bold text-gray-900">{result.current ? `${result.current.months} months` : 'N/A'}</div>
            <div className="text-xs text-gray-600 mt-2">Interest: {result.current ? formatCurrency(result.current.interestTotal) : 'N/A'}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">Balance Transfer</div>
            <div className="text-2xl font-bold text-gray-900">{result.transfer ? `${result.transfer.months} months` : 'N/A'}</div>
            <div className="text-xs text-gray-600 mt-2">Interest: {result.transfer ? formatCurrency(result.transfer.interestTotal) : 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

