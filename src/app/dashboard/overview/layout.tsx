import React, { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import ReportViewPage from '@/features/report/components/report-view-page';

export default function OverViewLayout({}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <Suspense
          // key={key}
          fallback={<div> Loading..........</div>}
        >
          <ReportViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
