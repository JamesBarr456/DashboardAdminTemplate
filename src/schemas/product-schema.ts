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
  sku: z.string().optional(),
  image: z
    .any()
    .optional()
    .superRefine((files, ctx) => {
      if (!files || files.length === 0) return true;

      if (files?.[0]?.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `El tamaño máximo del archivo es 5MB.`
        });
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Se aceptan archivos .jpg, .jpeg, .png y .webp.'
        });
      }
    }),
  segment: segmentSchema,
  name: z.string().min(2, ''),
  brand: z.string().optional(),
  description: z.string().min(1, {
    message: ''
  }),

  sizes: z.string().min(1, ''),
  colors: z.array(z.string()).optional(),
  season: z.enum(['winter', 'summer', 'seasonal']).optional(),
  provider: z.string().optional(),

  cost_price: z.coerce
    .number()
    .min(0, 'El precio de costo no puede ser negativo'),
  sale_price: z.coerce
    .number()
    .min(0, 'El precio de venta no puede ser negativo'),

  is_active: z.boolean(),
  purchase_date: z.string().optional(),
  pack_size: z.enum(['1', '6', '12']).default('1')
});

export type ProductType = z.infer<typeof productSchema>;
