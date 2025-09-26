'use client';
import { useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign } from 'lucide-react';
import { SaleItem } from '@/store/pos-state';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/format';
import { translatePaymentMethod } from '@/lib/translation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SalesTicketPreview } from '../ticket/sales-ticket-preview';

interface Props {
  currentSale: SaleItem[];
  completeSale: (items: SaleItem[], paymentMethod: 'cash' | 'transfer') => void;
}

export default function SalesSummary({ currentSale, completeSale }: Props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'cash' | 'transfer'
  >('cash');
  const [showTicket, setShowTicket] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const subtotal = useMemo(() => {
    return currentSale.reduce((sum, item) => sum + item.subtotal, 0);
  }, [currentSale]);

  const baseTotal = subtotal;

  const finalTotal =
    selectedPaymentMethod === 'transfer' ? baseTotal * 1.05 : baseTotal;

  const handlePreviewTicket = () => {
    if (currentSale.length === 0) return;
    const newTicketNumber = `T${Date.now().toString().slice(-6)}`;
    setTicketNumber(newTicketNumber);
    setShowTicket(true);
  };

  const handleConfirmSale = () => {
    completeSale(currentSale, selectedPaymentMethod);
    setSelectedPaymentMethod('cash');
    setShowTicket(false);

    toast('¡Venta realizada!', {
      description: `La venta se ha completado correctamente con pago en ${translatePaymentMethod(selectedPaymentMethod)}.`
    });
  };

  return (
    <>
      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className='max-w-md'>
          <SalesTicketPreview
            ticketNumber={ticketNumber}
            items={currentSale.map((item) => ({
              name: item.product.name,
              price: item.unit_price,
              quantity: item.quantity
            }))}
            total={finalTotal}
          />
          <div className='mt-4 flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setShowTicket(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmSale}>
              Confirmar y Finalizar Venta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Venta</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Método de pago */}
          <div className='space-y-4'>
            <h3 className='font-medium'>Método de Pago</h3>
            <div className='flex gap-4'>
              <Button
                variant={
                  selectedPaymentMethod === 'cash' ? 'default' : 'outline'
                }
                className='flex-1'
                onClick={() => setSelectedPaymentMethod('cash')}
              >
                <DollarSign className='mr-2 h-4 w-4' />
                Efectivo
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'transfer' ? 'default' : 'outline'
                }
                className='flex-1'
                onClick={() => setSelectedPaymentMethod('transfer')}
              >
                <CreditCard className='mr-2 h-4 w-4' />
                Transferencia
              </Button>
            </div>
          </div>

          <Separator />

          {/* Totales */}
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {selectedPaymentMethod === 'transfer' && (
              <div className='text-muted-foreground flex justify-between'>
                <span>Cargo por transferencia (5%):</span>
                <span>{formatPrice(baseTotal * 0.05)}</span>
              </div>
            )}
            <div className='flex justify-between text-lg font-bold'>
              <span>Total:</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <Button
            className='w-full'
            size='lg'
            onClick={handlePreviewTicket}
            disabled={currentSale.length === 0}
          >
            Finalizar Venta
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
