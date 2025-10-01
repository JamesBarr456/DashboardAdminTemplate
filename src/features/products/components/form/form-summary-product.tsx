import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import FormSegmentCode from './form-segment-code';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import { useFormContext } from 'react-hook-form';

function FormSummaryProduct() {
  const { watch } = useFormContext();

  const name = watch('name');
  const brand = watch('brand');
  const segment = watch('segment');
  const sale_price = watch('sale_price');
  const cost_price = watch('cost_price');
  const sizes = watch('sizes');
  const colors = watch('colors');
  const provider = watch('provider');
  const images = watch('image');

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
      <div className='space-y-1.5'>
        <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
          {label}
        </p>
        <p className='text-sm font-medium capitalize'>{value || fallback}</p>
      </div>
    );
  };

  const renderColors = (colors: string[] | undefined) => {
    if (!colors || colors.length === 0)
      return <span className='text-muted-foreground text-sm'>—</span>;

    return (
      <div className='flex flex-wrap gap-1.5'>
        {colors.map((color, index) => (
          <Badge key={index} variant='secondary' className='text-xs capitalize'>
            {color}
          </Badge>
        ))}
      </div>
    );
  };

  const renderImages = (images: any[] | undefined) => {
    if (!images || images.length === 0) {
      return (
        <div className='bg-muted border-border flex h-28 w-full items-center justify-center rounded-lg border border-dashed'>
          <span className='text-muted-foreground text-xs'>Sin imágenes</span>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-3 gap-2'>
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className='bg-muted border-border relative aspect-square overflow-hidden rounded-md border'
          >
            <Image
              src={image || '/placeholder.svg'}
              alt={`Producto ${index + 1}`}
              fill
              className='object-cover'
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className='border-border/50 shadow-sm'>
      <CardHeader className='border-border/50 bg-muted/20 border-b'>
        <CardTitle>Resumen del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-6'>{renderImages(images)}</div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {render({ label: 'Nombre', value: name })}
          {render({ label: 'Marca', value: brand })}
          {render({ label: 'Rubro', value: segment?.name })}

          <div className='space-y-2'>
            <p className='text-muted-foreground text-sm'>Código</p>
            <FormSegmentCode />
          </div>

          <div className='space-y-1.5'>
            <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              Precio de venta
            </p>
            <p className='text-primary text-lg font-semibold'>
              {formatPrice(sale_price)}
            </p>
          </div>

          <div className='space-y-1.5'>
            <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              Precio de costo
            </p>
            <p className='text-sm font-medium'>{formatPrice(cost_price)}</p>
          </div>

          {render({ label: 'Talles', value: sizes })}

          {render({ label: 'Proveedor', value: provider })}

          <div className='space-y-1.5 md:col-span-2'>
            <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              Colores
            </p>
            {renderColors(colors)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FormSummaryProduct;
