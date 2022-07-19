/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/display-name */
import type {ComponentPropsWithoutRef, FocusEventHandler} from "react"
import type {FieldError} from "react-hook-form"
import {forwardRef, useState} from "react"
import {toast} from "react-hot-toast"

import cn from "classnames"

interface Props extends ComponentPropsWithoutRef<"input"> {
  error?: FieldError
}

type InputFocusHandler = FocusEventHandler<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>((
  {
    className, error, onFocus, onBlur, ...props
  },

  ref
) => {
  const [toastId, setToastId] = useState<string | null>(null)

  const showErrorToast: InputFocusHandler = event => {
    if (error?.message) {
      const id = toast.error(error.message, {duration: Infinity})

      setToastId(id)
    }

    if (onFocus) {
      return onFocus(event)
    }
  }

  const hideErrorToast: InputFocusHandler = event => {
    if (toastId) {
      toast.dismiss(toastId)

      setToastId(null)
    }

    if (onBlur) {
      return onBlur(event)
    }
  }

  return (
    <input
      {...props}

      ref={ref}
      className={cn(
        "border-black border border-solid rounded-md p-2",

        {
          "border-rose-500": !!error
        },

        className
      )}
      onFocus={showErrorToast}
      onBlur={hideErrorToast}
    />
  )
})

Input.defaultProps = {
  type: "text"
}
