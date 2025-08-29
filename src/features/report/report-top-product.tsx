import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  products: { product: any; totalSold: number; revenue: number }[];
  label: string;
}
export default function TopProducts({ label, products }: Props) {
  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle>Productos más Vendidos ({label})</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {products.map((product, index) => (
            <li
              key={index}
              className='flex items-center justify-between rounded-md border p-2'
            >
              <span className='font-medium'>{product.name}</span>
              <div className='flex items-center gap-4'>
                <span className='text-muted-foreground text-sm'>
                  Ventas: {product.sales}
                </span>
                <span className='font-semibold'>
                  ${product.revenue.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
