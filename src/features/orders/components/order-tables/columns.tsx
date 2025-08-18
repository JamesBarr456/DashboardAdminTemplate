'use client';

import { Column, ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { CellAction } from './cell-action';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Order } from '@/constants/order-mock-api';
import { format } from 'date-fns';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<Order, unknown> }) => (
      <DataTableColumnHeader column={column} title='Order ID' />
    ),
    cell: ({ cell }) => (
      <span className='font-medium'>{cell.getValue<string>()}</span>
    ),
    meta: {
      label: 'Order ID',
      placeholder: 'Search by order ID...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'user_name',
    accessorKey: 'user_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer' />
    ),
    cell: ({ cell }) => <span>{cell.getValue<string>()}</span>,
    enableColumnFilter: true,
    meta: {
      label: 'Customer',
      placeholder: 'Search customers...',
      variant: 'text'
    }
  },
  {
    id: 'status',
    accessorKey: 'status',

    header: ({ column }: { column: Column<Order, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Order['status']>();
      const colorVariants: Record<
        Order['status'],
        'outline' | 'secondary' | 'default' | 'destructive'
      > = {
        pending: 'outline',
        processing: 'secondary',
        shipped: 'default',
        delivered: 'default',
        cancelled: 'destructive'
      } as const;

      return (
        <Badge variant={colorVariants[status]} className='capitalize'>
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'status',
      variant: 'multiSelect',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    }
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ cell }) => {
      const value = cell.getValue<number>();
      return <span>${value.toFixed(2)}</span>;
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      return <span>{format(date, 'dd/MM/yyyy')}</span>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
