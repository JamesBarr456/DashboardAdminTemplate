'use client';

import { usePOSStore } from '@/store/pos-state';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { History, Filter, Plus, Minus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function HistoryViewPage() {
  const { movements, cashRegister, addMovement } = usePOSStore();
  const [filterType, setFilterType] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [cashierFilter, setCashierFilter] = useState('');
  const [newMovement, setNewMovement] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredMovements = movements.filter((movement) => {
    const matchesType = filterType === 'all' || movement.type === filterType;
    const matchesDate =
      !dateFilter ||
      movement.timestamp.toISOString().split('T')[0] === dateFilter;
    const matchesCashier =
      !cashierFilter ||
      movement.cashier.toLowerCase().includes(cashierFilter.toLowerCase());

    return matchesType && matchesDate && matchesCashier;
  });

  const handleAddMovement = () => {
    const amount = parseFloat(newMovement.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Ingrese un monto válido');
      return;
    }

    if (!newMovement.description.trim()) {
      toast.error('Ingrese una descripción');
      return;
    }

    addMovement({
      type: newMovement.type,
      amount,
      description: newMovement.description,
      cashier: cashRegister.cashier
    });

    toast.success(
      `${newMovement.type === 'income' ? 'Ingreso' : 'Egreso'} registrado exitosamente`
    );

    setNewMovement({
      type: 'income',
      amount: '',
      description: ''
    });
    setIsDialogOpen(false);
  };

  const getMovementTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return 'Venta';
      case 'return':
        return 'Devolución';
      case 'income':
        return 'Ingreso';
      case 'expense':
        return 'Egreso';
      default:
        return type;
    }
  };

  const getMovementTypeBadge = (type: string) => {
    switch (type) {
      case 'sale':
      case 'income':
        return 'default';
      case 'return':
      case 'expense':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='flex items-center gap-2 text-3xl font-bold'>
          <History className='h-8 w-8' />
          Historial de Movimientos
        </h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Nuevo Movimiento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Movimiento</DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium'>
                  Tipo de Movimiento
                </label>
                <Select
                  value={newMovement.type}
                  onValueChange={(value: 'income' | 'expense') =>
                    setNewMovement((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='income'>
                      <div className='flex items-center gap-2'>
                        <Plus className='h-4 w-4 text-green-500' />
                        Ingreso
                      </div>
                    </SelectItem>
                    <SelectItem value='expense'>
                      <div className='flex items-center gap-2'>
                        <Minus className='h-4 w-4 text-red-500' />
                        Egreso
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='text-sm font-medium'>Monto</label>
                <Input
                  type='number'
                  placeholder='0.00'
                  value={newMovement.amount}
                  onChange={(e) =>
                    setNewMovement((prev) => ({
                      ...prev,
                      amount: e.target.value
                    }))
                  }
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Descripción</label>
                <Textarea
                  placeholder='Descripción del movimiento...'
                  value={newMovement.description}
                  onChange={(e) =>
                    setNewMovement((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                />
              </div>

              <Button onClick={handleAddMovement} className='w-full'>
                Registrar Movimiento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            <div>
              <label className='text-sm font-medium'>Tipo</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Todos</SelectItem>
                  <SelectItem value='sale'>Ventas</SelectItem>
                  <SelectItem value='income'>Ingresos</SelectItem>
                  <SelectItem value='expense'>Egresos</SelectItem>
                  <SelectItem value='return'>Devoluciones</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='text-sm font-medium'>Fecha</label>
              <Input
                type='date'
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Cajero</label>
              <Input
                placeholder='Filtrar por cajero...'
                value={cashierFilter}
                onChange={(e) => setCashierFilter(e.target.value)}
              />
            </div>

            <div className='flex items-end'>
              <Button
                variant='outline'
                onClick={() => {
                  setFilterType('all');
                  setDateFilter('');
                  setCashierFilter('');
                }}
                className='w-full'
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Movimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Movimientos ({filteredMovements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Cajero</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className='text-right'>Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <div>
                        <p>{movement.timestamp.toLocaleDateString()}</p>
                        <p className='text-muted-foreground text-sm'>
                          {movement.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{movement.cashier}</TableCell>
                    <TableCell>
                      <Badge variant={getMovementTypeBadge(movement.type)}>
                        {getMovementTypeLabel(movement.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{movement.description}</TableCell>
                    <TableCell className='text-right'>
                      <span
                        className={`font-bold ${
                          movement.type === 'sale' || movement.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {movement.type === 'sale' || movement.type === 'income'
                          ? '+'
                          : '-'}
                        ${movement.amount.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMovements.length === 0 && (
            <div className='text-muted-foreground py-8 text-center'>
              No se encontraron movimientos con los filtros aplicados
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
