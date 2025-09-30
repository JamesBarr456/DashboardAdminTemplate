'use client';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

function FormSegmentCode() {
  const { watch, getValues } = useFormContext();
  const codePrevious = getValues('sku'); // sku inicial (puede ser vacío)
  const segment = watch('segment');

  const [productCode, setProductCode] = useState<string>(codePrevious || '');
  const [loadingCode, setLoadingCode] = useState<boolean>(false);

  // Guardar el segmento anterior para detectar cambios
  const [prevSegment, setPrevSegment] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Si no hay segment → limpiar
    if (!segment?.code) {
      setProductCode('');
      setPrevSegment(undefined);
      return;
    }

    // Caso 1: Si existe sku y aún no cambió el segmento → mostrar sku
    if (codePrevious && !prevSegment) {
      setProductCode(codePrevious);
      setPrevSegment(segment.code);
      return;
    }

    // Caso 2: Si no hay sku (nuevo producto) o cambió el segmento → generar código
    if (!codePrevious || prevSegment !== segment.code) {
      setLoadingCode(true);
      const timeout = setTimeout(() => {
        const codeSegment = Math.floor(100 + Math.random() * 900);
        setProductCode(`${segment.code}${codeSegment}`);
        setPrevSegment(segment.code);
        setLoadingCode(false);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [segment, codePrevious, prevSegment]);

  return (
    <Badge
      variant='outline'
      className='flex h-10 min-w-[70px] items-center justify-center px-4 py-2 text-lg'
    >
      {loadingCode ? (
        <span className='flex items-center gap-2'>
          <Loader2 className='h-5 w-5 animate-spin' />
          Generando...
        </span>
      ) : (
        productCode || <span className='text-gray-400'>----</span>
      )}
    </Badge>
  );
}

export default FormSegmentCode;
