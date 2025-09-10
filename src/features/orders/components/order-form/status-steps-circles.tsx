import { Check, X } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Control } from 'react-hook-form';
import React from 'react';
import { STATUS } from '@/constants/mocks/orders';
import { cn } from '@/lib/utils';

export interface StatusOption {
  label: string;
  value: string;
  number: number;
}

interface StatusCirclesProps {
  control: Control<any>;
  name?: string;
  label?: string;
  className?: string;
}

export const StatusCircles: React.FC<StatusCirclesProps> = ({
  control,
  name = 'status',
  label = 'Estado del pedido',
  className
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('space-y-8', className)}>
          <FormLabel className='text-base font-medium text-gray-900'>
            {label}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              {/* Línea de fondo - solo entre los primeros 4 círculos */}
              <div
                className='absolute top-5 left-5 h-0.5 bg-gray-200'
                style={{ width: 'calc(75% - 1.25rem)' }}
              />

              {/* Línea de progreso - solo si no está cancelado */}
              {field.value !== 'canceled' && (
                <div
                  className='absolute top-5 left-5 h-0.5 bg-gray-800 transition-all duration-300 ease-out'
                  style={{
                    width: `calc(${(STATUS.slice(0, 4).findIndex((s) => s.value === field.value) / 3) * 75}% - 1.25rem)`
                  }}
                />
              )}

              {/* Círculos */}
              <div className='relative flex items-start justify-between'>
                {STATUS.map((status, index) => {
                  const isCanceled = field.value === 'canceled';
                  const isSelected =
                    !isCanceled && field.value === status.value;
                  const currentIndex = STATUS.findIndex(
                    (s) => s.value === field.value
                  );
                  const isCompleted =
                    !isCanceled && currentIndex > index && index < 4;
                  const isCircleCanceled =
                    isCanceled && status.value === 'canceled';
                  return (
                    <div
                      key={status.value}
                      className='flex flex-col items-center space-y-3'
                    >
                      {/* Botón circular */}
                      <button
                        type='button'
                        onClick={() => field.onChange(status.value)}
                        className={cn(
                          'h-10 w-10 cursor-pointer rounded-full border-2 transition-all duration-200 ease-out',
                          'hover:scale-105 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none',
                          'flex items-center justify-center text-sm font-semibold',
                          // Estado cancelado
                          isCircleCanceled && [
                            'border-red-600 bg-red-600 text-white hover:border-3'
                          ],
                          // Estados completados (solo para pending-delivered)
                          isCompleted && [
                            'border-gray-800 bg-gray-800 text-white'
                          ],
                          // Estado seleccionado (si no es cancelado)
                          isSelected && [
                            'border-gray-800 bg-gray-800 text-white'
                          ],
                          // Estados neutros
                          !isSelected &&
                            !isCompleted &&
                            !isCircleCanceled && [
                              'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                            ]
                        )}
                      >
                        {isCompleted ? (
                          <Check className='h-4 w-4' strokeWidth={2.5} />
                        ) : isCircleCanceled ? (
                          <X className='h-4 w-4' strokeWidth={2.5} />
                        ) : (
                          status.number
                        )}
                      </button>

                      {/* Label */}
                      <div className='text-center'>
                        <div
                          className={cn(
                            'text-sm font-medium transition-colors duration-200',
                            (isSelected || isCompleted) && 'text-gray-800',
                            !isSelected &&
                              !isCompleted &&
                              !isCanceled &&
                              'text-gray-500'
                          )}
                        >
                          {status.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
