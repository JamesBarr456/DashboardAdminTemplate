'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Eye, RefreshCcw } from 'lucide-react';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { OrderDetails } from './sales-order-view-details';
import { OrderStatus } from '@/types/order-new';
import { toast } from 'sonner';
import { useOrderStore } from '@/store/order-state';
import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';

interface CellActionProps {
  id: string;
}

export default function CellTableOrderPendingsAction({ id }: CellActionProps) {
  const { updateOrderStatus, getOrderById } = useOrderStore();
  const { addMovement, cashRegister } = usePOSStore();
  const [open, setOpen] = useState(false);
  const order = getOrderById(id);

  if (!order) {
    return null; // Manejar el caso donde la orden no existe
  }
  const delivery_option = order.shipping_information.delivery_option;
  const isDelivered = order.status === 'delivered' || !cashRegister.isOpen;
  const statusMap: Record<string, { next: OrderStatus; message: string }> = {
    pickup: {
      next: 'delivered',
      message: 'Finalizado'
    },
    delivery: {
      next: 'delivered',
      message: 'Retirado'
    },
    canceled: {
      next: 'canceled',
      message: 'Cancelado'
    }
  };

  const handleAdd = () => {
    const current = statusMap[delivery_option];
    if (!current) {
      toast.error(`Opción de entrega desconocida: ${delivery_option}`);
      return;
    }
    updateOrderStatus(id, current.next);
    // Registrar movimiento en caja
    if (order && order.payment_method === 'cash' && order.summary.items_total) {
      addMovement({
        type: 'income',
        amount: order.summary.items_total,
        concept: 'Ingreso por venta',
        description: `Orden #${order._id} marcada como ${current.message}`,
        cashier: cashRegister.cashier
      });
    }
    toast.success(
      `Estado de la orden ${id} actualizado a "${current.message}"`
    );
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          {isDelivered ? (
            // 👉 Si está entregado, solo muestro Detalles
            <DropdownMenuItem onClick={handleOpenDialog}>
              <Eye className='mr-2 h-4 w-4' /> Detalles
            </DropdownMenuItem>
          ) : (
            // 👉 Si NO está entregado, muestro las otras opciones
            <>
              <DropdownMenuItem onClick={handleAdd}>
                {delivery_option === 'pickup' ? (
                  <>
                    <RefreshCcw className='h-4 w-4 text-green-600' />
                    <span>Finalizar</span>
                  </>
                ) : (
                  <>
                    <RefreshCcw className='h-4 w-4 text-red-600' />
                    <span>Retirado</span>
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleOpenDialog}>
                <Eye className='mr-2 h-4 w-4' /> Detalles
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleAdd}>
                <IconTrash className='mr-2 h-4 w-4' /> Cancelar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Información de Orden</DialogTitle>
          </DialogHeader>
          <OrderDetails order={order} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' onClick={handleCloseDialog}>
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
