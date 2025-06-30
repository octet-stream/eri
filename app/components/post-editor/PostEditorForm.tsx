import type {FC} from "react"
import {Form, type FormProps} from "react-router"

import {cn} from "../../lib/utils/cn.js"

export const PostEditorForm: FC<FormProps> = ({
  className,
  children,
  ...props
}) => (
  <Form
    {...props}
    className={cn("h-full max-h-full flex flex-col flex-1 gap-5", className)}
  >
    {children}
  </Form>
)
