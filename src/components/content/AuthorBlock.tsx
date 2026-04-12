import React from 'react';

export const AuthorBlock = () => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            C
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">About the Author</h3>
          <p className="font-medium text-gray-900">Calcida Financial Research Team</p>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            The Calcida Research Team consists of financial analysts and software engineers dedicated to building the most accurate and user-friendly financial calculators on the web. Our tools are updated annually with the latest tax brackets, lending guidelines, and economic data from sources like the IRS, BLS, and Federal Reserve.
          </p>
        </div>
      </div>
    </div>
  );
};

export const DisclaimerBlock = () => {
  return (
    <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-500">
      <p>
        <strong>Disclaimer:</strong> This content is for educational purposes only and does not constitute professional financial advice. While we strive for accuracy, tax laws and lending regulations change frequently. Always consult with a qualified financial advisor or tax professional before making major financial decisions.
      </p>
    </div>
  );
};

export const SourcesBlock = () => {
  return (
    <div className="mt-8 text-sm text-gray-600">
      <h4 className="font-bold text-gray-900 mb-2">Sources & Methodology</h4>
      <ul className="list-disc pl-5 space-y-1">
        <li>Tax estimates based on 2025-2026 IRS tax brackets and standard deductions.</li>
        <li>Wage data referenced from the <a href="https://www.bls.gov/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Bureau of Labor Statistics (BLS)</a>.</li>
        <li>Mortgage guidelines referenced from the <a href="https://www.consumerfinance.gov/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Consumer Financial Protection Bureau (CFPB)</a>.</li>
      </ul>
    </div>
  );
};