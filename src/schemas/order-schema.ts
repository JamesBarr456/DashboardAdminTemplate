import { z } from 'zod';

// Phone
export const PhoneSchema = z.object({
  areaCode: z.string().optional(),
  number: z.string().optional()
});

// Snapshot (cliente)
export const SnapshotSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dni: z.string().optional(),
  email: z.string().email().optional(),
  phone: PhoneSchema.optional()
});

// CustomerOrder
export const CustomerOrderSchema = z.object({
  customerId: z.string().optional(),
  snapshot: SnapshotSchema.optional()
});

// ShippingInformation
export const ShippingInformationSchema = z.object({
  delivery_option: z.enum(['delivery', 'pickup']).optional(),
  adress: z.string().optional(),
  locality: z.string().optional(),
  shipping_type: z.enum(['express', 'standard']).optional()
});

// Item
export const ItemSchema = z.object({
  _id: z.string().optional(),
  productId: z.string().optional(),
  name: z.string().optional(),
  quantity: z.number().optional(),
  size: z.string().optional(),
  price: z.number().optional(),
  total_mount: z.number().optional()
});

// Summary
export const SummarySchema = z.object({
  items_total: z.number().optional(),
  shipping_cost: z.number().optional(),
  grand_total: z.number().optional()
});

// OrderStatus
export const OrderStatusSchema = z
  .enum(['pending', 'confirmed', 'delivered', 'canceled'])
  .optional();

// Payment Method
export const PaymentMethodSchema = z.enum(['cash', 'transfer']).optional();

// PATCH Order Schema
export const UpdateOrderSchema = z.object({
  customer: CustomerOrderSchema.optional(),
  shipping_information: ShippingInformationSchema.optional(),
  items: z.array(ItemSchema).optional(),
  summary: SummarySchema.optional(),
  status: OrderStatusSchema,
  payment_method: PaymentMethodSchema
});

export type OrderEditFormData = z.infer<typeof UpdateOrderSchema>;
