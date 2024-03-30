/* eslint-disable jsx-a11y/label-has-associated-control */

import {MetaFunction} from "@remix-run/node"
import {useFetcher} from "@remix-run/react"
import type {FC} from "react"
import {useId} from "react"

import {Input} from "../../components/ui/Input.js"
import {Button} from "../../components/ui/Button.js"
import {Label} from "../../components/ui/Label.js"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../../components/ui/Card.jsx"

export const meta: MetaFunction = () => [
  {
    title: "Admin"
  }
]

// TODO: Add conditional rendering
const AdminLayout: FC = () => {
  const emailId = useId()
  const passwordId = useId()
  const fetcher = useFetcher()

  return (
    <div className="flex flex-1 justify-center items-center">
      <fetcher.Form method="post" action="/admin/signup">
        <Card>
          <CardHeader>
            <CardTitle>
              Login
            </CardTitle>

            <CardDescription>
              You need to be authorized to access this page
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-5 w-full mobile:w-[320px] mobile:mx-auto">
              <div className="flex flex-col gap-2">
                <Label htmlFor={emailId}>Email</Label>

                <Input
                  required
                  id={emailId}
                  type="email"
                  name="email"
                  placeholder="me@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={passwordId}>Password</Label>

                <Input
                  required
                  id={passwordId}
                  type="password"
                  name="password"
                  placeholder="your password"
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
      </fetcher.Form>
    </div>
  )
}

export default AdminLayout
