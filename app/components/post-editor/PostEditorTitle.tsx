import type {KeyboardEventHandler} from "react"
import {useEvent} from "react-use-event-hook"

import {Textarea} from "../ui/Textarea.jsx"

import {usePostEditorContext} from "./PostEditorContext.jsx"

export const PostEditorTitle = () => {
  const {register} = usePostEditorContext()

  // This prevents from inserting `\r\n` symbols to keep title a one-line
  const preventReturn = useEvent<KeyboardEventHandler>(event => {
    if (event.key.toLowerCase() === "enter") {
      return event.preventDefault()
    }
  })

  return (
    <Textarea
      {...register("title")}

      className="resize-none"
      placeholder="Title"
      rows={1}
      minRows={1}
      maxRows={3}
      maxLength={255}
      onKeyDown={preventReturn}
    />
  )
}
