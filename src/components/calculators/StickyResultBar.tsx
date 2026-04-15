"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface StickyResultBarProps {
  label: string;
  value: number | string;
  secondaryLabel?: string;
  secondaryValue?: number;
  prefix?: string;
  suffix?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
  onCopy?: () => void;
}

export function StickyResultBar({ 
  label, 
  value, 
  secondaryLabel, 
  secondaryValue,
  prefix = '$',
  suffix = '',
  triggerRef,
  onCopy
}: StickyResultBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!triggerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when the trigger element is NOT intersecting (scrolled past)
        // We specifically want to know if it's "above" the viewport.
        // entry.boundingClientRect.top < 0 means it's scrolled up.
        setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [triggerRef]);

  if (!isVisible || !value) return null;

  const handleCopy = () => {
    if (onCopy) {
        onCopy();
        return;
    }
    const valDisplay = typeof value === 'number' && prefix === '$' ? formatCurrency(value) : value;
    const text = `${label}: ${prefix === '$' && typeof value === 'number' ? '' : ''}${valDisplay}${suffix}`;
    navigator.clipboard.writeText(text);
    // Could add a toast here
    alert("Copied!");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-gray-200/50 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] p-4 pb-safe z-50 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] md:text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">{label}</div>
          <div className="text-xl md:text-2xl font-black text-gray-900 leading-none">
            {typeof value === 'number' && prefix === '$' ? formatCurrency(value) : value}{suffix}
          </div>
          {secondaryLabel && secondaryValue !== undefined && (
             <div className="text-[10px] md:text-xs text-gray-500 mt-1 font-medium">
                {secondaryLabel}: <span className="text-gray-700">{formatCurrency(secondaryValue)}</span>
             </div>
          )}
        </div>
        <div className="flex gap-2">
            <Button 
                onClick={handleCopy}
                size="sm"
                className="shrink-0 h-10 px-4"
            >
                Share
            </Button>
        </div>
      </div>
    </div>
  );
}
