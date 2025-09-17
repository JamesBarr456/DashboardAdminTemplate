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
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `El tamaño máximo del archivo es 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Se aceptan archivos .jpg, .jpeg, .png y .webp.'
    ), // 👈 nuevo
  segment: segmentSchema, // 👈 nuevo
  name: z.string().min(2, ''),
  brand: z.string().optional(),
  description: z.string().min(1, {
    message: ''
  }),
  gender: z.enum(['male', 'female', 'unisex']),
  sizes: z.string().min(1, ''),
  colors: z.array(z.string()).optional(), // 👈 nuevo
  season: z.enum(['winter', 'summer', 'seasonal']).optional(), // 👈 nuevo
  provider: z.string().optional(),

  cost_price: z.coerce
    .number()
    .min(0, 'El precio de costo no puede ser negativo'),
  sale_price: z.coerce
    .number()
    .min(0, 'El precio de venta no puede ser negativo'),

  is_active: z.boolean(),
  purchase_date: z.string().optional(),
  pack_size: z.enum(['1', '6', '12']).default('1') // 👈 nuevo
});

export type ProductType = z.infer<typeof productSchema>;
