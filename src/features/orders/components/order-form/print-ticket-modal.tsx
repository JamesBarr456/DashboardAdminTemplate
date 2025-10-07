'use client';

import { useRef } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer, CheckCircle2 } from 'lucide-react';
import { NewOrder as Order } from '@/types/order-new';

interface CompleteOrderModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (orderId: string, shouldPrint: boolean) => void;
}

export function CompleteOrderModal({
  order,
  open,
  onOpenChange,
  onComplete
}: CompleteOrderModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const handlePrint = () => {
    if (cardRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Tarjeta de Paquete - ${order._id}</title>
              <style>
                @page {
                  size: 8cm 8cm;
                  margin: 0;
                }
                body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                }
                .card {
                  width: 8cm;
                  height: 8cm;
                  padding: 0.5cm;
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                }
                .header {
                  text-align: center;
                  border-bottom: 2px solid #000;
                  padding-bottom: 0.3cm;
                  margin-bottom: 0.3cm;
                }
                .store-name {
                  font-size: 20pt;
                  font-weight: bold;
                  margin: 0;
                }
                .order-id {
                  font-size: 10pt;
                  margin: 0.1cm 0 0 0;
                }
                .section {
                  margin-bottom: 0.3cm;
                }
                .label {
                  font-size: 8pt;
                  font-weight: bold;
                  margin-bottom: 0.1cm;
                }
                .value {
                  font-size: 10pt;
                  margin-bottom: 0.2cm;
                }
                .delivery-badge {
                  display: inline-block;
                  padding: 0.1cm 0.3cm;
                  background: #000;
                  color: #fff;
                  font-size: 9pt;
                  font-weight: bold;
                  border-radius: 0.2cm;
                }
                .footer {
                  border-top: 1px solid #000;
                  padding-top: 0.2cm;
                  font-size: 8pt;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              ${cardRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
    onComplete(order._id, true);
    onOpenChange(false);
  };

  const handleContinue = () => {
    onComplete(order._id, false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <CheckCircle2 className='h-5 w-5' />
            Completar Pedido
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <p className='text-muted-foreground text-sm'>
            Vista previa de la tarjeta de paquete. Puedes imprimirla o continuar
            sin imprimir.
          </p>

          {/* Package Card Preview */}
          <div className='flex justify-center'>
            <div
              ref={cardRef}
              className='print-card card border-border h-[8cm] w-[8cm] rounded-lg border-2 bg-white p-4 text-black'
              style={{ fontSize: '10px' }}
            >
              <div className='header mb-2 border-b-2 border-black pb-2 text-center'>
                {/* Tienda */}
                <h2 className='store-name m-0 text-xl font-bold'>
                  PILCHERÍA YOSE
                </h2>
                <p className='order-id mt-1 mb-0 text-xs'>#{order._id}</p>
              </div>

              {/* Encabezado sección según entrega */}
              <div className='mb-1 text-center'>
                <span className='inline-block rounded bg-black px-2 py-1 text-[10px] font-extrabold tracking-wide text-white uppercase'>
                  {order.shipping_information.delivery_option === 'pickup'
                    ? 'Para Retirar'
                    : 'Para Envío'}
                </span>
              </div>

              {/* Contenido en bullets según opción */}
              <div className='mt-1'>
                <ul className='m-0 list-disc pl-4 text-[11px]'>
                  {/* Nombre y apellido */}
                  <li className='mb-1'>
                    Cliente: {order.customer.snapshot.firstName}{' '}
                    {order.customer.snapshot.lastName}
                  </li>

                  {/* Localidad */}
                  <li className='mb-1'>
                    Localidad: {order.shipping_information.locality || '-'}
                  </li>

                  {/* Monto */}
                  <li className='mb-1'>
                    Monto: ${order.summary.grand_total.toLocaleString('es-AR')}
                  </li>

                  {/* Pago */}
                  <li className='mb-1'>
                    {order.payment_method === 'cash'
                      ? 'Efectivo: PAGAR'
                      : 'Transferencia: PAGADO'}
                  </li>

                  {/* Campos específicos */}
                  {order.shipping_information.delivery_option === 'pickup' ? (
                    <>
                      <li className='mb-1'>RETIRA</li>
                    </>
                  ) : (
                    <>
                      <li className='mb-1'>
                        Nro. de contacto: (
                        {order.customer.snapshot.phone.areaCode}){' '}
                        {order.customer.snapshot.phone.number}
                      </li>
                      <li className='mb-1'>Colocar &quot;ENVÍO&quot;</li>
                      <li className='mb-1'>
                        Nombre de la empresa de envío: __________________
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className='footer mt-auto border-t border-black pt-2 text-center text-[10px]'>
                Fecha: {new Date().toLocaleDateString('es-AR')}
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={handleContinue}>
              Continuar sin Imprimir
            </Button>
            <Button onClick={handlePrint}>
              <Printer className='mr-2 h-4 w-4' />
              Imprimir Tarjeta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
