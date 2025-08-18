import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Heading } from '@/components/ui/heading';
import type { Metadata } from 'next';
import OrderListingPage from '@/features/orders/components/order-listing';
import PageContainer from '@/components/layout/page-container';
import { SearchParams } from 'nuqs/server';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { searchParamsOrderCache } from '@/lib/search-params-order';

export const metadata: Metadata = {
  title: 'Order - Admin Panel',
  description: 'Order management page'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};
export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsOrderCache.parse(searchParams);
  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Orders'
          description='Manage orders (Server side table functionalities.)'
        />

        <Separator />
        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <OrderListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
