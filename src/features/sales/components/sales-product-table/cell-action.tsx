'use client';

import { IconTrash } from '@tabler/icons-react';
import { AlertModal } from '@/components/modal/alert-modal';

import { MinusCircle, PlusCircle } from 'lucide-react';
import { SaleItem, usePOSStore } from '@/store/pos-state';
import { useState } from 'react';
import { IconTooltipButton } from '@/components/common/icon-tooltip-button';

interface CellActionProps {
  data: SaleItem;
}

export const CellSalesAction: React.FC<CellActionProps> = ({ data }) => {
  const { removeFromSale, updateSaleQuantity } = usePOSStore();
  const [open, setOpen] = useState(false);
  const { product, quantity, size } = data;

  const handleAdd = () => {
    updateSaleQuantity(String(product.id), size, quantity + 1);
  };

  const handleRemove = () => {
    if (quantity <= 1) {
      removeFromSale(String(product.id), size);
    } else {
      updateSaleQuantity(String(product.id), size, quantity - 1);
    }
  };

  const handleDelete = () => setOpen(true);

  const onConfirm = () => {
    removeFromSale(String(product.id), size);
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={false}
        title='Eliminar Producto'
        description='¿Estás seguro de que deseas eliminar este producto de la venta? Esta acción no se puede deshacer.'
      />
      <div className='flex gap-2'>
        {IconTooltipButton(
          <PlusCircle className='h-4 w-4 text-green-600' />,
          'Agregar',
          handleAdd
        )}
        {IconTooltipButton(
          <MinusCircle className='h-4 w-4 text-yellow-600' />,
          'Quitar',
          handleRemove
        )}
        {IconTooltipButton(
          <IconTrash className='h-4 w-4' />,
          'Eliminar',
          handleDelete,
          'destructive'
        )}
      </div>
    </>
  );
};
