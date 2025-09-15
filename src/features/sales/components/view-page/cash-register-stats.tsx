'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Clock,
  DollarSign,
  PackageCheck,
  PackageMinus,
  User
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import StatCard from './stat-card';
import { formatCurrency } from '../../utils/formatters';
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
        <div className='flex items-center gap-4'>
          <div className='bg-muted rounded-2xl p-3'>
            <User className='h-5 w-5' />
          </div>
          <div>
            <CardTitle className='text-lg font-bold'>
              Cajera: {cashRegister.cashier}
            </CardTitle>
            <p className='text-muted-foreground text-xs'>
              Sistema de Ventas • Turno Activo
            </p>
          </div>
        </div>

        <Badge variant={cashRegister.isOpen ? 'default' : 'destructive'}>
          {cashRegister.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-2 items-center gap-4 xl:grid-cols-6'>
          <StatCard
            title='Monto Inicial'
            value={formatCurrency(cashRegister.initialAmount)}
            icon={DollarSign}
          />
          <StatCard
            title='Ventas de Efectivo'
            value={formatCurrency(cashRegister.initialAmount)} // TODO: cambiar lógica real
            icon={DollarSign}
          />
          <StatCard
            title='Total en Caja'
            value={formatCurrency(cashRegister.initialAmount)} // TODO: cambiar lógica real
            icon={DollarSign}
          />
          <StatCard
            title='Ventas del turno'
            value={stats.ventasTurno}
            icon={PackageCheck}
          />
          <StatCard
            title='Pedidos retirados'
            value={stats.pedidosRetirados}
            icon={PackageMinus}
          />
          <StatCard
            title='Apertura de caja'
            value={formatDate(cashRegister.openedAt)}
            icon={Clock}
          />
        </div>
      </CardContent>
    </Card>
  );
}
