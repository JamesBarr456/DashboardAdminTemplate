'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CashRegisterModal } from './button-open-cash';
import HistoryModalNew from '@/features/history/components/history-modal-new';
import { Separator } from '@/components/ui/separator';
import StatCard from './stat-card';
import { cn } from '@/lib/utils';
import { formatDateTime } from '@/lib/format';
import { useMemo } from 'react';
import { useOrderStore } from '@/store/order-state';
import { usePOSStore } from '@/store/pos-state';
import { useRouter } from 'next/navigation';

export default function QuickActions() {
  const router = useRouter();
  const { cashRegister, addMovement, sales } = usePOSStore();
  const { orders } = useOrderStore();

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === 'pending').length;
    const delivered = orders.filter((o) => o.status === 'delivered').length;
    const ventasHoy = sales.filter(
      (sale) =>
        sale.cashier === cashRegister.cashier &&
        sale.timestamp.toDateString() === new Date().toDateString()
    ).length;

    return {
      ventasTurno: ventasHoy || 0,
      pedidosRetirados: delivered,
      pendientes: pending
    };
  }, [orders, sales, cashRegister.cashier]);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-semibold'>Estado de Caja</h3>
          <Badge variant={cashRegister.isOpen ? 'default' : 'destructive'}>
            {cashRegister.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Stats Cards */}
        <div className='grid grid-cols-2 gap-2'>
          <StatCard title='Cajera' value={cashRegister.cashier} />
          <StatCard title='Ventas' value={stats.ventasTurno} />
          <StatCard title='Retirados' value={stats.pedidosRetirados} />
          <StatCard
            title='Apertura'
            value={
              formatDateTime(String(cashRegister.openedAt)) || '-- / -- / ----'
            }
          />
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className='space-y-4'>
          <h3 className='text-sm font-semibold'>Acciones Rápidas</h3>

          <div className='grid gap-2'>
            <Button
              variant='default'
              className={cn(
                'w-full cursor-pointer',
                !cashRegister.isOpen && 'cursor-not-allowed'
              )}
              disabled={!cashRegister.isOpen}
              onClick={() => {
                if (cashRegister.isOpen) {
                  router.push('/dashboard/sales/start-pos');
                }
              }}
            >
              Iniciar Venta
            </Button>
            <CashRegisterModal />
            <HistoryModalNew
              type='income'
              addMovement={addMovement}
              cashRegister={cashRegister}
            />
            <HistoryModalNew
              type='expense'
              addMovement={addMovement}
              cashRegister={cashRegister}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
