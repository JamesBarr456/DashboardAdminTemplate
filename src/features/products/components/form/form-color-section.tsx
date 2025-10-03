'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Palette } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { colorMap, colors } from '@/constants/mocks/products';

import { Button } from '@/components/ui/button';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface FormColorSectionProps {
  control: Control<any>;
  colorsFieldName?: string;
  isActiveFieldName?: string;
  useColorsFieldName?: string;
}

export function FormColorSection({
  control,
  colorsFieldName = 'colors',
  isActiveFieldName = 'is_active',
  useColorsFieldName = 'use_colors'
}: FormColorSectionProps) {
  const { setValue } = useFormContext();
  const watchedUseColors = useWatch({ control, name: useColorsFieldName });
  const watchedColors = useWatch({ control, name: colorsFieldName }) as
    | string[]
    | undefined;
  const watchedImage = useWatch({ control, name: 'image' });
  const isActiveValue = !!useWatch({ control, name: isActiveFieldName });
  const useColors =
    typeof watchedUseColors === 'boolean'
      ? watchedUseColors
      : (watchedColors?.length || 0) > 0;

  const hasImages = (() => {
    if (!watchedImage) return false;
    if (Array.isArray(watchedImage)) return watchedImage.length > 0;
    if (typeof watchedImage === 'string') return watchedImage.trim().length > 0;
    if (typeof watchedImage === 'object' && 'length' in (watchedImage as any))
      return (watchedImage as any).length > 0;
    return false;
  })();

  useEffect(() => {
    if (!hasImages && isActiveValue) {
      setValue(isActiveFieldName, false, {
        shouldDirty: true,
        shouldValidate: true
      });
    }
  }, [hasImages, isActiveValue, isActiveFieldName, setValue]);
  const handleColorToggle = (color: string, currentColors: string[]) => {
    const isSelected = currentColors.includes(color);
    if (isSelected) {
      return currentColors.filter((c) => c !== color);
    } else {
      return [...currentColors, color];
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Palette className='h-5 w-5 text-pink-600' />
          Colores y Configuración
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <FormField
          control={control}
          name={colorsFieldName}
          render={() => (
            <FormItem>
              {/* Switch para habilitar/deshabilitar colores */}
              <FormField
                control={control}
                name={useColorsFieldName}
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base font-medium'>
                          ¿Agregar colores?
                        </FormLabel>
                        <FormDescription>
                          Activa esta opción para definir colores disponibles
                          del producto
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={!!useColors}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (!checked) {
                              // Si se desactiva, limpiar colores
                              setValue(colorsFieldName, [], {
                                shouldDirty: true,
                                shouldValidate: true
                              });
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {useColors && (
                <FormField
                  control={control}
                  name={colorsFieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colores Disponibles</FormLabel>
                      <FormDescription>
                        Seleccione los colores disponibles para este producto
                      </FormDescription>
                      <FormControl>
                        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8'>
                          {colors.map((color) => {
                            const isSelected =
                              field.value?.includes(color) || false;
                            return (
                              <Button
                                key={color}
                                type='button'
                                variant={isSelected ? 'ghost' : 'outline'}
                                size='sm'
                                className={cn(
                                  'relative h-12 w-full cursor-pointer flex-col gap-1 transition-all duration-200',
                                  isSelected &&
                                    'ring-primary ring-2 ring-offset-2'
                                )}
                                onClick={() => {
                                  const newColors = handleColorToggle(
                                    color,
                                    field.value || []
                                  );
                                  field.onChange(newColors);
                                }}
                                aria-pressed={isSelected}
                                aria-label={`${isSelected ? 'Deseleccionar' : 'Seleccionar'} color ${color}`}
                              >
                                <div className='flex items-center gap-2'>
                                  <div
                                    className={cn(
                                      'h-4 w-4 rounded-full border',
                                      colorMap[color]
                                    )}
                                    aria-hidden='true'
                                  />
                                  {isSelected && (
                                    <Check
                                      className='h-3 w-3'
                                      aria-hidden='true'
                                    />
                                  )}
                                </div>
                                <span className='text-xs font-medium capitalize'>
                                  {color}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={control}
                name={isActiveFieldName}
                render={({ field: activeField }) => (
                  <FormItem>
                    <div className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base font-medium'>
                          Producto Activo
                        </FormLabel>
                        <FormDescription>
                          El producto será visible en la tienda si está
                          habilitado.
                          {!hasImages && (
                            <> Para activarlo, sube al menos una imagen.</>
                          )}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={!!activeField.value}
                          disabled={!hasImages}
                          onCheckedChange={(checked) => {
                            if (!hasImages) return;
                            activeField.onChange(checked);
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
