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

// Button no se usa en este componente

import type { Product } from '@/types/product';

import { Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// removed unused format and cn
import { toast } from 'sonner';
import { SIZE_RANGE_OPTIONS } from '../tables/product-tables/options';
import { FormSizesSection } from '@/features/products/components/form/form-sizes-section';
import FormSummaryProduct from './form-summary-product';
import { DateTimePicker } from '@/components/datetime-picker';
import { Button } from '@/components/ui/button';
// Select UI se usa dentro de FormSelectField

interface FormProductProps {
  initialData: Product | null;
}
export default function FormProduct({ initialData }: FormProductProps) {
  // Fechas estáticas para evitar hidrations mismatch
  const minPurchaseDate = '1900-01-01T00:00:00.000Z';
  const [, setStockQuantities] = useState<Record<string, number>>(
    initialData?.stock || {}
  );
  // sin estado local: se maneja desde react-hook-form

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: initialData?.sku || '',
      name: initialData?.name || '',
      segment: initialData?.segment || { code: 1, name: 'hombre' },
      cost_price: initialData?.cost_price || 0,
      description: initialData?.description || '',
      is_active: initialData?.is_active ?? false,
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

  function onSubmit(values: ProductType) {
    // Log completo en consola para inspección detallada
    // Nota: abrir la consola del navegador para verlo formateado
    // eslint-disable-next-line no-console
    console.log('[FormProduct] Datos enviados:', values);

    // Además, mostramos un resumen en un toast

    toast.success('Producto guardado con éxito');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='relative'>
        <div className='mx-auto max-w-6xl space-y-8 p-5 pb-20'>
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
                        required
                        description='Incluya detalles relevantes sobre el producto'
                      />

                      <div className='grid grid-cols-2 items-end gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        <FormSelectField
                          control={form.control}
                          name='segment'
                          label='Rubro'
                          required
                          options={SEGMENT_OPTIONS.map((opt) => ({
                            label: opt.label,
                            value: String(opt.value.code)
                          }))}
                          placeholder='Seleccione un Rubro'
                          valueSelector={(val) =>
                            val ? String(val.code) : undefined
                          }
                          valueParser={(code) =>
                            SEGMENT_OPTIONS.find(
                              (o) => String(o.value.code) === code
                            )?.value
                          }
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
                        />
                        <FormField
                          control={form.control}
                          name='purchase_date'
                          render={({ field }) => (
                            <FormItem className='flex flex-col'>
                              <FormLabel>Fecha de Compra (Opcional)</FormLabel>
                              <FormControl>
                                <DateTimePicker
                                  value={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onChange={(d) =>
                                    field.onChange(d ? d.toISOString() : '')
                                  }
                                  hideTime
                                  clearable
                                  min={new Date(minPurchaseDate)}
                                  // No fijamos max dinámico en SSR; si se necesita límite, validar en cliente
                                />
                              </FormControl>
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

            <FormSummaryProduct />
          </div>
        </div>
        <div className='bg-background fixed right-0 bottom-0 left-0 border p-5'>
          <div className='mx-auto flex w-full max-w-6xl items-center justify-end gap-3'>
            <Button
              variant='outline'
              type='button'
              onClick={() => history.back()}
            >
              Regresar
            </Button>
            <Button
              type='submit'
              className='w-full font-medium sm:w-auto'
              size='lg'
            >
              {initialData ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
