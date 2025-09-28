'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, ShoppingCart, ShoppingCartIcon } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import { ProductSearchDropdown } from '@/features/sales/components/search/sales-search-product';
import SalesSummary from '@/features/sales/components/summary/sales-summary';
import { SalesTicketPreview } from '@/features/sales/components/ticket/sales-ticket-preview';
import { Separator } from '@/components/ui/separator';
import { TableCustom } from '@/components/table';
import { columnsSale } from '@/features/sales/components/tables/sales-product-table/columns';
import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';

function StartPostPage() {
  const { cashRegister, products, currentSale, addToSale, completeSale } =
    usePOSStore();

  const [showTicket, setShowTicket] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  return (
    <>
      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className='max-w-md'>
          <SalesTicketPreview
            ticketNumber={ticketNumber}
            items={currentSale.map((item) => ({
              name: item.product.name,
              price: item.unit_price,
              quantity: item.quantity
            }))}
            total={currentSale.reduce((sum, item) => sum + item.subtotal, 0)}
          />
        </DialogContent>
      </Dialog>
      <PageContainer scrollable={true}>
        <div className='flex flex-1 flex-col space-y-4'>
          <Heading
            title='Nueva Venta POS'
            description='Cree y gestione una nueva venta desde el punto de venta.'
          />

          <Separator />

          {!cashRegister.isOpen ? (
            <Card className='p-8 text-center'>
              <CardContent>
                <ShoppingCart className='text-muted-foreground mx-auto mb-4 h-16 w-16' />
                <h2 className='mb-2 text-2xl font-bold'>Caja Cerrada</h2>
                <p className='text-muted-foreground'>
                  Para usar el punto de venta, primero debe abrir la caja desde
                  el Dashboard.
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
                    <TableCustom
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
      </PageContainer>
    </>
  );
}

export default StartPostPage;
