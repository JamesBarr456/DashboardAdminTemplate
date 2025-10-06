'use client';

import { Badge } from '@/components/ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PendingBadge({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!count) return null;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('status', 'pending');
    router.push(`/dashboard/order?${params.toString()}`);
  };

  return (
    <button onClick={handleClick} className='cursor-pointer'>
      <Badge variant='secondary' className='gap-2'>
        Pendientes
        <span className='bg-primary text-primary-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs'>
          {count}
        </span>
      </Badge>
    </button>
  );
}
