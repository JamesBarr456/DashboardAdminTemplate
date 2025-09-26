'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SalesTicketPreviewProps {
  ticketNumber: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  className?: string;
}

export function SalesTicketPreview({
  ticketNumber,
  items,
  total,
  className
}: SalesTicketPreviewProps) {
  return (
    <Card className={cn('mx-auto w-full max-w-[300px] p-4', className)}>
      <CardContent className='space-y-4 p-0'>
        {/* Encabezado del ticket */}
        <div className='space-y-2 text-center'>
          <h2 className='text-xl font-bold'>TIENDA YOSE</h2>
          <div className='text-sm'>
            <p>Tel: 3794678774 / 3794350739</p>
            <p>Ticket #: {ticketNumber}</p>
            <p>{format(new Date(), 'dd/MM/yyyy HH:mm:ss', { locale: es })}</p>
          </div>
        </div>

        <div className='border-t border-b py-2'>
          {/* Productos */}
          <table className='w-full text-sm'>
            <thead>
              <tr>
                <th className='text-left'>Producto</th>
                <th className='text-right'>Cant.</th>
                <th className='text-right'>Precio</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className='text-left'>{item.name}</td>
                  <td className='text-right'>{item.quantity}</td>
                  <td className='text-right'>{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className='text-right font-bold'>
          <p>Total: {formatPrice(total)}</p>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className='pt-2 text-center text-sm'>
          <p>¡Gracias por su compra!</p>
          <p>Lo esperamos nuevamente</p>
        </div>
      </CardContent>
    </Card>
  );
}
