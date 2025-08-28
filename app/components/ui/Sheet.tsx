import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger
} from "@radix-ui/react-dialog"
import {cva, type VariantProps} from "class-variance-authority"
import {X} from "lucide-react"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export const Sheet = Root

export const SheetTrigger = Trigger

export const SheetClose = Close

export const SheetPortal = Portal

export type SheetOverlayRef = ComponentRef<typeof Overlay>

export type SheetOverlayProps = ComponentProps<typeof Overlay>

export const SheetOverlay: FC<SheetOverlayProps> = ({className, ...props}) => (
  <Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
)

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
)

export interface SheetContentProps
  extends ComponentProps<typeof Content>,
    VariantProps<typeof sheetVariants> {}

// TODO: Support <Slot /> in this component
export const SheetContent: FC<SheetContentProps> = ({
  side = "left",
  className,
  children,
  ...props
}) => (
  <SheetPortal>
    <SheetOverlay />
    <Content {...props} className={cn(sheetVariants({side}), className)}>
      {children}
      <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </SheetPortal>
)

export type SheetContentRef = ComponentRef<typeof SheetContent>

export type SheetHeaderProps = ComponentProps<"div">

export const SheetHeader: FC<SheetHeaderProps> = ({className, ...props}) => (
  <div
    {...props}
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
  />
)

export type SheetHeaderRef = ComponentRef<typeof SheetHeader>

export type SheetFooterProps = ComponentProps<"div">

export const SheetFooter: FC<SheetFooterProps> = ({className, ...props}) => (
  <div
    {...props}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
  />
)

export type SheetFooterRef = ComponentRef<typeof SheetFooter>

export type SheetTitleProps = ComponentProps<typeof Title>

export const SheetTitle: FC<SheetTitleProps> = ({className, ...props}) => (
  <Title
    {...props}
    className={cn("text-lg font-semibold text-foreground", className)}
  />
)

export type SheetTitleRef = ComponentRef<typeof SheetTitle>

export type SheetDescriptionProps = ComponentProps<typeof Description>

export const SheetDescription: FC<SheetDescriptionProps> = ({
  className,
  ...props
}) => (
  <Description
    {...props}
    className={cn("text-sm text-muted-foreground", className)}
  />
)

export type SheetDescriptionRef = ComponentRef<typeof SheetDescription>
