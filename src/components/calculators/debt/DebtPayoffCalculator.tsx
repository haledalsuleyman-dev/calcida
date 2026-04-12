
"use client";
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculateDebtPayoff, Debt } from '@/lib/calculators/debt';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card A', balance: 5000, interestRate: 22.9, minPayment: 150 },
    { id: '2', name: 'Student Loan', balance: 15000, interestRate: 5.5, minPayment: 200 }
  ]);
  const [extraPayment, setExtraPayment] = useState(500);
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('avalanche');

  const result = useMemo(() => calculateDebtPayoff(debts, extraPayment, strategy), [debts, extraPayment, strategy]);

  const addDebt = () => {
    setDebts([...debts, { id: Date.now().toString(), name: 'New Debt', balance: 0, interestRate: 0, minPayment: 0 }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Input Side */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Your Debts</h3>
            <div className="space-y-6">
              {debts.map((debt) => (
                <div key={debt.id} className="p-4 border border-gray-100 rounded-md bg-gray-50 relative group">
                  <button 
                    onClick={() => removeDebt(debt.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Debt Name</Label>
                      <Input value={debt.name} onChange={(e) => updateDebt(debt.id, 'name', e.target.value)} />
                    </div>
                    <div>
                      <Label>Balance ($)</Label>
                      <Input type="number" value={debt.balance} onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Interest Rate (%)</Label>
                      <Input type="number" step="0.1" value={debt.interestRate} onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Min Payment ($)</Label>
                      <Input type="number" value={debt.minPayment} onChange={(e) => updateDebt(debt.id, 'minPayment', Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={addDebt}
                className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                + Add Another Debt
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Payoff Strategy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Extra Monthly Payment ($)</Label>
                <Input type="number" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} />
              </div>
              <div>
                <Label>Payoff Method</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value as 'snowball' | 'avalanche')}
                >
                  <option value="avalanche">Debt Avalanche (Save More)</option>
                  <option value="snowball">Debt Snowball (Quick Wins)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Debt-Free Date</h2>
            <div className="text-4xl font-bold text-blue-700">
              {result.payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="text-blue-700">
                <span className="block font-medium">Time Remaining</span>
                <span className="font-bold">{result.monthsToPayoff} Months</span>
              </div>
              <div className="text-red-700">
                <span className="block font-medium">Total Interest</span>
                <span className="font-bold">{formatCurrency(result.totalInterest)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[300px] min-h-[300px]">
            <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider text-center">Balance Over Time</h4>
            <ClientOnlyChart className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.schedule}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickFormatter={(m) => `M${m}`} />
                  <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} labelFormatter={(m) => `Month ${m}`} />
                  <Area type="monotone" dataKey="totalBalance" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </ClientOnlyChart>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h4 className="font-bold text-green-900 mb-2">Strategy: {strategy === 'avalanche' ? 'Avalanche' : 'Snowball'}</h4>
            <p className="text-sm text-green-800 leading-relaxed">
              {strategy === 'avalanche' 
                ? "The Avalanche method targets the highest interest rates first, minimizing the total interest you pay over time." 
                : "The Snowball method targets the smallest balances first, helping you stay motivated by knocking out individual debts faster."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
