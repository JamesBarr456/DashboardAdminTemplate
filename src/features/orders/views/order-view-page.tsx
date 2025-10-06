import { NewOrder as Order } from '@/types/order-new';
import OrderForm from '../components/order-form';

import { fakeOrders } from '@/services/order-mock-api';
import { notFound } from 'next/navigation';

type TProductViewPageProps = {
  orderId: string;
};

export default async function OrderViewPage({
  orderId
}: TProductViewPageProps) {
  let order = null;

  let pageTitle = 'Editar Pedido';

  try {
    const data = await fakeOrders.getOrderById(orderId);

    if (!data.success || !data.order) {
      notFound();
    }

    order = data.order as Order;
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }

  return <OrderForm initialData={{ order }} pageTitle={pageTitle} />;
}
