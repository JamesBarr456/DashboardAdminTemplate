'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormTextAreaFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  textareaClassName?: string;
  minHeight?: string;
  maxHeight?: string;
  resize?: boolean;
  rows?: number;
}

export function FormTextAreaField({
  control,
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  className,
  textareaClassName,
  minHeight = '100px',
  maxHeight,
  resize = false,
  rows
}: FormTextAreaFieldProps) {
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
            <Textarea
              placeholder={placeholder}
              className={cn(
                resize ? '' : 'resize-none',
                minHeight && `min-h-[${minHeight}]`,
                maxHeight && `max-h-[${maxHeight}]`,
                textareaClassName
              )}
              disabled={disabled}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
