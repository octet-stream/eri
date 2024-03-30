/* eslint-disable jsx-a11y/label-has-associated-control */

// import {useFetcher} from "@remix-run/react"
import type {FC} from "react"
import {useId} from "react"

import {Input} from "../../../components/ui/Input.js"
import {Button} from "../../../components/ui/Button.js"
import {Label} from "../../../components/ui/Label.js"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../../../components/ui/Card.js"

import {Form} from "../../../components/Form.jsx"

import {AdminSetupInput} from "../../../server/zod/user/AdminSetupInput.js"

export const AdminSetupPage: FC = () => {
  const emailId = useId()
  const passwordId = useId()

  return (
    <div className="w-full p-5 mobile:w-[390px] m-auto">
      <Form schema={AdminSetupInput} method="post" action="/admin/signup">
        {({register}) => (
          <Card>
            <CardHeader>
              <CardTitle>
                Create admin account
              </CardTitle>

              <CardDescription>
                To manage your blog you&apos;ll need to setup admin account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={emailId}>Email</Label>

                  <Input
                    required
                    id={emailId}
                    type="email"
                    placeholder="me@example.com"

                    {...register("email")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={passwordId}>Password</Label>

                  <Input
                    required
                    id={passwordId}
                    type="password"
                    placeholder="your password"

                    {...register("password")}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </CardFooter>
          </Card>
        )}
      </Form>
    </div>
  )
}
