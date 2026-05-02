import type {FC} from "react"
import {useRevalidator} from "react-router"
import {useEvent} from "react-use-event-hook"
import {toast} from "sonner"

import {Button} from "../../../components/ui/Button.tsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../components/ui/Card.jsx"
import {authClient} from "../../../lib/auth/client.ts"

import {PasskeyTable} from "./PasskeyTable.tsx"

export const PasskeySection: FC = () => {
  const revalidator = useRevalidator()

  const addPasskey = useEvent(async () => {
    const response = await authClient.passkey.addPasskey()

    if (response?.error) {
      toast.error("Can't add new passkey")
    }

    await revalidator.revalidate()
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
