import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import type {FC} from "react"
import {Form} from "react-router"

import {Button} from "../../components/ui/Button.jsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../components/ui/Card.jsx"
import {Input} from "../../components/ui/Input.jsx"
import {Label} from "../../components/ui/Label.jsx"
import {AdminSetupInput} from "../../server/zod/admin/AdminSetupInput.js"

import type {Route} from "./+types/route.js"

export const AdminSetupPage: FC<Route.ComponentProps> = ({actionData}) => {
  const [form, fields] = useForm({
    lastResult: actionData,
    constraint: getZodConstraint(AdminSetupInput),

    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminSetupInput})
  })

  return (
    <div className="w-full p-5 mobile:w-[390px] m-auto">
      <Form {...getFormProps(form)} method="post" action="/admin/setup">
        <Card>
          <CardHeader>
            <CardTitle>Create admin account</CardTitle>

            <CardDescription>
              To manage your blog you&apos;ll need to setup admin account
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.email.id}>E-mail</Label>
              <Input
                {...getInputProps(fields.email, {type: "email"})}
                errors={fields.email.errors}
                placeholder="me@example.com"
                className="placeholder:lowercase"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.password.id}>Password</Label>

              <Input
                {...getInputProps(fields.password, {type: "password"})}
                errors={fields.password.errors}
                placeholder="Your password"
                className="placeholder:lowercase"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" wide>
              Sign up
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  )
}
