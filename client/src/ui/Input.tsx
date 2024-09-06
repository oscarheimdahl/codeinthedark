import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `w-min rounded-md bg-darcula/30 px-2 py-1 text-xl text-white outline-none transition-colors focus:bg-darcula`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
