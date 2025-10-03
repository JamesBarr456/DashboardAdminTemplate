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
import { NewOrder as Order } from '@/types/order-new';

import { formatPrice } from '@/lib/format';
import {
  translateDeliveryOption,
  translatePaymentMethod
} from '@/lib/translation';
import { STATUS_OPTIONS } from '@/features/orders/components/order-tables/options';

interface OrderDetailsProps {
  order: Order;
}

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';
export function OrderDetails({ order }: OrderDetailsProps) {
  const statusInfo = STATUS_OPTIONS.find((s) => s.value === order.status)!;

  return (
    <div className='space-y-6'>
      {/* Header with Order Status */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Orden #{order._id.slice(-8)}</h2>
        <Badge variant={statusInfo.variant as BadgeVariant} className='text-sm'>
          {statusInfo.label}
        </Badge>
      </div>

      {/* Customer Information (Optimized) */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Información del Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <p className='text-muted-foreground text-xs'>Nombre</p>
              <p className='text-sm font-medium'>
                {order.customer.snapshot.firstName}{' '}
                {order.customer.snapshot.lastName}
              </p>
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>DNI</p>
              <p className='text-sm font-medium'>
                {order.customer.snapshot.dni}
              </p>
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>Email</p>
              <p className='text-sm font-medium'>
                {order.customer.snapshot.email}
              </p>
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>Teléfono</p>
              <p className='text-sm font-medium'>
                ({order.customer.snapshot.phone.areaCode}){' '}
                {order.customer.snapshot.phone.number}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping and Payment Information */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Información de Envío</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div>
              <p className='text-muted-foreground text-sm'>Tipo de envío</p>
              <Badge variant='secondary' className='mt-1'>
                {translateDeliveryOption(
                  order.shipping_information.delivery_option
                )}
              </Badge>
            </div>
            {order.shipping_information.delivery_option === 'delivery' && (
              <div>
                <p className='text-muted-foreground text-sm'>Dirección</p>
                <p className='font-medium'>
                  {order.shipping_information.adress}
                  {order.shipping_information.locality &&
                    `, ${order.shipping_information.locality}`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Método de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant='outline' className='text-sm'>
              {translatePaymentMethod(order.payment_method)}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className='text-center'>Cantidad</TableHead>
                <TableHead className='text-center'>Talle</TableHead>
                <TableHead className='text-right'>Precio Unit.</TableHead>
                <TableHead className='text-right'>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell className='text-center'>{item.quantity}</TableCell>
                  <TableCell className='text-center'>
                    {item.size ? (
                      <Badge variant='outline' className='text-xs'>
                        {item.size}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatPrice(item.price)}
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    {formatPrice(item.total_mount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Resumen de la Orden</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Total de productos:</span>
            <span>{formatPrice(order.summary.items_total)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Costo de envío:</span>
            <span>{formatPrice(order.summary.shipping_cost)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
