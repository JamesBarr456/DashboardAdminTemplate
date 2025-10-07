import { useMemo } from 'react';

import { Sale, usePOSStore } from '@/store/pos-state';
import {
  DateFilter,
  DatePeriod
} from '@/features/report/utils/report-data-filters';
import { ReportCalculator } from '@/features/report/utils/report-calculations';

export function useReportData(period: DatePeriod) {
  const { sales, movements } = usePOSStore();

  return useMemo(() => {
    const filteredSales = DateFilter.getFilteredData(sales, period);
    const filteredMovements = DateFilter.getFilteredData(movements, period);

    // Ventas sintéticas derivadas de movimientos de ingreso por finalización de pedido
    const syntheticSalesFromIncomes: Sale[] = filteredMovements
      .filter(
        (m) =>
          m.type === 'income' &&
          m.concept?.toLowerCase() === 'ingreso por venta'
      )
      .map((m) => ({
        id: `income-${m.id}`,
        items: [], // no afectan topProducts ni categorySales
        total: m.amount,
        paymentMethod: 'cash', // provienen de CellTableOrderPendingsAction sólo cuando es efectivo
        cashier: m.cashier,
        timestamp: m.timestamp
      }));

    const augmentedSales = [...filteredSales, ...syntheticSalesFromIncomes];

    const metrics = ReportCalculator.calculateSalesMetrics(
      augmentedSales,
      filteredMovements
    );
    const dailySales = ReportCalculator.getDailySales(augmentedSales);
    const topProducts = ReportCalculator.getTopProducts(filteredSales);
    const categorySales = ReportCalculator.getCategorySales(filteredSales);
    const periodLabel = DateFilter.getPeriodLabel(period);

    return {
      metrics,
      dailySales,
      topProducts,
      categorySales,
      periodLabel
    };
  }, [sales, movements, period]);
}
