import React, { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import ReportViewPage from '@/features/report/components/report-view-page';

export default function OverViewLayout() {
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
