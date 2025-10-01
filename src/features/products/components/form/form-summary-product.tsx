import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FormSegmentCode from './form-segment-code';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import { useFormContext, useWatch } from 'react-hook-form';
import { Icons, type Icon } from '@/components/icons';
import type { ProductType } from '@/schemas/product-schema';
import * as React from 'react';

// type guard local similar al de FileUploader
function isFileWithPreview(file: File): file is File & { preview: string } {
  return 'preview' in file && typeof (file as any).preview === 'string';
}

// Campo genérico de resumen con soporte de icono
const SummaryField = React.memo(function SummaryField({
  label,
  value,
  fallback = '—',
  icon: IconComp
}: {
  label: string;
  value?: React.ReactNode;
  fallback?: string;
  icon?: Icon;
}) {
  return (
    <div className='space-y-1.5'>
      <p className='text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase'>
        {IconComp ? <IconComp size={14} className='shrink-0' /> : null}
        {label}
      </p>
      <p className='truncate text-sm font-medium capitalize'>
        {value ?? fallback}
      </p>
    </div>
  );
});

// Grid simple de imágenes (muestra hasta 3) con normalización de entradas
const ImageGrid = React.memo(function ImageGrid({
  images
}: {
  images?: unknown;
}) {
  const toSrcArray = React.useCallback((input: unknown): string[] => {
    if (!input) return [];
    // FileList
    if (typeof FileList !== 'undefined' && input instanceof FileList) {
      return Array.from(input)
        .map((f) => (isFileWithPreview(f) ? f.preview : undefined))
        .filter((v): v is string => typeof v === 'string');
    }
    // Array de (File | string)
    if (Array.isArray(input)) {
      return (input as Array<File | string>)
        .map((item) =>
          typeof item === 'string'
            ? item
            : isFileWithPreview(item)
              ? item.preview
              : undefined
        )
        .filter((v): v is string => typeof v === 'string');
    }
    // String único
    if (typeof input === 'string') return [input];
    return [];
  }, []);

  const srcs = toSrcArray(images);

  if (!srcs || srcs.length === 0) {
    return (
      <div className='bg-muted border-border flex h-28 w-full items-center justify-center rounded-lg border border-dashed'>
        <span className='text-muted-foreground text-xs'>Sin imágenes</span>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 gap-2'>
      {srcs.slice(0, 3).map((src, index) => (
        <div
          key={index}
          className='bg-muted border-border relative aspect-square overflow-hidden rounded-md border'
        >
          <Image
            src={src || '/placeholder.svg'}
            alt={`Producto ${index + 1}`}
            fill
            className='object-cover'
          />
        </div>
      ))}
    </div>
  );
});

function FormSummaryProduct() {
  const { control } = useFormContext<ProductType>();

  // Suscribirse sólo a los campos necesarios para reducir renders
  const [
    name,
    brand,
    segment,
    sale_price,
    cost_price,
    sizes,
    provider,
    images
  ] = useWatch({
    control,
    name: [
      'name',
      'brand',
      'segment',
      'sale_price',
      'cost_price',
      'sizes',
      'provider',
      'image'
    ]
  }) as unknown as [
    string | undefined,
    string | undefined,
    ProductType['segment'] | undefined,
    number | undefined,
    number | undefined,
    string | undefined,
    string | undefined,
    unknown
  ];

  return (
    <Card className='border-border/50 shadow-sm'>
      <CardHeader className='border-border/50 bg-muted/20 border-b'>
        <CardTitle>Resumen del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-6'>
          <ImageGrid images={images} />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <SummaryField label='Nombre' value={name} icon={Icons.product} />
          <SummaryField label='Marca' value={brand} icon={Icons.post} />
          <SummaryField
            label='Rubro'
            value={segment?.name}
            icon={Icons.kanban}
          />

          <div className='space-y-2'>
            <p className='text-muted-foreground flex items-center gap-1.5 text-sm'>
              <Icons.post size={14} /> Código
            </p>
            <FormSegmentCode />
          </div>

          <div className='space-y-1.5'>
            <p className='text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase'>
              <Icons.shoppingCart size={14} /> Precio de venta
            </p>
            <p className='text-primary text-lg font-semibold'>
              {sale_price != null ? formatPrice(sale_price) : '—'}
            </p>
          </div>

          <div className='space-y-1.5'>
            <p className='text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase'>
              <Icons.wallet size={14} /> Precio de costo
            </p>
            <p className='text-sm font-medium'>
              {cost_price != null ? formatPrice(cost_price) : '—'}
            </p>
          </div>

          <SummaryField label='Talles' value={sizes} icon={Icons.page} />

          <SummaryField label='Proveedor' value={provider} icon={Icons.user} />
        </div>
      </CardContent>
    </Card>
  );
}

export default FormSummaryProduct;
