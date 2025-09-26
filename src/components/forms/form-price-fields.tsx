'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface FormPriceFieldsProps {
  control: Control<any>;
  costPriceName?: string;
  salePriceName?: string;
}

export function FormPriceFields({
  control,
  costPriceName = 'cost_price',
  salePriceName = 'sale_price'
}: FormPriceFieldsProps) {
  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <DollarSign className='h-5 w-5 text-yellow-600' />
          Precios
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name={costPriceName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de Costo *</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <span className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'>
                      $
                    </span>
                    <Input
                      type='number'
                      placeholder='0.00'
                      {...field}
                      className='h-12 pl-10 text-lg'
                      min='0'
                      step='0.01'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={salePriceName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de Venta *</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <span className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'>
                      $
                    </span>
                    <Input
                      type='number'
                      placeholder='0.00'
                      {...field}
                      className='h-12 pl-10 text-lg'
                      min='0'
                      step='0.01'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
