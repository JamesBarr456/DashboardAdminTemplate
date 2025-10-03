'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { useEffect, useMemo, useRef, useState } from 'react';

import Image from 'next/image';
import { Product } from '@/types/product';
import SalesModalProduct from '../modal/sales-modal-product';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';

interface ProductSearchDropdownProps {
  products: Product[];
  placeholder?: string;
  onSelect: (
    selections: { product: Product; size: string; quantity: number }[]
  ) => void;
  className?: string;
}

export function ProductSearchDropdown({
  products,
  placeholder = 'Search products...',
  onSelect,
  className
}: ProductSearchDropdownProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSelect, setProductSelect] = useState<Product | null>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    return products
      .filter(
        (product) =>
          product.is_active &&
          (product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.sku.toLowerCase().includes(query.toLowerCase()))
      )
      .slice(0, 8);
  }, [query, products]);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className='text-foreground bg-yellow-200 dark:bg-yellow-800'
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleSelect = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    if (product) {
      setProductSelect(product);
      setIsModalOpen(true);
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Command
        ref={commandRef}
        className='rounded-lg border shadow-md'
        shouldFilter={false}
      >
        <CommandInput
          placeholder={placeholder}
          value={query}
          onValueChange={setQuery}
          onFocus={handleInputFocus}
        />
        {isOpen && (
          <CommandList className='max-h-64 overflow-y-auto'>
            {query.trim() && filteredProducts.length === 0 && (
              <CommandEmpty>No se encontraron productos.</CommandEmpty>
            )}
            {filteredProducts.length > 0 && (
              <CommandGroup>
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.name}
                    value={product.id.toString()}
                    onSelect={handleSelect}
                    className='flex items-center gap-3 p-3'
                  >
                    <div className='flex-shrink-0'>
                      <Image
                        width={64}
                        height={64}
                        src={product.images[0]}
                        alt={product.name}
                        className='h-16 w-16 rounded-md object-fill'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h3 className='text-foreground truncate text-sm font-medium'>
                        {highlightMatch(product.name, query)}
                      </h3>
                      <p className='text-muted-foreground text-xs'>
                        SKU: {product.sku}
                      </p>
                      <div className='mt-1 flex items-center gap-2'>
                        <span className='text-foreground font-semibold'>
                          {formatPrice(product.sale_price)}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
      <SalesModalProduct
        isModalOpen={isModalOpen}
        onSelect={onSelect}
        product={productSelect}
        setProductSelect={setProductSelect}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
