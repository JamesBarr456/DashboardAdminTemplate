import { Clock, Package } from 'lucide-react';

import OrdersTable from './orders-table';
import { columns as ordersPendingColumn } from '../tables/sales-orders-pending/columns';
import { useOrderStore } from '@/store/order-state';

interface OrdersTableViewProps {
  activeTab: 'pending' | 'delivered';
}

function OrdersTableView({ activeTab }: OrdersTableViewProps) {
  const { orders } = useOrderStore();
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <OrdersTable
      title={
        activeTab === 'pending' ? 'Pedidos Pendientes' : 'Pedidos Retirados'
      }
      orders={filteredOrders}
      columns={ordersPendingColumn}
      totalItems={filteredOrders.length}
      icon={activeTab === 'pending' ? Clock : Package}
    />
  );
}

export default OrdersTableView;
