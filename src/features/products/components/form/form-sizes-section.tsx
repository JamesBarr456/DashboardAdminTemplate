'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { SimpleInput } from '@/components/common/input-common';
import { Badge } from '@/components/ui/badge';
import { Ruler } from 'lucide-react';
import { Control } from 'react-hook-form';
import { useState } from 'react';

interface SizeRange {
  value: string;
  label: string;
  sizes: string[];
}

interface FormSizesSectionProps {
  control: Control<any>;
  sizeRangeOptions: SizeRange[];
  onStockChange?: (stockData: Record<string, number>) => void;
  defaultStockValues?: Record<string, number>;
}

export function FormSizesSection({
  control,
  sizeRangeOptions,
  onStockChange,
  defaultStockValues = {}
}: FormSizesSectionProps) {
  const [stockQuantities, setStockQuantities] =
    useState<Record<string, number>>(defaultStockValues);

  const getAvailableSizes = (sizeRange: string) => {
    const selectedRange = sizeRangeOptions.find(
      (option) => option.value === sizeRange
    );
    return selectedRange ? selectedRange.sizes : [];
  };

  const handleStockChange = (size: string, quantity: number) => {
    const newStockQuantities = {
      ...stockQuantities,
      [size]: quantity
    };
    setStockQuantities(newStockQuantities);
    onStockChange?.(newStockQuantities);
  };

  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Ruler className='h-5 w-5 text-purple-600' />
          Talles y Gestión de Stock
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Rango de talles */}
        <FormField
          control={control}
          name='sizes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rango de Talles *</FormLabel>
              <FormDescription>
                Seleccione el rango de talles disponibles para este producto
              </FormDescription>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  setStockQuantities({});
                  onStockChange?.({});
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccione rango de talles' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizeRangeOptions.map((sizeRange) => (
                    <SelectItem key={sizeRange.value} value={sizeRange.value}>
                      {sizeRange.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />

              {field.value && getAvailableSizes(field.value).length > 0 && (
                <div className='mt-6 space-y-4'>
                  <div className='flex items-center gap-2'>
                    <FormLabel className='text-base font-medium'>
                      Stock por Talle
                    </FormLabel>
                    <Badge variant='secondary' className='text-xs'>
                      {getAvailableSizes(field.value).length} talles
                    </Badge>
                  </div>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    {getAvailableSizes(field.value).map((size) => (
                      <div key={size} className='space-y-2'>
                        <FormLabel className='block text-center text-sm font-medium'>
                          Talle {size}
                        </FormLabel>
                        <SimpleInput
                          type='number'
                          min='0'
                          placeholder='0'
                          className='text-center'
                          value={stockQuantities[size.toLowerCase()] || ''}
                          onChange={(e) =>
                            handleStockChange(
                              size.toLowerCase(),
                              Number(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
