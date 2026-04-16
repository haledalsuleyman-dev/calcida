"use client";

import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white py-20 text-sm text-gray-500">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-2xl font-black text-blue-600 leading-none">
            <Calculator className="h-8 w-8" strokeWidth={3} />
            <span className="tracking-tighter uppercase">Calcida</span>
          </Link>
          <p className="leading-relaxed max-w-xs mx-auto md:mx-0">
            Precision-engineered financial instruments designed to empower your economic decisions. Simple, fast, and always free.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">&copy;</div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{currentYear} Calcida</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-center md:text-left">Calculate</h4>
          <ul className="space-y-4 font-bold text-center md:text-left">
            <li><Link href="/calculators" className="hover:text-blue-600 transition-colors">Directory</Link></li>
            <li><Link href="/mortgage-calculators" className="hover:text-blue-600 transition-colors">Mortgages</Link></li>
            <li><Link href="/loan-calculators" className="hover:text-blue-600 transition-colors">Personal Loans</Link></li>
            <li><Link href="/salary-calculators" className="hover:text-blue-600 transition-colors">Salary & Tax</Link></li>
            <li><Link href="/retirement-calculators" className="hover:text-blue-600 transition-colors">Retirement</Link></li>
            <li><Link href="/investment-calculators" className="hover:text-blue-600 transition-colors">Wealth Strategy</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-center md:text-left">Resources</h4>
          <ul className="space-y-4 font-bold text-center md:text-left">
            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Learning Center</Link></li>
            <li><Link href="/mortgage-payment-calculator" className="hover:text-blue-600 transition-colors">Mortgage Engine</Link></li>
            <li><Link href="/paycheck-calculator" className="hover:text-blue-600 transition-colors">Paycheck Breakdown</Link></li>
            <li><Link href="/compound-interest-calculator" className="hover:text-blue-600 transition-colors">Growth Forecaster</Link></li>
            <li><Link href="/disclaimer" className="hover:text-blue-600 transition-colors">Financial Disclaimer</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-center md:text-left">Integrity</h4>
          <ul className="space-y-4 font-bold text-center md:text-left">
            <li><Link href="/editorial-policy" className="hover:text-blue-600 transition-colors">Editorial Standards</Link></li>
            <li><Link href="/about" className="hover:text-blue-600 transition-colors">Our Mission</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">Data Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Usage Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-50 text-center">
        <p className="text-xs text-gray-300 font-medium">Calcida does not provide financial advice. All results are for educational purposes only.</p>
      </div>
    </footer>
  );
}
