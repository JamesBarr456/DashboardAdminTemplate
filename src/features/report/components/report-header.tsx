import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { BarChart3, Download } from 'lucide-react';
import { DatePeriod } from '../utils/report-data-filters';

interface ReportHeaderProps {
  period: DatePeriod;
  onPeriodChange: (period: DatePeriod) => void;
  onExport: () => void;
}

export function ReportHeader({
  period,
  onPeriodChange,
  onExport
}: ReportHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='flex items-center gap-2 text-3xl font-bold'>
        <BarChart3 className='h-8 w-8' />
        Reportes de Ventas
      </h1>

      <div className='flex items-center gap-4'>
        <Select value={period} onValueChange={onPeriodChange}>
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

        <Button variant='outline' onClick={onExport}>
          <Download className='mr-2 h-4 w-4' />
          Exportar
        </Button>
      </div>
    </div>
  );
}
