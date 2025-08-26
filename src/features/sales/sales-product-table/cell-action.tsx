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
import { Product } from '@/constants/product-mock-api';

import { useState } from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface CellActionProps {
  data: Product;
}

export const CellSalesAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          {/* Agregar */}
          <DropdownMenuItem
            onClick={() => console.log('Agregar producto', data.sku)}
          >
            <PlusCircle className='mr-2 h-4 w-4 text-green-600' />
            Agregar
          </DropdownMenuItem>

          {/* Quitar */}
          <DropdownMenuItem
            onClick={() => console.log('Quitar producto', data.sku)}
          >
            <MinusCircle className='mr-2 h-4 w-4 text-yellow-600' />
            Quitar
          </DropdownMenuItem>

          {/* Eliminar */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4 text-red-600' />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
