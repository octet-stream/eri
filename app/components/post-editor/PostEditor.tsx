import {FormProvider, FormStateInput} from "@conform-to/react"
import {Slot} from "@radix-ui/react-slot"
import {Form, type FormProps} from "@remix-run/react"
import type {ComponentPropsWithoutRef, FC} from "react"

import type {Simplify} from "../../lib/types/Simplify.js"

export interface PostEditorProps
  extends Simplify<ComponentPropsWithoutRef<typeof FormProvider> & FormProps> {
  asChild?: boolean
}

export const PostEditor: FC<PostEditorProps> = ({
  asChild,
  context,
  children,
  ...props
}) => {
  const Element = asChild ? Slot : Form

  return (
    <FormProvider context={context}>
      <Element {...props} className="flex flex-1 flex-col gap-4 min-w-0">
        {children}
      </Element>

      <FormStateInput />
    </FormProvider>
  )
}
