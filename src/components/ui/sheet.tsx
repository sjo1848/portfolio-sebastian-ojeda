import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

type SheetContentProps = Omit<ComponentProps<typeof DialogPrimitive.Popup>, 'className'> & {
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export function SheetContent({ className, children, side = 'right', ...props }: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="ui-sheet-backdrop" />
      <DialogPrimitive.Popup
        className={cn('ui-sheet-content', className)}
        data-side={side}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

type SheetSectionProps = ComponentProps<'div'>;

export function SheetHeader({ className, ...props }: SheetSectionProps) {
  return <div className={cn('ui-sheet-header', className)} {...props} />;
}

export function SheetFooter({ className, ...props }: SheetSectionProps) {
  return <div className={cn('ui-sheet-footer', className)} {...props} />;
}
