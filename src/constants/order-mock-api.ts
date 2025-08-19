import { delay } from './product-mock-api';
import { matchSorter } from 'match-sorter';
import { ordersMock } from './mocks/orders';

// Interfaces
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
export const fakeOrders = {
  records: [] as Order[],

  initialize() {
    // Cargamos directamente desde ordersMock
    this.records = [...ordersMock];
  },

  async getOrderById(orderId: string) {
    await delay(500);
    const order = this.records.find((o) => o.id === orderId);

    if (!order) {
      return { success: false, message: `Order ${orderId} not found` };
    }

    return { success: true, order };
  },

  async getOrders({
    page = 1,
    limit = 10,
    status,
    search
  }: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    await delay(1000);

    let orders = [...this.records];

    if (status) {
      orders = orders.filter((o) => o.status === status);
    }

    if (search) {
      orders = matchSorter(orders, search, {
        keys: ['id']
      });
    }

    const totalOrders = orders.length;
    const offset = (page - 1) * limit;
    const paginatedOrders = orders.slice(offset, offset + limit);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample orders data for testing and learning purposes',
      total_orders: totalOrders,
      offset,
      limit,
      orders: paginatedOrders
    };
  }
};

// Inicializamos
fakeOrders.initialize();
