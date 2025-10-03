'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { NewOrder as Order } from '@/types/order-new';
import { View } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useOrderStore } from '@/store/order-state';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CellActionProps {
  data: Order;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const router = useRouter();
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus);
  const updateOrder = useOrderStore((s) => s.updateOrder);

  const onConfirmDelete = async () => {};

  const handleAccept = async () => {
    try {
      await updateOrderStatus(data._id, 'in_process');
      toast.success('Pedido aceptado y movido a "En proceso"');
    } catch (e) {
      toast.error('No se pudo aceptar el pedido');
    } finally {
      setOpenAccept(false);
    }
  };

  const handleReject = async () => {
    try {
      const comment = rejectReason.trim();
      if (comment) {
        await updateOrder(data._id, { reject_comment: comment });
      }
      await updateOrderStatus(data._id, 'rejected');
      toast.success('Pedido rechazado');
    } catch (e) {
      toast.error('No se pudo rechazar el pedido');
    } finally {
      setOpenReject(false);
      setRejectReason('');
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
        title='¿Estás seguro de que deseas eliminar este pedido?'
        description='Esta acción no se puede deshacer.'
      />

      {/* Aceptar pedido */}
      <AlertModal
        isOpen={openAccept}
        onClose={() => setOpenAccept(false)}
        onConfirm={handleAccept}
        loading={loading}
        title='Aceptar pedido'
        description='Confirmá que querés aceptar este pedido y moverlo a En proceso.'
        confirmText='Aceptar'
        cancelText='Cancelar'
      />

      {/* Rechazar pedido */}
      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar pedido</DialogTitle>
          </DialogHeader>
          <div className='grid gap-2'>
            <Label htmlFor='reject-reason'>Motivo (opcional)</Label>
            <Textarea
              id='reject-reason'
              placeholder='Ingresá el motivo del rechazo'
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenReject(false)}>
              Cancelar
            </Button>
            <Button variant='destructive' onClick={handleReject}>
              Rechazar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/order/${data._id}`)}
          >
            <View className='mr-2 h-4 w-4' /> Más información
          </DropdownMenuItem>
          {data.status === 'pending' && (
            <>
              <DropdownMenuItem onClick={() => setOpenAccept(true)}>
                ✅ Aceptar pedido
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenReject(true)}>
                ⛔ Rechazar pedido
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
