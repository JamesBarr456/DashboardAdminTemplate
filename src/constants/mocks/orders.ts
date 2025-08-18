import { Order } from '../order-mock-api';

export const ordersMock: Order[] = [
  {
    id: 'ORD-0001',
    user_id: '1',
    total: 1438,
    status: 'processing',
    created_at: '2025-07-25T00:18:28',
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
    total: 3575.6,
    status: 'delivered',
    created_at: '2025-08-01T03:39:20',
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
    total: 901.2,
    status: 'delivered',
    created_at: '2025-06-23T14:39:56',
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
    total: 3836.0,
    status: 'delivered',
    created_at: '2025-07-04T09:26:18',
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
      },
      {
        id: '38fbe3c8-c18a-4818-96ef-7f38d05fd5cd',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 632.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeña mancha de café'
      },
      {
        id: '866ab77c-863e-4d15-9d28-6bf080277c44',
        product_sku: 'SKU-009',
        product_name: 'behind',
        quantity: 2,
        unit_price: 551,
        subtotal: 1102,
        defective: false
      },
      {
        id: 'c0c50a57-02ae-4a6d-9a85-4b80be394bbc',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 2,
        unit_price: 273,
        subtotal: 546,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0005',
    user_id: '5',
    total: 4406.2,
    status: 'processing',
    created_at: '2025-07-30T15:54:05',
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
      },
      {
        id: '523e78ce-1d71-4cb3-ac6b-3f667f3878c2',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 1,
        unit_price: 764,
        subtotal: 611.2,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeño agujero en costura lateral'
      }
    ]
  },
  {
    id: 'ORD-0006',
    user_id: '6',
    total: 534.4,
    status: 'processing',
    created_at: '2025-07-27T08:32:22',
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
    total: 1933.4,
    status: 'processing',
    created_at: '2025-06-20T10:42:41',
    products: [
      {
        id: '04e6d6f4-e4ea-4f0b-bab0-8abbd7448776',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 2,
        unit_price: 759,
        subtotal: 1214.4,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Mancha de pintura'
      },
      {
        id: '4b7cc5a1-8263-4501-abe5-9312485db4db',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 1,
        unit_price: 719,
        subtotal: 719,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0008',
    user_id: '8',
    total: 1514.2,
    status: 'cancelled',
    created_at: '2025-07-06T23:20:23',
    products: [
      {
        id: '02478499-d3aa-43f7-8fcb-ede0ffdd41e7',
        product_sku: 'SKU-007',
        product_name: 'east',
        quantity: 1,
        unit_price: 485,
        subtotal: 388.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura rota en hombro'
      },
      {
        id: 'e363112b-19c2-455f-8308-3e7b92ed5632',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 1,
        unit_price: 719,
        subtotal: 575.2,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeña mancha de vino'
      },
      {
        id: 'a67bb1ac-f699-4a54-b64e-4ac44c119270',
        product_sku: 'SKU-009',
        product_name: 'behind',
        quantity: 1,
        unit_price: 551,
        subtotal: 551,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0009',
    user_id: '9',
    total: 4017.6,
    status: 'processing',
    created_at: '2025-08-13T13:59:08',
    products: [
      {
        id: '6264a221-4f55-4f45-a3e8-1aeaf2aed5f0',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 3,
        unit_price: 719,
        subtotal: 1725.6,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Rasguño leve en espalda'
      },
      {
        id: 'b5bbf89b-4524-4710-b34d-e457db12a710',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 3,
        unit_price: 764,
        subtotal: 2292,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0011',
    user_id: '1',
    total: 3551.6,
    status: 'delivered',
    created_at: '2025-06-30T00:57:23',
    products: [
      {
        id: 'fb695a63-075d-4172-be48-ea6d073dc80c',
        product_sku: 'SKU-001',
        product_name: 'try',
        quantity: 1,
        unit_price: 910,
        subtotal: 910,
        defective: false
      },
      {
        id: 'f3d8a629-8ae8-4270-87b6-04a89559b6b5',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 2,
        unit_price: 759,
        subtotal: 1518,
        defective: false
      },
      {
        id: '47a6f897-b53a-4b38-a44e-254d609712fe',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 790,
        defective: false
      },
      {
        id: '83295bf5-6f86-44f0-97bd-dd9c2b6dd280',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 3,
        unit_price: 139,
        subtotal: 333.6,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura suelta en la parte trasera'
      }
    ]
  },
  {
    id: 'ORD-0012',
    user_id: '2',
    total: 632.0,
    status: 'shipped',
    created_at: '2025-08-06T09:45:02',
    products: [
      {
        id: '7fbad41a-3875-443e-bfb6-e7265e99c34e',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 632.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeña mancha de vino en el frente'
      }
    ]
  },
  {
    id: 'ORD-0013',
    user_id: '3',
    total: 2572.0,
    status: 'processing',
    created_at: '2025-07-02T19:19:24',
    products: [
      {
        id: '3d2b998a-e72c-4306-861c-c1cbc9daad78',
        product_sku: 'SKU-007',
        product_name: 'east',
        quantity: 1,
        unit_price: 485,
        subtotal: 388.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Rasguño en la manga'
      },
      {
        id: '4ce674f6-1750-48b0-92da-2e7a0fc1b312',
        product_sku: 'SKU-001',
        product_name: 'try',
        quantity: 3,
        unit_price: 910,
        subtotal: 2184.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Botón faltante en la parte delantera'
      }
    ]
  },
  {
    id: 'ORD-0014',
    user_id: '4',
    total: 3307.4,
    status: 'shipped',
    created_at: '2025-07-03T15:56:26',
    products: [
      {
        id: 'aff626b2-ec8b-447b-8a02-44026c2971f6',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 3,
        unit_price: 719,
        subtotal: 2157,
        defective: false
      },
      {
        id: 'c170f111-e828-4507-992c-237f2fbcfc65',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 2,
        unit_price: 719,
        subtotal: 1150.4,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeña mancha de café en la manga'
      }
    ]
  },
  {
    id: 'ORD-0015',
    user_id: '5',
    total: 3622.4,
    status: 'delivered',
    created_at: '2025-08-08T07:54:08',
    products: [
      {
        id: 'bb91de58-85f5-4704-9c23-c5bfa6c89c95',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 2,
        unit_price: 139,
        subtotal: 222.4,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura floja en dobladillo'
      },
      {
        id: 'f354146d-df10-4ff1-9ec8-6c86a52f58f2',
        product_sku: 'SKU-002',
        product_name: 'method',
        quantity: 2,
        unit_price: 972,
        subtotal: 1944,
        defective: false
      },
      {
        id: '60e6ac2b-8baf-4528-bdab-d93de7d10649',
        product_sku: 'SKU-001',
        product_name: 'try',
        quantity: 2,
        unit_price: 910,
        subtotal: 1456.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Rasguño leve en el lateral'
      }
    ]
  },
  {
    id: 'ORD-0016',
    user_id: '6',
    total: 1996.0,
    status: 'cancelled',
    created_at: '2025-08-17T06:00:35',
    products: [
      {
        id: 'e4e36b6e-bd20-4bd3-86c1-40f24f38ae9d',
        product_sku: 'SKU-002',
        product_name: 'method',
        quantity: 2,
        unit_price: 972,
        subtotal: 1555.2,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Mancha de tinta en la espalda'
      },
      {
        id: 'e81d3586-4d62-4cc4-8e9e-bcc45cbf172b',
        product_sku: 'SKU-009',
        product_name: 'behind',
        quantity: 1,
        unit_price: 551,
        subtotal: 440.8,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura suelta en el cuello'
      }
    ]
  },
  {
    id: 'ORD-0017',
    user_id: '7',
    total: 5248.0,
    status: 'cancelled',
    created_at: '2025-07-30T19:17:30',
    products: [
      {
        id: 'fdce4349-ad77-4f92-be8e-dd340410669b',
        product_sku: 'SKU-002',
        product_name: 'method',
        quantity: 3,
        unit_price: 972,
        subtotal: 2916,
        defective: false
      },
      {
        id: '8a94332f-137e-41a8-8aa9-54c59963d63c',
        product_sku: 'SKU-007',
        product_name: 'east',
        quantity: 1,
        unit_price: 485,
        subtotal: 388.0,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeña mancha de vino'
      },
      {
        id: 'f47024da-1cbd-4ea5-a06f-03ca7e111fb9',
        product_sku: 'SKU-002',
        product_name: 'method',
        quantity: 2,
        unit_price: 972,
        subtotal: 1944,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0018',
    user_id: '8',
    total: 3438.6,
    status: 'shipped',
    created_at: '2025-07-05T04:06:12',
    products: [
      {
        id: '4b543d0b-7c25-420e-a997-0aaaffcb9d5d',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 2,
        unit_price: 273,
        subtotal: 436.8,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeña rasgadura en la costura lateral'
      },
      {
        id: '781a1a06-746b-413e-ba18-44248383e2c3',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 2,
        unit_price: 273,
        subtotal: 436.8,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Costura floja en dobladillo'
      },
      {
        id: 'f9a0419d-1c44-4d49-9507-561839f322fe',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 3,
        unit_price: 764,
        subtotal: 2292,
        defective: false
      },
      {
        id: '1d2ca908-5590-441b-b9f6-04aeb920d797',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 1,
        unit_price: 273,
        subtotal: 273,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0019',
    user_id: '9',
    total: 2994.0,
    status: 'pending',
    created_at: '2025-06-26T21:37:41',
    products: [
      {
        id: 'f6775c91-b5cc-48b4-8651-e822a1284c0d',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 2,
        unit_price: 764,
        subtotal: 1222.4,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Pequeño agujero en costura lateral'
      },
      {
        id: 'bda10ece-800d-4986-b1b4-32be942e45f3',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 3,
        unit_price: 139,
        subtotal: 333.6,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Mancha de tinta en el frente'
      },
      {
        id: '32103453-8238-4ab1-8c1b-4b4064b3919f',
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
    id: 'ORD-0020',
    user_id: '10',
    total: 1943.2,
    status: 'shipped',
    created_at: '2025-06-21T01:44:20',
    products: [
      {
        id: '7e0befc2-3c77-48c1-a29e-3f0a8ed2e774',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 2,
        unit_price: 273,
        subtotal: 546,
        defective: false
      },
      {
        id: '72aef969-eec8-494b-9a30-475bbc97b3cb',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 1,
        unit_price: 759,
        subtotal: 607.2,
        defective: true,
        defective_quantity: 1,
        defect_comment: 'Rasguño leve en la tela'
      },
      {
        id: 'fb370dc7-b445-4621-9ef1-b21d69cf97f0',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 790,
        defective: false
      }
    ]
  }
];
