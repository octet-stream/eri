import type {ElementRef, ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"
import {
  Root,
  Trigger,
  Overlay,
  Close,
  Portal,
  Title,
  Description,
  Content
} from "@radix-ui/react-dialog"
import {cva, type VariantProps} from "class-variance-authority"
import {X} from "lucide-react"
import {cn} from "@udecode/cn"

export const Sheet = Root

export const SheetTrigger = Trigger

export const SheetClose = Close

export const SheetPortal = Portal

export type SheetOverlayRef = ElementRef<typeof Overlay>

export type SheetOverlayProps = ComponentPropsWithoutRef<typeof Overlay>

export const SheetOverlay = forwardRef<SheetOverlayRef, SheetOverlayProps>(
  ({className, ...props}, ref) => (
    <Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
      ref={ref}
    />
  )
)

SheetOverlay.displayName = Overlay.displayName

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

export type SheetContentRef = ElementRef<typeof Content>

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof Content>,
  VariantProps<typeof sheetVariants> { }

export const SheetContent = forwardRef<SheetContentRef, SheetContentProps>(
  ({side = "left", className, children, ...props}, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <Content
        {...props}

        ref={ref}
        className={cn(sheetVariants({side}), className)}
      >
        {children}
        <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </SheetPortal>
  )
)

SheetContent.displayName = Content.displayName

export type SheetHeaderRef = ElementRef<"div">

export type SheetHeaderProps = ComponentPropsWithoutRef<"div">

export const SheetHeader = forwardRef<SheetHeaderRef, SheetContentProps>(
  ({className, ...props}, ref) => (
    <div
      {...props}

      ref={ref}
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
    />
  )
)

SheetHeader.displayName = "SheetHeader"

export type SheetFooterRef = ElementRef<"div">

export type SheetFooterProps = ComponentPropsWithoutRef<"div">

export const SheetFooter = forwardRef<SheetContentRef, SheetContentProps>(
  ({className, ...props}, ref) => (
    <div
      {...props}

      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
    />
  )
)

SheetFooter.displayName = "SheetFooter"

export type SheetTitleRef = ElementRef<typeof Title>

export type SheetTitleProps = ComponentPropsWithoutRef<typeof Title>

export const SheetTitle = forwardRef<SheetTitleRef, SheetTitleProps>(
  ({className, ...props}, ref) => (
    <Title
      {...props}

      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
    />
  )
)

SheetTitle.displayName = Title.displayName

export type SheetDescriptionRef = ElementRef<typeof Description>

export type SheetDescriptionProps = ComponentPropsWithoutRef<typeof Description>

export const SheetDescription = forwardRef<
/* eslint-disable @typescript-eslint/indent */
  SheetDescriptionRef,
  SheetDescriptionProps
/* eslint-enable @typescript-eslint/indent */
>(
  ({className, ...props}, ref) => (
    <Description
      {...props}

      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
    />
  )
)

SheetDescription.displayName = Description.displayName
