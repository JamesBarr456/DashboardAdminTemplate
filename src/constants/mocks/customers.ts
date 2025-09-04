import { Customer } from '@/types/user';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'María',
    lastName: 'González',
    dni: '12345678',
    email: 'maria.gonzalez@email.com',
    phone: '+54 11 1234-5678',
    orderHistory: ['ORD-001', 'ORD-005'],
    cancelledOrders: 0,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=MariaGonzalez'
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    dni: '87654321',
    email: 'carlos.rodriguez@email.com',
    phone: '+54 11 8765-4321',
    orderHistory: ['ORD-002', 'ORD-004'],
    cancelledOrders: 2,
    rejectedOrders: 1,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=CarlosRodriguez'
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Martínez',
    dni: '11223344',
    email: 'ana.martinez@email.com',
    phone: '+54 11 1122-3344',
    orderHistory: ['ORD-003'],
    cancelledOrders: 0,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=AnaMartinez'
  },
  {
    id: '4',
    firstName: 'Luis',
    lastName: 'Fernández',
    dni: '55667788',
    email: 'luis.fernandez@email.com',
    phone: '+54 11 5566-7788',
    orderHistory: ['ORD-006'],
    cancelledOrders: 0,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=LuisFernandez'
  },
  {
    id: '5',
    firstName: 'Sofía',
    lastName: 'Pérez',
    dni: '99887766',
    email: 'sofia.perez@email.com',
    phone: '+54 11 9988-7766',
    orderHistory: ['ORD-007', 'ORD-008'],
    cancelledOrders: 1,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=SofiaPerez'
  },
  {
    id: '6',
    firstName: 'Martín',
    lastName: 'Gómez',
    dni: '44332211',
    email: 'martin.gomez@email.com',
    phone: '+54 11 4433-2211',
    orderHistory: ['ORD-009'],
    cancelledOrders: 0,
    rejectedOrders: 1,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=MartinGomez'
  },
  {
    id: '7',
    firstName: 'Lucía',
    lastName: 'Ramírez',
    dni: '66778899',
    email: 'lucia.ramirez@email.com',
    phone: '+54 11 6677-8899',
    orderHistory: ['ORD-010', 'ORD-011', 'ORD-012'],
    cancelledOrders: 0,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=LuciaRamirez'
  },
  {
    id: '8',
    firstName: 'Federico',
    lastName: 'Vega',
    dni: '33445566',
    email: 'federico.vega@email.com',
    phone: '+54 11 3344-5566',
    orderHistory: ['ORD-013'],
    cancelledOrders: 1,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=FedericoVega'
  },
  {
    id: '9',
    firstName: 'Valentina',
    lastName: 'Ríos',
    dni: '22114433',
    email: 'valentina.rios@email.com',
    phone: '+54 11 2211-4433',
    orderHistory: ['ORD-014', 'ORD-015'],
    cancelledOrders: 0,
    rejectedOrders: 0,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=ValentinaRios'
  },
  {
    id: '10',
    firstName: 'Diego',
    lastName: 'Castro',
    dni: '55664433',
    email: 'diego.castro@email.com',
    phone: '+54 11 5566-4433',
    orderHistory: ['ORD-016', 'ORD-017', 'ORD-018', 'ORD-019', 'ORD-020'],
    cancelledOrders: 2,
    rejectedOrders: 1,
    avatar: 'https://api.dicebear.com/7.x/micah/png?seed=DiegoCastro'
  }
];
