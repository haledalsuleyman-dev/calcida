import Link from 'next/link';
import { Home, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-blue-50 p-4 rounded-full mb-6">
        <Calculator className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-11 px-8"
        >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
        </Link>
        <Link 
          href="/salary"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-11 px-8"
        >
            View Salary Calculators
        </Link>
      </div>
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
        <Link href="/mortgage" className="hover:text-blue-600 underline">Mortgage</Link>
        <Link href="/loan" className="hover:text-blue-600 underline">Loans</Link>
        <Link href="/retirement" className="hover:text-blue-600 underline">Retirement</Link>
        <Link href="/contact" className="hover:text-blue-600 underline">Contact Support</Link>
      </div>
    </div>
  );
}