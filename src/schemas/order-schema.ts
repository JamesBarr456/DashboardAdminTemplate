import { z } from 'zod';

export const phoneSchema = z.object({
  areaCode: z.string().min(1, 'El código de área es requerido'),
  number: z.string().min(1, 'El número de teléfono es requerido')
});
export const productSchema = z
  .object({
    id: z.string(),
    defective: z.boolean(),
    defective_quantity: z.preprocess((val) => {
      if (typeof val === 'string' && val.trim() !== '') {
        const parsed = Number(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number().min(0)),
    defect_comment: z
      .string()
      .max(500, 'El comentario no puede exceder 500 caracteres')
      .optional(),
    unavailable: z.boolean(),
    // Extensiones para edición desde la página de orden
    quantity: z
      .preprocess((val) => {
        if (typeof val === 'string' && val.trim() !== '') {
          const parsed = Number(val);
          return isNaN(parsed) ? undefined : parsed;
        }
        return val;
      }, z.number().min(0))
      .optional(),
    remove: z.boolean().optional()
  })
  .refine(
    () => {
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
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  dni: z.string().min(7, 'El DNI debe tener al menos 7 caracteres'),
  email: z.string().email('Formato de email inválido'),
  phone: phoneSchema.partial().optional()
});

export const shippingInformationSchema = z.object({
  delivery_option: z.enum(['delivery', 'pickup']),
  adress: z.string().min(1, 'La dirección es requerido'),
  locality: z.string().min(1, 'La localidad es requerida'),
  shipping_type: z.enum(['express', 'standard'])
});
export const statusSchema = z.enum([
  'pending', //, Recién llegado, necesita revisión
  'in_process', // Aceptado, separando productos
  'delivered', // Paquete armado, listo para entrega
  'canceled', //, Proceso completado exitosamente
  'completed', // No aceptado con motivo
  'rejected' //, No completado por diversos motivos
]);
// Lo que efectivamente podés mandar en el PATCH
export const orderUpdateSchema = z.object({
  snapshot: customerSnapshotSchema.optional(),
  shipping_information: shippingInformationSchema.optional(),
  payment_method: z.enum(['cash', 'transfer'], {
    required_error: 'El método de pago es requerido'
  }),
  status: statusSchema.optional(),
  items: z.array(productSchema).optional(),
  // Comentario opcional cuando se rechaza la orden
  reject_comment: z
    .string()
    .max(500, 'El comentario no puede exceder 500 caracteres')
    .optional()
});

export type OrderUpdate = z.infer<typeof orderUpdateSchema>;
export type ProductUpdate = z.infer<typeof productSchema>;
