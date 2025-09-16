import { NewOrder } from '@/types/order-new';

export const newOrderMock: NewOrder[] = [
  {
    _id: '66d7c72a3a2c9f5e9a1b1234',
    customer: {
      customerId: '1',
      snapshot: {
        firstName: 'Santiago',
        lastName: 'Barreto',
        dni: '39320266',
        email: 'palmirabarrett@gmail.com',
        phone: {
          areaCode: '3718',
          number: '441861'
        }
      },
      stats: {
        cancelledOrders: 0,
        rejectedOrders: 0
      }
    },
    payment_method: 'cash',
    items: [
      {
        _id: '5b48cc25-6441-40f5-9a57-ad79be6e619a',
        product_sku: '1001',
        name: 'Blusa casual',
        quantity: 2,
        size: 'XL',
        price: 22000,
        total_mount: 44000
      }
    ],
    shipping_information: {
      delivery_option: 'delivery',
      adress: 'Necochea 248',
      locality: 'Itaibate',
      shipping_type: 'express'
    },
    summary: {
      items_total: 44000,
      shipping_cost: 2500,
      grand_total: 46500
    },
    status: 'pending',
    createdAt: '2025-09-04T18:00:00.000Z',
    updatedAt: '2025-09-04T18:00:00.000Z'
  },
  {
    _id: '66d7c72a3a2c9f5e9a1b5678',
    customer: {
      customerId: '2',
      snapshot: {
        firstName: 'Mariana',
        lastName: 'López',
        dni: '40211333',
        email: 'mariana.lopez@example.com',
        phone: {
          areaCode: '379',
          number: '5553322'
        }
      },
      stats: {
        cancelledOrders: 1,
        rejectedOrders: 0
      }
    },
    payment_method: 'transfer',
    items: [
      {
        _id: 'c1b9a0c8-4b4e-4b18-bf99-9c2a97c9d01a',
        product_sku: '2002',
        name: 'Vestido de verano',
        quantity: 1,
        size: 'M',
        price: 35000,
        total_mount: 35000
      },
      {
        _id: '6a34a2fa-7b8b-4e62-9df9-8763c9bc9f2b',
        product_sku: '2003',
        name: 'Sandalias negras',
        quantity: 1,
        price: 18000,
        total_mount: 18000
      }
    ],
    shipping_information: {
      delivery_option: 'pickup'
    },
    summary: {
      items_total: 53000,
      shipping_cost: 0,
      grand_total: 53000
    },
    status: 'confirmed',
    createdAt: '2025-09-05T12:30:00.000Z',
    updatedAt: '2025-09-05T12:45:00.000Z'
  },
  {
    _id: '66d7c72a3a2c9f5e9a1b9012',
    customer: {
      customerId: '3',
      snapshot: {
        firstName: 'Ricardo',
        lastName: 'Fernández',
        dni: '37888999',
        email: 'ricardo.fernandez@example.com',
        phone: {
          areaCode: '3783',
          number: '447890'
        }
      },
      stats: {
        cancelledOrders: 0,
        rejectedOrders: 1
      }
    },
    payment_method: 'cash',
    items: [
      {
        _id: 'bb1f07e7-7f6c-4d24-b8f5-6d7c2c0fae45',
        product_sku: '3005',
        name: 'Campera de jean',
        quantity: 1,
        size: 'L',
        price: 42000,
        total_mount: 42000,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Mancha en el bolsillo',
        unavailable: false
      },
      {
        _id: 'bb1f07e7-7f6c-4d24-b8f5-6d7c2c0fae46',
        product_sku: '3006',
        name: 'Zapatillas urbanas',
        quantity: 2,
        price: 28000,
        total_mount: 56000
      }
    ],
    shipping_information: {
      delivery_option: 'delivery',
      adress: 'San Martín 455',
      locality: 'Corrientes',
      shipping_type: 'standard'
    },
    summary: {
      items_total: 98000,
      shipping_cost: 3000,
      grand_total: 101000
    },
    status: 'delivered',
    createdAt: '2025-09-06T09:15:00.000Z',
    updatedAt: '2025-09-07T08:45:00.000Z'
  }
];

export const STATUS = [
  { label: 'Pendiente', value: 'pending', number: 1, variant: 'outline' },
  { label: 'Confirmado', value: 'confirmed', number: 2, variant: 'default' },
  { label: 'Enviando', value: 'sending', number: 3, variant: 'secondary' },
  { label: 'Entregado', value: 'delivered', number: 4, variant: 'default' },
  { label: 'Cancelado', value: 'canceled', number: 5, variant: 'destructive' }
];
