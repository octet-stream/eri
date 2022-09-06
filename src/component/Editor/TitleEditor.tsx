import type {FC, ChangeEvent, ChangeEventHandler} from "react"

export interface TitleEditorOnChangeHandler {
  (title: string, event: ChangeEvent<HTMLInputElement>): void
}

interface Props {
  onTitleChange?: TitleEditorOnChangeHandler
}

export const TitleEditor: FC<Props> = ({onTitleChange}) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (onTitleChange) {
      onTitleChange(event.target.value, event)
    }
  }

  return (
    <input
      className="prose text-4xl font-extrabold w-full p-0 border-none outline-none"
      placeholder="Title"
      onChange={onChange}
    />
  )
}
