import {Plate} from "@udecode/plate-core"
import {ComponentProps} from "react"
import type {FC} from "react"

import isEmpty from "lodash/isEmpty"

import type {Value} from "lib/type/Editor"

import {plugins} from "./plugins"

export interface ContentEditorOnChangeHandler {
  (value: Value): void
}

interface Props {
  value?: Value
  onChange?: ContentEditorOnChangeHandler
}

export const ContentEditor: FC<Props> = ({value, onChange}) => (
  <div className="flex-1">
    <Plate<Value>
      id="eri-post-content-editor"
      editableProps={{
        placeholder: "Write your thoughts here",
        className: "h-full overflow-hidden"
      }}
      plugins={plugins}
      value={isEmpty(value) ? undefined : value}
      onChange={onChange}
    />
  </div>
)

export type ContentProps = ComponentProps<typeof ContentEditor>
