'use client';

import {
  CashRegisterOpening,
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

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export function CashRegisterModal() {
  const { cashRegister, openRegister, closeRegister } = usePOSStore();
  const [showCloseModal, setShowCloseModal] = useState(false);

  const form = useForm<CashRegisterOpening>({
    resolver: zodResolver(cashRegisterOpeningSchema),
    defaultValues: { initialAmount: 0 }
  });

  const handleSubmit = (values: CashRegisterOpening) => {
    openRegister(values.initialAmount, cashRegister.cashier);
    toast.success('Caja abierta con éxito');
    form.reset();
  };

  const confirmCloseRegister = () => {
    closeRegister();
    setShowCloseModal(false);
    toast.success('La caja fue cerrada con éxito');
  };

  if (cashRegister.isOpen) {
    return (
      <>
        <AlertModal
          isOpen={showCloseModal}
          onClose={() => setShowCloseModal(false)}
          onConfirm={confirmCloseRegister}
          title='Cerrar Caja'
          description='¿Estás seguro de que deseas cerrar la caja?'
          confirmText='Sí, cerrar'
          cancelText='Cancelar'
        />
        <Button variant='destructive' onClick={() => setShowCloseModal(true)}>
          Cerrar Caja
        </Button>
      </>
    );
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <div className='space-y-6 py-4'>
              <FormField
                control={form.control}
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
                onClick={() => form.reset()}
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
