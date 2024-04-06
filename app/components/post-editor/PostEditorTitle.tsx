import {useId, type KeyboardEventHandler} from "react"
import {useEvent} from "react-use-event-hook"

import {Textarea} from "../ui/Textarea.jsx"
import {Label} from "../ui/Label.jsx"

import {PostEditorField} from "./PostEditorField.jsx"
import {usePostEditorContext} from "./PostEditorContext.jsx"

export const PostEditorTitle = () => {
  const id = useId()

  const {register} = usePostEditorContext()

  // This prevents from inserting `\r\n` symbols to keep title a one-line
  const preventReturn = useEvent<KeyboardEventHandler>(event => {
    if (event.key.toLowerCase() === "enter") {
      return event.preventDefault()
    }
  })

  return (
    <PostEditorField>
      <Label htmlFor={id}>
        Title
      </Label>

      <Textarea
        {...register("title")}

        id={id}
        className="resize-none"
        placeholder="What's your story?"
        rows={1}
        minRows={1}
        maxRows={3}
        maxLength={255}
        onKeyDown={preventReturn}
      />
    </PostEditorField>
  )
}
