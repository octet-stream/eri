import "next-auth"

import type {OUserOutput} from "server/trpc/type/output/UserOutput"

declare module "next-auth" {
  interface Session {
    login: string
    user: OUserOutput
  }
}
