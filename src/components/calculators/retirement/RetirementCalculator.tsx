"use client";
import React, { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { calculate401k } from '@/lib/calculators/retirement';
import { ClientOnlyChart } from '@/components/charts/ClientOnlyChart';

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [annualSalary, setAnnualSalary] = useState(60000);
  const [contributionPercent, setContributionPercent] = useState(10);
  const [employerMatchPercent, setEmployerMatchPercent] = useState(3);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [salaryIncrease, setSalaryIncrease] = useState(2);

  const result = useMemo(() => {
    return calculate401k(
      currentAge,
      retirementAge,
      currentBalance,
      annualSalary,
      contributionPercent,
      employerMatchPercent,
      annualReturn,
      salaryIncrease
    );
  }, [
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    contributionPercent,
    employerMatchPercent,
    annualReturn,
    salaryIncrease,
  ]);

  if (!result) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="retirementAge">Retirement Age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="currentBalance">Current 401k Balance ($)</Label>
              <Input
                id="currentBalance"
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
              />
            </div>
             <div>
              <Label htmlFor="annualSalary">Annual Salary ($)</Label>
              <Input
                id="annualSalary"
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
              />
            </div>
             <div>
              <Label htmlFor="contributionPercent">Your Contribution (%)</Label>
              <Input
                id="contributionPercent"
                type="number"
                value={contributionPercent}
                onChange={(e) => setContributionPercent(Number(e.target.value))}
              />
            </div>
             <div>
              <Label htmlFor="employerMatchPercent">Employer Match (%)</Label>
              <Input
                id="employerMatchPercent"
                type="number"
                value={employerMatchPercent}
                onChange={(e) => setEmployerMatchPercent(Number(e.target.value))}
              />
            </div>
             <div>
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <Input
                id="annualReturn"
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
              />
            </div>
             <div>
              <Label htmlFor="salaryIncrease">Annual Salary Increase (%)</Label>
              <Input
                id="salaryIncrease"
                type="number"
                value={salaryIncrease}
                onChange={(e) => setSalaryIncrease(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Projected Balance at Retirement</h2>
          <div className="text-4xl font-bold text-blue-700">
            {formatCurrency(result.finalBalance)}
          </div>
           <div className="mt-2 text-sm text-blue-800">
            Total Contributions: {formatCurrency(result.totalContributions)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-[400px] min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-center">Growth Over Time</h3>
          <ClientOnlyChart className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={result.schedule}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="balance" stroke="#2563eb" fill="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </ClientOnlyChart>
        </div>
      </div>
    </div>
  );
}
