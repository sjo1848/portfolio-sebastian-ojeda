import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerTitle = DrawerPrimitive.Title;
export const DrawerDescription = DrawerPrimitive.Description;
export const DrawerPortal = DrawerPrimitive.Portal;

type DrawerContentProps = Omit<ComponentProps<typeof DrawerPrimitive.Popup>, 'className'> & {
  className?: string;
};

export function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop className="ui-drawer-backdrop" />
      <DrawerPrimitive.Viewport className="ui-drawer-viewport">
        <DrawerPrimitive.Popup className={cn('ui-drawer-content', className)} {...props}>
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}
