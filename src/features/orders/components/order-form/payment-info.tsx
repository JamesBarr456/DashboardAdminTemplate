import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { Control } from 'react-hook-form';
import { CreditCard } from 'lucide-react';
import { OrderStatus } from '@/types/order-new';
import { OrderUpdate } from '@/schemas/order-schema';
import { STATUS } from '@/constants/mocks/orders';

interface PaymentInfoProps {
  paymentMethod: string;
  status: OrderStatus | undefined;
  control: Control<OrderUpdate>;
}

export const PaymentInfo = ({ status, control }: PaymentInfoProps) => {
  const isEditable = status === 'pending';
  const currentStatus = STATUS.find((s) => s.value === status);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CreditCard className='h-5 w-5' />
          Información de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 text-sm'>
        {/* --- Opciones de entrega --- */}
        <FormField
          control={control}
          name='payment_method'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opción de entrega</FormLabel>
              <FormControl>
                <Select
                  disabled={!isEditable}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={
                      !isEditable ? 'w-full cursor-not-allowed' : 'w-full'
                    }
                  >
                    <SelectValue placeholder='Seleccionar opción' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='transfer'>
                      Pago por transferencia
                    </SelectItem>
                    <SelectItem value='cash'>Pago en efectivo</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-2 flex items-center justify-between'>
          <span>Estado:</span>
          {currentStatus ? (
            <Badge
              className={`${currentStatus.color} border`}
              variant='outline'
            >
              {currentStatus.label}
            </Badge>
          ) : (
            <span>-</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
