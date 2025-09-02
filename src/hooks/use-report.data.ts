import { useMemo } from 'react';

import { usePOSStore } from '@/store/pos-state';
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

    const metrics = ReportCalculator.calculateSalesMetrics(
      filteredSales,
      filteredMovements
    );
    const dailySales = ReportCalculator.getDailySales(sales);
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
