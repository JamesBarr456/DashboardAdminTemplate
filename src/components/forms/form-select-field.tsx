'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Control } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  description?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
  // Mapea el valor actual del campo (puede ser objeto) a string para el Select
  valueSelector?: (fieldValue: any) => string | undefined;
  // Convierte el string seleccionado por el Select al valor que se debe guardar en el form (string u objeto)
  valueParser?: (value: string) => any;
}

export function FormSelectField({
  control,
  name,
  label,
  placeholder,
  options,
  description,
  required = false,
  defaultValue,
  className,
  onChange,
  valueSelector,
  valueParser
}: FormSelectFieldProps) {
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
          <Select
            onValueChange={(value) => {
              const parsed = valueParser ? valueParser(value) : value;
              field.onChange(parsed);
              onChange?.(value);
            }}
            value={
              (valueSelector ? valueSelector(field.value) : field.value) ||
              defaultValue
            }
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    placeholder || `Seleccione ${label.toLowerCase()}`
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
