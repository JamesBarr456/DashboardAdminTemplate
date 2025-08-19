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
      <DataTableColumnHeader column={column} title='ID de Órden' />
    ),
    cell: ({ cell }) => (
      <span className='font-medium'>{cell.getValue<string>()}</span>
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
    cell: ({ cell }) => <div>{cell.getValue<Order['user_name']>()}</div>,
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
      const colorVariants: Record<
        Order['status'],
        'outline' | 'secondary' | 'default' | 'destructive'
      > = {
        cancelled: 'secondary',
        processing: 'outline',
        sending: 'default',
        rejected: 'destructive'
      } as const;

      return (
        <Badge variant={colorVariants[status]} className='capitalize'>
          {option ? option.label : status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'estado',
      variant: 'multiSelect',
      options: [
        { value: 'rejected', label: 'Rechazado' },
        { value: 'processing', label: 'En proceso' },
        { value: 'sending', label: 'Enviandose' },
        { value: 'cancelled', label: 'Cancelado' }
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
    accessorKey: 'payment_method',
    header: 'Método de Pago',
    cell: ({ cell }) => {
      const method = cell.getValue<Order['payment_method']>();

      return (
        <Badge variant='outline' className='capitalize'>
          {method}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Creado',
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
