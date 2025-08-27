'use client';

import { IconTrash } from '@tabler/icons-react';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { MinusCircle, PlusCircle } from 'lucide-react';
import { SaleItem, usePOSStore } from '@/store/pos-state';
import { JSX, useState } from 'react';

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

  const renderTooltipButton = (
    icon: JSX.Element,
    onClick: () => void,
    label: string,
    variant: 'outline' | 'destructive' = 'outline'
  ) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size='sm' onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={false}
      />
      <div className='flex gap-2'>
        {renderTooltipButton(
          <PlusCircle className='h-4 w-4 text-green-600' />,
          handleAdd,
          'Agregar'
        )}
        {renderTooltipButton(
          <MinusCircle className='h-4 w-4 text-yellow-600' />,
          handleRemove,
          'Quitar'
        )}
        {renderTooltipButton(
          <IconTrash className='h-4 w-4' />,
          handleDelete,
          'Eliminar',
          'destructive'
        )}
      </div>
    </>
  );
};
