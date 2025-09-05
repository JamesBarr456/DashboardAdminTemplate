import { z } from 'zod';

export const phoneSchema = z.object({
  areaCode: z.string().min(1, 'El código de área es requerido'),
  number: z.string().min(1, 'El número de teléfono es requerido')
});

export const customerSnapshotSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido').optional(),
  lastName: z.string().min(1, 'El apellido es requerido').optional(),
  dni: z.string().min(7, 'El DNI debe tener al menos 7 caracteres').optional(),
  email: z.string().email('Formato de email inválido').optional(),
  phone: phoneSchema.partial().optional()
});

export const shippingInformationSchema = z.object({
  delivery_option: z.enum(['delivery', 'pickup']).optional(),
  adress: z.string().optional(),
  locality: z.string().optional(),
  shipping_type: z.enum(['express', 'standard']).optional()
});
export const statusSchema = z.enum([
  'pending',
  'confirmed',
  'delivered',
  'canceled'
]);
// Lo que efectivamente podés mandar en el PATCH
export const orderUpdateSchema = z.object({
  snapshot: customerSnapshotSchema.optional(),
  shipping_information: shippingInformationSchema.optional()
});

export type OrderUpdate = z.infer<typeof orderUpdateSchema>;
