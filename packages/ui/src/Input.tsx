import React from 'react';
import { cn } from '@workspace/shared';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-black border border-gray-800 p-4 text-white focus:border-blue-500 outline-none transition-all",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
