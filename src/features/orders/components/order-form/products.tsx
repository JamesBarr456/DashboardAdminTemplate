'use client';

import { AlertTriangle, MessageSquare, Package, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useFormContext, useWatch } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item, OrderStatus } from '@/types/order-new';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';

interface ProductEditCardProps {
  product: Item;
  index: number;
  status: OrderStatus | undefined;
}

export const ProductEditCard = ({
  product,
  index,
  status
}: ProductEditCardProps) => {
  const { control, setValue } = useFormContext();
  const isDefective = useWatch({ control, name: `items.${index}.defective` });
  const isUnavailable = useWatch({
    control,
    name: `items.${index}.unavailable`
  });
  const isEditable = status === 'pending';

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        isUnavailable && 'border-gray-200 bg-gray-50 opacity-60',
        isDefective && !isUnavailable && 'border-amber-200 bg-amber-50'
      )}
    >
      <CardContent className='p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100'>
            <Package className='h-6 w-6 text-gray-400' />
          </div>
          <div className='flex-1 space-y-4'>
            <div className='flex justify-between'>
              <div className='space-y-1'>
                <h4
                  className={cn(
                    'font-medium text-gray-900',
                    isUnavailable && 'text-gray-500 line-through'
                  )}
                >
                  {product.name}
                </h4>
                <p className='text-sm text-gray-600'>
                  SKU: {product.product_sku}
                </p>
                <div className='flex items-center gap-4 text-sm'>
                  <span>
                    Cantidad: <strong>{product.quantity}</strong>
                  </span>
                  <span>
                    Precio: <strong>{formatPrice(product.price)}</strong>
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {isDefective && !isUnavailable && (
                  <Badge
                    variant='secondary'
                    className='border-amber-200 bg-amber-100 text-amber-800'
                  >
                    <AlertTriangle className='mr-1 h-3 w-3' />
                    Defectuoso
                  </Badge>
                )}
                {isUnavailable && (
                  <Badge
                    variant='secondary'
                    className='border-gray-200 bg-gray-100 text-gray-600'
                  >
                    <Trash2 className='mr-1 h-3 w-3' />
                    No disponible
                  </Badge>
                )}
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    setValue(`items.${index}.unavailable`, !isUnavailable)
                  }
                  className={cn(
                    'h-8 w-8 cursor-pointer p-0 transition-colors',
                    isUnavailable
                      ? 'border-red-200 bg-red-100 text-red-600 hover:bg-red-200'
                      : 'hover:bg-gray-100'
                  )}
                  disabled={!isEditable}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <div className='text-right'>
              <div
                className={cn(
                  'font-medium',
                  (isDefective || isUnavailable) && 'text-gray-500 line-through'
                )}
              >
                {formatPrice(product.total_mount)}
              </div>
            </div>
            {!isUnavailable && (
              <div className='space-y-4 border-t border-gray-100 pt-4'>
                <div className='flex items-center space-x-3'>
                  <Switch
                    id={`defective-${product._id}`}
                    checked={isDefective}
                    onCheckedChange={() =>
                      setValue(`items.${index}.defective`, !isDefective)
                    }
                    disabled={!isEditable}
                  />
                  <Label
                    htmlFor={`defective-${product._id}`}
                    className='cursor-pointer text-sm font-medium'
                  >
                    Marcar como defectuoso
                  </Label>
                </div>
                {isDefective && (
                  <div className='grid grid-cols-1 gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 md:grid-cols-2'>
                    <FormField
                      control={control}
                      name={`items.${index}.defective_quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-sm font-medium'>
                            Cantidad defectuosa
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              min={1}
                              max={product.quantity}
                              className='h-8'
                              {...field}
                              disabled={!isEditable}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`items.${index}.defect_comment`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='flex items-center gap-1 text-sm font-medium'>
                            <MessageSquare className='h-3 w-3' />
                            Comentario del problema
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Describe el problema encontrado...'
                              className='h-20 resize-none text-sm'
                              maxLength={500}
                              {...field}
                              disabled={!isEditable}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
