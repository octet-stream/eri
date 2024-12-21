import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import {Form, useNavigate} from "react-router"
import {useEvent} from "react-use-event-hook"
import {Fingerprint} from "lucide-react"
import type {FC} from "react"
import {toast} from "sonner"

import {AdminLogInInput} from "../../server/zod/admin/AdminLogInInput.js"

import {authClient} from "../../lib/auth.js"

import {Button} from "../../components/ui/Button.jsx"
import {Separator} from "../../components/ui/Separator.jsx"
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

import type {Route} from "./+types/route.js"

export const AdminLoginPage: FC<Route.ComponentProps> = ({actionData}) => {
  const [form, fields] = useForm({
    lastResult: actionData,
    constraint: getZodConstraint(AdminLogInInput),

    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminLogInInput})
  })

  const navigate = useNavigate()

  const logInWithPassKey = useEvent(async () => {
    const response = await authClient.signIn.passkey()

    if (response?.error) {
      toast.error("Can't log in")
    } else {
      await navigate("/admin", {replace: true})
    }
  })

  return (
    <div className="w-full px-5 py-20 mobile:w-[390px] m-auto">
      <Form
        {...getFormProps(form)}
        method="post"
        action="/admin/login"
        className="relative"
      >
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
                errors={fields.email.errors || form.errors}
                placeholder="me@example.com"
                className="placeholder:lowercase"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={fields.password.id}>Password</Label>

              <Input
                {...getInputProps(fields.password, {type: "password"})}
                errors={fields.password.errors || form.errors}
                placeholder="Your password"
                className="placeholder:lowercase"
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" wide>
              Log in
            </Button>

            <Separator />

            <Button
              type="button"
              wide
              variant="secondary"
              onClick={logInWithPassKey}
            >
              <Fingerprint />

              <span>Use Passkey</span>
            </Button>
          </CardFooter>
        </Card>

        {form.errors ? (
          <ul className="absolute w-full text-center py-2">
            {form.errors.map(error => (
              <li key={error} className="text-destructive">
                {error}
              </li>
            ))}
          </ul>
        ) : null}
      </Form>
    </div>
  )
}
