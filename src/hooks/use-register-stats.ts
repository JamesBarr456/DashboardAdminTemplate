import { useOrderStore } from '@/store/order-state';
import { usePOSStore } from '@/store/pos-state';
import { useMemo } from 'react';

export interface RegisterStats {
  salesCount: number;
  deliveredOrders: number;
  pendingOrders: number;
}

export function useRegisterStats(): RegisterStats {
  const { cashRegister, sales } = usePOSStore();
  const { orders } = useOrderStore();

  return useMemo(() => {
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const deliveredOrders = orders.filter(
      (o) => o.status === 'delivered'
    ).length;
    const todaysSales = sales.filter(
      (sale) =>
        sale.cashier === cashRegister.cashier &&
        sale.timestamp.toDateString() === new Date().toDateString()
    ).length;

    return {
      salesCount: todaysSales || 0,
      deliveredOrders,
      pendingOrders
    };
  }, [orders, sales, cashRegister.cashier]);
}
