'use client';

import { AlertCircle, MinusCircle, PlusCircle } from 'lucide-react';
import { SaleItem, usePOSStore } from '@/store/pos-state';

import { AlertModal } from '@/components/modal/alert-modal';
import { IconTooltipButton } from '@/components/common/icon-tooltip-button';
import { IconTrash } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface CellActionProps {
  data: SaleItem;
}

export const CellSalesAction: React.FC<CellActionProps> = ({ data }) => {
  const { removeFromSale, updateSaleQuantity, updateDefectiveCount } =
    usePOSStore();
  const [open, setOpen] = useState(false);
  const { product, quantity, size, defectiveCount } = data;

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
        <div className='flex items-center gap-2'>
          <AlertCircle
            className={`h-4 w-4 ${defectiveCount > 0 ? 'text-red-600' : 'text-gray-600'}`}
          />
          <Input
            type='number'
            value={defectiveCount}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              updateDefectiveCount(String(product.id), size, value);
            }}
            className='h-8 w-20'
            min={0}
            max={quantity}
            placeholder='Defectuosos'
          />
        </div>
      </div>
    </>
  );
};
