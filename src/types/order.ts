export interface OrderProduct {
  id: string;
  product_name: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  defective?: boolean;
  defective_quantity?: number;
  defect_comment?: string;
  unavailable?: boolean;
}

export interface Order {
  id: string;
  user_name: string;
  payment_method: 'efectivo' | 'transferencia';
  user_id: string;
  total: number;
  status: 'rejected' | 'processing' | 'sending' | 'cancelled';
  created_at: string;
  products: OrderProduct[];
}

export interface OrderFormData {
  products: {
    id: string;
    defective: boolean;
    defective_quantity: number;
    defect_comment: string;
    unavailable: boolean;
  }[];
}
