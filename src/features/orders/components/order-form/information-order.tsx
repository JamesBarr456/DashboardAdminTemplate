'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
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

import { Control } from 'react-hook-form';
import { NewOrder as Order } from '@/types/order-new';
import { OrderUpdate } from '@/schemas/order-schema';
import { STATUS } from '@/constants/mocks/orders';

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
            <p className='font-medium'>
              {new Date(order.createdAt).toLocaleDateString('es-ES')}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Total Original</p>
            <p className='font-medium'>
              ${(order.summary.grand_total + totalDefectiveValue).toFixed(2)}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Productos Defectuosos</p>
            <p className='font-medium text-red-600'>
              -${totalDefectiveValue.toFixed(2)}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Total Final</p>
            <p className='text-lg font-bold'>
              ${order.summary.grand_total.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
