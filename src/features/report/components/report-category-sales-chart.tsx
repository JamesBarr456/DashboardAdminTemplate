import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { CategorySale } from '../utils/report-calculations';

interface CategorySalesChartProps {
  categorySales: CategorySale[];
  periodLabel: string;
}

export function CategorySalesChart({
  categorySales,
  periodLabel
}: CategorySalesChartProps) {
  const maxCategorySale = Math.max(...categorySales.map((c) => c.amount));

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Package className='h-5 w-5' />
          Ventas por Categoría - {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {categorySales.map((category, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='w-20 text-sm font-medium'>
                {category.category}
              </div>
              <div className='mx-4 flex-1'>
                <div className='bg-muted h-2 rounded-full'>
                  <div
                    className='bg-chart-1 h-2 rounded-full transition-all duration-300'
                    style={{
                      width:
                        maxCategorySale > 0
                          ? `${(category.amount / maxCategorySale) * 100}%`
                          : '0%'
                    }}
                  />
                </div>
              </div>
              <div className='w-24 text-right text-sm font-medium'>
                ${category.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
