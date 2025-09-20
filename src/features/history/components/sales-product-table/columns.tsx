import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { HISTORY_TYPES } from './options';
import { Movement } from '@/store/pos-state';
import MovementDetailsView from './movement-details-view';
import { formatDateTime } from '@/lib/format';
import { formatPrice } from '../../../../lib/format';
import { translateMovementType } from '../../../../lib/translation';

export const columnsHistory: ColumnDef<Movement>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Fecha y Hora',
    cell: ({ row }) => {
      const value = row.getValue('timestamp') as string;
      return <span>{formatDateTime(value)}</span>;
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
        {translateMovementType(row.original.type)}
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
    cell: ({ row }) => <span>{formatPrice(row.original.amount)}</span>
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
  },
  {
    id: 'actions',
    header: 'Detalles',
    cell: ({ row }) => {
      const movement = row.original;
      if (movement.type === 'sale' && movement.saleDetails) {
        return <MovementDetailsView id={movement.saleId!} />;
      }
      return null;
    }
  }
];
