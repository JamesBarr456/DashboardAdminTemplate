import { Clock, Package } from 'lucide-react';

import OrdersTable from './orders-table';
import { columns as ordersPendingColumn } from '../sales-orders-pending/columns';
import { useOrderStore } from '@/store/order-state';

function OrdersTableView() {
  const { orders } = useOrderStore();
  const totalItemsPending = orders.filter(
    (order) => order.status === 'pending'
  );
  const totalItemsDelivered = orders.filter(
    (order) => order.status === 'delivered'
  );
  return (
    <div className='space-y-6 xl:col-span-3'>
      <OrdersTable
        title='Pedidos Pendientes'
        orders={totalItemsPending}
        columns={ordersPendingColumn}
        totalItems={totalItemsPending.length}
        icon={Clock}
      />

      <OrdersTable
        title='Pedidos Retirados'
        orders={totalItemsDelivered}
        columns={ordersPendingColumn}
        totalItems={totalItemsDelivered.length}
        icon={Package}
      />
    </div>
  );
}

export default OrdersTableView;
