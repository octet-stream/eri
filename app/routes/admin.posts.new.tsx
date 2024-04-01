import {json, type ActionFunction} from "@remix-run/node"
import {performMutation} from "remix-forms"
import type {FC} from "react"

import {mutations} from "../server/mutations.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {PostCreateInput} from "../server/zod/post/PostCreateInput.js"
import {parseCookie, serializeCookie} from "../server/lib/auth/cookie.js"

export const action: ActionFunction = async ({request}) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405
    })
  }

  const sessionId = await parseCookie(request.headers.get("cookie"))

  if (!sessionId) {
    throw new Response(null, {
      status: 401
    })
  }

  // Not sure if that's the right way to implement sessions
  const {user, session} = await lucia.validateSession(sessionId)

  if (!(user || session)) {
    throw new Response(null, {
      status: 401
    })
  }

  const headers = new Headers()

  if (session.fresh) {
    headers.set("set-cookie", await serializeCookie(session.id))
  }

  const result = await performMutation({
    request,
    schema: PostCreateInput,
    mutation: mutations.admin.posts.create,
    environment: {
      user
    }
  })

  return json(result, {
    headers
  })
}

const AdminPostNewPage: FC = () => <div>Post editor will be here</div>

export default AdminPostNewPage
