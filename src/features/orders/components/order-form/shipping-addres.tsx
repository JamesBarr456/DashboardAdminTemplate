import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { OrderStatus, ShippingInformation } from '@/types/order-new';

import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { OrderUpdate } from '@/schemas/order-schema';

interface ShippingAddressProps {
  data: ShippingInformation;
  status: OrderStatus | undefined;
  control: Control<OrderUpdate>;
}

export const ShippingAddress = ({
  data,
  status,
  control
}: ShippingAddressProps) => {
  const isEditable =
    status === 'pending' && data.delivery_option === 'delivery';

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
            <FormField
              control={control}
              name='shipping_information.adress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditable}
                      placeholder='Dirección'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='shipping_information.locality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditable}
                      placeholder='Localidad'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='shipping_information.shipping_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de envío</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditable}
                      placeholder='Tipo de envío'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <p className='text-gray-600 italic'>Pickup en local</p>
        )}
      </CardContent>
    </Card>
  );
};
