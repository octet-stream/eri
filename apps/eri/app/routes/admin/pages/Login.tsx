import {useForm, getInputProps, getFormProps} from "@conform-to/react"
import {parseWithZod, getZodConstraint} from "@conform-to/zod"
import {useActionData, Form} from "@remix-run/react"
import type {FC} from "react"

import {AdminLogInInput} from "../../../server/zod/user/AdminLogInInput.js"

import {Input} from "../../../components/ui/Input.jsx"
import {Label} from "../../../components/ui/Label.jsx"
import {Button} from "../../../components/ui/Button.jsx"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../../../components/ui/Card.jsx"

import type {action} from "../../admin.login.js"

export const AdminLoginPage: FC = () => {
  const lastResult = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(AdminLogInInput),

    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminLogInInput})
  })

  return (
    <div className="w-full p-5 mobile:w-[390px] m-auto">
      <Form {...getFormProps(form)} method="post" action="/admin/login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>

            <CardDescription>
              You need to log in to your account to access this page
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.email.id}>E-mail</Label>
              <Input
                {...getInputProps(fields.email, {type: "email"})}
                placeholder="me@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                {...getInputProps(fields.password, {type: "password"})}
                placeholder="Your password"
                className="placeholder:lowercase"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  )
}
