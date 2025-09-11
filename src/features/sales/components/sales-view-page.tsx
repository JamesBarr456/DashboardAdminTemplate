'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, Package, User } from 'lucide-react';
import { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';

import { usePOSStore } from '@/store/pos-state';
import CashRegisterView from './prueba/cash-register-view';
import StatCard from './prueba/stat-card';

export default function SalesViewPage() {
  const {
    cashRegister,

    fetchProducts
  } = usePOSStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className='space-y-6'>
      {/* Estado de la Caja */}
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
          <CardContent>
            <div className='flex items-center justify-evenly gap-4'>
              <StatCard
                title='Monto Inicial'
                value={`${cashRegister.initialAmount.toLocaleString()}`}
                icon={DollarSign}
              />
              <StatCard
                title='Ventas del turno'
                value={`${cashRegister.currentAmount.toLocaleString()}`}
                icon={DollarSign}
              />

              <StatCard
                title='Pedidos retirados'
                value={8} //cashierStats.pedidosRetirados}
                icon={Package}
              />
              <StatCard
                title='Apertura de caja'
                value={cashRegister.openedAt?.toLocaleString() || '-'}
                icon={Clock}
              />
            </div>
          </CardContent>
        </CardContent>
      </Card>

      <CashRegisterView />
    </div>
  );
}
