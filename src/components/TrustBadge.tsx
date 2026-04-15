import React from 'react';
import Link from 'next/link';

export function TrustBadge() {
  const currentMonthYear = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-gray-200 pb-4 mb-4 text-sm text-gray-700">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span>Written by <strong>Calcida Team</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Reviewed by <strong>Financial Review Process</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Last updated: <span className="font-medium">{currentMonthYear}</span></span>
        </div>
      </div>
      <div className="flex items-start gap-2 text-gray-600 text-sm">
        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="leading-relaxed">
          Calculations are rooted in standard financial formulas and are provided as <strong>educational estimates only</strong>. They do not constitute professional financial advice. Results may vary based on actual interest rates and fees. You should verify all numbers with a certified financial professional prior to making significant financial commitments. <Link href="/editorial-policy" className="text-blue-600 hover:underline inline-flex items-center">Read our editorial commitment <span className="ml-1">→</span></Link>
        </p>
      </div>
    </div>
  );
}
