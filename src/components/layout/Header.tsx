"use client";

import Link from 'next/link';
import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-blue-600 transition-transform active:scale-95 leading-none">
          <Calculator className="h-8 w-8" strokeWidth={3} />
          <span className="tracking-tighter">CALCIDA</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
          <Link href="/calculators" className="hover:text-blue-600 transition-colors py-2">All Tools</Link>
          <Link href="/mortgage-calculators" className="hover:text-blue-600 transition-colors py-2">Mortgage</Link>
          <Link href="/loan-calculators" className="hover:text-blue-600 transition-colors py-2">Loans</Link>
          <Link href="/salary-calculators" className="hover:text-blue-600 transition-colors py-2">Salary</Link>
          <Link href="/retirement-calculators" className="hover:text-blue-600 transition-colors py-2">Retirement</Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors py-2">Learn</Link>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:block">
            <Link href="/calculators" className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                Explore All
            </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
            className="lg:hidden p-3 bg-gray-50 rounded-xl text-gray-900 hover:text-blue-600 active:scale-90 transition-all"
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            {isMenuOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden glass border-b border-gray-100 absolute top-16 md:top-20 left-0 right-0 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col p-6 gap-2 text-sm font-black text-gray-500 uppercase tracking-widest">
                <Link href="/calculators" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 hover:text-blue-600 active:bg-blue-50 transition-all">
                    <span>All Calculators</span>
                    <Calculator className="h-5 w-5 opacity-20" />
                </Link>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link href="/mortgage-calculators" onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">Mortgage</Link>
                    <Link href="/loan-calculators" onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">Loans</Link>
                    <Link href="/salary-calculators" onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">Salary</Link>
                    <Link href="/retirement-calculators" onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">Retirement</Link>
                </div>
                <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="mt-4 text-center p-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                    Financial Blog
                </Link>
            </nav>
        </div>
      )}
    </header>
  );
}
