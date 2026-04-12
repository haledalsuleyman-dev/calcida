"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatCurrency } from '@/lib/utils';
import { salaryToHourly, hourlyToSalary } from '@/lib/calculators/salary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

interface SalaryCalculatorProps {
  defaultTab?: 'salary-to-hourly' | 'hourly-to-salary';
}

export function SalaryCalculator({ defaultTab = 'salary-to-hourly' }: SalaryCalculatorProps) {
  const [annualSalary, setAnnualSalary] = useState(50000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  
  const salaryResult = salaryToHourly(annualSalary, hoursPerWeek);
  const hourlyResult = hourlyToSalary(hourlyRate, hoursPerWeek);

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <Tabs defaultValue={defaultTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="salary-to-hourly">Salary to Hourly</TabsTrigger>
          <TabsTrigger value="hourly-to-salary">Hourly to Salary</TabsTrigger>
        </TabsList>
        <TabsContent value="salary-to-hourly" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
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
              <Label htmlFor="hoursPerWeek">Hours per Week</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex justify-between border-b pb-2"><span>Hourly Rate:</span><span className="font-bold text-gray-900">{formatCurrency(salaryResult.hourly)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Daily Rate:</span><span className="font-bold text-gray-900">{formatCurrency(salaryResult.daily)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Weekly Pay:</span><span className="font-bold text-gray-900">{formatCurrency(salaryResult.weekly)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Bi-Weekly Pay:</span><span className="font-bold text-gray-900">{formatCurrency(salaryResult.biweekly)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Monthly Pay:</span><span className="font-bold text-gray-900">{formatCurrency(salaryResult.monthly)}</span></div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="hourly-to-salary" className="space-y-8">
           <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
              />
            </div>
             <div>
              <Label htmlFor="hoursPerWeek2">Hours per Week</Label>
              <Input
                id="hoursPerWeek2"
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-xl font-bold mb-4 text-green-900">Results</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex justify-between border-b pb-2"><span>Annual Salary:</span><span className="font-bold text-gray-900">{formatCurrency(hourlyResult.annual)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Monthly Pay:</span><span className="font-bold text-gray-900">{formatCurrency(hourlyResult.monthly)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Bi-Weekly Pay:</span><span className="font-bold text-gray-900">{formatCurrency(hourlyResult.biweekly)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Weekly Pay:</span><span className="font-bold text-gray-900">{formatCurrency(hourlyResult.weekly)}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Daily Pay:</span><span className="font-bold text-gray-900">{formatCurrency(hourlyResult.daily)}</span></div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
