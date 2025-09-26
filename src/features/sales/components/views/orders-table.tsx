import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

import { TableCustom } from '@/components/table';
import { columns } from '../tables/sales-orders-pending/columns';
import { NewOrder as Order } from '@/types/order-new';

interface OrdersTableProps {
  title: string;
  orders: Order[];
  columns: typeof columns;
  totalItems: number;
  icon: LucideIcon;
}

function OrdersTable({
  title,
  orders,
  columns,
  totalItems,
  icon: Icon
}: OrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <Icon className='h-5 w-5' />
          <span className='text-sm font-semibold'>{title}</span>
          <Badge variant='secondary' className='ml-auto px-3 py-1 text-sm'>
            {totalItems}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex h-[500px] flex-col md:h-[300px]'>
        <TableCustom data={orders} columns={columns} totalItems={totalItems} />
      </CardContent>
    </Card>
  );
}

export default OrdersTable;
