'use client';

import { Badge } from '@/components/ui/badge';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SEGMENT_OPTIONS } from '@/constants/mocks/products';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

function FormSegmentCode() {
  const { control, watch } = useFormContext();
  const [productCode, setProductCode] = useState<string>('');
  const [loadingCode, setLoadingCode] = useState<boolean>(false);

  useEffect(() => {
    const segment = watch('segment');
    if (segment && segment.code) {
      setLoadingCode(true);
      // Simula delay de backend
      const timeout = setTimeout(() => {
        const random = Math.floor(100 + Math.random() * 900);
        setProductCode(`${segment.code}${random}`);
        setLoadingCode(false);
      }, 1200);
      return () => clearTimeout(timeout);
    } else {
      setProductCode('');
    }
  }, [watch('segment')]);

  return (
    <>
      <FormField
        control={control}
        name='segment'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rubro *</FormLabel>
            <Select
              onValueChange={(val) => field.onChange(JSON.parse(val))}
              value={field.value ? JSON.stringify(field.value) : ''}
            >
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Seleccione un segmento' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SEGMENT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='flex flex-col gap-2'>
        <FormLabel>Código generado</FormLabel>
        <div>
          <Badge
            variant='outline'
            className='flex h-10 min-w-[70px] items-center justify-center px-4 py-2 text-lg'
          >
            {loadingCode ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='h-5 w-5 animate-spin' />
                Generando...
              </span>
            ) : (
              productCode || <span className='text-gray-400'>----</span>
            )}
          </Badge>
        </div>
      </div>
    </>
  );
}

export default FormSegmentCode;
