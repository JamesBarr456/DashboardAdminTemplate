import { Order, fakeOrders } from '@/constants/order-mock-api';

import OrderForm from './order-form';
import { notFound } from 'next/navigation';

type TProductViewPageProps = {
  orderId: string;
};

export default async function OrderViewPage({
  orderId
}: TProductViewPageProps) {
  let order = null;
  let pageTitle = 'Edit Order';

  try {
    const data = await fakeOrders.getOrderById(orderId);

    if (!data.success) {
      notFound();
    }
    order = data.order as Order;
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }

  return <OrderForm initialData={order} pageTitle={pageTitle} />;
}
