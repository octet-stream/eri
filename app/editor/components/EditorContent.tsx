import {
  unstable_useControl as useControl,
  type useInputControl
} from "@conform-to/react"
import {EditorContent as TiptapContent} from "@tiptap/react"
import type {ComponentProps, FC} from "react"
import {Fragment, useEffect} from "react"

import {useEditorContext} from "./EditorContext.jsx"

type BaseProps = Omit<
  Parameters<typeof useInputControl<string>>[0],
  "formId" | "initialValue"
>

export interface EditorContentProps extends BaseProps {
  containterProps?: ComponentProps<"div">
  defaultValue?: string
}

export const EditorContent: FC<EditorContentProps> = ({
  containterProps,
  ...props
}) => {
  const control = useControl(props)
  const editor = useEditorContext()

  useEffect(() => {
    const updateContent = () => control.change(JSON.stringify(editor.getJSON()))

    editor.on("transaction", updateContent)

    return () => void editor.off("transaction", updateContent)
  }, [editor, control])

  return (
    <Fragment>
      <TiptapContent {...containterProps} editor={editor} role="textbox" />

      <input ref={control.register} type="hidden" name={props.name} />
    </Fragment>
  )
}
