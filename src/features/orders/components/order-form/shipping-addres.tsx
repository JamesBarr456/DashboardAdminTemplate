import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderStatus, ShippingInformation } from '@/types/order-new';

import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import React from 'react';

interface ShippingAddressProps {
  data: ShippingInformation;
  status: OrderStatus;
  onUpdate?: (field: keyof ShippingInformation, value: string) => void;
}

export const ShippingAddress = ({
  data,
  status,
  onUpdate
}: ShippingAddressProps) => {
  const isEditable =
    status === 'pending' && data.delivery_option === 'delivery';

  const renderField = (
    label: string,
    value: string | undefined,
    field: keyof ShippingInformation,
    icon?: React.ReactNode
  ) => {
    return (
      <div className='space-y-1'>
        <p className='text-sm text-gray-600'>{label}</p>
        <div className='flex items-center gap-2 font-medium'>
          {icon}
          {isEditable ? (
            <Input
              defaultValue={value}
              onChange={(e) => onUpdate?.(field, e.target.value)}
              className='h-8 w-full'
            />
          ) : (
            <span>{value || '-'}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MapPin className='h-5 w-5' />
          Dirección de Envío
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 text-sm'>
        {data.delivery_option === 'delivery' ? (
          <>
            {renderField('Dirección', data.adress, 'adress')}
            {renderField('Localidad', data.locality, 'locality')}
            {renderField('Tipo de envío', data.shipping_type, 'shipping_type')}
          </>
        ) : (
          <p className='text-gray-600 italic'>Pickup en local</p>
        )}
      </CardContent>
    </Card>
  );
};
