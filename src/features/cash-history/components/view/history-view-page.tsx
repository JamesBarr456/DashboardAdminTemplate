'use client';

import { usePOSStore } from '@/store/pos-state';

import { columnsHistory } from '../tables/sales-product-table/columns';
import { TableCustom } from '@/components/table';

interface Props {
  filters: {
    date?: Date | undefined;
    type?: string | undefined;
    page: number;
    limit: number;
  };
}
export default function HistoryViewPage({ filters }: Props) {
  const { movements } = usePOSStore();
  const totalMovements = movements.length;

  return (
    <>
      <TableCustom
        data={movements}
        totalItems={totalMovements}
        columns={columnsHistory}
      />
    </>
  );
}
