import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopProduct } from '../utils/report-calculations';
import Image from 'next/image';

interface TopProductsListProps {
  topProducts: TopProduct[];
  periodLabel: string;
}

export function TopProductsList({
  topProducts,
  periodLabel
}: TopProductsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos Más Vendidos - {periodLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topProducts.map((item, index) => (
            <div
              key={item.product.id}
              className='flex items-center justify-between rounded-lg border p-3'
            >
              <div className='flex items-center gap-3'>
                <div className='bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold'>
                  {index + 1}
                </div>
                <Image
                  src={item.product.photo_url}
                  alt={item.product.name}
                  width={20}
                  height={20}
                  className='h-12 w-12 rounded-md object-cover'
                />
                <div>
                  <p className='font-medium'>{item.product.name}</p>
                  <p className='text-muted-foreground text-sm'>
                    SKU: {item.product.sku} | {item.product.category}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-bold'>{item.totalSold} vendidos</p>
                <p className='text-muted-foreground text-sm'>
                  ${item.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {topProducts.length === 0 && (
            <div className='text-muted-foreground py-8 text-center'>
              No hay datos de ventas para el período seleccionado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
