import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { DailySale } from '../utils/report-calculations';

interface DailySalesChartProps {
  dailySales: DailySale[];
  periodLabel: string;
}

export function DailySalesChart({
  dailySales,
  periodLabel
}: DailySalesChartProps) {
  const maxDailySale = Math.max(...dailySales.map((d) => d.amount));

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BarChart3 className='h-5 w-5' />
          Ventas por Día - {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {dailySales.map((day, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='w-16 text-sm'>
                <div className='font-medium'>{day.day}</div>
                <div className='text-muted-foreground text-xs'>{day.date}</div>
              </div>
              <div className='mx-4 flex-1'>
                <div className='bg-muted h-2 rounded-full'>
                  <div
                    className='bg-primary h-2 rounded-full transition-all duration-300'
                    style={{
                      width:
                        maxDailySale > 0
                          ? `${(day.amount / maxDailySale) * 100}%`
                          : '0%'
                    }}
                  />
                </div>
              </div>
              <div className='w-24 text-right text-sm font-medium'>
                ${day.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
