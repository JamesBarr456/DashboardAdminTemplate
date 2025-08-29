import { useMemo, useState } from 'react';

import { usePOSStore } from '@/store/pos-state';

export type Period = 'today' | 'week' | 'month' | 'all';

export function useReportsData() {
  const { sales, movements } = usePOSStore();

  const [period, setPeriod] = useState<Period>('today');

  const filteredSales = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(
      today.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    switch (period) {
      case 'today':
        return sales.filter((s) => s.timestamp >= today);
      case 'week':
        return sales.filter((s) => s.timestamp >= weekAgo);
      case 'month':
        return sales.filter((s) => s.timestamp >= monthAgo);
      default:
        return sales;
    }
  }, [sales, period]);

  const metrics = useMemo(() => {
    const totalSales = filteredSales.reduce((sum, s) => sum + s.total, 0);

    const byPayment = (method: 'cash' | 'transfer') =>
      filteredSales
        .filter((s) => s.paymentMethod === method)
        .reduce((sum, s) => sum + s.total, 0);

    const totalCash = byPayment('cash');
    const totalTransfer = byPayment('transfer');

    const totalReturns = movements
      .filter((m) => m.type === 'return')
      .reduce((sum, m) => sum + m.amount, 0);

    const totalExpenses = movements
      .filter((m) => m.type === 'expense')
      .reduce((sum, m) => sum + m.amount, 0);

    const netBalance = totalSales - totalReturns - totalExpenses;

    return {
      totalSales,
      totalCash,
      totalTransfer,
      totalReturns,
      totalExpenses,
      netBalance
    };
  }, [filteredSales, movements]);

  const dailySales = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const daySales = sales.filter(
        (s) => s.timestamp.toDateString() === date.toDateString()
      );
      return {
        day: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        date: date.toLocaleDateString(),
        amount: daySales.reduce((sum, s) => sum + s.total, 0)
      };
    });
  }, [sales]);

  const topProducts = useMemo(() => {
    const productSales: Record<
      number,
      { product: any; totalSold: number; revenue: number }
    > = {};
    filteredSales.forEach((sale) => {
      sale.items.forEach((item) => {
        const id = item.product.id;
        if (!productSales[id])
          productSales[id] = {
            product: item.product,
            totalSold: 0,
            revenue: 0
          };
        productSales[id].totalSold += item.quantity;
        productSales[id].revenue += item.subtotal;
      });
    });
    return Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);
  }, [filteredSales]);

  const categorySales = useMemo(() => {
    const categories: Record<string, number> = {};
    filteredSales.forEach((s) => {
      s.items.forEach((i) => {
        categories[i.product.category] =
          (categories[i.product.category] || 0) + i.subtotal;
      });
    });
    return Object.entries(categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [filteredSales]);

  return {
    period,
    setPeriod,
    filteredSales,
    metrics,
    dailySales,
    topProducts,
    categorySales
  };
}
