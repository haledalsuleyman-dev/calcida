"use client";

import Link from 'next/link';
import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ar } from '@/lib/dictionaries/ar';
import { en } from '@/lib/dictionaries/en';

interface NavLink {
  label: string;
  href: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAr = pathname?.startsWith('/ar');
  
  const dict = isAr ? {
    allTools: 'كافة الأدوات',
    mortgageLabel: 'التمويل العقاري',
    loans: 'القروض',
    salary: 'الرواتب',
    retirement: 'التقاعد',
    learn: 'تعلم',
    exploreAll: 'استكشف الكل',
    dir: 'rtl'
  } : {
    allTools: 'All Tools',
    mortgage: 'Mortgage',
    loans: 'Loans',
    salary: 'Salary',
    retirement: 'Retirement',
    learn: 'Learn',
    exploreAll: 'Explore All',
    dir: 'ltr'
  };

  const getHref = (path: string) => isAr ? `/ar${path}` : path;
  const toggleLang = () => {
    if (isAr) {
      window.location.href = pathname.replace('/ar', '') || '/';
    } else {
      window.location.href = `/ar${pathname === '/' ? '' : pathname}`;
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-gray-100 transition-all duration-300" dir={dict.dir}>
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 lg:px-8">
        <Link href={isAr ? "/ar" : "/"} className="flex items-center gap-2 text-2xl font-black text-blue-600 transition-transform active:scale-95 leading-none">
          <Calculator className="h-8 w-8" strokeWidth={3} />
          <span className="tracking-tighter">CALCIDA</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-black text-gray-500 uppercase tracking-widest">
          <Link href={getHref("/mortgage-calculators")} className="hover:text-blue-600 transition-colors py-2">{dict.mortgageLabel}</Link>
          <Link href={getHref("/loan-calculators")} className="hover:text-blue-600 transition-colors py-2">{dict.loans}</Link>
          <Link href={getHref("/salary-calculators")} className="hover:text-blue-600 transition-colors py-2">{dict.salary}</Link>
          <Link href={getHref("/blog")} className="hover:text-blue-600 transition-colors py-2">{dict.learn}</Link>
        </nav>

        {/* Action Button & Lang Switcher */}
        <div className="hidden lg:flex items-center gap-4">
            <button 
                onClick={toggleLang}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                {isAr ? 'English' : 'العربية'}
            </button>
            <Link href={getHref("/calculators")} className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                {dict.exploreAll}
            </Link>
        </div>
        
        {/* Mobile Menu & Lang */}
        <div className="lg:hidden flex items-center gap-2">
            <button 
                onClick={toggleLang}
                className="p-2 text-[10px] font-bold uppercase border border-gray-100 rounded-lg"
            >
                {isAr ? 'EN' : 'AR'}
            </button>
            <button 
                className="p-3 bg-gray-50 rounded-xl text-gray-900 hover:text-blue-600 active:scale-90 transition-all"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
            </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden glass border-b border-gray-100 absolute top-16 md:top-20 left-0 right-0 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col p-6 gap-2 text-sm font-black text-gray-500 uppercase tracking-widest">
                <Link href={getHref("/calculators")} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 hover:text-blue-600 active:bg-blue-50 transition-all">
                    <span>{isAr ? "كافة الحاسبات" : "All Calculators"}</span>
                    <Calculator className="h-5 w-5 opacity-20" />
                </Link>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link href={getHref("/mortgage-calculators")} onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">{dict.mortgageLabel}</Link>
                    <Link href={getHref("/loan-calculators")} onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">{dict.loans}</Link>
                    <Link href={getHref("/salary-calculators")} onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">{dict.salary}</Link>
                    <Link href={getHref("/blog")} onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-50/50 rounded-xl hover:text-blue-600 transition-all">{dict.learn}</Link>
                </div>
                <Link href={getHref("/blog")} onClick={() => setIsMenuOpen(false)} className="mt-4 text-center p-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                    {isAr ? "المدونة المالية" : "Financial Blog"}
                </Link>
            </nav>
        </div>
      )}
    </header>
  );
}
