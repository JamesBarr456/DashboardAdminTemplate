'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatDateTime, formatPrice } from '@/lib/format';

import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { IconDotsVertical } from '@tabler/icons-react';

import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';
import { translatePaymentMethod } from '@/lib/translation';

interface Props {
  id: string;
}

export default function MovementDetailsView({ id }: Props) {
  const { sales } = usePOSStore();
  const [open, setOpen] = useState(false);

  // Encontrar la venta correspondiente
  const sale = sales.find((s) => s.id === id);

  if (!sale) {
    return null; // Manejar el caso donde la venta no existe
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem onClick={handleOpenDialog}>
            <Eye className='mr-2 h-4 w-4' /> Detalles
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Detalles de Venta #{id}</DialogTitle>
          </DialogHeader>

          <div className='mt-4'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Talle</TableHead>
                  <TableHead className='text-center'>Cantidad</TableHead>
                  <TableHead className='text-right'>Precio Unit.</TableHead>
                  <TableHead className='text-right'>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell className='text-center'>
                      {item.quantity}
                    </TableCell>
                    <TableCell className='text-right'>
                      {formatPrice(item.unit_price)}
                    </TableCell>
                    <TableCell className='text-right'>
                      {formatPrice(item.subtotal)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className='text-right font-bold'>
                    Total:
                  </TableCell>
                  <TableCell className='text-right font-bold'>
                    {formatPrice(sale.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-muted-foreground'>Método de pago:</p>
                <p className='font-medium'>
                  {translatePaymentMethod(sale.paymentMethod)}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground'>Cajero:</p>
                <p className='font-medium'>{sale.cashier}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Fecha y hora:</p>
                <p className='font-medium'>
                  {formatDateTime(String(sale.timestamp))}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' onClick={handleCloseDialog}>
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
