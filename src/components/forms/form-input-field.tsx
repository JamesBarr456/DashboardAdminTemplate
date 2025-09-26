'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormInputFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  autoFocus?: boolean;
}

export function FormInputField({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  description,
  required = false,
  disabled = false,
  className,
  inputClassName,
  leftIcon,
  rightIcon,
  min,
  max,
  step,
  autoFocus
}: FormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {required && '*'}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <div className='relative'>
              {leftIcon && (
                <span className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'>
                  {leftIcon}
                </span>
              )}
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  leftIcon && 'pl-10',
                  rightIcon && 'pr-10',
                  inputClassName
                )}
                min={min}
                max={max}
                step={step}
                autoFocus={autoFocus}
              />
              {rightIcon && (
                <span className='text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2'>
                  {rightIcon}
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
