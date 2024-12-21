import type {FC} from "react"

import {authClient} from "../../../lib/auth.js"

import {Button} from "../../../components/ui/Button.jsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../components/ui/Card.jsx"

export const PasskeySection: FC = () => {
  const addPasskey = async () => {
    await authClient.passkey.addPasskey()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passkeys</CardTitle>
      </CardHeader>

      <CardContent>Add a passkey</CardContent>

      <CardFooter className="flex justify-end">
        <Button type="button" name="passkey" onClick={addPasskey}>
          Add passkey
        </Button>
      </CardFooter>
    </Card>
  )
}
