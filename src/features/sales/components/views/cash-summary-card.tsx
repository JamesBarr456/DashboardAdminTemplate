import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Wallet } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export interface CashierStats {
  nombre: string;
  ventasTurno: number;
  aperturaCaja: string;
  pedidosRetirados: number;
  totalDia: number;
  efectivoInicial: number;
  ventasEfectivo: number;
  totalEnCaja: number;
}
interface CashSummaryCardProps {
  stats: CashierStats;
}

const CashSummaryCard: React.FC<CashSummaryCardProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2'>
          <Wallet className='h-5 w-5' />
          Resumen de Caja
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='space-y-3 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground font-medium'>
              Efectivo inicial:
            </span>
            <span className='font-bold'>
              {formatPrice(stats.efectivoInicial)}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground font-medium'>
              Ventas efectivo:
            </span>
            <span className='font-bold'>
              +{formatPrice(stats.ventasEfectivo)}
            </span>
          </div>
          <Separator />
          <div className='flex items-center justify-between pt-1'>
            <span className='text-base font-semibold'>Total en caja:</span>
            <span className='text-lg font-bold'>
              {formatPrice(stats.totalEnCaja)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashSummaryCard;
