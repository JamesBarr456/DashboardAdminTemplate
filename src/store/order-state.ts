import { NewOrder, OrderStatus } from '@/types/order-new';

import { create } from 'zustand';
import { newOrderMock } from '@/constants/mocks/orders';

interface OrderStore {
  orders: NewOrder[];
  setOrders: (orders: NewOrder[]) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrder: (id: string, data: Partial<NewOrder>) => void;
  getOrderById: (id: string) => NewOrder | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: newOrderMock,
  setOrders: (orders) => set({ orders }),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === id ? { ...order, status } : order
      )
    })),
  updateOrder: (id, data) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === id ? { ...order, ...data } : order
      )
    })),
  getOrderById: (id) => get().orders.find((order) => order._id === id)
}));
