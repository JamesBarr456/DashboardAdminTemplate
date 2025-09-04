export type Segment = {
  code: number;
  name:
    | 'hombre'
    | 'dama'
    | 'nene'
    | 'nena'
    | 'bebe'
    | 'beba'
    | 'otros'
    | 'ropa interior'
    | 'ropa interior importada';
};
export type Product = {
  id: number;
  images: string[];
  name: string;
  sku: string;
  brand?: string;
  gender: 'male' | 'female' | 'unisex';
  segment: Segment;
  sizes: string;
  cost_price: number;
  sale_price: number;
  has_discount: boolean;
  discount_percentage?: number;
  is_active: boolean;
  stock: Record<string, number>;
  pack_size?: '1' | '6' | '12';
  purchase_date?: string;
  description: string;
  category: string;
  colors?: string[]; // Lista de colores
  season?: 'winter' | 'summer' | 'seasonal';
  provider?: string;
  updated_at: string;
  created_at: string;
};
