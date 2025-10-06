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
import { Printer, View } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CompleteOrderModal } from '../order-form/print-ticket-modal';
import { toast } from 'sonner';

interface CellActionProps {
  data: Order;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const router = useRouter();

  const onConfirmDelete = async () => {};

  return (
    <>
      {/* Modal de impresión de ticket cuando está completado */}
      <CompleteOrderModal
        order={data}
        open={openPrint}
        onOpenChange={setOpenPrint}
        onComplete={(orderId, shouldPrint) => {
          setOpenPrint(false);
          if (shouldPrint) {
            toast.success('Ticket enviado a impresión');
          }
        }}
      />

      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
        title='¿Estás seguro de que deseas eliminar este pedido?'
        description='Esta acción no se puede deshacer.'
      />

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

          {data.status === 'completed' && (
            <DropdownMenuItem onClick={() => setOpenPrint(true)}>
              <Printer className='mr-2 h-4 w-4' /> Imprimir ticket
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
