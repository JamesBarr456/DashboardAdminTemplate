'use client';

import * as z from 'zod';

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
import { Product, categories, genders, sizes } from '@/constants/mock-api';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  sku: z.string().min(1, 'SKU is required.'),
  brand: z.string().min(1, 'Brand is required.'),
  gender: z.string().min(1, 'Gender is required.'),
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  category: z.string(),
  sizes: z.array(z.string()).min(1, 'Size is required.'),
  cost_price: z.number().min(0, 'cost price must be greater than 0'),
  sale_price: z.number().min(0, 'sale price must be greater than 0'),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  has_discount: z.boolean(),
  discount_percentage: z.number().min(0).max(100).optional(),
  is_active: z.boolean()
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    category: initialData?.category || '',
    cost_price: initialData?.cost_price || 0,
    description: initialData?.description || '',
    has_discount: initialData?.has_discount || false,
    is_active: initialData?.is_active || true,
    sale_price: initialData?.sale_price || 0,
    brand: initialData?.brand || '',
    sizes: initialData?.sizes || [],
    colors: initialData?.colors || [],
    sku: initialData?.sku || '',
    gender: initialData?.gender || '',
    discount_percentage: initialData?.discount_percentage || 0
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic would be implemented here
  }

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
            {/* Image field Add */}
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                        // disabled={loading}
                        // progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        // disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* SKU field Add */}
              <FormField
                control={form.control}
                name='sku'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU *</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter SKU' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Brand field Add */}
              <FormField
                control={form.control}
                name='brand'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand *</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Brand' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name field Add */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Cost price field Add */}
              <FormField
                control={form.control}
                name='cost_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Sale Price field Add */}
              <FormField
                control={form.control}
                name='sale_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Discount field Add */}

            <div className='grid grid-cols-1 items-start gap-6 md:grid-cols-2'>
              <div className='space-y-4 rounded-md border border-gray-200 p-4'>
                <FormField
                  control={form.control}
                  name='has_discount'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center justify-between'>
                        <div>
                          <FormLabel className='text-base font-medium'>
                            Apply Discount
                          </FormLabel>
                          <FormDescription>
                            The product will be discounted if enabled.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked)
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    form.watch('has_discount')
                      ? 'max-h-40 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <FormField
                    control={form.control}
                    name='discount_percentage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Percentage (%)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min='0'
                            max='100'
                            placeholder='0'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name='is_active'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between rounded-md border border-gray-200 p-4'>
                      <div>
                        <FormLabel className='text-base font-medium'>
                          Active Product
                        </FormLabel>
                        <FormDescription>
                          The product will be visible in the store if enabled.
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
            {/* Description field Add */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter product description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {/* Category field Add */}
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select categories' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender field Add */}
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender *</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem
                            key={gender}
                            value={gender}
                            className='w-full'
                          >
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sizes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        if (!field.value.includes(value)) {
                          field.onChange([...field.value, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select sizes' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem
                            key={size}
                            value={size}
                            className='capitalize'
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Contenedor animado para evitar salto brusco */}
                    <div
                      className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                        field.value.length > 0
                          ? 'max-h-40 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className='flex flex-wrap gap-2'>
                        {field.value.map((size) => (
                          <span
                            key={size}
                            className='flex scale-100 transform items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 opacity-100 transition-all duration-200 ease-out'
                          >
                            {size}
                            <button
                              type='button'
                              className='ml-1 text-blue-500 hover:text-blue-700'
                              onClick={() => {
                                const el = document.getElementById(
                                  `size-${size}`
                                );
                                if (el) {
                                  el.classList.add('opacity-0', 'scale-75');
                                  setTimeout(() => {
                                    field.onChange(
                                      field.value.filter((s) => s !== size)
                                    );
                                  }, 200);
                                } else {
                                  field.onChange(
                                    field.value.filter((s) => s !== size)
                                  );
                                }
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit'>Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
