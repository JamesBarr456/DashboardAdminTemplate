import { Order, fakeOrders } from '@/constants/order-mock-api';

import { OrderTable } from './order-tables';
import { columns } from './order-tables/columns';
import { searchParamsOrderCache } from '@/lib/search-params-order';

type OrderListingPage = {};

export default async function OrderListingPage({}: OrderListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsOrderCache.get('page');
  const search = searchParamsOrderCache.get('user_name');
  const id = searchParamsOrderCache.get('id');
  const pageLimit = searchParamsOrderCache.get('perPage');
  const status = searchParamsOrderCache.get('status');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status }),
    ...(id && { id })
  };

  const data = await fakeOrders.getOrders(filters);
  const totalOrders = data.total_orders;
  const orders: Order[] = data.orders;

  return (
    <OrderTable data={orders} totalItems={totalOrders} columns={columns} />
  );
}
