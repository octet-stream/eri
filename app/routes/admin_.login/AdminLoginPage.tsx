import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod/v4"
import {Fingerprint} from "lucide-react"
import type {FC} from "react"
import {Form, href, useNavigate} from "react-router"
import {useEvent} from "react-use-event-hook"
import {toast} from "sonner"

import {Button} from "../../components/ui/Button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../components/ui/Card.jsx"
import {Input} from "../../components/ui/Input.tsx"
import {Label} from "../../components/ui/Label.tsx"
import {Separator} from "../../components/ui/Separator.tsx"
import {authClient} from "../../lib/auth/client.ts"
import {usePasskeyAutofill} from "../../lib/auth/hooks/usePasskeyAutofill.ts"
import {AdminLogInInput} from "../../server/zod/admin/AdminLogInInput.ts"

import type {Route} from "./+types/route.ts"

export const AdminLoginPage: FC<Route.ComponentProps> = ({actionData}) => {
  const [form, fields] = useForm({
    lastResult: actionData,
    constraint: getZodConstraint(AdminLogInInput),

    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminLogInInput})
  })

  const navigate = useNavigate()

  usePasskeyAutofill("/admin")

  const logInWithPassKey = useEvent(async () => {
    const response = await authClient.signIn.passkey()

    if (response?.error) {
      toast.error("Can't log in")
    } else {
      await navigate(href("/admin"), {replace: true})
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
            <fieldset className="flex flex-col gap-2">
              <Label htmlFor={fields.email.id}>E-mail</Label>

              <Input
                {...getInputProps(fields.email, {type: "email"})}
                errors={fields.email.errors || form.errors}
                placeholder="me@example.com"
                className="placeholder:lowercase"
                autoComplete="email webauthn"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <Label htmlFor={fields.password.id}>Password</Label>

              <Input
                {...getInputProps(fields.password, {type: "password"})}
                errors={fields.password.errors || form.errors}
                placeholder="Your password"
                className="placeholder:lowercase"
                autoComplete="current-password webauthn"
              />
            </fieldset>
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
