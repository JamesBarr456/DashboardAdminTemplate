'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IconDotsVertical } from '@tabler/icons-react';

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface ActionDropdownProps {
  actions: ActionItem[];
  label?: string;
  align?: 'start' | 'end' | 'center';
  triggerClassName?: string;
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export const DropdownCustom = ({
  actions,
  label = 'Acciones',
  align = 'end',
  triggerClassName = 'h-8 w-8 p-0',
  buttonVariant = 'ghost'
}: ActionDropdownProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} className={triggerClassName}>
          <span className='sr-only'>Abrir menu</span>
          <IconDotsVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={action.onClick}>
            {action.icon && <span className='mr-2'>{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
