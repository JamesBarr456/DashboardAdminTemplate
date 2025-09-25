'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { usePOSStore } from '@/store/pos-state';

import { useRegisterStats } from '../../hooks/use-register-stats';
import QuickButtons from './quick-buttons';
import RegisterStatsGrid from './register-stat-grid';
import { StatusBadge } from '@/components/common/status-badge';

export default function ControlPanel() {
  const { cashRegister, addMovement } = usePOSStore();
  const stats = useRegisterStats();

  return (
    <Card>
      <CardHeader>
        <StatusBadge
          label='Estado de Caja'
          isActive={cashRegister.isOpen}
          activeText='Caja Abierta'
          inactiveText='Caja Cerrada'
          activeVariant='default'
          inactiveVariant='destructive'
        />
      </CardHeader>

      <CardContent className='space-y-4'>
        <RegisterStatsGrid
          cashier={cashRegister.cashier}
          openedAt={cashRegister.openedAt}
          stats={{
            salesCount: stats.salesCount,
            deliveredOrders: stats.deliveredOrders
          }}
        />

        <Separator />

        <QuickButtons
          isOpen={cashRegister.isOpen}
          addMovement={addMovement}
          cashRegister={cashRegister}
        />
      </CardContent>
    </Card>
  );
}
