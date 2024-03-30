/* eslint-disable jsx-a11y/label-has-associated-control */

import {MetaFunction} from "@remix-run/node"
import {useFetcher} from "@remix-run/react"
import type {FC} from "react"
import {useId} from "react"

import {Input} from "../../components/ui/Input.js"
import {Button} from "../../components/ui/Button.js"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from "../../components/ui/Card.jsx"

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
      <fetcher.Form method="post" action="/admin/signup" className="flex flex-col gap-5 w-full mobile:w-[320px] mobile:p-5 mobile:mx-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor={emailId}>Email</label>

          <Input
            required
            id={emailId}
            type="email"
            name="email"
            placeholder="me@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={passwordId}>Password</label>

          <Input
            required
            id={passwordId}
            type="password"
            name="password"
            placeholder="shh... let's keep it a secret 🤫"
          />
        </div>

        <Button type="submit">
          Log in
        </Button>
      </fetcher.Form>
    </div>
  )
}

export default AdminLayout
