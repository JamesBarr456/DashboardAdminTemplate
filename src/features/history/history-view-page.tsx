'use client';

import HistoryModalNew from './history-modal-new';
import { HistoryTable } from './sales-product-table/index';
import { columnsHistory } from './sales-product-table/columns';
import { usePOSStore } from '@/store/pos-state';

interface Props {
  filters: {
    date?: Date | undefined;
    type?: string | undefined;
    page: number;
    limit: number;
  };
}
export default function HistoryViewPage({ filters }: Props) {
  const { movements, addMovement, cashRegister } = usePOSStore();
  const totalMovements = movements.length;

  console.log(filters);
  return (
    <>
      <HistoryModalNew
        addMovement={addMovement}
        cashier={cashRegister.cashier}
      />
      <HistoryTable
        data={movements}
        totalItems={totalMovements}
        columns={columnsHistory}
      />
    </>
  );
}
