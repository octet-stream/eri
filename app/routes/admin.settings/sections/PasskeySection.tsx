import type {FC} from "react"
import {useEvent} from "react-use-event-hook"
import {toast} from "sonner"

import {authClient} from "../../../lib/auth.js"

import {Button} from "../../../components/ui/Button.jsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../components/ui/Card.jsx"

import {PasskeyTable} from "./PasskeyTable.jsx"

export const PasskeySection: FC = () => {
  const addPasskey = useEvent(async () => {
    const response = await authClient.passkey.addPasskey()

    if (response?.error) {
      toast.error("Can't add new passkey")
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passkeys</CardTitle>
      </CardHeader>

      <CardContent>
        <PasskeyTable />
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button type="button" name="passkey" onClick={addPasskey}>
          Add passkey
        </Button>
      </CardFooter>
    </Card>
  )
}
