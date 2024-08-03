import type {FC} from "react"
import {useId} from "react"

import {AdminSetupInput} from "../../../server/zod/user/AdminSetupInput.js"

import {Input} from "../../../components/ui/Input.jsx"
import {Label} from "../../../components/ui/Label.jsx"

import {AuthForm} from "../components/AuthForm.jsx"

export const AdminSetupPage: FC = () => {
  const emailId = useId()
  const passwordId = useId()

  return (
    <AuthForm
      schema={AdminSetupInput}
      title="Create admin account"
      description="To manage your blog you&apos;ll need to setup admin account"
      submitButtonText="Log in"
      method="post"
      action="/admin/setup"
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
