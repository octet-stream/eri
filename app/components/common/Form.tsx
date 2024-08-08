import {
  Form as RemixForm,
  useActionData,
  useSubmit,
  useNavigation
} from "@remix-run/react"
import {createForm} from "remix-forms"

export const Form = createForm({
  component: RemixForm,
  useNavigation,
  useSubmit,
  useActionData
})
