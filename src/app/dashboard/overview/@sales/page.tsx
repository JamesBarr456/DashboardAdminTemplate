import { RecentSales } from '@/features/overview/components/recent-sales';
import { delay } from '@/services/product-mock-api';

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
