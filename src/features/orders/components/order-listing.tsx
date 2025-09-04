import { Order } from '@/types/order';
import { OrderTable } from './order-tables';
import { columns } from './order-tables/columns';
import { fakeOrders } from '@/services/order-mock-api';
import { searchParamsOrderCache } from '@/lib/search-params-order';

type OrderListingPage = {};

export default async function OrderListingPage({}: OrderListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsOrderCache.get('page');
  const id = searchParamsOrderCache.get('id');
  const pageLimit = searchParamsOrderCache.get('perPage');
  const status = searchParamsOrderCache.get('status');

  const search = id;
  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status })
  };

  const data = await fakeOrders.getOrders(filters);

  const totalOrders = data.total_orders;
  const orders: Order[] = data.orders;

  return (
    <OrderTable data={orders} totalItems={totalOrders} columns={columns} />
  );
}
