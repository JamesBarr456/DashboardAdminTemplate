'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import StatCard from './stat-card';

import { formatDate } from '@/lib/format';
import { useMemo } from 'react';
import { useOrderStore } from '@/store/order-state';
import { usePOSStore } from '@/store/pos-state';

export default function CashRegisterStats() {
  const { cashRegister } = usePOSStore();
  const { orders } = useOrderStore();

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === 'pending').length;
    const delivered = orders.filter((o) => o.status === 'delivered').length;

    return {
      ventasTurno: orders.length,
      pedidosRetirados: delivered,
      pendientes: pending
    };
  }, [orders]);

  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <Badge variant={cashRegister.isOpen ? 'default' : 'destructive'}>
          {cashRegister.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-2 items-center gap-4 xl:grid-cols-6'>
          <StatCard title='Cajera' value={cashRegister.cashier} />

          <StatCard title='Ventas del turno' value={stats.ventasTurno} />
          <StatCard title='Pedidos retirados' value={stats.pedidosRetirados} />
          <StatCard
            title='Apertura de caja'
            value={formatDate(cashRegister.openedAt)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
