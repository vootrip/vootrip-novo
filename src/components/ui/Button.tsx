import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] text-white hover:shadow-lg hover:shadow-[#FF6B35]/25 focus:ring-[#FF6B35]',
    secondary: 'bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white hover:shadow-lg hover:shadow-[#00B4D8]/25 focus:ring-[#00B4D8]',
    outline: 'border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white focus:ring-[#FF6B35]',
    ghost: 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1A1A2E] focus:ring-[#64748B]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  };

  return (
    <button data-ev-id="ev_16174a8c07"
    className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    {...props}>

      {children}
    </button>);

}