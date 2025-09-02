import PageContainer from '@/components/layout/page-container';
import ReportViewPage from '@/features/report/components/report-view-page';

import React, { Suspense } from 'react';
export const metadata = {
  title: 'Dashboard: Products'
};

function page() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
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

export default page;
