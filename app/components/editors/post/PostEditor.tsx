import type {FormProps, FormSchema} from "remix-forms"
import type {ReactElement, ReactNode} from "react"

import {Form} from "../../common/Form.jsx"
import type {Replace} from "../../../lib/types/Replace.js"

import {PostEditorContext} from "./PostEditorContext.jsx"

type Props<TSchema extends FormSchema> = Replace<FormProps<TSchema>, {
  children: ReactNode
}>

export const PostEditor = <TSchema extends FormSchema>(
  {children, ...props}: Props<TSchema>
): ReactElement => (
  <Form {...props}>
    {value => (
      <div className="flex flex-1 flex-col gap-4">
        <PostEditorContext.Provider value={value}>
          {children}
        </PostEditorContext.Provider>
      </div>
    )}
  </Form>
)
