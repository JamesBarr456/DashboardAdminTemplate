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

  const [prevSegment, setPrevSegment] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!segment?.code) {
      setProductCode('');
      setPrevSegment(undefined);
      return;
    }

    if (codePrevious && !prevSegment) {
      setProductCode(codePrevious);
      setPrevSegment(segment.code);
      return;
    }

    if (!codePrevious || prevSegment !== segment.code) {
      setLoadingCode(true);
      const timeout = setTimeout(() => {
        // Cálculo determinista a partir del código del segmento
        const codeBase = String(segment.code)
          .split('')
          .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
        const codeSegment = 100 + (codeBase % 900);
        setProductCode(`${segment.code}${codeSegment}`);
        setPrevSegment(segment.code);
        setLoadingCode(false);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [segment, codePrevious, prevSegment]);

  return (
    <Badge variant='outline' className='flex items-center justify-center'>
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
