import { PieGraph } from '@/features/overview/components/pie-graph';
import { delay } from '@/services/product-mock-api';

export default async function Stats() {
  await delay(1000);
  return <PieGraph />;
}
