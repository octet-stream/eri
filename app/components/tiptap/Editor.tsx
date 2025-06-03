import {EditorProvider} from "@tiptap/react"
import type {FC, ReactNode} from "react"

import {EditorBubbleMenu} from "./EditorBubbleMenu.jsx"
import {extensions} from "./extensions.js"

export interface EditorProps {
  children?: ReactNode
}

export const Editor: FC<EditorProps> = ({children}) => (
  <EditorProvider
    extensions={extensions}
    immediatelyRender={false}
    shouldRerenderOnTransaction={false}
    editorContainerProps={{
      className: "h-full"
    }}
    editorProps={{
      attributes: {
        class:
          "w-full h-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      }
    }}
  >
    {children}

    <EditorBubbleMenu />
  </EditorProvider>
)
