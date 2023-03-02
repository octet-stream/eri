import type {FC, ChangeEventHandler, KeyboardEventHandler} from "react"
import {useEvent} from "react-use-event-hook"

import {TextArea} from "component/TextArea"

export interface TitleEditorOnChangeHandler {
  (title: string): void
}

interface Props {
  value: string
  onTitleChange?: TitleEditorOnChangeHandler
}

type BlockReturnHandler = KeyboardEventHandler<HTMLTextAreaElement>

type TitleUpdateHandler = ChangeEventHandler<HTMLTextAreaElement>

export const TitleEditor: FC<Props> = ({value, onTitleChange}) => {
  const blockReturn = useEvent<BlockReturnHandler>(event => {
    if (event.key.toLowerCase() === "enter") {
      event.preventDefault()
    }
  })

  const onChange = useEvent<TitleUpdateHandler>(({target}) => {
    if (onTitleChange) {
      onTitleChange(target.value)
    }
  })

  return (
    <TextArea
      autoFocus
      className="text-4xl font-extrabold w-full p-0 border-none outline-none resize-none overflow-hidden"
      placeholder="Title"
      value={value}
      onChange={onChange}
      maxLength={140}
      onKeyDown={blockReturn}
    />
  )
}
