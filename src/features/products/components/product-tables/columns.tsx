'use client';

import { Column, ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { CATEGORY_OPTIONS } from './options';
import { CellAction } from './cell-action';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Text } from 'lucide-react';
import { formatPrice } from '../../../../lib/format';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'images',
    header: 'Imagen',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.original.images[0]}
            alt={row.original.name}
            fill
            className='rounded-lg'
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'sku',
    header: 'Código',
    cell: ({ cell }) => {
      const status = cell.getValue<Product['sku']>();

      return (
        <Badge variant='outline' className='capitalize'>
          {status}
        </Badge>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Buscar Producto...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Categoria' />
    ),
    cell: ({ cell, column }) => {
      const value = cell.getValue<Product['category']>();
      const options = column.columnDef.meta?.options || [];
      const option = options.find((opt: any) => opt.value === value);

      return (
        <Badge variant='outline' className='capitalize'>
          {option ? option.label : value}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'categorias',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },

  {
    accessorKey: 'cost_price',
    header: 'Precio de Costo',
    cell: ({ cell }) => (
      <p>{formatPrice(cell.getValue<Product['cost_price']>())}</p>
    )
  },
  {
    accessorKey: 'sale_price',
    header: 'Precio de Venta',
    cell: ({ cell }) => (
      <p>{formatPrice(cell.getValue<Product['sale_price']>())}</p>
    )
  },

  {
    accessorKey: 'description',
    header: 'Descripción'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
