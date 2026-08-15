import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, asChild = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2';

    const variants = {
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] shadow-xs',
      secondary: 'bg-[var(--surface-subtle)] text-[var(--foreground)] hover:bg-[var(--surface-strong)] active:bg-[var(--border)] border border-[var(--border)]',
      outline: 'bg-transparent text-[var(--foreground)] border border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] active:bg-[var(--surface-strong)]',
      ghost: 'bg-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]',
      danger: 'bg-[var(--danger)] text-white hover:bg-red-700 active:bg-red-800 shadow-xs',
      subtle: 'bg-[var(--primary-subtle)] text-[var(--primary)] hover:bg-blue-100 active:bg-blue-200',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5 min-h-[32px]',
      md: 'h-10 px-4 text-sm gap-2 min-h-[40px]',
      lg: 'h-11 px-5 text-base gap-2.5 min-h-[44px]',
      icon: 'h-10 w-10 p-0 text-sm min-h-[40px] min-w-[40px]',
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(combinedClassName, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>กำลังโหลด...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
