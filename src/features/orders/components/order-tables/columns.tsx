'use client';

import { Column, ColumnDef } from '@tanstack/react-table';
import { formatDate, formatPrice } from '../../../../lib/format';

import { Badge } from '@/components/ui/badge';
import { CellAction } from './cell-action';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { NewOrder as Order } from '@/types/order-new';
import { translatePaymentMethod } from '@/lib/translation';
import { STATUS_OPTIONS } from './options';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<Order, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID de Órden' />
    ),
    cell: ({ cell }) => (
      <span className='font-medium'>{cell.row.original._id}</span>
    ),
    meta: {
      label: 'Order ID',
      placeholder: 'Buscar por ID...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'user_name',
    accessorKey: 'user_name',
    header: ({ column }: { column: Column<Order, unknown> }) => (
      <DataTableColumnHeader column={column} title='Nombre de Cliente' />
    ),
    cell: ({ cell }) => (
      <div>
        {cell.row.original.customer.snapshot.firstName +
          ' ' +
          cell.row.original.customer.snapshot.lastName}
      </div>
    ),
    meta: {
      label: 'Name',
      placeholder: 'Buscar por nombre...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'status',
    accessorKey: 'status',

    header: ({ column }: { column: Column<Order, unknown> }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ cell, column }) => {
      const status = cell.getValue<Order['status']>();
      const options = column.columnDef.meta?.options || [];
      const option = options.find((opt: any) => opt.value === status);
      const variant =
        STATUS_OPTIONS.find((opt) => opt.value === status)?.variant ||
        'default';

      return (
        <Badge variant={variant} className='capitalize'>
          {option ? option.label : status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'estado',
      variant: 'multiSelect',
      options: STATUS_OPTIONS
    }
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ cell }) => {
      const value = cell.row.original.summary.grand_total;
      return <span>{formatPrice(value)}</span>;
    }
  },
  {
    accessorKey: 'payment_method',
    header: 'Método de Pago',
    cell: ({ cell }) => {
      const method = cell.getValue<Order['payment_method']>();

      return (
        <Badge variant='outline' className='capitalize'>
          {translatePaymentMethod(method)}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
    cell: ({ cell }) => {
      const date = new Date(cell.row.original.createdAt);
      return <span>{formatDate(String(date))}</span>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
