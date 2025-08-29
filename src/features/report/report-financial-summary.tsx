import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  metrics: {
    totalSales: number;
    totalCash: number;
    totalTransfer: number;
    totalReturns: number;
    totalExpenses: number;
    netBalance: number;
  };
  label: string;
}

export default function FinancialSummary({ metrics, label }: Props) {
  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle>Resumen Financiero ({label})</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-3 gap-4 text-center'>
        <div>
          <p className='text-xl font-bold text-green-600'>
            ${metrics.totalSales}
          </p>
          <p className='text-muted-foreground text-sm'>Ingresos</p>
        </div>
        <div>
          <p className='text-xl font-bold text-red-600'>
            ${metrics.totalExpenses}
          </p>
          <p className='text-muted-foreground text-sm'>Gastos</p>
        </div>
        <div>
          <p className='text-xl font-bold text-blue-600'>
            ${metrics.netBalance}
          </p>
          <p className='text-muted-foreground text-sm'>Ganancias</p>
        </div>
      </CardContent>
    </Card>
  );
}
