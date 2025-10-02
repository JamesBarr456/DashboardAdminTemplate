'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderUpdate, orderUpdateSchema } from '@/schemas/order-schema';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CustomerInfo } from './customer-info';
import { Form } from '@/components/ui/form';
import { NewOrder as Order } from '@/types/order-new';
import { OrderStatusCard } from './information-order';
import { Package } from 'lucide-react';
import { PaymentInfo } from './payment-info';
import { ProductEditCard } from './products';
import { Separator } from '@/components/ui/separator';
import { ShippingAddress } from './shipping-addres';
import { StatusCircles } from './status-steps-circles';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useOrderStore } from '@/store/order-state';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function OrderForm({
  initialData,
  pageTitle
}: {
  initialData: {
    order: Order | null;
  };
  pageTitle: string;
}) {
  const order = initialData.order;
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus);
  const updateOrder = useOrderStore((s) => s.updateOrder);
  // Mostrar el diálogo si la orden está pendiente
  const [approvalOpen, setApprovalOpen] = useState<boolean>(
    (order?.status ?? 'pending') === 'pending'
  );
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
      },
      payment_method: order?.payment_method,
      status: order?.status,
      items:
        order?.items?.map((item) => ({
          id: item._id,
          defective: item.defective || false,
          defective_quantity: item.defective_quantity || 0,
          defect_comment: item.defect_comment || '',
          unavailable: item.unavailable || false
        })) || [],
      reject_comment: ''
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

  async function handleSave(data: OrderUpdate) {
    if (!order) return;

    // Actualiza solo el status, o toda la orden según tu lógica
    if (data.status && data.status !== order.status) {
      updateOrderStatus(order._id, data.status);
    }
    // Si quieres actualizar más campos:
    updateOrder(order._id, data);
  }

  async function handleApprove() {
    if (!order) return;
    await updateOrderStatus(order._id, 'in_process');
    setApprovalOpen(false);
  }

  async function handleReject() {
    if (!order) return;
    const comment = form.getValues('reject_comment')?.trim();
    if (comment) {
      // Guardamos el comentario de rechazo junto al patch
      await updateOrder(order._id, { reject_comment: comment });
    }
    await updateOrderStatus(order._id, 'rejected');
    setApprovalOpen(false);
  }

  return (
    <>
      {/* Diálogo de aprobación cuando el estado es pending */}
      {order.status === 'pending' && (
        <Dialog open={approvalOpen} onOpenChange={setApprovalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revisión del pedido</DialogTitle>
              <DialogDescription>
                Antes de procesar, decidí si aceptás o rechazás este pedido.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4'>
              <div>
                <p className='text-muted-foreground text-sm'>
                  Historial de cancelaciones del cliente
                </p>
                <div className='mt-2 grid grid-cols-2 gap-2 text-sm'>
                  <div className='rounded-md border p-3'>
                    <div className='font-medium'>Canceladas</div>
                    <div className='text-muted-foreground'>
                      {order.customer.stats.cancelledOrders}
                    </div>
                  </div>
                  <div className='rounded-md border p-3'>
                    <div className='font-medium'>Rechazadas</div>
                    <div className='text-muted-foreground'>
                      {order.customer.stats.rejectedOrders}
                    </div>
                  </div>
                </div>
              </div>

              {(order.customer.stats.cancelledOrders > 0 ||
                order.customer.stats.rejectedOrders > 0) && (
                <Alert variant='destructive'>
                  <AlertTitle>Atención</AlertTitle>
                  <AlertDescription>
                    Este cliente registra {order.customer.stats.cancelledOrders}{' '}
                    cancelación(es) y {order.customer.stats.rejectedOrders}{' '}
                    rechazo(s).
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter className='gap-4'>
              <div className='grid w-full gap-2'>
                <Label htmlFor='reject_comment'>
                  Motivo del rechazo (opcional)
                </Label>
                <Textarea
                  id='reject_comment'
                  placeholder='Escribí el motivo del rechazo...'
                  value={form.watch('reject_comment') || ''}
                  onChange={(e) =>
                    form.setValue('reject_comment', e.target.value)
                  }
                />
              </div>
              <Button variant='destructive' onClick={handleReject}>
                Rechazar
              </Button>
              <Button onClick={handleApprove}>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Card className='mx-auto w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className='space-y-8'>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle className='text-left text-2xl font-bold'>
                {pageTitle}
              </CardTitle>
              <Button
                type='submit'
                className='cursor-pointer'
                disabled={form.watch('status') !== 'pending'}
              >
                Guardar Cambios
              </Button>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <div className='space-y-6 md:col-span-2'>
                  {/* Order Status */}
                  <StatusCircles
                    control={form.control}
                    name='status'
                    label='Progreso del proceso'
                  />
                  <OrderStatusCard
                    order={order}
                    totalDefectiveValue={0}
                    control={form.control}
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
                            <ProductEditCard
                              product={product}
                              index={index}
                              status={form.watch('status')}
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
                    control={form.control}
                    order={order.customer}
                    status={form.watch('status')}
                  />

                  {/* Shipping Address */}
                  <ShippingAddress
                    data={order.shipping_information}
                    status={form.watch('status')}
                    control={form.control}
                  />

                  {/* Payment Info */}
                  <PaymentInfo
                    paymentMethod={order.payment_method}
                    status={form.watch('status')}
                    control={form.control}
                  />
                </div>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </>
  );
}
