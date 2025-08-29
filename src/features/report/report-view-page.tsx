'use client';

import { BarChart3, Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import CategorySalesChart from './report-category-sales-chart';
import DailySalesChart from './report-daily-sales-chart';
import FinancialSummary from './report-financial-summary';
import SalesSummary from './report-sales-summary';
import TopProducts from './report-top-product';
import { useReportsData } from '@/hooks/useReportsData';

export default function ReportViewPage() {
  const { period, setPeriod, metrics, dailySales, topProducts, categorySales } =
    useReportsData();

  const getPeriodLabel = (p: typeof period) => {
    switch (p) {
      case 'today':
        return 'Hoy';
      case 'week':
        return 'Últimos 7 días';
      case 'month':
        return 'Último mes';
      default:
        return 'Todo el tiempo';
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='flex items-center gap-2 text-3xl font-bold'>
          <BarChart3 className='h-8 w-8' />
          Reportes de Ventas
        </h1>

        <div className='flex items-center gap-4'>
          <Select value={period}>
            <SelectTrigger className='w-40'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Hoy</SelectItem>
              <SelectItem value='week'>Última Semana</SelectItem>
              <SelectItem value='month'>Último Mes</SelectItem>
              <SelectItem value='all'>Todo el Tiempo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Exportar
          </Button>
        </div>
      </div>

      {/* Secciones desacopladas */}
      <SalesSummary metrics={metrics} filteredSalesCount={dailySales.length} />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <DailySalesChart data={dailySales} label={getPeriodLabel(period)} />
        <CategorySalesChart
          data={categorySales}
          label={getPeriodLabel(period)}
        />
      </div>
      <FinancialSummary metrics={metrics} label={getPeriodLabel(period)} />
      <TopProducts products={topProducts} label={getPeriodLabel(period)} />
    </div>
  );
}
