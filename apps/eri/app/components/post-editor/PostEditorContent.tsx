import {HTML5Backend} from "react-dnd-html5-backend"
import {type FC, Fragment, useMemo} from "react"
import {useEvent} from "react-use-event-hook"
import {Plate} from "@udecode/plate-common"
import {DndProvider} from "react-dnd"
import {
  unstable_useControl as useControl,
  type useInputControl
} from "@conform-to/react"

import {Editor} from "../plate-ui/Editor.jsx"
import {FixedToolbar} from "../plate-ui/FixedToolbar.jsx"
import {FloatingToolbarButtons} from "../plate-ui/FloatingToolbarButtons.jsx"
import {FixedToolbarButtons} from "../plate-ui/FixedToolbarButtons.jsx"
import {FloatingToolbar} from "../plate-ui/FloatingToolbar.jsx"
import {TooltipProvider} from "../plate-ui/Tooltip.jsx"

import {plugins} from "./plugins.js"

export interface PostEditorContent {
  meta: Parameters<typeof useInputControl<string>>[0] // useControl is compatible with this type, but does not have the `name` property, hence we use this type
}

export const PostEditorContent: FC<PostEditorContent> = ({meta}) => {
  const control = useControl(meta)

  // TODO: Support content returned from server
  const value = useMemo(
    () => (control.value ? JSON.parse(control.value as string) : undefined),

    [control.value]
  )

  const updateValue = useEvent((data: Record<string, unknown>) =>
    control.change(JSON.stringify(data))
  )

  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} value={value} onChange={updateValue}>
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
