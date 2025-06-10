import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger
} from "@radix-ui/react-dropdown-menu"
import {Check, ChevronRight, Circle} from "lucide-react"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.js"

interface WithInset {
  inset?: boolean
}

export const DropdownMenu = Root

export const DropdownMenuTrigger = Trigger

export const DropdownMenuGroup = Group

export const DropdownMenuPortal = Portal

export const DropdownMenuSub = Sub

export const DropdownMenuRadioGroup = RadioGroup

export interface DropdownMenuSubTriggerProps
  extends ComponentProps<typeof SubTrigger>,
    WithInset {}

export const DropdownMenuSubTrigger: FC<DropdownMenuSubTriggerProps> = ({
  className,
  inset,
  children,
  ...props
}) => (
  <SubTrigger
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent",

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
)

export type DropdownMenuSubTriggerRef = ComponentRef<
  typeof DropdownMenuSubTrigger
>

export interface DropdownMenuSubContentProps
  extends ComponentProps<typeof SubContent> {}

export const DropdownMenuSubContent: FC<DropdownMenuSubContentProps> = ({
  className,
  ...props
}) => (
  <SubContent
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
)

export type DropdownMenuSubContentRef = ComponentRef<
  typeof DropdownMenuSubContent
>

export interface DropdownMenuContentProps
  extends ComponentProps<typeof Content> {}

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  className,
  sideOffset = 4,
  ...props
}) => (
  <Portal>
    <Content
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </Portal>
)

export type DropdownMenuContentRef = ComponentRef<typeof DropdownMenuContent>

export interface DropdownMenuItemProps
  extends ComponentProps<typeof Item>,
    WithInset {}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  className,
  inset,
  ...props
}) => (
  <Item
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",

      {
        "pl-8": inset
      },

      className
    )}
    {...props}
  />
)

export type DropdownMenuItemRef = ComponentRef<typeof DropdownMenuItem>

export interface DropdownMenuCheckboxItemProps
  extends ComponentProps<typeof CheckboxItem> {}

export const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
  className,
  children,
  checked,
  ...props
}) => (
  <CheckboxItem
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
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
)

export type DropdownMenuCheckboxItemRef = ComponentRef<
  typeof DropdownMenuCheckboxItem
>

export interface DropdownMenuRadioItemProps
  extends ComponentProps<typeof RadioItem> {}

export const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({
  className,
  children,
  ...props
}) => (
  <RadioItem
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
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
)

export type DropdownMenuRadioItemRef = ComponentRef<
  typeof DropdownMenuRadioItem
>

export interface DropdownMenuLabelProps
  extends ComponentProps<typeof Label>,
    WithInset {}

export const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({
  className,
  inset,
  ...props
}) => (
  <Label
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",

      {
        "pl-8": inset
      },

      className
    )}
    {...props}
  />
)

export type DropdownMenuLabelRef = ComponentRef<typeof DropdownMenuLabel>

export interface DropdownMenuSeparatorProps
  extends ComponentProps<typeof Separator> {}

export const DropdownMenuSeparator: FC<DropdownMenuSeparatorProps> = ({
  className,
  ...props
}) => (
  <Separator className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
)

export type DropdownMenuSeparatorRef = ComponentRef<
  typeof DropdownMenuSeparator
>

export type DropdownMenuShortcutProps = ComponentProps<"span">

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

export type DropdownMenuShortcutRef = ComponentRef<typeof DropdownMenuShortcut>
