import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    category: 'T-shirts',
    images: [
      'https://api.slingacademy.com/public/sample-products/1.png',
      'https://api.slingacademy.com/public/sample-products/2.png'
    ],
    sku: '1001',
    name: 'Remera básica',
    brand: 'Acme',
    description: 'Remera básica de algodón para uso diario.',
    segment: { code: 1, name: 'hombre' },
    sizes: 'normal-t1-t5',
    colors: ['black', 'white'],
    season: 'summer',
    provider: 'Proveedor A',
    stock: { t1: 8, t2: 10, t3: 9, t4: 7, t5: 6 },
    pack_size: '1',
    cost_price: 8000,
    sale_price: 12000,
    has_discount: true,
    discount_percentage: 20,
    is_active: true,
    purchase_date: '2025-07-10',
    updated_at: '2025-08-10T10:00:00Z',
    created_at: '2025-07-15T12:00:00Z'
  },
  {
    id: 2,
    images: ['https://api.slingacademy.com/public/sample-products/2.png'],
    category: 'Pants',
    sku: '2002',
    name: 'Pantalón entallado',
    brand: 'DenimPro',
    description: 'Jean entallado para un look moderno.',
    segment: { code: 2, name: 'dama' },
    sizes: 'dama-t36-t46',
    colors: ['blue', 'black'],
    season: 'winter',
    provider: 'Proveedor B',
    stock: { t36: 5, t38: 6, t40: 5, t42: 4, t44: 3, t46: 2 },
    pack_size: '6',
    cost_price: 20000,
    sale_price: 32000,
    has_discount: false,
    is_active: true,
    purchase_date: '2025-07-05',
    updated_at: '2025-08-11T09:00:00Z',
    created_at: '2025-07-12T14:00:00Z'
  },
  {
    id: 3,

    images: ['https://api.slingacademy.com/public/sample-products/3.png'],
    category: 'T-shirts',
    sku: '2003',
    name: 'Blusa casual',
    description: 'Blusa liviana y suave para verano.',
    segment: { code: 2, name: 'dama' },
    sizes: 'dama-normal-t36-t48',
    colors: ['pink', 'white'],
    season: 'summer',
    provider: 'Proveedor C',
    stock: { t36: 5, t38: 6, t40: 7, t42: 5, t44: 4, t46: 2, t48: 1 },
    pack_size: '1',
    cost_price: 15000,
    sale_price: 22000,
    has_discount: true,
    discount_percentage: 10,
    is_active: true,
    updated_at: '2025-08-11T15:00:00Z',
    created_at: '2025-07-18T16:00:00Z'
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
  { label: 'Hombre', value: { code: 1, name: 'hombre' } },
  { label: 'Dama', value: { code: 2, name: 'dama' } },
  { label: 'Nene', value: { code: 3, name: 'nene' } },
  { label: 'Nena', value: { code: 4, name: 'nena' } },
  { label: 'Bebé', value: { code: 5, name: 'bebe' } },
  { label: 'Beba', value: { code: 6, name: 'beba' } },
  { label: 'Otros', value: { code: 7, name: 'otros' } },
  {
    label: 'Ropa interior',
    value: { code: 8, name: 'ropa interior' }
  },
  {
    label: 'Ropa interior importada',
    value: { code: 9, name: 'ropa interior importada' }
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

export const colorMap: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  black: 'bg-black',
  white: 'bg-white border-2 border-gray-300',
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-500',
  purple: 'bg-purple-500'
};
