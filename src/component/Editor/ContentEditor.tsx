import {ComponentProps} from "react"
import {Plate} from "@udecode/plate"
import type {FC} from "react"
import {isEmpty} from "lodash"

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
  <Plate<Value>
    editableProps={{
      placeholder: "Write your thoughts here",
      className: "h-full"
    }}
    plugins={plugins}
    value={isEmpty(value) ? undefined : value}
    onChange={onChange}
  />
)

export type ContentProps = ComponentProps<typeof ContentEditor>
