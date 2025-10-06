'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

interface TableCustomParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  children?: React.ReactNode;
}
export function TableCustom<TData, TValue>({
  data,
  totalItems,
  columns,
  children
}: TableCustomParams<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>{children}</DataTableToolbar>
    </DataTable>
  );
}
