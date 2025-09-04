import { Card, CardContent } from '@/components/ui/card';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import { Item, OrderStatus } from '@/types/order-new';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

interface ProductEditCardProps {
  product: Item;
  index: number;
  status: OrderStatus;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  errors: FieldErrors;
  onRemove?: (index: number) => void;
}

export const ProductEditCard = ({
  product,
  index,
  status,
  register,
  errors,
  onRemove
}: ProductEditCardProps) => {
  const editable = status === 'pending';

  return (
    <Card>
      <CardContent className='space-y-3 p-4'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-medium'>{product.name}</h4>
          {editable && onRemove && (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => onRemove(index)}
            >
              <Trash2 className='h-4 w-4 text-red-500' />
            </Button>
          )}
        </div>

        <div className='grid grid-cols-3 items-end gap-4'>
          {/* Cantidad */}
          <div>
            <p className='text-xs text-gray-600'>Cantidad</p>
            <Input
              type='number'
              defaultValue={product.quantity}
              disabled={!editable}
              {...register(`products.${index}.quantity`, {
                valueAsNumber: true,
                min: 1
              })}
              className='h-8'
            />
            {/* {errors?.products?.[index]?.quantity && (
              <span className="text-xs text-red-500">
                {String(errors.products[index]?.quantity?.message)}
              </span>
            )} */}
          </div>

          {/* Precio unitario */}
          <div>
            <p className='text-xs text-gray-600'>Precio</p>
            <Input
              type='number'
              step='0.01'
              defaultValue={product.price}
              disabled={!editable}
              {...register(`products.${index}.price`, {
                valueAsNumber: true,
                min: 0
              })}
              className='h-8'
            />
          </div>

          {/* Subtotal (solo lectura) */}
          <div>
            <p className='text-xs text-gray-600'>Subtotal</p>
            <Input
              type='number'
              value={(product.quantity * product.price).toFixed(2)}
              disabled
              className='h-8'
            />
          </div>
        </div>

        {product.size && (
          <div>
            <p className='text-xs text-gray-600'>Talle</p>
            <Input value={product.size} disabled className='h-8' />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
