'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CircleDollarSign,
  Search,
  ShoppingCart,
  ShoppingCartIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductSearchDropdown } from './sales-search-product';
import { SalesProductTable } from './sales-product-table';
import SalesSummary from './sales-summary';
import { columnsSale } from './sales-product-table/columns';
import { toast } from 'sonner';
import { usePOSStore } from '@/store/pos-state';

export default function SalesViewPage() {
  const {
    cashRegister,
    openRegister,
    closeRegister,
    products,
    fetchProducts,
    currentSale,
    addToSale,
    completeSale
  } = usePOSStore();

  const [initialAmount, setInitialAmount] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 📌 Handlers
  const handleOpenRegister = () => {
    const amount = parseFloat(initialAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error('Ingrese un monto inicial válido');
      return;
    }

    openRegister(amount, 'Cajero Principal');
    toast.success('Caja abierta exitosamente');
    setInitialAmount('');
  };

  const handleCloseRegister = () => {
    closeRegister();
    toast.success('Caja cerrada exitosamente');
  };
  // 📌 Lógica de filtrado de productos

  return (
    <div className='space-y-6'>
      {/* Estado de la Caja */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <CircleDollarSign className='h-5 w-5' />
              Estado Actual de la Caja
            </div>
            <Badge variant={cashRegister.isOpen ? 'default' : 'secondary'}>
              {cashRegister.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* SECCION DE APERTURA Y CIERRE DE CAJA */}
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
            <div className='text-center'>
              <p className='text-muted-foreground text-sm'>Monto Inicial</p>
              <p className='text-2xl font-bold'>
                ${cashRegister.initialAmount.toLocaleString()}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-muted-foreground text-sm'>Monto Actual</p>
              <p className='text-2xl font-bold'>
                ${cashRegister.currentAmount.toLocaleString()}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-muted-foreground text-sm'>Fecha Apertura</p>
              <p className='text-lg font-semibold'>
                {cashRegister.openedAt?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-muted-foreground text-sm'>Cajero</p>
              <p className='text-lg font-semibold'>{cashRegister.cashier}</p>
            </div>
          </div>

          <div className='flex gap-4'>
            {!cashRegister.isOpen ? (
              <>
                <Input
                  type='number'
                  placeholder='Monto inicial'
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className='flex-1'
                />
                <Button onClick={handleOpenRegister}>Abrir Caja</Button>
              </>
            ) : (
              <Button variant='destructive' onClick={handleCloseRegister}>
                Cerrar Caja
              </Button>
            )}
            <Button variant='outline'>Generar Reporte de Caja</Button>
          </div>
        </CardContent>
      </Card>
      {/* Busqueda de productos */}
      {!cashRegister.isOpen ? (
        <Card className='p-8 text-center'>
          <CardContent>
            <ShoppingCart className='text-muted-foreground mx-auto mb-4 h-16 w-16' />
            <h2 className='mb-2 text-2xl font-bold'>Caja Cerrada</h2>
            <p className='text-muted-foreground'>
              Para usar el punto de venta, primero debe abrir la caja desde el
              Dashboard.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='mb-5 grid grid-cols-1 gap-6 xl:grid-cols-3'>
          <div className='space-y-6 xl:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Search className='h-5 w-5' />
                  Buscar Productos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductSearchDropdown
                  products={products}
                  onSelect={addToSale}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShoppingCartIcon className='h-5 w-5' />
                  Venta Actual
                </CardTitle>
              </CardHeader>
              <CardContent className='flex h-[500px] flex-col'>
                <SalesProductTable
                  columns={columnsSale}
                  data={currentSale}
                  totalItems={currentSale.length}
                />
              </CardContent>
            </Card>
          </div>
          <div className='xl:cols-span-1'>
            <SalesSummary
              completeSale={completeSale}
              currentSale={currentSale}
            />
          </div>
        </div>
      )}
    </div>
  );
}
