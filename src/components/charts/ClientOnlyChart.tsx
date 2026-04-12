"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function ClientOnlyChart(props: { className?: string; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return <div className={cn('w-full', props.className)}>{mounted ? props.children : null}</div>;
}

