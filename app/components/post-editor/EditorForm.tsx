import type {FC} from "react"
import {Form, type FormProps} from "react-router"
import {cn} from "../../lib/utils/cn.ts"

export const EditorForm: FC<FormProps> = ({className, children, ...props}) => (
  <Form
    {...props}
    className={cn(
      "h-full max-h-full grid grid-flow-row grid-rows-2 gap-5",
      className
    )}
  >
    {children}
  </Form>
)
