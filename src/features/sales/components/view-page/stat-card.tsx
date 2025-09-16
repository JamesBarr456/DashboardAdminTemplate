import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className='flex items-center gap-2 rounded-lg border border-gray-600/50 p-2'>
      <div className='min-w-0 flex-1 text-center'>
        <p className='text-muted-foreground truncate text-sm font-medium'>
          {title}
        </p>
        <p className='text-foreground mt-0.5 truncate text-center text-xs font-bold'>
          {value}
        </p>
      </div>
    </div>
  );
}

export default StatCard;
