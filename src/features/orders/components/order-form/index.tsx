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

import { Badge } from '@/components/ui/badge';
import { Customer } from '@/types/user';
import { Form } from '@/components/ui/form';
import { NewOrder as Order } from '@/types/order-new';
// import { ProductEditCard } from '../order-card';
import { STATUS } from '@/constants/mocks/orders';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerInfo } from './customer-info';
import { ShippingAddress } from './shipping-addres';
import { PaymentInfo } from './payment-info';
import { OrderStatusCard } from './information-order';
import { OrderUpdate, orderUpdateSchema } from '@/schemas/order-schema';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function OrderForm({
  initialData,
  pageTitle
}: {
  initialData: {
    order: Order | null;
  };
  pageTitle: string;
}) {
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const order = initialData.order;
  const form = useForm<OrderUpdate>({
    resolver: zodResolver(orderUpdateSchema),
    defaultValues: {
      snapshot: {
        firstName: order?.customer.snapshot.firstName,
        lastName: order?.customer.snapshot.lastName,
        dni: order?.customer.snapshot.dni,
        email: order?.customer.snapshot.email,
        phone: {
          areaCode: order?.customer.snapshot.phone.areaCode,
          number: order?.customer.snapshot.phone.number
        }
      },
      shipping_information: {
        delivery_option: order?.shipping_information.delivery_option,
        adress: order?.shipping_information.adress,
        locality: order?.shipping_information.locality,
        shipping_type: order?.shipping_information.shipping_type
      }
    }
  });
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
  function handleUpdate(field: string, value: any) {
    setPendingChanges((prev) => ({
      ...prev,
      [field]: value
    }));
  }
  async function handleSave() {
    const result = orderUpdateSchema.safeParse({
      ...order, // datos actuales
      ...pendingChanges // cambios locales
    });

    if (!result.success) {
      console.error('Errores:', result.error.format());
      return; // no mandes nada
    }

    console.log('Cambios guardados!', result.data);
    setPendingChanges({}); // limpiás cambios pendientes
  }
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
        <Button
          disabled={Object.keys(pendingChanges).length === 0}
          onClick={handleSave}
        >
          Guardar Cambios
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='space-y-6 md:col-span-2'>
            <OrderStatusCard
              order={order}
              totalDefectiveValue={0}
              // onUpdate={handleUpdate}
            />
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
                      {/* <ProductEditCard
                        product={product}
                        index={index}
                        control={control}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                      /> */}
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
              onUpdate={(update) => handleUpdate(update.path, update.value)}
            />

            {/* Shipping Address */}
            <ShippingAddress
              data={order.shipping_information}
              status={order.status}
              // onUpdate={handleUpdate}
            />

            {/* Payment Info */}
            <PaymentInfo
              paymentMethod={order.payment_method}
              status={order.status}
              // onUpdate={handleUpdate}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
