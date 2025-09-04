import { AreaGraph } from '@/features/overview/components/area-graph';
import { delay } from '@/services/product-mock-api';

export default async function AreaStats() {
  await await delay(2000);
  return <AreaGraph />;
}
