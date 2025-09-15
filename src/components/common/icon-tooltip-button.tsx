import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { JSX } from 'react';

export function IconTooltipButton(
  icon: JSX.Element,
  label: string,
  onClick?: () => void,
  variant: 'outline' | 'destructive' = 'outline'
) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size='sm' onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
