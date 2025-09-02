export type DatePeriod = 'today' | 'week' | 'month' | 'all';

export class DateFilter {
  static getFilteredData<T extends { timestamp: Date }>(
    data: T[],
    period: DatePeriod
  ): T[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
      case 'today':
        return data.filter((item) => item.timestamp >= today);
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return data.filter((item) => item.timestamp >= weekAgo);
      case 'month':
        const monthAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        return data.filter((item) => item.timestamp >= monthAgo);
      default:
        return data;
    }
  }

  static getPeriodLabel(period: DatePeriod): string {
    switch (period) {
      case 'today':
        return 'Hoy';
      case 'week':
        return 'Últimos 7 días';
      case 'month':
        return 'Último mes';
      default:
        return 'Todo el tiempo';
    }
  }
}
