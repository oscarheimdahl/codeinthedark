import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `w-min text-xl text-white outline-none rounded-md py-1 px-2 transition-colors
  focus:bg-darcula bg-darcula/30 `,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
