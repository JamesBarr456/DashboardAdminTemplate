'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Minus, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Movement } from '@/store/pos-state';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface Props {
  addMovement: (movement: Omit<Movement, 'id' | 'timestamp'>) => void;
  cashier: string;
}

function HistoryModalNew({ addMovement, cashier }: Props) {
  const [newMovement, setNewMovement] = useState({
    type: 'income' as 'income' | 'expense',
    amount: 0,
    description: ''
  });

  const handleAddMovement = () => {
    if (!newMovement.amount || newMovement.amount <= 0) return;

    addMovement({
      type: newMovement.type,
      amount: newMovement.amount,
      description: newMovement.description,
      cashier
    });

    // reset form
    setNewMovement({
      type: 'income',
      amount: 0,
      description: ''
    });
  };

  return (
    <div className='flex justify-end'>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Nuevo Movimiento</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Movimiento</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='flex justify-between gap-6'>
              <div>
                <label className='text-sm font-medium'>
                  Tipo de Movimiento
                </label>
                <Select
                  value={newMovement.type}
                  onValueChange={(value: 'income' | 'expense') =>
                    setNewMovement((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona un tipo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='income'>
                      <div className='flex items-center gap-2'>
                        <Plus className='h-4 w-4 text-green-500' />
                        Ingreso
                      </div>
                    </SelectItem>
                    <SelectItem value='expense'>
                      <div className='flex items-center gap-2'>
                        <Minus className='h-4 w-4 text-red-500' />
                        Egreso
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='text-sm font-medium'>Monto</label>
                <Input
                  type='number'
                  placeholder='0.00'
                  value={newMovement.amount}
                  onChange={(e) =>
                    setNewMovement((prev) => ({
                      ...prev,
                      amount: Number(e.target.value)
                    }))
                  }
                />
              </div>
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
              Registrar Movimiento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HistoryModalNew;
