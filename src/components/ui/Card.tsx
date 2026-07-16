import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div data-ev-id="ev_eae51f2887" className={`
      bg-white rounded-2xl border border-[#E2E8F0] shadow-sm
      ${hover ? 'hover:shadow-lg hover:border-[#FF6B35]/20 transition-all duration-300 cursor-pointer' : ''}
      ${paddings[padding]}
      ${className}
    `}>
      {children}
    </div>);

}

export function CardHeader({ children, className = '' }: {children: ReactNode;className?: string;}) {
  return <div data-ev-id="ev_52e1320fb5" className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: {children: ReactNode;className?: string;}) {
  return <h3 data-ev-id="ev_61a5d68751" className={`text-lg font-semibold text-[#1A1A2E] ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = '' }: {children: ReactNode;className?: string;}) {
  return <div data-ev-id="ev_34a486543b" className={className}>{children}</div>;
}