export interface Order {
  id: number;
  cliente: string;
  modoEntrega: 'RETIRO' | 'ENVÍO';
  monto: number;
  formaPago: 'EFECTIVO' | 'TRANSFERENCIA';
  fechaPedido: string;
  estado?: 'PENDIENTE' | 'COMPLETADO';
}

export interface CashierStats {
  nombre: string;
  ventasTurno: number;
  aperturaCaja: string;
  pedidosRetirados: number;
  totalDia: number;
  efectivoInicial: number;
  ventasEfectivo: number;
  totalEnCaja: number;
}

export const cashierStats: CashierStats = {
  nombre: 'Gisela',
  ventasTurno: 12,
  aperturaCaja: '14:25',
  pedidosRetirados: 8,
  totalDia: 187650,
  efectivoInicial: 50000,
  ventasEfectivo: 89450,
  totalEnCaja: 139450
};

export const pendingOrders: Order[] = [
  {
    id: 1,
    cliente: 'María González',
    modoEntrega: 'RETIRO',
    monto: 18750,
    formaPago: 'EFECTIVO',
    fechaPedido: '2024-01-15T10:30:00',
    estado: 'PENDIENTE'
  },
  {
    id: 2,
    cliente: 'Carlos Rodríguez',
    modoEntrega: 'ENVÍO',
    monto: 12300,
    formaPago: 'TRANSFERENCIA',
    fechaPedido: '2024-01-15T11:15:00',
    estado: 'PENDIENTE'
  },
  {
    id: 3,
    cliente: 'Ana Martínez',
    modoEntrega: 'RETIRO',
    monto: 24900,
    formaPago: 'EFECTIVO',
    fechaPedido: '2024-01-15T12:00:00',
    estado: 'PENDIENTE'
  },
  {
    id: 4,
    cliente: 'Jorge López',
    modoEntrega: 'ENVÍO',
    monto: 15600,
    formaPago: 'TRANSFERENCIA',
    fechaPedido: '2024-01-15T12:45:00',
    estado: 'PENDIENTE'
  },
  {
    id: 5,
    cliente: 'Sofía Herrera',
    modoEntrega: 'RETIRO',
    monto: 9850,
    formaPago: 'EFECTIVO',
    fechaPedido: '2024-01-15T13:20:00',
    estado: 'PENDIENTE'
  }
];

export const completedOrders: Order[] = [
  {
    id: 6,
    cliente: 'Laura Fernández',
    modoEntrega: 'RETIRO',
    monto: 11200,
    formaPago: 'EFECTIVO',
    fechaPedido: '2024-01-15T09:30:00',
    estado: 'COMPLETADO'
  },
  {
    id: 7,
    cliente: 'Pedro Silva',
    modoEntrega: 'ENVÍO',
    monto: 19800,
    formaPago: 'TRANSFERENCIA',
    fechaPedido: '2024-01-15T08:15:00',
    estado: 'COMPLETADO'
  },
  {
    id: 8,
    cliente: 'Carmen Ruiz',
    modoEntrega: 'RETIRO',
    monto: 8750,
    formaPago: 'EFECTIVO',
    fechaPedido: '2024-01-15T08:45:00',
    estado: 'COMPLETADO'
  },
  {
    id: 9,
    cliente: 'Roberto Díaz',
    modoEntrega: 'ENVÍO',
    monto: 16450,
    formaPago: 'TRANSFERENCIA',
    fechaPedido: '2024-01-15T07:30:00',
    estado: 'COMPLETADO'
  }
];
