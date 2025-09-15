import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package } from 'lucide-react';

import { cashierStats } from '@/constants/mock-sell';
import { Button } from '@/components/ui/button';
import CashSummaryCard from './cash-summary-card';
import HistoryModalNew from '@/features/history/components/history-modal-new';
import Link from 'next/link';
import { useOrderStore } from '@/store/order-state';
import { columns as ordersPendingColumn } from '../sales-orders-pending/columns';

function CashRegisterView() {
  const { orders } = useOrderStore();
  const totalItemsPending = orders.filter(
    (order) => order.status === 'pending'
  );
  const totalItemsDelivered = orders.filter(
    (order) => order.status === 'delivered'
  );
  return (
    <div className='bg-background min-h-screen p-4 lg:p-6'>
      <div className='mx-auto space-y-5'>
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-4'>
          {/* Orders Section */}
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

          {/* Actions Sidebar */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-xl font-semibold'>
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Button asChild variant='default' className='w-full'>
                  <Link href='/dashboard/sales/start-pos' className='w-full'>
                    Iniciar Venta
                  </Link>
                </Button>

                <Separator className='my-4' />

                <HistoryModalNew type='income' />
                <HistoryModalNew type='expense' />
              </CardContent>
            </Card>

            <CashSummaryCard stats={cashierStats} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashRegisterView;
