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
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 mb-12 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">{title}</h3>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
          <Link
            href={primaryAction.href}
            className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-black uppercase tracking-widest ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 bg-white text-blue-700 hover:bg-blue-50 shadow-xl shadow-black/10 h-14 px-10 active:scale-95"
          >
            {primaryAction.label}
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 lg:mt-0">
             {secondaryActions.map((action) => (
               <Link 
                 key={action.href} 
                 href={action.href}
                 className="text-sm font-bold text-blue-200 hover:text-white transition-colors underline decoration-blue-400 underline-offset-4"
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
