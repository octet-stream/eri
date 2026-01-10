import {passkeyClient} from "@better-auth/passkey/client"
import {createAuthClient} from "better-auth/client"

export const authClient = createAuthClient({
  plugins: [passkeyClient()]
})
