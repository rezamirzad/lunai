import React from 'react';
import { cn } from '@workspace/shared';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mobileFullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, mobileFullWidth = true, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all min-h-[44px]",
          mobileFullWidth ? "w-full" : "w-auto",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mobileFullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, mobileFullWidth = true, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all min-h-[44px]",
          mobileFullWidth ? "w-full" : "w-auto",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
