'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import HistoryModalNew from '@/features/history/components/history-modal-new';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { usePOSStore } from '@/store/pos-state';

export default function QuickActions() {
  const { cashRegister, addMovement } = usePOSStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button asChild variant='default' className='w-full'>
          <Link href='/dashboard/sales/start-pos'>Iniciar Venta</Link>
        </Button>

        <Separator className='my-4' />

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
      </CardContent>
    </Card>
  );
}
