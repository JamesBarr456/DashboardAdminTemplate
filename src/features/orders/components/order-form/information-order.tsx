'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Control, useWatch } from 'react-hook-form';
import { formatDate, formatPrice } from '@/lib/format';

import { NewOrder as Order } from '@/types/order-new';
import { OrderUpdate } from '@/schemas/order-schema';

interface OrderStatusCardProps {
  order: Order;
  control: Control<OrderUpdate>;
}

export function OrderStatusCard({ order, control }: OrderStatusCardProps) {
  // Observa items del formulario para recalcular totales en vivo
  const items = useWatch({ control, name: 'items' }) as
    | Array<{
        id: string;
        quantity?: number;
        defective_quantity?: number;
        remove?: boolean;
      }>
    | undefined;

  // Recalcular totales en base al estado actual (order.items + parches del form)
  const { totalOriginal, totalDefectDiscount, totalFinal } = (() => {
    let totalOriginal = 0;
    let totalDefectDiscount = 0;

    for (const it of order.items) {
      const patch = items?.find((p) => p?.id === it._id);
      if (patch?.remove) continue;
      const qty = patch?.quantity ?? it.quantity;
      const defQ = patch?.defective_quantity ?? it.defective_quantity ?? 0;
      const defect = Math.max(0, Math.min(qty, defQ));

      totalOriginal += qty * it.price;
      totalDefectDiscount += defect * it.price * 0.1; // 10% descuento en defectuosos
    }

    const totalFinal = totalOriginal - totalDefectDiscount;
    return { totalOriginal, totalDefectDiscount, totalFinal };
  })();

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
            <p className='font-medium'>{formatPrice(totalOriginal)}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Productos Defectuosos</p>
            <p className='font-medium text-red-600'>
              -{formatPrice(totalDefectDiscount)}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Total Final</p>
            <p className='text-lg font-bold'>{formatPrice(totalFinal)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
