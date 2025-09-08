import { z } from 'zod';

export const phoneSchema = z.object({
  areaCode: z.string().min(1, 'El código de área es requerido'),
  number: z.string().min(1, 'El número de teléfono es requerido')
});
export const productSchema = z
  .object({
    id: z.string(),
    defective: z.boolean(),
    defective_quantity: z.number().min(0),
    defect_comment: z
      .string()
      .max(500, 'El comentario no puede exceder 500 caracteres')
      .optional(),
    unavailable: z.boolean()
  })
  .refine(
    (data) => {
      // Esta validación se aplicará dinámicamente en el componente
      // ya que necesitamos acceso a la cantidad total del producto
      return true;
    },
    {
      message: 'La cantidad defectuosa no puede ser mayor a la cantidad total',
      path: ['defective_quantity']
    }
  );
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
  shipping_information: shippingInformationSchema.optional(),
  payment_method: z
    .string()
    .min(1, 'El método de pago es requerido')
    .optional(),
  status: statusSchema.optional(),
  items: z.array(productSchema).optional()
});

export type OrderUpdate = z.infer<typeof orderUpdateSchema>;
export type ProductUpdate = z.infer<typeof productSchema>;
