'use client';

import { Column, ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { CATEGORY_OPTIONS } from './options';
import { CellAction } from './cell-action';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import Image from 'next/image';
import { Product } from '@/constants/mock-api';
import { Text } from 'lucide-react';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            className='rounded-lg'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search products...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Product['category']>();

      return (
        <Badge variant='outline' className='capitalize'>
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'categories',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Gender' />
    ),
    cell: ({ cell }) => (
      <Badge variant='outline' className='capitalize'>
        {cell.getValue<Product['gender']>()}
      </Badge>
    ),
    enableColumnFilter: true,
    meta: {
      label: 'gender',
      variant: 'multiSelect',
      options: [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
        { value: 'kids', label: 'Kids' }
      ]
    }
  },
  {
    accessorKey: 'cost_price',
    header: 'COST PRICE'
  },
  {
    accessorKey: 'sale_price',
    header: 'SALE PRICE'
  },
  {
    accessorKey: 'discount_percentage',
    header: 'DISCOUNT %'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
