import {useImperativeHandle, forwardRef} from "react"
import type {ComponentPropsWithoutRef} from "react"

import AutosizeTextArea from "react-textarea-autosize"

import {useAutoFocus} from "lib/hook/useAutoFocus"

type Props = ComponentPropsWithoutRef<typeof AutosizeTextArea>

export const TextArea = forwardRef<HTMLTextAreaElement, Props>((
  {
    autoFocus, ...props
  },

  ref
) => {
  const innerRef = useAutoFocus<HTMLTextAreaElement>(autoFocus)

  useImperativeHandle(ref, () => innerRef.current!)

  return <AutosizeTextArea ref={innerRef} {...props} />
})
