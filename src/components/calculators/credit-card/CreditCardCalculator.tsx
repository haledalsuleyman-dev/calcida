"use client";
import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateCreditCardPayoff } from '@/lib/calculators/credit-card';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function CreditCardCalculator() {
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(18.9);
  const [monthlyPayment, setMonthlyPayment] = useState(200);

  const result = useMemo(() => {
    return calculateCreditCardPayoff(balance, interestRate, monthlyPayment);
  }, [balance, interestRate, monthlyPayment]);

  if (!result) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <Label htmlFor="balance">Current Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (APR %)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
              <Input
                id="monthlyPayment"
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Time to Pay Off</h2>
          {result.months === Infinity ? (
             <div className="text-2xl font-bold text-red-600">
                Payment too low (Only covers interest)
             </div>
          ) : (
            <>
              <div className="text-4xl font-bold text-blue-700">
                {Math.floor(result.months / 12)} years {result.months % 12} months
              </div>
               <div className="mt-2 text-sm text-blue-800">
                Total Interest Paid: {formatCurrency(result.totalInterest)}
              </div>
            </>
          )}
        </div>

        {result.months !== Infinity && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[400px] min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-center">Balance Over Time</h3>
            <ClientOnlyChart className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                  data={result.schedule}
                  margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                  }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="remainingBalance" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
              </ResponsiveContainer>
            </ClientOnlyChart>
            </div>
        )}
      </div>
    </div>
  );
}
