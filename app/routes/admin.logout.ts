import {withTrpc} from "../server/trpc/withTrpc.js"

export const loader = withTrpc(async trpc => trpc.admin.logout())

export const action = (): never => {
  throw new Response(null, {
    status: 405
  })
}
