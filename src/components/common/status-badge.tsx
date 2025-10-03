import { Badge } from '../ui/badge';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface StatusBadgeProps {
  label: string; // texto del título
  isActive: boolean; // estado booleano
  activeText?: string; // texto cuando es true
  inactiveText?: string; // texto cuando es false
  activeVariant?: BadgeVariant; // variante de Badge cuando es true
  inactiveVariant?: BadgeVariant; // variante de Badge cuando es false
}

export const StatusBadge = ({
  label,
  isActive,
  activeText = 'Activo',
  inactiveText = 'Inactivo',
  activeVariant = 'default',
  inactiveVariant = 'destructive'
}: StatusBadgeProps) => (
  <div className='flex items-center justify-between'>
    <h3 className='text-sm font-semibold'>{label}</h3>
    <Badge variant={isActive ? activeVariant : inactiveVariant}>
      {isActive ? activeText : inactiveText}
    </Badge>
  </div>
);
