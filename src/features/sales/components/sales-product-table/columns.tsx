import { SaleItem } from '@/store/pos-state';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CellSalesAction } from './cell-action';
import { Text } from 'lucide-react';

export const columnsSale: ColumnDef<SaleItem>[] = [
  {
    accessorKey: 'product.photo_url',
    header: 'Imagen',
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.product.photo_url}
          alt={row.original.product.name}
          width={150}
          height={200}
          className='rounded-lg'
        />
      );
    }
  },
  {
    accessorKey: 'product.sku',
    header: 'Código',
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {row.original.product.sku}
      </Badge>
    ),
    meta: {
      label: 'SKU',
      placeholder: 'Buscar por Código',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'product.name',
    header: 'Producto',
    cell: ({ row }) => <span>{row.original.product.name}</span>,
    meta: {
      label: 'Name',
      placeholder: 'Buscar por Nombre',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'unit_price',
    header: 'Precio Unit.',
    cell: ({ row }) => <span>${row.original.unit_price}</span>
  },
  {
    accessorKey: 'subtotal',
    header: 'Subtotal',
    cell: ({ row }) => <span>${row.original.subtotal}</span>
  },

  {
    accessorKey: 'size',
    header: 'Talle',
    cell: ({ row }) => (
      <Badge variant='outline' className='uppercase'>
        {row.original.size}
      </Badge>
    )
  },
  {
    accessorKey: 'quantity',
    header: 'Cantidad',
    cell: ({ row }) => (
      <Badge variant='outline'>{row.original.quantity} U.</Badge>
    )
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellSalesAction data={row.original} />
  }
];
