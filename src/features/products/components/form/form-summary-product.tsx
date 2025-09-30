import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import FormSegmentCode from './form-segment-code';
import { formatPrice } from '@/lib/format';
import { useFormContext } from 'react-hook-form';

interface FormSummaryProductProps {
  initialData: boolean;
}
function FormSummaryProduct({ initialData }: FormSummaryProductProps) {
  const { watch } = useFormContext();
  const sale_price = watch('sale_price');
  const segment = watch('segment');
  const name = watch('name');
  const brand = watch('brand');
  const render = ({
    label,
    value,
    fallback = '—'
  }: {
    label: string;
    value: string | number | undefined;
    fallback?: string;
  }) => {
    return (
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>{label}</p>
        <p className='font-medium capitalize'>{value || fallback}</p>
      </div>
    );
  };
  return (
    <Card className='sticky top-4'>
      <CardHeader>
        <CardTitle>Resumen del Producto</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {render({ label: 'Nombre', value: name })}
        {render({ label: 'Marca', value: brand })}
        {render({ label: 'Rubro', value: segment?.name })}
        {render({
          label: 'Precio de venta',
          value: sale_price ? formatPrice(sale_price) : undefined
        })}
        <div className='space-y-2'>
          <p className='text-muted-foreground text-sm'>Código</p>
          <FormSegmentCode />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button type='submit'>
          {initialData ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </CardFooter>
    </Card>
  );
}
export default FormSummaryProduct;
