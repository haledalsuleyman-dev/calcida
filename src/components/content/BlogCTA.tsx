import React from 'react';
import Link from 'next/link';

interface Props {
  category?: string;
}

export const BlogCTA = ({ category }: Props) => {
  const isMortgage = category?.toLowerCase() === 'mortgage';
  const isSalary = category?.toLowerCase() === 'salary';
  const isTax = category?.toLowerCase() === 'taxes';
  const isInvesting = category?.toLowerCase() === 'investing';

  return (
    <div className="my-16 bg-gray-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Ready to run the <span className="text-blue-400">exact</span> numbers?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Our articles explain the concepts, but our professional-grade calculators help you take action on your specific financial situation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isMortgage && (
            <Link href="/mortgage-calculators" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/40">
              Mortgage Hub →
            </Link>
          )}
          {isSalary && (
            <Link href="/salary-calculators" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/40">
              Salary & Paycheck Hub →
            </Link>
          )}
          {isTax && (
            <Link href="/tax-calculators" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/40">
              Income Tax Hub →
            </Link>
          )}
          {isInvesting && (
            <Link href="/investment-calculators" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/40">
              Investment Tools →
            </Link>
          )}
          <Link href="/calculators" className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all transform hover:scale-105">
            Browse All 100+ Tools
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-800/10 rounded-full blur-3xl"></div>
    </div>
  );
};
