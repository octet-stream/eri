import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod/v4"
import type {FC} from "react"
import {Form, useActionData} from "react-router"

import {Button} from "../../../components/ui/Button.tsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../components/ui/Card.jsx"
import {Input} from "../../../components/ui/Input.tsx"
import {Label} from "../../../components/ui/Label.tsx"

import {AdminUpdatePasswordInput} from "../../../server/zod/admin/AdminUpdatePasswordInput.ts"

import type {action} from "../route.tsx"

export const PasswordSection: FC = () => {
  const lastResult = useActionData<typeof action>()

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(AdminUpdatePasswordInput),
    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminUpdatePasswordInput})
  })

  return (
    <Form {...getFormProps(form)} method="post" className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Update password</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor={fields.current.id}>Current password</Label>

            <Input
              {...getInputProps(fields.current, {type: "password"})}
              key={fields.current.id}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={fields.updated.id}>New password</Label>

            <Input
              {...getInputProps(fields.updated, {type: "password"})}
              key={fields.updated.id}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={fields.confirm.id}>Confirm new password</Label>

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
