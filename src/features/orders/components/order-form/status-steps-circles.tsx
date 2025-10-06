import { Check, X } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { AlertModal } from '@/components/modal/alert-modal';
import { Control } from 'react-hook-form';
import React from 'react';
import { STATUS_OPTIONS } from '../order-tables/options';
import { cn } from '@/lib/utils';

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
  // Estado para confirmación de cambio de status
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [targetStatus, setTargetStatus] = React.useState<string | null>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isTerminalReject = field.value === 'rejected';
        const isTerminalCancel = field.value === 'canceled';
        const isTerminal = isTerminalReject || isTerminalCancel;
        const isPendingLock = field.value === 'pending';
        const isLocked = isTerminal || isPendingLock;

        const normalizedValue = isTerminalReject ? 'canceled' : field.value;
        const baseOptions = STATUS_OPTIONS;
        const currentIndex = baseOptions.findIndex(
          (s) => s.value === normalizedValue
        );
        const progressIndex = baseOptions
          .slice(0, 4)
          .findIndex((s) => s.value === normalizedValue);

        const targetLabel = targetStatus
          ? baseOptions.find((s) => s.value === targetStatus)?.label || ''
          : '';

        const handleConfirm = () => {
          if (targetStatus) {
            field.onChange(targetStatus);
          }
          setConfirmOpen(false);
          setTargetStatus(null);
        };

        const handleCancel = () => {
          setConfirmOpen(false);
          setTargetStatus(null);
        };

        return (
          <FormItem className={cn('space-y-8', className)}>
            {/* Modal de confirmación de cambio de estado */}
            <AlertModal
              isOpen={confirmOpen}
              onClose={handleCancel}
              onConfirm={handleConfirm}
              loading={false}
              title='Confirmar cambio de estado'
              description={
                targetLabel
                  ? `¿Querés cambiar el estado del pedido a "${targetLabel}"?`
                  : '¿Querés confirmar el cambio de estado?'
              }
              confirmText='Confirmar'
              cancelText='Cancelar'
            />

            <FormLabel className='text-base font-medium'>{label}</FormLabel>
            <FormControl>
              <div className='relative'>
                {/* Línea de fondo - solo entre los primeros 4 círculos */}
                <div
                  className='absolute top-5 left-5 h-0.5 bg-gray-200'
                  style={{ width: 'calc(75% - 1.25rem)' }}
                />

                {/* Línea de progreso - solo si no está en estado terminal y no es el primer paso */}
                {normalizedValue !== 'canceled' && progressIndex > 0 && (
                  <div
                    className='absolute top-5 left-5 h-0.5 bg-gray-800 transition-all duration-300 ease-out'
                    style={{
                      width: `calc(${(progressIndex / 3) * 75}% - 1.25rem)`
                    }}
                  />
                )}

                {/* Círculos */}
                <div className='relative flex items-start justify-between'>
                  {baseOptions.map((status, index) => {
                    const isTerminalCircle =
                      status.value === 'canceled' && isTerminal;

                    const isSelected =
                      !isTerminalCircle && normalizedValue === status.value;
                    const isCompleted =
                      !isTerminalCircle && currentIndex > index && index < 4;

                    const isPast = !isTerminalCircle && index < currentIndex; // estados anteriores

                    const handleClick = () => {
                      if (!isLocked && !isPast) {
                        setTargetStatus(status.value);
                        setConfirmOpen(true);
                      }
                    };

                    const isDisabledCircle = isLocked || isPast;

                    return (
                      <div
                        key={status.value}
                        className='flex flex-col items-center space-y-3'
                      >
                        {/* Botón circular */}
                        <button
                          type='button'
                          onClick={handleClick}
                          aria-disabled={isDisabledCircle}
                          className={cn(
                            'h-10 w-10 rounded-full border-2 transition-all duration-200 ease-out',
                            isDisabledCircle
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer hover:scale-105 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none',
                            'flex items-center justify-center text-sm font-semibold',
                            // Estado terminal (cancelado o rechazado)
                            isTerminalCircle && [
                              'border-red-600 bg-red-600 text-white hover:border-3'
                            ],
                            // Estados completados (solo para pending-delivered)
                            isCompleted && [
                              'border-gray-800 bg-gray-800 text-white'
                            ],
                            // Estado seleccionado (si no es terminal)
                            isSelected && [
                              'border-gray-800 bg-gray-800 text-white'
                            ],
                            // Estados neutros
                            !isSelected &&
                              !isCompleted &&
                              !isTerminalCircle && [
                                'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                              ]
                          )}
                        >
                          {isCompleted ? (
                            <Check className='h-4 w-4' strokeWidth={2.5} />
                          ) : isTerminalCircle ? (
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
                              (isSelected || isCompleted || isTerminalCircle) &&
                                'text-gray-800',
                              !isSelected &&
                                !isCompleted &&
                                !isTerminalCircle &&
                                'text-gray-500'
                            )}
                          >
                            {status.value === 'canceled'
                              ? isTerminalReject
                                ? 'Rechazado'
                                : 'Cancelado'
                              : status.label}
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
        );
      }}
    />
  );
};
