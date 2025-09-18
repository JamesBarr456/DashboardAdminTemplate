import { Movement, Sale } from '@/store/pos-state';
import { Product } from '@/types/product';

export interface SalesMetrics {
  totalSales: number;
  totalCash: number;
  totalTransfer: number;
  totalReturns: number;
  totalExpenses: number;
  netBalance: number;
  transactionCount: number;
  totalIncomes: number;
}

export interface DailySale {
  day: string;
  date: string;
  amount: number;
}

export interface TopProduct {
  product: Product;
  totalSold: number;
  revenue: number;
}

export interface CategorySale {
  category: string;
  amount: number;
}

export class ReportCalculator {
  static calculateSalesMetrics(
    sales: Sale[],
    movements: Movement[]
  ): SalesMetrics {
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalCash = sales
      .filter((sale) => sale.paymentMethod === 'cash')
      .reduce((sum, sale) => sum + sale.total, 0);
    const totalTransfer = sales
      .filter((sale) => sale.paymentMethod === 'transfer')
      .reduce((sum, sale) => sum + sale.total, 0);

    const totalReturns = movements
      .filter((movement) => movement.type === 'return')
      .reduce((sum, movement) => sum + movement.amount, 0);

    const totalIncomes = movements
      .filter((movement) => movement.type === 'income')
      .reduce((sum, movement) => sum + movement.amount, 0);
    // Note: totalIncomes is calculated but not used in the returned object.
    // It can be included if needed in the SalesMetrics interface.

    const totalExpenses = movements
      .filter((movement) => movement.type === 'expense')
      .reduce((sum, movement) => sum + movement.amount, 0);

    return {
      totalIncomes,
      totalSales,
      totalCash,
      totalTransfer,
      totalReturns,
      totalExpenses,
      netBalance: totalSales - totalReturns - totalExpenses + totalIncomes,
      transactionCount: sales.length
    };
  }

  static getDailySales(sales: Sale[], days: number = 7): DailySale[] {
    const dailySales = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const daySales = sales.filter(
        (sale) => sale.timestamp.toDateString() === date.toDateString()
      );

      dailySales.push({
        day: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        date: date.toLocaleDateString(),
        amount: daySales.reduce((sum, sale) => sum + sale.total, 0)
      });
    }

    return dailySales;
  }

  static getTopProducts(sales: Sale[], limit: number = 5): TopProduct[] {
    const productSales: Record<number, TopProduct> = {};

    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const productId = item.product.id;
        if (!productSales[productId]) {
          productSales[productId] = {
            product: item.product,
            totalSold: 0,
            revenue: 0
          };
        }
        productSales[productId].totalSold += item.quantity;
        productSales[productId].revenue += item.subtotal;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, limit);
  }

  static getCategorySales(sales: Sale[], limit: number = 5): CategorySale[] {
    const categorySales: Record<string, number> = {};

    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const category = item.product.category;
        categorySales[category] =
          (categorySales[category] || 0) + item.subtotal;
      });
    });

    return Object.entries(categorySales)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, limit);
  }
}
