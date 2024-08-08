import type {DropdownMenuProps} from "@radix-ui/react-dropdown-menu"
import {Fragment, type FC} from "react"
import {
  focusEditor,
  useEditorReadOnly,
  useEditorRef,
  usePlateStore
} from "@udecode/plate-common"
import {Edit2, Eye} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState
} from "./DropdownMenu.jsx"
import {ToolbarButton} from "./Toolbar.jsx"

export const ModeDropdownMenu: FC<DropdownMenuProps> = props => {
  const editor = useEditorRef()
  const setReadOnly = usePlateStore().set.readOnly()
  const readOnly = useEditorReadOnly()
  const openState = useOpenState()

  let value = "editing"
  if (readOnly) value = "viewing"

  const item: any = {
    editing: (
      <Fragment>
        <Edit2 className="mr-2 size-5" />
        <span className="hidden lg:inline">Editing</span>
      </Fragment>
    ),
    viewing: (
      <Fragment>
        <Eye className="mr-2 size-5" />
        <span className="hidden lg:inline">Viewing</span>
      </Fragment>
    )
  }

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Editing mode"
          isDropdown
          className="min-w-[auto] lg:min-w-[130px]"
        >
          {item[value]}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[180px]">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={newValue => {
            if (newValue !== "viewing") {
              setReadOnly(false)
            }

            if (newValue === "viewing") {
              setReadOnly(true)
              return
            }

            if (newValue === "editing") {
              focusEditor(editor)
            }
          }}
        >
          <DropdownMenuRadioItem value="editing">
            {item.editing}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="viewing">
            {item.viewing}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
