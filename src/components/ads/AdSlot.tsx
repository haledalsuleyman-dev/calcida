"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  id?: string;
  className?: string;
  type?: 'horizontal' | 'rectangle' | 'vertical' | 'fluid';
  label?: string;
}

/**
 * AdSlot - A stable container prepared for AdSense monetization.
 * It reserves space to avoid Layout Shift (CLS) even before ads are loaded.
 */
export function AdSlot({ id, className, type = 'horizontal', label = 'Advertisement' }: AdSlotProps) {
  // Define stable heights based on typical AdSense sizes to prevent CLS
  const typeClasses = {
    horizontal: 'min-h-[100px] md:min-h-[120px] lg:min-h-[280px]', // Typical leaderboard / large leaderboard
    rectangle: 'min-h-[250px] w-full max-w-[300px] mx-auto', // MPU / Large Rectangle
    vertical: 'min-h-[600px] w-[160px] hidden lg:block', // Skyscraper
    fluid: 'min-h-[100px] w-full',
  };

  return (
    <div 
      className={cn(
        "relative my-8 w-full overflow-hidden transition-all duration-300",
        typeClasses[type],
        className
      )}
    >
      {/* Subtle label for policy compliance and UX transparency */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold -translate-y-full mb-1 select-none">
          {label}
        </span>
      </div>

      {/* Placeholder with premium financial site aesthetic */}
      <div className="w-full h-full bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center group hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-30 transition-opacity">
            <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 italic">Financial Insight Placement Zone</span>
        </div>
        
        {/* Real AdSense implementation slot (for future use) */}
        {id && (
            <ins 
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-client="YOUR-CA-PUB-ID" // User will replace this
                data-ad-slot={id}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        )}
      </div>
    </div>
  );
}
