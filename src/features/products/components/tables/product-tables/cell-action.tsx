'use client';

import { IconEdit, IconTrash } from '@tabler/icons-react';

import { AlertModal } from '@/components/modal/alert-modal';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DropdownCustom } from '@/components/common/dropdown-custom';

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {};

  const actions = [
    {
      label: 'Actualizar',
      icon: <IconEdit className='h-4 w-4' />,
      onClick: () => router.push(`/dashboard/product/${data.sku}`)
    },
    {
      label: 'Eliminar',
      icon: <IconTrash className='h-4 w-4' />,
      onClick: () => setOpen(true)
    }
  ];
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title='¿Estás seguro de que deseas eliminar este producto?'
        description='Esta acción no se puede deshacer.'
      />
      <DropdownCustom actions={actions} />
    </>
  );
};
