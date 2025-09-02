'use client';

import { useState } from 'react';
import { DatePeriod } from '../utils/report-data-filters';
import { useReportData } from '@/hooks/use-report.data';
import { toast } from 'sonner';
import { ReportHeader } from './report-header';
import { MetricsCards } from './report-metrics-card';
import { DailySalesChart } from './report-daily-sales-chart';
import { CategorySalesChart } from './report-category-sales-chart';
import { FinancialSummary } from './report-financial-summary';
import { TopProductsList } from './report-top-product-list';

export default function ReportViewPage() {
  const [period, setPeriod] = useState<DatePeriod>('today');
  const { metrics, dailySales, topProducts, categorySales, periodLabel } =
    useReportData(period);

  const handleExport = () => {
    toast.success('Funcionalidad de exportación en desarrollo');
  };

  return (
    <div className='space-y-6'>
      <ReportHeader
        period={period}
        onPeriodChange={setPeriod}
        onExport={handleExport}
      />

      <MetricsCards metrics={metrics} />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <DailySalesChart dailySales={dailySales} periodLabel={periodLabel} />
        <CategorySalesChart
          categorySales={categorySales}
          periodLabel={periodLabel}
        />
      </div>

      <FinancialSummary metrics={metrics} periodLabel={periodLabel} />

      <TopProductsList topProducts={topProducts} periodLabel={periodLabel} />
    </div>
  );
}
