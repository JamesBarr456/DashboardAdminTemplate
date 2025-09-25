'use client';

import OrdersTableView from './view-page/cash-register-view';
import ControlPanel from './view-page/control-panel';
import { useEffect } from 'react';
import { usePOSStore } from '@/store/pos-state';
import TabsCustom from '@/components/common/tabs-custom';

export default function SalesViewPage() {
  const { fetchProducts } = usePOSStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const tabsData = [
    {
      trigger: 'Pedidos Pendientes',
      value: 'pedidos-pendientes',
      content: <OrdersTableView activeTab='pending' />
    },
    {
      trigger: 'Pedidos Retirados',
      value: 'pedidos-retirados',
      content: <OrdersTableView activeTab='delivered' />
    }
  ];

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
        <div className='md:col-span-2'>
          <ControlPanel />
        </div>
        <div className='md:col-span-3'>
          <TabsCustom data={tabsData} />
        </div>
      </div>
    </>
  );
}
