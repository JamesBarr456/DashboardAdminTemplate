import { Customer } from '@/types/user';
import { Order } from '@/types/order';
import OrderForm from './order-form';
import { fakeCustomers } from '@/services/customers-mok-api';
import { fakeOrders } from '@/services/order-mock-api';
import { notFound } from 'next/navigation';

type TProductViewPageProps = {
  orderId: string;
};

export default async function OrderViewPage({
  orderId
}: TProductViewPageProps) {
  let order = null;
  let customer = null;
  let pageTitle = 'Editar Órden';

  try {
    const data = await fakeOrders.getOrderById(orderId);

    if (!data.success) {
      notFound();
    }

    const dataCustomer = await fakeCustomers.getCustomerById(
      data.order?.user_id || ''
    );
    if (!dataCustomer.success) notFound();
    order = data.order as Order;
    customer = dataCustomer.customer as Customer;
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }

  return <OrderForm initialData={{ order, customer }} pageTitle={pageTitle} />;
}
