'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface CategorySalesChartProps {
  data: [string, number][];
  label: string;
}

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function CategorySalesChart({
  data,
  label
}: CategorySalesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Categoría ({label})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey='total'
              nameKey='category'
              cx='50%'
              cy='50%'
              outerRadius={100}
              fill='#8884d8'
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
