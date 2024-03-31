import type {FC} from "react"
import {useId} from "react"

import {AdminLogInInput} from "../../../server/zod/user/AdminLogInInput.js"

import {Input} from "../../../components/ui/Input.js"
import {Label} from "../../../components/ui/Label.js"

import {AuthForm} from "../components/AuthForm.jsx"

export const AdminLoginPage: FC = () => {
  const emailId = useId()
  const passwordId = useId()

  return (
    <AuthForm
      schema={AdminLogInInput}
      title="Login"
      description="You need to log in to your account to access this page"
      submitButtonText="Continue"
      method="post"
      action="/admin/login"
    >
      {({register}) => (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor={emailId}>
              Email
            </Label>

            <Input
              required
              id={emailId}
              type="email"
              placeholder="me@example.com"

              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={passwordId}>
              Password
            </Label>

            <Input
              required
              id={passwordId}
              type="password"
              placeholder="your password"

              {...register("password")}
            />
          </div>
        </div>
      )}
    </AuthForm>
  )
}
