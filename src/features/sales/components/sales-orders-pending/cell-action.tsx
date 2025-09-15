'use client';

import { AlertModal } from '@/components/modal/alert-modal';

import { Settings2 } from 'lucide-react';

import { useState } from 'react';

import { useOrderStore } from '@/store/order-state';
import { toast } from 'sonner';
import { IconTooltipButton } from '@/components/common/icon-tooltip-button';

interface CellActionProps {
  id: string;
}

export default function CellTableOrderPendingsAction({ id }: CellActionProps) {
  const { updateOrderStatus } = useOrderStore();
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    updateOrderStatus(id, 'delivered');
    toast.success(`Estado de la orden ${id}actualizado a "Retirado"`);
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleAdd}
        loading={false}
        title='Finalizar Pedido'
        description='¿Estás seguro de que deseas finalizar la orden? Esta acción no se puede deshacer.'
      />
      <div className='flex gap-2'>
        {IconTooltipButton(
          <Settings2 className='h-4 w-4 text-green-600' />,
          'Finalizar Pedido',
          handleClick
        )}
      </div>
    </>
  );
}
