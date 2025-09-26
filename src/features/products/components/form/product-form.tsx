'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  PACK_SIZE_OPTIONS,
  SEASON_OPTIONS,
  SEGMENT_OPTIONS
} from '@/constants/mocks/products';
import { FormInputField } from '@/components/forms/form-input-field';
import { FormSelectField } from '@/components/forms/form-select-field';
import { FormImageUpload } from '@/components/forms/form-image-upload';
import { FormPriceFields } from '@/components/forms/form-price-fields';
import { FormColorSection } from '@/features/products/components/form/form-color-section';
import { FormTextAreaField } from '@/components/forms/form-textarea-field';

import { type ProductType, productSchema } from '@/schemas/product-schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { Product } from '@/types/product';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CalendarIcon, Package, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SIZE_RANGE_OPTIONS } from '../tables/product-tables/options';
import { FormSizesSection } from '@/features/products/components/form/form-sizes-section';

export default function ProductFormImproved({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const [stockQuantities, setStockQuantities] = useState<
    Record<string, number>
  >(initialData?.stock || {});
  const [purchaseDate, setPurchaseDate] = useState<Date>();
  const [productCode, setProductCode] = useState<string>('');
  const [loadingCode, setLoadingCode] = useState<boolean>(false);
  const defaultValues: Partial<ProductType> = {
    name: initialData?.name || '',
    segment: initialData?.segment || { code: 1, name: 'hombre' },
    cost_price: initialData?.cost_price || 0,
    description: initialData?.description || '',
    is_active: initialData?.is_active ?? true,
    sale_price: initialData?.sale_price || 0,
    brand: initialData?.brand || '',
    sizes: initialData?.sizes || '',

    colors: initialData?.colors || [],
    season: initialData?.season || 'seasonal',
    provider: initialData?.provider || '',
    pack_size: initialData?.pack_size || '1',
    purchase_date: initialData?.purchase_date || '',
    image: initialData?.images || []
  };

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues
  });

  useEffect(() => {
    const segment = form.watch('segment');
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
  }, [form.watch('segment')]);

  function onSubmit(values: ProductType) {
    console.log('✅ Producto enviado:', values);
    toast.success('Producto guardado con éxito');
  }

  return (
    <div className='mx-auto w-full max-w-6xl space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{pageTitle}</h1>
          <p className='text-muted-foreground'>
            Complete la información del producto.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log('❌ Errores de validación:', errors);
            toast.error('Hay campos inválidos. Revisa la consola.');
          })}
          className='space-y-8'
        >
          {/* Section 1: Imágenes */}
          <FormImageUpload control={form.control} name='image' />

          {/* Section 2: Información General */}
          <Card>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Package className='h-5 w-5 text-green-600' />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Nombre */}
                <FormInputField
                  control={form.control}
                  name='name'
                  label='Nombre del Producto'
                  placeholder='Ej: Remera básica algodón'
                  required
                />

                {/* Marca */}
                <FormInputField
                  control={form.control}
                  name='brand'
                  label='Marca'
                  placeholder='Ej: Nike, Adidas'
                />
              </div>

              {/* Descripción */}
              <FormTextAreaField
                control={form.control}
                name='description'
                label='Descripción'
                placeholder='Descripción detallada del producto, materiales, características especiales...'
                minHeight='100px'
                description='Incluya detalles relevantes sobre el producto'
              />

              <div className='grid grid-cols-2 items-end gap-6 md:grid-cols-2 lg:grid-cols-4'>
                {/* Segmento */}
                <div className='flex flex-col gap-2'>
                  <FormSelectField
                    control={form.control}
                    name='segment'
                    label='Rubro *'
                    placeholder='Seleccione un segmento'
                    options={SEGMENT_OPTIONS}
                    required
                  />
                </div>
                {/* Código generado */}
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
                        productCode || (
                          <span className='text-gray-400'>----</span>
                        )
                      )}
                    </Badge>
                  </div>
                </div>
                {/* Temporada */}
                <FormSelectField
                  control={form.control}
                  name='season'
                  label='Temporada'
                  options={SEASON_OPTIONS}
                  defaultValue='seasonal'
                />

                {/* Pack size */}
                <FormSelectField
                  control={form.control}
                  name='pack_size'
                  label='Cantidad por Pack'
                  options={PACK_SIZE_OPTIONS}
                  defaultValue='1'
                />
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Proveedor */}
                <FormInputField
                  control={form.control}
                  name='provider'
                  label='Nombre del Proveedor'
                  placeholder='Ej: Nike, Adidas'
                  required
                />
                {/* Fecha de compra */}
                <FormField
                  control={form.control}
                  name='purchase_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Fecha de Compra (Opcional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !purchaseDate && 'text-muted-foreground'
                              )}
                            >
                              {purchaseDate ? (
                                format(purchaseDate, 'PPP')
                              ) : (
                                <span>Seleccionar fecha</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={purchaseDate}
                            onSelect={setPurchaseDate}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Precios y Descuentos */}
          <FormPriceFields control={form.control} />

          {/* Section 4: Talles y Stock */}
          <FormSizesSection
            control={form.control}
            sizeRangeOptions={SIZE_RANGE_OPTIONS}
            onStockChange={setStockQuantities}
            defaultStockValues={initialData?.stock || {}}
          />

          {/* Section 5: Colores y Configuración */}
          <FormColorSection control={form.control} />

          {/* Submit Button */}
          <div className='flex justify-end gap-4 pt-6'>
            <Button type='button' variant='outline' size='lg'>
              Cancelar
            </Button>
            <Button type='submit' size='lg' className='min-w-[150px]'>
              {initialData ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
