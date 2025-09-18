import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SalesMetrics } from '../utils/report-calculations';
import { formatPrice } from '@/lib/format';

interface FinancialSummaryProps {
  metrics: SalesMetrics;
  periodLabel: string;
}

export function FinancialSummary({
  metrics,
  periodLabel
}: FinancialSummaryProps) {
  const getPaymentMethodPercentage = (amount: number): string => {
    return metrics.totalSales > 0
      ? ((amount / metrics.totalSales) * 100).toFixed(0)
      : '0';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5' />
          Resumen Financiero - {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950'>
              <div className='flex items-center gap-2'>
                <ArrowUpRight className='h-4 w-4 text-green-600' />
                <span className='font-medium'>Total Ingresos</span>
              </div>
              <span className='font-bold text-green-600'>
                {formatPrice(metrics.totalSales + metrics.totalIncomes)}
              </span>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-red-50 p-3 dark:bg-red-950'>
              <div className='flex items-center gap-2'>
                <ArrowDownRight className='h-4 w-4 text-red-600' />
                <span className='font-medium'>Egresos</span>
              </div>
              <span className='font-bold text-red-600'>
                {formatPrice(metrics.totalExpenses)}
              </span>
            </div>

            <div className='border-t pt-4'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-bold'>Balance Neto</span>
                <span className='text-primary text-xl font-bold'>
                  {formatPrice(metrics.netBalance)}
                </span>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='font-semibold'>Métodos de Pago</h3>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Efectivo:</span>
                <div className='text-right'>
                  <span className='font-medium'>
                    {formatPrice(metrics.totalCash)}
                  </span>
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ({getPaymentMethodPercentage(metrics.totalCash)}%)
                  </span>
                </div>
              </div>
              <div className='flex justify-between'>
                <span>Tarjetas:</span>
                <div className='text-right'>
                  <span className='font-medium'>
                    {formatPrice(metrics.totalTransfer)}
                  </span>
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ({getPaymentMethodPercentage(metrics.totalTransfer)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
