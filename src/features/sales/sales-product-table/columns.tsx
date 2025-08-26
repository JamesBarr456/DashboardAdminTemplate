import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SaleItem } from '@/store/pos-state';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CellSalesAction } from './cell-action';

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
    )
  },
  {
    accessorKey: 'product.name',
    header: 'Producto',
    cell: ({ row }) => <span>{row.original.product.name}</span>
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
    id: 'sizes',
    header: 'Talles',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='flex items-center gap-2'
            >
              <ChevronRight className='h-4 w-4 data-[state=open]:hidden' />
              <ChevronDown className='hidden h-4 w-4 data-[state=open]:block' />
              Ver talles
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='mt-2 space-y-1 pl-4'>
            {Object.entries(item.sizes).map(([size, qty]) => (
              <div key={size} className='flex justify-between text-sm'>
                <span className='font-medium'>{size}</span>
                <span>{qty} u.</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellSalesAction data={row.original.product} />
  }
];
