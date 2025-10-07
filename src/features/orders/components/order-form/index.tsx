'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { NewOrder as Order, OrderStatus } from '@/types/order-new';
import { OrderUpdate, orderUpdateSchema } from '@/schemas/order-schema';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CompleteOrderModal } from './print-ticket-modal';
import { CustomerInfo } from './customer-info';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { OrderItemsTable } from './order-items-table';
import { OrderStatusCard } from './information-order';
import { Package } from 'lucide-react';
import { PaymentInfo } from './payment-info';
import { ShippingAddress } from './shipping-addres';
import { StatusCircles } from './status-steps-circles';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useOrderStore } from '@/store/order-state';
import { zodResolver } from '@hookform/resolvers/zod';

// import { ProductEditCard } from './products';

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
  // Modal de impresión de ticket cuando el estado pasa a "completed"
  const [completeOpen, setCompleteOpen] = useState(false);
  const prevStatusRef = useRef<OrderStatus | undefined>(order?.status);

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
  // Observa status actual para habilitar acciones y gatillar modal de impresión
  const currentStatus = form.watch('status');
  const canEdit = currentStatus === 'in_process';
  const formValues = form.watch();

  // Abre el modal sólo en el momento que cambia a "completed"
  useEffect(() => {
    if (
      prevStatusRef.current !== 'completed' &&
      currentStatus === 'completed'
    ) {
      setCompleteOpen(true);
    }
    prevStatusRef.current = currentStatus as OrderStatus | undefined;
  }, [currentStatus]);

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

  const handleCompletePrint = async (orderId: string, shouldPrint: boolean) => {
    void shouldPrint; // ya se maneja dentro del modal
    // Aseguramos que el estado quede persistido en store
    try {
      // Persistimos los cambios del formulario antes de marcar como completado
      const currentData = form.getValues();
      updateOrder(orderId, currentData);
      updateOrderStatus(orderId, 'completed');
      form.setValue('status', 'completed');
      toast.success('Pedido marcado como completo');
    } catch (e) {
      // noop
    }
  };

  // Construye una versión "lista para imprimir" con totales recalculados según el formulario
  const printOrder: Order | null = (() => {
    if (!order) return null;
    try {
      const patches = new Map<string, any>();
      (formValues.items || []).forEach((p: any) => {
        if (p?.id) patches.set(p.id, p);
      });

      const itemsTotal = order.items.reduce((sum, it) => {
        const patch = patches.get(it._id);
        // Si el item fue marcado para eliminarse, lo omitimos del total
        if (patch?.remove) return sum;

        // Usar la cantidad actualizada si existe, de lo contrario la original
        const qty = Number(patch?.quantity ?? it.quantity ?? 0);
        const price = Number(it.price ?? 0);
        const defQ = Math.min(
          Math.max(
            0,
            Number(patch?.defective_quantity ?? it.defective_quantity ?? 0)
          ),
          qty
        );
        const goodUnits = Math.max(0, qty - defQ);
        const subtotal = goodUnits * price + defQ * price * 0.9;
        return sum + subtotal;
      }, 0);

      const shippingCost = order.summary.shipping_cost ?? 0;
      const grandTotal = Math.round((itemsTotal + shippingCost) * 100) / 100;

      return {
        ...order,
        payment_method: formValues.payment_method ?? order.payment_method,
        customer: {
          ...order.customer,
          snapshot: formValues.snapshot
            ? { ...order.customer.snapshot, ...formValues.snapshot }
            : order.customer.snapshot
        },
        shipping_information: formValues.shipping_information
          ? {
              ...order.shipping_information,
              ...formValues.shipping_information
            }
          : order.shipping_information,
        summary: {
          ...order.summary,
          items_total: itemsTotal,
          grand_total: grandTotal
        }
      } as Order;
    } catch {
      return order;
    }
  })();

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

      <Card className='mx-auto mb-12 w-full'>
        {/* Modal para imprimir ticket al completar */}
        <CompleteOrderModal
          order={printOrder}
          open={completeOpen}
          onOpenChange={setCompleteOpen}
          onComplete={handleCompletePrint}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className='space-y-8'>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle className='text-left text-2xl font-bold'>
                {pageTitle}
              </CardTitle>
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
                  <OrderStatusCard order={order} control={form.control} />
                  {/* Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <Package className='h-5 w-5' />
                        Productos ({order.items.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='flex h-[500px] flex-col'>
                      <OrderItemsTable items={order.items} canEdit={canEdit} />
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
            <div className='bg-background fixed right-0 bottom-0 left-0 z-10 border p-5 md:z-0'>
              <div className='flex w-full flex-col items-center gap-3 md:flex-row md:justify-end'>
                {currentStatus === 'pending' && (
                  <>
                    <Button
                      variant='destructive'
                      type='button'
                      className='w-full font-medium sm:w-auto'
                      onClick={() => setRejectOpen(true)}
                    >
                      Rechazar
                    </Button>
                    <Button
                      type='button'
                      className='w-full font-medium sm:w-auto'
                      onClick={handleApprove}
                    >
                      Confirmar
                    </Button>
                  </>
                )}
                {canEdit && (
                  <>
                    <Button
                      variant='outline'
                      type='button'
                      className='w-full font-medium sm:w-auto'
                      onClick={() => history.back()}
                    >
                      Regresar
                    </Button>
                    <Button type='submit' className='cursor-pointer'>
                      Guardar Cambios
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
