import { formatDateTime } from '@/lib/format';
import StatCard from './stat-card';

interface RegisterStatsGridProps {
  cashier: string;
  openedAt: Date | undefined;
  stats: {
    salesCount: number;
    deliveredOrders: number;
  };
}

function RegisterStatsGrid({
  cashier,
  openedAt,
  stats
}: RegisterStatsGridProps) {
  return (
    <div className='grid grid-cols-2 gap-2'>
      <StatCard title='Cajera' value={cashier} />
      <StatCard title='Ventas' value={stats.salesCount} />
      <StatCard title='Retirados' value={stats.deliveredOrders} />
      <StatCard
        title='Apertura'
        value={openedAt ? formatDateTime(String(openedAt)) : '-- / -- / ----'}
      />
    </div>
  );
}
export default RegisterStatsGrid;
