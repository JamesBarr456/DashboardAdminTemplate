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
import { toast } from 'sonner';

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
  // Modal secundario de rechazo
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

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

    if (data.status && data.status !== order.status) {
      updateOrderStatus(order._id, data.status);
    }
    updateOrder(order._id, data);
    toast.success('Cambios guardados');
  }

  async function handleApprove() {
    if (!order) return;
    await updateOrderStatus(order._id, 'in_process');
    form.setValue('status', 'in_process');
    toast.success('Pedido aceptado y en proceso');
  }

  async function handleReject() {
    if (!order) return;
    const comment = rejectReason.trim();
    if (comment) {
      await updateOrder(order._id, { reject_comment: comment });
    }
    await updateOrderStatus(order._id, 'rejected');
    form.setValue('status', 'rejected');
    setRejectOpen(false);
    toast.success('Pedido rechazado');
  }

  const currentStatus = form.watch('status');
  const canEdit = currentStatus === 'in_process';

  return (
    <>
      {/* Modal informativo al entrar en pending: solo historial + continuar */}
      {order.status === 'pending' && (
        <Dialog open={approvalOpen} onOpenChange={setApprovalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Historial de riesgo del cliente</DialogTitle>
              <DialogDescription>
                Revisá el comportamiento previo del cliente antes de tomar una
                decisión.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-2 text-sm'>
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

              {order.customer.stats.cancelledOrders > 0 ||
              order.customer.stats.rejectedOrders > 0 ? (
                <Alert variant='destructive'>
                  <AlertTitle>Aviso de riesgo</AlertTitle>
                  <AlertDescription>
                    Este cliente presenta historial con cancelaciones o
                    rechazos. No es conveniente aceptar el pedido sin
                    verificación adicional.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertTitle>Buen historial</AlertTitle>
                  <AlertDescription>
                    No hay antecedentes negativos. Es conveniente aceptar el
                    pedido.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button onClick={() => setApprovalOpen(false)}>
                Continuar al detalle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal secundario para rechazar con comentario */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Rechazar Pedido?</DialogTitle>
            <DialogDescription>
              Por favor, agregá un comentario explicando el motivo del rechazo.
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-2'>
            <Label htmlFor='reject-reason'>Comentario de Rechazo</Label>
            <Textarea
              id='reject-reason'
              placeholder='Ej: Producto fuera de stock'
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setRejectOpen(false)}>
              Cancelar
            </Button>
            <Button variant='destructive' onClick={handleReject}>
              Rechazar Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className='mx-auto w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className='space-y-8'>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle className='text-left text-2xl font-bold'>
                {pageTitle}
              </CardTitle>
              <div className='flex items-center gap-2'>
                {currentStatus === 'pending' && (
                  <>
                    <Button
                      variant='destructive'
                      type='button'
                      onClick={() => setRejectOpen(true)}
                    >
                      Rechazar
                    </Button>
                    <Button type='button' onClick={handleApprove}>
                      Confirmar
                    </Button>
                  </>
                )}
                {canEdit && (
                  <Button type='submit' className='cursor-pointer'>
                    Guardar Cambios
                  </Button>
                )}
              </div>
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
                              status={currentStatus}
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
                    status={currentStatus}
                  />

                  {/* Shipping Address */}
                  <ShippingAddress
                    data={order.shipping_information}
                    status={currentStatus}
                    control={form.control}
                  />

                  {/* Payment Info */}
                  <PaymentInfo
                    paymentMethod={order.payment_method}
                    status={currentStatus}
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
