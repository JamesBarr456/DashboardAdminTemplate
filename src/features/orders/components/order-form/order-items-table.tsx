'use client';

import { AlertCircle, MinusCircle, Package, PlusCircle } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AlertModal } from '@/components/modal/alert-modal';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { IconTooltipButton } from '@/components/common/icon-tooltip-button';
import { IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Item } from '@/types/order-new';
import { TableCustom } from '@/components/table';
import { formatPrice } from '@/lib/format';
import { usePOSStore } from '@/store/pos-state';

// Fila derivada para la tabla de items de la orden
type OrderItemRow = {
  id: string;
  index: number;
  sku: string;
  name: string;
  size?: string;
  unit_price: number;
  subtotal: number;
  quantity: number;
  image?: string;
  defective_quantity: number;
  unavailable: boolean;
};

// Mapea los items originales + parches del formulario (por índice) a filas visibles
function useOrderItemRows(items: Item[]): OrderItemRow[] {
  const { products, fetchProducts } = usePOSStore();
  const { control } = useFormContext();
  const watchItems = useWatch({ control, name: 'items' }) as any[] | undefined;

  useEffect(() => {
    if (!products || products.length === 0) void fetchProducts();
  }, [products, fetchProducts]);

  return useMemo(() => {
    const rows: OrderItemRow[] = [];
    for (let index = 0; index < items.length; index++) {
      const it = items[index];
      const patch = watchItems?.[index] as any | undefined;
      if (patch?.remove) continue;

      const prod = products?.find((p) => p.sku === it.product_sku);
      const quantity = (patch?.quantity ?? it.quantity) as number;
      const defQ = (patch?.defective_quantity ??
        it.defective_quantity ??
        0) as number;
      const goodUnits = Math.max(0, quantity - defQ);
      const subtotal = goodUnits * it.price + defQ * it.price * 0.9;

      rows.push({
        id: it._id,
        index,
        sku: it.product_sku,
        name: it.name,
        size: it.size,
        unit_price: it.price,
        subtotal,
        quantity,
        image: prod?.images?.[0],
        defective_quantity: defQ,
        unavailable: (patch?.unavailable ?? it.unavailable ?? false) as boolean
      });
    }
    return rows;
  }, [items, products, watchItems]);
}

// Definición de columnas de la tabla, incluye celda de acciones
function useOrderItemsColumns(canEdit: boolean) {
  const { setValue } = useFormContext();

  const columns: ColumnDef<OrderItemRow>[] = useMemo(() => {
    return [
      {
        accessorKey: 'image',
        header: 'Imagen',
        cell: ({ row }) => {
          const src = row.original.image;
          return src ? (
            <Image
              src={src}
              alt={row.original.name}
              width={120}
              height={160}
              className='rounded-lg'
            />
          ) : (
            <div className='bg-muted flex h-20 w-16 items-center justify-center rounded-md'>
              <Package className='text-muted-foreground h-5 w-5' />
            </div>
          );
        }
      },
      {
        accessorKey: 'sku',
        header: 'Código',
        cell: ({ row }) => (
          <Badge variant='outline' className='capitalize'>
            {row.original.sku}
          </Badge>
        )
      },
      {
        accessorKey: 'name',
        header: 'Producto',
        cell: ({ row }) => <span>{row.original.name}</span>
      },
      {
        accessorKey: 'unit_price',
        header: 'Precio Unit.',
        cell: ({ row }) => {
          const item = row.original;
          if (item.defective_quantity > 0) {
            return (
              <div className='space-y-1'>
                <div>{formatPrice(item.unit_price)}</div>
                <div className='text-red-600'>
                  {formatPrice(item.unit_price * 0.9)} (defectuoso)
                </div>
              </div>
            );
          }
          return <span>{formatPrice(item.unit_price)}</span>;
        }
      },
      {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: ({ row }) => {
          const item = row.original;
          const normalSubtotal = item.quantity * item.unit_price;
          const discountedSubtotal = item.subtotal; // ya incluye 10% en defectuosos
          if (item.defective_quantity > 0) {
            return (
              <div className='space-y-1'>
                <div>{formatPrice(normalSubtotal)}</div>
                <div className='text-red-600'>
                  {formatPrice(discountedSubtotal)} (con defecto)
                </div>
              </div>
            );
          }
          return <span>{formatPrice(discountedSubtotal)}</span>;
        }
      },
      {
        accessorKey: 'size',
        header: 'Talle',
        cell: ({ row }) => (
          <Badge variant='outline' className='uppercase'>
            {row.original.size || '-'}
          </Badge>
        )
      },
      {
        accessorKey: 'quantity',
        header: 'Cantidad',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className='space-y-1'>
              <Badge variant='outline'>{item.quantity} U.</Badge>
              {item.defective_quantity > 0 && (
                <div className='text-xs text-red-600'>
                  Defectuosos: {item.defective_quantity}
                </div>
              )}
            </div>
          );
        }
      },
      {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <OrderItemActions
            row={row.original}
            canEdit={canEdit}
            setValue={setValue}
          />
        )
      }
    ];
  }, [setValue, canEdit]);

  return columns;
}

// Acciones por fila: sumar/restar/eliminar y cantidad defectuosa
function OrderItemActions({
  row,
  canEdit,
  setValue
}: {
  row: OrderItemRow;
  canEdit: boolean;
  setValue: (name: string, value: unknown) => void;
}) {
  const { index, quantity, defective_quantity, unavailable } = row;
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!canEdit) return;
    setValue(`items.${index}.quantity`, quantity + 1);
  };

  const handleRemove = () => {
    if (!canEdit) return;
    if (quantity <= 1) setOpen(true);
    else setValue(`items.${index}.quantity`, quantity - 1);
  };

  const handleDelete = () => {
    if (!canEdit) return;
    setOpen(true);
  };

  const onConfirm = () => {
    setValue(`items.${index}.remove`, true);
    setOpen(false);
  };

  const handleDefectiveChange = (val: number) => {
    if (!canEdit || unavailable) return;
    const clamped = Math.max(0, Math.min(quantity, val));
    setValue(`items.${index}.defective_quantity`, clamped);
    setValue(`items.${index}.defective`, clamped > 0);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={false}
        title='Eliminar Producto'
        description='¿Estás seguro de que deseas eliminar este producto de la orden? Esta acción no se puede deshacer.'
      />
      <div className='flex gap-2'>
        {IconTooltipButton(
          <PlusCircle className='h-4 w-4 text-green-600' />,
          'Agregar',
          handleAdd,
          'outline',
          !canEdit
        )}
        {IconTooltipButton(
          <MinusCircle className='h-4 w-4 text-yellow-600' />,
          'Quitar',
          handleRemove,
          'outline',
          !canEdit
        )}
        {IconTooltipButton(
          <IconTrash className='h-4 w-4' />,
          'Eliminar',
          handleDelete,
          'destructive',
          !canEdit
        )}
        <div className='flex items-center gap-2'>
          <AlertCircle
            className={`h-4 w-4 ${defective_quantity > 0 ? 'text-red-600' : 'text-gray-600'}`}
          />
          <Input
            type='number'
            value={defective_quantity}
            onChange={(e) =>
              handleDefectiveChange(parseInt(e.target.value || '0', 10) || 0)
            }
            className='h-8 w-20'
            min={0}
            max={quantity}
            placeholder='Defectuosos'
            disabled={!canEdit || unavailable}
          />
        </div>
      </div>
    </>
  );
}

export function OrderItemsTable({
  items,
  canEdit
}: {
  items: Item[];
  canEdit: boolean;
}) {
  const data = useOrderItemRows(items);
  const columns = useOrderItemsColumns(canEdit);

  return (
    <TableCustom<OrderItemRow, unknown>
      columns={columns}
      data={data}
      totalItems={data.length}
    />
  );
}
