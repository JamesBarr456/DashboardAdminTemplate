'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Package, ShoppingBag, Tag } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/product';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/format';

interface Props {
  isModalOpen: boolean;
  product: Product | null;
  onSelect: (
    selections: { product: Product; size: string; quantity: number }[]
  ) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProductSelect: React.Dispatch<React.SetStateAction<Product | null>>;
}

type SizeSelection = { size: string; quantity: number };

function SalesModalProduct({
  isModalOpen,
  product,
  setIsModalOpen,
  onSelect
}: Props) {
  const [selections, setSelections] = useState<SizeSelection[]>([]);

  const sizeOptions = useMemo(() => {
    if (!product?.stock) return [];
    return Object.entries(product.stock).map(([size, stock]) => ({
      size,
      stock: stock as number,
      disabled: stock === 0
    }));
  }, [product]);

  // Maneja el cambio de cantidad para cada talle
  const handleSizeQuantityChange = (
    size: string,
    quantity: number,
    max: number
  ) => {
    const clamped = Math.max(0, Math.min(quantity, max));
    setSelections((prev) => {
      if (clamped === 0) {
        return prev.filter((sel) => sel.size !== size);
      }
      const exists = prev.find((sel) => sel.size === size);
      if (exists) {
        return prev.map((sel) =>
          sel.size === size ? { ...sel, quantity: clamped } : sel
        );
      }
      return [...prev, { size, quantity: clamped }];
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelections([]);
  };

  const handleAddToSale = () => {
    if (product) {
      const validSelections = selections.filter((sel) => sel.quantity > 0);
      if (validSelections.length > 0) {
        onSelect(
          validSelections.map((sel) => ({
            product,
            size: sel.size,
            quantity: sel.quantity
          }))
        );
        handleModalClose();
      }
    }
  };

  // Calcular el total general
  const totalPrice = formatPrice(
    product
      ? selections.reduce(
          (acc, sel) => acc + product.sale_price * sel.quantity,
          0
        )
      : 0
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className='max-h-[90vh] overflow-y-auto md:max-w-3xl'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='flex items-center gap-2 text-xl'>
            <ShoppingBag className='h-5 w-5' />
            Agregar a la venta
          </DialogTitle>
        </DialogHeader>

        {product && (
          <div className='space-y-4'>
            {/* Product Card */}
            <div className='space-y-4 rounded-lg'>
              <div className='flex items-center gap-2'>
                {/* Product Image */}
                <div className='flex-shrink-0'>
                  <div className='relative h-20 w-20 overflow-hidden rounded-lg border-2 sm:h-24 sm:w-24'>
                    <Image
                      src={product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className='flex-1 space-y-2 text-left'>
                  <h3 className='text-lg leading-tight font-semibold'>
                    {product.name}
                  </h3>

                  <Badge variant='secondary' className='mx-auto w-fit sm:mx-0'>
                    <Tag className='mr-1 h-3 w-3' />
                    {product.sku}
                  </Badge>

                  <div className='text-lg font-bold text-green-600'>
                    {formatPrice(product.sale_price)}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Container para la selección de talles y resumen */}
            <div className='flex flex-col md:flex-row md:gap-3'>
              {/* Selección de talles y cantidades */}
              <div className='flex-1 space-y-2'>
                <Label className='text-base font-semibold'>
                  Seleccionar talles y cantidades
                </Label>
                <div className='grid grid-cols-4 gap-2 md:grid-cols-3'>
                  {sizeOptions.map(({ size, stock, disabled }) => {
                    const selected = selections.find(
                      (sel) => sel.size === size
                    );
                    return (
                      <div
                        key={size}
                        className='flex flex-col items-center gap-1'
                      >
                        <button
                          type='button'
                          disabled={disabled}
                          className={`relative w-20 rounded-lg border-2 p-3 text-center transition-all duration-200 ${
                            disabled
                              ? 'cursor-not-allowed text-slate-400'
                              : 'hover:border-primary hover:shadow-sm'
                          }`}
                        >
                          <div className='text-sm font-semibold'>
                            {size.toUpperCase()}
                          </div>
                          <div
                            className={`text-xs ${disabled ? 'text-slate-400' : 'text-muted-foreground'}`}
                          >
                            {disabled ? 'Sin stock' : `${stock} unidades`}
                          </div>
                          {/* Stock indicator */}
                          <div className='absolute top-1 right-1'>
                            <div
                              className={`h-2 w-2 rounded-full ${
                                disabled
                                  ? 'bg-red-400'
                                  : stock > 10
                                    ? 'bg-green-400'
                                    : stock > 5
                                      ? 'bg-yellow-400'
                                      : 'bg-orange-400'
                              }`}
                            />
                          </div>
                        </button>
                        <Input
                          type='number'
                          min={0}
                          max={stock}
                          value={selected?.quantity ?? 0}
                          disabled={disabled}
                          onChange={(e) =>
                            handleSizeQuantityChange(
                              size,
                              Number(e.target.value),
                              stock
                            )
                          }
                          className='w-20 text-center'
                        />
                        <span className='text-muted-foreground text-xs'>
                          Máx: {stock}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Mostrar stock total seleccionado */}
                {selections.some((sel) => sel.quantity > 0) && (
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <Package className='h-4 w-4' />
                    <span>
                      Total unidades seleccionadas:{' '}
                      {selections.reduce((acc, sel) => acc + sel.quantity, 0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Resumen de precio */}
              <div className='md:w-80'>
                {selections.some((sel) => sel.quantity > 0) && (
                  <div className='mt-6 md:mt-0'>
                    <div className='bg-primary/5 sticky top-0 rounded-lg p-4'>
                      <div className='rounded-md'>
                        <div className='w-full'>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead style={{ width: '33%' }}>
                                  Cantidad
                                </TableHead>
                                <TableHead style={{ width: '33%' }}>
                                  Talle
                                </TableHead>
                                <TableHead
                                  style={{ width: '33%' }}
                                  className='text-right'
                                >
                                  Precio
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                          </Table>
                          <ScrollArea className='h-[120px] md:h-[200px]'>
                            <Table>
                              <TableBody>
                                {selections
                                  .filter((sel) => sel.quantity > 0)
                                  .map((sel) => (
                                    <TableRow key={sel.size}>
                                      <TableCell
                                        style={{ width: '33%' }}
                                        className='font-medium'
                                      >
                                        {sel.quantity}
                                      </TableCell>
                                      <TableCell style={{ width: '33%' }}>
                                        {sel.size.toUpperCase()}
                                      </TableCell>
                                      <TableCell
                                        style={{ width: '33%' }}
                                        className='text-right'
                                      >
                                        {formatPrice(
                                          sel.quantity * product.sale_price
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </ScrollArea>
                          <Table>
                            <TableFooter>
                              <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell className='text-right font-bold'>
                                  {totalPrice}
                                </TableCell>
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className='flex-row gap-3 pt-4'>
          <Button
            variant='outline'
            onClick={handleModalClose}
            className='flex-1 cursor-pointer sm:flex-none'
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddToSale}
            disabled={selections.filter((sel) => sel.quantity > 0).length === 0}
            className='bg-primary hover:bg-primary/90 flex-1 cursor-pointer sm:flex-none'
          >
            <ShoppingBag className='mr-2 h-4 w-4' />
            Agregar a la venta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SalesModalProduct;
