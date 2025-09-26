'use client';

import {
  CashRegisterClosing,
  CashRegisterOpening,
  cashRegisterClosingSchema,
  cashRegisterOpeningSchema
} from '@/schemas/sales-schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { formatPrice } from '@/lib/format';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export function CashRegisterModal() {
  const { cashRegister, openRegister, closeRegister } = usePOSStore();
  const [showCloseModal, setShowCloseModal] = useState(false);

  const openingForm = useForm<CashRegisterOpening>({
    resolver: zodResolver(cashRegisterOpeningSchema),
    defaultValues: { initialAmount: 0 }
  });

  const closingForm = useForm<CashRegisterClosing>({
    resolver: zodResolver(cashRegisterClosingSchema),
    defaultValues: { observations: '' }
  });

  const handleOpeningSubmit = (values: CashRegisterOpening) => {
    openRegister(values.initialAmount, cashRegister.cashier);
    toast.success('Caja abierta con éxito');
    openingForm.reset();
  };

  const handleClosingSubmit = (values: CashRegisterClosing) => {
    closeRegister();
    setShowCloseModal(false);
    toast.success('La caja fue cerrada con éxito', {
      description: values.observations
        ? `Observación registrada: ${values.observations}`
        : undefined
    });
    closingForm.reset();
  };

  if (cashRegister.isOpen) {
    return (
      <>
        <Dialog open={showCloseModal} onOpenChange={setShowCloseModal}>
          <DialogTrigger asChild>
            <Button variant='destructive'>Cerrar Caja</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cerrar Caja</DialogTitle>
              <DialogDescription>
                Revise los detalles del cierre de caja antes de confirmar
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4 py-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Detalles del Cierre</h4>
                <div className='space-y-2 rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Fecha de Apertura:
                    </span>
                    <span>
                      {cashRegister.openedAt
                        ? format(cashRegister.openedAt, 'dd/MM/yyyy HH:mm')
                        : 'N/A'}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>Cajero/a:</span>
                    <span>{cashRegister.cashier}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Monto Inicial:
                    </span>
                    <span>{formatPrice(cashRegister.initialAmount)}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Ventas en Efectivo:
                    </span>
                    <span>
                      {formatPrice(
                        cashRegister.cashAmount - cashRegister.initialAmount
                      )}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Ventas por Transferencia:
                    </span>
                    <span>{formatPrice(cashRegister.transferAmount)}</span>
                  </div>
                  <div className='flex items-center justify-between text-green-600'>
                    <span>Monto Total en Caja (Efectivo):</span>
                    <span className='font-bold'>
                      {formatPrice(cashRegister.cashAmount)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Recaudación Total:
                    </span>

                    <span className='font-semibold'>
                      {formatPrice(
                        cashRegister.currentAmount - cashRegister.initialAmount
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <Form {...closingForm}>
                <form
                  onSubmit={closingForm.handleSubmit(handleClosingSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={closingForm.control}
                    name='observations'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observaciones (Opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Agregar observaciones sobre el cierre...'
                            className='h-20 resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className='gap-2 pt-4'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setShowCloseModal(false)}
                      className='flex-1'
                    >
                      Cancelar
                    </Button>
                    <Button
                      type='submit'
                      variant='destructive'
                      className='flex-1'
                    >
                      Confirmar Cierre
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) openingForm.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>Abrir Caja</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black'>
            <DollarSign className='h-6 w-6 text-white' />
          </div>
          <DialogTitle className='text-xl'>
            Apertura de Caja Registradora
          </DialogTitle>
          <DialogDescription className='text-base'>
            Ingresa el monto inicial con el que comenzarás las operaciones del
            día. Este monto será registrado como el fondo de caja.
          </DialogDescription>
        </DialogHeader>

        <Form {...openingForm}>
          <form
            onSubmit={openingForm.handleSubmit(handleOpeningSubmit)}
            className='space-y-6'
          >
            <div className='space-y-6 py-4'>
              <FormField
                control={openingForm.control}
                name='initialAmount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-medium'>
                      Monto Inicial de Caja
                    </FormLabel>
                    <div className='relative'>
                      <DollarSign className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='0.00'
                          {...field}
                          className='h-12 pl-10 text-lg'
                          min='0'
                          step='0.01'
                          autoFocus
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                    <p className='text-muted-foreground text-xs'>
                      Ingresa el monto en efectivo que tendrás disponible al
                      inicio del día
                    </p>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => openingForm.reset()}
                className='flex-1'
              >
                Cancelar
              </Button>
              <Button type='submit' className='flex-1'>
                <DollarSign className='mr-2 h-4 w-4' />
                Inicio de Turno
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
