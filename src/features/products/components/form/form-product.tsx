'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

import { Button } from '@/components/ui/button';

import type { Product } from '@/types/product';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CalendarIcon, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SIZE_RANGE_OPTIONS } from '../tables/product-tables/options';
import { FormSizesSection } from '@/features/products/components/form/form-sizes-section';
import FormSummaryProduct from './form-summary-product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface FormProductProps {
  initialData: Product | null;
}
export default function FormProduct({ initialData }: FormProductProps) {
  const [stockQuantities, setStockQuantities] = useState<
    Record<string, number>
  >(initialData?.stock || {});
  const [purchaseDate, setPurchaseDate] = useState<Date>();

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: initialData?.sku || '',
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
    }
  });

  function onSubmit(_values: ProductType) {
    toast.success('Producto guardado con éxito');
  }

  return (
    <div className='mx-auto w-full max-w-6xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {/* Columna izquierda - Formulario con tabs */}
            <div className='md:col-span-2'>
              <Tabs defaultValue='general' className='space-y-6'>
                <TabsList className='grid w-full grid-cols-5'>
                  <TabsTrigger value='general'>Información</TabsTrigger>
                  <TabsTrigger value='prices'>Precios</TabsTrigger>
                  <TabsTrigger value='sizes'>Talles y Stock</TabsTrigger>
                  <TabsTrigger value='images'>Imágenes</TabsTrigger>
                  <TabsTrigger value='colors'>Colores</TabsTrigger>
                </TabsList>

                {/* Tab: Información General */}
                <TabsContent value='general'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2 text-lg'>
                        <Package className='h-5 w-5 text-green-600' />
                        Información General
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <FormInputField
                          control={form.control}
                          name='name'
                          label='Nombre del Producto'
                          placeholder='Ej: Remera básica algodón'
                          required
                        />
                        <FormInputField
                          control={form.control}
                          name='brand'
                          label='Marca'
                          placeholder='Ej: Nike, Adidas'
                        />
                      </div>

                      <FormTextAreaField
                        control={form.control}
                        name='description'
                        label='Descripción'
                        placeholder='Descripción detallada del producto, materiales, características especiales...'
                        minHeight='100px'
                        description='Incluya detalles relevantes sobre el producto'
                      />

                      <div className='grid grid-cols-2 items-end gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        <FormField
                          control={form.control}
                          name='segment'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rubro *</FormLabel>
                              <Select
                                onValueChange={(val) =>
                                  field.onChange(JSON.parse(val))
                                }
                                value={
                                  field.value ? JSON.stringify(field.value) : ''
                                }
                              >
                                <FormControl>
                                  <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Seleccione un Rubro' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {SEGMENT_OPTIONS.map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormSelectField
                          control={form.control}
                          name='season'
                          label='Temporada'
                          options={SEASON_OPTIONS}
                          defaultValue='seasonal'
                        />
                        <FormSelectField
                          control={form.control}
                          name='pack_size'
                          label='Cantidad por Pack'
                          options={PACK_SIZE_OPTIONS}
                          defaultValue='1'
                        />
                      </div>
                      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <FormInputField
                          control={form.control}
                          name='provider'
                          label='Nombre del Proveedor'
                          placeholder='Ej: Nike, Adidas'
                          required
                        />
                        <FormField
                          control={form.control}
                          name='purchase_date'
                          render={() => (
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
                                <PopoverContent
                                  className='w-auto p-0'
                                  align='start'
                                >
                                  <Calendar
                                    mode='single'
                                    selected={purchaseDate}
                                    onSelect={setPurchaseDate}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date('1900-01-01')
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
                </TabsContent>

                {/* Tab: Precios */}
                <TabsContent value='prices'>
                  <FormPriceFields control={form.control} />
                </TabsContent>

                {/* Tab: Talles y Stock */}
                <TabsContent value='sizes'>
                  <FormSizesSection
                    control={form.control}
                    sizeRangeOptions={SIZE_RANGE_OPTIONS}
                    onStockChange={setStockQuantities}
                    defaultStockValues={initialData?.stock || {}}
                  />
                </TabsContent>

                {/* Tab: Imágenes */}
                <TabsContent value='images'>
                  <FormImageUpload name='image' />
                </TabsContent>

                {/* Tab: Colores */}
                <TabsContent value='colors'>
                  <FormColorSection control={form.control} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Columna derecha - Resumen del producto */}
            <div>
              <FormSummaryProduct initialData={!!initialData} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
