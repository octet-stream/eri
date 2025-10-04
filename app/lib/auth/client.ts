import {createAuthClient} from "better-auth/client"
import {passkeyClient} from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [passkeyClient()]
})
