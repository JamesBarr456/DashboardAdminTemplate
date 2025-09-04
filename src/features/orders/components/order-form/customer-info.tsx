'use client';

import { AlertTriangle, Mail, Phone, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerOrder, OrderStatus } from '@/types/order-new';

import { Input } from '@/components/ui/input';

interface CustomerInfoProps {
  order: CustomerOrder;
  status: OrderStatus;
  onUpdate?: (field: keyof CustomerOrder['snapshot'], value: string) => void;
}

export const CustomerInfo = ({
  order,
  status,
  onUpdate
}: CustomerInfoProps) => {
  const { snapshot, stats } = order;
  const isEditable = status === 'pending';

  const renderField = (
    label: string,
    value: string,
    field: keyof CustomerOrder['snapshot'],
    icon?: React.ReactNode
  ) => {
    return (
      <div>
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
            <span>{value}</span>
          )}
        </div>
      </div>
    );
  };

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

        {renderField(
          'Nombre',
          `${snapshot.firstName} ${snapshot.lastName}`,
          'firstName'
        )}
        {renderField(
          'Email',
          snapshot.email,
          'email',
          <Mail className='h-4 w-4 text-gray-400' />
        )}
        {renderField(
          'Teléfono',
          `+${snapshot.phone.areaCode} ${snapshot.phone.number}`,
          'phone'
        )}
        {renderField(
          'DNI',
          snapshot.dni,
          'dni',
          <Phone className='h-4 w-4 text-gray-400' />
        )}

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
