import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import ReportViewPage from '@/features/report/report-view-page';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export const metadata = {
  title: 'Pilcheria - Reporte '
};

export default async function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Reporte de Ventas '
            description='Visualización de progreso de ventas. '
          />
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={<div>Loading....</div>}
        >
          <ReportViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
