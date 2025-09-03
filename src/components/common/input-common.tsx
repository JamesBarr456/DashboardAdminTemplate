import React from 'react';
import { cn } from '@/lib/utils'; // opcional si usás la función para unir clases

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SimpleInput: React.FC<SimpleInputProps> = ({
  className,
  type = 'text',
  ...props
}) => {
  return (
    <input
      type={type}
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};
