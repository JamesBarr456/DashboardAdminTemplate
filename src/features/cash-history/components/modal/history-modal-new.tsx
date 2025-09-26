'use client';

import { CashRegister, Movement } from '@/store/pos-state';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';

type MovementType = 'income' | 'expense';

interface HistoryModalNewProps {
  type: MovementType;
  addMovement: (movement: Omit<Movement, 'id' | 'timestamp'>) => void;
  cashRegister: CashRegister;
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

// Schema de validación con Zod
const movementSchema = z.object({
  concept: z.string().min(1, 'El concepto es requerido'),
  amount: z
    .number({
      required_error: 'El monto es requerido',
      invalid_type_error: 'El monto debe ser un número'
    })
    .positive('El monto debe ser mayor a 0')
    .min(0.01, 'El monto debe ser mayor a 0'),
  description: z
    .string()
    .max(200, 'La descripción no puede exceder 200 caracteres')
    .optional()
    .or(z.literal(''))
});

type MovementFormData = z.infer<typeof movementSchema>;

function HistoryModalNew({
  type,
  addMovement,
  cashRegister
}: HistoryModalNewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cashier = cashRegister.cashier;

  const form = useForm<MovementFormData>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      concept: '',
      amount: undefined,
      description: ''
    }
  });

  const handleSubmit = (data: MovementFormData) => {
    try {
      addMovement({
        type,
        amount: data.amount,
        description: data.description || '',
        concept: data.concept,
        cashier
      });

      // Reset form
      form.reset();
      setIsOpen(false);

      toast.success(
        type === 'income'
          ? 'Ingreso registrado con éxito'
          : 'Egreso registrado con éxito'
      );
    } catch (error) {
      toast.error('Error al registrar el movimiento');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const concept = form.getValues('concept');
      if (concept) {
        form.handleSubmit(handleSubmit)();
      } else {
        toast.error('Selecciona un concepto antes de registrar el movimiento');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex w-full cursor-pointer items-center gap-2'
          disabled={!cashRegister.isOpen}
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='concept'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un concepto' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conceptsByType[type].map((concept) => (
                        <SelectItem key={concept} value={concept}>
                          {concept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === '' ? undefined : parseFloat(value)
                        );
                      }}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Descripción del movimiento...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              {type === 'income' ? 'Registrar Ingreso' : 'Registrar Egreso'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default HistoryModalNew;
