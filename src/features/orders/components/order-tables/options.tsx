import { OrderStatus } from '@/types/order-new';

export const CATEGORY_OPTIONS = [
  { value: 'Clothing', label: 'Clothing' },
  { value: 'T-shirts', label: 'T-shirts' },
  { value: 'Pants', label: 'Pants' },
  { value: 'Blouses', label: 'Blouses' },
  { value: 'Sweatshirts', label: 'Sweatshirts' },
  { value: 'Home', label: 'Home' },
  { value: 'Sportswear', label: 'Sportswear' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Underwear', label: 'Underwear' },
  { value: 'Winter', label: 'Winter' },
  { value: 'Summer', label: 'Summer' }
];

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export type StatusOption = {
  value: OrderStatus;
  label: string;
  number: number;
  variant: BadgeVariant;
};
export const STATUS_OPTIONS: StatusOption[] = [
  { value: 'pending', label: 'Pendiente', number: 1, variant: 'outline' },
  { value: 'in_process', label: 'En proceso', number: 2, variant: 'secondary' },
  { value: 'completed', label: 'Completo', number: 3, variant: 'default' },
  { value: 'delivered', label: 'Entregado', number: 4, variant: 'default' },
  { value: 'canceled', label: 'Cancelado', number: 6, variant: 'destructive' }
];
