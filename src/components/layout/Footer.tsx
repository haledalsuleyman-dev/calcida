"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isAr = pathname?.startsWith('/ar');

  const dict = isAr ? {
    description: 'أدوات مالية دقيقة مصممة لتمكين قراراتك الاقتصادية. بسيطة، سريعة، ومجانية دائماً.',
    calculate: 'احسب',
    resources: 'الموارد',
    integrity: 'النزاهة',
    directory: 'دليل الحاسبات',
    mortgages: 'التمويل العقاري',
    loans: 'القروض الشخصية',
    salary: 'الرواتب والضرائب',
    retirement: 'التقاعد',
    wealth: 'إستراتيجية الثروة',
    learning: 'مركز التعلم',
    disclaimer: 'إخلاء المسؤولية',
    editorial: 'المعايير التحريرية',
    about: 'مهمتنا',
    contact: 'الدعم الفني',
    privacy: 'خصوصية البيانات',
    terms: 'شروط الاستخدام',
    footerCaution: 'كالسيدا لا تقدم استشارات مالية. جميع النتائج هي لأغراض تعليمية فقط.',
    dir: 'rtl'
  } : {
    description: 'Precision-engineered financial instruments designed to empower your economic decisions. Simple, fast, and always free.',
    calculate: 'Calculate',
    resources: 'Resources',
    integrity: 'Integrity',
    directory: 'Directory',
    mortgages: 'Mortgages',
    loans: 'Personal Loans',
    salary: 'Salary & Tax',
    retirement: 'Retirement',
    wealth: 'Wealth Strategy',
    learning: 'Learning Center',
    disclaimer: 'Financial Disclaimer',
    editorial: 'Editorial Standards',
    about: 'Our Mission',
    contact: 'Contact Support',
    privacy: 'Data Privacy',
    terms: 'Usage Terms',
    footerCaution: 'Calcida does not provide financial advice. All results are for educational purposes only.',
    dir: 'ltr'
  };

  const getHref = (path: string) => isAr ? `/ar${path}` : path;

  return (
    <footer className="border-t border-gray-100 bg-white py-20 text-sm text-gray-500" dir={dict.dir}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <Link href={isAr ? "/ar" : "/"} className="flex items-center justify-center md:justify-start gap-2 text-2xl font-black text-blue-600 leading-none">
            <Calculator className="h-8 w-8" strokeWidth={3} />
            <span className="tracking-tighter uppercase">Calcida</span>
          </Link>
          <p className="leading-relaxed max-w-xs mx-auto md:mx-0">
            {dict.description}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">&copy;</div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{currentYear} Calcida</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-center md:text-left">{dict.calculate}</h4>
          <ul className="space-y-4 font-bold text-center md:text-left">
            <li><Link href={getHref("/calculators")} className="hover:text-blue-600 transition-colors">{dict.directory}</Link></li>
            <li><Link href={getHref("/mortgage-calculators")} className="hover:text-blue-600 transition-colors">{dict.mortgages}</Link></li>
            <li><Link href={getHref("/loan-calculators")} className="hover:text-blue-600 transition-colors">{dict.loans}</Link></li>
            <li><Link href={getHref("/salary-calculators")} className="hover:text-blue-600 transition-colors">{dict.salary}</Link></li>
            <li><Link href={getHref("/retirement-calculators")} className="hover:text-blue-600 transition-colors">{dict.retirement}</Link></li>
            <li><Link href={getHref("/investment-calculators")} className="hover:text-blue-600 transition-colors">{dict.wealth}</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-center md:text-left">{dict.resources}</h4>
          <ul className="space-y-4 font-bold text-center md:text-left">
            <li><Link href={getHref("/blog")} className="hover:text-blue-600 transition-colors">{dict.learning}</Link></li>
            <li><Link href={getHref("/mortgage-payment-calculator")} className="hover:text-blue-600 transition-colors">{isAr ? "محرك الرهن العقاري" : "Mortgage Engine"}</Link></li>
            <li><Link href={getHref("/paycheck-calculator")} className="hover:text-blue-600 transition-colors">{isAr ? "تفصيل الراتب" : "Paycheck Breakdown"}</Link></li>
            <li><Link href={getHref("/compound-interest-calculator")} className="hover:text-blue-600 transition-colors">{isAr ? "متوقع النمو" : "Growth Forecaster"}</Link></li>
            <li><Link href={getHref("/disclaimer")} className="hover:text-blue-600 transition-colors">{dict.disclaimer}</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-center md:text-left">{dict.integrity}</h4>
          <ul className="space-y-4 font-bold text-center md:text-left">
            <li><Link href={getHref("/editorial-policy")} className="hover:text-blue-600 transition-colors">{dict.editorial}</Link></li>
            <li><Link href={getHref("/about")} className="hover:text-blue-600 transition-colors">{dict.about}</Link></li>
            <li><Link href={getHref("/contact")} className="hover:text-blue-600 transition-colors">{dict.contact}</Link></li>
            <li><Link href={getHref("/privacy-policy")} className="hover:text-blue-600 transition-colors">{dict.privacy}</Link></li>
            <li><Link href={getHref("/terms")} className="hover:text-blue-600 transition-colors">{dict.terms}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-50 text-center">
        <p className="text-xs text-gray-300 font-medium">{dict.footerCaution}</p>
      </div>
    </footer>
  );
}
