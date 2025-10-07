import { NewOrder, OrderStatus } from '@/types/order-new';

import { OrderUpdate } from '@/schemas/order-schema';
import { create } from 'zustand';
import { newOrderMock } from '@/constants/mocks/orders';

interface OrderStore {
  orders: NewOrder[];
  setOrders: (orders: NewOrder[]) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrder: (id: string, data: Partial<OrderUpdate>) => void;
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
      orders: state.orders.map((order) => {
        if (order._id !== id) return order;

        // Si hay items en el patch, mergearlos manualmente
        let updatedItems = order.items;
        if (data.items) {
          // Primero aplicar updates por id
          updatedItems = order.items
            .map((item) => {
              const patch = data.items?.find((p) => p.id === item._id);
              if (!patch) return item;
              // si remove === true, lo filtraremos después
              return {
                ...item,
                defective: patch.defective ?? item.defective,
                defective_quantity:
                  patch.defective_quantity ?? item.defective_quantity,
                unavailable: patch.unavailable ?? item.unavailable,
                defect_comment: patch.defect_comment ?? item.defect_comment,
                quantity: patch.quantity ?? item.quantity,
                total_mount: (patch.quantity ?? item.quantity) * item.price
              };
            })
            .filter((it) => {
              const p = data.items?.find((pp) => pp.id === it._id);
              return !(p && p.remove);
            });
        }

        // Recalcular totales basados en items y defectuosos (10% descuento)
        const items_total = updatedItems.reduce((sum, item) => {
          const qty = item.quantity ?? 0;
          const price = item.price ?? 0;
          const defQ = Math.min(
            Math.max(0, Number(item.defective_quantity ?? 0)),
            qty
          );
          const goodUnits = Math.max(0, qty - defQ);
          const subtotal = goodUnits * price + defQ * price * 0.9;
          return sum + subtotal;
        }, 0);

        const shipping_cost = order.summary.shipping_cost ?? 0;
        const grand_total =
          Math.round((items_total + shipping_cost) * 100) / 100;

        return {
          ...order,
          ...data,
          items: updatedItems, // 👈 ahora sí es Item[]
          summary: {
            ...order.summary,
            items_total,
            grand_total
          }
        };
      })
    })),
  getOrderById: (id) => get().orders.find((order) => order._id === id)
}));
