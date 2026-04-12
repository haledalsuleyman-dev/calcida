"use client";
import React from 'react';
import Link from 'next/link';

interface NextStepLink {
  label: string;
  href: string;
}

interface NextStepCardProps {
  title: string;
  description: string;
  primaryAction: NextStepLink;
  secondaryActions: NextStepLink[];
}

export function NextStepCard({ 
  title, 
  description, 
  primaryAction, 
  secondaryActions 
}: NextStepCardProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-blue-900 mb-2">{title}</h3>
          <p className="text-blue-800 text-sm mb-4 md:mb-0">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link
            href={primaryAction.href}
            className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          >
            {primaryAction.label} &rarr;
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-blue-700 items-center justify-center">
             {secondaryActions.map((action) => (
               <Link 
                 key={action.href} 
                 href={action.href}
                 className="hover:underline whitespace-nowrap"
               >
                 {action.label}
               </Link>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
