import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function Input({ label, icon, error, className = '', ...props }: InputProps) {
  return (
    <div data-ev-id="ev_a533124c4b" className="flex flex-col gap-1.5">
      {label &&
      <label data-ev-id="ev_f55b616d03" className="text-sm font-medium text-[#1A1A2E]">
          {label}
        </label>
      }
      <div data-ev-id="ev_2ae73b2c31" className="relative">
        {icon &&
        <div data-ev-id="ev_93b56d2e36" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
            {icon}
          </div>
        }
        <input data-ev-id="ev_5ce9503b2d"
        className={`
            w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white
            text-[#1A1A2E] placeholder:text-[#94A3B8]
            focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]
            transition-all duration-200
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-[#EF476F] focus:ring-[#EF476F]/20 focus:border-[#EF476F]' : ''}
            ${className}
          `}
        {...props} />

      </div>
      {error &&
      <span data-ev-id="ev_3780ddf11b" className="text-sm text-[#EF476F]">{error}</span>
      }
    </div>);

}