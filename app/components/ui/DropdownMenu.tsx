import type {FC, ElementRef, ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"
import {
  Root,
  Trigger,
  Group,
  Portal,
  Sub,
  RadioGroup,
  SubTrigger,
  SubContent,
  Content,
  Item,
  CheckboxItem,
  ItemIndicator,
  RadioItem,
  Label,
  Separator
} from "@radix-ui/react-dropdown-menu"
import {Check, ChevronRight, Circle} from "lucide-react"
import {cn} from "@udecode/cn"

interface WithInset {
  inset?: boolean
}

export const DropdownMenu = Root

export const DropdownMenuTrigger = Trigger

export const DropdownMenuGroup = Group

export const DropdownMenuPortal = Portal

export const DropdownMenuSub = Sub

export const DropdownMenuRadioGroup = RadioGroup

export type DropdownMenuSubTriggerRef = ElementRef<typeof SubTrigger>

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof SubTrigger>,
    WithInset {}

export const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuSubTriggerRef,
  DropdownMenuSubTriggerProps
>(({className, inset, children, ...props}, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",

      {
        "pl-8": inset
      },

      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </SubTrigger>
))

DropdownMenuSubTrigger.displayName = SubTrigger.displayName

export type DropdownMenuSubContentRef = ElementRef<typeof SubContent>

export interface DropdownMenuSubContentProps
  extends ComponentPropsWithoutRef<typeof SubContent> {}

export const DropdownMenuSubContent = forwardRef<
  DropdownMenuSubContentRef,
  DropdownMenuSubContentProps
>(({className, ...props}, ref) => (
  <SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = SubContent.displayName

export type DropdownMenuContentRef = ElementRef<typeof Content>

export interface DropdownMenuContentProps
  extends ComponentPropsWithoutRef<typeof Content> {}

export const DropdownMenuContent = forwardRef<
  DropdownMenuContentRef,
  DropdownMenuContentProps
>(({className, sideOffset = 4, ...props}, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </Portal>
))

DropdownMenuContent.displayName = Content.displayName

export type DropdownMenuItemRef = ElementRef<typeof Item>

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof Item>,
    WithInset {}

export const DropdownMenuItem = forwardRef<
  DropdownMenuItemRef,
  DropdownMenuItemProps
>(({className, inset, ...props}, ref) => (
  <Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

      {
        "pl-8": inset
      },

      className
    )}
    {...props}
  />
))

DropdownMenuItem.displayName = Item.displayName

export type DropdownMenuCheckboxItemRef = ElementRef<typeof CheckboxItem>

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof CheckboxItem> {}

export const DropdownMenuCheckboxItem = forwardRef<
  DropdownMenuCheckboxItemRef,
  DropdownMenuCheckboxItemProps
>(({className, children, checked, ...props}, ref) => (
  <CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
))

DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName

export type DropdownMenuRadioItemRef = ElementRef<typeof RadioItem>

export interface DropdownMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof RadioItem> {}

export const DropdownMenuRadioItem = forwardRef<
  DropdownMenuLabelRef,
  DropdownMenuRadioItemProps
>(({className, children, ...props}, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
))

DropdownMenuRadioItem.displayName = RadioItem.displayName

export type DropdownMenuLabelRef = ElementRef<typeof Label>

export interface DropdownMenuLabelProps
  extends ComponentPropsWithoutRef<typeof Label>,
    WithInset {}

export const DropdownMenuLabel = forwardRef<
  DropdownMenuLabelRef,
  DropdownMenuLabelProps
>(({className, inset, ...props}, ref) => (
  <Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",

      {
        "pl-8": inset
      },

      className
    )}
    {...props}
  />
))

DropdownMenuLabel.displayName = Label.displayName

export type DropdownMenuSeparatorRef = ElementRef<typeof Separator>

export interface DropdownMenuSeparatorProps
  extends ComponentPropsWithoutRef<typeof Separator> {}

export const DropdownMenuSeparator = forwardRef<
  DropdownMenuSeparatorRef,
  DropdownMenuSeparatorProps
>(({className, ...props}, ref) => (
  <Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))

DropdownMenuSeparator.displayName = Separator.displayName

export type DropdownMenuShortcutProps = ComponentPropsWithoutRef<"span">

export const DropdownMenuShortcut: FC<DropdownMenuShortcutProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}

DropdownMenuShortcut.displayName = "DropdownMenuShortcut"
