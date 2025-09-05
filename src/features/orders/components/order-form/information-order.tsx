'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { NewOrder as Order } from '@/types/order-new';
import { STATUS } from '@/constants/mocks/orders';

interface OrderStatusCardProps {
  order: Order;
  totalDefectiveValue: number;
  onUpdate?: (field: 'status', value: string) => void;
}

export function OrderStatusCard({
  order,
  totalDefectiveValue,
  onUpdate
}: OrderStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Estado de la Orden</span>
          <div className='flex items-center gap-2'>
            <Select
              value={order.status}
              onValueChange={(value) => onUpdate?.('status', value)}
            >
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Actualizar estado' />
              </SelectTrigger>
              <SelectContent>
                {STATUS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
