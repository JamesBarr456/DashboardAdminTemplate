'use client';

import { GENRE_OPTIONS, SIZE_RANGE_OPTIONS } from './product-tables/options';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  colorMap,
  colors,
  PACK_SIZE_OPTIONS,
  SEASON_OPTIONS,
  SEGMENT_OPTIONS
} from '@/constants/mocks/products';
import { type ProductType, productSchema } from '@/schemas/product-schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/file-uploader';
import { Input } from '@/components/ui/input';
import type { Product } from '@/types/product';
import { SimpleInput } from '@/components/common/input-common';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  CalendarIcon,
  Package,
  DollarSign,
  Palette,
  Ruler,
  ImageIcon,
  Check
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

  const defaultValues: Partial<ProductType> = {
    name: initialData?.name || '',
    segment: initialData?.segment || { code: 1, name: 'hombre' },
    cost_price: initialData?.cost_price || 0,
    description: initialData?.description || '',
    is_active: initialData?.is_active ?? true,
    sale_price: initialData?.sale_price || 0,
    brand: initialData?.brand || '',
    sizes: initialData?.sizes || '',
    gender: initialData?.gender || 'unisex',
    colors: initialData?.colors || [],
    season: initialData?.season || 'seasonal',
    provider: initialData?.provider || '',
    pack_size: initialData?.pack_size || '1',
    purchase_date: initialData?.purchase_date || ''
  };

  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues
  });

  function onSubmit(values: ProductType) {
    console.log('✅ Producto enviado:', values);
  }
  const handleColorToggle = (color: string, currentColors: string[]) => {
    const isSelected = currentColors.includes(color);
    if (isSelected) {
      return currentColors.filter((c) => c !== color);
    } else {
      return [...currentColors, color];
    }
  };
  const getAvailableSizes = (sizeRange: string) => {
    const selectedRange = SIZE_RANGE_OPTIONS.find(
      (option) => option.value === sizeRange
    );
    return selectedRange ? selectedRange.sizes : [];
  };

  const handleStockChange = (size: string, quantity: number) => {
    setStockQuantities((prev) => ({
      ...prev,
      [size]: quantity
    }));
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Section 1: Imágenes */}
          <Card>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <ImageIcon className='h-5 w-5 text-blue-600' />
                Imágenes del Producto
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='mx-5 gap-6 md:mx-20'>
                {/* Imagen principal */}
                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={4}
                          maxSize={4 * 1024 * 1024}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

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
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ej: Remera básica algodón'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marca */}
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input placeholder='Ej: Nike, Adidas' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Descripción */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Descripción detallada del producto, materiales, características especiales...'
                        className='min-h-[100px] resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                {/* Segmento */}
                <FormField
                  control={form.control}
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

                {/* Género */}
                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Género *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Seleccione género' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {GENRE_OPTIONS.map((opt) => (
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
                {/* Temporada */}
                <FormField
                  control={form.control}
                  name='season'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temporada</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Seleccione temporada' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SEASON_OPTIONS.map((opt) => (
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

                {/* Pack size */}
                <FormField
                  control={form.control}
                  name='pack_size'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad por Pack</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || '1'}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Seleccione cantidad' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PACK_SIZE_OPTIONS.map((opt) => (
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
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Proveedor */}
                <FormField
                  control={form.control}
                  name='provider'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proveedor</FormLabel>
                      <FormControl>
                        <Input placeholder='Nombre del proveedor' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                  control={form.control}
                  name='cost_price'
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
                            step='0.01'
                            placeholder='0.00'
                            className='pl-8'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='sale_price'
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
                            step='0.01'
                            placeholder='0.00'
                            className='pl-8'
                            {...field}
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

          {/* Section 4: Talles y Stock */}
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
                control={form.control}
                name='sizes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rango de Talles *</FormLabel>
                    <FormDescription>
                      Seleccione el rango de talles disponibles para este
                      producto
                    </FormDescription>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        setStockQuantities({});
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccione rango de talles' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SIZE_RANGE_OPTIONS.map((sizeRange) => (
                          <SelectItem
                            key={sizeRange.value}
                            value={sizeRange.value}
                          >
                            {sizeRange.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock por talle */}
              {form.watch('sizes') &&
                getAvailableSizes(form.watch('sizes')).length > 0 && (
                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      <FormLabel className='text-base font-medium'>
                        Stock por Talle
                      </FormLabel>
                      <Badge variant='secondary' className='text-xs'>
                        {getAvailableSizes(form.watch('sizes')).length} talles
                      </Badge>
                    </div>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                      {getAvailableSizes(form.watch('sizes')).map((size) => (
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
            </CardContent>
          </Card>

          {/* Section 5: Colores y Configuración */}
          <Card>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Palette className='h-5 w-5 text-pink-600' />
                Colores y Configuración
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Colores */}
              <FormField
                control={form.control}
                name='colors'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colores Disponibles</FormLabel>
                    <FormDescription>
                      Seleccione los colores disponibles para este producto
                    </FormDescription>
                    <FormControl>
                      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8'>
                        {colors.map((color) => {
                          const isSelected =
                            field.value?.includes(color) || false;
                          return (
                            <Button
                              key={color}
                              type='button'
                              variant={isSelected ? 'ghost' : 'outline'}
                              size='sm'
                              className={cn(
                                'relative h-12 w-full cursor-pointer flex-col gap-1 transition-all duration-200',
                                isSelected &&
                                  'ring-primary ring-2 ring-offset-2'
                              )}
                              onClick={() => {
                                const newColors = handleColorToggle(
                                  color,
                                  field.value || []
                                );
                                field.onChange(newColors);
                              }}
                              aria-pressed={isSelected}
                              aria-label={`${isSelected ? 'Deseleccionar' : 'Seleccionar'} color ${color}`}
                            >
                              <div className='flex items-center gap-2'>
                                <div
                                  className={cn(
                                    'h-4 w-4 rounded-full border',
                                    colorMap[color]
                                  )}
                                  aria-hidden='true'
                                />
                                {isSelected && (
                                  <Check
                                    className='h-3 w-3'
                                    aria-hidden='true'
                                  />
                                )}
                              </div>
                              <span className='text-xs font-medium capitalize'>
                                {color}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estado activo */}
              <FormField
                control={form.control}
                name='is_active'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base font-medium'>
                          Producto Activo
                        </FormLabel>
                        <FormDescription>
                          El producto será visible en la tienda si está
                          habilitado
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

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
