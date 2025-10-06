import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import { JSX } from 'react';

export function IconTooltipButton(
  icon: JSX.Element,
  label: string,
  onClick?: () => void,
  variant: 'outline' | 'destructive' = 'outline',
  disabled?: boolean
) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size='sm'
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          type='button'
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
