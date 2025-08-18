import { Order } from '../order-mock-api';

export const ordersMock: Order[] = [
  {
    id: 'ORD-0001',
    user_id: 'c507af86-a97c-4732-8d03-11026b85be66',
    user_name: 'Richard Butler',
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
    user_id: '830147f3-9a7c-42f7-ac0f-8099e50f5ebb',
    user_name: 'Heather Glass',
    total: 3575.6000000000004,
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
        subtotal: 1725.6000000000001,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0003',
    user_id: 'd1a12813-ba2a-4f32-921d-bec659883498',
    user_name: 'Martin Richmond',
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
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0004',
    user_id: '9b51cda4-302f-4a58-99cc-b62c41aefe16',
    user_name: 'David Tran',
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
        defective: true
      },
      {
        id: 'bd9007f3-51ba-47eb-8e08-b979bf1ca2c4',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 2,
        unit_price: 764,
        subtotal: 1222.4,
        defective: true
      },
      {
        id: '38fbe3c8-c18a-4818-96ef-7f38d05fd5cd',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 632.0,
        defective: true
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
    user_id: '4ac49ab5-f58f-454a-8aef-bf2a90eacd98',
    user_name: 'Paige Ford',
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
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0006',
    user_id: 'bd36e5d8-afa1-4246-bdd9-10ed93c70014',
    user_name: 'Michael Newman',
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
        defective: true
      },
      {
        id: '02a890c0-006a-487c-9e1c-50961c3fb618',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 1,
        unit_price: 273,
        subtotal: 218.4,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0007',
    user_id: 'ec1f8e0c-a58a-40a4-b410-03252c5e39f8',
    user_name: 'Jack Johnston',
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
        defective: true
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
    user_id: '46134f71-dd59-4f87-94ed-0910c96ed409',
    user_name: 'Charles Fisher',
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
        defective: true
      },
      {
        id: 'e363112b-19c2-455f-8308-3e7b92ed5632',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 1,
        unit_price: 719,
        subtotal: 575.2,
        defective: true
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
    user_id: '6c83a7dc-4314-4a8b-871d-95b26d66ec7d',
    user_name: 'Matthew Benson',
    total: 4017.6000000000004,
    status: 'processing',
    created_at: '2025-08-13T13:59:08',
    products: [
      {
        id: '6264a221-4f55-4f45-a3e8-1aeaf2aed5f0',
        product_sku: 'SKU-004',
        product_name: 'discuss',
        quantity: 3,
        unit_price: 719,
        subtotal: 1725.6000000000001,
        defective: true
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
    id: 'ORD-0010',
    user_id: '234d0259-08e2-44b7-8be6-eb948cc36040',
    user_name: 'Bryan Robinson',
    total: 440.8,
    status: 'cancelled',
    created_at: '2025-06-20T22:48:37',
    products: [
      {
        id: 'b09399e8-7dc7-40c5-a372-2785d5859e98',
        product_sku: 'SKU-009',
        product_name: 'behind',
        quantity: 1,
        unit_price: 551,
        subtotal: 440.8,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0011',
    user_id: '6c6644ed-c716-4326-a68c-620aad58f7c7',
    user_name: 'John David',
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
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0012',
    user_id: '64d709a5-6616-4b66-9eae-e90e2819f390',
    user_name: 'Tiffany Mcdowell',
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
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0013',
    user_id: '0c611c8a-8820-41ed-b42f-9374f970333c',
    user_name: 'Andrew Simon',
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
        defective: true
      },
      {
        id: '4ce674f6-1750-48b0-92da-2e7a0fc1b312',
        product_sku: 'SKU-001',
        product_name: 'try',
        quantity: 3,
        unit_price: 910,
        subtotal: 2184.0,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0014',
    user_id: 'b9632ebe-aa9f-41a9-aecd-5f162fdeacb0',
    user_name: 'Michele Strong',
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
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0015',
    user_id: 'a5a33348-cc90-4dc6-be4f-733954f884ab',
    user_name: 'Zachary Turner',
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
        defective: true
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
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0016',
    user_id: '0e4f1918-fe79-4a16-9551-0963e79441dc',
    user_name: 'Travis Wilson',
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
        defective: true
      },
      {
        id: 'e81d3586-4d62-4cc4-8e9e-bcc45cbf172b',
        product_sku: 'SKU-009',
        product_name: 'behind',
        quantity: 1,
        unit_price: 551,
        subtotal: 440.8,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0017',
    user_id: '30066016-0d5c-4f57-8a68-812046af0e11',
    user_name: 'John Lee',
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
        defective: true
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
    user_id: 'a7aac0b6-60d1-47d4-ae7d-31fe0f6d2f0e',
    user_name: 'Wesley Dawson',
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
        defective: true
      },
      {
        id: '781a1a06-746b-413e-ba18-44248383e2c3',
        product_sku: 'SKU-008',
        product_name: 'health',
        quantity: 2,
        unit_price: 273,
        subtotal: 436.8,
        defective: true
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
    user_id: '96643eff-fa09-4999-90f3-08b4d7a92d30',
    user_name: 'Adrian Singh',
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
        defective: true
      },
      {
        id: 'bda10ece-800d-4986-b1b4-32be942e45f3',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 3,
        unit_price: 139,
        subtotal: 333.6,
        defective: true
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
    user_id: 'c32ac458-38e1-49bb-b3e4-bd8ef834b41b',
    user_name: 'Stacy Howard',
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
        defective: true
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
  },
  {
    id: 'ORD-0021',
    user_id: 'c1b51e08-cf02-4d48-a410-dd45205f1f57',
    user_name: 'Kimberly Carroll',
    total: 4054,
    status: 'delivered',
    created_at: '2025-08-11T01:14:04',
    products: [
      {
        id: '4251d894-346f-406e-8c25-39ae14614471',
        product_sku: 'SKU-002',
        product_name: 'method',
        quantity: 1,
        unit_price: 972,
        subtotal: 972,
        defective: false
      },
      {
        id: '4021dc75-308e-42d1-bec0-9f041d66076d',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 3,
        unit_price: 764,
        subtotal: 2292,
        defective: false
      },
      {
        id: '30fc270b-0394-4a43-99b2-46faf86e30db',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 790,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0022',
    user_id: '6e641f56-a54b-454b-94f9-2352d40513d6',
    user_name: 'James Taylor',
    total: 4659.4,
    status: 'shipped',
    created_at: '2025-07-03T05:54:30',
    products: [
      {
        id: '8a8925e2-1ea1-42c6-9cc0-5c9e5c1e937d',
        product_sku: 'SKU-001',
        product_name: 'try',
        quantity: 3,
        unit_price: 910,
        subtotal: 2730,
        defective: false
      },
      {
        id: '144a95f3-c2fe-49fc-9646-70ccd36629bc',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 3,
        unit_price: 395,
        subtotal: 948.0,
        defective: true
      },
      {
        id: '85d50424-66b2-40f9-ae9b-80a968871403',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 1,
        unit_price: 759,
        subtotal: 759,
        defective: false
      },
      {
        id: 'd3833e99-2218-4994-aa92-3acb8bf4e3da',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 2,
        unit_price: 139,
        subtotal: 222.4,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0023',
    user_id: '7ba424cb-3eba-41b7-91ce-da16c364fea2',
    user_name: 'Sydney Stewart',
    total: 6769.8,
    status: 'delivered',
    created_at: '2025-07-05T23:00:12',
    products: [
      {
        id: '2e9fb3b9-d811-4d2a-8956-765c89392efe',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 2,
        unit_price: 764,
        subtotal: 1528,
        defective: false
      },
      {
        id: '151d7b4e-5a6e-4aa9-8d64-e2c6061f44e3',
        product_sku: 'SKU-010',
        product_name: 'any',
        quantity: 2,
        unit_price: 395,
        subtotal: 632.0,
        defective: true
      },
      {
        id: '6b761e85-0199-485d-8f3d-9dc107823276',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 3,
        unit_price: 759,
        subtotal: 2277,
        defective: false
      },
      {
        id: '6527c778-8337-4435-a712-6a4843a3c99d',
        product_sku: 'SKU-002',
        product_name: 'method',
        quantity: 3,
        unit_price: 972,
        subtotal: 2332.8,
        defective: true
      }
    ]
  },
  {
    id: 'ORD-0024',
    user_id: '83c33cfc-9a90-4a4c-a7db-d99ca745433e',
    user_name: 'Matthew Navarro',
    total: 2056.2,
    status: 'delivered',
    created_at: '2025-08-10T05:20:42',
    products: [
      {
        id: '3e4e9891-c4b7-4426-956f-16a8589b2998',
        product_sku: 'SKU-003',
        product_name: 'fly',
        quantity: 2,
        unit_price: 764,
        subtotal: 1528,
        defective: false
      },
      {
        id: '649c65fd-9625-493b-a86b-cceab50d3b6d',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 1,
        unit_price: 139,
        subtotal: 111.2,
        defective: true
      },
      {
        id: '0b6e48a8-2462-4873-abc8-64d501993dc4',
        product_sku: 'SKU-006',
        product_name: 'season',
        quantity: 3,
        unit_price: 139,
        subtotal: 417,
        defective: false
      }
    ]
  },
  {
    id: 'ORD-0025',
    user_id: '6d9898ba-5ac8-4d65-b4c8-f6f0cf26704c',
    user_name: 'David Valenzuela',
    total: 8084.8,
    status: 'shipped',
    created_at: '2025-06-22T13:51:07',
    products: [
      {
        id: '63285ec9-76dc-4913-8ddf-3c25a2efd696',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 2,
        unit_price: 759,
        subtotal: 1214.4,
        defective: true
      },
      {
        id: '7976b33e-35fb-428c-9e91-78f3ec7a8789',
        product_sku: 'SKU-009',
        product_name: 'behind',
        quantity: 2,
        unit_price: 551,
        subtotal: 1102,
        defective: false
      },
      {
        id: '553bdecc-a741-451e-bc49-78dbdf0a7c53',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 2,
        unit_price: 759,
        subtotal: 1214.4,
        defective: true
      },
      {
        id: 'b435dfa6-1972-43e9-bd22-4460662da2c1',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 3,
        unit_price: 759,
        subtotal: 2277,
        defective: false
      },
      {
        id: 'a1642a4b-49de-45de-8da0-9d711c7724d9',
        product_sku: 'SKU-005',
        product_name: 'wife',
        quantity: 3,
        unit_price: 759,
        subtotal: 2277,
        defective: false
      }
    ]
  }
];
