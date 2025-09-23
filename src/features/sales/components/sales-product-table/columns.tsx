import { Badge } from '@/components/ui/badge';
import { CellSalesAction } from './cell-action';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { SaleItem } from '@/store/pos-state';
import { Text } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export const columnsSale: ColumnDef<SaleItem>[] = [
  {
    accessorKey: 'product.photo_url',
    header: 'Imagen',
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.product.images[0]}
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
    cell: ({ row }) => {
      const item = row.original;
      if (item.defectiveCount > 0) {
        return (
          <div className='space-y-1'>
            <div className='flex gap-1'>
              <span>{item.quantity - item.defectiveCount}x</span>
              <span>{formatPrice(item.unit_price)}</span>
            </div>
            <div className='flex gap-1 text-red-600'>
              <span>{item.defectiveCount}x</span>
              <span>{formatPrice(item.unit_price * 0.9)} (defectuoso)</span>
            </div>
          </div>
        );
      }
      return <span>{formatPrice(item.unit_price)}</span>;
    }
  },
  {
    accessorKey: 'subtotal',
    header: 'Subtotal',
    cell: ({ row }) => <span>{formatPrice(row.original.subtotal)}</span>
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
