import { Order } from '../order-mock-api';

export const ordersMock: Order[] = [
  {
    id: 'ORD-0001',
    user_id: '1',
    user_name: 'María González',
    total: 1438,
    status: 'processing',
    created_at: '2025-07-25T00:18:28',
    payment_method: 'efectivo',
    products: [
      {
        id: '0804c9b0-83bd-4a89-95fd-4acdd03718d8',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 2,
        unit_price: 719,
        subtotal: 1438,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0002',
    user_id: '2',
    user_name: 'Carlos Rodríguez',
    total: 3575.6,
    status: 'sending',
    created_at: '2025-08-01T03:39:20',
    payment_method: 'transferencia',
    products: [
      {
        id: '586b6940-4fe7-4633-81f6-183e431cf07d',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 1,
        unit_price: 395,
        subtotal: 395,
        defective: false
      },
      {
        id: '7bb6f998-4399-470f-83d6-02655e5c13f0',
        product_sku: 'SKU-007',
        product_name: 'east',
        quantity: 3,
        unit_price: 485,
        subtotal: 1455,
        defective: false
      },
      {
        id: 'eea7fb1c-1354-4875-be11-2c074a39e7cc',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 3,
        unit_price: 719,
        subtotal: 1725.6,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Mancha de tinta en la tela'
      }
    ]
  },
  {
    id: 'ORD-0003',
    user_id: '3',
    user_name: 'Ana Martínez',
    total: 901.2,
    status: 'sending',
    created_at: '2025-06-23T14:39:56',
    payment_method: 'efectivo',
    products: [
      {
        id: 'a0a71c54-57f4-4921-b266-5dbdef355da3',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 790,
        defective: false
      },
      {
        id: 'bec7c24a-f2e7-4e9c-a41e-91b306a964d2',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 1,
        unit_price: 139,
        subtotal: 111.2,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura suelta en la manga'
      }
    ]
  },
  {
    id: 'ORD-0004',
    user_id: '4',
    user_name: 'Luis Fernández',
    total: 3836.0,
    status: 'sending',
    created_at: '2025-07-04T09:26:18',
    payment_method: 'transferencia',
    products: [
      {
        id: '0f94e2c2-7776-42c9-a181-5969e8a67ee0',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 3,
        unit_price: 139,
        subtotal: 333.6,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Tela desgastada en cuello'
      },
      {
        id: 'bd9007f3-51ba-47eb-8e08-b979bf1ca2c4',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 2,
        unit_price: 764,
        subtotal: 1222.4,
        defective: true,
        defective_quantity: 2,
        defect_comment: 'Botón faltante'
      }
    ]
  },
  {
    id: 'ORD-0005',
    user_id: '5',
    user_name: 'Sofía Pérez',
    total: 4406.2,
    status: 'processing',
    created_at: '2025-07-30T15:54:05',
    payment_method: 'efectivo',
    products: [
      {
        id: '870da433-327c-4e83-96bb-3511845956c0',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 2,
        unit_price: 759,
        subtotal: 1518,
        defective: false
      },
      {
        id: 'b04acacf-8614-4b70-b566-8cbc081fe0a2',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 3,
        unit_price: 759,
        subtotal: 2277,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0006',
    user_id: '6',
    user_name: 'Martín Gómez',
    total: 534.4,
    status: 'processing',
    created_at: '2025-07-27T08:32:22',
    payment_method: 'transferencia',
    products: [
      {
        id: '3069bc48-8866-488f-8782-abd9be6c80ba',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 1,
        unit_price: 395,
        subtotal: 316.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Rasguño en la tela'
      },
      {
        id: '02a890c0-006a-487c-9e1c-50961c3fb618',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 1,
        unit_price: 273,
        subtotal: 218.4,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura floja en dobladillo'
      }
    ]
  },
  {
    id: 'ORD-0007',
    user_id: '7',
    user_name: 'Verónica López',
    total: 1220,
    status: 'rejected',
    created_at: '2025-08-02T10:15:00',
    payment_method: 'efectivo',
    products: [
      {
        id: 'f1a2b3c4-5678-1234-9abc-1a2b3c4d5e6f',
        product_sku: 'SKU-002',
        product_name: 'jacket',
        quantity: 2,
        unit_price: 610,
        subtotal: 1220,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0008',
    user_id: '8',
    user_name: 'Diego Torres',
    total: 890,
    status: 'cancelled',
    created_at: '2025-08-03T12:22:18',
    payment_method: 'transferencia',
    products: [
      {
        id: 'g7h8i9j0-1234-5678-9abc-1a2b3c4d5e6f',
        product_sku: 'SKU-009',
        product_name: 'sneakers',
        quantity: 1,
        unit_price: 890,
        subtotal: 890,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0009',
    user_id: '9',
    user_name: 'Florencia Ramírez',
    total: 1340,
    status: 'rejected',
    created_at: '2025-08-05T16:45:30',
    payment_method: 'efectivo',
    products: [
      {
        id: 'k1l2m3n4-5678-1234-9abc-1a2b3c4d5e6f',
        product_sku: 'SKU-011',
        product_name: 'hat',
        quantity: 4,
        unit_price: 335,
        subtotal: 1340,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura defectuosa'
      }
    ]
  },
  {
    id: 'ORD-0010',
    user_id: '10',
    user_name: 'Javier Méndez',
    total: 2700,
    status: 'cancelled',
    created_at: '2025-08-06T09:05:12',
    payment_method: 'transferencia',
    products: [
      {
        id: 'o5p6q7r8-1234-5678-9abc-1a2b3c4d5e6f',
        product_sku: 'SKU-012',
        product_name: 'coat',
        quantity: 3,
        unit_price: 900,
        subtotal: 2700,
        defective: false
      }
    ]
  }
];
