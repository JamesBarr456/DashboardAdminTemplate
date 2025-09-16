'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import { usePOSStore } from '@/store/pos-state';

export function CashRegisterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState('');
  const [error, setError] = useState('');
  const { cashRegister, openRegister, closeRegister } = usePOSStore();

  const validateAmount = (value: string): string => {
    if (!value.trim()) return 'El monto inicial es requerido';
    const amount = Number.parseFloat(value);
    if (isNaN(amount)) return 'Ingresa un monto válido';
    if (amount < 0) return 'El monto no puede ser negativo';
    return '';
  };

  const resetForm = () => {
    setInitialAmount('');
    setError('');
    setIsOpen(false);
  };

  const handleOpenRegister = () => {
    const validationError = validateAmount(initialAmount);
    if (validationError) {
      setError(validationError);
      return;
    }

    openRegister(Number(initialAmount), cashRegister.cashier);
    resetForm();
  };

  const handleCloseRegister = () => {
    closeRegister();
  };

  if (cashRegister.isOpen) {
    return (
      <Button
        variant='destructive'
        className='cursor-pointer'
        onClick={handleCloseRegister}
      >
        Cerrar Caja
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>
          Abrir Caja
        </Button>
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

        <div className='space-y-6 py-4'>
          <div className='space-y-3'>
            <Label htmlFor='amount' className='text-base font-medium'>
              Monto Inicial de Caja
            </Label>
            <div className='relative'>
              <DollarSign className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                id='amount'
                type='number'
                placeholder='0.00'
                value={initialAmount}
                onChange={(e) => {
                  setInitialAmount(e.target.value);
                  if (error) setError('');
                }}
                className={`h-12 pl-10 text-lg ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                min='0'
                step='0.01'
                autoFocus
              />
            </div>
            {error && (
              <p className='flex items-center gap-1 text-sm text-red-600 dark:text-red-400'>
                <span className='h-1 w-1 rounded-full bg-red-500'></span>
                {error}
              </p>
            )}
            <p className='text-muted-foreground text-xs'>
              Ingresa el monto en efectivo que tendrás disponible al inicio del
              día
            </p>
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={resetForm}
            className='flex-1 cursor-pointer'
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            onClick={handleOpenRegister}
            disabled={!initialAmount.trim() || !!error}
            className='flex-1 cursor-pointer'
          >
            <DollarSign className='mr-2 h-4 w-4' />
            Abrir Caja
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
