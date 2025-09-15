import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <Card className='transition-all duration-200 hover:shadow-md'>
      <CardContent>
        <div className='flex items-center gap-3'>
          <div className={cn('rounded-xl p-2 transition-colors')}>
            <Icon className='h-5 w-5' />
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-muted-foreground truncate text-sm font-medium'>
              {title}
            </p>
            <p className='text-foreground mt-0.5 truncate text-center font-bold'>
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
