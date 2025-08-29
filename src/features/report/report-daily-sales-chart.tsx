'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface Props {
  data: { day: string; date: string; amount: number }[];
  label: string;
}

export default function DailySalesChart({ data, label }: Props) {
  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle>Ventas Diarias ({label})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={250}>
          <LineChart data={data}>
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='sales'
              stroke='#2563eb'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
