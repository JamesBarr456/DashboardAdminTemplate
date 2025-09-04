'use client';

import { AlertTriangle, MessageSquare, Package, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Control, useWatch } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrderEditFormData } from './order-form';
import { OrderProduct } from '@/services/order-mock-api';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ProductEditCardProps {
  product: OrderProduct;
  index: number;
  control: Control<OrderEditFormData>;
  register: any;
  errors: any;
  setValue: any;
}

export function ProductEditCard({
  product,
  index,
  control,
  register,
  errors,
  setValue
}: ProductEditCardProps) {
  const watchedValues = useWatch({
    control,
    name: `products.${index}`
  });

  const isDefective = watchedValues?.defective || false;
  const isUnavailable = watchedValues?.unavailable || false;

  const handleDefectiveToggle = (checked: boolean) => {
    setValue(`products.${index}.defective`, checked);
    if (!checked) {
      setValue(`products.${index}.defective_quantity`, 0);
      setValue(`products.${index}.defect_comment`, '');
    }
  };

  const handleUnavailableToggle = () => {
    const newValue = !isUnavailable;
    setValue(`products.${index}.unavailable`, newValue);
    if (newValue) {
      setValue(`products.${index}.defective`, false);
      setValue(`products.${index}.defective_quantity`, 0);
      setValue(`products.${index}.defect_comment`, '');
    }
  };

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex flex-col justify-center gap-4 xl:flex-row'>
          {/* Product Image Placeholder */}
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100'>
            <Package className='h-6 w-6 text-gray-400' />
          </div>

          {/* Product Info */}
          <div className='flex-1 space-y-4'>
            {/* Header with product info and action buttons */}
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <h4
                  className={cn(
                    'font-medium',
                    isUnavailable && 'text-gray-500 line-through'
                  )}
                >
                  {product.product_name}
                </h4>
                <p className='text-sm text-gray-600'>
                  SKU: {product.product_sku}
                </p>
                <div className='flex items-center gap-4 text-sm'>
                  <span>
                    Cantidad: <strong>{product.quantity}</strong>
                  </span>
                  <span>
                    Precio: <strong>${product.unit_price.toFixed(2)}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex justify-end gap-4'>
                {isDefective && !isUnavailable && (
                  <Badge variant='secondary' className='bg-red-700'>
                    <AlertTriangle className='mr-1 h-3 w-3' />
                    Defectuoso
                  </Badge>
                )}
                {isUnavailable && (
                  <Badge variant='secondary'>
                    <Trash2 className='mr-1 h-3 w-3' />
                    No disponible
                  </Badge>
                )}

                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={handleUnavailableToggle}
                  className={cn(
                    'h-8 w-8 p-0 transition-colors',
                    isUnavailable
                      ? 'border-red-200 bg-red-100 text-red-600 hover:bg-red-200'
                      : 'hover:bg-gray-100'
                  )}
                  disabled={isDefective}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Product Total */}
            <div className='text-right'>
              <div
                className={cn(
                  'font-medium',
                  (isDefective || isUnavailable) && 'text-gray-500 line-through'
                )}
              >
                ${product.subtotal.toFixed(2)}
              </div>
            </div>

            {/* Defective Toggle and Controls */}
            {!isUnavailable && (
              <div className='space-y-4 border-t border-gray-100 pt-4'>
                <div className='flex items-center space-x-3'>
                  <Switch
                    id={`defective-${product.id}`}
                    checked={isDefective}
                    onCheckedChange={handleDefectiveToggle}
                  />
                  <Label
                    htmlFor={`defective-${product.id}`}
                    className='cursor-pointer text-sm font-medium'
                  >
                    Marcar como defectuoso
                  </Label>
                </div>

                {/* Defective Quantity and Comment */}
                {isDefective && (
                  <div className='grid grid-cols-1 gap-4 rounded-lg border p-4 xl:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor={`quantity-${product.id}`}
                        className='text-sm font-medium'
                      >
                        Cantidad defectuosa
                      </Label>
                      <Input
                        id={`quantity-${product.id}`}
                        type='number'
                        min='1'
                        max={product.quantity}
                        {...register(`products.${index}.defective_quantity`, {
                          valueAsNumber: true,
                          validate: (value: number) => {
                            if (
                              isDefective &&
                              (value < 1 || value > product.quantity)
                            ) {
                              return `Debe estar entre 1 y ${product.quantity}`;
                            }
                            return true;
                          }
                        })}
                        className='h-8'
                      />
                      {errors?.products?.[index]?.defective_quantity && (
                        <p className='text-xs text-red-600'>
                          {errors.products[index].defective_quantity.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2 md:col-span-1'>
                      <Label
                        htmlFor={`comment-${product.id}`}
                        className='flex items-center gap-1 text-sm font-medium'
                      >
                        <MessageSquare className='h-3 w-3' />
                        Comentario del problema
                      </Label>
                      <Textarea
                        id={`comment-${product.id}`}
                        placeholder='Describe el problema encontrado...'
                        {...register(`products.${index}.defect_comment`)}
                        className='h-20 resize-none text-sm'
                        maxLength={500}
                      />
                      {errors?.products?.[index]?.defect_comment && (
                        <p className='text-xs text-red-600'>
                          {errors.products[index].defect_comment.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
