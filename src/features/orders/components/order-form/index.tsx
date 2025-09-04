'use client';

import {
  AlertTriangle,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  User
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderEditFormData, orderEditSchema } from '@/schemas/order-schema';

import { Badge } from '@/components/ui/badge';
import { Customer } from '@/types/user';
import { Form } from '@/components/ui/form';
import { Order } from '@/types/order';
import { ProductEditCard } from '../order-card';
import { STATUS } from '@/constants/mocks/orders';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

('@/components/ui/form');
const statusColors = {
  rejected: 'bg-red-100 text-red-800 border-red-200', // Rechazado
  processing: 'bg-blue-100 text-blue-800 border-blue-200', // En proceso
  sending: 'bg-purple-100 text-purple-800 border-purple-200', // Enviandose
  cancelled: 'bg-red-100 text-red-800 border-red-200' // Cancelado
};

const statusLabels = {
  rejected: 'Rechazado',
  processing: 'En proceso',
  sending: 'Enviandose',
  cancelled: 'Cancelado'
};
export default function OrderForm({
  initialData,
  pageTitle
}: {
  initialData: {
    order: Order | null;
    customer: Customer | null;
  };
  pageTitle: string;
}) {
  const order = initialData.order;
  const customer = initialData.customer;
  const form = useForm<OrderEditFormData>({
    resolver: zodResolver(orderEditSchema),
    defaultValues: {
      products:
        order?.products.map((product) => ({
          id: product.id,
          defective: product.defective || false,
          defective_quantity: product.defective_quantity || 0,
          defect_comment: product.defect_comment || '',
          unavailable: product.unavailable || false
        })) || []
    }
  });
  const {
    control,
    register,
    formState: { errors },
    setValue
  } = form;

  if (!order) {
    return (
      <div className='space-y-6'>
        <div className='py-12 text-center'>
          <Package className='mx-auto mb-4 h-12 w-12 text-gray-400' />
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            Orden no encontrada
          </h3>
          <p className='text-gray-600'>
            La orden solicitada no existe o ha sido eliminada.
          </p>
        </div>
      </div>
    );
  }

  const defectiveProducts = order.products.filter((p) => p.defective);
  const totalDefectiveValue = defectiveProducts.reduce(
    (sum, p) => sum + p.subtotal,
    0
  );

  function onSubmit(values: OrderEditFormData) {
    try {
      // Simular API call
      console.log('Datos del formulario:', values);
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      alert('Error al actualizar la orden');
    }
  }
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-6 md:grid-cols-3'
          >
            <div className='space-y-6 md:col-span-2'>
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <span>Estado de la Orden</span>
                    <Badge className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Fecha de Orden</p>
                      <p className='font-medium'>
                        {new Date(order.created_at).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Original</p>
                      <p className='font-medium'>
                        ${(order.total + totalDefectiveValue).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>
                        Productos Defectuosos
                      </p>
                      <p className='font-medium text-red-600'>
                        -${totalDefectiveValue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Final</p>
                      <p className='text-lg font-bold'>
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Package className='h-5 w-5' />
                    Productos ({order.products.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {order.products.map((product, index) => (
                      <div key={product.id}>
                        <ProductEditCard
                          product={product}
                          index={index}
                          control={control}
                          register={register}
                          errors={errors}
                          setValue={setValue}
                        />
                        {index < order.products.length - 1 && (
                          <Separator className='my-4' />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='space-y-6 md:col-span-1'>
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <User className='h-5 w-5' />
                    Información del Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-center'>
                    <Avatar className='h-24 w-24'>
                      <AvatarImage src={customer?.avatar} alt='@shadcn' />
                      <AvatarFallback>{`${customer?.firstName[0]}${customer?.lastName[0]}`}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Nombre</p>
                    <p className='font-medium'>{`${customer?.firstName} ${customer?.lastName}`}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Email</p>
                    <p className='flex items-center gap-2 font-medium'>
                      <Mail className='h-4 w-4 text-gray-400' />
                      {customer?.email}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Teléfono</p>
                    <p className='flex items-center gap-2 font-medium'>
                      <Phone className='h-4 w-4 text-gray-400' />
                      {customer?.phone}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>DNI</p>
                    <p className='flex items-center gap-2 font-medium'>
                      <Phone className='h-4 w-4 text-gray-400' />
                      {customer?.dni}
                    </p>
                  </div>
                  {/* Defective Products Alert */}
                  {Number(customer?.cancelledOrders) > 0 ||
                  Number(customer?.rejectedOrders) > 0 ? (
                    <Card className='border-yellow-200 bg-yellow-50'>
                      <CardHeader>
                        <CardTitle className='flex items-center justify-center gap-2 text-yellow-800'>
                          <AlertTriangle className='h-5 w-5' />
                          Historial de Riesgo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-center font-medium text-yellow-800'>
                          {`Este cliente tiene ${customer?.cancelledOrders} de ordenes calcelada.`}
                        </p>
                      </CardContent>
                    </Card>
                  ) : null}
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MapPin className='h-5 w-5' />
                    Dirección de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-1 text-sm'>
                    <p className='font-medium'></p>
                    <p>Neochcea 248</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CreditCard className='h-5 w-5' />
                    Información de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span>Método:</span>
                      <span className='font-medium'>transferencia</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Estado:</span>
                      <Badge
                        variant='outline'
                        className='border-green-200 bg-green-50 text-green-700'
                      >
                        process
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Defective Products Alert */}
              {defectiveProducts.length > 0 && (
                <Card className='border-red-200 bg-red-50'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-red-800'>
                      <AlertTriangle className='h-5 w-5' />
                      Productos Defectuosos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2 text-sm'>
                      <p className='text-red-700'>
                        {defectiveProducts.length} producto
                        {defectiveProducts.length > 1 ? 's' : ''} marcado
                        {defectiveProducts.length > 1 ? 's' : ''} como
                        defectuoso
                        {defectiveProducts.length > 1 ? 's' : ''}
                      </p>
                      <p className='font-medium text-red-800'>
                        Descuento aplicado: ${totalDefectiveValue.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
