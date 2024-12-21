import {useEvent} from "react-use-event-hook"
import type {FC} from "react"
import {toast} from "sonner"

import {authClient} from "../../../lib/auth.js"

import {Button} from "../../../components/ui/Button.jsx"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../components/ui/Card.jsx"

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

      <CardFooter className="flex justify-end">
        <Button type="button" name="passkey" onClick={addPasskey}>
          Add passkey
        </Button>
      </CardFooter>
    </Card>
  )
}
