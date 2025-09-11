import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export interface Order {
  id: number;
  cliente: string;
  modoEntrega: 'RETIRO' | 'ENVÍO';
  monto: number;
  formaPago: 'EFECTIVO' | 'TRANSFERENCIA';
  fechaPedido: string;
  estado?: 'PENDIENTE' | 'COMPLETADO';
}

interface OrdersTableProps {
  title: string;
  orders: Order[];
  icon: LucideIcon;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  title,
  orders,
  icon: Icon
}) => {
  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-3'>
          <Icon className='h-5 w-5' />
          <span className='text-xl font-semibold'>{title}</span>
          <Badge variant='secondary' className='ml-auto px-3 py-1 text-sm'>
            {orders.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='font-semibold'>Cliente</TableHead>
                <TableHead className='font-semibold'>Entrega</TableHead>
                <TableHead className='text-right font-semibold'>
                  Monto
                </TableHead>
                <TableHead className='font-semibold'>Pago</TableHead>
                <TableHead className='font-semibold'>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className='hover:bg-muted/50'>
                  <TableCell className='text-foreground font-medium'>
                    {order.cliente}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.modoEntrega === 'RETIRO' ? 'default' : 'secondary'
                      }
                    >
                      {order.modoEntrega}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right text-lg font-bold'>
                    {formatCurrency(order.monto)}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{order.formaPago}</Badge>
                  </TableCell>
                  <TableCell className='text-muted-foreground font-medium'>
                    {formatDateTime(order.fechaPedido)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
