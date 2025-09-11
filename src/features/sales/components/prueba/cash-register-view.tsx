import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Package } from 'lucide-react';

import {
  cashierStats,
  completedOrders,
  pendingOrders
} from '@/constants/mock-sell';
import { Button } from '@/components/ui/button';

import OrdersTable from './orders-table';
import CashSummaryCard from './cash-summary-card';

import Link from 'next/link';

function CashRegisterView() {
  return (
    <div className='bg-background min-h-screen p-4 lg:p-6'>
      <div className='mx-auto max-w-7xl space-y-5'>
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-4'>
          {/* Orders Section */}
          <div className='space-y-6 xl:col-span-3'>
            <OrdersTable
              title='Pedidos Pendientes'
              orders={pendingOrders}
              icon={Clock}
            />

            <OrdersTable
              title='Pedidos Retirados'
              orders={completedOrders}
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

                <Button
                  //   icon={Package}
                  variant='secondary'
                  className='w-full'
                >
                  Retiro de Pedido
                </Button>

                <Separator className='my-4' />

                <Button
                  //   icon={ArrowUpCircle}
                  variant='default'
                  className='w-full'
                >
                  Ingreso de Efectivo
                </Button>

                <Button
                  //   icon={ArrowDownCircle}
                  variant='destructive'
                  className='w-full'
                >
                  Egreso de Efectivo
                </Button>
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
