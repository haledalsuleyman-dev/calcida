import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 text-sm text-gray-600">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Calculator className="h-6 w-6" />
            <span>Calcida</span>
          </Link>
          <p>
            Simple, fast, and free financial calculators for everyone.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Calculator Directory</h4>
          <ul className="space-y-2">
            <li><Link href="/calculators" className="hover:text-blue-600">All Calculators</Link></li>
            <li><Link href="/mortgage-calculators" className="hover:text-blue-600">Mortgage Calculators</Link></li>
            <li><Link href="/loan-calculators" className="hover:text-blue-600">Loan Calculators</Link></li>
            <li><Link href="/salary-calculators" className="hover:text-blue-600">Salary Calculators</Link></li>
            <li><Link href="/retirement-calculators" className="hover:text-blue-600">Retirement Calculators</Link></li>
            <li><Link href="/investment-calculators" className="hover:text-blue-600">Investment Calculators</Link></li>
            <li><Link href="/budget-calculators" className="hover:text-blue-600">Budget Calculators</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Resources</h4>
          <ul className="space-y-2">
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            <li><Link href="/all-calculators" className="hover:text-blue-600">All Calculators</Link></li>
            <li><Link href="/calculators" className="hover:text-blue-600">Calculator Directory</Link></li>
            <li><Link href="/disclaimer" className="hover:text-blue-600">Disclaimer</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link href="/editorial-policy" className="hover:text-blue-600">Editorial Policy</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-200 text-center">
        <p>&copy; {currentYear} Calcida. All rights reserved.</p>
      </div>
    </footer>
  );
}
