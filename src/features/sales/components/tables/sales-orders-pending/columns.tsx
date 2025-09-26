import { Badge } from '@/components/ui/badge';

import { ColumnDef } from '@tanstack/react-table';

import { Text } from 'lucide-react';

import CellTableOrderPendingsAction from './cell-action';
import { NewOrder as Order } from '@/types/order-new';

import { formatDateTime, formatPrice } from '@/lib/format';
import {
  translatePaymentMethod,
  translateDeliveryOption
} from '@/lib/translation';

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
    header: 'Tipo de Entrega',
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {translateDeliveryOption(
          row.original.shipping_information.delivery_option
        )}
      </Badge>
    )
  },
  {
    accessorKey: 'monto',
    header: 'Monto',
    cell: ({ row }) => (
      <span>{formatPrice(row.original.summary.grand_total)}</span>
    )
  },

  {
    accessorKey: 'formaPago',
    header: 'Forma de Pago',
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {translatePaymentMethod(row.original.payment_method)}
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
      return <CellTableOrderPendingsAction id={row.original._id} />;
    }
  }
];
