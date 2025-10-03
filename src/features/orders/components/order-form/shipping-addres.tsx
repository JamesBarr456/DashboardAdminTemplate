import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Control, useWatch } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { OrderStatus, ShippingInformation } from '@/types/order-new';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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
  const delivery_option = useWatch({
    control,
    name: `shipping_information.delivery_option`,
    defaultValue: data.delivery_option ?? ''
  });

  const isEditable = status === 'in_process';

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MapPin className='h-5 w-5' />
          Dirección de Envío
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 text-sm'>
        {/* --- Opciones de entrega --- */}
        <FormField
          control={control}
          name='shipping_information.delivery_option'
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
                    <SelectItem value='delivery'>Envío a domicilio</SelectItem>
                    <SelectItem value='pickup'>Retiro en el local</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Si es envío a domicilio --- */}
        {delivery_option === 'delivery' && (
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

            {/* --- Select de tipo de envío --- */}
            <FormField
              control={control}
              name='shipping_information.shipping_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de envío</FormLabel>
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
                        <SelectValue placeholder='Seleccionar tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='express'>Express</SelectItem>
                        <SelectItem value='standard'>Estándar</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
