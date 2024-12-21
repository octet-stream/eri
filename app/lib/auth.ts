import {passkeyClient} from "better-auth/client/plugins"
import {createAuthClient} from "better-auth/client"

export const authClient = createAuthClient({
  plugins: [passkeyClient()]
})
