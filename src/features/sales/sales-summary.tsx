'use client';
import { useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign, QrCode } from 'lucide-react';
import { SaleItem } from '@/store/pos-state';

interface Props {
  currentSale: SaleItem[];
  completeSale: (
    paymentMethod: 'cash' | 'card' | 'qr',
    discount?: number
  ) => void;
}

export default function SalesSummary({ currentSale, completeSale }: Props) {
  const [discount, setDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'cash' | 'card' | 'qr'
  >('cash');

  // subtotal ahora es solo la suma de los subtotales de cada SaleItem
  const subtotal = useMemo(() => {
    return currentSale.reduce((sum, item) => sum + item.subtotal, 0);
  }, [currentSale]);

  const total = subtotal - discount;
  const tax = total * 0.21;

  const handleFinalizeSale = () => {
    completeSale(selectedPaymentMethod, discount);
    setDiscount(0);
    setSelectedPaymentMethod('cash');
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

          <div className='flex items-center gap-2'>
            <span>Descuento:</span>
            <Input
              type='number'
              placeholder='0'
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className='h-8 w-20'
            />
          </div>

          <div className='flex justify-between'>
            <span>IVA (21%):</span>
            <span>${tax.toLocaleString()}</span>
          </div>

          <Separator />

          <div className='flex justify-between text-lg font-bold'>
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Método de Pago */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Método de Pago:</label>
          <div className='grid grid-cols-3 gap-2'>
            <Button
              variant={selectedPaymentMethod === 'cash' ? 'default' : 'outline'}
              onClick={() => setSelectedPaymentMethod('cash')}
              className='text-xs'
            >
              <DollarSign className='mr-1 h-4 w-4' />
              Efectivo
            </Button>
            <Button
              variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
              onClick={() => setSelectedPaymentMethod('card')}
              className='text-xs'
            >
              <CreditCard className='mr-1 h-4 w-4' />
              Tarjeta
            </Button>
            <Button
              variant={selectedPaymentMethod === 'qr' ? 'default' : 'outline'}
              onClick={() => setSelectedPaymentMethod('qr')}
              className='text-xs'
            >
              <QrCode className='mr-1 h-4 w-4' />
              QR
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
