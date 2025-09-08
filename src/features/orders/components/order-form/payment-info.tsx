import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Badge } from '@/components/ui/badge';
import { Control } from 'react-hook-form';
import { CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
        <FormField
          control={control}
          name='payment_method'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEditable}
                  placeholder='Método de pago'
                />
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
