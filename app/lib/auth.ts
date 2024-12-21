import {passkeyClient} from "better-auth/plugins/passkey"
import {createAuthClient} from "better-auth/client"

export const authClient = createAuthClient({
  plugins: [passkeyClient()]
})
