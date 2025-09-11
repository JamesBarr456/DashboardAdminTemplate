import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import SalesViewPage from '@/features/sales/components/sales-view-page';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { CashRegisterModal } from '@/features/sales/components/prueba/button-open-cash';

export default function SalesPage() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <Heading
            title='Ventas'
            description='Apertura de caja - Ventas de salon '
          />
          <CashRegisterModal />
        </div>

        <Separator />
        <Suspense fallback={<div>Loading....</div>}>
          <SalesViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
