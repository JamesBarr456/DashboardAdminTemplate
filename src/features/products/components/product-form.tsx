'use client';

import * as z from 'zod';

import {
  CATEGORY_OPTIONS,
  CODIGO_OPTIONS,
  GENRE_OPTIONS,
  SIZE_RANGE_OPTIONS
} from './product-tables/options';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/file-uploader';
import { Input } from '@/components/ui/input';
import { Product } from '@/constants/product-mock-api';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const SimpleInput = ({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type={type}
      className={`border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      {...props}
    />
  );
};
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'La imagen es obligatoria.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `El tamaño máximo del archivo es 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Se aceptan archivos .jpg, .jpeg, .png y .webp.'
    ),
  sku: z.string().min(1, 'El SKU es obligatorio.'),
  brand: z.string().min(1, 'La marca es obligatoria.'),
  gender: z.string().min(1, 'El género es obligatorio.'),
  name: z.string().min(2, {
    message: 'El nombre del producto debe tener al menos 2 caracteres.'
  }),
  category: z.string(),
  sizes: z.string().min(1, 'El talle es obligatorio.'),
  cost_price: z.number().min(0, 'El precio de costo debe ser mayor a 0'),
  sale_price: z.number().min(0, 'El precio de venta debe ser mayor a 0'),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres.'
  }),
  has_discount: z.boolean(),
  discount_percentage: z.number().min(0).max(100).optional(),
  is_active: z.boolean(),
  stock: z.record(z.string(), z.number()).optional()
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const [stockQuantities, setStockQuantities] = useState<
    Record<string, number>
  >({});
  const defaultValues = {
    has_discount: initialData?.has_discount || false,
    name: initialData?.name || '',
    category: initialData?.category || '',
    cost_price: initialData?.cost_price || 0,
    description: initialData?.description || '',
    is_active: initialData?.is_active || true,
    sale_price: initialData?.sale_price || 0,
    brand: initialData?.brand || '',
    sizes: initialData?.sizes || '',
    sku: initialData?.sku || '',
    codigo: '',
    gender: initialData?.gender || '',
    stock: initialData?.stock || {}
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Lógica de envío del formulario
  }
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
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Campo de imagen */}
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Imágenes</FormLabel>
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
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* SKU */}
              <FormField
                control={form.control}
                name='sku'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CÓDIGO *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccione código' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CODIGO_OPTIONS.map((codigo) => (
                          <SelectItem key={codigo.value} value={codigo.value}>
                            {codigo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <Input placeholder='Ingrese la marca' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Nombre */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del producto *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ingrese el nombre del producto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Precio de costo */}
              <FormField
                control={form.control}
                name='cost_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de costo *</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Ingrese el precio'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Precio de venta */}
              <FormField
                control={form.control}
                name='sale_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de venta *</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Ingrese el precio'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Producto activo */}
              <FormField
                control={form.control}
                name='is_active'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between rounded-md border border-gray-200 p-4'>
                      <div>
                        <FormLabel className='text-base font-medium'>
                          Producto activo
                        </FormLabel>
                        <FormDescription>
                          El producto será visible en la tienda si está
                          habilitado.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                    </div>
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
                      placeholder='Ingrese la descripción del producto'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {/* Categoría */}
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccione una categoría' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
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
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccione el género' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENRE_OPTIONS.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Talles */}
              <FormField
                control={form.control}
                name='sizes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rango de Talles *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
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
            </div>
            {form.watch('sizes') &&
              getAvailableSizes(form.watch('sizes')).length > 0 && (
                <div className='space-y-4'>
                  <FormLabel className='text-base font-medium'>
                    Gestión de Stock por Talle
                  </FormLabel>
                  <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6'>
                    {getAvailableSizes(form.watch('sizes')).map((size) => (
                      <div key={size} className='space-y-2'>
                        <FormLabel className='text-sm font-medium'>
                          {size}
                        </FormLabel>
                        <SimpleInput
                          type='number'
                          min='0'
                          placeholder='0'
                          value={stockQuantities[size] || ''}
                          onChange={(e) =>
                            handleStockChange(size, Number(e.target.value) || 0)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <Button type='submit'>Agregar producto</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
