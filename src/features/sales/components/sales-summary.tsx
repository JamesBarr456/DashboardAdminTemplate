'use client';
import { useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign } from 'lucide-react';
import { SaleItem } from '@/store/pos-state';
import { toast } from 'sonner';

interface Props {
  currentSale: SaleItem[];
  completeSale: (items: SaleItem[], paymentMethod: 'cash' | 'transfer') => void;
}

export default function SalesSummary({ currentSale, completeSale }: Props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'cash' | 'transfer'
  >('cash');

  const subtotal = useMemo(() => {
    return currentSale.reduce((sum, item) => sum + item.subtotal, 0);
  }, [currentSale]);

  const baseTotal = subtotal;

  const finalTotal =
    selectedPaymentMethod === 'transfer' ? baseTotal * 1.05 : baseTotal;

  const handleFinalizeSale = () => {
    if (currentSale.length === 0) return;
    completeSale(currentSale, selectedPaymentMethod);
    setSelectedPaymentMethod('cash');

    toast('¡Venta realizada!', {
      description: `La venta se ha completado correctamente con pago en ${selectedPaymentMethod === 'cash' ? 'efectivo' : 'transferencia'}.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          {selectedPaymentMethod === 'transfer' && (
            <div className='flex justify-between font-medium text-red-600'>
              <span>Recargo (5% por transferencia):</span>
              <span>${(baseTotal * 0.05).toLocaleString()}</span>
            </div>
          )}

          <Separator />

          <div className='flex justify-between text-lg font-bold'>
            <span>Total:</span>
            <span>${finalTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Método de Pago */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Método de Pago:</label>
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant={selectedPaymentMethod === 'cash' ? 'default' : 'outline'}
              onClick={() => setSelectedPaymentMethod('cash')}
              className='text-xs'
            >
              <DollarSign className='mr-1 h-4 w-4' />
              Efectivo
            </Button>
            <Button
              variant={
                selectedPaymentMethod === 'transfer' ? 'default' : 'outline'
              }
              onClick={() => setSelectedPaymentMethod('transfer')}
              className='text-xs'
            >
              <CreditCard className='mr-1 h-4 w-4' />
              Transferencia
            </Button>
          </div>
        </div>

        <Button
          onClick={handleFinalizeSale}
          className='w-full'
          disabled={currentSale.length === 0}
        >
          Finalizar Venta
        </Button>
      </CardContent>
    </Card>
  );
}
