import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    photo_url: 'https://api.slingacademy.com/public/sample-products/1.png',
    name: 'Remera básica',
    sku: '1001',
    gender: 'men',
    sizes: 'normal-t1-t5',
    colors: ['black', 'white'],
    cost_price: 8000,
    sale_price: 12000,
    has_discount: true,
    discount_percentage: 20,
    is_active: true,
    stock: {
      t1: 8,
      t2: 10,
      t3: 9,
      t4: 7,
      t5: 6
    },
    description: 'Remera básica de algodón para uso diario.',
    category: 'T-shirts',
    updated_at: '2025-08-10T10:00:00Z',
    created_at: '2025-07-15T12:00:00Z'
  },
  {
    id: 2,
    photo_url: 'https://api.slingacademy.com/public/sample-products/2.png',
    name: 'Pantalón entallado',
    sku: '2002',
    gender: 'women',
    sizes: 'dama-t36-t46',
    colors: ['blue', 'black'],
    cost_price: 20000,
    sale_price: 32000,
    has_discount: false,
    is_active: true,
    stock: {
      t36: 5,
      t38: 6,
      t40: 5,
      t42: 4,
      t44: 3,
      t46: 2
    },
    description: 'Jean entallado para un look moderno.',
    category: 'Pants',
    updated_at: '2025-08-11T09:00:00Z',
    created_at: '2025-07-12T14:00:00Z'
  },
  {
    id: 3,
    photo_url: 'https://api.slingacademy.com/public/sample-products/3.png',
    name: 'Blusa casual',
    sku: '2003',
    gender: 'women',
    sizes: 'dama-normal-t36-t48',
    colors: ['pink', 'white'],
    cost_price: 15000,
    sale_price: 22000,
    has_discount: true,
    discount_percentage: 10,
    is_active: true,
    stock: {
      t36: 5,
      t38: 6,
      t40: 7,
      t42: 5,
      t44: 4,
      t46: 2,
      t48: 1
    },
    description: 'Blusa liviana y suave para verano.',
    category: 'Blouses',
    updated_at: '2025-08-11T15:00:00Z',
    created_at: '2025-07-18T16:00:00Z'
  },
  {
    id: 4,
    photo_url: 'https://api.slingacademy.com/public/sample-products/4.png',
    name: 'Buzo con capucha',
    sku: '9004',
    gender: 'unisex',
    sizes: 'normal-t1-t6',
    colors: ['green', 'black'],
    cost_price: 22000,
    sale_price: 30000,
    has_discount: true,
    discount_percentage: 15,
    is_active: true,
    stock: {
      t1: 10,
      t2: 8,
      t3: 9,
      t4: 8,
      t5: 8,
      t6: 7
    },
    description: 'Buzo cálido y cómodo.',
    category: 'Sweatshirts',
    updated_at: '2025-08-12T10:00:00Z',
    created_at: '2025-07-20T10:00:00Z'
  },
  {
    id: 5,
    photo_url: 'https://api.slingacademy.com/public/sample-products/5.png',
    name: 'Short deportivo',
    sku: '1005',
    gender: 'men',
    sizes: 'normal-t1-t5',
    colors: ['blue', 'yellow'],
    cost_price: 12000,
    sale_price: 18000,
    has_discount: false,
    is_active: true,
    stock: {
      t1: 12,
      t2: 13,
      t3: 11,
      t4: 12,
      t5: 12
    },
    description: 'Short respirable para entrenamientos.',
    category: 'Sportswear',
    updated_at: '2025-08-13T11:00:00Z',
    created_at: '2025-07-22T13:00:00Z'
  },
  {
    id: 6,
    photo_url: 'https://api.slingacademy.com/public/sample-products/6.png',
    name: 'Campera térmica',
    sku: '9006',
    gender: 'unisex',
    sizes: 'especial-t6-t10',
    colors: ['black', 'blue'],
    cost_price: 30000,
    sale_price: 42000,
    has_discount: true,
    discount_percentage: 25,
    is_active: true,
    stock: {
      t6: 3,
      t7: 3,
      t8: 3,
      t9: 3,
      t10: 3
    },
    description: 'Campera térmica aislada para invierno.',
    category: 'Winter',
    updated_at: '2025-08-13T14:00:00Z',
    created_at: '2025-07-23T14:00:00Z'
  },
  {
    id: 7,
    photo_url: 'https://api.slingacademy.com/public/sample-products/7.png',
    name: 'Polo casual',
    sku: '1007',
    gender: 'men',
    sizes: 'normal-t1-t5',
    colors: ['white', 'blue'],
    cost_price: 18000,
    sale_price: 26000,
    has_discount: false,
    is_active: true,
    stock: {
      t1: 4,
      t2: 5,
      t3: 5,
      t4: 4,
      t5: 4
    },
    description: 'Polo de algodón con estilo clásico.',
    category: 'T-shirts',
    updated_at: '2025-08-14T09:00:00Z',
    created_at: '2025-07-24T11:00:00Z'
  },
  {
    id: 8,
    photo_url: 'https://api.slingacademy.com/public/sample-products/8.png',
    name: 'Vestido de verano',
    sku: '2008',
    gender: 'women',
    sizes: 'dama-normal-t36-t48',
    colors: ['yellow', 'red'],
    cost_price: 20000,
    sale_price: 28000,
    has_discount: true,
    discount_percentage: 20,
    is_active: true,
    stock: {
      t36: 3,
      t38: 3,
      t40: 4,
      t42: 3,
      t44: 3,
      t46: 1,
      t48: 1
    },
    description: 'Vestido liviano ideal para días de calor.',
    category: 'Summer',
    updated_at: '2025-08-14T13:00:00Z',
    created_at: '2025-07-25T10:00:00Z'
  },
  {
    id: 9,
    photo_url: 'https://api.slingacademy.com/public/sample-products/9.png',
    name: 'Buzo para niños',
    sku: '3009',
    gender: 'kids',
    sizes: 'ninos-t4-t16',
    colors: ['purple', 'pink'],
    cost_price: 14000,
    sale_price: 20000,
    has_discount: false,
    is_active: true,
    stock: {
      t4: 2,
      t6: 3,
      t8: 4,
      t10: 4,
      t12: 3,
      t14: 2,
      t16: 2
    },
    description: 'Buzo abrigado para niños con tela suave.',
    category: 'Sweatshirts',
    updated_at: '2025-08-15T12:00:00Z',
    created_at: '2025-07-26T12:00:00Z'
  },
  {
    id: 10,
    photo_url: 'https://api.slingacademy.com/public/sample-products/10.png',
    name: 'Body para bebé',
    sku: '5010',
    gender: 'baby',
    sizes: 'bebe-t1-t5',
    colors: ['white', 'blue'],
    cost_price: 6000,
    sale_price: 9500,
    has_discount: true,
    discount_percentage: 10,
    is_active: true,
    stock: {
      t1: 7,
      t2: 7,
      t3: 7,
      t4: 7,
      t5: 7
    },
    description: 'Body de algodón suave para bebés.',
    category: 'Underwear',
    updated_at: '2025-08-16T14:00:00Z',
    created_at: '2025-07-27T14:00:00Z'
  }
];

export const categories = [
  'Clothing',
  'T-shirts',
  'Pants',
  'Blouses',
  'Sweatshirts',
  'Home',
  'Sportswear',
  'Kitchen',
  'Underwear',
  'Winter',
  'Summer'
];
export const genders = ['male', 'female', 'unisex', 'kids', 'baby'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL'];
export const colors = [
  'red',
  'blue',
  'green',
  'black',
  'white',
  'yellow',
  'pink',
  'purple'
];

export const SEGMENT_OPTIONS = [
  { label: 'Hombre', value: JSON.stringify({ code: 1, name: 'hombre' }) },
  { label: 'Dama', value: JSON.stringify({ code: 2, name: 'dama' }) },
  { label: 'Nene', value: JSON.stringify({ code: 3, name: 'nene' }) },
  { label: 'Nena', value: JSON.stringify({ code: 4, name: 'nena' }) },
  { label: 'Bebé', value: JSON.stringify({ code: 5, name: 'bebe' }) },
  { label: 'Beba', value: JSON.stringify({ code: 6, name: 'beba' }) },
  { label: 'Otros', value: JSON.stringify({ code: 7, name: 'otros' }) },
  {
    label: 'Ropa interior',
    value: JSON.stringify({ code: 8, name: 'ropa interior' })
  },
  {
    label: 'Ropa interior importada',
    value: JSON.stringify({ code: 9, name: 'ropa interior importada' })
  }
];

export const SEASON_OPTIONS = [
  { label: 'Invierno', value: 'winter' },
  { label: 'Verano', value: 'summer' },
  { label: 'Temporada', value: 'seasonal' }
];

export const PACK_SIZE_OPTIONS = [
  { label: 'x1', value: '1' },
  { label: 'x6', value: '6' },
  { label: 'x12', value: '12' }
];
