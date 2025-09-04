import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Segment con code + name
export const segmentSchema = z.object({
  code: z.number(),
  name: z.enum([
    'hombre',
    'dama',
    'nene',
    'nena',
    'bebe',
    'beba',
    'otros',
    'ropa interior',
    'ropa interior importada'
  ])
});

export const productSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'La imagen es obligatoria.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `El tamaño máximo del archivo es 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Se aceptan archivos .jpg, .jpeg, .png y .webp.'
    ),
  sku: z.string().min(1, 'El SKU es obligatorio.'),
  segment: segmentSchema, // 👈 nuevo
  name: z.string().min(2, {
    message: 'El nombre del producto debe tener al menos 2 caracteres.'
  }),
  brand: z.string().optional(),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres.'
  }),
  gender: z.enum(['male', 'female', 'unisex']),
  sizes: z.string().min(1, 'El rango de talles es obligatorio.'),
  colors: z.array(z.string()).optional(), // 👈 nuevo
  season: z.enum(['winter', 'summer', 'seasonal']).optional(), // 👈 nuevo
  provider: z.string().optional(),
  stock: z.record(z.string(), z.number()),
  cost_price: z.number().min(0, 'El precio de costo debe ser mayor a 0'),
  sale_price: z.number().min(0, 'El precio de venta debe ser mayor a 0'),
  is_active: z.boolean(),
  purchase_date: z.string().optional(),
  pack_size: z.enum(['1', '6', '12']).default('1'), // 👈 nuevo
  has_discount: z.boolean().optional(),
  discount_percentage: z.number().min(0).max(100).optional(),
  images: z.array(z.string()).optional()
});

export type ProductType = z.infer<typeof productSchema>;
