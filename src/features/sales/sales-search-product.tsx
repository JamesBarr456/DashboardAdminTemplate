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

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Product } from '@/constants/product-mock-api';
import { cn } from '@/lib/utils';

interface ProductSearchDropdownProps {
  products: Product[];
  placeholder?: string;
  onSelect?: (product: Product, quantity: number, size: string) => void;
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
      setQuery(product.name);
      // ⚡️ Por ahora hardcodeamos talle y cantidad
      onSelect?.(product, 1, 'M');
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
                    key={product.id}
                    value={product.id.toString()}
                    onSelect={handleSelect}
                    className='flex items-center gap-3 p-3'
                  >
                    <div className='flex-shrink-0'>
                      <Image
                        width={16}
                        height={16}
                        src={product.photo_url}
                        alt={product.name}
                        className='h-16 w-16 rounded-md object-cover'
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
                          ${product.sale_price}
                        </span>
                        {product.has_discount &&
                          product.discount_percentage && (
                            <>
                              <span className='text-muted-foreground text-sm line-through'>
                                ${product.cost_price}
                              </span>
                              <Badge variant='destructive' className='text-xs'>
                                -{product.discount_percentage}%
                              </Badge>
                            </>
                          )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
