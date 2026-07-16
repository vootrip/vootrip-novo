import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const variants = {
    default: 'bg-[#F1F5F9] text-[#64748B]',
    success: 'bg-[#06D6A0]/10 text-[#06D6A0]',
    warning: 'bg-[#FFD166]/10 text-[#E5A800]',
    error: 'bg-[#EF476F]/10 text-[#EF476F]',
    info: 'bg-[#00B4D8]/10 text-[#00B4D8]'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span data-ev-id="ev_7fd45e7458" className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>);

}