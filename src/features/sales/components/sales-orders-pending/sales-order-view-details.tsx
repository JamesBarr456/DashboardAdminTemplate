import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface Order {
  _id: string;
  customer: {
    snapshot: {
      firstName: string;
      lastName: string;
      dni: string;
      email: string;
      phone: {
        areaCode: string;
        number: string;
      };
    };
  };
  payment_method: string;
  items: {
    _id: string;
    product_sku: string;
    name: string;
    quantity: number;
    size?: string;
    price: number;
    total_mount: number;
    defective?: boolean;
    defective_quantity?: number;
    defect_comment?: string;
    unavailable?: boolean;
  }[];
  shipping_information: {
    delivery_option: 'pickup' | 'delivery';
    adress?: string;
    locality?: string;
    shipping_type?: string;
  };
  summary: {
    items_total: number;
    shipping_cost: number;
    grand_total: number;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetailsProps {
  order: Order;
}

const getStatusLabel = (status: string) => {
  const statusMap: Record<
    string,
    {
      label: string;
      variant: 'default' | 'secondary' | 'destructive' | 'outline';
    }
  > = {
    pending: { label: 'Pendiente', variant: 'outline' },
    confirmed: { label: 'Confirmada', variant: 'default' },
    processing: { label: 'En Proceso', variant: 'secondary' },
    shipped: { label: 'Enviada', variant: 'default' },
    delivered: { label: 'Entregada', variant: 'default' },
    cancelled: { label: 'Cancelada', variant: 'destructive' }
  };

  return statusMap[status] || { label: status, variant: 'outline' as const };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function OrderDetails({ order }: OrderDetailsProps) {
  const statusInfo = getStatusLabel(order.status);

  return (
    <div className='space-y-6'>
      {/* Header with Order Status */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Orden #{order._id.slice(-8)}</h2>
        <Badge variant={statusInfo.variant} className='text-sm'>
          {statusInfo.label}
        </Badge>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Información del Cliente</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <p className='text-muted-foreground text-sm'>Nombre completo</p>
            <p className='font-medium'>
              {order.customer.snapshot.firstName}{' '}
              {order.customer.snapshot.lastName}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>DNI</p>
            <p className='font-medium'>{order.customer.snapshot.dni}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Email</p>
            <p className='font-medium'>{order.customer.snapshot.email}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Teléfono</p>
            <p className='font-medium'>
              ({order.customer.snapshot.phone.areaCode}){' '}
              {order.customer.snapshot.phone.number}
            </p>
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
                {order.shipping_information.delivery_option === 'delivery'
                  ? 'Envío a domicilio'
                  : 'Retiro en tienda'}
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
              {order.payment_method}
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
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    {formatCurrency(item.total_mount)}
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
            <span className='text-muted-foreground'>Subtotal productos:</span>
            <span>{formatCurrency(order.summary.items_total)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Costo de envío:</span>
            <span>{formatCurrency(order.summary.shipping_cost)}</span>
          </div>
          <Separator />
          <div className='flex justify-between text-lg font-semibold'>
            <span>Total:</span>
            <span>{formatCurrency(order.summary.grand_total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Date */}
      <Card>
        <CardContent className='pt-6'>
          <div className='text-muted-foreground text-center text-sm'>
            Orden creada el {formatDate(order.createdAt)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
