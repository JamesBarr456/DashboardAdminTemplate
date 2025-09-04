'use client';

import { AlertTriangle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderEditFormData, UpdateOrderSchema } from '@/schemas/order-schema';

import { Badge } from '@/components/ui/badge';
import { CustomerInfo } from './customer-info';
import { Form } from '@/components/ui/form';
import { NewOrder } from '@/types/order-new';
import { PaymentInfo } from './payment-info';
import { ProductEditCard } from '../order-card';
import { Separator } from '@/components/ui/separator';
import { ShippingAddress } from './shipping-addres';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

('@/components/ui/form');

export default function OrderForm({
  initialData,
  pageTitle
}: {
  initialData: {
    order: NewOrder | null;
  };
  pageTitle: string;
}) {
  const order = initialData.order;

  const form = useForm<OrderEditFormData>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      customer: order?.customer
        ? {
            customerId: order.customer.customerId,
            snapshot: {
              firstName: order.customer.snapshot.firstName,
              lastName: order.customer.snapshot.lastName,
              dni: order.customer.snapshot.dni,
              email: order.customer.snapshot.email,
              phone: {
                areaCode: order.customer.snapshot.phone.areaCode,
                number: order.customer.snapshot.phone.number
              }
            }
          }
        : undefined,
      shipping_information: order?.shipping_information,
      items: order?.items.map((item) => ({
        _id: item._id,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
        total_mount: item.total_mount
      })),
      summary: order?.summary,
      status: order?.status,
      payment_method: order?.payment_method
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

  const defectiveProducts = order.items.filter((p) => p.total_mount === 0); // ejemplo
  const totalDefectiveValue = defectiveProducts.reduce(
    (sum, p) => sum + p.total_mount,
    0
  );

  const handleUpdate = async (field: any, value: any) => {
    console.log(field, value);
  };
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
            onSubmit={form.handleSubmit(handleUpdate)}
            className='grid grid-cols-1 gap-6 md:grid-cols-3'
          >
            <div className='space-y-6 md:col-span-2'>
              {/* Order Status */}
              {/* <Card>
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
              </Card> */}

              {/* Products */}

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Package className='h-5 w-5' />
                    Productos ({order.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {order.items.map((product, index) => (
                      <div key={product._id}>
                        <ProductEditCard
                          product={product}
                          index={index}
                          control={control}
                          register={register}
                          errors={errors}
                          setValue={setValue}
                        />
                        {index < order.items.length - 1 && (
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
              <CustomerInfo
                order={order.customer}
                status={order.status}
                onUpdate={handleUpdate}
              />

              {/* Shipping Address */}
              <ShippingAddress
                data={order.shipping_information}
                status={order.status}
                onUpdate={handleUpdate}
              />

              {/* Payment Info */}
              <PaymentInfo
                paymentMethod={order.payment_method}
                status={order.status}
                onUpdate={handleUpdate}
              />

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
