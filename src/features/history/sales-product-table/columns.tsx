import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { HISTORY_TYPES } from './options';
import { Movement } from '@/store/pos-state';

export const columnsHistory: ColumnDef<Movement>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Fecha y Hora',
    cell: ({ row }) => {
      const value = row.getValue('timestamp') as string;
      return <span>{new Date(value).toLocaleString()}</span>;
    },
    enableColumnFilter: true,
    meta: {
      label: 'Por Fecha',
      variant: 'date'
    }
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {row.original.type}
      </Badge>
    ),
    enableColumnFilter: true,
    meta: {
      label: 'Por Tipo',
      variant: 'multiSelect',
      options: HISTORY_TYPES
    }
  },
  {
    accessorKey: 'amount',
    header: 'Monto',
    cell: ({ row }) => <span>${row.original.amount}</span>
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => <span>{row.original.description}</span>
  },
  {
    accessorKey: 'cashier',
    header: 'Cajero',
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {row.original.cashier}
      </Badge>
    )
  }
];
