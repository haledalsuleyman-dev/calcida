"use client";

import Link from 'next/link';
import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Calculator className="h-6 w-6" />
          <span>Calcida</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5 text-sm font-medium text-gray-700">
          <Link href="/calculators" className="hover:text-blue-600 transition-colors">Calculators</Link>
          <Link href="/investment-calculators" className="hover:text-blue-600 transition-colors">Investment</Link>
          <Link href="/budget-calculators" className="hover:text-blue-600 transition-colors">Budget</Link>
          <Link href="/mortgage-calculators" className="hover:text-blue-600 transition-colors">Mortgage</Link>
          <Link href="/loan-calculators" className="hover:text-blue-600 transition-colors">Loans</Link>
          <Link href="/salary-calculators" className="hover:text-blue-600 transition-colors">Salary</Link>
          <Link href="/retirement-calculators" className="hover:text-blue-600 transition-colors">Retirement</Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute top-16 left-0 right-0 shadow-lg animate-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col p-4 gap-4 text-sm font-medium text-gray-700">
                <Link href="/calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Calculators</Link>
                <Link href="/investment-calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Investment</Link>
                <Link href="/budget-calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Budget</Link>
                <Link href="/mortgage-calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Mortgage</Link>
                <Link href="/loan-calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Loans</Link>
                <Link href="/salary-calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Salary</Link>
                <Link href="/retirement-calculators" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2 border-b border-gray-50">Retirement</Link>
                <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors py-2">Blog</Link>
            </nav>
        </div>
      )}
    </header>
  );
}
