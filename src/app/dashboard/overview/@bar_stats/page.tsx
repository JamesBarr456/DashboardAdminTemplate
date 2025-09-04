import { BarGraph } from '@/features/overview/components/bar-graph';
import { delay } from '@/services/product-mock-api';

export default async function BarStats() {
  await await delay(1000);

  return <BarGraph />;
}
