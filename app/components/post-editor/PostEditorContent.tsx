import {
  unstable_useControl as useControl,
  type useInputControl
} from "@conform-to/react"
import {Plate} from "@udecode/plate-common/react"
import {type ComponentProps, type FC, Fragment, useMemo} from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {useEvent} from "react-use-event-hook"

import {Editor} from "../plate-ui/Editor.jsx"
import {FixedToolbar} from "../plate-ui/FixedToolbar.jsx"
import {FixedToolbarButtons} from "../plate-ui/FixedToolbarButtons.jsx"
import {FloatingToolbar} from "../plate-ui/FloatingToolbar.jsx"
import {FloatingToolbarButtons} from "../plate-ui/FloatingToolbarButtons.jsx"
import {TooltipProvider} from "../plate-ui/Tooltip.jsx"

import {usePostContentEditor} from "./editor.js"

export interface PostEditorContent {
  meta: Parameters<typeof useInputControl<string>>[0] // useControl is compatible with this type, but does not have the `name` property, hence we use this type
}

export const PostEditorContent: FC<PostEditorContent> = ({meta}) => {
  const control = useControl(meta)

  // TODO: Support content returned from server
  const value = useMemo(
    () => (control.value ? JSON.parse(control.value) : undefined),

    [control.value]
  )

  const updateValue = useEvent<
    NonNullable<ComponentProps<typeof Plate>["onChange"]>
  >(({value}) => control.change(JSON.stringify(value)))

  const editor = usePostContentEditor({value})

  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Plate editor={editor} onChange={updateValue}>
          <TooltipProvider>
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor onBlur={control.blur} onFocus={control.focus} />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
          </TooltipProvider>
        </Plate>
      </DndProvider>

      <input ref={control.register} name={meta.name} type="hidden" />
    </Fragment>
  )
}
