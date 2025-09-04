'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Minus, Package, Plus, ShoppingBag, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/services/product-mock-api';
import { Separator } from '@/components/ui/separator';

interface Props {
  isModalOpen: boolean;
  product: Product | null;
  onSelect: (product: Product, quantity: number, size: string) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProductSelect: React.Dispatch<React.SetStateAction<Product | null>>;
}

function SalesModalProduct({
  isModalOpen,
  product,
  setIsModalOpen,
  onSelect
}: Props) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const sizeOptions = useMemo(() => {
    if (!product?.stock) return [];

    return Object.entries(product.stock).map(([size, stock]) => ({
      size,
      stock: stock as number,
      disabled: stock === 0
    }));
  }, [product]);

  const maxQuantity = useMemo(() => {
    if (!product?.stock || !selectedSize) return 1;
    return product.stock[selectedSize] || 1;
  }, [product, selectedSize]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityInput = (value: string) => {
    const numValue = Number.parseInt(value) || 1;
    const clampedValue = Math.max(1, Math.min(numValue, maxQuantity));
    setQuantity(clampedValue);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSize('');
    setQuantity(1);
  };

  const handleAddToSale = () => {
    if (product && selectedSize && quantity > 0) {
      onSelect?.(product, quantity, selectedSize);
      handleModalClose();
    }
  };

  const totalPrice = product
    ? (product.sale_price * quantity).toFixed(2)
    : '0.00';

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-lg'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='flex items-center gap-2 text-xl'>
            <ShoppingBag className='h-5 w-5' />
            Agregar a la venta
          </DialogTitle>
        </DialogHeader>

        {product && (
          <div className='space-y-6'>
            {/* Product Card */}
            <div className='space-y-4 rounded-lg p-4'>
              <div className='flex flex-col gap-4 sm:flex-row'>
                {/* Product Image */}
                <div className='mx-auto flex-shrink-0 sm:mx-0'>
                  <div className='relative h-32 w-32 overflow-hidden rounded-lg border-2 sm:h-24 sm:w-24'>
                    <Image
                      src={product.photo_url || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className='flex-1 space-y-2 text-center sm:text-left'>
                  <h3 className='text-lg leading-tight font-semibold'>
                    {product.name}
                  </h3>

                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                    <Badge
                      variant='secondary'
                      className='mx-auto w-fit sm:mx-0'
                    >
                      <Tag className='mr-1 h-3 w-3' />
                      {product.sku}
                    </Badge>
                  </div>

                  <div className='text-2xl font-bold text-green-600'>
                    ${product.sale_price}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            <div className='space-y-3'>
              <Label className='text-base font-semibold'>
                Seleccionar talle
              </Label>
              <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
                {sizeOptions.map(({ size, stock, disabled }) => (
                  <button
                    key={size}
                    type='button'
                    onClick={() => !disabled && setSelectedSize(size)}
                    disabled={disabled}
                    className={`relative rounded-lg border-2 p-3 transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : disabled
                          ? 'cursor-not-allowed text-slate-400'
                          : 'hover:border-primary hover:shadow-sm'
                    } `}
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
                ))}
              </div>

              {selectedSize && (
                <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                  <Package className='h-4 w-4' />
                  <span>Stock disponible: {maxQuantity} unidades</span>
                </div>
              )}
            </div>

            {/* Quantity Selection */}
            <div className='space-y-3'>
              <Label className='text-base font-semibold'>Cantidad</Label>
              <div className='flex items-center justify-center gap-3'>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => handleQuantityChange(-1)}
                  disabled={!selectedSize || quantity <= 1}
                  className='h-10 w-10 cursor-pointer'
                >
                  <Minus className='h-4 w-4' />
                </Button>

                <div className='w-20'>
                  <Input
                    type='number'
                    min={1}
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) => handleQuantityInput(e.target.value)}
                    disabled={!selectedSize}
                    className='text-center text-lg font-semibold'
                  />
                </div>

                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => handleQuantityChange(1)}
                  disabled={!selectedSize || quantity >= maxQuantity}
                  className='h-10 w-10 cursor-pointer'
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            {selectedSize && quantity > 0 && (
              <>
                <Separator />
                <div className='bg-primary/5 rounded-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <p className='text-muted-foreground text-sm'>Total</p>
                      <p className='text-sm'>
                        {quantity} × ${product.sale_price}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-primary text-2xl font-bold'>
                        ${totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <DialogFooter className='gap-3 pt-4'>
          <Button
            variant='outline'
            onClick={handleModalClose}
            className='flex-1 cursor-pointer sm:flex-none'
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddToSale}
            disabled={!selectedSize || quantity < 1 || quantity > maxQuantity}
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
