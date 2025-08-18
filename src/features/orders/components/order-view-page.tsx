import { Order, fakeOrders } from '@/constants/order-mock-api';

import OrderForm from './order-form';
import { notFound } from 'next/navigation';
import { fakeCustomers } from '@/constants/customers-mok-api';
import { Customer } from '@/constants/mocks/customers';

type TProductViewPageProps = {
  orderId: string;
};

export default async function OrderViewPage({
  orderId
}: TProductViewPageProps) {
  let order = null;
  let customer = null;
  let pageTitle = 'Edit Order';

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
