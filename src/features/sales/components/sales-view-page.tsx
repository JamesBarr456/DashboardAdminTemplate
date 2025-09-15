'use client';

import CashRegisterStats from './view-page/cash-register-stats';
import OrdersTableView from './view-page/cash-register-view';
import QuickActions from './view-page/quick-actions';
import { useEffect } from 'react';
import { usePOSStore } from '@/store/pos-state';

export default function SalesViewPage() {
  const { fetchProducts } = usePOSStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className='space-y-6'>
      <CashRegisterStats />
      <div className='bg-background min-h-screen p-4 lg:p-6'>
        <div className='mx-auto space-y-5'>
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-4'>
            <OrdersTableView />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
