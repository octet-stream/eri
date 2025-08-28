import {EditorProvider} from "@tiptap/react"
import {type FC, type ReactNode, useMemo} from "react"

import {EditorBubbleMenu} from "./EditorBubbleMenu.tsx"
import {EditorContent, type EditorContentProps} from "./EditorContent.tsx"
import {extensions} from "./extensions.ts"
import {FloatingToolbar} from "./FloatingToolbar.tsx"

export interface EditorProps extends EditorContentProps {
  children?: ReactNode
  defaultValue?: string
}

export const Editor: FC<EditorProps> = ({children, ...meta}) => {
  const content = useMemo(
    () => (meta.defaultValue ? JSON.parse(meta.defaultValue) : undefined),
    [meta.defaultValue]
  )

  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      immediatelyRender={false}
      shouldRerenderOnTransaction={false}
      editorContainerProps={{
        className: "h-full"
      }}
      editorProps={{
        attributes: {
          role: "textbox",
          class:
            "w-full h-0 min-h-full overflow-y-scroll rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        }
      }}
    >
      {children}
      <EditorBubbleMenu />

      <FloatingToolbar />

      <EditorContent {...meta} />
    </EditorProvider>
  )
}
