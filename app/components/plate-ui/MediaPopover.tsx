import type React from "react"
import {useEffect} from "react"

import {type WithRequiredKey, isSelectionExpanded} from "@udecode/plate-common"
import {
  useEditorSelector,
  useElement,
  useRemoveNodeButton
} from "@udecode/plate-common/react"
import {
  FloatingMedia as FloatingMediaPrimitive,
  floatingMediaActions,
  useFloatingMediaSelectors
} from "@udecode/plate-media/react"
import {useReadOnly, useSelected} from "slate-react"

import {Icons} from "./Icons.jsx"

import {Button, buttonVariants} from "./Button.jsx"
import {CaptionButton} from "./Caption.jsx"
import {inputVariants} from "./Input.jsx"
import {Popover, PopoverAnchor, PopoverContent} from "./Popover.jsx"
import {Separator} from "./Separator.jsx"

export interface MediaPopoverProps {
  children: React.ReactNode
  plugin: WithRequiredKey
}

export function MediaPopover({children, plugin}: MediaPopoverProps) {
  const readOnly = useReadOnly()
  const selected = useSelected()

  const selectionCollapsed = useEditorSelector(
    editor => !isSelectionExpanded(editor),
    []
  )
  const isOpen = !readOnly && selected && selectionCollapsed
  const isEditing = useFloatingMediaSelectors().isEditing()

  // biome-ignore lint/correctness/useExhaustiveDependencies: generated code
  useEffect(() => {
    if (!isOpen && isEditing) {
      floatingMediaActions.isEditing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const element = useElement()
  const {props: buttonProps} = useRemoveNodeButton({element})

  if (readOnly) return <>{children}</>

  return (
    <Popover modal={false} open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent
        className="w-auto p-1"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {isEditing ? (
          <div className="flex w-[330px] flex-col">
            <div className="flex items-center">
              <div className="flex items-center pl-3 text-muted-foreground">
                <Icons.link className="size-4" />
              </div>

              <FloatingMediaPrimitive.UrlInput
                className={inputVariants({h: "sm", variant: "ghost"})}
                options={{plugin}}
                placeholder="Paste the embed link..."
              />
            </div>
          </div>
        ) : (
          <div className="box-content flex h-9 items-center gap-1">
            <FloatingMediaPrimitive.EditButton
              className={buttonVariants({size: "sm", variant: "ghost"})}
            >
              Edit link
            </FloatingMediaPrimitive.EditButton>

            <CaptionButton variant="ghost">Caption</CaptionButton>

            <Separator className="my-1" orientation="vertical" />

            <Button size="sms" variant="ghost" {...buttonProps}>
              <Icons.delete className="size-4" />
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
