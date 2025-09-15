'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { CheckCircle } from 'lucide-react';
import { IconTooltipButton } from '../../utils';
import { SaleItem } from '@/store/pos-state';
import { useOrderStore } from '@/store/order-state';
import { useState } from 'react';

interface CellActionProps {
  data: SaleItem;
}

export const CellSaleslOrderPendingAction: React.FC<CellActionProps> = ({
  data
}) => {
  const { updateOrderStatus } = useOrderStore();
  const [open, setOpen] = useState(false);

  const handleFinishOrder = () => {
    updateOrderStatus(data.id, ''); // Ajusta el status según tu lógica
    setOpen(false);
  };

  return (
    <>
      {IconTooltipButton(
        <CheckCircle className='h-4 w-4 text-green-600' />,
        () => setOpen(true),
        'Finalizar orden'
      )}

      <AlertModal
        open={open}
        onOpenChange={setOpen}
        title='¿Finalizar orden?'
        description='¿Estás seguro de que deseas finalizar esta orden? Esta acción no se puede deshacer.'
        onConfirm={handleFinishOrder}
        confirmText='Finalizar'
        cancelText='Cancelar'
      />
    </>
  );
};
