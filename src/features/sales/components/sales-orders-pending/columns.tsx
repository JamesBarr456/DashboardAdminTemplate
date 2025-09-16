import { Badge } from '@/components/ui/badge';

import { ColumnDef } from '@tanstack/react-table';

import { Text } from 'lucide-react';

import CellTableOrderPendingsAction from './cell-action';
import { NewOrder as Order } from '@/types/order-new';
import { formatDateTime } from '../../utils/formatters';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'cliente',
    header: 'Cliente',
    cell: ({ row }) => (
      <span>
        {row.original.customer.snapshot.firstName +
          ' ' +
          row.original.customer.snapshot.lastName}
      </span>
    ),
    meta: {
      label: 'Cliente',
      placeholder: 'Buscar por Nombre',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'modoEntrega',
    header: 'Entrega',
    cell: ({ row }) => (
      <span>{row.original.shipping_information.delivery_option}</span>
    )
  },
  {
    accessorKey: 'monto',
    header: 'Monto',
    cell: ({ row }) => <span>${row.original.summary.grand_total}</span>
  },

  {
    accessorKey: 'formaPago',
    header: 'Forma de Pago',
    cell: ({ row }) => (
      <Badge variant='outline' className='uppercase'>
        {row.original.payment_method}
      </Badge>
    )
  },
  {
    accessorKey: 'fechaPedido',
    header: 'Fecha de Pedido',
    cell: ({ row }) => (
      <Badge variant='outline'>{formatDateTime(row.original.createdAt)}</Badge>
    )
  },

  {
    id: 'actions',

    cell: ({ row }) => {
      // 👇 Si está entregada, no mostrar nada
      if (row.original.status === 'delivered') return null;

      return <CellTableOrderPendingsAction id={row.original._id} />;
    }
  }
];
