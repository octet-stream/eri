"use client"

import type {ComponentPropsWithoutRef, ReactNode} from "react"
import {forwardRef} from "react"

import {Button} from "component/Button"

import {Title} from "./Title"

interface Props extends ComponentPropsWithoutRef<"form"> {
  title: string
  children: ReactNode
  submitLabel?: string
}

export const Form = forwardRef<HTMLFormElement, Props>((
  {
    title,
    children,
    submitLabel = "Submit",

    ...props
  },

  ref
) => (
  <form {...props} ref={ref} className="w-full">
    <Title>
      {title}
    </Title>

    {children}

    <Button wide type="submit" variant="primary" color="brand">
      {submitLabel}
    </Button>
  </form>
))
