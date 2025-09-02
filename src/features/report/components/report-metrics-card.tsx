import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, DollarSign, CreditCard } from 'lucide-react';
import { SalesMetrics } from '../utils/report-calculations';

interface MetricsCardsProps {
  metrics: SalesMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const getPercentage = (amount: number, total: number): string => {
    return total > 0 ? ((amount / total) * 100).toFixed(0) : '0';
  };

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Ventas</CardTitle>
          <Receipt className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${metrics.totalSales.toLocaleString()}
          </div>
          <p className='text-muted-foreground text-xs'>
            {metrics.transactionCount} transacciones
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Efectivo</CardTitle>
          <DollarSign className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${metrics.totalCash.toLocaleString()}
          </div>
          <p className='text-muted-foreground text-xs'>
            {getPercentage(metrics.totalCash, metrics.totalSales)}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Transferencias</CardTitle>
          <CreditCard className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${metrics.totalTransfer.toLocaleString()}
          </div>
          <p className='text-muted-foreground text-xs'>
            {getPercentage(metrics.totalTransfer, metrics.totalSales)}% del
            total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
