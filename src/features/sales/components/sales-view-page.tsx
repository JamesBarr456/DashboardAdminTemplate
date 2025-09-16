'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
        <div className='md:col-span-2'>
          <QuickActions />
        </div>
        <div className='md:col-span-3'>
          <Tabs defaultValue='pedidos-pendientes' className='w-full'>
            <TabsList>
              <TabsTrigger value='pedidos-pendientes'>
                Pedidos Pendientes
              </TabsTrigger>
              <TabsTrigger value='pedidos-retirados'>
                Pedidos Retirados
              </TabsTrigger>
            </TabsList>

            <TabsContent value='pedidos-pendientes'>
              <OrdersTableView activeTab='pending' />
            </TabsContent>

            <TabsContent value='pedidos-retirados'>
              <OrdersTableView activeTab='delivered' />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
