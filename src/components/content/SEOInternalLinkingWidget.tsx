import Link from 'next/link';

export const SEOInternalLinkingWidget = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More Salary Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link 
          href="/salary-to-hourly-guide" 
          className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Salary to Hourly Guide
        </Link>
        <Link 
          href="/hourly-to-yearly-guide" 
          className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Hourly to Yearly Guide
        </Link>
        <Link 
          href="/monthly-salary-to-hourly-guide" 
          className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Monthly to Hourly Guide
        </Link>
        <Link 
          href="/biweekly-to-hourly-guide" 
          className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Biweekly to Hourly Guide
        </Link>
      </div>
    </div>
  );
};
