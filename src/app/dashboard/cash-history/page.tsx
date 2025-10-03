import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Heading } from '@/components/ui/heading';

import PageContainer from '@/components/layout/page-container';
import { SearchParams } from 'nuqs';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { searchParamsCacheHistory } from '@/lib/searh-params-history';
import HistoryListingPage from '@/features/cash-history/components/view/history-listing';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCacheHistory.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Historial de Movimientos'
          description='Visualizar y agregar movientos de caja del dia.'
        />

        <Separator />
        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={3} />
          }
        >
          <HistoryListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
