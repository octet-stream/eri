import {useForm, getInputProps, getFormProps} from "@conform-to/react"
import {parseWithZod, getZodConstraint} from "@conform-to/zod"
import {useActionData, Form} from "@remix-run/react"
import type {FC} from "react"

import {Input} from "../../../components/ui/Input.jsx"
import {Button} from "../../../components/ui/Button.jsx"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter
} from "../../../components/ui/Card.jsx"

import {AdminUpdatePasswordInput} from "../../../server/zod/admin/AdminUpdatePasswordInput.js"

import type {action} from "../route.jsx"

export const PasswordSection: FC = () => {
  const lastResult = useActionData<typeof action>()

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(AdminUpdatePasswordInput),
    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminUpdatePasswordInput})
  })

  return (
    <Form {...getFormProps(form)} method="patch" className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Update password</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <label htmlFor={fields.current.id}>Current password</label>

            <Input
              {...getInputProps(fields.current, {type: "password"})}
              key={fields.current.id}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor={fields.updated.id}>New password</label>

            <Input
              {...getInputProps(fields.updated, {type: "password"})}
              key={fields.updated.id}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor={fields.confirm.id}>Confirm new password</label>

            <Input
              {...getInputProps(fields.confirm, {type: "password"})}
              key={fields.confirm.id}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" name={fields.intent.name} value="password">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  )
}
