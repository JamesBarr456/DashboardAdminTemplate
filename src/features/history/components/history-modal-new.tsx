'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { MinusCircle, PlusCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';

type MovementType = 'income' | 'expense';

interface HistoryModalNewProps {
  type: MovementType;
}
const conceptsByType: Record<MovementType, string[]> = {
  income: [
    'Venta mostrador',
    'Transferencia',
    'MercadoPago',
    'Devolución cliente',
    'Otros'
  ],
  expense: [
    'Proveedor',
    'Proveedor Hugo',
    'Ale',
    'Sueldos',
    'Pago de servicios',
    'Otros'
  ]
};
function HistoryModalNew({ type }: HistoryModalNewProps) {
  const { addMovement, cashRegister } = usePOSStore();

  const [newMovement, setNewMovement] = useState({
    concept: '',
    amount: '',
    description: ''
  });
  const cashier = cashRegister.cashier;
  const handleAddMovement = () => {
    const amountNumber = Number(newMovement.amount);
    if (!amountNumber || amountNumber <= 0) return;

    addMovement({
      type,
      amount: amountNumber,
      description: newMovement.description,
      concept: newMovement.concept,
      cashier
    });

    // reset form
    setNewMovement({
      amount: '',
      description: '',
      concept: ''
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='flex w-full cursor-pointer items-center gap-2'
          variant={type === 'income' ? 'default' : 'destructive'}
        >
          {type === 'income' ? (
            <>
              <PlusCircle className='h-5 w-5' />
              Ingreso de Dinero
            </>
          ) : (
            <>
              <MinusCircle className='h-5 w-5' />
              Egreso de Dinero
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'income' ? 'Registrar Ingreso' : 'Registrar Egreso'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium'>Concepto</label>
            <Select
              value={newMovement.concept}
              onValueChange={(value) =>
                setNewMovement((prev) => ({ ...prev, concept: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecciona un concepto' />
              </SelectTrigger>
              <SelectContent>
                {conceptsByType[type].map((concept) => (
                  <SelectItem key={concept} value={concept}>
                    {concept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className='text-sm font-medium'>Monto</Label>
            <Input
              type='number'
              placeholder='0.00'
              value={newMovement.amount}
              onChange={(e) =>
                setNewMovement((prev) => ({
                  ...prev,
                  amount: e.target.value
                }))
              }
            />
          </div>
          <div>
            <label className='text-sm font-medium'>Descripción</label>
            <Textarea
              placeholder='Descripción del movimiento...'
              value={newMovement.description}
              onChange={(e) =>
                setNewMovement((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
            />
          </div>
          <Button onClick={handleAddMovement} className='w-full'>
            {type === 'income' ? 'Registrar Ingreso' : 'Registrar Egreso'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HistoryModalNew;
