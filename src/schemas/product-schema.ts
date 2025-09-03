import { z } from 'zod';
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

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
  brand: z.string().min(1, 'La marca es obligatoria.'),
  gender: z.string().min(1, 'El género es obligatorio.'),
  name: z.string().min(2, {
    message: 'El nombre del producto debe tener al menos 2 caracteres.'
  }),
  category: z.string(),
  sizes: z.string().min(1, 'El talle es obligatorio.'),
  cost_price: z.number().min(0, 'El precio de costo debe ser mayor a 0'),
  sale_price: z.number().min(0, 'El precio de venta debe ser mayor a 0'),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres.'
  }),
  has_discount: z.boolean(),
  discount_percentage: z.number().min(0).max(100).optional(),
  is_active: z.boolean(),
  stock: z.record(z.string(), z.number()).optional()
});

export type ProductType = z.infer<typeof productSchema>;
