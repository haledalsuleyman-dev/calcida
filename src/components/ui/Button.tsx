import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          {
            'bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg': variant === 'default',
            'border-2 border-gray-100 bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50':
              variant === 'outline',
            'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',
            'text-blue-600 underline-offset-4 hover:underline':
              variant === 'link',
            'h-12 px-6 py-2': size === 'default',
            'h-10 rounded-lg px-4': size === 'sm',
            'h-14 rounded-xl px-10 text-base': size === 'lg',
            'h-12 w-12': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
