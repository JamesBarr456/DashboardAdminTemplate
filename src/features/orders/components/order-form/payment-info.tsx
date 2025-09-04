import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewOrder, OrderStatus } from '@/types/order-new';

import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { STATUS } from '@/constants/mocks/orders';

interface PaymentInfoProps {
  paymentMethod: NewOrder['payment_method'];
  status: OrderStatus;
  onUpdate?: (field: 'payment_method', value: string) => void;
}

export const PaymentInfo = ({
  paymentMethod,
  status,
  onUpdate
}: PaymentInfoProps) => {
  const isEditable = status === 'pending';

  const renderField = (
    label: string,
    value: string,
    field: 'payment_method'
  ) => (
    <div className='space-y-1'>
      <p className='text-sm text-gray-600'>{label}</p>
      <div className='flex items-center gap-2 font-medium'>
        {isEditable ? (
          <Input
            defaultValue={value}
            onChange={(e) => onUpdate?.(field, e.target.value)}
            className='h-8 w-full'
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );

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
        <div className='flex items-center justify-between'>
          {renderField('Método', paymentMethod, 'payment_method')}
        </div>
        <div className='flex items-center justify-between'>
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
