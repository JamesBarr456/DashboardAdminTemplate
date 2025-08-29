import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import SalesViewPage from '@/features/sales/sales-view-page';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export default function SalesPage() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Ventas'
          description='Apertura de caja - Ventas de salon '
        />

        <Separator />
        <Suspense fallback={<div>Loading....</div>}>
          <SalesViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
