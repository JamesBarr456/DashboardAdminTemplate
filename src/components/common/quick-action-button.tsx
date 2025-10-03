import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

interface QuickActionButtonProps
  extends ComponentPropsWithoutRef<typeof Button> {
  isEnabled: boolean;
}

export function QuickActionButton({
  isEnabled,
  className,
  children,
  ...props
}: QuickActionButtonProps) {
  return (
    <Button
      variant='default'
      className={cn(
        'w-full cursor-pointer',
        !isEnabled && 'cursor-not-allowed',
        className
      )}
      disabled={!isEnabled}
      {...props}
    >
      {children}
    </Button>
  );
}
