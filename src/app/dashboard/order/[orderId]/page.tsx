import type { Metadata } from 'next';
import OrderViewPage from '@/features/orders/components/order-view-page';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Editar Order - Admin Panel',
  description: 'Editar order existente'
};
type PageProps = { params: Promise<{ orderId: string }> };

export default async function EditOrderPage(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<div>Loading...</div>}>
          {/** Replace with actual OrderViewPage component when available */}

          <OrderViewPage orderId={params.orderId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
