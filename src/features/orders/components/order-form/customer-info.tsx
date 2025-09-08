'use client';

import { AlertTriangle, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerOrder, OrderStatus } from '@/types/order-new';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { OrderUpdate } from '@/schemas/order-schema';

interface CustomerInfoProps {
  order: CustomerOrder;
  status: OrderStatus | undefined;
  control: Control<OrderUpdate>;
}

export const CustomerInfo = ({ order, status, control }: CustomerInfoProps) => {
  const { snapshot, stats } = order;
  const isEditable = status === 'pending';

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Información del Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Avatar */}
        <div className='flex justify-center'>
          <Avatar className='h-24 w-24'>
            <AvatarImage src='' alt='@customer' />
            <AvatarFallback>
              {`${snapshot.firstName[0]}${snapshot.lastName[0]}`}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Nombre */}
        <FormField
          control={control}
          name='snapshot.firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditable} placeholder='Nombre' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Apellido */}
        <FormField
          control={control}
          name='snapshot.lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEditable}
                  placeholder='Apellido'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={control}
          name='snapshot.email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEditable}
                  placeholder='Email'
                  type='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teléfono */}
        <div className='flex gap-2'>
          <FormField
            control={control}
            name='snapshot.phone.areaCode'
            render={({ field }) => (
              <FormItem className='w-1/3'>
                <FormLabel>Cod. Área</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditable} placeholder='11' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='snapshot.phone.number'
            render={({ field }) => (
              <FormItem className='w-2/3'>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isEditable}
                    placeholder='12345678'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* DNI */}
        <FormField
          control={control}
          name='snapshot.dni'
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditable} placeholder='DNI' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Risk Alert */}
        {stats.cancelledOrders > 0 || stats.rejectedOrders > 0 ? (
          <Card className='border-yellow-200 bg-yellow-50'>
            <CardHeader>
              <CardTitle className='flex items-center justify-center gap-2 text-yellow-800'>
                <AlertTriangle className='h-5 w-5' />
                Historial de Riesgo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-center font-medium text-yellow-800'>
                Este cliente tiene {stats.cancelledOrders} órdenes canceladas y{' '}
                {stats.rejectedOrders} rechazadas.
              </p>
            </CardContent>
          </Card>
        ) : null}
      </CardContent>
    </Card>
  );
};
