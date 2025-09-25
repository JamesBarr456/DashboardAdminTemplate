'use client';
import { QuickActionButton } from '@/components/common/quick-action-button';
import HistoryModalNew from '@/features/history/components/history-modal-new';
import { CashRegisterModal } from './button-open-cash';
import { CashRegister, Movement } from '@/store/pos-state';
import { useRouter } from 'next/router';

interface QuickActionButtonsProps {
  isOpen: boolean;

  addMovement: (movement: Omit<Movement, 'id' | 'timestamp'>) => void;
  cashRegister: CashRegister;
}

function QuickButtons({
  isOpen,
  addMovement,
  cashRegister
}: QuickActionButtonsProps) {
  const router = useRouter();
  const handleStartSale = () => {
    if (cashRegister.isOpen) {
      router.push('/dashboard/sales/start-pos');
    }
  };
  return (
    <div className='space-y-4'>
      <h3 className='text-sm font-semibold'>Acciones Rápidas</h3>
      <div className='grid gap-2'>
        <QuickActionButton isEnabled={isOpen} onClick={handleStartSale}>
          Iniciar Venta
        </QuickActionButton>
        <CashRegisterModal />
        <HistoryModalNew
          type='income'
          addMovement={addMovement}
          cashRegister={cashRegister}
        />
        <HistoryModalNew
          type='expense'
          addMovement={addMovement}
          cashRegister={cashRegister}
        />
      </div>
    </div>
  );
}

export default QuickButtons;
