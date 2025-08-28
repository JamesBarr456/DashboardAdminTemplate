import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';

import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import HistoryViewPage from '@/features/history/history-view-page';

export default function HistoryPage() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Historial de Movimientos'
          description='Visualizar y agregar movientos de caja del dia.'
        />

        <Separator />
        <Suspense
          // key={key}
          fallback={<div>Loading....</div>}
        >
          <HistoryViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
