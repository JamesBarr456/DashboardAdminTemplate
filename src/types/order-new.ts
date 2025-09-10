// types/order.ts
export interface Phone {
  areaCode: string;
  number: string;
}

export interface CustomerOrder {
  customerId: string; // referencia al user en DB
  snapshot: {
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    phone: Phone;
  };
  stats: {
    cancelledOrders: number;
    rejectedOrders: number;
  };
}

export interface ShippingInformation {
  delivery_option: 'delivery' | 'pickup';
  adress?: string; // opcional si es pickup
  locality?: string; // opcional si es pickup
  shipping_type?: 'express' | 'standard'; // opcional si es pickup
}
export interface Item {
  _id: string; // uuid generado en front
  product_sku: string; // SKU del producto
  name: string;
  quantity: number;
  size?: string; // opcional, no todos los productos tendrán talle
  price: number;
  total_mount: number;
  defective?: boolean; // indica si el producto es defectuoso
  defective_quantity?: number; // cantidad de productos defectuosos
  defect_comment?: string; // comentario sobre el defecto
  unavailable?: boolean; // indica si el producto no está disponible
}

export interface Summary {
  items_total: number;
  shipping_cost: number;
  grand_total: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'delivered'
  | 'canceled'
  | 'sending';

export interface NewOrder {
  _id: string;
  customer: CustomerOrder;
  payment_method: 'cash' | 'transfer';
  items: Item[];
  shipping_information: ShippingInformation;
  summary: Summary;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
