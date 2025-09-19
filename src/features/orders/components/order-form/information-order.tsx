'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Control } from 'react-hook-form';
import { NewOrder as Order } from '@/types/order-new';
import { OrderUpdate } from '@/schemas/order-schema';
import { formatDate, formatPrice } from '@/lib/format';

interface OrderStatusCardProps {
  order: Order;
  totalDefectiveValue: number;
  control: Control<OrderUpdate>;
}

export function OrderStatusCard({
  order,
  totalDefectiveValue
}: OrderStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Estado de la Orden</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          <div>
            <p className='text-sm text-gray-600'>Fecha de Orden</p>
            <p className='font-medium'>{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Total Original</p>
            <p className='font-medium'>
              {formatPrice(order.summary.grand_total + totalDefectiveValue)}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Productos Defectuosos</p>
            <p className='font-medium text-red-600'>
              -{formatPrice(totalDefectiveValue)}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Total Final</p>
            <p className='text-lg font-bold'>
              {formatPrice(order.summary.grand_total)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
