import {useCurrentEditor} from "@tiptap/react"
import {type FC, useEffect} from "react"

import {
  unstable_useControl as useControl,
  type useInputControl
} from "@conform-to/react"

type BaseProps = Omit<Parameters<typeof useInputControl<string>>[0], "formId">

export interface EditorContentProps extends BaseProps {}

export const EditorContent: FC<EditorContentProps> = props => {
  const control = useControl(props)

  const {editor} = useCurrentEditor()

  useEffect(() => {
    const updateContent = () => {
      if (editor) {
        control.change(JSON.stringify(editor.getJSON()))
      }
    }

    editor?.on("transaction", updateContent)

    return () => void editor?.off("transaction", updateContent)
  }, [editor, control])

  return <input ref={control.register} type="hidden" name={props.name} />
}
