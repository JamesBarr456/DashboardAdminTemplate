'use client';

import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Receipt,
  TrendingUp
} from 'lucide-react';
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
  filteredSalesCount: number;
}

export default function SalesSummary({ filteredSalesCount, metrics }: Props) {
  const {
    netBalance,
    totalCash,
    totalExpenses,
    totalReturns,
    totalSales,
    totalTransfer
  } = metrics;
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Ventas</CardTitle>
          <Receipt className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${totalSales.toLocaleString()}
          </div>
          <p className='text-muted-foreground flex items-center text-xs'>
            <ArrowUpRight className='mr-1 h-3 w-3 text-green-500' />
            {filteredSalesCount} transacciones
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
            ${totalCash.toLocaleString()}
          </div>
          <p className='text-muted-foreground text-xs'>
            {totalSales > 0 ? ((totalCash / totalSales) * 100).toFixed(0) : 0}%
            del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tarjetas</CardTitle>
          <CreditCard className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${totalTransfer.toLocaleString()}
          </div>
          <p className='text-muted-foreground text-xs'>
            {totalSales > 0
              ? ((totalTransfer / totalSales) * 100).toFixed(0)
              : 0}
            % del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Balance Neto</CardTitle>
          <CreditCard className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ${totalTransfer.toLocaleString()}
          </div>
          <p className='text-muted-foreground text-xs'>{netBalance}</p>
        </CardContent>
      </Card>
    </div>
  );
}
