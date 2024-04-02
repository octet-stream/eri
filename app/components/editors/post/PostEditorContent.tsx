import {Controller} from "react-hook-form"
import {HTML5Backend} from "react-dnd-html5-backend"
import {Plate} from "@udecode/plate-common"
import {Fragment, type FC} from "react"
import {DndProvider} from "react-dnd"

import {FloatingToolbarButtons} from "../../plate-ui/FloatingToolbarButtons.jsx"
import {FixedToolbarButtons} from "../../plate-ui/FixedToolbarButtons.jsx"
import {FloatingToolbar} from "../../plate-ui/FloatingToolbar.jsx"
import {FixedToolbar} from "../../plate-ui/FixedToolbar.jsx"
import {TooltipProvider} from "../../plate-ui/Tooltip.jsx"
import {Editor} from "../../plate-ui/Editor.jsx"

import {plugins} from "./plugins.js"

import {usePostEditorContext} from "./PostEditorContext.jsx"
import type {IPostContent} from "../../../server/zod/plate/editors/PostContent.js"

export const ContentEditor: FC = () => {
  const {control} = usePostEditorContext()

  return (
    <Controller
      name="content"
      control={control}
      render={({field: {name, value, onChange, onBlur}}) => {
        const onDataChange = (
          data: IPostContent
        ) => onChange(JSON.stringify(data ?? []))

        return (
          <Fragment>
            <DndProvider backend={HTML5Backend}>
              <Plate plugins={plugins} value={value} onChange={onDataChange}>
                <TooltipProvider>
                  <FixedToolbar>
                    <FixedToolbarButtons />
                  </FixedToolbar>

                  <Editor onBlur={onBlur} />

                  <FloatingToolbar>
                    <FloatingToolbarButtons />
                  </FloatingToolbar>
                </TooltipProvider>
              </Plate>
            </DndProvider>

            <input type="hidden" name={name} value={value ?? ""} />
          </Fragment>
        )
      }}
    />
  )
}
