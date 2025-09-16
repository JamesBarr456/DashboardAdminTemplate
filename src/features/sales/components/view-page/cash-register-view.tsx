import { Clock, Package } from 'lucide-react';

import OrdersTable from './orders-table';
import { columns as ordersPendingColumn } from '../sales-orders-pending/columns';
import { useOrderStore } from '@/store/order-state';

interface OrdersTableViewProps {
  activeTab: 'pending' | 'delivered';
}

function OrdersTableView({ activeTab }: OrdersTableViewProps) {
  const { orders } = useOrderStore();
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className='xl:col-span-3'>
      <OrdersTable
        title={
          activeTab === 'pending' ? 'Pedidos Pendientes' : 'Pedidos Retirados'
        }
        orders={filteredOrders}
        columns={ordersPendingColumn}
        totalItems={filteredOrders.length}
        icon={activeTab === 'pending' ? Clock : Package}
      />
    </div>
  );
}

export default OrdersTableView;
